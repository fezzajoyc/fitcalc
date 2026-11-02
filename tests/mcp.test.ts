import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

describe("FitCalc MCP server", () => {
  it("exposes exactly the FitCalc tool set", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(
      ["bmi", "body_fat_navy", "ideal_weight", "one_rep_max", "running_pace", "tdee"].sort(),
    );
    // YMYL: every health/fitness tool names its estimate status in the description
    for (const t of tools) {
      expect(t.description ?? "", t.name).toMatch(/estimate/i);
    }
    await client.close();
  });

  it("computes BMI with the WHO category (70 kg / 175 cm = 22.86, normal)", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "bmi", arguments: { weight_kg: 70, height_cm: 175 } });
    expect((r as any).isError).toBeUndefined();
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.bmi).toBeCloseTo(22.86, 1); // 70 / 1.75² = 22.857…
    expect(parsed.who_category).toBe("normal");
    expect(parsed.healthy_weight_kg.min).toBeCloseTo(56.7, 0); // 18.5 × 1.75²
    expect(parsed.healthy_weight_kg.max).toBeCloseTo(76.3, 0); // 24.9 × 1.75²
    await client.close();
  });

  it("returns BMR and TDEE with the documented formula (male 80/180/30 = 1780 kcal Mifflin-St Jeor)", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "tdee",
      arguments: { weight_kg: 80, height_cm: 180, age: 30, sex: "male" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.bmr_kcal_per_day).toBe(1780);
    expect(parsed.bmr_formula).toContain("Mifflin-St Jeor");
    expect(parsed.activity_factor).toBeCloseTo(1.55, 6); // default: moderately_active
    expect(parsed.tdee_kcal_per_day).toBe(2759);
    await client.close();
  });

  it("applies goal adjustments on top of TDEE (lose → −500)", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "tdee",
      arguments: { weight_kg: 80, height_cm: 180, age: 30, sex: "male", goal: "lose" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.goal_kcal_per_day).toBe(2759 - 500);
    await client.close();
  });

  it("estimates US Navy body fat and rejects a female call without hip", async () => {
    const client = await connect();
    const male = await client.callTool({
      name: "body_fat_navy",
      arguments: { sex: "male", height_cm: 180, waist_cm: 85, neck_cm: 38 },
    });
    expect((male.content as any)[0].text).toContain("16.11");
    expect((male.content as any)[0].text).toContain("US Navy");

    const noHip = await client.callTool({
      name: "body_fat_navy",
      arguments: { sex: "female", height_cm: 165, waist_cm: 75, neck_cm: 35 },
    });
    expect((noHip as any).isError).toBe(true);
    expect((noHip.content as any)[0].text).toContain("hip");
    await client.close();
  });

  it("gives the Devine weight and healthy band for a height", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "ideal_weight", arguments: { height_cm: 170 } });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.devine_male_kg).toBeCloseTo(65.94, 1); // 50 + 2.3 × 6.929
    expect(parsed.devine_female_kg).toBeCloseTo(61.44, 1);
    expect(parsed.healthy_bmi_band_kg.min).toBeCloseTo(53.47, 1);
    await client.close();
  });

  it("estimates 1RM with both formulas and a percentage-friendly output", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "one_rep_max", arguments: { weight: 100, reps: 5 } });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.epley).toBeCloseTo(116.67, 1); // 100 × (1 + 5/30)
    expect(parsed.brzycki).toBeCloseTo(112.5, 1); // 100 × 36/32
    await client.close();
  });

  it("computes pace per km/mi and a Riegel prediction table", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "running_pace",
      arguments: { distance: "10k", time_seconds: 3000 },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.pace_per_km).toBe("5:00");
    expect(parsed.pace_per_mile).toBe("8:03");
    expect(parsed.speed_kmh).toBeCloseTo(12, 6);
    // Riegel 1.06: 10K 50:00 → marathon ≈ 3:50:01
    expect(parsed.riegel_prediction.marathon).toBe("3:50:01");
    await client.close();
  });

  it("handles invalid input at two layers: schema (zod → isError) and logic (NaN guard → isError)", async () => {
    const client = await connect();
    // 逻辑层:腰围 ≤ 颈围,公式无定义 → handler isError(JSON 会把 NaN 变 null)
    const badNavy = await client.callTool({
      name: "body_fat_navy",
      arguments: { sex: "male", height_cm: 180, waist_cm: 38, neck_cm: 38 },
    });
    expect((badNavy as any).isError).toBe(true);
    expect((badNavy.content as any)[0].text).toContain("waist");
    // 逻辑层:身高低于 Devine 有效域(120 cm)→ isError
    const badIdeal = await client.callTool({ name: "ideal_weight", arguments: { height_cm: 100 } });
    expect((badIdeal as any).isError).toBe(true);
    // schema 层:负重量被 zod 拒绝(SDK 捕获 McpError → isError;逻辑层 NaN 守卫已由上面两例覆盖)
    const badOrm = await client.callTool({ name: "one_rep_max", arguments: { weight: -5, reps: 5 } });
    expect((badOrm as any).isError).toBe(true);
    // schema 层:负数被 zod 拒绝 → SDK 捕获 McpError 后返回带 -32602 的 isError 结果
    const schemaBad = await client.callTool({
      name: "bmi",
      arguments: { weight_kg: -70, height_cm: 175 },
    });
    expect((schemaBad as any).isError).toBe(true);
    expect((schemaBad.content as any)[0].text).toContain("-32602");
    await client.close();
  });
});

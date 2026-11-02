import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FitCalc — fitness & health calculators",
    short_name: "FitCalc",
    description:
      "Fitness and health calculators that run entirely in your browser. Your numbers never leave your device.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

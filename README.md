# FitCalc

由脚手架生成(标准见 workspace 的 site-engineering skill)。健身与健康计算器站:
BMI、卡路里(TDEE)、体脂率(美国海军法)、理想体重(Devine)、1RM、跑步配速(Riegel)。

当前状态:6 个工具已实现(引擎 + `tools/_lib` 纯函数 + 测试 + 核心 5 语文案内联),
MCP server(`mcp/tools.ts`)与站上工具同源,字典 15 语已品牌化。

## 下一步

1. 域名拍板后配 `.env.local`,跑 `BASE=<url> npm run audit:seo` 门禁,再按 launch-runbook 提交。
2. AI 表面:`npm run build:mcp` 打包 MCP server,发布到官方 MCP Registry。
3. 扩展语言翻译走 `tools/_i18n/` 覆盖层(契约见 `tests/overlays.test.ts`)。

# 项目工作约定

使用 Next.js、React、TypeScript、Tailwind CSS，沿用用户其他项目的常规技术栈。

以用户提供的 `oTATo_Skills_Command.html` 为视觉与交互依据，只使用其中的演示数据。真实 Skill、仓库、下载包与后台接入需用户另行提出，不自动恢复旧工程。

`SKILLS_INDEX.md` 用于本目录的技能选型与复用，随任务增量补充，只记录对本目录有用或任务中使用过的 Skill。

在修改 Next.js 时读取安装版本的本地指南；缺少本地文档时核对官方对应资料。保持原型的布局、图标和动效，不加装饰动画或信息模块。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# oTATo Skills

以用户提供的 `oTATo_Skills_Command.html` 为依据重建，使用用户其他项目通用的 Next.js、React、TypeScript 与 Tailwind CSS。当前仅做界面和演示交互。

## 当前范围

- 内容只来自原型内置的 10 条演示记录，位于 `src/data/demo-skills.ts`。
- 保留紫灰目录、奶油纸文档、网点标题、专属 SVG 与命令行组件。
- 分类、键盘选择、hash 定位、复制反馈和响应式按原型实现。
- 安装仓库固定为 `your-name/skills`，文档和命令明确标记为演示。
- 未接入真实 Skill、源码仓库、下载包、账号或数据库，也未恢复旧 Astro 工程。

## 开发

需要 Node.js 24.20+（24.x）与 npm。

```sh
npm ci
npm run dev
```

预览地址：`http://127.0.0.1:4321/`。

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

主页通过 Next.js App Router 在请求时渲染，交互由 React 组件管理，没有使用静态导出或 HTML iframe。

## 组件

`skills-catalogue` 管理选择与原型交互，`catalogue-sidebar` 展示目录，`skill-document` 展示说明，`command-install` 负责演示命令和复制状态，`demo-markdown` 使用 React Markdown/GFM。样式完整迁移自原型；Tailwind 保留可用工具类，并关闭 Preflight，避免改动原型默认样式。

原型的详情进入仍是 150ms / opacity .45 / Y3px，使用 GSAP React 的作用域与清理机制复现。未新增装饰动画。React Bits 已做选型评估，本次没有适合忠实复刻原型的附加组件。

## Cloudflare

提供 OpenNext Cloudflare 配置，沿用用户其他 Next.js 工程的部署工具。构建、预览和正式部署为独立命令，当前不自动上线：

```sh
npm run build:cloudflare
npm run preview:cloudflare
```

正式部署需另行确定 Cloudflare 账号、项目和域名。配置未复制其他工程的账号 ID、API 服务或存储绑定。

## 来源与依赖

- 视觉、SVG、10 条演示文案：用户附加的 `oTATo_Skills_Command.html`。
- 技术栈和版本基线：本机 `oTATo.Art`、`work.otato.art`、`model.otato.art`、`studios.m1rage.art` 的实际工程清单。
- Next.js 16.3.8 / React 19.2.8 / TypeScript 6.0.3 / Tailwind 4.2.1；具体依赖锁定于 `package-lock.json`。
- GSAP 3.15.0 / @gsap/react 2.1.2，参照 [官方 React 集成](https://gsap.com/resources/React/)；只复现原型已有轻量过渡。
- React Markdown 10.1.0 / remark-gfm 4.0.1，原始 HTML 作为文字处理，危险与相对链接不创建可执行入口。
- OpenNext Cloudflare 1.20.9，参照 [官方接入文档](https://opennext.js.org/cloudflare/get-started)。

项目技能索引见 `SKILLS_INDEX.md`。

开发依赖审计中仍有 Next ESLint 插件的 `fast-glob → micromatch → braces` 上游告警；当前 braces 没有已发布修复版本。运行依赖审计无告警，不降级 Next.js 来规避开发工具告警。

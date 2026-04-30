# Lisu Official Site Collaboration Guide

## 项目目标

本项目要建设的是北京骊甦科技官网，不是对 Deepexi 内容的 1:1 复刻。

官网建设应基于 `archive/` 中的业务方案、案例、团队与图示素材，参考 `ai-website-cloner-template/` 已验证的 Deepexi 式多页门户架构、首页总览逻辑和相近视觉节奏，逐步形成更适合骊甦业务表达的官网体系。

## 默认事实源

后续 AI 执行官网任务时，按下面的优先级判断事实：

- 内容与业务：以 `archive/` 为准
- 现状实现：以 `lisu-official-site/` 为准
- 架构与视觉参考：以 `ai-website-cloner-template/` 为准

## 默认阅读顺序

凡是与官网结构、文案、页面规划、内容分发或交付路线有关的任务，默认先读：

1. `docs/official-site/README.md`
2. 与任务对应的专题文档
3. `lisu-official-site/` 当前实现
4. `ai-website-cloner-template/` 相关参考

## 明确排除项

`docs/历史/` 不纳入当前官网项目的默认阅读和判断链路。

后续 AI 无需主动参考 `docs/历史/`，除非用户明确要求回看历史材料。

## 任务边界

- 不要把 Deepexi 当成要逐页照搬的对象
- 首页负责品牌认知、方案总览和详情页入口
- 深内容应进入详情页，而不是继续堆叠在首页
- 如果当前代码现状与官网推荐目标不一致，应优先查 `docs/official-site/` 的说明，再决定是否修改代码

## 关键路径

- 官网主应用：`lisu-official-site/`
- 业务与内容源：`archive/`
- 架构与视觉参考：`ai-website-cloner-template/`
- 官网权威文档区：`docs/official-site/`

# Repository Guidelines

## 项目结构与模块组织
本仓库以 `lisu-official-site/` 为主应用目录，日常开发默认在这里进行。源码位于 `lisu-official-site/src`：`src/app` 放路由入口，`src/components` 放可复用界面组件，`src/content` 放文案与导航配置，`src/lib` 放通用工具，`src/assets` 放站点图片资源。测试优先与实现文件同目录放置，命名为 `*.test.ts` 或 `*.test.tsx`；跨模块测试和初始化放在 `src/test`。`docs/` 用于需求、说明和设计记录，`docs/superpowers/specs` 与 `docs/superpowers/plans` 保存规格与计划文档。`archive/` 和 `ai-website-cloner-template/` 属于参考材料，不是主要交付目录。

## 构建、测试与开发命令
以下命令均在 `lisu-official-site/` 目录下执行。

- `npm run dev`：启动本地开发服务器，默认端口为 `5173`。
- `npm run lint`：运行 Next.js + TypeScript 的 ESLint 检查。
- `npm run typecheck`：执行 TypeScript 严格类型检查，不生成产物。
- `npm run test`：以 watch 模式运行 Vitest，适合本地迭代。
- `npm run test:run`：单次执行全部测试，适合提交前检查。
- `npm run build`：构建生产版本。
- `npm run check`：串行执行 lint、typecheck、test:run 和 build。

## 编码风格与命名约定
项目使用 TypeScript 严格模式和 React 函数组件。保持现有的 2 空格缩进、双引号导入风格，以及 `@/` 到 `src/*` 的路径别名。组件和页面区块使用 PascalCase，例如 `HeroBand`；工具函数使用 camelCase；内容与配置文件使用清晰的领域命名，例如 `site-nav.ts`、`hero-band.tsx`。不要使用嵌套三元表达式，分支逻辑拆成变量或 `if`。注释只在复杂逻辑处添加，并统一使用英文。

## 测试指南
测试框架为 Vitest，运行环境是 `jsdom`，公共初始化文件为 `src/test/setup.ts`。优先为组件、内容结构和页面壳层补充同目录测试。测试文件名应直接描述行为，例如 `header.test.tsx`、`home.test.ts`。当前配置未强制覆盖率阈值，但修改共享组件、内容映射或导航结构时，应补齐相应测试；如需查看覆盖率，可运行 `vitest --coverage`。

## 提交与 Pull Request 规范
现有提交历史以简短前缀为主，如 `feat:`、`docs:`、`style:`、`refactor:`，后接简洁中文说明。每个提交尽量只处理一类改动，避免把样式、内容和结构性修改混在一起。提交 PR 时请附上变更目的与方案概述、涉及路径、必要的验证结果（通常为 `npm run check`），以及关联的 spec、plan 或 issue。若变更影响页面视觉效果，需要附前后截图。

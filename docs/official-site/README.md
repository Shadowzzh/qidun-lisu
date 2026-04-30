# 骊甦官网权威文档入口

## 文档目的

本目录用于沉淀北京骊甦科技官网的当前现状、推荐目标、事实源规则和协作约束。

它是后续 AI 与人工协作时的默认权威文档区，用于减少反复读代码、误用参考资料和混淆现状与目标的问题。

## 推荐阅读顺序

根据任务类型，建议按下面顺序阅读：

1. 先读本文件，理解文档结构与使用方式
2. 涉及资料可信度判断时，读 `sources-of-truth.md`
3. 涉及站点栏目和导航时，读 `information-architecture.md`
4. 涉及目标页面体系和阶段划分时，读 `page-map.md`
5. 涉及内容去向与文案组织时，读 `content-strategy.md`
6. 涉及 AI 执行边界时，读 `ai-collaboration-guide.md`
7. 涉及交付先后顺序时，读 `delivery-roadmap.md`

## 当前官网项目目标

当前官网项目的目标不是复制 Deepexi 的内容，而是借鉴 Deepexi 式多页门户结构，基于骊甦自身的业务方案、案例、团队和技术表达，逐步建设一套完整官网。

官网应采用“首页做总览、详情页承接深内容”的结构策略，让首页承担品牌认知和总入口职责，让详情页承担能力、场景、案例和公司介绍等深内容。

## 当前现状摘要

- `archive/` 已具备相对完整的业务方案内容，尤其是 PPT 拆解文本、逐页内容和素材提取结果
- `lisu-official-site/` 已经有首页原型，并借用了 Deepexi 式结构节奏
- 当前代码中的导航、页面和内容仍属于探索中的样板，不应直接视为最终官网结构
- 项目里还没有一套独立、稳定的官网权威文档区

## 推荐目标摘要

- 根目录 `AGENTS.md` 只作为轻量入口
- `docs/official-site/` 作为官网权威文档区
- 事实源采用分层规则：
  - 内容与业务：`archive/`
  - 现状实现：`lisu-official-site/`
  - 架构与视觉参考：`ai-website-cloner-template/`
- 官网采用 Deepexi 式多页门户策略，首页只做总览和入口

## 文档索引

- [事实源规则](./sources-of-truth.md)
- [信息架构](./information-architecture.md)
- [页面地图](./page-map.md)
- [内容策略](./content-strategy.md)
- [AI 协作指南](./ai-collaboration-guide.md)
- [交付路线图](./delivery-roadmap.md)

## 使用规则

- 先看权威文档，再看代码，再看参考实现
- 当代码现状和推荐目标不一致时，不要直接把代码现状当成最终答案
- 当 `archive/`、代码现状和 Deepexi 参考互相冲突时，先回到 `sources-of-truth.md` 判断优先级
- `docs/历史/` 不作为当前官网项目的默认事实源

# Lisu Official Site Documentation Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Roll out a new Chinese documentation system for the Lisu official site by updating the root `AGENTS.md` into a lightweight entrypoint and creating the `docs/official-site/` authority set.

**Architecture:** Keep the root `AGENTS.md` small and focused on project goal, source priority, reading order, and boundaries. Move all durable website planning material into `docs/official-site/`, where each file owns one problem: document entry, source-of-truth policy, information architecture, page map, content mapping, AI collaboration rules, and delivery sequencing.

**Tech Stack:** Markdown, Git, existing repository documentation conventions

---

## File Structure

- Modify: `AGENTS.md`
  - Keep the existing repository-level engineering guidelines.
  - Prepend a lightweight official-site collaboration entry section.
- Create: `docs/official-site/README.md`
  - Single entrypoint for the new documentation set.
- Create: `docs/official-site/sources-of-truth.md`
  - Define source hierarchy and conflict resolution rules.
- Create: `docs/official-site/information-architecture.md`
  - Define current state versus recommended target information architecture.
- Create: `docs/official-site/page-map.md`
  - Define current routes, target route system, and phased rollout.
- Create: `docs/official-site/content-strategy.md`
  - Map archive content into website sections and pages.
- Create: `docs/official-site/ai-collaboration-guide.md`
  - Define how future AI workers should read, decide, and execute.
- Create: `docs/official-site/delivery-roadmap.md`
  - Define the phased delivery order for documentation and site work.

## Task 1: Add The Official-Site Entrypoint Layer

**Files:**
- Modify: `AGENTS.md`
- Create: `docs/official-site/README.md`
- Create: `docs/official-site/sources-of-truth.md`

- [ ] **Step 1: Verify the current root guidance and docs tree**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
sed -n '1,260p' AGENTS.md
find docs -maxdepth 2 | sort
```

Expected:

```text
AGENTS.md starts with "# Repository Guidelines"
docs/official-site does not exist yet
docs/历史 is still present in the tree
```

- [ ] **Step 2: Create the new docs directory**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
mkdir -p docs/official-site
```

Expected:

```text
Command exits with code 0 and creates docs/official-site
```

- [ ] **Step 3: Insert the lightweight official-site entry block at the top of `AGENTS.md`**

Insert the block below above the existing `# Repository Guidelines` heading and leave the current repository engineering guidelines intact underneath it:

```md
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
```

- [ ] **Step 4: Create `docs/official-site/README.md`**

Write the file with the full content below:

```md
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
```

- [ ] **Step 5: Create `docs/official-site/sources-of-truth.md`**

Write the file with the full content below:

```md
# 骊甦官网事实源规则

## 文档目的

本文件用于定义当前官网项目的事实源优先级、参考边界和冲突处理规则，避免后续 AI 把历史文档、现状代码和参考站点混用。

## 事实源总则

当前官网项目采用分层判断，不存在“所有材料权重相同”的情况。

任何结构、内容、文案和交付判断，都应先识别任务属于哪一类，再使用对应层级的事实源。

## 一级事实源：`archive/`

适用范围：

- 业务定位
- 价值主张
- 七层架构
- 能力定义
- 应用场景
- 案例素材
- 团队信息

判断原则：

- 涉及“骊甦要表达什么”的问题，默认优先使用 `archive/`
- `archive/` 中以拆解后的 Markdown、逐页文本和素材提取结果为主
- `archive/` 中的内容需要网页化重组，不能默认原样照搬

## 二级事实源：`lisu-official-site/`

适用范围：

- 当前代码里已经存在的页面、组件、导航和内容组织方式
- 当前实现实际支持的路由、资源和交互
- 当前测试和工程约束

判断原则：

- 涉及“现在代码是什么样”的问题，以 `lisu-official-site/` 为准
- 它用于描述当前现状，不自动代表最终目标

## 三级参考源：`ai-website-cloner-template/`

适用范围：

- Deepexi 式多页官网结构参考
- 首页如何承担总览与导流职责
- 导航和模块节奏
- 浅蓝科技感视觉方向

判断原则：

- 它只回答“可以怎样参考”，不回答“骊甦必须怎样做”
- 不得把 Deepexi 的具体业务内容当成骊甦官网内容

## 冲突处理规则

当不同来源之间出现冲突时，按下面规则处理：

- 业务内容冲突：以 `archive/` 为准
- 当前实现冲突：以 `lisu-official-site/` 为准
- 结构参考冲突：以骊甦官网推荐目标为准，Deepexi 只作参考
- 如果 `archive/` 没有答案，而代码和 Deepexi 也不能提供明确约束，可以做低风险推断，但要在任务说明中明确写出假设

## 明确不采用的来源

以下内容不纳入当前官网项目的默认事实判断链路：

- `docs/历史/`
- 早期临时截图说明
- 未进入 `docs/official-site/` 的散落想法文档

## 对任务执行的直接要求

- 改官网文案前，先确认对应内容能否在 `archive/` 找到支撑
- 改信息架构前，先确认这次修改属于“当前现状修正”还是“推荐目标推进”
- 参考 Deepexi 做结构设计时，只能借它的门户策略与视觉节奏，不能直接复用它的内容逻辑
```

- [ ] **Step 6: Verify the entrypoint layer**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
find docs/official-site -maxdepth 1 -type f | sort
rg -n "docs/official-site|docs/历史|默认事实源" AGENTS.md docs/official-site/README.md docs/official-site/sources-of-truth.md
```

Expected:

```text
docs/official-site/README.md
docs/official-site/sources-of-truth.md

AGENTS.md contains docs/official-site and docs/历史 exclusion text
README.md contains "推荐阅读顺序"
sources-of-truth.md contains all three source levels
```

- [ ] **Step 7: Commit the entrypoint layer**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add AGENTS.md docs/official-site/README.md docs/official-site/sources-of-truth.md
git commit -m "docs: establish official site documentation entrypoint"
```

## Task 2: Add Information Architecture And Target Page Map

**Files:**
- Create: `docs/official-site/information-architecture.md`
- Create: `docs/official-site/page-map.md`

- [ ] **Step 1: Confirm the new docs layer exists before adding architecture docs**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
find docs/official-site -maxdepth 1 -type f | sort
```

Expected:

```text
README.md and sources-of-truth.md are present
information-architecture.md and page-map.md are not present yet
```

- [ ] **Step 2: Create `docs/official-site/information-architecture.md`**

Write the file with the full content below:

```md
# 骊甦官网信息架构

## 文档目的

本文件用于定义骊甦官网的栏目结构、导航层次与首页和详情页之间的职责边界，并明确区分当前现状与推荐目标。

## 当前现状

当前 `lisu-official-site/` 已具备首页原型，并在导航和首页模块节奏上借用了 Deepexi 式结构。

当前现状的主要特点：

- 已有首页入口结构
- 已有多组待开放导航项
- 已有首页总览、能力入口、场景与案例摘要等内容雏形
- 代码中的导航命名和页面分工仍处于探索阶段

当前现状不能直接视为最终官网信息架构。

## 推荐目标

骊甦官网采用 Deepexi 式多页门户策略，但内容表达和页面分工必须回到骊甦自身业务。

推荐一级导航如下：

- 解决方案
- 能力页
- 应用场景
- 案例中心
- 关于我们

## 一级栏目说明

### 解决方案

承担整套企业级私有化 AI 知识智能平台的总体表达，包括：

- 为什么现在必须建设企业级 AI 平台
- 方案核心定位
- 与通用方案的差异
- 七层架构总览
- 交付价值与总体方法论

### 能力页

承担平台能力层的具体展开，包括：

- 知识语义层
- AI 数据平台
- 安全管控
- 员工 AI 工作台

### 应用场景

承担业务落地表达，包括：

- 供应链
- 财务
- 风控
- 客服运营

### 案例中心

承担案例和背书表达，包括：

- 汽车零部件案例
- 叉车制造案例
- 团队与能力背书

### 关于我们

承担公司与团队表达，包括：

- 公司介绍
- 核心团队
- 公司定位
- 联系方式

## 二级栏目建议

推荐的二级结构如下：

- 解决方案
  - 主方案总览
- 能力页
  - 能力总览
  - 知识语义层
  - AI 数据平台
  - 安全管控
  - 员工 AI 工作台
- 应用场景
  - 场景总览
  - 供应链
  - 财务
  - 风控
  - 客服运营
- 案例中心
  - 案例总览
  - 汽车零部件案例
  - 叉车制造案例
- 关于我们
  - 公司介绍
  - 核心团队
  - 联系方式

## 与 Deepexi 的参考关系

Deepexi 对本项目的参考价值主要体现在：

- 多页官网门户结构
- 首页做总览、详情页做承接的页面职责划分
- 导航和模块节奏
- 科技感浅蓝视觉方向

Deepexi 不是骊甦官网的内容模板。

## 架构原则

- 首页只负责建立理解和分发入口
- 深内容必须进入详情页
- 一级导航应稳定，不频繁调整命名
- 内容组织优先服务骊甦业务表达，而不是复刻参考站点

## 对后续任务的直接含义

- 后续新增页面时，应优先判断其归属哪个一级栏目
- 首页扩展任务不得继续无限堆叠详情内容
- 修改导航前，必须先同步更新本文件
```

- [ ] **Step 3: Create `docs/official-site/page-map.md`**

Write the file with the full content below:

```md
# 骊甦官网页面地图

## 文档目的

本文件用于定义骊甦官网的当前页面现状、完整目标页面体系和分阶段落地顺序。

## 当前现状页面

当前 `lisu-official-site/` 真实具备的页面能力非常有限，主要是：

- `/`
  - 首页原型
  - 已承担品牌、总览、入口和摘要内容

当前导航中出现的其他页面路径，多数仍属于待开放占位，不应被视为已完成页面。

## 推荐目标页面总览

推荐目标页面体系如下。

### 门户入口

- `/`
  - 首页

### 解决方案

- `/solution`
  - 主方案总览页

### 能力页

- `/capabilities`
  - 能力总览页
- `/capabilities/semantic-layer`
  - 知识语义层
- `/capabilities/data-platform`
  - AI 数据平台
- `/capabilities/security`
  - 安全管控
- `/capabilities/workspace`
  - 员工 AI 工作台

### 应用场景

- `/scenarios`
  - 场景总览页
- `/scenarios/supply-chain`
  - 供应链
- `/scenarios/finance`
  - 财务
- `/scenarios/risk-control`
  - 风控
- `/scenarios/customer-operations`
  - 客服运营

### 案例中心

- `/cases`
  - 案例总览页
- `/cases/auto-parts`
  - 汽车零部件案例
- `/cases/forklift`
  - 叉车制造案例

### 关于我们

- `/about`
  - 公司介绍页
- `/about/team`
  - 核心团队
- `/about/contact`
  - 联系方式

## 一期页面

推荐一期优先落地：

- `/`
- `/solution`
- `/capabilities`
- `/scenarios`
- `/cases`
- `/about`

一期目标是把门户结构跑通，让首页和一级栏目页形成闭环。

## 二期页面

推荐二期落地：

- `/capabilities/semantic-layer`
- `/capabilities/data-platform`
- `/capabilities/security`
- `/capabilities/workspace`
- `/scenarios/supply-chain`
- `/scenarios/finance`
- `/scenarios/risk-control`
- `/scenarios/customer-operations`

二期目标是把首页入口真正接到可承接深内容的能力页与场景页。

## 后续扩展页面

推荐后续继续扩展：

- `/cases/auto-parts`
- `/cases/forklift`
- `/about/team`
- `/about/contact`

## 页面角色定义

### 首页

首页负责：

- 品牌与价值主张
- 为什么现在需要这套方案
- 总体架构总览
- 核心能力入口
- 场景与案例摘要
- 导向详情页

### 一级栏目页

一级栏目页负责：

- 建立该栏目内部的第一层理解
- 用摘要模块引导进入子页面
- 不把所有深内容一次性堆满

### 详情页

详情页负责：

- 承接深内容
- 展开业务与能力细节
- 提供结构化表达，而不是重复首页摘要

## 页面之间的跳转关系

- 首页跳一级栏目页
- 一级栏目页跳对应详情页
- 详情页应保留返回所属栏目页和首页的路径
- 案例和团队相关内容可以从首页摘要、案例中心和关于我们多点进入

## 首页与详情页的分工原则

- 首页只建立理解，不承担全文档职责
- 详情页才承接完整论点、完整能力说明和完整案例叙述
- 如果首页出现大段深内容，应优先考虑迁移到对应详情页

## 对后续任务的直接含义

- 新建页面前，先确认它属于一期、二期还是后续扩展
- 首页改版任务应优先服务“导流到目标页面体系”
- 一级导航和真实路由应逐步与本文件对齐
```

- [ ] **Step 4: Verify architecture docs**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
rg -n "当前现状|推荐目标|一级栏目|一期页面|二期页面" docs/official-site/information-architecture.md docs/official-site/page-map.md
```

Expected:

```text
information-architecture.md contains both 当前现状 and 推荐目标 sections
page-map.md contains 一期页面 and 二期页面 sections
```

- [ ] **Step 5: Commit architecture docs**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add docs/official-site/information-architecture.md docs/official-site/page-map.md
git commit -m "docs: add official site architecture map"
```

## Task 3: Add Content Mapping, AI Rules, And Delivery Roadmap

**Files:**
- Create: `docs/official-site/content-strategy.md`
- Create: `docs/official-site/ai-collaboration-guide.md`
- Create: `docs/official-site/delivery-roadmap.md`

- [ ] **Step 1: Create `docs/official-site/content-strategy.md`**

Write the file with the full content below:

```md
# 骊甦官网内容策略

## 文档目的

本文件用于定义 `archive/` 中的业务内容、案例素材和团队材料如何被分发到官网首页、一级栏目页和详情页。

## 当前内容资产概览

当前最可信的内容资产主要来自：

- `archive/企业级私有化AI知识智能平台方案-骊甦.md`
- `archive/ppt-source/slides/*.txt`
- `archive/ppt-source/slides.json`
- `archive/ppt-source/images/`

这些材料已经覆盖：

- 方案背景与价值主张
- 七层架构
- 能力层说明
- 场景价值
- 案例材料
- 团队材料

## `archive/` 内容来源拆分

### 首页高价值来源

适合首页摘要化使用的内容：

- 第 1 页：品牌主张与三条核心价值
- 第 4 页：时代之需
- 第 5 页：战略判断
- 第 10 页：总体架构
- 第 16 页：业务场景
- 第 24、27、30 页：案例与团队摘要

### 解决方案高价值来源

适合 `解决方案` 页使用的内容：

- 第 1 页
- 第 4 页
- 第 5 页
- 第 7 页
- 第 8 页
- 第 10 页
- 第 20 页
- 第 21 页
- 第 22 页

### 能力页高价值来源

适合 `能力页` 使用的内容：

- 第 10 页：能力分层总览
- 第 13 页：AI 数据平台
- 第 14 页：知识语义层
- 第 15 页：能力开放与编排
- 第 17 页：供应链安全
- 第 18 页：统一安全管控体系
- 第 28 页：员工 AI 工作台
- 第 29 页：知识体系

### 应用场景高价值来源

适合 `应用场景` 使用的内容：

- 第 16 页：供应链、财务、风控、客服运营
- 第 20 页：私有化部署价值
- 第 21 页：关键成功因素与风险应对
- 第 22 页：三项确定性承诺

### 案例中心高价值来源

适合 `案例中心` 使用的内容：

- 第 24 页到第 29 页

### 关于我们高价值来源

适合 `关于我们` 使用的内容：

- 第 30 页：核心团队介绍
- 首页和页脚中已有的公司名称、定位与联系方式现状

## 推荐内容分发策略

### 首页

首页只保留摘要内容：

- 品牌主张
- 为什么现在需要这套方案
- 总体架构总览
- 能力入口
- 场景摘要
- 案例与团队摘要

### 解决方案

用于承接完整的方案表达：

- 问题背景
- 战略判断
- 差异化价值
- 七层架构
- 私有化价值
- 三项确定性承诺

### 能力页

用于承接能力分层与能力详情：

- 知识语义层
- AI 数据平台
- 安全管控
- 员工 AI 工作台

### 应用场景

用于承接业务落地表达：

- 供应链
- 财务
- 风控
- 客服运营

### 案例中心

用于承接案例叙述：

- 汽车零部件案例
- 叉车制造案例
- 必要时增加团队背书摘要

### 关于我们

用于承接组织信息：

- 公司介绍
- 核心团队
- 联系方式

## 页面到内容源的映射

- 首页：1、4、5、10、16、24、27、30
- 解决方案：1、4、5、7、8、10、20、21、22
- 能力页：10、13、14、15、17、18、28、29
- 应用场景：16、20、21、22
- 案例中心：24、25、26、27、28、29
- 关于我们：30，加上现有公司信息素材

## 暂缺内容与占位策略

如果某个目标页面当前缺少足够网页化内容，应采用下面策略：

- 优先用摘要卡片和结构化说明占位
- 不直接拿大段 PPT 原文填满页面
- 明确标注该页面仍处于一期结构先行或二期内容深化阶段

## 内容写作与改写原则

- 不直接照搬口播式汇报语气
- 不直接照搬线下提案的过渡页写法
- 保留核心论点，改写为网页可读的结构化表达
- 优先使用短段落、标题层级和卡片摘要

## 对后续任务的直接含义

- 写页面文案前，先确认素材对应哪组页码和哪类页面
- 首页改写任务只能做摘要化提炼
- 深内容扩写任务应优先落到详情页
```

- [ ] **Step 2: Create `docs/official-site/ai-collaboration-guide.md`**

Write the file with the full content below:

```md
# 骊甦官网 AI 协作指南

## 文档目的

本文件用于约束后续 AI 在当前官网项目中的默认工作流、判断顺序和协作边界。

## AI 默认工作流

后续 AI 接到官网相关任务时，默认按下面顺序行动：

1. 先判断任务属于全局结构、内容组织，还是代码实现
2. 先读 `docs/official-site/README.md`
3. 再读对应专题文档
4. 再看 `lisu-official-site/` 当前实现
5. 如需结构或视觉参考，再看 `ai-website-cloner-template/`

## 接任务时先读什么

### 全局结构任务

先读：

- `README.md`
- `sources-of-truth.md`
- `information-architecture.md`
- `page-map.md`

### 内容任务

先读：

- `README.md`
- `sources-of-truth.md`
- `content-strategy.md`

### 代码实现任务

先读：

- `README.md`
- 与任务对应的专题文档
- `lisu-official-site/` 当前实现

## 如何判断事实与参考

- 涉及骊甦业务表达，以 `archive/` 为准
- 涉及当前页面已实现状态，以 `lisu-official-site/` 为准
- 涉及结构与视觉参考，以 `ai-website-cloner-template/` 为准

## 允许做的推断

允许做低风险推断的情形：

- 页面命名需要轻微规范化
- 某个详情页需要沿用已确认的一致布局模式
- 首页入口文案需要做简短网页化改写

做推断时必须说明：

- 推断依据
- 推断属于低风险默认值

## 不允许做的推断

以下问题不得自行拍板：

- 一级导航改名
- 页面体系大幅调整
- 把 Deepexi 内容逻辑直接当成骊甦内容逻辑
- 把当前代码样板直接当成最终站点方案

## 修改信息架构前的要求

- 先更新 `information-architecture.md`
- 再更新 `page-map.md`
- 再决定是否修改代码导航与路由

## 修改页面文案前的要求

- 先确认文案在 `archive/` 是否有支撑
- 先判断文案属于首页摘要还是详情页深内容
- 不允许用 PPT 原文大段直接替代网页正文

## 修改视觉前的要求

- 先确认这是“骊甦官网风格推进”还是“Deepexi 参考借鉴”
- 不要为了像参考站而牺牲骊甦内容表达

## 输出物要求

- 改全局结构前，先说明会影响哪些文档和哪些代码路径
- 新增官网项目文档时，优先放到 `docs/official-site/`
- 不要再新增第二套平行官网总纲目录

## 直接排除项

`docs/历史/` 不纳入当前官网任务的默认阅读链路。

除非用户明确要求，否则后续 AI 不需要主动读取或引用 `docs/历史/`。
```

- [ ] **Step 3: Create `docs/official-site/delivery-roadmap.md`**

Write the file with the full content below:

```md
# 骊甦官网交付路线图

## 文档目的

本文件用于定义官网文档建设、信息架构建设和页面建设的推荐落地顺序，避免任务发散。

## 当前现状

当前项目具备：

- 首页原型
- 一批待开放导航项
- 完整度较高的 `archive/` 内容资产
- 一个可作为多页门户结构参考的 Deepexi 样板

当前项目缺少：

- 稳定的官网权威文档区
- 已落地的一级栏目页
- 已承接深内容的详情页

## 推荐交付策略

整体策略分为四段：

- 先建文档入口和判断规则
- 再建一级栏目结构
- 再建详情页承接体系
- 最后做内容深化与视觉打磨

## 一期范围

一期目标：

- 更新 `AGENTS.md`
- 建立 `docs/official-site/`
- 明确官网目标信息架构
- 明确页面体系和内容分发原则
- 首页继续承担总览和导流职责

如果进入页面实施，一期建议优先落地：

- `/`
- `/solution`
- `/capabilities`
- `/scenarios`
- `/cases`
- `/about`

## 二期范围

二期目标：

- 落地核心能力详情页
- 落地核心场景详情页
- 让首页入口真正导向深内容页

推荐页面：

- `/capabilities/semantic-layer`
- `/capabilities/data-platform`
- `/capabilities/security`
- `/capabilities/workspace`
- `/scenarios/supply-chain`
- `/scenarios/finance`
- `/scenarios/risk-control`
- `/scenarios/customer-operations`

## 后续范围

后续目标：

- 补齐案例详情页
- 补齐团队与联系方式详情页
- 做内容精修、视觉打磨和页面间跳转优化

推荐页面：

- `/cases/auto-parts`
- `/cases/forklift`
- `/about/team`
- `/about/contact`

## 页面优先级

优先级建议如下：

1. 首页和一级栏目页
2. 能力详情页
3. 场景详情页
4. 案例详情页
5. 关于我们扩展页

## 依赖关系

- 未完成 `information-architecture.md` 和 `page-map.md` 前，不建议大规模扩展导航代码
- 未完成 `content-strategy.md` 前，不建议大规模写详情页正文
- 未完成一级栏目页前，不建议批量开工详情页

## 推荐任务拆分方式

推荐按下面顺序拆任务：

1. 文档基础层
2. 导航与一级栏目页
3. 能力页体系
4. 场景页体系
5. 案例与关于我们体系
6. 视觉打磨与回补

## 对后续任务的直接含义

- 如果任务目标不清，应先回到文档层确认范围
- 如果任务涉及大范围页面扩展，应优先对照本路线图判断属于一期、二期还是后续阶段
```

- [ ] **Step 4: Verify the content and roadmap layer**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
rg -n "archive/|一级栏目|docs/历史|一期范围|二期范围" docs/official-site/content-strategy.md docs/official-site/ai-collaboration-guide.md docs/official-site/delivery-roadmap.md
```

Expected:

```text
content-strategy.md references archive-based mapping
ai-collaboration-guide.md excludes docs/历史
delivery-roadmap.md contains both 一期范围 and 二期范围
```

- [ ] **Step 5: Commit the content and roadmap layer**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add docs/official-site/content-strategy.md docs/official-site/ai-collaboration-guide.md docs/official-site/delivery-roadmap.md
git commit -m "docs: add official site content and rollout guides"
```

## Task 4: Final Link Review And Project-Level Verification

**Files:**
- Modify: `docs/official-site/README.md` if any broken links or naming drift are found
- Verify: `AGENTS.md`
- Verify: `docs/official-site/*.md`

- [ ] **Step 1: Run a final tree and link sanity check**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
find docs/official-site -maxdepth 1 -type f | sort
rg -n "\]\(\./" docs/official-site/*.md
rg -n "docs/历史" AGENTS.md docs/official-site/*.md
```

Expected:

```text
All seven docs/official-site files exist
README.md contains relative links to the other docs
docs/历史 only appears in exclusion statements, not as a recommended source
```

- [ ] **Step 2: Verify the root entry and docs body can be skimmed cleanly**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
sed -n '1,220p' AGENTS.md
sed -n '1,220p' docs/official-site/README.md
```

Expected:

```text
AGENTS.md starts with the official-site collaboration entry block
README.md clearly explains reading order and links to the doc set
```

- [ ] **Step 3: Commit final consistency fixes only if Step 1 or Step 2 changed files**

If Step 1 or Step 2 exposed a naming drift or broken link and you edited files, run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add AGENTS.md docs/official-site
git commit -m "docs: finalize official site documentation set"
```

If Step 1 and Step 2 did not require any edits, skip this commit and move on.

## Self-Review

### Spec Coverage

- New lightweight `AGENTS.md` entrypoint: covered in Task 1.
- New `docs/official-site/` authority set: covered across Tasks 1 to 3.
- Chinese content with English file names: reflected in every created file.
- Distinguish current state versus recommended target: covered in `information-architecture.md`, `page-map.md`, and roadmap guidance.
- Exclude `docs/历史` from the default reasoning path: covered in `AGENTS.md`, `README.md`, `sources-of-truth.md`, and `ai-collaboration-guide.md`.

### Placeholder Scan

- No `TODO`, `TBD`, or “fill this in later” placeholders remain.
- Every file creation step contains exact markdown content.
- Every verification step contains exact commands and expected results.

### Type Consistency

- The docs authority directory is always `docs/official-site/`.
- The three source layers are consistently named `archive/`, `lisu-official-site/`, and `ai-website-cloner-template/`.
- The first-level navigation names remain `解决方案`、`能力页`、`应用场景`、`案例中心`、`关于我们` across all tasks.

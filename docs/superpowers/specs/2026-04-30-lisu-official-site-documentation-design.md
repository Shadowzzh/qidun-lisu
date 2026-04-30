# 骊甦官网文档体系重建设计

## 背景

当前项目已经具备三类关键材料，但缺少一套统一、可持续维护、同时适合人和 AI 协作的官网权威文档体系。

- `archive/` 提供业务方案、案例、团队与图示素材，是内容与业务判断的核心来源。
- `lisu-official-site/` 提供当前实现现状，但现有代码仍处于首页样板和结构探索阶段，不能直接视为最终官网目标。
- `ai-website-cloner-template/` 已验证一套接近 Deepexi 的多页门户结构和首页总览逻辑，适合作为官网架构和视觉节奏参考。

当前还存在两个问题：

- 根目录缺少一份足够清晰的入口文档，后续 AI 很难快速理解项目总目标、事实源优先级和默认阅读顺序。
- 旧的 `docs/历史/` 不再适合作为当前官网项目的默认事实源，但项目里还没有一套新的权威文档区替代它。

## 目标

- 建立一套新的官网权威文档区，路径固定为 `docs/official-site/`。
- 让后续 AI 在进入项目后，能快速理解项目目标、事实源优先级、页面体系和交付边界。
- 保持根目录 `AGENTS.md` 轻量化，只承担入口和约束，不承载完整站点设计。
- 明确区分 `当前现状` 与 `推荐目标`，避免后续 AI 把现状实现误判为最终方案。
- 让文档同时适合人阅读和 AI 快速提取，不依赖旧的历史文档链路。
- 支持骊甦官网按 Deepexi 式多页门户策略演进：首页负责总览，详情页承接深内容。

## 非目标

- 这一次不删除 `docs/历史/`。
- 这一次不建立逐页面的完整 spec 库。
- 这一次不直接修改 `lisu-official-site/` 的页面实现。
- 这一次不把 `AGENTS.md` 扩写成完整项目总纲。

## 方案比较

### 方案 A：轻治理型

只建立最少量的总纲文档：

- `AGENTS.md`
- `docs/official-site/README.md`
- `docs/official-site/sources-of-truth.md`
- `docs/official-site/information-architecture.md`
- `docs/official-site/page-map.md`
- `docs/official-site/delivery-roadmap.md`

优点：

- 初始成本最低
- 维护压力小

缺点：

- AI 做内容任务时仍需自行二次整理 `archive/`
- AI 做结构任务时缺少明确协作规则

### 方案 B：标准执行型

在轻治理型基础上，补齐内容映射和 AI 协作规则：

- `AGENTS.md`
- `docs/official-site/README.md`
- `docs/official-site/sources-of-truth.md`
- `docs/official-site/information-architecture.md`
- `docs/official-site/page-map.md`
- `docs/official-site/content-strategy.md`
- `docs/official-site/ai-collaboration-guide.md`
- `docs/official-site/delivery-roadmap.md`

优点：

- 适合人和 AI 共同维护
- 后续 AI 接任务时上下文切入更快
- 既能承接全局架构判断，也能承接内容映射任务

缺点：

- 第一版写作成本高于方案 A

### 方案 C：强执行型

在方案 B 基础上，进一步补齐细粒度执行文档：

- `page-specs/`
- `module-inventory.md`
- `task-template.md`

优点：

- 后续可直接拆成页面级与模块级任务

缺点：

- 当前阶段容易过早细化
- 在站点总体结构未完全稳定前，维护成本偏高

## 选定方向

选择方案 B：标准执行型。

原因如下：

- 当前项目最紧迫的问题是建立统一目标和协作边界，而不是马上形成完整页面 spec 库。
- 相比方案 A，方案 B 增加的 `content-strategy.md` 和 `ai-collaboration-guide.md` 对后续 AI 协作价值很高。
- 相比方案 C，方案 B 不会在站点结构尚未完全稳定时引入过重的维护负担。

## 最终设计

### 一、目录结构

```text
AGENTS.md
docs/
  official-site/
    README.md
    sources-of-truth.md
    information-architecture.md
    page-map.md
    content-strategy.md
    ai-collaboration-guide.md
    delivery-roadmap.md
```

### 二、`AGENTS.md` 的定位

`AGENTS.md` 仅作为轻量入口文档，负责解释项目总目标、事实源优先级、默认阅读顺序和协作边界。

建议包含以下部分：

- 项目目标
- 默认事实源
- 默认阅读顺序
- 明确排除项
- 任务边界
- 关键路径索引

`AGENTS.md` 不承担以下职责：

- 不展开完整页面体系
- 不展开完整内容策略
- 不重复写全部交付路线

### 三、`docs/official-site/` 各文档职责

#### `README.md`

职责：

- 作为 `docs/official-site/` 的权威入口
- 说明整套文档的阅读顺序、相互关系与使用方式

建议章节：

- 文档目的
- 推荐阅读顺序
- 当前官网项目目标
- 当前现状摘要
- 推荐目标摘要
- 文档索引
- 使用规则

#### `sources-of-truth.md`

职责：

- 定义事实源分层和冲突处理规则

建议章节：

- 文档目的
- 事实源总则
- 一级事实源：`archive/`
- 二级事实源：`lisu-official-site/`
- 三级参考源：`ai-website-cloner-template/`
- 冲突处理规则
- 明确不采用的来源
- 对任务执行的直接要求

#### `information-architecture.md`

职责：

- 定义官网信息架构
- 明确一级栏目、二级栏目和整体组织原则

建议章节：

- 文档目的
- 当前现状
- 推荐目标
- 一级栏目说明
- 二级栏目建议
- 与 Deepexi 的参考关系
- 架构原则

#### `page-map.md`

职责：

- 定义完整目标页面体系和阶段划分

建议章节：

- 文档目的
- 当前现状页面
- 推荐目标页面总表
- 一期页面
- 二期页面
- 后续扩展页面
- 每个页面的角色定义
- 页面之间的跳转关系
- 首页与各详情页的分工原则

说明：

- 不建议做成表格驱动
- 建议采用“页面清单 + 页面职责 + 跳转关系”的叙述结构

#### `content-strategy.md`

职责：

- 把 `archive/` 里的业务内容、案例和素材映射到官网栏目与页面

建议章节：

- 文档目的
- 当前内容资产概览
- `archive/` 内容来源拆分
- 推荐内容分发策略
- 页面到内容源的映射
- 暂缺内容与占位策略
- 内容写作与改写原则

#### `ai-collaboration-guide.md`

职责：

- 定义后续 AI 执行官网任务时的默认工作流和判断规则

建议章节：

- 文档目的
- AI 默认工作流
- 接任务时先读什么
- 如何判断事实与参考
- 允许做的推断
- 不允许做的推断
- 修改信息架构前的要求
- 修改页面文案前的要求
- 修改视觉前的要求
- 输出物要求

#### `delivery-roadmap.md`

职责：

- 定义一期到后续阶段的交付路线与优先级

建议章节：

- 文档目的
- 当前现状
- 推荐交付策略
- 一期范围
- 二期范围
- 后续范围
- 页面优先级
- 依赖关系
- 推荐任务拆分方式

### 四、统一写作规则

#### 文档正文语言

- 新文档正文一律使用中文。
- 章节标题、规则、说明和结论一律使用中文。
- 文件名保留英文，保证路径稳定，便于 AI 与工具引用。

#### 统一结构

每份 `docs/official-site/*.md` 都应尽量明确区分三类信息：

- 当前现状
- 推荐目标
- 对后续任务的直接含义

这样可以避免 AI 将当前代码现状误判为最终目标。

## 应写入文档体系的核心结论

### 项目目标结论

骊甦官网的目标不是复刻 Deepexi 站点内容，而是基于 `archive/` 的业务方案与品牌素材，参考 Deepexi 的多页门户架构、首页总览逻辑和相近视觉节奏，建设一套更适合骊甦业务表达的官网体系。

### 事实源结论

事实源采用分层处理：

- 内容与业务，以 `archive/` 为准
- 现状实现，以 `lisu-official-site/` 为准
- 架构与视觉参考，以 `ai-website-cloner-template/` 为准

### 参考关系结论

`ai-website-cloner-template/` 的价值主要在于：

- 多页企业官网结构参考
- 首页如何承接后续详情页
- 导航、模块节奏和浅蓝科技感视觉参考

它不是需要被 1:1 搬运的最终蓝本。

### 总体站点策略结论

官网采用 Deepexi 式多页门户策略：

- 首页负责品牌认知、方案总览和栏目入口
- 详情页负责承接深内容
- 不将整套 PPT 内容堆叠在首页

### 推荐一级导航结论

推荐一级导航稳定为：

- 解决方案
- 能力页
- 应用场景
- 案例中心
- 关于我们

### 首页角色结论

首页只承担以下任务：

- 品牌与价值主张
- 为什么现在需要这套方案
- 总体架构总览
- 核心能力入口
- 场景与案例摘要
- 引导进入详情页

### 详情页分工结论

- `解决方案`：承接总体定位、价值主张、七层架构与整体方法论
- `能力页`：承接知识语义层、AI 数据平台、安全管控、员工 AI 工作台等能力详情
- `应用场景`：承接供应链、财务、风控、客服运营等业务落地表达
- `案例中心`：承接汽车零部件、叉车制造等案例与团队背书
- `关于我们`：承接公司介绍、团队、公司定位与联系方式

### 内容分发结论

`archive/` 中的 PPT 内容不能直接原样平铺到网页。

必须按“首页摘要 + 详情页展开”的方式重组。

适合保留的内容：

- 核心论点
- 架构层级
- 能力定义
- 场景价值
- 案例素材
- 团队背书

不适合直接照搬的内容：

- 汇报式口播语气
- 过长段落
- 线下提案式过渡页

### 当前现状结论

`lisu-official-site/` 当前已经具备首页原型，并借用了 Deepexi 式结构，但仍属于“内容填充中的首页样板”，不能视为最终官网信息架构已经定稿。

### 协作结论

后续 AI 默认先读 `docs/official-site/README.md`，再按任务类型进入专题文档。

若任务涉及：

- 内容判断，以 `archive/` 为准
- 现状修改，以 `lisu-official-site/` 为准
- 结构与视觉参考，以 `ai-website-cloner-template/` 为准

### 历史文档结论

`docs/历史/` 不纳入当前官网项目的默认阅读和判断链路。

后续 AI 无需主动参考它。

## 维护与演进规则

### 权威入口唯一化

后续凡是官网级全局规则、页面体系、内容映射和交付路线的更新，优先落到 `docs/official-site/`，不再新增第二套平行总纲文档。

### 文档与代码的关系

代码不是唯一事实。

如果代码现状与 `docs/official-site/` 的推荐目标不一致，允许这种差异存在，但必须在文档中明确这属于：

- 当前现状
- 推荐目标

### 必须更新文档的情形

出现以下变化时，应优先更新或至少核对 `docs/official-site/`：

- 一级导航变化
- 页面新增或删除
- 页面职责变化
- 内容来源判断变化
- 一期范围变化
- Deepexi 参考策略变化

### 不需要更新全局文档的情形

以下变化通常不需要修改全局文档：

- 纯样式微调
- 单模块文案润色
- 纯代码重构
- 不影响站点结构和内容分工的局部实现

### AI 默认执行纪律

后续 AI 接到官网任务时，应先判断任务类型：

- 如果是全局结构任务，先读 `README.md`、`information-architecture.md`、`page-map.md`
- 如果是内容任务，再补读 `content-strategy.md`
- 如果是代码改动任务，再回到 `lisu-official-site/`

### 推荐演进顺序

先稳定以下总纲文档：

- `AGENTS.md`
- `docs/official-site/README.md`
- `docs/official-site/sources-of-truth.md`
- `docs/official-site/information-architecture.md`
- `docs/official-site/page-map.md`
- `docs/official-site/content-strategy.md`
- `docs/official-site/ai-collaboration-guide.md`
- `docs/official-site/delivery-roadmap.md`

之后如果需要，再进入更细粒度的 `page-specs/` 或其他页面级文档。

## 实施边界

本设计只定义文档体系重建方案，不直接执行以下操作：

- 不删除 `docs/历史/`
- 不改写现有官网页面实现
- 不立即建立页面级 spec 库

正式实施阶段仅包含：

- 更新根目录 `AGENTS.md`
- 新建 `docs/official-site/` 文档体系
- 将 `docs/历史/` 从默认事实判断链路中剔除

## 验收标准

- 根目录 `AGENTS.md` 保持轻量，但能明确解释项目目标、事实源优先级和默认阅读顺序。
- `docs/official-site/` 形成单入口、多职责的权威文档区。
- 后续 AI 在进入项目后，不需要默认依赖 `docs/历史/` 即可理解官网目标与协作边界。
- 文档体系明确区分 `当前现状` 与 `推荐目标`。
- 文档体系能够直接支持后续多页官网架构任务的拆解与执行。

# 北京骊甦科技官网首页 V1 设计文档

Date: 2026-04-29
Status: Draft
Project Root: `/Users/zhangziheng/Documents/work/qidun-lisu`
Target Project: `lisu-official-site`
Related References:
- `/Users/zhangziheng/Documents/work/qidun-lisu/docs/北京骊甦科技官网需求说明.md`
- `/Users/zhangziheng/Documents/work/qidun-lisu/docs/北京骊甦科技官网信息架构与页面映射说明.md`
- `/Users/zhangziheng/Documents/work/qidun-lisu/docs/北京骊甦科技官网页面模块拆解说明.md`
- `/Users/zhangziheng/Documents/work/qidun-lisu/ai-website-cloner-template/src/components/pages/home/home-page.tsx`

## 1. 设计结论

本设计文档采用以下落地方式：

- 在当前仓库下新建独立 Next.js 项目 `lisu-official-site`
- 复用 `ai-website-cloner-template` 的工程组织思路和少量通用站点壳
- 不直接复制旧模板整页代码，不继承旧品牌内容模型
- 整体项目目标仍是多页面官网，本设计文档仅定义 Phase 1 的首页 V1
- 首页定位为“方案官网首页”，同时承担官网总入口职责，核心表达为企业级私有化 AI 知识智能平台方案

推荐原因：

- 独立项目可以把北京骊甦科技官网和克隆模板彻底隔离
- 首页先行能最快形成对外可看的第一版，同时减少早期范围失控
- 现有 PPT 内容足以支撑首页承担总览职责，尤其是 `slide-01`、`slide-04`、`slide-05`、`slide-07`、`slide-10`、`slide-16`、`slide-24`、`slide-27`、`slide-28`、`slide-30`
- 通过预留导航与内容模型，可以在后续平滑扩展成完整多页面官网

## 2. 范围与非目标

### 本次范围

- 新建独立 Next.js 官网项目 `lisu-official-site`
- 建立官网基础层，包括布局、全局样式、首页锚点导航、基础 SEO
- 实现首页 `/`
- 首页内容采用结构化内容模型，不将长文案直接写死在 JSX
- 为未来多页面官网预留导航配置和内容组织方式
- 为后续 `/solution`、`/cases`、`/company` 等真实页面保留扩展位

### 非目标

- 本次不交付 `/solution`、`/cases`、`/company` 等子页面的实际页面实现
- 本次不做新闻体系、投资者关系、联系表单等资料缺失内容
- 本次不直接将原始归档资料目录作为运行时资源目录
- 本次不沿用旧模板中的品牌文案、新闻卡片、下拉导航信息架构

## 3. 关键约束

- 新项目目录位于当前仓库下并列目录：`/Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site`
- 新项目继续使用 Next.js App Router
- 工程风格参考现有模板，但品牌、内容和信息架构全部重建
- 首页主重心为方案表达，不以公司介绍为主线
- 归档资料由其他 AI 负责整理，主线实现不与归档目录结构耦合

## 4. 推荐方案与取舍

本设计采用“先打官网骨架，再落首页”的方案。

做法如下：

- 先建立一个干净的独立官网工程
- 迁移少量通用工程配置和组件拆分思路
- 先完成首页需要的基础层和内容模型
- 再按 section 完成首页实现

不采用“整站复制后改名”的原因：

- 会把旧品牌内容、旧导航结构、旧 SEO 一起带入
- 后续清理成本高
- 容易让首页保留强烈的模板遗留痕迹

不采用“只做一个临时首页”的原因：

- 只拼首页而不预留官网骨架，后续扩页时返工概率高
- 内容、导航、SEO 会在第二阶段被迫重组

## 5. 项目结构设计

建议项目结构如下：

```text
lisu-official-site/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
    components/
      site/
        header.tsx
        footer.tsx
        mobile-menu.tsx
      home/
        hero-section.tsx
        why-now-section.tsx
        proposition-section.tsx
        architecture-section.tsx
        capability-section.tsx
        scenarios-section.tsx
        proof-section.tsx
        closing-section.tsx
    content/
      home.ts
      navigation.ts
      site.ts
    assets/
      brand/
      home/
    lib/
      metadata.ts
      utils.ts
  public/
    favicon.ico
    og-image.png
    robots.txt
    site.webmanifest
```

结构原则：

- `app/` 只负责路由和页面装配
- `components/home/` 专门承接首页模块，避免未来多页面代码混杂
- `content/` 存放结构化内容和导航配置
- `assets/` 存放正式采用的品牌与首页资源
- `public/` 只保留必须使用公开路径的站点级静态文件

## 6. 复用策略

### 允许复用

- `ai-website-cloner-template` 的 App Router 工程思路
- Tailwind 组织方式和全局样式分层思路
- Header、Footer、Mobile Menu 的拆分方式
- 首页按 section 组织的写法
- 少量无品牌耦合的基础 UI 组件

### 不直接复用

- 旧品牌内容文件
- 旧首页整页 JSX
- 旧下拉导航信息架构
- 旧新闻模块
- 旧 footer 中的品牌、城市、备案、二维码等固定信息

原则是“复用架构，不复制品牌实现”。

## 7. 首页信息架构

首页 V1 承担 9 类内容职责，但页面实现建议收敛为 8 个 section。

### 7.1 Hero 首屏

- 内容来源：`slide-01`
- 目标：在首屏内说明方案名称、价值主张和三项核心能力
- 承载内容：
  - 企业级私有化 AI 知识智能平台方案
  - 从数据查询到知识决策
  - 算力底座、知识驱动决策、内生安全体系

### 7.2 时代之需与战略判断

- 内容来源：`slide-04`、`slide-05`
- 目标：解释企业建设 AI 平台的现实驱动，并建立“现在就要布局”的时间窗口认知
- 承载内容：
  - 时代之需：
    - AI 从实验到生产的落差
    - 数据到知识孤岛的问题
    - 算力需求跨越式升级
  - 战略判断：
  - 竞争焦点从算力比拼转向业务敢用、会用、可追溯
  - 合规要求迫近
  - 提前布局带来的竞争优势

说明：

- 从内容职责上看，“时代之需”和“战略判断”仍按上游文档视为两类内容职责
- 从页面实现上看，V1 将两者合并为一个复合 section，避免首页碎片化

### 7.3 方案主张

- 内容来源：`slide-07`
- 目标：建立与通用 AI 中台的差异化认知
- 承载内容：
  - 拒绝概率玩具
  - 打造知识大脑
  - 从临时工到数字助手

### 7.4 七层架构总览

- 内容来源：`slide-10`
- 目标：说明这是一套完整体系，不是单点工具
- 承载内容：
  - L1 到 L7 分层
  - 安全与 OVTP 纵向切面
  - 语义层作为中枢的定位

### 7.5 核心能力摘要

- 内容来源：优先使用 `slide-11`、`slide-13`、`slide-14`、`slide-17`、`slide-28`
- 目标：概括未来多页面能力分支，并保留首页总入口感
- 承载内容：
  - 算力底座
  - AI 数据平台
  - 知识语义层
  - 安全管控
  - 员工 AI 工作台

### 7.6 场景价值摘要

- 内容来源：`slide-16`
- 目标：让首页补足“能力如何进入业务”的一层表达
- 承载内容：
  - 供应链场景
  - 财务场景
  - 风控场景
  - 客服运营场景

### 7.7 案例与团队摘要

- 内容来源：`slide-24`、`slide-27`、`slide-30`
- 目标：在首页建立最基础的落地可信度和团队背书
- 承载内容：
  - 案例 1 摘要入口
  - 案例 2 摘要入口
  - 核心团队摘要

### 7.8 价值承诺收束

- 内容来源：`slide-01` 与 `slide-22` 的摘要表达
- 目标：用确定性的价值判断和公司署名收束页面，不伪造不存在的 CTA
- 承载内容：
  - 方案价值总结
  - 三个确定性承诺的摘要表达
  - 公司署名

## 8. 内容模型设计

首页内容统一由 `src/content/home.ts` 提供，页面组件只消费结构化数据。

内容模型要求：

- 每个 section 独立定义标题、副标题、摘要、卡片数据和图片引用
- 文案先做“官网语言”改写，再进入组件
- 不允许把 PPT 段落原样大段塞入 JSX
- 图片引用统一走 `src/assets/home/`
- 首页中的“入口型摘要卡”在 V1 阶段允许只承载信息预告，不强制绑定真实路由
- 每个首页 section 和关键内容项必须保留 `sourceSlides` 字段，记录来源 slide 编号
- 合并实现的复合 section 允许对应多个内容职责，但仍需分别保留来源说明

### 8.1 归档到运行时内容契约

归档目录仍是唯一内容归档来源，但本 spec 需要定义从归档到运行时内容的追溯链。

最小契约如下：

- 归档输入：`archive/ppt-source/slides/*.txt`
- 归档索引：`archive/ppt-source/slides.json`
- 运行时内容：`src/content/home.ts`
- 运行时资源：`src/assets/home/*`

`src/content/home.ts` 中每个 section 至少包含以下字段：

```ts
type HomeSectionContent = {
  id: string;
  title: string;
  description?: string;
  sourceSlides: string[];
};
```

如果 section 下存在卡片、入口项或摘要项，则每个 item 也必须保留各自的 `sourceSlides` 字段。

追溯要求：

- 每个首页 section 都能映射回至少一个归档 slide
- 每个首页卡片或摘要项都能映射回至少一个归档 slide
- 运行时图片命名应与内容项建立一对一或一对多的明确引用关系
- 不允许出现“文案已上线但无法指回归档来源”的内容项
- 如果一个 section 合并了多类内容职责，内容模型中必须能区分这些职责的来源边界

这样做的原因：

- 组件结构和内容来源解耦
- 后续改文案不需要碰页面结构
- 方便未来从首页扩展到多页面内容体系

## 9. 导航设计

V1 首页导航采用锚点方案。

运行时策略：

- 顶部导航只展示首页内可用锚点
- 不展示未完成页面的真实路由
- 移动端导航与桌面端保持同一信息结构
- 首页中的案例、团队、场景、工作台等内容优先作为摘要模块出现，不在 V1 强制要求跳转子页

### 9.1 锚点与运行时行为约束

- 每个首页 section 必须定义稳定锚点 ID
- 锚点 ID 使用 kebab-case，建议为：
  - `hero`
  - `why-now`
  - `proposition`
  - `architecture`
  - `capabilities`
  - `scenarios`
  - `proof`
  - `closing`
- 顶部导航点击后滚动到对应 section，并考虑 sticky header 偏移
- 偏移策略应通过 CSS `scroll-margin-top` 或等价方案统一处理，不允许在每个链接中硬编码不同偏移值
- 当页面滚动到某一 section 时，导航中对应项应展示 active 状态
- active 状态切换逻辑应以 section 进入主视区为准，不使用纯 hover 态代替
- 未绑定真实路由的摘要卡允许有两种行为，且必须二选一统一：
  - 仅静态展示，不可点击
  - 点击后滚动到当前页内关联 section
- V1 中不允许出现点击后进入空白页、占位页或 404 的入口

预留策略：

- `src/content/navigation.ts` 预留未来官网路由定义
- V1 中未启用的项目可以先以禁用配置存在，但不进入运行时可点击导航

这样可以避免首页出现死链接，同时保留后续扩页所需的结构稳定性。

## 10. SEO 与站点基础层

基础 SEO 使用 Next.js App Router 的标准 metadata 机制。

### 全站层

- 在 `src/app/layout.tsx` 中设置默认 `metadata`
- 设置 `lang="zh-CN"`
- 设置基础 `themeColor`
- 设置站点默认标题模板与描述

### 首页层

- 在首页定义独立标题和描述
- 输出基础 Open Graph 信息
- 站点文案围绕以下语义：
  - 企业级私有化 AI 知识智能平台方案
  - 从数据查询到知识决策
  - 可解释、可审计、企业级落地

### 暂不纳入

- 动态 SEO
- 新闻 schema
- 联系信息 schema
- 不存在资料支撑的地址、电话、邮箱字段

## 11. 资源边界

运行时资源不直接依赖归档目录。

采用以下边界：

- 归档资料由其他 AI 维护，作为内容整理输入
- 新项目只接收整理后的正式文案和正式视觉资源
- 运行时图片进入 `src/assets/`
- 站点公共文件进入 `public/`

这样可以确保归档层和交付层职责分离，避免资源污染。

## 12. 实施顺序

推荐实现顺序如下：

1. 创建 `lisu-official-site` 新项目骨架
2. 建立官网基础层
3. 定义归档到运行时内容契约
4. 整理首页内容模型
5. 实现首页 8 个 section
6. 定义并实现锚点导航行为
7. 完成样式统一与资源替换
8. 补齐首页 SEO 和站点公共文件

每一步都应保持“结构先于视觉，内容先于组件”的顺序。

## 13. 风险与规避

### 风险 1：旧模板耦合迁移过多

表现：

- 页面仍然带有滴普科技的信息架构和内容影子

规避：

- 只迁架构思路和无品牌耦合组件
- 不整页复制旧首页

### 风险 2：首页写成 PPT 拼贴页

表现：

- 文案密度失控
- 阅读路径像汇报材料而不是官网

规避：

- 每个 section 只承担一个清晰任务
- 文案进入内容模型前先做官网化改写

### 风险 3：V1 首页承载过多未来页面内容

表现：

- 首页过长
- 后续子页面难以建立独立价值

规避：

- 首页只做总览和摘要入口
- 详细内容延后到未来多页面阶段展开

### 风险 4：归档内容与运行时内容断链

表现：

- 页面文案能看懂，但无法回溯到 `archive/ppt-source`
- 图片、文案、section 和归档 slide 之间缺少稳定对应关系

规避：

- 在内容模型中强制保留 `sourceSlides`
- 在实现前先定义归档到运行时内容契约
- 验收时逐项检查 section 与 item 的来源映射

### 风险 5：锚点导航看起来成立，但运行时行为不稳定

表现：

- sticky header 遮挡标题
- active 状态不准确
- 摘要卡行为不一致

规避：

- 先定义锚点 ID 规范
- 明确 sticky 偏移策略
- 明确 active 状态规则和摘要卡行为规则

## 14. 验收标准

当以下条件满足时，可判定本设计方向成立：

- 新官网项目目录固定为 `/Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site`
- 首页承担 9 类内容职责，且页面实现收敛为 8 个 section
- 首页 8 个 section 均定义稳定锚点 ID
- `src/content/home.ts` 中每个 section 均包含 `sourceSlides`
- 首页中的关键摘要项均包含 `sourceSlides`
- 顶部导航不包含任何指向未实现子页的可点击链接
- V1 中不存在点击后进入空白页、占位页或 404 的入口
- 首页 metadata 至少包含标题、描述和基础 Open Graph 信息
- 后续进入实现阶段后，必须通过 `lint`、`typecheck`、`build` 三项校验

## 15. 当前假设

- 归档资料整理工作由其他 AI 负责，但必须按照本 spec 定义的追溯契约向主线提供可消费内容
- 首页 V1 不要求同步交付完整多页面站点
- 未来仍会扩展为多页面官网，因此本次结构需要预留扩展位

## 16. 下一步

本设计文档确认后，下一步应进入实现计划阶段。

计划重点应包括：

- 新项目初始化方式
- 从旧模板中迁移哪些最小必要文件
- 首页内容模型字段定义
- 8 个首页 section 的实现拆分
- 构建、类型检查和基础验收方式

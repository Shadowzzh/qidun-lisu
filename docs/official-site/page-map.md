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

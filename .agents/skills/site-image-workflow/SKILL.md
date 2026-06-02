---
name: site-image-workflow
description: 当需要为骊甦官网创建、评估、迭代或替换页面区块图片时使用，尤其适用于基于 archive 事实依据生成业务信息图、架构图、治理闭环图、实物感算力图等官网资产。覆盖事实校准、图片方向判断、提示词组织、先预览后替换、WebP 转换和确认后落地流程。
---
˝
# 官网图片工作流

用于处理官网中表达业务主张、架构、治理、能力、价值或事实依据的图片。

## 核心规则

把图片工作当成评审循环，不要当成一次性生成任务：

1. 先从 `archive/` 或已确认内容校准事实。
2. 再判断该项适合哪种图片类型。
3. 先生成预览图。
4. 打开或展示预览给用户看。
5. 根据用户的具体反馈迭代。
6. 只有用户明确确认后，才替换项目资产。
7. 如果站点已经引用 WebP，则把确认后的图片转成 WebP 再落地。

不要因为图片已经生成，就直接覆盖现有资产。

## 事实校准

生成或建议图片前，先判断区块文案是否有项目事实依据。

事实源优先级：

1. `archive/`：业务主张、方案内容、PPT 页事实。
2. `docs/official-site/`：当前官网规划。
3. `lisu-official-site/`：当前实现、内容结构和资产路径。

判断结果可以分三类：

- `符合事实依据`：能在来源材料中直接找到支撑。
- `基本符合，属于官网概括`：有依据，但官网做了压缩或转述。
- `需要谨慎`：包含精确数字、承诺、监管、合规或来源不明确的表达。

遇到精确事实时，要保留原始精度。例如 `64 卡 H20 集群`、`9024GB 显存` 不能随意画成泛化的“云 AI 能力”，除非该区块本来就是抽象表达。

## 图片方向

根据区块目的选择图片类型：

- `必要性`：对比图或阶段迁移图，例如实验阶段 → 生产阶段 → 业务敢用。
- `核心定位`：自然语言提问 → 知识语义层 → 带依据回答。
- `差异化价值`：左右对比 + 可治理链路；“本方案”侧要有足够文字说明。
- `架构总览`：分层架构图；突出 L5；中间写模块名，右侧写职责说明。
- `私有化部署价值`：私有机房或私有云边界 + 价值节点。
- `落地治理`：治理闭环图，不要做成一次性清单。
- `确定性承诺`：围绕决策、口径、审计的三柱或三角稳定结构。
- `算力底座`：更适合接近实物的数据中心、GPU 服务器或机房图。

涉及事实、决策链路和架构解释的图片，不要做成纯装饰图。

## 提示词结构

提示词要简洁，并明确列出必须出现的文字。图片中文字优先使用短中文标签，避免长段落。

基础模板：

```text
Use case: infographic-diagram
Asset type: website section illustration, 1536x1024 landscape enterprise infographic
Primary request: Generate an official-site image for “<区块标题>”.
Composition: <布局说明>.
Required visible Chinese labels: <必须出现的准确文字>.
Visual meaning: <这张图必须表达什么>.
Style: clean white and light-blue enterprise SaaS infographic, restrained 3D icons, thin connector lines, soft shadows, crisp typography, no watermark, no logo, no decorative gradient blobs.
Text constraints: prioritize Chinese text accuracy; keep text large, sharp, aligned, and not overlapping; avoid tiny placeholder lines.
```

架构图要把“中间模块”和“右侧职责”分开：

```text
Center module chips: <模块名称>.
Right responsibility cards: <职责说明，不重复模块名称>.
Do not repeat the same wording between center and right.
```

生成后必须检查文字。关键术语错了就重新生成，不要接受“视觉好看但核心文字错误”的图。

## 预览循环

生成后按这个顺序处理：

1. 定位 `$CODEX_HOME/generated_images/` 下最新生成文件。
2. 打开或预览给用户看。
3. 只总结高信号问题：
   - 事实表达是否准确；
   - 布局是否支撑该区块；
   - 中文文字是否有错字；
   - 是否已经适合替换。
4. 每次迭代只针对一个主要问题优化。

常见反馈处理：

- 用户说“内容少了文字”：补短说明卡片。
- 用户说“有点丑”：减少密度，增加留白，简化箭头，加强层级。
- 用户说“右边和中间重复”：中间写组件名，右侧写职责或结果。
- 用户说“接近实物”：从信息图转向真实机房、服务器或产品感图。
- 用户说“像思维导图/流程图”：用中心节点、分支节点和清晰箭头组织。

## 替换流程

只有用户明确说“替换”“覆盖”“放上去”或确认某张图可用后，才替换项目资源。

针对 `lisu-official-site/src/assets/site-page/solution/`：

1. 确认源生成 PNG 路径。
2. 确认目标资产路径。
3. 如果站点引用 WebP，用下面命令转换：

```bash
cwebp -quiet -q 88 <source.png> -o <target.webp>
```

4. 替换现有资源时沿用当前 import 的文件名。
5. 保留 `$CODEX_HOME/generated_images/` 下的原始生成文件。
6. 未经用户明确要求，不删除旧 PNG。
7. 修改代码引用或资源格式后，做轻量验证，通常运行 `npm run typecheck`。

常见目标文件：

- `solution-why-now.webp`
- `solution-core-positioning.webp`
- `solution-differentiation.webp`
- `solution-architecture.webp`
- `solution-private-deployment.webp`
- `solution-governance.webp`
- `solution-deterministic-commitment.webp`
- `solution-compute-foundation.webp`
- `solution-core-proposition.webp`
- `solution-architecture-method-flowchart.webp`

## 最终回复

最终回复保持简短：

- 说明替换了哪些文件；
- 说明当前是预览还是已经落地；
- 必要时说明格式和尺寸；
- 如果运行了验证，说明验证结果。

除非用户要提示词，否则不要输出大段提示词。

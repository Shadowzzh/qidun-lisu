import { coverVisuals } from "@/assets/cover";
import autoPartsKnowledgeHubImage from "@/assets/site-page/auto-parts-knowledge-hub.webp";
import autoPartsKnowledgeWorkspaceImage from "@/assets/site-page/auto-parts-knowledge-workspace.webp";
import forkliftKnowledgeGraphImage from "@/assets/site-page/forklift-knowledge-graph.webp";
import forkliftProcessMapImage from "@/assets/site-page/forklift-process-map.webp";
import solutionArchitectureMethodImage from "@/assets/site-page/solution/solution-architecture-method-flowchart.webp";
import solutionArchitectureImage from "@/assets/site-page/solution/solution-architecture.webp";
import solutionComputeFoundationImage from "@/assets/site-page/solution/solution-compute-foundation.webp";
import solutionCorePropositionImage from "@/assets/site-page/solution/solution-core-proposition.webp";
import solutionCorePositioningImage from "@/assets/site-page/solution/solution-core-positioning.webp";
import solutionDeterministicCommitmentImage from "@/assets/site-page/solution/solution-deterministic-commitment.webp";
import solutionDifferentiationImage from "@/assets/site-page/solution/solution-differentiation.webp";
import solutionGovernanceImage from "@/assets/site-page/solution/solution-governance.webp";
import solutionPrivateDeploymentImage from "@/assets/site-page/solution/solution-private-deployment.webp";
import solutionWhyNowImage from "@/assets/site-page/solution/solution-why-now.webp";
import type { SitePageContent } from "@/types/site";

export const sitePages: SitePageContent[] = [
  {
    href: "/solution",
    title: "主方案总览",
    eyebrow: "解决方案",
    description:
      "企业级私有化 AI 知识智能平台方案，从数据查询走向知识决策，建设可解释、可审计、可追溯的企业智能中枢。",
    cover: {
      alt: "主方案总览企业智能中枢架构图",
      title: "企业智能中枢架构",
      hint: "七层架构以知识语义层为核心枢纽，贯通算力、数据、能力开放和业务应用。",
      visual: coverVisuals.solution,
      sourceSlides: ["slide-01", "slide-10"],
    },
    highlights: [
      {
        label: "算力底座",
        value: "64 卡 H20 集群",
        description: "9024GB 显存支撑，为私有化环境下的生产级推理和复杂知识处理提供基础资源。",
        visual: {
          alt: "算力底座示意图",
          src: solutionComputeFoundationImage,
        },
        sourceSlides: ["slide-01"],
      },
      {
        label: "核心主张",
        value: "从数据查询到知识决策",
        description: "平台目标不是再做一套查询工具，而是让业务语言直接驱动可解释的决策链路。",
        visual: {
          alt: "核心主张示意图",
          src: solutionCorePropositionImage,
        },
        sourceSlides: ["slide-01", "slide-07"],
      },
      {
        label: "架构方式",
        value: "七层贯通、语义驱动",
        description: "从 L1 超算底座到 L7 应用层，L5 知识语义层承担业务概念、规则和溯源的核心枢纽。",
        visual: {
          alt: "架构方式示意图",
          src: solutionArchitectureMethodImage,
        },
        sourceSlides: ["slide-10"],
      },
    ],
    summaryPoints: [
      "拒绝概率玩具，打造企业知识大脑。",
      "七层架构贯通算力、数据、语义、应用和安全。",
      "以私有化部署保障数据主权、口径治理和审计确定性。",
      "通过知识 Owner、术语治理和业务验证闭环控制落地风险。",
    ],
    sourceSlides: ["slide-01", "slide-04", "slide-05", "slide-07", "slide-08", "slide-10", "slide-20", "slide-21", "slide-22"],
    sections: [
      {
        title: "为什么现在必须建设",
        description:
          "企业 AI 已经从实验阶段进入生产阶段，竞争焦点不再只是有没有 AI，而是核心业务是否敢用、会用、可追溯。",
        points: [
          "通用大模型存在幻觉和答案无依据等不可控问题，核心决策环节难以直接使用。",
          "供应链、风控、财务等关键业务仍依赖专家经验，响应速度和协同效率受限。",
          "同一业务概念在不同系统中定义不一致，会形成知识孤岛和跨部门口径冲突。",
        ],
        visual: {
          alt: "企业 AI 生产化建设必要性示意图",
          src: solutionWhyNowImage,
        },
        sourceSlides: ["slide-04", "slide-05"],
      },
      {
        title: "核心定位",
        description:
          "方案不是单纯提供底层模型 API，而是通过企业知识语义层，让业务人员用自然语言触达业务概念、规则和依据。",
        points: [
          "直接面向业务场景提供提问、回答和依据链路，而不是让业务线自行开发模型接口。",
          "业务规则显性约束输出，避免黑箱结论直接进入核心流程。",
          "将经验、规则和语义沉淀为知识资产，替代临时性提示工程和人工转述。",
        ],
        visual: {
          alt: "企业知识智能平台核心定位示意图",
          src: solutionCorePositioningImage,
        },
        sourceSlides: ["slide-07", "slide-08"],
      },
      {
        title: "差异化价值",
        description:
          "与通用 AI 中台相比，本方案的关键差异在于把语义、规则、记忆、编排和工具生态放进同一条可治理链路。",
        points: [
          "交互方式从技术人员调用 API 转为业务人员自然语言提问，降低核心业务使用门槛。",
          "生成机制从概率猜测转为语义约束生成，减少幻觉进入决策流程。",
          "知识沉淀从经验散落在人脑和文档中，转为版本可追溯的结构化资产。",
        ],
        visual: {
          alt: "语义约束与知识沉淀差异化价值示意图",
          src: solutionDifferentiationImage,
        },
        sourceSlides: ["slide-08"],
      },
      {
        title: "架构总览",
        description:
          "七层架构从 L1 超算底座到 L7 应用层纵向贯通，以 L5 知识语义层为核心枢纽，让数据、语义、能力开放和业务应用在同一架构中协同。",
        points: [
          "L5 知识语义层统一业务概念、规则显性化和决策溯源，向上支撑复杂业务应用，向下贯通数据存储与 AI 推理。",
          "L4 数据层组合 Milvus、ES、Neo4j Fabric、PGSQL 和 MinIO，支撑向量、文档、多媒体和图数据库能力。",
          "L6 能力开放层通过 Skill Engine、Context Engine、知识处理引擎、智能编排、记忆组件和工具连接层组合平台能力。",
        ],
        visual: {
          alt: "企业知识智能平台七层架构总览图",
          src: solutionArchitectureImage,
        },
        sourceSlides: ["slide-10", "slide-13", "slide-15"],
      },
      {
        title: "私有化部署价值",
        description:
          "对核心业务而言，私有化不是部署形式选择，而是数据主权、语义定制、长期成本和网络体验的基础约束。",
        points: [
          "数据不出机房，满足严格的数据安全和合规要求。",
          "自研语义层将企业专有规则、流程和知识库深度嵌入，形成真正懂业务的智能决策。",
          "内网闭环可降低公网依赖，保障核心业务系统低延迟、高并发响应。",
        ],
        visual: {
          alt: "私有化部署与数据主权价值示意图",
          src: solutionPrivateDeploymentImage,
        },
        sourceSlides: ["slide-20"],
      },
      {
        title: "落地治理",
        description:
          "企业知识平台不是单次上线项目，必须在语义建模、术语治理、数据质量和安全合规上同步建设。",
        points: [
          "每个业务域指定知识 Owner，全程参与语义建模，确保模型贴合业务。",
          "项目初期统一核心业务术语，降低多源异构数据的口径冲突。",
          "每完成一个语义域即对接真实业务场景验证，拒绝建完再看效果。",
        ],
        visual: {
          alt: "企业知识平台落地治理闭环示意图",
          src: solutionGovernanceImage,
        },
        sourceSlides: ["slide-21"],
      },
      {
        title: "确定性承诺",
        description:
          "方案最终要把 AI 从演示能力推进到生产能力，围绕决策、口径和审计建立确定性。",
        points: [
          "决策确定性：核心业务拒绝概率猜测，坚持规则驱动和可解释路径。",
          "口径确定性：全集团核心术语统一定义，降低跨部门各说各话。",
          "审计确定性：关键决策全链路留痕，支撑监管审计材料快速生成。",
        ],
        visual: {
          alt: "决策口径审计确定性承诺示意图",
          src: solutionDeterministicCommitmentImage,
        },
        sourceSlides: ["slide-22"],
      },
    ],
    relatedLinks: [
      { label: "能力总览", href: "/capabilities", kind: "route" },
      { label: "应用场景总览", href: "/scenarios", kind: "route" },
      { label: "案例总览", href: "/cases", kind: "route" },
    ],
  },
  {
    href: "/capabilities",
    title: "能力总览",
    eyebrow: "平台能力",
    description:
      "能力体系围绕知识语义层、AI 数据平台、安全管控和员工 AI 工作台展开，把平台能力拆成可理解、可组合、可落地的模块。",
    cover: {
      alt: "能力总览平台能力分层图",
      title: "平台能力分层",
      hint: "能力体系覆盖数据层、知识语义层、能力开放层和员工 AI 工作台。",
      visual: coverVisuals.capabilities,
      sourceSlides: ["slide-10", "slide-13", "slide-14", "slide-15"],
    },
    highlights: [
      {
        label: "数据层",
        value: "五大数据引擎",
        description: "Milvus、ES、Neo4j、PGSQL、MinIO 协同承接向量、全文、图谱、事实和非结构化对象。",
        sourceSlides: ["slide-13"],
      },
      {
        label: "语义层",
        value: "领域、规则、数据语义",
        description: "语义层定义业务是什么、业务之间如何关联，以及什么规则不可违背。",
        sourceSlides: ["slide-14"],
      },
      {
        label: "开放层",
        value: "模块化能力编排",
        description: "通过 Skill、Context、知识处理、Orchestration、Memory 和 Tool Connector 支撑复杂业务场景。",
        sourceSlides: ["slide-15"],
      },
    ],
    summaryPoints: [
      "知识语义层统一业务概念、规则和溯源路径。",
      "AI 数据平台承接多源数据和知识增强检索。",
      "能力开放层以模块化方式支撑应用组合。",
      "安全管控和员工工作台让能力进入生产组织。",
    ],
    sourceSlides: ["slide-10", "slide-13", "slide-14", "slide-15", "slide-17", "slide-18", "slide-28", "slide-29"],
    sections: [
      {
        title: "能力分层",
        description:
          "平台能力围绕知识语义层、AI 数据平台、安全管控和员工 AI 工作台展开，向下连接算力与数据基础，向上支撑知识问答、智能体和业务应用。",
        points: [
          "知识语义层统一业务概念、规则显性化和决策溯源，是数据智能走向知识智能的核心。",
          "AI 数据平台通过 Milvus、ES、Neo4j、PGSQL 和 MinIO 协同承接向量、全文、图谱、事实和非结构化对象。",
          "安全管控与员工 AI 工作台贯穿运行治理、知识搜索、知识问答、智能体中心和工具市场。",
        ],
        sourceSlides: ["slide-10", "slide-13", "slide-17", "slide-18", "slide-28", "slide-29"],
      },
      {
        title: "知识语义层",
        description:
          "知识语义层是从数据智能走向知识智能的关键能力，负责把业务概念、规则和数据映射统一起来。",
        points: [
          "领域语义定义供应链、订单等核心业务概念与关系。",
          "规则语义定义延迟到利润等业务逻辑与风控阈值。",
          "数据语义建立表字段、API 与上层业务概念的映射。",
        ],
        sourceSlides: ["slide-14"],
      },
      {
        title: "AI 数据平台",
        description:
          "AI 数据平台保留原有业务系统，通过多引擎协同和知识增强流程，为问答、智能体和决策提供事实基座。",
        points: [
          "Milvus、ES、Neo4j、PGSQL 和 MinIO 分别承接向量、全文、图谱、事实和非结构化对象。",
          "RAG/KAG 流程覆盖意图识别、混合召回、融合重排、上下文注入和反馈闭环。",
          "企业知识中台承接文档同步、文件上传、知识空间和专业词库等知识资产管理。",
        ],
        sourceSlides: ["slide-13", "slide-25", "slide-26"],
      },
      {
        title: "安全管控",
        description:
          "安全不是外挂模块，而是贯穿 L2 到 L7 的体系能力，覆盖供应链安全、身份、审批和追溯。",
        points: [
          "镜像签名、模型哈希校验和 SBOM 留存构成供应链安全三条底线。",
          "Operator、Voucher、Traceable 构成身份、审批和追溯闭环。",
          "网络微隔离、运行时自动阻断和敏感数据脱敏支撑零信任防护。",
        ],
        sourceSlides: ["slide-17", "slide-18"],
      },
      {
        title: "员工 AI 工作台",
        description:
          "工作台面向员工而不是技术后台，让知识搜索、知识问答、智能体和工具市场进入日常工作界面。",
        points: [
          "企业知识中心、智能体中心和工具市场形成统一入口。",
          "Web、H5、第三方 IM 和 API 集成应用覆盖多类触达方式。",
          "统一运营管理承接日志安全审计、系统配置和企业级管控。",
        ],
        sourceSlides: ["slide-28", "slide-29"],
      },
    ],
    relatedLinks: [
      { label: "知识语义层", href: "/capabilities/semantic-layer", kind: "route" },
      { label: "AI 数据平台", href: "/capabilities/data-platform", kind: "route" },
      { label: "安全管控", href: "/capabilities/security", kind: "route" },
      { label: "员工 AI 工作台", href: "/capabilities/workspace", kind: "route" },
    ],
  },
  {
    href: "/capabilities/semantic-layer",
    title: "知识语义层",
    eyebrow: "能力详情",
    description:
      "知识语义层定义业务是什么、业务之间如何关联、什么规则不可违背，是企业从数据智能走向知识智能的核心。",
    cover: {
      alt: "知识语义层语义约束生成图",
      title: "语义约束生成",
      hint: "受控生成闭环覆盖语义解析、规则执行、生成框架、LLM 润色和全路径溯源。",
      visual: coverVisuals.semanticLayer,
      sourceSlides: ["slide-14"],
    },
    highlights: [
      {
        label: "核心定位",
        value: "企业知识大脑",
        description: "语义层定义业务概念、业务关系和不可违背规则，为 LLM 提供企业定义的语义边界。",
        sourceSlides: ["slide-14"],
      },
      {
        label: "语义范围",
        value: "三类语义",
        description: "领域语义、规则语义和数据语义共同建立业务、规则和数据之间的映射。",
        sourceSlides: ["slide-14"],
      },
      {
        label: "生成机制",
        value: "受控生成",
        description: "语义解析、规则执行、生成框架、LLM 润色和可审计溯源共同约束输出。",
        sourceSlides: ["slide-14"],
      },
    ],
    summaryPoints: ["定义领域语义、规则语义和数据语义。", "用受控生成机制约束模型输出。", "让决策链路附带可审计、可溯源路径。"],
    sourceSlides: ["slide-07", "slide-14"],
    sections: [
      {
        title: "企业知识大脑",
        description: "语义层不是数据库结构，而是企业统一的业务语义架构。",
        points: [
          "领域语义定义供应链、订单等核心业务概念与关系。",
          "规则语义定义延迟到利润等业务逻辑与风控阈值。",
          "数据语义建立字段、API 和上层业务概念映射。",
        ],
        sourceSlides: ["slide-14"],
      },
      {
        title: "受控生成",
        description: "平台通过语义解析、规则执行、生成框架和 LLM 润色，让自然语言结果始终运行在业务边界内。",
        points: [
          "先识别业务概念，再进入确定性规则计算。",
          "输出结构化决策链，避免黑箱答案直接进入核心流程。",
          "附带全路径溯源，支撑复核、追责和审计。",
        ],
        sourceSlides: ["slide-14"],
      },
    ],
    relatedLinks: [
      { label: "能力总览", href: "/capabilities", kind: "route" },
      { label: "AI 数据平台", href: "/capabilities/data-platform", kind: "route" },
      { label: "安全管控", href: "/capabilities/security", kind: "route" },
    ],
  },
  {
    href: "/capabilities/data-platform",
    title: "AI 数据平台",
    eyebrow: "能力详情",
    description:
      "AI 数据平台以业务系统不动、语义贯通为设计理念，为上层问答、智能体和知识决策提供稳定的数据与知识基石。",
    cover: {
      alt: "AI 数据平台多引擎协同图",
      title: "多引擎协同",
      hint: "Milvus、ES、Neo4j、PGSQL 和 MinIO 协同支撑 RAG/KAG 知识增强流程。",
      visual: coverVisuals.dataPlatform,
      sourceSlides: ["slide-13"],
    },
    highlights: [
      {
        label: "设计理念",
        value: "业务系统不动",
        description: "保留原有 ERP、CRM、BI 作为核心数据源，不推翻、不替换。",
        sourceSlides: ["slide-13"],
      },
      {
        label: "数据引擎",
        value: "五类存储协同",
        description: "向量、全文、图谱、结构化事实和非结构化对象分别由不同引擎承接。",
        sourceSlides: ["slide-13"],
      },
      {
        label: "增强流程",
        value: "7 步 RAG/KAG",
        description: "从意图识别、混合召回、融合重排到幻觉检测、上下文注入和反馈闭环。",
        sourceSlides: ["slide-13"],
      },
    ],
    summaryPoints: ["保留原有业务系统，降低替换成本。", "多引擎协同支撑混合检索和知识推理。", "形成从召回到反馈的知识增强闭环。"],
    sourceSlides: ["slide-13", "slide-15", "slide-25"],
    sections: [
      {
        title: "多引擎协同",
        description: "平台组合 Milvus、ES、Neo4j、PGSQL 和 MinIO，分别承接向量、全文、图谱、事实和非结构化对象。",
        points: ["Milvus 负责稠密向量检索。", "ES 支撑全文和日志快速索引。", "Neo4j 承接语义存储与推理。"],
        sourceSlides: ["slide-13"],
      },
      {
        title: "知识增强数据流",
        description: "从查询意图识别到用户反馈，平台建立可持续更新的 RAG/KAG 流程。",
        points: ["多路并行混合召回提升覆盖率。", "知识处理引擎融合与重排序提升准确性。", "幻觉检测和精准上下文注入控制输出边界。"],
        sourceSlides: ["slide-13"],
      },
      {
        title: "企业知识中台",
        description: "在企业内部文档、知识库、权限和流程中统一管理知识资产。",
        points: ["支持文档同步、文件上传和内网文档处理。", "承接知识空间、知识库、专业词库和日志管理。", "为知识检索、智能问答和后续智能体应用供给知识。"],
        sourceSlides: ["slide-25", "slide-26"],
      },
    ],
    relatedLinks: [
      { label: "能力总览", href: "/capabilities", kind: "route" },
      { label: "知识语义层", href: "/capabilities/semantic-layer", kind: "route" },
      { label: "员工 AI 工作台", href: "/capabilities/workspace", kind: "route" },
    ],
  },
  {
    href: "/capabilities/security",
    title: "安全管控",
    eyebrow: "能力详情",
    description:
      "安全管控不是外挂组件，而是贯穿 L2 到 L7 的内置能力，通过身份、审批、溯源形成全链路闭环。",
    cover: {
      alt: "安全管控 OVTP 安全闭环图",
      title: "OVTP 安全闭环",
      hint: "OVTP 体系通过 Operator、Voucher 和 Traceable 管控供应链安全链路。",
      visual: coverVisuals.securityGovernance,
      sourceSlides: ["slide-17", "slide-18"],
    },
    highlights: [
      {
        label: "准入红线",
        value: "三条供应链安全底线",
        description: "镜像签名、模型哈希校验和 SBOM 留存共同构成生产环境准入要求。",
        sourceSlides: ["slide-17"],
      },
      {
        label: "闭环体系",
        value: "OVTP 全链路",
        description: "Operator、Voucher、Traceable 对应身份确认、操作审批和全程追溯。",
        sourceSlides: ["slide-18"],
      },
      {
        label: "防护方式",
        value: "零信任多维防护",
        description: "网络微隔离、运行时自动阻断和敏感数据脱敏支撑企业级管控。",
        sourceSlides: ["slide-18"],
      },
    ],
    summaryPoints: ["供应链安全和 OVTP 安全体系贯穿平台运行。", "身份、审批、追溯形成三位一体闭环。", "零信任多维防护支撑核心业务生产化。"],
    sourceSlides: ["slide-17", "slide-18", "slide-21"],
    sections: [
      {
        title: "供应链安全",
        description: "平台不追求大而全，而是严守生产环境准入红线。",
        points: ["Harbor 集成 Cosign 自动化签名，Kyverno 强制拦截未签名镜像。", "模型入库生成 SHA256 指纹，加载前进行分块一致性校验。", "CI 流水线生成 SPDX 标准 SBOM，并与镜像、模型包一并归档。"],
        sourceSlides: ["slide-17"],
      },
      {
        title: "OVTP 全链路",
        description: "平台基于 Operator、Voucher、Traceable 构建安全闭环。",
        points: ["Operator 通过身份对接和业务语义角色确认操作者。", "Voucher 将核心规则变更绑定审批单。", "Traceable 通过审计日志和存证保证轨迹不可篡改。"],
        sourceSlides: ["slide-18"],
      },
      {
        title: "风险应对",
        description: "安全合规从项目启动同步建设，避免平台后期补合规、补审计。",
        points: ["规则引擎初筛、多源交叉验证和关键场景人工复核共同降低幻觉风险。", "知识 Owner 和术语治理委员会参与语义建模。", "语义域验收需业务 Owner 确认。"],
        sourceSlides: ["slide-21"],
      },
    ],
    relatedLinks: [
      { label: "能力总览", href: "/capabilities", kind: "route" },
      { label: "知识语义层", href: "/capabilities/semantic-layer", kind: "route" },
      { label: "应用场景总览", href: "/scenarios", kind: "route" },
    ],
  },
  {
    href: "/capabilities/workspace",
    title: "员工 AI 工作台",
    eyebrow: "能力详情",
    description:
      "员工 AI 工作台把知识中心、智能体中心、工具市场和统一运营管理组织到同一个工作入口，让 AI 能力进入日常业务界面。",
    cover: {
      alt: "员工 AI 工作台入口图",
      title: "员工工作入口",
      hint: "员工 AI 工作台整合企业知识中心、智能体中心、工具市场和统一运营管理。",
      visual: coverVisuals.workspace,
      sourceSlides: ["slide-28"],
    },
    highlights: [
      {
        label: "入口组成",
        value: "知识中心、智能体、工具市场",
        description: "工作台把知识搜索、知识问答、内置应用和配置应用统一到员工使用入口。",
        sourceSlides: ["slide-28"],
      },
      {
        label: "集成方式",
        value: "Web、H5、IM、API",
        description: "工作台可以通过 Web、移动端、第三方 IM 和 API 集成应用触达不同业务现场。",
        sourceSlides: ["slide-28"],
      },
      {
        label: "服务范围",
        value: "开发、梳理、评测、陪跑",
        description: "定制与服务覆盖智能体开发、知识梳理、智能体评测和 AI 能力建设陪跑。",
        sourceSlides: ["slide-28"],
      },
    ],
    summaryPoints: ["提供知识搜索、知识问答、内置应用和配置应用。", "支撑 Web、H5、第三方 IM 与 API 集成。", "承接智能体开发、知识梳理、评测和能力陪跑。"],
    sourceSlides: ["slide-25", "slide-28", "slide-29"],
    sections: [
      {
        title: "工作入口",
        description: "工作台面向员工而不是技术后台，降低业务人员使用 AI 的门槛。",
        points: ["企业知识中心统一管理知识资产。", "智能体中心承接标准应用和定制应用。", "工具市场连接 API、MCP 和通用工具。"],
        sourceSlides: ["slide-28"],
      },
      {
        title: "应用场景",
        description: "工作台可以承接技术信息管理、售前咨询、售后服务、表格翻译和行业报告等具体任务。",
        points: ["技术标准智搜和专业表格翻译提升知识查找效率。", "海关编码智搜、物料备货推荐和装箱计算服务供应链业务。", "售后服务助手和产品配置顾问沉淀经验。"],
        sourceSlides: ["slide-28"],
      },
      {
        title: "知识体系",
        description: "平台围绕产品技术参数、操作保养维修手册和故障代码表建设向量与图谱能力。",
        points: ["支持基于图谱的智能售前咨询。", "支持售后维修、标配选配查找和技术参数解答。", "将专家经验转化为可调用的企业知识资产。"],
        visual: {
          alt: "叉车制造知识体系图谱界面",
          src: forkliftKnowledgeGraphImage,
        },
        sourceSlides: ["slide-29"],
      },
    ],
    relatedLinks: [
      { label: "能力总览", href: "/capabilities", kind: "route" },
      { label: "AI 数据平台", href: "/capabilities/data-platform", kind: "route" },
      { label: "客服运营场景", href: "/scenarios/customer-operations", kind: "route" },
    ],
  },
  {
    href: "/scenarios",
    title: "应用场景总览",
    eyebrow: "应用场景",
    description:
      "平台能力可进入供应链、财务、风控和客服运营等关键环节，让业务判断建立在统一知识、可解释路径和可审计过程之上。",
    cover: {
      alt: "应用场景总览四类业务场景图",
      title: "四类业务场景",
      hint: "首批业务场景覆盖供应链、财务、风控和客服运营四个业务版块。",
      visual: coverVisuals.industrialAi,
      sourceSlides: ["slide-16"],
    },
    highlights: [
      {
        label: "供应链",
        value: "3 天到 10 分钟",
        description: "调货决策周期从 3 天压缩到 10 分钟，并沉淀专家规则和跨域因果链。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "财务",
        value: "周级到分钟级",
        description: "审计支撑材料准备从周级压缩到分钟级，同时治理预算和指标口径。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "风控",
        value: "规则显性、预警可解释",
        description: "风险规则纳入知识大脑，预警附带推理路径，并可生成标准化决策档案。",
        sourceSlides: ["slide-16"],
      },
    ],
    summaryPoints: [
      "供应链强调规则沉淀和跨域因果链。",
      "财务强调口径治理和审计支撑。",
      "风控强调可解释预警和合规可视。",
      "客服运营强调精准答复与经验传承。",
    ],
    sourceSlides: ["slide-16", "slide-20", "slide-21", "slide-22"],
    sections: [
      {
        title: "供应链智能决策",
        description: "供应链场景把专家经验、跨域规则和自然语言问答引入调货、延迟、成本和利润决策。",
        points: ["调货决策周期从 3 天压缩到 10 分钟。", "专家经验显性化，沉淀为数字资产。", "自动关联延迟、成本和利润因果链。"],
        sourceSlides: ["slide-16"],
      },
      {
        title: "财务精准提效",
        description: "财务场景围绕预算智能、指标口径和审计支撑，把判断建立在统一知识与依据链之上。",
        points: ["预算智能提升编制科学性与准确性。", "核心指标统一定义，解决数据冲突。", "审计支撑材料准备从周级压缩到分钟级。"],
        sourceSlides: ["slide-16"],
      },
      {
        title: "风控合规可视",
        description: "风控场景强调规则显性、预警可解释和监管报送，让 AI 辅助判断可以进入合规管理流程。",
        points: ["风险规则纳入知识大脑，变更需要审批。", "预警附带推理路径，拒绝黑盒警报。", "自动生成标准化决策档案，支撑监管报送。"],
        sourceSlides: ["slide-16"],
      },
      {
        title: "客服运营智能传承",
        description: "客服运营场景通过业务知识、智能问答和经验沉淀，提升答复准确性、分析效率和新人培训速度。",
        points: ["智能客服基于业务知识提供精准答案。", "业务语言提问可生成分析图表。", "经验传承显著缩短新人上岗培训周期。"],
        sourceSlides: ["slide-16"],
      },
      {
        title: "私有化支撑",
        description: "核心业务场景需要数据不出机房、低延迟、可控成本和深度语义定制。",
        points: ["数据主权满足严格的数据安全与合规要求。", "自研语义层让业务规则深度内嵌。", "内网闭环保障低延迟和高并发响应。"],
        sourceSlides: ["slide-20"],
      },
      {
        title: "验证闭环",
        description: "场景建设不能脱离真实业务验证，语义域建设后要立即对接 1 到 2 个真实业务场景。",
        points: ["知识 Owner 深度参与语义建模。", "术语治理委员会前置统一核心业务术语。", "语义域验收需业务 Owner 确认。"],
        sourceSlides: ["slide-21"],
      },
    ],
    relatedLinks: [
      { label: "供应链场景", href: "/scenarios/supply-chain", kind: "route" },
      { label: "财务场景", href: "/scenarios/finance", kind: "route" },
      { label: "风控场景", href: "/scenarios/risk-control", kind: "route" },
      { label: "客服运营场景", href: "/scenarios/customer-operations", kind: "route" },
    ],
  },
  {
    href: "/scenarios/supply-chain",
    title: "供应链场景",
    eyebrow: "场景详情",
    description:
      "供应链场景聚焦调货决策、规则沉淀和跨域因果对齐，把专家经验转化为可复用、可追溯的数字资产。",
    cover: {
      alt: "供应链场景业务因果链图",
      title: "供应链业务因果链",
      hint: "供应链场景围绕调货决策、延迟、成本和利润建立可解释的业务因果链。",
      visual: coverVisuals.supplyChain,
      sourceSlides: ["slide-16"],
    },
    highlights: [
      {
        label: "决策周期",
        value: "3 天 → 10 分钟",
        description: "供应链智能问答用于压缩调货决策周期。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "规则沉淀",
        value: "专家经验数字资产化",
        description: "供应链专家经验显性化，进入可复用的规则体系。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "跨域对齐",
        value: "延迟-成本-利润",
        description: "平台自动关联延迟、成本和利润之间的因果链。",
        sourceSlides: ["slide-16"],
      },
    ],
    summaryPoints: ["调货决策周期从天级压缩到分钟级。", "专家经验显性化沉淀为规则。", "自动关联延迟、成本和利润等因果链。"],
    sourceSlides: ["slide-16", "slide-21", "slide-22"],
    sections: [
      {
        title: "智能决策",
        description: "供应链问题通常牵涉多系统、多口径和多角色，语义层可以统一业务概念和约束条件。",
        points: ["把订单、库存、交付、成本和利润放到同一语义体系。", "通过自然语言问答降低业务人员分析门槛。", "决策结果附带来源与推理路径，便于复核。"],
        sourceSlides: ["slide-16", "slide-14"],
      },
      {
        title: "落地保障",
        description: "供应链场景依赖知识 Owner 深度参与和术语治理前置。",
        points: ["首批统一核心供应链术语。", "每个语义域对接真实业务场景验证。", "风险与规则变更进入审批和审计链路。"],
        sourceSlides: ["slide-21", "slide-18"],
      },
    ],
    relatedLinks: [
      { label: "应用场景总览", href: "/scenarios", kind: "route" },
      { label: "AI 数据平台", href: "/capabilities/data-platform", kind: "route" },
      { label: "汽车零部件案例", href: "/cases/auto-parts", kind: "route" },
    ],
  },
  {
    href: "/scenarios/finance",
    title: "财务场景",
    eyebrow: "场景详情",
    description:
      "财务场景聚焦预算智能、口径治理和审计支撑，让财务判断建立在统一知识与可追溯过程之上。",
    cover: {
      alt: "财务场景口径治理图",
      title: "财务口径治理",
      hint: "财务场景聚焦预算、指标口径、审计材料和依据链的统一管理。",
      visual: coverVisuals.finance,
      sourceSlides: ["slide-16"],
    },
    highlights: [
      {
        label: "预算智能",
        value: "科学性与准确性",
        description: "财务版块通过预算智能提升编制的科学性与准确性。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "口径治理",
        value: "核心指标统一定义",
        description: "统一指标定义，用于解决多系统、多部门之间的数据冲突。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "审计支撑",
        value: "周级 → 分钟级",
        description: "审计材料准备周期从周级压缩到分钟级。",
        sourceSlides: ["slide-16"],
      },
    ],
    summaryPoints: ["提升预算编制科学性与准确性。", "统一核心指标定义，解决数据冲突。", "审计材料准备从周级压缩到分钟级。"],
    sourceSlides: ["slide-16", "slide-20", "slide-22"],
    sections: [
      {
        title: "口径治理",
        description: "财务场景最怕指标口径不一致，语义层要先定义业务概念，再连接数据字段。",
        points: ["把预算、成本、利润、审计材料等概念统一到语义体系。", "让自然语言提问直达业务概念。", "对关键指标输出提供依据链。"],
        sourceSlides: ["slide-16", "slide-14"],
      },
      {
        title: "审计确定性",
        description: "平台通过留痕和存证机制降低审计准备成本。",
        points: ["关键决策链路保留操作和审批记录。", "材料生成基于统一术语和规则。", "审计过程可回看、可解释、可追溯。"],
        sourceSlides: ["slide-18", "slide-22"],
      },
    ],
    relatedLinks: [
      { label: "应用场景总览", href: "/scenarios", kind: "route" },
      { label: "知识语义层", href: "/capabilities/semantic-layer", kind: "route" },
      { label: "安全管控", href: "/capabilities/security", kind: "route" },
    ],
  },
  {
    href: "/scenarios/risk-control",
    title: "风控场景",
    eyebrow: "场景详情",
    description:
      "风控场景强调规则显性、预警可解释和监管报送，让 AI 辅助判断可以进入合规管理流程。",
    cover: {
      alt: "风控场景合规预警闭环图",
      title: "合规预警闭环",
      hint: "风控场景覆盖规则审批、预警解释、决策档案和监管报送链路。",
      visual: coverVisuals.riskControl,
      sourceSlides: ["slide-16", "slide-18"],
    },
    highlights: [
      {
        label: "规则显性",
        value: "纳入知识大脑",
        description: "风险规则进入知识大脑，变更需要审批以确保合规。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "可解释性",
        value: "拒绝黑盒警报",
        description: "预警附带推理路径，便于复核、追责和合规说明。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "监管报送",
        value: "标准化决策档案",
        description: "平台可自动生成标准化决策档案，支撑监管报送。",
        sourceSlides: ["slide-16"],
      },
    ],
    summaryPoints: ["风险规则纳入知识大脑。", "预警附带推理路径，拒绝黑盒警报。", "自动生成标准化决策档案。"],
    sourceSlides: ["slide-16", "slide-18", "slide-21"],
    sections: [
      {
        title: "合规可视",
        description: "风控结果必须解释原因，平台通过语义规则和路径溯源让预警具备业务可读性。",
        points: ["规则变更需要审批和留痕。", "预警结果展示触发条件和推理路径。", "关键场景可纳入人工复核机制。"],
        sourceSlides: ["slide-16", "slide-21"],
      },
      {
        title: "安全闭环",
        description: "风控场景与 OVTP 安全体系天然关联。",
        points: ["身份确认保证责任边界清晰。", "审批链路降低规则误改风险。", "存证和审计日志支撑监管报送。"],
        sourceSlides: ["slide-18"],
      },
    ],
    relatedLinks: [
      { label: "应用场景总览", href: "/scenarios", kind: "route" },
      { label: "安全管控", href: "/capabilities/security", kind: "route" },
      { label: "主方案总览", href: "/solution", kind: "route" },
    ],
  },
  {
    href: "/scenarios/customer-operations",
    title: "客服运营场景",
    eyebrow: "场景详情",
    description:
      "客服运营场景通过业务知识、智能问答和经验沉淀，提升答复准确性、分析效率和新人培训速度。",
    cover: {
      alt: "客服运营场景知识运营图",
      title: "客服知识运营",
      hint: "客服运营场景聚焦知识问答、售前售后助手、经验传承和反馈闭环。",
      visual: coverVisuals.customerOperations,
      sourceSlides: ["slide-16", "slide-28"],
    },
    highlights: [
      {
        label: "智能客服",
        value: "基于业务知识精准答复",
        description: "智能客服基于业务知识提供精准答案。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "自助分析",
        value: "业务语言生成图表",
        description: "业务人员可通过自然语言提问生成分析图表。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "经验传承",
        value: "缩短新人培训周期",
        description: "平台通过经验沉淀显著缩短新人上岗培训周期。",
        sourceSlides: ["slide-16"],
      },
    ],
    summaryPoints: ["基于业务知识提供精准答案。", "业务语言提问生成分析图表。", "经验传承缩短新人上岗周期。"],
    sourceSlides: ["slide-16", "slide-25", "slide-28", "slide-29"],
    sections: [
      {
        title: "智能传承",
        description: "客服运营的价值在于把分散经验沉淀到知识体系中，再通过工作台进入服务过程。",
        points: ["知识问答基于企业文档、手册和图谱。", "售前咨询、售后维修和产品配置可以通过智能体承接。", "新人培训可以复用标准问答和案例知识。"],
        sourceSlides: ["slide-16", "slide-28", "slide-29"],
      },
      {
        title: "运营闭环",
        description: "客服运营场景连接员工 AI 工作台和知识体系建设。",
        points: ["问答质量通过反馈持续优化。", "工具市场连接坐席系统、微信小程序和业务系统。", "统一日志和审计支撑服务质量复盘。"],
        sourceSlides: ["slide-13", "slide-28"],
      },
    ],
    relatedLinks: [
      { label: "应用场景总览", href: "/scenarios", kind: "route" },
      { label: "员工 AI 工作台", href: "/capabilities/workspace", kind: "route" },
      { label: "叉车制造案例", href: "/cases/forklift", kind: "route" },
    ],
  },
  {
    href: "/cases",
    title: "案例总览",
    eyebrow: "客户实践",
    description:
      "制造业知识中台与工业产品知识图谱案例，展示平台在本地部署、知识治理、权限管控和业务智能体中的落地方式。",
    cover: {
      alt: "案例总览制造业案例矩阵图",
      title: "制造业案例矩阵",
      hint: "案例覆盖汽车零部件全球 AI 知识中台和叉车工业产品知识图谱。",
      visual: coverVisuals.cases,
      sourceSlides: ["slide-24", "slide-27"],
    },
    highlights: [
      {
        label: "案例一",
        value: "全球 AI 知识中台",
        description: "中国汽车零部件制造头部企业构建全球 AI 知识中台。",
        sourceSlides: ["slide-24"],
      },
      {
        label: "案例二",
        value: "工业产品知识图谱",
        description: "中国叉车制造头部企业建设工业产品知识图谱应用。",
        sourceSlides: ["slide-27"],
      },
      {
        label: "共性能力",
        value: "知识资产、权限、智能问答",
        description: "案例材料共同指向本地知识存储、权限管控、知识搜索、智能问答和智能体应用。",
        sourceSlides: ["slide-25", "slide-26", "slide-28", "slide-29"],
      },
    ],
    summaryPoints: [
      "汽车零部件案例展示全球 AI 知识中台建设。",
      "叉车制造案例展示工业产品知识图谱应用。",
      "案例经验与团队能力共同建立可信度。",
      "案例材料覆盖本地部署、知识管理、权限管控和业务智能体。",
    ],
    sourceSlides: ["slide-24", "slide-25", "slide-26", "slide-27", "slide-28", "slide-29"],
    sections: [
      {
        title: "案例结构",
        description: "案例从行业知识、系统对接和业务应用出发，呈现平台进入真实业务场景的建设路径。",
        points: ["从客户业务问题切入。", "梳理知识资产、权限、系统对接和智能体应用。", "形成可复用的建设方法。"],
        sourceSlides: ["slide-24", "slide-27"],
      },
      {
        title: "汽车零部件知识中台",
        description: "案例围绕全球 AI 知识中台，强调本地部署 GPU 算力、本地知识存储和企业知识安全管理。",
        points: ["企业内部文档智能解析全部本地完成。", "基于企业知识安全管理目标统一管理本地知识。", "对接文件、文件夹、知识库、内网文档同步和文件上传。"],
        visual: {
          alt: "汽车零部件知识中台示意图",
          src: autoPartsKnowledgeHubImage,
        },
        sourceSlides: ["slide-24", "slide-25"],
      },
      {
        title: "知识资产管理",
        description: "汽车零部件案例中的知识中台覆盖企业和个人双场景，并强调权限与文件生命周期。",
        points: ["覆盖企业和个人双场景的知识资产全生命周期管理。", "强权限与安全管控体系适配多层级、多角色内部管理。", "企业级文件生命周期管理支持 20+ 格式、智能处理和内外源整合。"],
        visual: {
          alt: "汽车零部件知识资产管理界面",
          src: autoPartsKnowledgeWorkspaceImage,
        },
        sourceSlides: ["slide-26"],
      },
      {
        title: "叉车知识图谱",
        description: "叉车制造案例聚焦工业产品知识图谱，把产品参数、手册和故障代码沉淀为可问答、可推理的知识体系。",
        points: ["围绕产品技术参数、操作保养维修手册和故障代码表做知识梳理。", "以向量和图谱承接产品知识。", "支持基于图谱的智能售前咨询和售后维修。"],
        visual: {
          alt: "叉车制造产品知识图谱流程图",
          src: forkliftProcessMapImage,
        },
        sourceSlides: ["slide-27", "slide-29"],
      },
      {
        title: "工作台承接",
        description: "案例中的知识能力需要通过员工 AI 工作台进入业务流程，而不是停留在后台知识库。",
        points: ["企业知识中心、智能体中心和工具市场形成统一入口。", "技术标准智搜、售后服务助手、售前咨询助手等应用进入业务现场。", "定制服务覆盖智能体开发、知识梳理、评测和 AI 能力建设陪跑。"],
        sourceSlides: ["slide-28"],
      },
      {
        title: "背书价值",
        description: "制造业案例与团队背景共同证明平台在行业知识、工程交付和安全治理上的综合能力。",
        points: ["制造业案例支撑平台可落地性。", "团队背景支撑复杂项目交付能力。", "行业知识、工程能力和安全治理形成合力。"],
        sourceSlides: ["slide-24", "slide-27", "slide-30"],
      },
    ],
    relatedLinks: [
      { label: "汽车零部件案例", href: "/cases/auto-parts", kind: "route" },
      { label: "叉车制造案例", href: "/cases/forklift", kind: "route" },
      { label: "核心团队", href: "/about/team", kind: "route" },
    ],
  },
  {
    href: "/cases/auto-parts",
    title: "汽车零部件案例",
    eyebrow: "案例详情",
    description:
      "汽车零部件案例围绕全球 AI 知识中台建设，展示企业内部文档、本地知识存储、权限管控和智能问答如何组合落地。",
    cover: {
      alt: "汽车零部件全球 AI 知识中台图",
      title: "全球 AI 知识中台",
      hint: "汽车零部件案例围绕本地部署、知识处理平台、文档同步和智能问答展开。",
      visual: coverVisuals.autoParts,
      sourceSlides: ["slide-24", "slide-25"],
    },
    highlights: [
      {
        label: "案例方向",
        value: "全球 AI 知识中台",
        description: "中国汽车零部件制造头部企业构建全球 AI 知识中台。",
        sourceSlides: ["slide-24"],
      },
      {
        label: "部署方式",
        value: "本地 GPU 算力",
        description: "保证企业内部文档智能解析全部本地完成。",
        sourceSlides: ["slide-25"],
      },
      {
        label: "知识管理",
        value: "文档、流程、权限、系统对接",
        description: "为企业量身定制知识管理能力，覆盖文档管理、流程、权限管控和系统对接。",
        sourceSlides: ["slide-25"],
      },
    ],
    summaryPoints: ["构建全球 AI 知识中台。", "企业内部文档智能解析全部本地完成。", "围绕企业知识安全管理目标统一管理。"],
    sourceSlides: ["slide-24", "slide-25", "slide-26"],
    sections: [
      {
        title: "建设目标",
        description: "案例以本地部署 GPU 算力、统一本地知识存储和企业级知识管理为基础。",
        points: ["保证企业内部文档智能解析在本地完成。", "统一管理企业知识、文档、流程和权限。", "对接文件、知识库和内网文档同步。"],
        visual: {
          alt: "汽车零部件知识中台示意图",
          src: autoPartsKnowledgeHubImage,
        },
        sourceSlides: ["slide-25"],
      },
      {
        title: "核心能力",
        description: "案例覆盖知识资产全生命周期管理、强权限体系和企业级文件管理。",
        points: ["覆盖企业和个人双场景知识资产。", "适配多层级、多角色的内部管控。", "支持 20+ 格式、智能处理和内外源整合。"],
        visual: {
          alt: "汽车零部件知识资产管理界面",
          src: autoPartsKnowledgeWorkspaceImage,
        },
        sourceSlides: ["slide-26"],
      },
    ],
    relatedLinks: [
      { label: "案例总览", href: "/cases", kind: "route" },
      { label: "AI 数据平台", href: "/capabilities/data-platform", kind: "route" },
      { label: "供应链场景", href: "/scenarios/supply-chain", kind: "route" },
    ],
  },
  {
    href: "/cases/forklift",
    title: "叉车制造案例",
    eyebrow: "案例详情",
    description:
      "叉车制造案例聚焦工业产品知识图谱应用，把产品技术参数、操作保养维修手册和故障代码沉淀为可问答、可推理的知识体系。",
    cover: {
      alt: "叉车制造工业产品知识图谱图",
      title: "工业产品知识图谱",
      hint: "叉车制造案例把产品参数、维修手册、故障代码和售前售后应用连接为知识图谱。",
      visual: coverVisuals.forklift,
      sourceSlides: ["slide-27", "slide-29"],
    },
    highlights: [
      {
        label: "案例方向",
        value: "工业产品知识图谱",
        description: "中国叉车制造头部企业的工业产品知识图谱应用。",
        sourceSlides: ["slide-27"],
      },
      {
        label: "知识对象",
        value: "参数、手册、故障代码",
        description: "知识体系覆盖产品技术参数、操作保养维修手册和故障代码表。",
        sourceSlides: ["slide-29"],
      },
      {
        label: "应用承接",
        value: "售前咨询、售后维修",
        description: "基于图谱支撑智能售前咨询、售后维修、标配选配查找和技术参数解答。",
        sourceSlides: ["slide-29"],
      },
    ],
    summaryPoints: ["建设工业产品知识图谱应用。", "围绕向量和图谱组织产品知识。", "支撑售前咨询、售后维修和技术参数解答。"],
    sourceSlides: ["slide-27", "slide-28", "slide-29"],
    sections: [
      {
        title: "知识体系",
        description: "案例把产品技术参数、手册、故障代码表等内容进行知识梳理。",
        points: ["形成向量与图谱并行的知识底座。", "支持标配和选配查找。", "支持技术参数解答。"],
        visual: {
          alt: "叉车制造知识体系图谱界面",
          src: forkliftKnowledgeGraphImage,
        },
        sourceSlides: ["slide-29"],
      },
      {
        title: "应用承接",
        description: "工作台和智能体将知识图谱能力带入售前、售后和服务流程。",
        points: ["智能售前咨询帮助快速回答产品问题。", "售后维修知识问答降低专家依赖。", "定制 AI 智能体承接行业服务流程。"],
        visual: {
          alt: "叉车制造产品知识图谱流程图",
          src: forkliftProcessMapImage,
        },
        sourceSlides: ["slide-28", "slide-29"],
      },
    ],
    relatedLinks: [
      { label: "案例总览", href: "/cases", kind: "route" },
      { label: "员工 AI 工作台", href: "/capabilities/workspace", kind: "route" },
      { label: "客服运营场景", href: "/scenarios/customer-operations", kind: "route" },
    ],
  },
  {
    href: "/about",
    title: "公司介绍",
    eyebrow: "公司能力",
    description:
      "北京骊甦科技围绕企业级私有化 AI 知识智能平台，结合人工智能、数智化与安全技术能力，为企业建设知识驱动的智能中枢。",
    cover: {
      alt: "公司介绍团队与方案图",
      title: "骊甦团队与方案",
      hint: "公司能力由团队背景、平台方案和制造业案例共同支撑。",
      visual: coverVisuals.about,
      sourceSlides: ["slide-01", "slide-30"],
    },
    highlights: [
      {
        label: "公司主线",
        value: "企业级私有化 AI 知识智能平台",
        description: "公司能力围绕平台方案、知识决策和私有化可信交付展开。",
        sourceSlides: ["slide-01"],
      },
      {
        label: "团队结构",
        value: "AI、数智化、安全",
        description: "核心团队覆盖人工智能、企业数智化和安全技术方向。",
        sourceSlides: ["slide-30"],
      },
      {
        label: "背书路径",
        value: "方案、能力、案例、团队",
        description: "通过解决方案、能力体系、制造业案例和核心团队建立客户信任。",
        sourceSlides: ["slide-01", "slide-24", "slide-27", "slide-30"],
      },
    ],
    summaryPoints: [
      "定位企业级私有化 AI 知识智能平台方案服务商。",
      "团队覆盖人工智能、数智化转型和安全工程。",
      "以方案、能力、案例和团队共同支撑复杂企业 AI 项目。",
      "聚焦知识决策、私有化部署和安全可审计的企业级场景。",
    ],
    sourceSlides: ["slide-01", "slide-30"],
    sections: [
      {
        title: "公司定位",
        description: "北京骊甦科技聚焦企业级私有化 AI 知识智能平台，为核心业务提供知识驱动的智能中枢能力。",
        points: ["围绕知识决策、私有化部署和安全可审计组织能力。", "用团队能力支撑复杂企业 AI 项目交付。", "通过案例和咨询入口连接真实业务需求。"],
        sourceSlides: ["slide-01", "slide-22"],
      },
      {
        title: "人工智能能力",
        description: "团队中包含人工智能专家和首席科学家角色，为知识智能和模型方向提供技术牵引。",
        points: ["任奎为人工智能专家。", "团队材料标注其为首席科学家。", "知识语义层、受控生成和知识图谱方向需要 AI 能力支撑。"],
        sourceSlides: ["slide-14", "slide-30"],
      },
      {
        title: "数智化能力",
        description: "企业级平台需要理解管理流程、业务场景和组织协同，数智化经验是落地关键。",
        points: ["谭瑞忠为企业数智化专家。", "材料标注其拥有 30 年数智化转型经验。", "方案落地依赖知识 Owner、术语治理和业务验证闭环。"],
        sourceSlides: ["slide-21", "slide-30"],
      },
      {
        title: "工程与安全能力",
        description: "私有化 AI 平台进入生产环境，需要软件工程、安全管控和运行治理能力共同支撑。",
        points: ["周识儒具备 15 年互联网开发经验，并有前盛大、淘宝 AI 专家经历。", "杨海具备 30 年软件开发管理经验，并有前 Intel 研发总监经历。", "供应链安全和 OVTP 体系需要工程与安全治理能力支撑。"],
        sourceSlides: ["slide-17", "slide-18", "slide-30"],
      },
      {
        title: "案例背书",
        description: "制造业知识中台和工业产品知识图谱案例，证明平台能力可以进入真实业务场景。",
        points: ["汽车零部件案例展示全球 AI 知识中台。", "叉车制造案例展示工业产品知识图谱。", "员工 AI 工作台和知识体系材料支撑平台落地路径。"],
        sourceSlides: ["slide-24", "slide-27", "slide-28", "slide-29"],
      },
    ],
    relatedLinks: [
      { label: "核心团队", href: "/about/team", kind: "route" },
      { label: "联系方式", href: "/about/contact", kind: "route" },
      { label: "案例总览", href: "/cases", kind: "route" },
    ],
  },
  {
    href: "/about/team",
    title: "核心团队",
    eyebrow: "团队能力",
    description:
      "核心团队由人工智能、企业数智化和安全技术背景构成，覆盖从知识建模、平台研发到安全治理的关键能力。",
    cover: {
      alt: "核心团队能力矩阵图",
      title: "团队能力矩阵",
      hint: "核心团队覆盖人工智能、数智化转型、互联网 AI 和安全工程方向。",
      visual: coverVisuals.team,
      sourceSlides: ["slide-30"],
    },
    highlights: [
      {
        label: "AI 方向",
        value: "任奎",
        description: "材料标注其为浙江大学计算机学院院长、人工智能专家、首席科学家。",
        sourceSlides: ["slide-30"],
      },
      {
        label: "数智化方向",
        value: "谭瑞忠",
        description: "材料标注其为企业数智化专家、30 年数智化转型专家。",
        sourceSlides: ["slide-30"],
      },
      {
        label: "工程与安全方向",
        value: "周识儒 / 杨海",
        description: "材料分别标注互联网 AI、NLP 发明专利、软件开发管理和安全技术经验。",
        sourceSlides: ["slide-30"],
      },
    ],
    summaryPoints: ["任奎：人工智能专家，首席科学家。", "谭瑞忠：30 年数智化转型专家。", "周识儒：15 年互联网开发经验，前盛大、淘宝 AI 专家。", "杨海：30 年软件开发管理经验，前 Intel 研发总监。"],
    sourceSlides: ["slide-30"],
    sections: [
      {
        title: "复合团队",
        description: "企业级 AI 平台不是单点模型项目，需要算法、业务转型、工程和安全多种能力协同。",
        points: ["人工智能专家负责知识智能与模型方向。", "数智化专家负责企业转型和业务落地。", "安全技术专家负责生产环境治理和可信交付。"],
        sourceSlides: ["slide-30"],
      },
      {
        title: "交付价值",
        description: "复杂企业私有化 AI 项目需要业务理解、平台研发和安全治理能力共同支撑。",
        points: ["理解企业业务、知识和流程。", "具备平台研发和安全治理经验。", "能够将方案转化为可验证的场景落地。"],
        sourceSlides: ["slide-21", "slide-30"],
      },
    ],
    relatedLinks: [
      { label: "公司介绍", href: "/about", kind: "route" },
      { label: "联系方式", href: "/about/contact", kind: "route" },
      { label: "主方案总览", href: "/solution", kind: "route" },
    ],
  },
  {
    href: "/about/contact",
    title: "联系方式",
    eyebrow: "咨询入口",
    description:
      "面向有私有化 AI、知识中台、场景落地和安全治理需求的企业，提供方案咨询与建设路径沟通。",
    cover: {
      alt: "方案咨询入口流程图",
      title: "方案咨询入口",
      hint: "围绕私有化 AI 平台、知识中台、场景落地和安全治理提供方案咨询入口。",
      visual: coverVisuals.contact,
      sourceSlides: ["slide-01", "slide-22"],
    },
    highlights: [
      {
        label: "咨询方向",
        value: "私有化 AI 平台",
        description: "适合围绕企业级私有化 AI 知识智能平台进行方案咨询。",
        sourceSlides: ["slide-01"],
      },
      {
        label: "业务场景",
        value: "供应链、财务、风控、客服运营",
        description: "适合围绕四类业务场景进行首批语义域和价值评估。",
        sourceSlides: ["slide-16"],
      },
      {
        label: "准备材料",
        value: "业务域、数据系统、知识资产",
        description: "咨询前可梳理业务域、核心系统、文档类型、权限边界和安全审计要求。",
        sourceSlides: ["slide-21"],
      },
    ],
    summaryPoints: ["适合咨询企业级私有化 AI 平台建设。", "适合咨询知识语义层、AI 数据平台和员工工作台。", "适合围绕制造业场景、案例和团队能力进一步沟通。"],
    sourceSlides: ["slide-01", "slide-16", "slide-21", "slide-22", "slide-30"],
    sections: [
      {
        title: "沟通方向",
        description: "围绕平台方案、业务场景和交付路径，帮助企业明确私有化 AI 建设的优先级。",
        points: ["企业级私有化 AI 知识智能平台方案咨询。", "供应链、财务、风控、客服运营场景评估。", "案例复盘、团队能力和交付路径沟通。"],
        sourceSlides: ["slide-01", "slide-16", "slide-24", "slide-27", "slide-30"],
      },
      {
        title: "咨询前准备",
        description: "企业可先梳理业务域、数据系统、知识资产和安全要求，以便快速判断建设路径。",
        points: ["明确首批业务语义域和知识 Owner。", "梳理核心系统、文档类型和权限边界。", "确认安全合规和审计要求。"],
        sourceSlides: ["slide-21"],
      },
    ],
    relatedLinks: [
      { label: "公司介绍", href: "/about", kind: "route" },
      { label: "核心团队", href: "/about/team", kind: "route" },
      { label: "主方案总览", href: "/solution", kind: "route" },
    ],
  },
];

export function getSitePageByHref(href: SitePageContent["href"]) {
  const page = sitePages.find((item) => item.href === href);

  if (!page) {
    throw new Error(`Missing site page content for ${href}`);
  }

  return page;
}

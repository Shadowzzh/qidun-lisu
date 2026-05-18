import type { SitePageContent } from "@/types/site";

export const sitePages: SitePageContent[] = [
  {
    href: "/solution",
    title: "主方案总览",
    eyebrow: "解决方案",
    description:
      "企业级私有化 AI 知识智能平台方案，从数据查询走向知识决策，建设可解释、可审计、可追溯的企业智能中枢。",
    summaryPoints: ["拒绝概率玩具，打造企业知识大脑。", "七层架构贯通算力、数据、语义、应用和安全。", "以私有化部署保障数据主权、口径治理和审计确定性。"],
    sourceSlides: ["slide-01", "slide-04", "slide-05", "slide-07", "slide-08", "slide-10", "slide-20", "slide-21", "slide-22"],
    sections: [
      {
        title: "问题背景",
        description:
          "企业 AI 竞争已经进入下半场，关键不再是有没有 AI，而是 AI 能否在核心业务中安全、可信、高效地工作。",
        points: ["通用大模型存在幻觉和答案无依据等不可控问题。", "核心业务仍依赖专家经验，响应速度和协同效率受限。", "数据口径不统一会形成知识孤岛，影响跨部门决策。"],
      },
      {
        title: "核心定位",
        description:
          "方案不是单纯提供底层模型 API，而是通过知识语义层让业务语言直接驱动决策，形成懂业务、有记忆、可编排、可审计的数字助手。",
        points: ["直接面向业务场景提供提问、回答和依据链路。", "以业务规则显性约束降低黑箱决策风险。", "用知识资产沉淀替代临时性提示工程。"],
      },
      {
        title: "七层架构",
        description:
          "从 L1 超算底座到 L7 应用层，平台以 L5 知识语义层为核心枢纽，让数据、推理、编排和业务应用形成闭环。",
        points: ["底层提供推理算力、云原生编排、数据存储和运维网关。", "中层通过语义、规则和数据映射约束模型输出。", "上层承接智能客服、知识问答、决策驾驶舱和业务智能体。"],
      },
      {
        title: "价值承诺",
        description: "平台围绕决策确定性、口径确定性和审计确定性，帮助企业把 AI 从演示能力推进到生产能力。",
        points: ["核心业务坚持规则驱动和可解释路径。", "全集团核心术语统一定义，降低沟通和复核成本。", "关键决策全链路留痕，支撑审计与监管材料快速生成。"],
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
    eyebrow: "能力页",
    description:
      "能力体系围绕知识语义层、AI 数据平台、安全管控和员工 AI 工作台展开，把平台能力拆成可理解、可组合、可落地的模块。",
    summaryPoints: ["知识语义层统一业务概念、规则和溯源路径。", "AI 数据平台承接多源数据和知识增强检索。", "安全管控和员工工作台让能力进入生产组织。"],
    sourceSlides: ["slide-10", "slide-13", "slide-14", "slide-15", "slide-17", "slide-18", "slide-28", "slide-29"],
    sections: [
      {
        title: "能力分层",
        description: "能力页承接平台架构中的关键能力层，不把所有技术细节堆回首页。",
        points: ["L4 数据层负责结构化、非结构化、向量和图数据协同。", "L5 语义层是约束生成和可解释决策的核心。", "L7 应用层通过工作台和智能体进入日常业务。"],
      },
      {
        title: "从数据到知识",
        description: "平台保留原有 ERP、CRM、BI 等系统，通过语义治理与索引实现异构系统贯通。",
        points: ["多引擎协同处理全文、向量、图谱、结构化和对象存储。", "RAG/KAG 流程覆盖意图识别、混合召回、重排序和幻觉检测。", "用户反馈持续反哺知识处理和检索质量。"],
      },
      {
        title: "生产化承接",
        description: "能力建设最终要进入员工工作界面、权限体系和运营管理，而不是停留在平台后台。",
        points: ["员工 AI 工作台承接知识搜索、问答、智能体和工具市场。", "统一运营管理覆盖日志、安全审计和系统配置。", "API 与第三方 IM、业务系统连接扩展应用边界。"],
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
    summaryPoints: ["定义领域语义、规则语义和数据语义。", "用受控生成机制约束模型输出。", "让决策链路附带可审计、可溯源路径。"],
    sourceSlides: ["slide-07", "slide-14"],
    sections: [
      {
        title: "企业知识大脑",
        description: "语义层不是数据库结构，而是企业统一的业务语义架构。",
        points: ["领域语义定义供应链、订单等核心业务概念与关系。", "规则语义定义业务逻辑与风控阈值。", "数据语义建立字段、API 和上层业务概念映射。"],
      },
      {
        title: "受控生成",
        description: "平台通过语义解析、规则执行、生成框架和 LLM 润色，让自然语言结果始终运行在业务边界内。",
        points: ["先识别业务概念，再进入确定性规则计算。", "输出结构化决策链，避免黑箱答案直接进入核心流程。", "附带全路径溯源，支撑复核、追责和审计。"],
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
    summaryPoints: ["保留原有业务系统，降低替换成本。", "多引擎协同支撑混合检索和知识推理。", "形成从召回到反馈的知识增强闭环。"],
    sourceSlides: ["slide-13", "slide-15", "slide-25"],
    sections: [
      {
        title: "多引擎协同",
        description: "平台组合 Milvus、ES、Neo4j、PGSQL 和 MinIO，分别承接向量、全文、图谱、事实和非结构化对象。",
        points: ["Milvus 负责稠密向量检索。", "ES 支撑全文和日志快速索引。", "Neo4j 承接语义存储与推理。"],
      },
      {
        title: "知识增强数据流",
        description: "从查询意图识别到用户反馈，平台建立可持续更新的 RAG/KAG 流程。",
        points: ["多路并行混合召回提升覆盖率。", "知识处理引擎融合与重排序提升准确性。", "幻觉检测和精准上下文注入控制输出边界。"],
      },
      {
        title: "企业知识中台",
        description: "在企业内部文档、知识库、权限和流程中统一管理知识资产。",
        points: ["支持文档同步、文件上传和内网文档处理。", "承接知识空间、知识库、专业词库和日志管理。", "为知识检索、智能问答和后续智能体应用供给知识。"],
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
    summaryPoints: ["供应链安全和 OVTP 安全体系贯穿平台运行。", "身份、审批、追溯形成三位一体闭环。", "零信任多维防护支撑核心业务生产化。"],
    sourceSlides: ["slide-17", "slide-18", "slide-21"],
    sections: [
      {
        title: "OVTP 全链路",
        description: "平台基于 Operator、Voucher、Traceable 构建安全闭环。",
        points: ["Operator 通过身份对接和业务语义角色确认操作者。", "Voucher 将核心规则变更绑定审批单。", "Traceable 通过审计日志和存证保证轨迹不可篡改。"],
      },
      {
        title: "零信任防护",
        description: "安全体系覆盖网络、运行时和敏感数据。",
        points: ["网络微隔离限制横向风险扩散。", "运行时自动阻断异常行为。", "敏感数据脱敏降低数据暴露风险。"],
      },
      {
        title: "风险应对",
        description: "安全合规从项目启动同步建设，避免平台后期补合规、补审计。",
        points: ["规则引擎初筛、多源交叉验证和关键场景人工复核共同降低幻觉风险。", "知识 Owner 和术语治理委员会参与语义建模。", "语义域验收需业务 Owner 确认。"],
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
    summaryPoints: ["提供知识搜索、知识问答、内置应用和配置应用。", "支撑 Web、H5、第三方 IM 与 API 集成。", "承接智能体开发、知识梳理、评测和能力陪跑。"],
    sourceSlides: ["slide-25", "slide-28", "slide-29"],
    sections: [
      {
        title: "工作入口",
        description: "工作台面向员工而不是技术后台，降低业务人员使用 AI 的门槛。",
        points: ["企业知识中心统一管理知识资产。", "智能体中心承接标准应用和定制应用。", "工具市场连接 API、MCP 和通用工具。"],
      },
      {
        title: "应用场景",
        description: "工作台可以承接技术信息管理、售前咨询、售后服务、表格翻译和行业报告等具体任务。",
        points: ["技术标准智搜和专业表格翻译提升知识查找效率。", "海关编码智搜、物料备货推荐和装箱计算服务供应链业务。", "售后服务助手和产品配置顾问沉淀经验。"],
      },
      {
        title: "知识体系",
        description: "平台围绕产品技术参数、操作保养维修手册和故障代码表建设向量与图谱能力。",
        points: ["支持基于图谱的智能售前咨询。", "支持售后维修、标配选配查找和技术参数解答。", "将专家经验转化为可调用的企业知识资产。"],
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
      "应用场景页把平台能力翻译成供应链、财务、风控和客服运营中的业务价值，突出骊甦自己的落地表达。",
    summaryPoints: ["供应链强调规则沉淀和跨域因果链。", "财务强调口径治理和审计支撑。", "风控强调可解释预警和合规可视。", "客服运营强调精准答复与经验传承。"],
    sourceSlides: ["slide-16", "slide-20", "slide-21", "slide-22"],
    sections: [
      {
        title: "场景价值",
        description: "平台的价值不止在模型能力，而在核心业务版块里实现降本增效与合规管控。",
        points: ["供应链从调货、延迟、成本和利润之间建立因果链。", "财务通过统一口径提升预算、审计和分析效率。", "风控把规则纳入知识大脑，预警结果附带推理路径。"],
      },
      {
        title: "私有化支撑",
        description: "核心业务场景需要数据不出机房、低延迟和可控成本。",
        points: ["数据主权满足严格的数据安全与合规要求。", "自研语义层让业务规则深度内嵌。", "内网闭环保障低延迟和高并发响应。"],
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
    summaryPoints: ["调货决策周期从天级压缩到分钟级。", "专家经验显性化沉淀为规则。", "自动关联延迟、成本和利润等因果链。"],
    sourceSlides: ["slide-16", "slide-21", "slide-22"],
    sections: [
      {
        title: "智能决策",
        description: "供应链问题通常牵涉多系统、多口径和多角色，语义层可以统一业务概念和约束条件。",
        points: ["把订单、库存、交付、成本和利润放到同一语义体系。", "通过自然语言问答降低业务人员分析门槛。", "决策结果附带来源与推理路径，便于复核。"],
      },
      {
        title: "落地保障",
        description: "供应链场景依赖知识 Owner 深度参与和术语治理前置。",
        points: ["首批统一核心供应链术语。", "每个语义域对接真实业务场景验证。", "风险与规则变更进入审批和审计链路。"],
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
    summaryPoints: ["提升预算编制科学性与准确性。", "统一核心指标定义，解决数据冲突。", "审计材料准备从周级压缩到分钟级。"],
    sourceSlides: ["slide-16", "slide-20", "slide-22"],
    sections: [
      {
        title: "口径治理",
        description: "财务场景最怕指标口径不一致，语义层要先定义业务概念，再连接数据字段。",
        points: ["把预算、成本、利润、审计材料等概念统一到语义体系。", "让自然语言提问直达业务概念。", "对关键指标输出提供依据链。"],
      },
      {
        title: "审计确定性",
        description: "平台通过留痕和存证机制降低审计准备成本。",
        points: ["关键决策链路保留操作和审批记录。", "材料生成基于统一术语和规则。", "审计过程可回看、可解释、可追溯。"],
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
    summaryPoints: ["风险规则纳入知识大脑。", "预警附带推理路径，拒绝黑盒警报。", "自动生成标准化决策档案。"],
    sourceSlides: ["slide-16", "slide-18", "slide-21"],
    sections: [
      {
        title: "合规可视",
        description: "风控结果必须解释原因，平台通过语义规则和路径溯源让预警具备业务可读性。",
        points: ["规则变更需要审批和留痕。", "预警结果展示触发条件和推理路径。", "关键场景可纳入人工复核机制。"],
      },
      {
        title: "安全闭环",
        description: "风控场景与 OVTP 安全体系天然关联。",
        points: ["身份确认保证责任边界清晰。", "审批链路降低规则误改风险。", "存证和审计日志支撑监管报送。"],
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
    summaryPoints: ["基于业务知识提供精准答案。", "业务语言提问生成分析图表。", "经验传承缩短新人上岗周期。"],
    sourceSlides: ["slide-16", "slide-25", "slide-28", "slide-29"],
    sections: [
      {
        title: "智能传承",
        description: "客服运营的价值在于把分散经验沉淀到知识体系中，再通过工作台进入服务过程。",
        points: ["知识问答基于企业文档、手册和图谱。", "售前咨询、售后维修和产品配置可以通过智能体承接。", "新人培训可以复用标准问答和案例知识。"],
      },
      {
        title: "运营闭环",
        description: "客服运营页面连接员工 AI 工作台和知识体系建设。",
        points: ["问答质量通过反馈持续优化。", "工具市场连接坐席系统、微信小程序和业务系统。", "统一日志和审计支撑服务质量复盘。"],
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
    eyebrow: "案例中心",
    description:
      "案例中心集中承接制造业知识中台、工业产品知识图谱和团队能力背书，让首页摘要进入完整叙述。",
    summaryPoints: ["汽车零部件案例展示全球 AI 知识中台建设。", "叉车制造案例展示工业产品知识图谱应用。", "案例叙述与团队能力共同建立可信度。"],
    sourceSlides: ["slide-24", "slide-25", "slide-26", "slide-27", "slide-28", "slide-29"],
    sections: [
      {
        title: "案例结构",
        description: "案例页不复述所有方案内容，而是展示平台如何进入具体行业、具体知识体系和具体业务应用。",
        points: ["从客户业务问题切入。", "说明知识资产、权限、系统对接和智能体应用。", "展示可复用的建设方法。"],
      },
      {
        title: "背书价值",
        description: "案例中心与关于我们、团队页互相补充，建立技术、行业和交付能力信任。",
        points: ["制造业案例支撑平台可落地性。", "团队背景支撑复杂项目交付能力。", "详情页承接完整行业叙述。"],
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
    summaryPoints: ["构建全球 AI 知识中台。", "企业内部文档智能解析全部本地完成。", "围绕企业知识安全管理目标统一管理。"],
    sourceSlides: ["slide-24", "slide-25", "slide-26"],
    sections: [
      {
        title: "建设目标",
        description: "案例以本地部署 GPU 算力、统一本地知识存储和企业级知识管理为基础。",
        points: ["保证企业内部文档智能解析在本地完成。", "统一管理企业知识、文档、流程和权限。", "对接文件、知识库和内网文档同步。"],
      },
      {
        title: "核心能力",
        description: "案例覆盖知识资产全生命周期管理、强权限体系和企业级文件管理。",
        points: ["覆盖企业和个人双场景知识资产。", "适配多层级、多角色的内部管控。", "支持 20+ 格式、智能处理和内外源整合。"],
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
    summaryPoints: ["建设工业产品知识图谱应用。", "围绕向量和图谱组织产品知识。", "支撑售前咨询、售后维修和技术参数解答。"],
    sourceSlides: ["slide-27", "slide-28", "slide-29"],
    sections: [
      {
        title: "知识体系",
        description: "案例把产品技术参数、手册、故障代码表等内容进行知识梳理。",
        points: ["形成向量与图谱并行的知识底座。", "支持标配和选配查找。", "支持技术参数解答。"],
      },
      {
        title: "应用承接",
        description: "工作台和智能体将知识图谱能力带入售前、售后和服务流程。",
        points: ["智能售前咨询帮助快速回答产品问题。", "售后维修知识问答降低专家依赖。", "定制 AI 智能体承接行业服务流程。"],
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
    eyebrow: "关于我们",
    description:
      "北京骊甦科技围绕企业级私有化 AI 知识智能平台，结合人工智能、数智化与安全技术能力，为企业建设知识驱动的智能中枢。",
    summaryPoints: ["定位企业级私有化 AI 知识智能平台方案服务商。", "团队覆盖人工智能、数智化转型和安全工程。", "以方案、能力、案例和团队共同建立可信官网表达。"],
    sourceSlides: ["slide-01", "slide-30"],
    sections: [
      {
        title: "公司定位",
        description: "公司表达应服务于官网主线，不把关于我们写成单纯介绍页。",
        points: ["围绕知识决策、私有化部署和安全可审计组织表达。", "用团队能力支撑复杂企业 AI 项目交付。", "通过案例和联系方式形成转化闭环。"],
      },
      {
        title: "能力背书",
        description: "团队背景覆盖科研、企业数智化、互联网 AI 和安全技术。",
        points: ["人工智能专家提供技术方向。", "数智化专家支撑企业转型和管理场景。", "安全技术专家保障生产环境可信落地。"],
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
    eyebrow: "关于我们",
    description:
      "核心团队由人工智能、企业数智化和安全技术背景构成，覆盖从知识建模、平台研发到安全治理的关键能力。",
    summaryPoints: ["任奎：人工智能专家，首席科学家。", "谭瑞忠：30 年数智化转型专家。", "周识儒：15 年互联网开发经验，前盛大、淘宝 AI 专家。", "杨海：30 年软件开发管理经验，前 Intel 研发总监。"],
    sourceSlides: ["slide-30"],
    sections: [
      {
        title: "复合团队",
        description: "企业级 AI 平台不是单点模型项目，需要算法、业务转型、工程和安全多种能力协同。",
        points: ["人工智能专家负责知识智能与模型方向。", "数智化专家负责企业转型和业务落地。", "安全技术专家负责生产环境治理和可信交付。"],
      },
      {
        title: "交付价值",
        description: "团队页重点回答为什么骊甦能做复杂企业私有化 AI 项目。",
        points: ["理解企业业务、知识和流程。", "具备平台研发和安全治理经验。", "能够将方案转化为可验证的场景落地。"],
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
    eyebrow: "关于我们",
    description:
      "联系方式页承接咨询转化，帮助有私有化 AI、知识中台、场景落地和安全治理需求的企业进入下一步沟通。",
    summaryPoints: ["适合咨询企业级私有化 AI 平台建设。", "适合咨询知识语义层、AI 数据平台和员工工作台。", "适合围绕制造业场景、案例和团队能力进一步沟通。"],
    sourceSlides: ["slide-01", "slide-22", "slide-30"],
    sections: [
      {
        title: "沟通方向",
        description: "联系方式页不新增未经确认的邮箱或电话，先提供明确的业务沟通入口说明。",
        points: ["企业级私有化 AI 知识智能平台方案咨询。", "供应链、财务、风控、客服运营场景评估。", "案例复盘、团队能力和交付路径沟通。"],
      },
      {
        title: "咨询前准备",
        description: "企业可先梳理业务域、数据系统、知识资产和安全要求，以便快速判断建设路径。",
        points: ["明确首批业务语义域和知识 Owner。", "梳理核心系统、文档类型和权限边界。", "确认安全合规和审计要求。"],
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

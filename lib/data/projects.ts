import type { HuggingFaceModel, Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "news-chatbot",
    title: "Cloud-native news chatbot",
    tags: "AI · agents · cloud",
    categories: ["ai-agents"],
    status: "live",
    type: "client",
    client: "major IT news outlet",
    role: "lead engineer",
    year: "2025",
    duration: "ongoing",
    description:
      "Real-time news summarization for one of Italy's major digital outlets. Multi-agent architecture with persistent memory, streaming responses, and semantic retrieval over a live corpus.",
    stack: [
      "LlamaIndex",
      "Python",
      "AWS Lambda",
      "FastAPI",
      "Redis",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
    ],
    metrics: [
      { value: "2M+", label: "monthly active users" },
      { value: "<180ms", label: "avg response latency" },
      { value: "99.9%", label: "uptime SLA" },
      { value: "live", label: "real-time news corpus" },
    ],
    featured: true,
    hasCaseStudy: true,
    caseStudy: {
      challenge:
        "News consumption is fragmented. Readers want context fast — what happened, why it matters, what to read next — but the editorial product is still organized as a stream of articles. The client needed a conversational layer on top of their content that could summarize, compare, and recommend across their entire live corpus, without producing hallucinations or stale answers.\n\nThe hard constraints were three: sub-200ms latency at scale (chat is unusable past that threshold), strict factual grounding in the client's editorial archive (no LLM guesses), and serverless cost predictability at unknown traffic shapes — peaks driven by breaking news, not by user growth curves.",
      pullQuote:
        '"A news chatbot that hallucinates is a liability. The architecture had to make hallucination structurally hard, not just statistically rare."',
      approach:
        "The system runs as a multi-agent orchestration on AWS Lambda. A coordinator agent receives the user query, dispatches to specialized retrieval and generation agents, and streams the synthesized response back. Retrieval happens against a continuously indexed corpus of editorial content — updated in near-real-time as the newsroom publishes.\n\nEvery answer is grounded in retrieved snippets with explicit citations. The generation agent runs with a strict retrieval-or-refuse policy: if no relevant context is found, the bot says so rather than fabricating.",
      architecture: {
        title: "High-level architecture",
        hint: "// simplified",
        flow: [
          { icon: "user", name: "USER QUERY", description: "web / mobile" },
          {
            icon: "network",
            name: "COORDINATOR",
            description: "multi-agent\nrouting",
            highlight: true,
          },
          { icon: "message", name: "STREAMED REPLY", description: "with citations" },
        ],
        subNodes: [
          { label: "RETRIEVAL", description: "semantic search · vector store" },
          { label: "GENERATION", description: "LLM grounded · refuse if empty" },
          { label: "MEMORY", description: "session context · per-user" },
        ],
      },
      decisions: [
        {
          num: "// 01",
          title: "Serverless over container-based hosting",
          description:
            "Traffic shape was unpredictable — flat during the night, vertical spikes on breaking news. AWS Lambda + provisioned concurrency gave us cost-predictability and sub-cold-start latency without paying for idle capacity.",
        },
        {
          num: "// 02",
          title: "Semantic chunking, not paragraph chunking",
          description:
            "Articles were split by editorial unit (lede, body sections, pull quotes), not by fixed token windows. Retrieval quality improved measurably because the LLM received self-contained context units instead of fragments.",
        },
        {
          num: "// 03",
          title: "Streaming responses by default",
          description:
            "Perceived latency drops dramatically when the first token lands fast. The orchestrator streams the LLM output through FastAPI's SSE channel — users see the answer forming, not a spinner.",
        },
        {
          num: "// 04",
          title: "Hard refusal policy on empty retrieval",
          description:
            'When no relevant article was found, the bot refuses to answer rather than fall back to general world knowledge. This single rule eliminated the entire class of "confidently wrong about Italian news" failure modes.',
        },
      ],
      results: [
        {
          value: "2M+",
          label: "monthly active users",
          context: "flagship system within the client's product suite",
          headline: true,
        },
        {
          value: "<180ms",
          label: "first-token latency",
          context: "measured p95, end-to-end including retrieval",
          headline: true,
        },
        {
          value: "99.9%",
          label: "uptime SLA maintained",
          context: "no rollback events since go-live",
        },
        {
          value: "manual QA pass",
          label: "hallucination QA",
          context: "on editorial QA sample over 6 months",
        },
      ],
      retrospective:
        'The semantic chunking pass was implemented after the first quality complaints from the editorial team. In hindsight, investing in retrieval quality early would have saved roughly six weeks of prompt-engineering bandaids trying to compensate for noisy context. The mantra "retrieval beats prompting" feels obvious now, but only after the fact.\n\nThe second lesson is on cost observability: serverless cost is non-trivial to forecast when LLM provider tokens dominate the bill. I\'d build the cost dashboard before the launch, not after.',
      stack: [
        { label: "AI / Orchestration", items: ["LlamaIndex", "LangChain", "OpenAI / Gemini"] },
        { label: "Backend", items: ["Python", "FastAPI", "SSE streaming"] },
        { label: "Infra", items: ["AWS Lambda", "Redis · PostgreSQL", "GitHub Actions"] },
      ],
    },
  },

  {
    slug: "cad-classifier",
    title: "CAD parts vision classifier",
    tags: "LLM · computer vision",
    categories: ["ai-agents"],
    status: "live",
    type: "client",
    client: "industrial B2B",
    role: "solo consultant",
    year: "2025",
    description:
      "LLM-powered computer vision classifier for automatic CAD parts recognition. Streamlines design workflows for an industrial client by automating part identification and metadata enrichment.",
    result: "→ Streamlined design workflow · accuracy uplift",
    stack: ["Vision LLMs", "Python", "FastAPI", "Docker"],
  },

  {
    slug: "document-scanner",
    title: "Receipt & document scanner",
    tags: "LLM · document intelligence",
    categories: ["ai-agents"],
    status: "live",
    type: "client",
    client: "SaaS B2B",
    role: "lead engineer",
    year: "2025",
    description:
      "LLM-powered scanning system for receipts and invoices. Enables semantic search across large archives and automated structured data extraction for finance teams.",
    result: "→ Semantic search · automated data extraction",
    stack: ["LangChain", "OCR", "PostgreSQL", "FastAPI"],
  },

  {
    slug: "lorenzobot",
    title: "LorenzoBot",
    tags: "AI · agents · personal",
    categories: ["ai-agents"],
    status: "live",
    type: "personal",
    client: "self",
    role: "solo",
    year: "2025",
    description:
      "Cloud-native AI assistant integrated into this website. Provides accurate, context-aware information about my work using multi-agent reasoning, persistent memory, and Gemini/LLM orchestration.",
    result: "→ Powering the chat on lorenzomaiuri.dev",
    stack: ["LangChain", "Gemini", "Next.js", "Vector store"],
  },

  {
    slug: "bert-gdpr",
    title: "BERT GDPR classifier",
    tags: "NLP · fine-tuning",
    categories: ["nlp-ml"],
    status: "live",
    type: "client",
    client: "Pharmaidea SRL",
    role: "lead engineer",
    year: "2024",
    description:
      "Fine-tuned BERT for personal data detection, deployed into a B2B production platform.",
    result: "→ 85% accuracy · 90% less review time",
    stack: ["PyTorch", "BERT", "HuggingFace", ".NET"],
  },

  {
    slug: "data-warehouse-modernization",
    title: "Data warehouse modernization",
    tags: "Data · infra",
    categories: ["data-infra"],
    status: "delivered",
    type: "client",
    client: "Pharmaidea SRL",
    role: "lead engineer",
    year: "2024",
    description:
      "Oracle → PostgreSQL migration with full ETL rewrite on Airflow and CI/CD pipeline.",
    result: "→ 100% cost reduction · 20% faster queries",
    stack: ["PostgreSQL", "Oracle", "Airflow", "Docker"],
  },

  {
    slug: "logistics-anomaly",
    title: "Logistics anomaly dashboard",
    tags: "ML · ops dashboard",
    categories: ["data-infra"],
    status: "delivered",
    type: "client",
    client: "Pharmaidea SRL",
    role: "lead engineer",
    year: "2023",
    description:
      "Real-time cost control dashboard for logistics operations with ML-based anomaly detection on shipment data. Surfaces outliers and pricing irregularities automatically.",
    result: "→ 70% reduction in manual checking time",
    stack: ["Python", "scikit-learn", "PowerBI", "PostgreSQL"],
  },

  {
    slug: "order-prioritization",
    title: "Order prioritization engine",
    tags: "ML · prioritization",
    categories: ["data-infra"],
    status: "delivered",
    type: "client",
    client: "Pharmaidea SRL",
    role: "software engineer",
    year: "2023",
    description:
      "ML-based prioritization system integrated into a B2B platform. Ranks incoming orders by urgency and downstream impact, accelerating processing for time-critical requests.",
    result: "→ 20% faster processing for critical orders",
    stack: ["scikit-learn", "Python", ".NET"],
  },

  {
    slug: "histopathologic-cancer-cnn",
    title: "Histopathologic cancer CNN",
    tags: "CV · open source",
    categories: ["nlp-ml", "open-source"],
    status: "delivered",
    type: "open-source",
    role: "author",
    year: "2025",
    description:
      "Deep learning classifier for metastatic tissue in lymph node scans. Public on HuggingFace.",
    result: "→ Published · HuggingFace Hub",
    stack: ["PyTorch", "CNN", "Kaggle"],
  },

  {
    slug: "dante-gpt",
    title: "DanteGPT",
    tags: "LLM · generative",
    categories: ["nlp-ml", "open-source"],
    status: "delivered",
    type: "open-source",
    role: "author",
    year: "2024",
    description:
      "GPT-2 fine-tuned on Divina Commedia to generate text in Dante's poetic style and themes.",
    result: "→ Open model · HuggingFace",
    stack: ["GPT-2", "fine-tuning", "HuggingFace"],
  },
];

export const homeGridProjectSlugs = [
  "data-warehouse-modernization",
  "bert-gdpr",
  "histopathologic-cancer-cnn",
  "dante-gpt",
];

export const huggingFaceModels: HuggingFaceModel[] = [
  {
    tag: "Computer vision · CNN",
    name: "histoplastic-cancer-CNN",
    description:
      "Deep learning classifier for metastatic tissue detection on lymph node histopathology scans. Kaggle competition baseline.",
    footer: "PyTorch · CNN",
    year: "2025",
    url: "https://huggingface.co/maiurilorenzo/histoplastic-cancer-CNN",
  },
  {
    tag: "LLM · fine-tuning",
    name: "dante-gpt",
    description:
      "GPT-2 fine-tuned on the Divina Commedia to generate text in Dante Alighieri's poetic style and themes.",
    footer: "GPT-2 · fine-tuning",
    year: "2024+",
    url: "https://huggingface.co/maiurilorenzo/dante-gpt",
  },
  {
    tag: "NLP · classification",
    name: "misogyny-detection-it",
    description:
      "Fine-tuned BERT for misogyny detection in Italian text. Identifies misogynistic content with binary classification.",
    footer: "BERT · Italian NLP",
    year: "2024",
    url: "https://huggingface.co/maiurilorenzo/misogyny-detection-it",
  },
  {
    tag: "Multimodal · agent",
    name: "smolagent-gaia",
    description:
      "Custom multimodal agent on the GAIA benchmark, built during the HuggingFace Agents Course — Certificate of Excellence.",
    footer: "SmolAgent · GPT-4",
    year: "2025",
    url: "https://huggingface.co/maiurilorenzo/smolagent-gaia",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project {
  return projects.find((p) => p.featured)!;
}

export function getHomeGridProjects(): Project[] {
  return homeGridProjectSlugs.map((slug) => projects.find((p) => p.slug === slug)!);
}

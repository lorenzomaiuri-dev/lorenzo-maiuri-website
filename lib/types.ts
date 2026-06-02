/* ─── Shared primitives ──────────────────────────────────────────────── */

export type Metric = {
  value: string; // "2M+", "<180ms", "99.9%", "live"
  label: string; // "monthly active users"
};

/* ─── Projects ───────────────────────────────────────────────────────── */

export type ProjectStatus = "live" | "delivered";
export type ProjectType = "client" | "personal" | "open-source";
// categories: filtering truth; tags: display string (may differ from categories)
export type ProjectCategory = "ai-agents" | "nlp-ml" | "data-infra" | "open-source";

export type Decision = {
  num: string; // "// 01"
  title: string;
  description: string;
};

export type ResultCard = {
  value: string; // "2M+", "<180ms"
  label: string;
  context: string;
  headline?: boolean; // green border highlight
};

export type ArchNode = {
  icon: string; // Tabler icon name, e.g. "network"
  name: string; // "COORDINATOR" — mono uppercase
  description: string; // supports \n for line breaks
  highlight?: boolean; // teal border
};

export type ArchSubNode = {
  label: string; // "RETRIEVAL"
  description: string; // "semantic search · vector store"
};

export type ArchDiagram = {
  title: string;
  hint?: string;
  flow: ArchNode[];
  subNodes?: ArchSubNode[];
};

export type CaseStudy = {
  challenge: string;
  pullQuote?: string;
  approach: string;
  architecture?: ArchDiagram;
  decisions: Decision[];
  results: ResultCard[];
  retrospective: string;
  stack: {
    label: string;
    items: string[];
  }[];
};

export type Project = {
  slug: string;
  title: string;
  /** Display string, e.g. "AI · agents · cloud" */
  tags: string;
  /** Filtering truth — may differ from tags */
  categories: ProjectCategory[];
  status: ProjectStatus;
  type: ProjectType;
  client?: string;
  role: string;
  year: string;
  duration?: string;
  description: string;
  result?: string;
  stack: string[];
  metrics?: Metric[];
  featured?: boolean;
  hasCaseStudy?: boolean;
  caseStudy?: CaseStudy;
};

export type HuggingFaceModel = {
  tag: string;
  name: string;
  description: string;
  footer: string;
  year: string;
  url: string;
};

/* ─── Profile ────────────────────────────────────────────────────────── */

export type TimelineItem = {
  dateRange: string;
  role: string;
  org: string;
  description: string;
  badge?: {
    kind: "current" | "studying";
    label?: string;
  };
};

export type Principle = {
  num: string;
  title: string;
  description: string;
  featured?: boolean; // larger card layout (principle 01)
};

export type ScoreCard = {
  score: string; // "1000"
  denominator: string; // "/1k"
  title: string;
  org: string;
};

export type CredentialItem = {
  title: string;
  org: string;
  year: string;
  tealYear?: boolean;
  recent?: boolean;
};

export type CredentialBlock = {
  heading: string;
  items: CredentialItem[];
};

export type SocialLink = {
  label: string;
  url: string;
};

export type ProfileMeta = {
  name: string;
  location: string;
  remote: string;
  languages: string;
  availability: string;
  social: SocialLink[];
};

/** Only used in the ContactModal — separate from bio data */
export type ContactMeta = {
  email: string;
  calUrl: string;
};

export type ProfileData = {
  meta: ProfileMeta;
  contact: ContactMeta;
  timeline: TimelineItem[];
  principles: Principle[];
  scores: ScoreCard[];
  credentials: CredentialBlock[];
};

/* ─── Stack ──────────────────────────────────────────────────────────── */

export type StackItem = {
  name: string;
  core?: boolean;
};

export type StackGroup = {
  label: string;
  items: StackItem[];
  primary?: boolean;
};

/* ─── Chat ───────────────────────────────────────────────────────────── */

export type ChatbotMeta = {
  model: string;
  agentType: string;
  memory: string;
  suggestedPrompts: string[];
};

/* ─── Terminal ───────────────────────────────────────────────────────── */

export type TerminalNode =
  | { type: "file"; name: string; content: string; executable?: boolean }
  | { type: "dir"; name: string; children: TerminalNode[] };

/* ─── Chat messages (used by useChatbot hook) ────────────────────────── */

export type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  action?: ChatResponseAction;
};

/* ─── Chat API (preserved from existing backend) ─────────────────────── */

export type ChatRequest = {
  chatId: string | null;
  message: string;
};

export type ChatResponseAction = {
  action_type: string;
  data: Record<string, unknown>;
};

export type ChatResponse = {
  message: string;
  chatId: string;
  action?: ChatResponseAction;
  error?: string;
};

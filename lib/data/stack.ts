import type { StackGroup } from "@/lib/types";

export const stackGroups: StackGroup[] = [
  {
    label: "AI / ML",
    primary: true,
    items: [
      { name: "LangChain", core: true },
      { name: "LlamaIndex", core: true },
      { name: "PyTorch", core: true },
      { name: "HuggingFace", core: true },
      { name: "fine-tuning" },
      { name: "scikit-learn" },
      { name: "Gemini" },
      { name: "OpenAI" },
    ],
  },
  {
    label: "Backend & Data",
    items: [
      { name: "Python", core: true },
      { name: "FastAPI", core: true },
      { name: "PostgreSQL", core: true },
      { name: ".NET / C#" },
      { name: "Redis" },
      { name: "Airflow" },
      { name: "GraphQL" },
      { name: "REST" },
    ],
  },
  {
    label: "Infra & Cloud",
    items: [
      { name: "AWS", core: true },
      { name: "Docker", core: true },
      { name: "Kubernetes", core: true },
      { name: "GCP" },
      { name: "Terraform" },
      { name: "GitHub Actions" },
      { name: "Cloudflare" },
    ],
  },
];

export const stackIntro =
  "Core: Python · LangChain · LlamaIndex · AWS — everything else as needed.";

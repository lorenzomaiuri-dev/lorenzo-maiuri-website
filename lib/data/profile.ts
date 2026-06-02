import type { ProfileData } from "@/lib/types";

export const profile: ProfileData = {
  meta: {
    name: "Lorenzo Maiuri",
    location: "Trenzano, IT",
    remote: "EU + global",
    languages: "IT · EN (C1)",
    availability: "Q3 2026",
    social: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/maiurilorenzo/" },
      { label: "GitHub", url: "https://github.com/lorenzomaiuri-dev" },
      { label: "HuggingFace", url: "https://huggingface.co/maiurilorenzo" },
      { label: "Kaggle", url: "https://www.kaggle.com/lorenzomaiuri" },
    ],
  },

  contact: {
    email: "maiurilorenzo@gmail.com",
    calUrl: "https://cal.com/lorenzo-maiuri-dev",
  },

  timeline: [
    {
      dateRange: "2025 — present",
      role: "AI & Software Engineering Consultant",
      org: "Self-employed · Italy / EU remote",
      description:
        "Long-term consulting for B2B clients in pharma, SaaS, and digital automation. Enterprise platforms serving 8M+ users, agentic workflows, NLP classifiers, LLM orchestrators, and cloud-native architectures with measurable outcomes.",
      badge: { kind: "current" },
    },
    {
      dateRange: "2025 — present",
      role: "MSc Artificial Intelligence",
      org: "Universita Cattolica del Sacro Cuore · Brescia",
      description:
        "Focus on production ML systems, agentic architectures, and applied research. Running in parallel with consulting work.",
      badge: { kind: "studying" },
    },
    {
      dateRange: "2022 — 2025",
      role: "Software Engineer & ICT Analyst",
      org: "Pharmaidea SRL · Travagliato, IT",
      description:
        "Led platform development across web and mobile. Built a BERT GDPR classifier (85% acc, -90% review time), migrated Oracle DWH to PostgreSQL (-100% cost, +20% perf), shipped Airflow orchestration replacing legacy middleware entirely.",
    },
    {
      dateRange: "2023 — 2026",
      role: "BSc Mathematics & Computer Science",
      org: "Universita Cattolica del Sacro Cuore · Brescia",
      description:
        "Graduated 2026. Solid foundation in mathematical modeling, algorithms, and software architecture — built alongside professional experience.",
    },
    {
      dateRange: "2016 — 2021",
      role: "Computer Science Technician",
      org: "IIS Marzoli · Palazzolo S/O, IT",
      description:
        'Graduated 100/100. Won the "Storie di Alternanza" contest (Camera di Commercio di Brescia) with a cloud-controlled IoT alarm clock — first shipped system, first prize.',
    },
  ],

  principles: [
    {
      num: "// 01",
      title: "Production beats prototypes",
      description:
        "A demo that works in a notebook is not a system. I optimize for what runs reliably under real load — with monitoring, fallbacks, and clear operational boundaries. If it doesn't ship, it doesn't count.",
      featured: true,
    },
    {
      num: "// 02",
      title: "Business value, not stack flexing",
      description:
        "The best architecture is the simplest one that solves the problem. I'll push back on tech you don't need — and double down on what actually moves the metric.",
    },
    {
      num: "// 03",
      title: "Direct, async-first communication",
      description:
        "Clear weekly updates, decisions in writing, no surprise overruns. You always know what I'm building and why — before it's a problem.",
    },
    {
      num: "// 04",
      title: "Long-term thinking, even short-term",
      description:
        "I write code other engineers will inherit. Documentation, CI/CD, and clean handoffs are part of the deliverable — not extras billed at the end.",
    },
  ],

  scores: [
    {
      score: "1000",
      denominator: "/1k",
      title: "AWS Certified AI Practitioner",
      org: "Early Adopter · 2025",
    },
    {
      score: "100",
      denominator: "/100",
      title: "Computer Science Technician",
      org: "IIS Marzoli · 2021",
    },
  ],

  credentials: [
    {
      heading: "Education",
      items: [
        {
          title: "MSc Artificial Intelligence",
          org: "Universita Cattolica · in progress",
          year: "2025+",
          tealYear: true,
          recent: true,
        },
        {
          title: "BSc Mathematics & Computer Science",
          org: "Universita Cattolica del Sacro Cuore",
          year: "2023—26",
          recent: true,
        },
      ],
    },
    {
      heading: "Certifications & awards",
      items: [
        {
          title: "HuggingFace Agents Course",
          org: "Certificate of Excellence · GAIA benchmark",
          year: "2025",
          recent: true,
        },
        {
          title: "Machine Learning Scientist · Python",
          org: "DataCamp professional track",
          year: "2024",
          recent: true,
        },
        {
          title: "Storie di Alternanza · 1st prize",
          org: "Camera di Commercio di Brescia",
          year: "2019",
        },
      ],
    },
  ],
};

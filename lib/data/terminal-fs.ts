import type { TerminalNode } from "@/lib/types";
import { profile } from "./profile";
import { huggingFaceModels, projects } from "./projects";
import { stackGroups } from "./stack";

// ─── Box content format ────────────────────────────────────────────────────

export type BoxRow = { key: string; val: string; valCls?: "val" | "dim" };

export type BoxContent = {
  _box: true;
  title: string;
  rows: BoxRow[];
  link?: { text: string; href: string; external?: boolean };
};

export function box(data: Omit<BoxContent, "_box">): string {
  return JSON.stringify({ _box: true, ...data });
}

export function parseBox(content: string): BoxContent | null {
  try {
    const p = JSON.parse(content);
    if (p._box === true) return p as BoxContent;
  } catch {}
  return null;
}

// ─── Filesystem builders ───────────────────────────────────────────────────

function makeProjectFile(p: (typeof projects)[0]): TerminalNode {
  const rows: BoxRow[] = [
    ...(p.client ? [{ key: "client", val: p.client }] : []),
    { key: "role", val: p.role },
    { key: "stack", val: p.stack.slice(0, 5).join(" · ") },
    ...(p.metrics?.[0] ? [{ key: p.metrics[0].label.split(" ")[0], val: p.metrics[0].value }] : []),
    ...(p.result ? [{ key: "result", val: p.result.replace("→ ", "") }] : []),
    {
      key: "status",
      val: p.status === "live" ? "● in production" : "○ delivered",
      valCls: p.status === "live" ? "val" : "dim",
    },
  ];
  return {
    type: "file",
    name: `${p.slug}.md`,
    content: box({
      title: p.title.toUpperCase(),
      rows,
      ...(p.hasCaseStudy ? { link: { text: "→ open case study", href: `/work/${p.slug}` } } : {}),
    }),
  };
}

function makeModelFile(m: (typeof huggingFaceModels)[0]): TerminalNode {
  return {
    type: "file",
    name: `${m.name}.md`,
    content: box({
      title: m.name.toUpperCase(),
      rows: [
        { key: "type", val: m.tag },
        { key: "stack", val: m.footer },
        { key: "year", val: m.year },
      ],
      link: { text: "→ view on HuggingFace", href: m.url, external: true },
    }),
  };
}

// ─── Root filesystem ───────────────────────────────────────────────────────

export const terminalFS: Extract<TerminalNode, { type: "dir" }> = {
  type: "dir",
  name: "~",
  children: [
    {
      type: "dir",
      name: "work",
      children: projects.map(makeProjectFile),
    },
    {
      type: "dir",
      name: "open-source",
      children: huggingFaceModels.map(makeModelFile),
    },
    {
      type: "dir",
      name: "credentials",
      children: [
        {
          type: "file",
          name: "education.md",
          content: [
            "MSc Artificial Intelligence — Università Cattolica · in progress (2025+)",
            "BSc Mathematics & Computer Science — Università Cattolica (2023–26)",
            "Computer Science Technician — IIS Marzoli, graduated 100/100 (2016–21)",
          ].join("\n"),
        },
        {
          type: "file",
          name: "certifications.md",
          content: [
            "AWS Certified AI Practitioner — 1000/1000 · Early Adopter (2025)",
            "HuggingFace Agents Course — Certificate of Excellence, GAIA benchmark (2025)",
            "Machine Learning Scientist (Python) — DataCamp professional track (2024)",
            "Storie di Alternanza — 1st prize, Camera di Commercio di Brescia (2019)",
          ].join("\n"),
        },
      ],
    },
    {
      type: "file",
      name: "about.md",
      content: `AI engineer · 5 yrs · ${profile.meta.location} · ships production systems.\n— Engineer first, consultant by necessity.`,
    },
    {
      type: "file",
      name: "contact.txt",
      content: [
        `email     ${profile.contact.email}`,
        `cal       ${profile.contact.calUrl}`,
        `response  within 24h · async-first · EU timezone`,
        `format    no sales calls — 30-min technical chat`,
      ].join("\n"),
    },
    {
      type: "file",
      name: "stack.json",
      content: JSON.stringify(
        Object.fromEntries(stackGroups.map((g) => [g.label, g.items.map((i) => i.name)])),
        null,
        2,
      ),
    },
    {
      type: "file",
      name: "cv.pdf",
      executable: true,
      // TODO: replace with real CV PDF URL once uploaded
      content: "// CV download coming soon",
    },
    {
      type: "file",
      name: "hire",
      executable: true,
      content: `→ launching contact flow...\n⚠  no sales call, no forms with 12 fields.\n   just a 30-min technical chat. response within 24h.\n   → mailto:${profile.contact.email}`,
    },
  ],
};

// ─── Path resolution helpers ───────────────────────────────────────────────

export function resolveNode(path: string): TerminalNode | null {
  const parts = path.replace(/^~\/?/, "").split("/").filter(Boolean);
  let node: TerminalNode = terminalFS;
  for (const part of parts) {
    if (node.type !== "dir") return null;
    const dir: Extract<TerminalNode, { type: "dir" }> = node;
    const child: TerminalNode | undefined = dir.children.find((c) => c.name === part);
    if (!child) return null;
    node = child;
  }
  return node;
}

export function resolveDir(path: string): Extract<TerminalNode, { type: "dir" }> | null {
  const node = resolveNode(path);
  return node?.type === "dir" ? node : null;
}

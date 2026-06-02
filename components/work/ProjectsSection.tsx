"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/lib/types";
import ProjectRow from "./ProjectRow";

type Filter = "all" | ProjectCategory;

const FILTERS: { label: string; category: Filter }[] = [
  { label: "All", category: "all" },
  { label: "AI / Agents", category: "ai-agents" },
  { label: "NLP / ML", category: "nlp-ml" },
  { label: "Data / Infra", category: "data-infra" },
  { label: "Open source", category: "open-source" },
];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(active as ProjectCategory));

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex overflow-x-auto max-w-full no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-1 items-center bg-surface px-1 py-1 rounded-md border border-hairline border-outline-faint whitespace-nowrap min-w-max">
            {FILTERS.map((f) => {
              const count =
                f.category === "all"
                  ? projects.length
                  : projects.filter((p) => p.categories.includes(f.category as ProjectCategory))
                      .length;
              const isActive = active === f.category;

              return (
                <button
                  type="button"
                  key={f.category}
                  onClick={() => setActive(f.category)}
                  className={[
                    "font-mono text-[11px] px-3 py-[6px] rounded-[4px] flex items-center gap-1.5 transition-all cursor-pointer",
                    isActive
                      ? "bg-canvas text-foreground shadow-[0_0_0_0.5px_var(--color-outline-sub)]"
                      : "text-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {f.label}
                  <span
                    className={`text-[10px] ${isActive ? "text-teal opacity-100" : "opacity-55"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <span className="font-mono text-[11px] text-muted self-end sm:self-auto">
          sort: <span className="text-foreground">most recent ↓</span>
        </span>
      </div>

      {/* Project list */}
      <div className="flex flex-col gap-[18px] mb-4">
        {filtered.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}

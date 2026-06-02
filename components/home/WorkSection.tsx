import Link from "next/link";
import Pill from "@/components/ui/Pill";
import SectionLabel from "@/components/ui/SectionLabel";

import { getFeaturedProject, getHomeGridProjects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";

function FeaturedProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start border border-hairline border-outline-sub rounded-lg p-[1.1rem] sm:p-5 bg-canvas hover:border-outline transition-colors cursor-pointer col-span-full"
    >
      {/* Left — meta + description + stack */}
      <div>
        <div className="flex justify-between items-start mb-2.5">
          <span className="font-mono text-[10px] text-teal border border-hairline border-teal px-2 py-[3px] rounded-[3px]">
            {p.tags}
          </span>
          <span className="font-mono text-[10px] bg-foreground text-canvas px-2 py-[3px] rounded-[3px]">
            Case study
          </span>
        </div>
        <div className="text-[17px] font-medium mb-2.5 leading-snug">{p.title}</div>
        <div className="text-[13px] text-muted leading-[1.5] mb-3">{p.description}</div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {p.stack.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </div>

      {/* Right — metrics grid */}
      {p.metrics && (
        <div className="grid grid-cols-2 gap-2 mt-1">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-surface rounded-md px-3 py-2.5">
              <div className="font-mono text-[20px] font-bold text-green leading-none">
                {m.value}
              </div>
              <div className="text-[11px] text-muted mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="border border-hairline border-outline-faint rounded-lg p-[1.1rem] sm:p-5 bg-canvas hover:border-outline-sub transition-colors"
    >
      <div className="flex justify-between items-start mb-2.5">
        <span className="font-mono text-[10px] bg-surface text-muted px-2 py-[3px] rounded-[3px]">
          {p.tags}
        </span>
      </div>
      <div className="text-[14px] font-medium mb-1.5 leading-snug">{p.title}</div>
      <div className="text-[12px] text-muted leading-[1.5] mb-3">{p.description}</div>
      {p.result && <div className="font-mono text-[11px] text-green">{p.result}</div>}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {p.stack.map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>
    </Link>
  );
}

export default function WorkSection() {
  const featured = getFeaturedProject();
  const gridProjects = getHomeGridProjects();

  return (
    <div>
      <SectionLabel
        num="01"
        title="Selected work"
        sub="production systems, shipped"
        action={
          <Link href="/work" className="font-mono text-[11px] text-teal hover:underline">
            View all →
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        <FeaturedProjectCard p={featured} />
        {gridProjects.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}

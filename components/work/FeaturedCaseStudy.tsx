import Link from "next/link";
import Pill from "@/components/ui/Pill";
import StatusDot from "@/components/ui/StatusDot";
import { getFeaturedProject } from "@/lib/data/projects";

export default function FeaturedCaseStudy() {
  const p = getFeaturedProject();

  const sideRows = [
    { k: "client", v: p.client },
    { k: "role", v: p.role },
    { k: "year", v: p.year },
    { k: "duration", v: p.duration },
    { k: "type", v: p.type === "client" ? "client work" : p.type },
  ].filter((r): r is { k: string; v: string } => Boolean(r.v));

  return (
    <div className="border border-hairline border-outline-sub rounded-lg p-8 bg-canvas mb-10 relative overflow-hidden">
      {/* Teal left bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-teal" />

      {/* Meta row */}
      <div className="flex gap-2 items-center mb-5 flex-wrap">
        <span className="font-mono text-[10px] bg-foreground text-canvas px-2 py-[3px] rounded-[3px] font-bold tracking-[0.04em]">
          CASE STUDY
        </span>
        <span className="font-mono text-[10px] bg-surface text-muted px-2 py-[3px] rounded-[3px]">
          {p.tags}
        </span>
        <span className="font-mono text-[10px] text-teal bg-teal/10 px-2 py-[3px] rounded-[3px] flex items-center gap-[5px]">
          <StatusDot variant="teal" />
          live
        </span>
      </div>

      <h2 className="text-[28px] font-bold tracking-[-0.02em] mb-3 leading-[1.15]">{p.title}</h2>

      {/* TODO: expand description to match full mockup copy */}
      <p className="text-[14px] leading-[1.7] text-muted max-w-[600px] mb-6">{p.description}</p>

      {/* Grid: metrics left, side panel right */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {p.metrics && (
          <div className="grid grid-cols-2 gap-2">
            {p.metrics.map((m) => (
              <div key={m.label} className="bg-surface rounded-md px-4 py-[0.85rem]">
                <div className="font-mono text-[22px] font-bold text-green leading-none tracking-[-0.01em]">
                  {m.value}
                </div>
                <div className="text-[11px] text-muted mt-1 leading-[1.3]">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col">
          {sideRows.map((r) => (
            <div
              key={r.k}
              className="flex justify-between font-mono text-[11px] py-1.5 border-b border-hairline border-outline-faint last:border-none"
            >
              <span className="text-muted opacity-60">{r.k}</span>
              <span className="text-foreground">{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {p.stack.map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/work/${p.slug}`}
        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-teal border border-hairline border-teal px-3 py-1.5 rounded-sm hover:bg-teal/10 transition-colors"
      >
        Read the full case study →
      </Link>
    </div>
  );
}

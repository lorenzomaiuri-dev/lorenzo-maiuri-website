import StatusDot from "@/components/ui/StatusDot";
import type { Project } from "@/lib/types";

export default function CaseHero({ project: p }: { project: Project }) {
  const infoRows = [
    { k: "client", v: p.client ?? "—" },
    { k: "role", v: p.role },
    {
      k: "year",
      v: p.duration === "ongoing" ? `${p.year} — present` : p.year,
      teal: false,
    },
    {
      k: "status",
      v: p.status === "live" ? "in production" : "delivered",
      teal: p.status === "live",
    },
  ];

  return (
    <section className="mb-0">
      {/* Meta */}
      <div className="flex items-center gap-1.5 mb-4 flex-wrap">
        <span className="font-mono text-[10px] bg-foreground text-canvas px-2 py-[3px] rounded-[3px] font-bold tracking-[0.04em]">
          CASE STUDY
        </span>
        <span className="font-mono text-[10px] bg-surface text-muted px-2 py-[3px] rounded-[3px]">
          {p.tags}
        </span>
        <span className="font-mono text-[10px] text-teal px-2 py-[3px] rounded-[3px] border border-hairline border-teal flex items-center gap-[5px]">
          <StatusDot variant="teal" />
          live
        </span>
      </div>

      <h1 className="text-[42px] font-bold leading-[1.1] tracking-[-0.025em] mb-4">{p.title}</h1>

      {/* TODO: replace with expanded subtitle from mockup */}
      <p className="text-[17px] leading-[1.6] text-muted max-w-[680px] mb-8">{p.description}</p>

      {/* Hero metrics — 4-col gap-px divider trick */}
      {p.metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-outline-faint border border-hairline border-outline-faint rounded-md overflow-hidden mb-6">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-canvas px-5 py-4">
              <div className="font-mono text-2xl font-bold text-green leading-none mb-1 tracking-[-0.01em]">
                {m.value}
              </div>
              <div className="text-[11px] text-muted leading-[1.3] whitespace-pre-line">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 border-t border-b border-hairline border-outline-faint mb-12">
        {infoRows.map((r) => (
          <div key={r.k} className="flex flex-col gap-[3px]">
            <span className="font-mono text-[10px] text-muted opacity-60 uppercase tracking-[0.05em]">
              {r.k}
            </span>
            <span className={`text-[13px] font-medium ${r.teal ? "text-teal" : ""}`}>{r.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

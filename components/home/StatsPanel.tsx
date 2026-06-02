import { cn } from "@/lib/utils";

const STATS_DESKTOP = [
  { value: "8M", sup: "+", green: false, label: "users on platforms\nI've architected" },
  { value: "90%", sup: "", green: true, label: "reduction in manual\nprocessing time" },
  { value: "~5", sup: "yrs", green: false, label: "engineering\nexperience" },
  { value: "4", sup: "+", green: false, label: "AI systems live\nin production" },
];

const STATS_MOBILE = [
  { value: "8M", sup: "+", green: false, label: "users on platforms\nI've architected" },
  { value: "4", sup: "+", green: true, label: "AI systems live\nin production" },
];

type Props = { mobile?: boolean };

export default function StatsPanel({ mobile }: Props) {
  const stats = mobile ? STATS_MOBILE : STATS_DESKTOP;

  if (mobile) {
    return (
      <div>
        <div className="grid grid-cols-2 gap-[1px] bg-outline-faint border border-hairline border-outline-faint rounded-md overflow-hidden">
          {stats.map((s) => (
            <div key={s.value + s.sup} className="bg-canvas px-3.5 py-[13px]">
              <div className="font-mono text-[28px] font-bold leading-none mb-1 tracking-tight">
                <span className={cn(s.green ? "text-green" : "text-foreground")}>{s.value}</span>
                {s.sup && <sup className="text-[13px] text-green align-super">{s.sup}</sup>}
              </div>
              <div className="text-[11px] text-muted leading-[1.4] whitespace-pre-line">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        {/* Mobile inline status */}
        <div className="flex items-center gap-2.5 mt-3.5 pt-3.5 border-t border-hairline border-outline-faint">
          <div className="w-8 h-8 rounded-full bg-surface border border-hairline border-outline-sub flex items-center justify-center font-mono text-[11px] font-bold text-muted flex-shrink-0">
            LM
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium leading-snug">Lorenzo Maiuri</div>
            <div className="font-mono text-[10.5px] text-muted">{"// Italy · EU/Remote"}</div>
          </div>
          <a
            href="/api/cv"
            className="font-mono text-[11px] text-teal border border-hairline border-teal px-[11px] py-[5px] rounded-[3px] flex-shrink-0"
          >
            ↓ CV
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-hairline border-outline-faint rounded-lg p-4 flex flex-col gap-2.5">
      {/* 2×2 stat grid */}
      <div className="grid grid-cols-2 gap-[1px] bg-outline-faint border border-hairline border-outline-faint rounded-md overflow-hidden">
        {stats.map((s) => (
          <div key={s.value + s.sup} className="bg-canvas px-4 py-[14px]">
            <div className="font-mono text-[32px] font-bold leading-none mb-1">
              <span className={cn(s.green ? "text-green" : "text-foreground")}>{s.value}</span>
              {s.sup && <sup className="text-[13px] text-green align-super">{s.sup}</sup>}
            </div>
            <div className="text-[11px] text-muted leading-[1.4] whitespace-pre-line">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Status card */}
      <div className="border border-hairline border-outline-faint rounded-md bg-canvas px-4 py-3 flex items-center gap-2.5">
        <div className="w-[38px] h-[38px] rounded-full bg-surface border border-hairline border-outline-sub flex items-center justify-center font-mono text-[11px] font-bold text-muted flex-shrink-0">
          LM
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-medium mb-0.5">Lorenzo Maiuri</div>
          <div className="font-mono text-[10px] text-muted">{"// Italy · EU / Remote"}</div>
        </div>
        <a
          href="/api/cv"
          className="font-mono text-[10px] bg-surface text-teal border border-hairline border-teal px-2 py-[3px] rounded-[3px] whitespace-nowrap hover:bg-teal/10 transition-colors"
        >
          ↓ CV
        </a>
      </div>
    </div>
  );
}

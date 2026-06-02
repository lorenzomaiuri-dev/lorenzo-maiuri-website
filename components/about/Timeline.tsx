import { profile } from "@/lib/data/profile";

export default function Timeline() {
  const items = profile.timeline;

  return (
    <div className="relative pl-6 mb-8">
      {/* Vertical connector line */}
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-outline-faint" />

      {items.map((item, i) => {
        const isCurrent = item.badge?.kind === "current";
        const isStudying = item.badge?.kind === "studying";
        const isActive = isCurrent || isStudying;

        return (
          <div key={i} className={`relative pl-6 ${i < items.length - 1 ? "pb-7" : "pb-0"}`}>
            {/* Timeline dot */}
            <div
              className={[
                "absolute left-[-1.5rem] top-[6px] w-[11px] h-[11px] rounded-full",
                isCurrent
                  ? "bg-teal border-[1.5px] border-teal shadow-[0_0_0_3px_rgba(45,212,191,0.15)]"
                  : isStudying
                    ? "bg-canvas border-[1.5px] border-teal"
                    : "bg-canvas border-[1.5px] border-outline-sub",
              ].join(" ")}
            />

            {/* Date + status badge */}
            <div className="font-mono text-[11px] text-muted mb-1 flex items-center gap-2">
              {item.dateRange}
              {isCurrent && (
                <span className="font-mono text-[9px] bg-teal text-[#04342C] px-1.5 py-px rounded-[3px] font-bold leading-none">
                  CURRENT
                </span>
              )}
              {isStudying && (
                <span className="font-mono text-[9px] border border-hairline border-teal text-teal px-1.5 py-px rounded-[3px] font-bold leading-none">
                  STUDYING
                </span>
              )}
            </div>

            {/* Role */}
            <div
              className={`text-[15px] mb-[3px] leading-[1.3] ${
                isActive ? "font-medium" : "font-normal text-muted"
              }`}
            >
              {item.role}
            </div>

            {/* Org */}
            <div
              className={`font-mono text-xs text-muted mb-2 ${
                isActive ? "opacity-85" : "opacity-60"
              }`}
            >
              {item.org}
            </div>

            {/* Description */}
            <p
              className={`text-[13px] text-muted leading-[1.6] max-w-[580px] ${
                !isActive ? "opacity-80" : ""
              }`}
            >
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

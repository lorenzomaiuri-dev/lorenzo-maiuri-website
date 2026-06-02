import type { ResultCard } from "@/lib/types";

export default function ResultsGrid({ results }: { results: ResultCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-[10px] my-4 mb-8">
      {results.map((r) => {
        const isLong = r.value.length > 8;
        return (
          <div
            key={r.label}
            className={[
              "border border-hairline rounded-lg px-6 py-5 bg-canvas",
              r.headline ? "border-green" : "border-outline-faint",
            ].join(" ")}
          >
            <div
              className={[
                "font-mono font-bold text-green leading-none tracking-[-0.02em] mb-1.5",
                isLong ? "text-[18px]" : "text-[32px]",
              ].join(" ")}
            >
              {r.value}
            </div>
            <div className="text-[13px] font-medium mb-1">{r.label}</div>
            <div className="font-mono text-[11px] text-muted leading-[1.4]">{r.context}</div>
          </div>
        );
      })}
    </div>
  );
}

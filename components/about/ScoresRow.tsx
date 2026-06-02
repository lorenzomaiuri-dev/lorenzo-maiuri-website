import { profile } from "@/lib/data/profile";

export default function ScoresRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mb-6">
      {profile.scores.map((s) => (
        <div
          key={s.score}
          className="border border-hairline border-teal rounded-lg px-5 py-4 bg-canvas flex items-center gap-4 sm:gap-5"
        >
          <div className="font-mono text-[32px] sm:text-[36px] font-bold text-teal leading-none tracking-[-0.02em] shrink-0">
            {s.score}
            <span className="text-[16px] sm:text-[18px] opacity-50">{s.denominator}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] sm:text-[13px] font-medium mb-0.5 leading-[1.3]">
              {s.title}
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] text-muted">{s.org}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

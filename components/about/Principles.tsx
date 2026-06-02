import { profile } from "@/lib/data/profile";

export default function Principles() {
  const [featured, ...rest] = profile.principles;

  return (
    <>
      {/* // 01 — featured, full-width */}
      <div className="border border-hairline border-outline-faint rounded-lg px-8 py-6 bg-canvas mb-[10px]">
        <div className="font-mono text-[10px] text-teal tracking-[0.08em] mb-2.5">
          {featured.num}
        </div>
        <div className="text-[20px] font-bold mb-2.5 tracking-[-0.01em]">{featured.title}</div>
        <p className="text-[14px] text-muted leading-[1.7] max-w-[560px]">{featured.description}</p>
      </div>

      {/* // 02–04 — 3-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px] mb-8">
        {rest.map((p) => (
          <div
            key={p.num}
            className="border border-hairline border-outline-faint rounded-lg px-5 py-[1.1rem] bg-canvas"
          >
            <div className="font-mono text-[10px] text-teal tracking-[0.08em] mb-1.5">{p.num}</div>
            <div className="text-[14px] font-medium mb-1.5 leading-[1.3]">{p.title}</div>
            <p className="text-[12px] text-muted leading-[1.6]">{p.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

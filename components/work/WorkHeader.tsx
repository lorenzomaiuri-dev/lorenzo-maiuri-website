const STATS = [
  { n: "8M", sup: "+", label: "end users\nserved", teal: false },
  { n: "2M", sup: "+", label: "MAU on\nflagship system", teal: false },
  { n: "99.9%", sup: null, label: "uptime\nacross live systems", teal: true },
  { n: "4", sup: "+", label: "systems live\nin production", teal: false },
];

export default function WorkHeader() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-12 items-end mb-12 pb-8 border-b border-hairline border-outline-faint">
      <div>
        <h1 className="text-[44px] font-bold leading-[1.1] tracking-[-0.02em] mb-4">
          Selected work,
          <br />
          <em className="not-italic text-muted font-normal">across four years.</em>
        </h1>
        <p className="text-[15px] leading-[1.6] text-muted max-w-[520px]">
          A curated selection of production systems, open-source models, and applied research. Most
          client work is under NDA — described here with anonymized details and verifiable outcomes.
        </p>
      </div>

      {/* 2×2 stats — gap-px + container bg acts as hairline divider */}
      <div className="grid grid-cols-2 gap-px bg-outline-faint border border-hairline border-outline-faint rounded-md overflow-hidden min-w-[280px]">
        {STATS.map((s) => (
          <div key={s.n + s.label} className="bg-canvas px-4 py-[0.8rem]">
            <div
              className={`font-mono text-2xl font-bold leading-none mb-[3px] ${
                s.teal ? "text-teal" : ""
              }`}
            >
              {s.n}
              {s.sup && <sup className="text-xs text-green">{s.sup}</sup>}
            </div>
            <div className="font-mono text-[10px] text-muted leading-[1.3] whitespace-pre-line">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

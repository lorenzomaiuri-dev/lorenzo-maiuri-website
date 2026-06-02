type StackGroup = { label: string; items: string[] };

export default function CaseStackSection({ stack }: { stack: StackGroup[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px] my-4 mb-8">
      {stack.map((g) => (
        <div
          key={g.label}
          className="border border-hairline border-outline-faint rounded-md px-4 py-[0.85rem]"
        >
          <div className="font-mono text-[10px] text-muted uppercase tracking-[0.06em] mb-2 pb-[0.4rem] border-b border-hairline border-outline-faint">
            {g.label}
          </div>
          <div className="font-mono text-[12px] leading-[1.7]">
            {g.items
              .join("\n")
              .split("\n")
              .map((item, i) => (
                <div key={i}>{item}</div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

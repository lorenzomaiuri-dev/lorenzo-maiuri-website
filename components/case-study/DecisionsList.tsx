import type { Decision } from "@/lib/types";

export default function DecisionsList({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="flex flex-col gap-2 my-6">
      {decisions.map((d) => (
        <div
          key={d.num}
          className="grid grid-cols-[auto_1fr] gap-4 px-5 py-4 border border-hairline border-outline-faint rounded-md bg-canvas"
        >
          <div className="font-mono text-[11px] text-teal font-bold tracking-[0.05em] pt-[1px]">
            {d.num}
          </div>
          <div>
            <div className="text-[14px] font-medium mb-1.5 leading-[1.3]">{d.title}</div>
            <p className="text-[13px] text-muted leading-[1.6]">{d.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

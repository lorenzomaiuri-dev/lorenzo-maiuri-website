import { IconMessage, IconNetwork, IconUser } from "@tabler/icons-react";
import type { ArchDiagram as ArchDiagramData } from "@/lib/types";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  user: IconUser,
  network: IconNetwork,
  message: IconMessage,
};

export default function ArchDiagram({ data }: { data: ArchDiagramData }) {
  return (
    <div className="border border-hairline border-outline-faint rounded-lg p-6 bg-surface my-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-hairline border-outline-faint">
        <span className="font-mono text-[11px] uppercase tracking-[0.06em]">{data.title}</span>
        {data.hint && <span className="font-mono text-[10px] text-muted">{data.hint}</span>}
      </div>

      {/* Flow — 5-col: node · arrow · node · arrow · node */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-0 mb-2">
        {data.flow.map((node, i) => {
          const Icon = ICONS[node.icon];
          return (
            <>
              <div
                key={node.name}
                className={[
                  "bg-canvas border border-hairline rounded-md px-3 py-3 text-center flex flex-col items-center gap-1.5 min-h-[90px] justify-center",
                  node.highlight ? "border-teal" : "border-outline-faint",
                ].join(" ")}
              >
                {Icon && <Icon size={18} className="text-teal" />}
                <div className="font-mono text-[11px] font-bold">{node.name}</div>
                <div className="text-[10px] text-muted leading-[1.3] whitespace-pre-line">
                  {node.description}
                </div>
              </div>
              {i < data.flow.length - 1 && (
                <div key={`arrow-${i}`} className="font-mono text-sm text-muted px-2 text-center">
                  →
                </div>
              )}
            </>
          );
        })}
      </div>

      {/* Sub-nodes 3-col */}
      {data.subNodes && data.subNodes.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {data.subNodes.map((sub) => (
            <div
              key={sub.label}
              className="bg-canvas border border-hairline border-outline-faint rounded-md px-[0.6rem] py-2 font-mono text-[10px] text-muted text-center"
            >
              <b className="block text-teal font-bold mb-[2px]">{sub.label}</b>
              {sub.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

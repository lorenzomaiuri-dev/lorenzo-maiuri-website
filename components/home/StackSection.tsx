import Pill from "@/components/ui/Pill";
import SectionLabel from "@/components/ui/SectionLabel";
import { stackGroups } from "@/lib/data/stack";

export default function StackSection() {
  return (
    <div>
      <SectionLabel num="04" title="Stack" sub="core tools and supporting tech" />

      <p className="font-mono text-[12px] text-muted leading-[1.6] mb-5">
        Core:{" "}
        <strong className="text-foreground font-normal">
          Python · LangChain · LlamaIndex · AWS
        </strong>{" "}
        — everything else as needed.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-10">
        {stackGroups.map((group) => (
          <div
            key={group.label}
            className={`border border-hairline rounded-md p-4 relative ${
              group.primary ? "border-teal" : "border-outline-faint"
            }`}
          >
            {/* Group header */}
            <div
              className={`flex justify-center items-center gap-2 mb-5 py-3 border-b border-hairline whitespace-nowrap ${
                group.primary ? "border-teal" : "border-outline-faint"
              }`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                  group.primary ? "text-teal" : "text-muted"
                }`}
              >
                {group.label}
              </span>
              {group.primary && (
                <span className="font-mono text-[9px] text-teal uppercase tracking-[0.05em] font-medium opacity-80">
                  ★ primary
                </span>
              )}
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-1">
              {group.items.map((item) => (
                <Pill key={item.name} core={item.core}>
                  {item.name}
                </Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

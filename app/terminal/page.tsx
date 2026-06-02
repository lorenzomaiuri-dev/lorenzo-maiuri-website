import type { Metadata } from "next";
import CommandReference from "@/components/terminal/CommandReference";
import TerminalApp from "@/components/terminal/TerminalApp";
import StatusDot from "@/components/ui/StatusDot";

export const metadata: Metadata = {
  title: "Terminal — Lorenzo Maiuri",
  description:
    "Browse the full portfolio from the command line. Same data, virtual filesystem, navigable with the commands you already know.",
};

export default function TerminalPage() {
  return (
    <>
      <div className="font-mono text-[11px] text-teal uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
        <span className="w-[18px] h-px bg-teal shrink-0" />/ terminal
      </div>

      {/* Header */}
      <section className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-end mb-6 pb-6 border-b border-hairline border-outline-faint">
        <div>
          <h1 className="text-[38px] font-bold leading-[1.1] tracking-[-0.02em] mb-3">
            Same site,
            <br />
            <em className="not-italic text-muted font-normal">different interface.</em>
          </h1>
          <p className="text-[14px] leading-[1.6] text-muted max-w-[520px]">
            Browse the whole portfolio from the command line. The same data, structured as a virtual
            filesystem — navigable with the commands you already know.
          </p>
        </div>
        <div className="font-mono text-[11px] text-teal border border-hairline border-teal px-3 py-1.5 rounded-sm flex items-center gap-2 whitespace-nowrap self-start sm:self-end">
          <StatusDot variant="teal" />
          bash · v1.0.0
        </div>
      </section>

      {/* Helper hints */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {[
          ["tip: type ", "help", " to list commands"],
          [null, "tab", " to autocomplete"],
          [null, "↑", " / ", "↓", " for history"],
          [null, "ctrl+l", " to clear"],
        ].map((parts, i) => (
          <span
            key={i}
            className="font-mono text-[11px] text-muted bg-surface border border-hairline border-outline-faint px-2.5 py-[5px] rounded-[3px]"
          >
            {parts.map((p, j) =>
              j % 2 === 1 ? (
                <span key={j} className="text-teal">
                  {p}
                </span>
              ) : (
                <span key={j}>{p}</span>
              ),
            )}
          </span>
        ))}
      </div>

      <TerminalApp />
      <CommandReference />
    </>
  );
}

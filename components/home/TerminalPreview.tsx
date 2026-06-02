"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { useTypewriter } from "@/lib/hooks/useTypewriter";

const COMMANDS = ["open work/", "cat contact.txt", "cd work/", "./lorenzomaiuri --help"];

export default function TerminalPreview() {
  const typed = useTypewriter(COMMANDS);

  return (
    <div>
      <SectionLabel num="03" title="Terminal" sub="navigate the site from the command line" />

      <div className="border border-hairline border-teal rounded-md overflow-hidden mb-4">
        {/* Bar */}
        <div className="bg-surface px-4 py-2.5 flex items-center gap-2.5 border-b border-hairline border-outline-faint">
          <div className="flex gap-[5px]">
            <span className="w-[9px] h-[9px] rounded-full bg-outline-sub" />
            <span className="w-[9px] h-[9px] rounded-full bg-outline-sub" />
            <span className="w-[9px] h-[9px] rounded-full bg-outline-sub" />
          </div>
          <span className="font-mono text-[11px] text-muted ml-1">lorenzomaiuri.dev — bash</span>
        </div>

        {/* Body */}
        <div className="px-5 py-4 bg-canvas flex justify-between items-center gap-8">
          <div className="flex-1">
            <div className="font-mono text-[12px] text-muted mb-1 leading-[1.6]">
              <span className="opacity-40">$</span> <span className="text-foreground">ls</span>
            </div>
            <div className="font-mono text-[12px] text-teal mb-1 leading-[1.6]">
              about.md &nbsp;&nbsp; work/ &nbsp;&nbsp; stack.json &nbsp;&nbsp; contact.txt
              &nbsp;&nbsp; cv.pdf
            </div>
            <div className="font-mono text-[12px] text-muted mb-1 leading-[1.6]">
              <span className="opacity-40">$</span>{" "}
              <span className="text-foreground">cat about.md</span>
            </div>
            <div className="font-mono text-[12px] text-teal mb-1 leading-[1.6]">
              AI engineer · 5 yrs · Italy/EU · ships production systems.
            </div>
            {/* Typing line */}
            <div className="font-mono text-[12px] text-foreground flex items-center min-h-5">
              <span className="opacity-40 mr-1.5">$</span>
              <span>{typed}</span>
              <span className="inline-block w-[7px] h-[13px] bg-teal animate-blink-slow ml-px" />
            </div>
          </div>

          <Link
            href="/terminal"
            className="font-mono text-[11px] text-teal border border-hairline border-teal px-3.5 py-1.5 rounded-sm whitespace-nowrap flex-shrink-0 hover:bg-teal/10 transition-colors"
          >
            open terminal →
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import StatusDot from "@/components/ui/StatusDot";

export default function LorenzoBotPreview() {
  return (
    <div>
      <SectionLabel num="02" title="LorenzoBot" sub="ask instead of reading" />

      <div className="border border-hairline border-outline-faint rounded-lg p-6 bg-surface mb-4 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          <div className="font-mono text-[11px] text-muted uppercase tracking-[0.06em] mb-2 flex items-center gap-1.5">
            <StatusDot variant="teal" />
            Live · AI assistant
          </div>
          <h3 className="text-[17px] font-medium mb-1.5 leading-snug">
            Rather than reading all this,
            <br />
            just ask.
          </h3>
          <p className="text-[13px] text-muted leading-[1.5] mb-4">
            Knows my projects, stack, availability, and approach in detail. Powered by multi-agent
            reasoning and persistent memory.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 font-mono text-xs bg-foreground text-canvas px-4 py-[9px] rounded-sm hover:opacity-90 transition-opacity"
          >
            <StatusDot variant="teal" />
            Open LorenzoBot
          </Link>
        </div>

        {/* Right — chat bubble preview */}
        <div>
          <div className="border border-hairline border-outline-faint rounded-lg px-[0.9rem] py-[0.6rem] text-[12px] text-canvas bg-foreground ml-10 mb-1.5 leading-[1.5]">
            Do you work with LangChain agents?
          </div>
          <div className="border border-hairline border-outline-faint rounded-lg px-[0.9rem] py-[0.6rem] text-[12px] text-muted bg-canvas mr-10 leading-[1.5]">
            Yes — production systems with both LangChain and LlamaIndex. Most recently a distributed
            orchestrator for a pharma client, handling document parsing and automated reporting at
            scale.
            <span className="inline-block w-1.5 h-3 bg-teal align-middle animate-blink ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

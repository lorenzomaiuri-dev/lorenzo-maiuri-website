"use client";

import StatusDot from "@/components/ui/StatusDot";
import { useContactModal } from "@/lib/context/contact-modal-context";

export default function CaseStudyFooterCTA() {
  const { openModal } = useContactModal();

  return (
    <div className="bg-surface border border-hairline border-outline-sub rounded-lg p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[3px] h-full bg-teal" />

      <div>
        <div className="font-mono text-[11px] text-teal uppercase tracking-[0.06em] mb-2 flex items-center gap-1.5">
          <StatusDot variant="teal" />
          Building something similar?
        </div>
        <h2 className="text-[22px] font-medium mb-1.5 tracking-[-0.01em] leading-snug">
          Let&apos;s talk architecture before code.
        </h2>
        <p className="text-[13px] text-muted leading-[1.5] max-w-[420px]">
          If you&apos;re scoping a production AI system — retrieval, agents, or cloud-native infra —
          a 30-min technical chat usually saves weeks downstream.
        </p>
      </div>

      <button
        type="button"
        onClick={openModal}
        className="font-mono text-[13px] bg-foreground text-canvas px-[22px] py-3 rounded-sm whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shrink-0"
      >
        Get in touch →
      </button>
    </div>
  );
}

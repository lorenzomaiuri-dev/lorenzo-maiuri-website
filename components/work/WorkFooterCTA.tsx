"use client";

import StatusDot from "@/components/ui/StatusDot";
import { useContactModal } from "@/lib/context/contact-modal-context";

export default function WorkFooterCTA() {
  const { openModal } = useContactModal();

  return (
    <div className="bg-surface border border-hairline border-outline-sub rounded-lg p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[3px] h-full bg-teal" />

      <div>
        <div className="font-mono text-[11px] text-teal uppercase tracking-[0.06em] mb-2 flex items-center gap-1.5">
          <StatusDot variant="teal" />
          Want a similar project?
        </div>
        <h2 className="text-2xl font-medium mb-1.5 tracking-[-0.01em] leading-snug">
          Let&apos;s see if I&apos;m a fit.
        </h2>
        <p className="text-[13px] text-muted leading-[1.5] max-w-[420px]">
          Most of these projects started with a 30-min technical chat. Bring your problem, your
          stack, and your constraints — I&apos;ll come prepared.
        </p>
      </div>

      <button
        type="button"
        onClick={openModal}
        className="font-mono text-[13px] bg-foreground text-canvas px-[22px] py-3 rounded-sm whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shrink-0"
      >
        Start a conversation →
      </button>
    </div>
  );
}

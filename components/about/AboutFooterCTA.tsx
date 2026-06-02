"use client";

import StatusDot from "@/components/ui/StatusDot";
import { useContactModal } from "@/lib/context/contact-modal-context";

export default function AboutFooterCTA() {
  const { openModal } = useContactModal();

  return (
    <div className="bg-surface border border-hairline border-outline-sub rounded-lg p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[3px] h-full bg-teal" />

      <div>
        <div className="font-mono text-[11px] text-teal uppercase tracking-[0.06em] mb-2 flex items-center gap-1.5">
          <StatusDot variant="teal" />
          Ready to work together?
        </div>
        <h2 className="text-2xl font-medium mb-1.5 tracking-[-0.01em] leading-snug">
          Let&apos;s scope your first sprint.
        </h2>
        <p className="text-[13px] text-muted leading-[1.5] max-w-[400px]">
          No sales call — just a 30-minute technical chat to see if we&apos;re a fit. I&apos;ll come
          prepared with questions about your stack and goals.
        </p>
        <p className="font-mono text-[11px] text-muted mt-2 flex items-center gap-1.5">
          <span className="text-teal">{"//"}</span>
          typically responds within 24h · async-first · EU timezone
        </p>
      </div>

      <button
        type="button"
        onClick={openModal}
        className="font-mono text-[13px] bg-foreground text-canvas px-[22px] py-3 rounded-sm whitespace-nowrap flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
      >
        Get in touch →
      </button>
    </div>
  );
}

"use client";

import StatusDot from "@/components/ui/StatusDot";
import { useContactModal } from "@/lib/context/contact-modal-context";

export default function FooterCTA() {
  const { openModal } = useContactModal();

  return (
    <div className="bg-surface border border-hairline border-outline-sub rounded-lg p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 relative overflow-hidden">
      {/* Left teal accent bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-teal" />

      <div>
        <div className="font-mono text-[11px] text-teal uppercase tracking-[0.06em] mb-2 flex items-center gap-1.5">
          <StatusDot variant="teal" />
          Let&apos;s build
        </div>
        <h2 className="text-2xl font-medium mb-1.5 tracking-[-0.01em] leading-snug">
          Have a project in mind?
        </h2>
        <p className="text-[13px] text-muted leading-[1.5] max-w-[420px]">
          I&apos;m available for long-term consulting engagements with startups and B2B companies.
          Remote-first, based in Italy, working across Europe.
        </p>
      </div>

      <button
        type="button"
        onClick={openModal}
        className="font-mono text-[13px] bg-foreground text-canvas px-[22px] py-3 rounded-sm whitespace-nowrap flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0"
      >
        Let&apos;s talk →
      </button>
    </div>
  );
}

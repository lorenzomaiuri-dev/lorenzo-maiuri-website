"use client";

import Link from "next/link";
import StatsPanel from "@/components/home/StatsPanel";
import StatusDot from "@/components/ui/StatusDot";
import { useContactModal } from "@/lib/context/contact-modal-context";

export default function Hero() {
  const { openModal } = useContactModal();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-[3fr_minmax(260px,2fr)] gap-12 items-start mb-16">
      {/* Left — headline + byline + CTAs */}
      <div>
        <div className="font-mono text-[11px] text-muted flex items-center gap-2 mb-5">
          <StatusDot variant="teal" />
          Available for projects · Q3 2026
        </div>

        <h1
          className="text-[52px] font-bold leading-[1.05] tracking-[-0.03em] mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          I build AI systems
          <br />
          <em className="not-italic text-muted font-normal">that ship.</em>
        </h1>

        <p className="text-[15px] text-muted leading-[1.6] mb-8 max-w-[380px]">
          I&apos;m <strong className="text-foreground font-medium">Lorenzo Maiuri</strong> — AI
          engineer and software consultant based in Italy. I turn complex ideas into
          production-grade systems for startups and B2B companies across Europe.
        </p>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/work"
            className="font-mono text-xs bg-foreground text-canvas px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
          >
            View my work
          </Link>
          <button
            type="button"
            onClick={openModal}
            className="font-mono text-xs bg-transparent text-foreground px-5 py-2.5 rounded-sm border border-hairline border-outline hover:border-teal hover:text-teal transition-colors flex items-center gap-2 cursor-pointer"
          >
            <StatusDot variant="teal" />
            Ask LorenzoBot
          </button>
        </div>
      </div>

      {/* Right — stats panel (hidden on mobile, shown below as separate section) */}
      <div className="hidden sm:block pt-6">
        <StatsPanel />
      </div>

      {/* Mobile stats — 2-col, inline below buttons */}
      <div className="sm:hidden">
        <StatsPanel mobile />
      </div>
    </section>
  );
}

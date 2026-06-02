"use client";

import { IconCalendar, IconCheck, IconCopy, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useContactModal } from "@/lib/context/contact-modal-context";
import { profile } from "@/lib/data/profile";

export default function ContactModal() {
  const { open, closeModal } = useContactModal();
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  if (!open) return null;

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: intentional — backdrop div dismisses modal on click */}
      <div
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) closeModal();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeModal();
        }}
        className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-sm flex items-end sm:items-center justify-center px-4"
        role="presentation"
      >
        {/* Panel — bottom sheet on mobile, centered card on desktop */}
        <div
          className="w-full sm:max-w-md bg-surface border border-hairline border-outline-sub rounded-lg sm:rounded-lg rounded-b-none sm:rounded-b-lg p-6 relative"
          role="dialog"
          aria-modal="true"
          aria-label="Get in touch"
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close"
          >
            <IconX size={16} />
          </button>

          {/* Teal left bar */}
          <div className="absolute top-0 left-0 w-[3px] h-full bg-teal rounded-l-lg" />

          {/* Header */}
          <div className="font-mono text-[11px] text-teal uppercase tracking-widest mb-1 flex items-center gap-2 pl-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal animate-dot-pulse" />
            Let&apos;s build
          </div>
          <h2 className="text-xl font-semibold mb-1 leading-snug pl-1">Have a project in mind?</h2>
          <p className="text-[13px] text-muted leading-relaxed mb-6 pl-1">
            No sales call — just a 30-minute technical chat. I&apos;ll come prepared with questions
            about your stack and goals.
          </p>
          <p className="font-mono text-[11px] text-muted mb-6 pl-1">
            {"// typically responds within 24h · async-first · EU timezone"}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {/* Cal.com */}
            <a
              href={profile.contact.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-mono text-xs bg-foreground text-canvas px-4 py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              <IconCalendar size={14} />
              Book a 30-min chat
            </a>

            {/* Email copy */}
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center justify-center gap-2 font-mono text-xs bg-transparent text-foreground border border-hairline border-outline px-4 py-3 rounded-sm hover:border-teal hover:text-teal transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <IconCheck size={14} className="text-green" /> Copied!
                </>
              ) : (
                <>
                  <IconCopy size={14} /> {profile.contact.email}
                </>
              )}
            </button>

            {/* Mailto fallback */}
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-center font-mono text-[10px] text-muted hover:text-teal transition-colors"
            >
              or open in mail client →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useContactModal } from "@/lib/context/contact-modal-context";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/chat", label: "Chat" },
];

export default function Nav() {
  const pathname = usePathname();
  const { openModal } = useContactModal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-6 pb-8 mb-12 px-4 border-b border-hairline border-outline-faint">
      {/* Logo */}
      <Link href="/" className="font-mono text-sm font-bold tracking-tight">
        LM<span className="text-muted font-normal">.dev</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden sm:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] transition-colors ${
              pathname === link.href ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
        <button
          type="button"
          onClick={openModal}
          className="font-mono text-xs bg-foreground text-canvas px-4 py-2 rounded-sm cursor-pointer hover:opacity-90 transition-opacity"
        >
          Get in touch
        </button>
      </div>

      {/* Mobile: theme toggle + hamburger */}
      <div className="flex sm:hidden items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex items-center justify-center w-8 h-8 border border-hairline border-outline-faint rounded-sm text-muted"
        >
          {menuOpen ? <IconX size={16} /> : <IconMenu2 size={16} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 right-0 z-50 bg-canvas border-b border-hairline border-outline-faint px-4 py-4 flex flex-col gap-4 sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm transition-colors ${
                pathname === link.href ? "text-foreground" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openModal();
            }}
            className="font-mono text-xs bg-foreground text-canvas px-4 py-3 rounded-sm text-center cursor-pointer"
          >
            Get in touch
          </button>
        </div>
      )}
    </nav>
  );
}

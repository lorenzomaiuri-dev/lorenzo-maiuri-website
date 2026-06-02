import { profile } from "@/lib/data/profile";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center gap-6 py-12 px-4 border-t border-hairline border-outline-faint mt-12">
      <span className="font-mono text-[11px] text-muted uppercase tracking-wider">
        lorenzomaiuri.dev — © 2026
      </span>
      <div className="flex gap-8 flex-wrap justify-center">
        {profile.meta.social.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

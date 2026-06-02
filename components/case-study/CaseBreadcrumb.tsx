import Link from "next/link";

export default function CaseBreadcrumb({ slug }: { slug: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-muted mb-6">
      <Link href="/work" className="hover:text-teal transition-colors">
        / work
      </Link>
      <span className="opacity-50">/</span>
      <span className="text-foreground">{slug}</span>
    </div>
  );
}

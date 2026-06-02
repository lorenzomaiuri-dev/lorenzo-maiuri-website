import Link from "next/link";
import type { Project } from "@/lib/types";

type Props = {
  prev: Project | null;
  next: Project | null;
};

export default function ProjectNav({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-2 gap-[10px] my-12 mb-8">
      {/* Prev */}
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="border border-hairline border-outline-faint rounded-lg p-5 bg-canvas hover:border-outline-sub transition-colors flex flex-col gap-1.5 group"
        >
          <span className="font-mono text-[10px] text-muted uppercase tracking-[0.06em]">
            ← previous
          </span>
          <span className="text-[14px] font-medium group-hover:text-teal transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* Next */}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="border border-hairline border-outline-faint rounded-lg p-5 bg-canvas hover:border-outline-sub transition-colors flex flex-col gap-1.5 text-right group"
        >
          <span className="font-mono text-[10px] text-muted uppercase tracking-[0.06em]">
            next →
          </span>
          <span className="text-[14px] font-medium group-hover:text-teal transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

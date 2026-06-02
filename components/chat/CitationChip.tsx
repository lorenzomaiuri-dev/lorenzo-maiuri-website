import Link from "next/link";
import type { CitationEventData } from "@/lib/types/chat-protocol";

function hrefFor(citation: CitationEventData): string {
  const { kind, slug, anchor } = citation;
  const hash = anchor ? `#${anchor}` : "";
  switch (kind) {
    case "project":
    case "case-study":
      return `/work/${slug}${hash}`;
    case "certification":
      return "/about#credentials";
    case "stack":
      return "/about";
  }
}

type Props = {
  citation: CitationEventData;
  index: number;
};

export default function CitationChip({ citation, index }: Props) {
  return (
    <Link
      href={hrefFor(citation)}
      className="inline-flex items-center gap-[5px] font-mono text-[10px] bg-canvas border border-hairline border-outline-faint px-2 py-[3px] rounded-[3px] text-muted hover:border-teal hover:text-foreground transition-colors"
    >
      <span className="text-teal">[{index + 1}]</span>
      {citation.label}
    </Link>
  );
}

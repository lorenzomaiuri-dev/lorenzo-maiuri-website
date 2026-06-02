import Link from "next/link";
import Pill from "@/components/ui/Pill";
import StatusDot from "@/components/ui/StatusDot";
import type { Project } from "@/lib/types";

const TYPE_LABEL: Record<string, string> = {
  client: "client work",
  personal: "personal",
  "open-source": "open source",
};

export default function ProjectRow({ project: p }: { project: Project }) {
  const sideRows = [
    { k: "client", v: p.client },
    { k: "role", v: p.role },
    { k: "year", v: p.year },
    { k: "type", v: TYPE_LABEL[p.type] },
  ].filter((r): r is { k: string; v: string } => Boolean(r.v));

  return (
    <div className="border border-hairline border-outline-faint rounded-lg px-6 py-5 bg-canvas hover:border-outline-sub transition-colors grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-8 items-start">
      {/* Left */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
          <span className="font-mono text-[10px] bg-surface text-muted px-2 py-[3px] rounded-[3px]">
            {p.tags}
          </span>
          <span
            className={[
              "font-mono text-[10px] px-2 py-[3px] rounded-[3px] flex items-center gap-[5px] border border-hairline",
              p.status === "live" ? "text-teal border-teal" : "text-muted border-outline-faint",
            ].join(" ")}
          >
            <StatusDot variant={p.status === "live" ? "teal" : "gray"} />
            {p.status}
          </span>
        </div>

        <div className="text-[16px] font-medium mb-1.5 leading-[1.3] flex items-center gap-2">
          {p.title}
          {p.slug === "lorenzobot" && (
            <Link
              href="/chat"
              className="text-[13px] text-muted hover:text-foreground transition-colors"
            >
              ↗
            </Link>
          )}
        </div>

        <p className="text-[13px] text-muted leading-[1.6] mb-3 max-w-[520px]">{p.description}</p>

        {p.result && <div className="font-mono text-[11px] text-green mb-3">{p.result}</div>}

        <div className="flex flex-wrap gap-1.5 mt-4">
          {p.stack.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </div>

      {/* Right — side panel, no border-left, visual separation from gap only */}
      <div className="flex flex-col pt-[0.2rem]">
        {sideRows.map((r) => (
          <div key={r.k} className="flex justify-between font-mono text-[10px] py-1">
            <span className="text-muted opacity-60">{r.k}</span>
            <span className="text-foreground">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

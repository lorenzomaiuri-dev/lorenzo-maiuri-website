"use client";

import {
  IconAddressBook,
  IconArticle,
  IconBriefcase,
  IconCalendarCheck,
  IconCertificate,
  IconFileDescription,
  IconLayersLinked,
  IconSchool,
  IconSearch,
  IconSend,
  IconStack2,
  IconStars,
  IconTool,
  IconZoomCode,
} from "@tabler/icons-react";
import { useState } from "react";
import type { ToolCallEventData } from "@/lib/types/chat-protocol";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const TOOL_ICONS: Partial<Record<string, IconComponent>> = {
  search_projects: IconSearch,
  get_project_details: IconFileDescription,
  get_case_study: IconArticle,
  search_case_study_content: IconZoomCode,
  recommend_similar_project: IconStars,
  get_stack_info: IconStack2,
  get_core_stack: IconLayersLinked,
  get_certifications: IconCertificate,
  get_education: IconSchool,
  check_availability: IconCalendarCheck,
  get_engagement_model: IconBriefcase,
  get_contact_info: IconAddressBook,
  trigger_contact_action: IconSend,
};

function formatInput(input: Record<string, unknown>): string {
  const entries = Object.entries(input);
  if (entries.length === 0) return "";
  const raw = entries.map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ");
  return raw.length > 56 ? `${raw.slice(0, 53)}…` : raw;
}

type Props = {
  toolCall: ToolCallEventData;
  result?: string;
};

export default function ToolChip({ toolCall, result }: Props) {
  const [expanded, setExpanded] = useState(false);
  const Icon = TOOL_ICONS[toolCall.tool] ?? IconTool;
  const inputStr = formatInput(toolCall.input);
  const hasResult = Boolean(result);

  return (
    <div className="font-mono text-[10px] w-full">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        disabled={!hasResult}
        className="flex items-center gap-[5px] w-full px-2 py-[3px] bg-canvas border border-hairline border-outline-faint rounded-[3px] text-muted hover:border-outline transition-colors text-left disabled:cursor-default"
      >
        <Icon size={11} className="shrink-0" />
        <span className="opacity-70">{toolCall.tool}</span>
        {inputStr && (
          <>
            <span className="opacity-30">(</span>
            <span className="opacity-50 truncate">{inputStr}</span>
            <span className="opacity-30">)</span>
          </>
        )}
        {hasResult && <span className="ml-auto shrink-0 opacity-40">{expanded ? "▴" : "▾"}</span>}
      </button>

      {expanded && result && (
        <div className="mt-[3px] ml-1 pl-2 border-l border-hairline border-outline py-[2px] text-muted opacity-70">
          → {result}
        </div>
      )}
    </div>
  );
}

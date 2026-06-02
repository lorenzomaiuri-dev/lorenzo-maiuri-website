/**
 * SSE protocol types for the LorenzoBot streaming chat.
 *
 * REST types (ChatStreamRequest) are derived from the backend OpenAPI schema:
 *   https://lorenzobot-backend-806277161.europe-west3.run.app/openapi.json
 *
 * SSE event payload types are written by hand: FastAPI's StreamingResponse is
 * opaque in OpenAPI (schema: {}), so the event structure comes from the backend
 * README and src/api/endpoints.py.
 */

// ── SSE event payloads ────────────────────────────────────────────────────────

export type MetaEventData = {
  chatId: string;
  agent: string;
};

export type ThinkingEventData = {
  agent: string;
  step: string;
};

export type HandoffEventData = {
  from: string;
  to: string;
};

export type ToolCallEventData = {
  tool: string;
  input: Record<string, unknown>;
};

export type ToolResultEventData = {
  tool: string;
  result_summary: string;
};

export type TokenEventData = {
  text: string;
};

export type CitationKind = "project" | "case-study" | "certification" | "stack";

export type CitationEventData = {
  kind: CitationKind;
  slug: string;
  label: string;
  anchor?: string;
};

export type ActionType = "open_contact_modal" | "scroll_to" | "show_projects";

export type ActionEventData = {
  action_type: ActionType;
  payload: Record<string, unknown>;
};

export type DoneEventData = {
  chatId: string;
  total_tokens?: number;
};

// ── Discriminated union ───────────────────────────────────────────────────────

export type SSEEvent =
  | { event: "meta"; data: MetaEventData }
  | { event: "thinking"; data: ThinkingEventData }
  | { event: "handoff"; data: HandoffEventData }
  | { event: "tool_call"; data: ToolCallEventData }
  | { event: "tool_result"; data: ToolResultEventData }
  | { event: "token"; data: TokenEventData }
  | { event: "citation"; data: CitationEventData }
  | { event: "action"; data: ActionEventData }
  | { event: "done"; data: DoneEventData };

export type SSEEventType = SSEEvent["event"];

// ── REST types ────────────────────────────────────────────────────────────────

export type ChatStreamRequest = {
  chatId: string | null;
  message: string;
};

// ── UI message type ───────────────────────────────────────────────────────────

/** A single message in the chat UI, user or assistant. */
export type StreamingMessage = {
  role: "user" | "assistant";
  content: string;
  /** True while the assistant message is still receiving tokens. */
  isStreaming?: boolean;
  /** True when the message content is an error (network, timeout, backend). */
  isError?: boolean;
  // Populated at the done event — rendered in Phase 3:
  toolCalls?: ToolCallEventData[];
  toolResults?: Record<string, string>;
  citations?: CitationEventData[];
};

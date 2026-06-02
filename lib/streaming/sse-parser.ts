import type { SSEEvent, SSEEventType } from "@/lib/types/chat-protocol";

const KNOWN_EVENTS = new Set<SSEEventType>([
  "meta",
  "thinking",
  "handoff",
  "tool_call",
  "tool_result",
  "token",
  "citation",
  "action",
  "done",
]);

/**
 * Async generator that consumes a ReadableStream of SSE bytes and yields
 * typed SSEEvent objects. Unknown event types are silently skipped.
 *
 * Uses fetch + ReadableStream (not EventSource) because EventSource does not
 * support POST requests or custom Authorization headers.
 */
export async function* parseSSEStream(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<SSEEvent> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // SSE events are separated by a blank line (\n\n).
      // Split on it, keeping the last (possibly incomplete) block in the buffer.
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";

      for (const block of parts) {
        const event = parseEventBlock(block);
        if (event !== null) yield event;
      }
    }

    // Flush any remaining content after the stream closes.
    const remaining = buffer.trim();
    if (remaining) {
      const event = parseEventBlock(remaining);
      if (event !== null) yield event;
    }
  } finally {
    reader.releaseLock();
  }
}

function parseEventBlock(block: string): SSEEvent | null {
  let eventType: string | null = null;
  let dataStr: string | null = null;

  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) {
      eventType = line.slice(6).trim();
    } else if (line.startsWith("data:")) {
      dataStr = line.slice(5).trim();
    }
    // Lines starting with ":" are SSE comments — ignored.
  }

  if (!eventType || !dataStr || !KNOWN_EVENTS.has(eventType as SSEEventType)) {
    return null;
  }

  try {
    // Runtime-parsed JSON cast to the correct payload type via the
    // discriminated union. The event type field narrows the union for callers.
    const data = JSON.parse(dataStr) as SSEEvent["data"];
    return { event: eventType as SSEEventType, data } as SSEEvent;
  } catch {
    return null;
  }
}

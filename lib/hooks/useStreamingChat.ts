"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { parseSSEStream } from "@/lib/streaming/sse-parser";
import type {
  ActionEventData,
  CitationEventData,
  StreamingMessage,
  ToolCallEventData,
  ToolResultEventData,
} from "@/lib/types/chat-protocol";

// ── Welcome message ───────────────────────────────────────────────────────────

const WELCOME: StreamingMessage = {
  role: "assistant",
  content:
    "Hi — I'm **LorenzoBot**, an AI assistant that knows Lorenzo's work in detail. Ask about projects, stack, availability, or how he approaches a problem. I'll cite my sources.",
};

// ── Reducer ───────────────────────────────────────────────────────────────────

type State = {
  messages: StreamingMessage[];
  isStreaming: boolean;
  currentAgent: string | null;
  currentThinking: string | null;
  chatId: string | null;
  pendingActions: ActionEventData[];
  error: string | null;
};

const INITIAL: State = {
  messages: [WELCOME],
  isStreaming: false,
  currentAgent: null,
  currentThinking: null,
  chatId: null,
  pendingActions: [],
  error: null,
};

type Action =
  | { type: "USER_MESSAGE"; text: string }
  | { type: "META"; chatId: string; agent: string }
  | { type: "THINKING"; step: string }
  | { type: "HANDOFF"; to: string }
  | { type: "TOOL_CALL"; payload: ToolCallEventData }
  | { type: "TOOL_RESULT"; payload: ToolResultEventData }
  | { type: "TOKEN"; text: string }
  | { type: "CITATION"; payload: CitationEventData }
  | { type: "ACTION"; payload: ActionEventData }
  | { type: "DONE"; chatId: string }
  | { type: "ERROR"; message: string }
  | { type: "RETRY" }
  | { type: "RESET" };

function lastAssistant(messages: StreamingMessage[]): StreamingMessage | null {
  const last = messages[messages.length - 1];
  return last?.role === "assistant" ? last : null;
}

function updateLast(
  messages: StreamingMessage[],
  updater: (msg: StreamingMessage) => StreamingMessage,
): StreamingMessage[] {
  const next = [...messages];
  next[next.length - 1] = updater(next[next.length - 1]);
  return next;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "USER_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { role: "user", content: action.text },
          { role: "assistant", content: "", isStreaming: true },
        ],
        isStreaming: true,
        currentThinking: null,
        pendingActions: [],
        error: null,
      };

    case "META":
      return { ...state, chatId: action.chatId, currentAgent: action.agent };

    case "THINKING": {
      const last = lastAssistant(state.messages);
      if (last?.isStreaming && last.content === "") {
        return { ...state, currentThinking: action.step };
      }
      return state;
    }

    case "HANDOFF":
      return { ...state, currentAgent: action.to };

    case "TOOL_CALL":
      return {
        ...state,
        messages: updateLast(state.messages, (msg) => ({
          ...msg,
          toolCalls: [...(msg.toolCalls ?? []), action.payload],
        })),
      };

    case "TOOL_RESULT":
      return {
        ...state,
        messages: updateLast(state.messages, (msg) => ({
          ...msg,
          toolResults: {
            ...msg.toolResults,
            [action.payload.tool]: action.payload.result_summary,
          },
        })),
      };

    case "TOKEN":
      return {
        ...state,
        currentThinking: null,
        messages: updateLast(state.messages, (msg) => ({
          ...msg,
          content: msg.content + action.text,
        })),
      };

    case "CITATION":
      return {
        ...state,
        messages: updateLast(state.messages, (msg) => ({
          ...msg,
          citations: [...(msg.citations ?? []), action.payload],
        })),
      };

    case "ACTION":
      return {
        ...state,
        pendingActions: [...state.pendingActions, action.payload],
      };

    case "DONE":
      return {
        ...state,
        chatId: action.chatId,
        isStreaming: false,
        currentThinking: null,
        messages: updateLast(state.messages, (msg) => ({
          ...msg,
          isStreaming: false,
        })),
      };

    case "ERROR": {
      const last = lastAssistant(state.messages);
      const messages = last?.isStreaming
        ? updateLast(state.messages, (msg) => ({
            ...msg,
            content: msg.content || action.message,
            isStreaming: false,
            isError: true,
          }))
        : state.messages;
      return {
        ...state,
        messages,
        isStreaming: false,
        currentThinking: null,
        error: action.message,
      };
    }

    case "RETRY": {
      // Remove the last two messages (error assistant + preceding user) so
      // sendMessage can re-add them fresh in the same React batch.
      const msgs = [...state.messages];
      if (msgs.length >= 2 && msgs[msgs.length - 1]?.isError) {
        msgs.splice(-2, 2);
      }
      return { ...state, messages: msgs, error: null, currentAgent: null };
    }

    case "RESET":
      return INITIAL;
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

const TIMEOUT_MS = 30_000;

function errorMessageFor(status: number): string {
  if (status === 429) return "Too many requests — please wait a moment and try again.";
  if (status >= 500) return "LorenzoBot is having trouble right now. Refresh and try again.";
  return `Something went wrong (${status}). Please try again.`;
}

type Options = {
  onAction?: (action: ActionEventData) => void;
};

export function useStreamingChat(options?: Options) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const abortRef = useRef<AbortController | null>(null);
  const chatIdRef = useRef<string | null>(null);
  chatIdRef.current = state.chatId;
  const onActionRef = useRef(options?.onAction);
  onActionRef.current = options?.onAction;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    dispatch({ type: "USER_MESSAGE", text });

    let response: Response;
    try {
      response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: chatIdRef.current, message: text }),
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      dispatch({ type: "ERROR", message: "Connection error. Please try again." });
      return;
    }

    if (!response.ok) {
      dispatch({ type: "ERROR", message: errorMessageFor(response.status) });
      return;
    }

    if (!response.body) {
      dispatch({ type: "ERROR", message: "Empty response from server." });
      return;
    }

    // 30-second watchdog: if no SSE event arrives for TIMEOUT_MS, abort.
    let watchdogId: ReturnType<typeof setTimeout> | null = null;
    function resetWatchdog() {
      if (watchdogId !== null) clearTimeout(watchdogId);
      watchdogId = setTimeout(() => {
        controller.abort();
        dispatch({
          type: "ERROR",
          message: "LorenzoBot took too long to respond. Please try again.",
        });
      }, TIMEOUT_MS);
    }

    try {
      resetWatchdog();
      for await (const event of parseSSEStream(response.body)) {
        if (controller.signal.aborted) break;
        resetWatchdog();

        switch (event.event) {
          case "meta":
            chatIdRef.current = event.data.chatId;
            dispatch({ type: "META", chatId: event.data.chatId, agent: event.data.agent });
            break;
          case "thinking":
            dispatch({ type: "THINKING", step: event.data.step });
            break;
          case "handoff":
            dispatch({ type: "HANDOFF", to: event.data.to });
            break;
          case "tool_call":
            dispatch({ type: "TOOL_CALL", payload: event.data });
            break;
          case "tool_result":
            dispatch({ type: "TOOL_RESULT", payload: event.data });
            break;
          case "token":
            dispatch({ type: "TOKEN", text: event.data.text });
            break;
          case "citation":
            dispatch({ type: "CITATION", payload: event.data });
            break;
          case "action":
            dispatch({ type: "ACTION", payload: event.data });
            onActionRef.current?.(event.data);
            break;
          case "done":
            dispatch({ type: "DONE", chatId: event.data.chatId });
            break;
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      dispatch({ type: "ERROR", message: "Stream interrupted. Please try again." });
    } finally {
      if (watchdogId !== null) clearTimeout(watchdogId);
    }
  }, []);

  const retry = useCallback(() => {
    // Find the last user text before clearing the error state.
    const lastUserMsg = [...state.messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;
    const text = lastUserMsg.content;
    // RETRY and USER_MESSAGE are batched by React — net result is a clean replacement.
    dispatch({ type: "RETRY" });
    sendMessage(text);
  }, [state.messages, sendMessage]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    const idToDelete = chatIdRef.current;
    if (idToDelete) {
      // Fire-and-forget: don't block local reset on the network call.
      fetch(`/api/chat/${idToDelete}`, { method: "DELETE" }).catch(() => {});
    }
    dispatch({ type: "RESET" });
  }, []);

  return {
    messages: state.messages,
    isStreaming: state.isStreaming,
    currentAgent: state.currentAgent,
    currentThinking: state.currentThinking,
    pendingActions: state.pendingActions,
    error: state.error,
    sendMessage,
    retry,
    reset,
  };
}

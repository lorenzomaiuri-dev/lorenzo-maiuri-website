"use client";

import {
  IconCalendar,
  IconFileText,
  IconMessage,
  IconRefresh,
  IconSchool,
  IconStack2,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import CitationChip from "@/components/chat/CitationChip";
import ToolChip from "@/components/chat/ToolChip";
import StatusDot from "@/components/ui/StatusDot";
import { executeAction } from "@/lib/chat/action-handler";
import { useContactModal } from "@/lib/context/contact-modal-context";
import { chatbotMeta } from "@/lib/data/chatbot-meta";
import { useStreamingChat } from "@/lib/hooks/useStreamingChat";

// ─── Agent label mapping ───────────────────────────────────────────────────

const AGENT_LABELS: Record<string, string> = {
  router_agent: "// routing...",
  project_agent: "// project specialist",
  technical_agent: "// technical expert",
  availability_agent: "// availability",
  contact_agent: "// contact specialist",
};

function agentLabel(agent: string | null, slowWarning: boolean): string {
  if (slowWarning) return "// taking a moment...";
  if (!agent) return "// fact-checked · lorenzomaiuri.dev";
  return AGENT_LABELS[agent] ?? `// ${agent.replace(/_agent$/, "").replace(/_/g, " ")}`;
}

// ─── Markdown content renderer ───────────────────────────────────────────

function MsgContent({ text, isUser }: { text: string; isUser: boolean }) {
  return (
    <Markdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => (
          <strong className={isUser ? "font-semibold" : "text-teal font-medium"}>{children}</strong>
        ),
        em: ({ children }) => <em className="italic opacity-80">{children}</em>,
        ul: ({ children }) => (
          <ul className="list-disc list-outside pl-4 mb-2 last:mb-0 space-y-0.5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside pl-4 mb-2 last:mb-0 space-y-0.5">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-[1.6]">{children}</li>,
        code: ({ children, className }) => {
          const isBlock = !!className;
          return isBlock ? (
            <code
              className={[
                "block font-mono text-[11px] p-3 rounded-md border border-hairline overflow-x-auto my-2",
                isUser ? "bg-white/10 border-transparent" : "bg-canvas border-outline-faint",
              ].join(" ")}
            >
              {children}
            </code>
          ) : (
            <code
              className={[
                "font-mono text-[11px] px-[5px] py-px rounded-[3px] border border-hairline",
                isUser
                  ? "bg-white/10 border-transparent text-canvas"
                  : "bg-canvas border-outline-faint",
              ].join(" ")}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={isUser ? "underline opacity-80" : "text-teal underline"}
          >
            {children}
          </a>
        ),
        h1: ({ children }) => <h1 className="text-[15px] font-semibold mb-1 mt-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-[14px] font-semibold mb-1 mt-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-[13px] font-semibold mb-1 mt-1.5">{children}</h3>,
      }}
    >
      {text}
    </Markdown>
  );
}

// ─── Static sidebar data ──────────────────────────────────────────────────

const KNOWS_ABOUT = [
  { icon: IconFileText, label: "All projects · details" },
  { icon: IconStack2, label: "Stack · proficiency" },
  { icon: IconCalendar, label: "Availability" },
  { icon: IconMessage, label: "Approach · principles" },
  { icon: IconSchool, label: "Education · certs" },
];

// ─── Main component ───────────────────────────────────────────────────────

export default function ChatApp() {
  const router = useRouter();
  const { openModal } = useContactModal();

  const { messages, isStreaming, currentAgent, currentThinking, sendMessage, retry, reset } =
    useStreamingChat({
      onAction: (action) => executeAction(action, { openModal, router }),
    });

  const [input, setInput] = useState("");
  const [slowWarning, setSlowWarning] = useState(false);
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new content.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, currentThinking]);

  // Return focus to input when streaming ends.
  useEffect(() => {
    if (!isStreaming) {
      inputRef.current?.focus();
    }
  }, [isStreaming]);

  // Show "taking a moment..." label after 2s of waiting for first token.
  useEffect(() => {
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);

    if (!isStreaming) {
      setSlowWarning(false);
      return;
    }
    const lastMsg = messages[messages.length - 1];
    const isWaiting =
      lastMsg?.role === "assistant" && lastMsg.isStreaming && lastMsg.content === "";
    if (!isWaiting) {
      setSlowWarning(false);
      return;
    }
    slowTimerRef.current = setTimeout(() => setSlowWarning(true), 2000);
    return () => {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, [isStreaming, messages]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    setInput("");
    sendMessage(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  }

  function handleReset() {
    reset();
    setInput("");
    inputRef.current?.focus();
  }

  // The key for the agent sub-label: changes on agent change OR when slow warning toggles,
  // triggering a fresh fade-in animation each time.
  const subLabelKey = slowWarning ? "slow" : (currentAgent ?? "idle");

  return (
    <>
      {/* Page eye */}
      <div className="font-mono text-[11px] text-teal uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
        <span className="w-[18px] h-px bg-teal shrink-0" />/ chat
      </div>

      {/* Header */}
      <section className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-end mb-8 pb-6 border-b border-hairline border-outline-faint">
        <div>
          <h1 className="text-[38px] font-bold leading-[1.1] tracking-[-0.02em] mb-3">
            Ask me anything,
            <br />
            <em className="not-italic text-muted font-normal">I&apos;ll keep it factual.</em>
          </h1>
          <p className="text-[14px] leading-[1.6] text-muted max-w-[520px]">
            LorenzoBot is an AI assistant trained on my work, stack, and approach. Faster than
            scrolling through the site — and it cites its sources from my actual projects.
          </p>
        </div>
        <div className="font-mono text-[11px] text-teal border border-hairline border-teal px-3 py-1.5 rounded-sm flex items-center gap-2 whitespace-nowrap self-start sm:self-end">
          <StatusDot variant="teal" />
          live · multi-agent
        </div>
      </section>

      {/* Chat app container */}
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] border border-hairline border-outline-sub rounded-lg overflow-hidden bg-canvas mb-10">
        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="hidden sm:flex flex-col gap-6 bg-surface px-4 py-5 border-r border-hairline border-outline-faint">
          <div>
            <div className="font-mono text-[10px] text-muted uppercase tracking-[0.08em] mb-2.5 pb-[0.4rem] border-b border-hairline border-outline-faint">
              System
            </div>
            <div className="flex flex-col gap-[5px]">
              {[
                { k: "model", v: chatbotMeta.model, teal: false },
                { k: "agent", v: chatbotMeta.agentType, teal: false },
                { k: "memory", v: chatbotMeta.memory, teal: false },
                { k: "status", v: "online", teal: true },
              ].map((r) => (
                <div key={r.k} className="flex justify-between font-mono text-[10px]">
                  <span className="text-muted opacity-60">{r.k}</span>
                  {r.teal ? (
                    <span className="text-teal flex items-center gap-[5px]">
                      <StatusDot variant="teal" />
                      {r.v}
                    </span>
                  ) : (
                    <span>{r.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-muted uppercase tracking-[0.08em] mb-2.5 pb-[0.4rem] border-b border-hairline border-outline-faint">
              Try asking
            </div>
            <div className="flex flex-col gap-1.5">
              {chatbotMeta.suggestedPrompts.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => handleSend(p)}
                  disabled={isStreaming}
                  className="text-[11px] text-left px-2.5 py-2 border border-hairline border-outline-faint rounded-sm bg-canvas leading-[1.4] hover:border-teal transition-colors cursor-pointer disabled:opacity-40"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-muted uppercase tracking-[0.08em] mb-2.5 pb-[0.4rem] border-b border-hairline border-outline-faint">
              Knows about
            </div>
            <div className="flex flex-col gap-[5px]">
              {KNOWS_ABOUT.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-muted"
                >
                  <Icon size={11} className="text-teal shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────────────── */}
        <div className="flex flex-col min-h-[560px] bg-canvas">
          {/* Topbar */}
          <div className="flex items-center justify-between px-5 py-[0.85rem] border-b border-hairline border-outline-faint">
            <div className="flex items-center gap-2.5">
              {/* Avatar — pulses while streaming */}
              <div
                className={[
                  "w-7 h-7 rounded-full bg-surface border border-hairline border-teal flex items-center justify-center font-mono text-[10px] font-bold text-teal shrink-0 transition-opacity",
                  isStreaming ? "animate-pulse" : "",
                ].join(" ")}
                aria-hidden="true"
              >
                LB
              </div>
              <div>
                <div className="text-[13px] font-medium leading-snug">LorenzoBot</div>
                {/* Dynamic sub-label with fade-in on every change */}
                <div
                  key={subLabelKey}
                  className="font-mono text-[10px] text-muted leading-none mt-[1px] animate-fade-in"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {agentLabel(currentAgent, slowWarning)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="font-mono text-[10px] text-muted border border-hairline border-outline-faint px-2.5 py-[5px] rounded-sm hover:text-foreground transition-colors cursor-pointer"
                aria-label="Reset conversation"
              >
                ↻ reset
              </button>
            </div>
          </div>

          {/* Messages scroll */}
          <div
            ref={scrollRef}
            className="flex-1 px-6 py-6 overflow-y-auto flex flex-col gap-4"
            aria-live="polite"
            aria-label="Chat messages"
            role="log"
          >
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              const isEmpty = msg.isStreaming && msg.content === "";

              // ── Streaming assistant message ──────────────────────────
              if (msg.role === "assistant" && isLast && msg.isStreaming) {
                return (
                  <Fragment key={i}>
                    {/* Ephemeral thinking row — only while bubble is empty */}
                    {isEmpty && currentThinking && (
                      <div
                        className="self-start font-mono text-[11px] italic text-teal/70 pl-0.5"
                        aria-live="off"
                      >
                        {"// "}
                        {currentThinking}
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5 self-start items-start max-w-[80%]">
                      <span className="font-mono text-[9px] text-muted opacity-50 uppercase tracking-[0.05em]">
                        LorenzoBot
                      </span>

                      {isEmpty ? (
                        <div
                          className="flex items-center gap-1 px-4 py-3 bg-surface border border-hairline border-outline-faint rounded-md"
                          role="status"
                          aria-label="LorenzoBot is typing"
                        >
                          <span className="w-[6px] h-[6px] rounded-full bg-teal animate-typing-1" />
                          <span className="w-[6px] h-[6px] rounded-full bg-teal animate-typing-2" />
                          <span className="w-[6px] h-[6px] rounded-full bg-teal animate-typing-3" />
                        </div>
                      ) : (
                        <div className="px-4 py-3 rounded-md text-[13px] leading-[1.6] border border-hairline bg-surface border-outline-faint">
                          <MsgContent text={msg.content} isUser={false} />
                          <span
                            className="inline-block w-[6px] h-[3px] bg-teal animate-blink ml-0.5 align-middle"
                            aria-hidden="true"
                          />
                        </div>
                      )}

                      {msg.toolCalls && msg.toolCalls.length > 0 && (
                        <div className="flex flex-col gap-1 w-full mt-0.5">
                          {msg.toolCalls.map((tc, n) => (
                            <ToolChip key={n} toolCall={tc} result={msg.toolResults?.[tc.tool]} />
                          ))}
                        </div>
                      )}
                    </div>
                  </Fragment>
                );
              }

              // ── Completed messages ───────────────────────────────────
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1.5 max-w-[80%] ${
                    msg.role === "user" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <span className="font-mono text-[9px] text-muted opacity-50 uppercase tracking-[0.05em]">
                    {msg.role === "user" ? "you" : "LorenzoBot"}
                  </span>

                  <div
                    className={[
                      "px-4 py-3 rounded-md text-[13px] leading-[1.6] border border-hairline",
                      msg.role === "user"
                        ? "bg-foreground text-canvas border-transparent"
                        : msg.isError
                          ? "bg-surface border-outline text-muted"
                          : "bg-surface border-outline-faint",
                    ].join(" ")}
                  >
                    <MsgContent text={msg.content} isUser={msg.role === "user"} />
                  </div>

                  {/* Retry button — shown below error assistant messages */}
                  {msg.isError && isLast && (
                    <button
                      type="button"
                      onClick={retry}
                      className="flex items-center gap-1.5 font-mono text-[10px] text-muted border border-hairline border-outline-faint px-2.5 py-[5px] rounded-sm hover:border-teal hover:text-foreground transition-colors cursor-pointer mt-0.5"
                      aria-label="Retry last message"
                    >
                      <IconRefresh size={11} />
                      try again
                    </button>
                  )}

                  {/* Tool chips */}
                  {msg.role === "assistant" && msg.toolCalls && msg.toolCalls.length > 0 && (
                    <div className="flex flex-col gap-1 w-full mt-0.5">
                      {msg.toolCalls.map((tc, n) => (
                        <ToolChip key={n} toolCall={tc} result={msg.toolResults?.[tc.tool]} />
                      ))}
                    </div>
                  )}

                  {/* Citation chips — rendered after done event */}
                  {msg.role === "assistant" && msg.citations && msg.citations.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {msg.citations.map((c, n) => (
                        <CitationChip key={n} citation={c} index={n} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Input area */}
          <div className="px-5 pb-4 pt-3 border-t border-hairline border-outline-faint">
            <div className="flex items-end gap-2 bg-surface border border-hairline border-outline-faint rounded-md px-[14px] py-[6px] pr-[6px] focus-within:border-teal transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
                placeholder="Ask LorenzoBot anything..."
                rows={1}
                aria-label="Message input"
                className="flex-1 bg-transparent border-none outline-none text-[13px] resize-none py-2 placeholder:text-muted placeholder:opacity-60 max-h-32 leading-[1.5] disabled:opacity-50"
                style={{ overflowY: "auto" }}
              />
              <button
                type="button"
                onClick={() => handleSend(input)}
                disabled={isStreaming || !input.trim()}
                aria-label="Send message"
                className="font-mono text-[11px] bg-foreground text-canvas px-[14px] py-2 rounded-sm flex items-center gap-[5px] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 shrink-0 self-end mb-[1px]"
              >
                send ↵
              </button>
            </div>
            <div className="flex justify-between items-center mt-1.5 font-mono text-[10px] text-muted opacity-70">
              <div>
                <kbd className="bg-surface border border-hairline border-outline-faint rounded-[3px] px-[5px] py-px font-mono text-[9px]">
                  ↵
                </kbd>{" "}
                send ·{" "}
                <kbd className="bg-surface border border-hairline border-outline-faint rounded-[3px] px-[5px] py-px font-mono text-[9px]">
                  shift
                </kbd>{" "}
                +{" "}
                <kbd className="bg-surface border border-hairline border-outline-faint rounded-[3px] px-[5px] py-px font-mono text-[9px]">
                  ↵
                </kbd>{" "}
                new line
              </div>
              <div>responses cite source pages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div className="font-mono text-[11px] text-muted text-center mb-8 px-4 py-3 border border-dashed border-outline-faint rounded-md">
        <span className="text-teal">{"//"}</span> conversations aren&apos;t stored long-term · no
        personal data sent to the model · powered by {chatbotMeta.model}
      </div>
    </>
  );
}

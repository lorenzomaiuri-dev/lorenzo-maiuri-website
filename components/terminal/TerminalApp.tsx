"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useContactModal } from "@/lib/context/contact-modal-context";
import { type Seg, type TermLine, useTerminal } from "@/lib/hooks/useTerminal";

// ─── Color map ─────────────────────────────────────────────────────────────

const SEG: Record<string, string> = {
  val: "text-teal",
  dim: "text-[#5a5d62]",
  warn: "text-[#f59e0b]",
  dir: "text-[#60a5fa] font-bold",
  exec: "text-[#22c55e]",
  link: "text-teal underline cursor-pointer",
};

// ─── Line renderer ─────────────────────────────────────────────────────────

function RenderSegs({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) => (
        <span key={i} className={s.c ? SEG[s.c] : "text-[#a4a7ab]"}>
          {s.t}
        </span>
      ))}
    </>
  );
}

function RenderLine({ line, onNavigate }: { line: TermLine; onNavigate: (h: string) => void }) {
  if (line.kind === "blank") return <div className="h-2" />;

  if (line.kind === "cmd")
    return (
      <div className="mt-2 mb-[3px]">
        <span className="text-teal mr-2">$</span>
        <span className="text-[#a78bfa] mr-2">{line.path}</span>
        <span className="text-[#e2e3e5]">{line.text}</span>
      </div>
    );

  if (line.kind === "text")
    return (
      <div className="mb-[2px]">
        <RenderSegs segs={line.segs} />
      </div>
    );

  if (line.kind === "ls")
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3.5 gap-y-[3px] my-1.5">
        {line.items.map((item) => (
          <span key={item.name} className={SEG[item.style] ?? "text-[#a4a7ab]"}>
            {item.name}
          </span>
        ))}
      </div>
    );

  if (line.kind === "ls-stat")
    return (
      <div className="my-1">
        {line.items.map((item) => (
          <div key={item.name} className="flex items-start gap-2 mb-[2px]">
            <span className={item.live === true ? "text-teal" : "text-[#5a5d62]"}>
              {item.live === true ? "●" : "○"}
            </span>
            <span className="text-[#e2e3e5] w-[210px] shrink-0">{item.name}</span>
            <span className="text-[#5a5d62]">{item.comment}</span>
          </div>
        ))}
      </div>
    );

  if (line.kind === "box")
    return (
      <div className="border border-[#3a3b3f] rounded px-4 py-3 my-1.5 bg-teal/[0.04]">
        <div className="text-teal text-[12px] mb-1.5">{line.title}</div>
        {line.rows.map((r, i) => (
          <div key={i} className="flex gap-2 text-[#a4a7ab] mb-[2px]">
            <span className="text-[#e2e3e5] w-[90px] shrink-0">{r.key}</span>
            <span className={r.valCls ? SEG[r.valCls] : ""}>{r.val}</span>
          </div>
        ))}
        {line.link && (
          <button
            type="button"
            onClick={() =>
              line.link!.external
                ? window.open(line.link!.href, "_blank")
                : onNavigate(line.link!.href)
            }
            className="mt-2 text-teal underline cursor-pointer text-[11px] hover:opacity-80"
          >
            {line.link.text}
          </button>
        )}
      </div>
    );

  return null;
}

// ─── Terminal App ──────────────────────────────────────────────────────────

export default function TerminalApp() {
  const router = useRouter();
  const { openModal } = useContactModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const {
    lines,
    input,
    setInput,
    cwd,
    execute,
    tabComplete,
    historyUp,
    historyDown,
    clearTerminal,
  } = useTerminal({
    onHire: openModal,
    onTheme: (t) => {
      document.documentElement.setAttribute("data-theme", t);
      localStorage.setItem("theme", t);
    },
    onExit: () => router.push("/"),
    onNavigate: (path) => router.push(path),
  });

  // Auto-scroll to bottom when lines change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus the hidden input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input.trim();
      setInput("");
      execute(cmd);
    } else if (e.key === "Tab") {
      e.preventDefault();
      tabComplete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      historyUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      historyDown();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clearTerminal();
    }
  }

  return (
    <div
      className="border border-[#2d2f34] rounded-lg overflow-hidden mb-6"
      style={{ background: "#0d0e10" }}
    >
      {/* Title bar */}
      <div className="bg-surface px-4 py-3 flex items-center justify-between border-b border-hairline border-outline-faint">
        <div className="flex items-center gap-3.5">
          <div className="flex gap-[5px]">
            <span className="w-[10px] h-[10px] rounded-full bg-outline-sub" />
            <span className="w-[10px] h-[10px] rounded-full bg-outline-sub" />
            <span className="w-[10px] h-[10px] rounded-full bg-outline-sub" />
          </div>
          <span className="font-mono text-[11px] text-muted">
            lorenzo@maiuri.dev — bash — 80×24
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="font-mono text-[10px] text-teal border border-hairline border-teal px-2 py-[3px] rounded-[3px]">
            terminal
          </span>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="font-mono text-[10px] text-muted border border-hairline border-outline-faint px-2 py-[3px] rounded-[3px] hover:text-foreground transition-colors cursor-pointer"
          >
            ↗ exit
          </button>
        </div>
      </div>

      {/* biome-ignore lint/a11y/noStaticElementInteractions: intentional — click redirects focus to hidden terminal input */}
      <div
        ref={bodyRef}
        className="px-6 py-5 font-mono text-[12.5px] leading-[1.65] min-h-[480px] max-h-[520px] overflow-y-auto scrollbar-thin"
        style={{ background: "#0d0e10" }}
        role="presentation"
        onClick={() => inputRef.current?.focus()}
        onKeyDown={() => inputRef.current?.focus()}
      >
        {/* ASCII banner — desktop only */}
        <pre className="text-teal hidden sm:block mb-1 leading-[1.3] text-[9.5px] select-none overflow-x-auto">{`  _                                          __  __       _            _
 | |    ___  _ __ ___ _ __  _______       |  \\/  | __ _(_)_   _ _ __(_)
 | |   / _ \\| '__/ _ \\ '_ \\|_  / _ \\ _____| |\\/| |/ _\` | | | | | '__| |
 | |__| (_) | | |  __/ | | |/ / (_) |_____| |  | | (_| | | |_| | |  | |
 |_____\\___/|_|  \\___|_| |_/___\\___/      |_|  |_|\\__,_|_|\\__,_|_|  |_|`}</pre>

        {/* Welcome */}
        <div className="text-[#7a7d82] text-[11px] mb-4">
          welcome to <span className="text-[#e2e3e5]">lorenzomaiuri.dev</span> · type{" "}
          <span className="text-[#e2e3e5]">help</span> to start · last login: today via web
        </div>

        {/* Output lines */}
        {lines.map((line, i) => (
          <RenderLine key={i} line={line} onNavigate={(h) => router.push(h)} />
        ))}

        {/* Active prompt */}
        <div className="flex items-center mt-3 relative">
          <span className="text-teal mr-2 shrink-0">$</span>
          <span className="text-[#a78bfa] mr-2 shrink-0">{cwd}</span>
          <span className="text-[#e2e3e5] whitespace-pre">{input}</span>
          <span className="inline-block w-[7px] h-[14px] bg-[#e2e3e5] animate-blink ml-[1px] shrink-0" />
          {/* Hidden input captures keystrokes */}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 w-full opacity-0 cursor-default"
            // biome-ignore lint/a11y/noAutofocus: intentional — terminal input must receive focus on mount
            autoFocus
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}

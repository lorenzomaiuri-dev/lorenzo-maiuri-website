"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { stackGroups } from "@/lib/data/stack";
import { parseBox, resolveDir, terminalFS } from "@/lib/data/terminal-fs";

// ─── Output line types ─────────────────────────────────────────────────────

export type SegColor = "val" | "dim" | "warn" | "dir" | "exec" | "link";

export type Seg = { t: string; c?: SegColor };

export type TermLine =
  | { kind: "cmd"; path: string; text: string }
  | { kind: "text"; segs: Seg[] }
  | { kind: "ls"; items: { name: string; style: "dir" | "exec" | "file" }[] }
  | { kind: "ls-stat"; items: { name: string; live: boolean | null; comment: string }[] }
  | {
      kind: "box";
      title: string;
      rows: { key: string; val: string; valCls?: string }[];
      link?: { text: string; href: string; external?: boolean };
    }
  | { kind: "blank" };

// ─── Helpers ───────────────────────────────────────────────────────────────

const out = (t: string, c?: SegColor): TermLine => ({ kind: "text", segs: [{ t, c }] });
const multi = (...segs: Seg[]): TermLine => ({ kind: "text", segs });
const blank = (): TermLine => ({ kind: "blank" });

const COMMANDS = [
  "help",
  "ls",
  "cd",
  "cat",
  "open",
  "tree",
  "whoami",
  "./hire",
  "./cv",
  "stack",
  "availability",
  "theme",
  "clear",
  "exit",
];

// ─── Hook ──────────────────────────────────────────────────────────────────

type Options = {
  onHire: () => void;
  onTheme: (t: "dark" | "light") => void;
  onExit: () => void;
  onNavigate: (path: string) => void;
};

export function useTerminal({ onHire, onTheme, onExit, onNavigate }: Options) {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  function push(...newLines: TermLine[]) {
    setLines((prev) => [...prev, ...newLines]);
  }

  function execute(rawCmd: string) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    push({ kind: "cmd", path: cwd, text: cmd });

    setCmdHistory((prev) => {
      const next = prev.filter((c) => c !== cmd);
      next.push(cmd);
      return next;
    });
    setHistIdx(-1);

    const parts = cmd.split(/\s+/);
    const name = parts[0];
    const args = parts.slice(1);

    // ── clear ──────────────────────────────────────────────────────────────
    if (name === "clear") {
      setLines([]);
      return;
    }

    // ── help ───────────────────────────────────────────────────────────────
    if (name === "help") {
      push(
        blank(),
        out("available commands:", "dim"),
        blank(),
        multi({ t: "  help              ", c: "val" }, { t: "list all commands" }),
        multi({ t: "  ls [--status]     ", c: "val" }, { t: "list current directory" }),
        multi({ t: "  cd <dir>          ", c: "val" }, { t: "change directory (.. to go up)" }),
        multi({ t: "  cat <file>        ", c: "val" }, { t: "print file contents" }),
        multi({ t: "  open <file>       ", c: "val" }, { t: "open in standard site view" }),
        multi({ t: "  tree              ", c: "val" }, { t: "show full filesystem map" }),
        multi({ t: "  whoami            ", c: "val" }, { t: "about Lorenzo, short form" }),
        multi({ t: "  ./hire            ", c: "val" }, { t: "start contact flow" }),
        multi({ t: "  ./cv              ", c: "val" }, { t: "download CV pdf" }),
        multi({ t: "  stack [--core]    ", c: "val" }, { t: "show tech stack" }),
        multi({ t: "  availability      ", c: "val" }, { t: "current booking window" }),
        multi({ t: "  theme dark|light  ", c: "val" }, { t: "switch site theme" }),
        multi({ t: "  clear             ", c: "val" }, { t: "clear screen (ctrl+l)" }),
        multi({ t: "  exit              ", c: "val" }, { t: "back to standard view" }),
        blank(),
      );
      return;
    }

    // ── whoami ─────────────────────────────────────────────────────────────
    if (name === "whoami") {
      push(
        multi(
          {
            t: `${profile.meta.name} · AI engineer & software consultant · ${profile.meta.location} · `,
          },
          { t: `available ${profile.meta.availability}`, c: "val" },
        ),
      );
      return;
    }

    // ── ls ─────────────────────────────────────────────────────────────────
    if (name === "ls") {
      const dir = resolveDir(cwd);
      if (!dir) {
        push(out(`ls: cannot access '${cwd}'`, "warn"));
        return;
      }

      if (args.includes("--status")) {
        const items = dir.children.map((child) => {
          const slug = child.name.replace(".md", "");
          const project = projects.find((p) => p.slug === slug);
          const live = project ? project.status === "live" : null;
          const comment = project ? `// ${project.status} · ${project.client ?? project.type}` : "";
          return { name: child.name, live, comment };
        });
        push({ kind: "ls-stat", items });
      } else {
        const items = dir.children.map((child) => ({
          name:
            child.type === "dir"
              ? `${child.name}/`
              : child.type === "file" && child.executable && !child.name.includes(".")
                ? `./${child.name}`
                : child.name,
          style: (child.type === "dir"
            ? "dir"
            : child.type === "file" && child.executable
              ? "exec"
              : "file") as "dir" | "exec" | "file",
        }));
        push({ kind: "ls", items });
      }
      return;
    }

    // ── cd ─────────────────────────────────────────────────────────────────
    if (name === "cd") {
      const target = args[0];
      if (!target || target === "~") {
        setCwd("~");
        return;
      }
      if (target === "..") {
        if (cwd !== "~") {
          const parts2 = cwd.split("/");
          parts2.pop();
          setCwd(parts2.join("/") || "~");
        }
        return;
      }
      const dir = resolveDir(cwd);
      const cleanTarget = target.replace(/\/$/, "");
      const child = dir?.children.find((c) => c.name === cleanTarget);
      if (child?.type !== "dir") {
        push(out(`cd: no such directory: ${target}`, "warn"));
        return;
      }
      setCwd(cwd === "~" ? `~/${cleanTarget}` : `${cwd}/${cleanTarget}`);
      return;
    }

    // ── cat ────────────────────────────────────────────────────────────────
    if (name === "cat") {
      const filename = args[0];
      if (!filename) {
        push(out("cat: missing operand", "warn"));
        return;
      }
      const dir = resolveDir(cwd);
      const file = dir?.children.find((c) => c.name === filename);
      if (file?.type !== "file") {
        push(out(`cat: ${filename}: no such file`, "warn"));
        return;
      }
      const b = parseBox(file.content);
      if (b) {
        push({ kind: "box", title: b.title, rows: b.rows, link: b.link });
      } else {
        for (const t of file.content.split("\n")) push(out(t));
      }
      return;
    }

    // ── open ───────────────────────────────────────────────────────────────
    if (name === "open") {
      const target = args[0];
      if (!target) {
        push(out("open: missing argument", "warn"));
        return;
      }

      const slug = target.replace(".md", "");
      if (slug === "about") {
        push(out("→ /about", "val"));
        setTimeout(() => onNavigate("/about"), 200);
        return;
      }
      if (slug === "contact" || slug === "contact.txt") {
        onHire();
        return;
      }

      const dir = resolveDir(cwd);
      const file = dir?.children.find((c) => c.name === target || c.name === `${target}.md`);
      if (file?.type === "file") {
        const b = parseBox(file.content);
        if (b?.link) {
          push(multi({ t: "→ opening " }, { t: b.link.href, c: "val" }));
          setTimeout(() => {
            if (b.link!.external) window.open(b.link!.href, "_blank");
            else onNavigate(b.link!.href);
          }, 200);
          return;
        }
      }
      push(out(`open: no page found for '${target}'`, "warn"));
      return;
    }

    // ── tree ───────────────────────────────────────────────────────────────
    if (name === "tree") {
      push(out("~/", "dir"));
      terminalFS.children.forEach((child, i) => {
        const isLast = i === terminalFS.children.length - 1;
        const prefix = isLast ? "└── " : "├── ";
        if (child.type === "dir") {
          push(multi({ t: prefix }, { t: `${child.name}/`, c: "dir" }));
          child.children.forEach((sub, j) => {
            const subLast =
              j === (child as Extract<typeof child, { type: "dir" }>).children.length - 1;
            const subPfx = (isLast ? "    " : "│   ") + (subLast ? "└── " : "├── ");
            push(
              out(subPfx + sub.name, sub.type === "file" && sub.executable ? "exec" : undefined),
            );
          });
        } else {
          push(multi({ t: prefix }, { t: child.name, c: child.executable ? "exec" : undefined }));
        }
      });
      push(blank());
      return;
    }

    // ── stack ──────────────────────────────────────────────────────────────
    if (name === "stack") {
      if (args.includes("--core")) {
        const core = stackGroups.flatMap((g) => g.items.filter((i) => i.core).map((i) => i.name));
        push(out(core.join(" · "), "val"));
      } else {
        push(blank());
        stackGroups.forEach((g) => {
          push(
            multi(
              { t: `  ${g.label.padEnd(18)}`, c: "val" },
              { t: g.items.map((i) => i.name).join(" · ") },
            ),
          );
        });
        push(blank());
      }
      return;
    }

    // ── availability ───────────────────────────────────────────────────────
    if (name === "availability") {
      push(
        blank(),
        multi({ t: "  status    ", c: "val" }, { t: "open to new engagements" }),
        multi({ t: "  window    ", c: "val" }, { t: profile.meta.availability }),
        multi({ t: "  format    ", c: "val" }, { t: "long-term consulting (3–6mo min)" }),
        multi({ t: "  timezone  ", c: "val" }, { t: "EU · async-first" }),
        blank(),
      );
      return;
    }

    // ── theme ──────────────────────────────────────────────────────────────
    if (name === "theme") {
      const t = args[0];
      if (t === "dark" || t === "light") {
        onTheme(t);
        push(out(`→ theme set to ${t}`, "val"));
      } else {
        push(out("usage: theme dark|light", "warn"));
      }
      return;
    }

    // ── hire / cv ──────────────────────────────────────────────────────────
    if (name === "./hire" || name === "hire") {
      push(
        out("→ launching contact flow...", "val"),
        multi({ t: "⚠  ", c: "warn" }, { t: "no sales call, no forms with 12 fields." }),
        out("   just a 30-min technical chat. response within 24h."),
        multi({ t: `   → ` }, { t: `mailto:${profile.contact.email}`, c: "link" }),
      );
      setTimeout(() => onHire(), 600);
      return;
    }

    if (name === "./cv" || name === "cv") {
      // TODO: replace with real CV PDF URL once uploaded
      push(out("→ opening CV...", "val"), out("// CV download not yet available", "dim"));
      return;
    }

    // ── exit ───────────────────────────────────────────────────────────────
    if (name === "exit") {
      push(out("→ exiting terminal...", "val"));
      setTimeout(() => onExit(), 300);
      return;
    }

    // ── unknown ────────────────────────────────────────────────────────────
    push(
      multi(
        { t: `${name}: `, c: "warn" },
        { t: "command not found. type " },
        { t: "help", c: "val" },
        { t: " for available commands." },
      ),
    );
  }

  // ─── Tab completion ────────────────────────────────────────────────────────

  function tabComplete() {
    const trimmed = input.trimStart();
    const hasSpace = trimmed.includes(" ");
    const parts = trimmed.split(/\s+/);

    if (!hasSpace) {
      const partial = parts[0] ?? "";
      const matches = COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) setInput(`${matches[0]} `);
      return;
    }

    // Completing an argument
    const partial = input.endsWith(" ") ? "" : parts[parts.length - 1];
    const dir = resolveDir(cwd);
    if (!dir) return;

    const matches = dir.children.map((c) => c.name).filter((n) => n.startsWith(partial));

    if (matches.length === 1) {
      const completed = matches[0];
      const prefix = parts.slice(0, -1).join(" ");
      setInput((prefix ? `${prefix} ` : `${parts[0]} `) + completed);
    }
  }

  // ─── History navigation ────────────────────────────────────────────────────

  function historyUp() {
    const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
    setHistIdx(newIdx);
    if (newIdx >= 0) setInput(cmdHistory[cmdHistory.length - 1 - newIdx] ?? "");
  }

  function historyDown() {
    const newIdx = Math.max(histIdx - 1, -1);
    setHistIdx(newIdx);
    setInput(newIdx < 0 ? "" : (cmdHistory[cmdHistory.length - 1 - newIdx] ?? ""));
  }

  function clearTerminal() {
    setLines([]);
  }

  return {
    lines,
    input,
    setInput,
    cwd,
    execute,
    tabComplete,
    historyUp,
    historyDown,
    clearTerminal,
  };
}

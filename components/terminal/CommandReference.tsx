const LEFT: [string, string][] = [
  ["help", "list all commands"],
  ["ls [--status]", "list current directory"],
  ["cd <dir>", "change directory"],
  ["cat <file>", "print file contents"],
  ["open <file>", "open in standard view"],
  ["tree", "show full site map"],
  ["whoami", "about Lorenzo, short form"],
];

const RIGHT: [string, string][] = [
  ["./hire", "start contact flow"],
  ["./cv", "download CV pdf"],
  ["stack [--core]", "show tech stack"],
  ["availability", "current booking window"],
  ["theme dark|light", "switch site theme"],
  ["clear", "clear screen (ctrl+l)"],
  ["exit", "back to standard view"],
];

function RefRow({ cmd, desc }: { cmd: string; desc: string }) {
  return (
    <div className="flex py-[5px] border-b border-hairline border-outline-faint last:border-none font-mono text-[11px]">
      <span className="text-teal w-[42%] shrink-0">{cmd}</span>
      <span className="text-muted">{desc}</span>
    </div>
  );
}

export default function CommandReference() {
  return (
    <div className="border border-hairline border-outline-faint rounded-lg px-6 py-5 mb-8 bg-canvas">
      <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-hairline border-outline-faint">
        <span className="font-mono text-[11px] uppercase tracking-[0.06em]">Command reference</span>
        <span className="font-mono text-[10px] text-muted">
          {"//"} shortcuts and aliases supported
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-x-8">
        <div>
          {LEFT.map(([c, d]) => (
            <RefRow key={c} cmd={c} desc={d} />
          ))}
        </div>
        <div>
          {RIGHT.map(([c, d]) => (
            <RefRow key={c} cmd={c} desc={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

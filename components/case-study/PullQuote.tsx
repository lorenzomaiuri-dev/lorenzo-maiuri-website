export default function PullQuote({ text }: { text: string }) {
  return (
    <div className="border-l-2 border-teal px-6 py-4 my-6 bg-surface rounded-r-md">
      <div className="font-mono text-[10px] text-teal uppercase tracking-[0.08em] mb-1.5">
        {"//"} design constraint
      </div>
      <p className="text-[16px] leading-[1.5] font-medium tracking-[-0.01em] max-w-[580px]">
        {text}
      </p>
    </div>
  );
}

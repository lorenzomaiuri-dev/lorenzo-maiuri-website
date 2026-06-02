import { cn } from "@/lib/utils";

type Props = {
  num: string; // "01"
  title: string;
  sub?: string;
  action?: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ num, title, sub, action, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-[3px] mt-12 mb-6", className)}>
      <div className="font-mono text-xs text-muted uppercase tracking-[0.05em] flex items-center gap-2.5">
        <span className="text-teal font-bold">{num}</span>
        <span>— {title}</span>
        {action && <span className="pl-3">{action}</span>}
        {/* Extending horizontal line */}
        <span className="flex-1 h-[0.5px] bg-outline-faint" />
      </div>
      {sub && <p className="text-xs text-muted pl-px italic">{sub}</p>}
    </div>
  );
}

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  core?: boolean;
  className?: string;
};

export default function Pill({ children, core, className }: Props) {
  return (
    <span
      className={cn(
        "text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-[4px]",
        core ? "text-teal bg-teal/10" : "text-muted bg-surface",
        className,
      )}
    >
      {children}
    </span>
  );
}

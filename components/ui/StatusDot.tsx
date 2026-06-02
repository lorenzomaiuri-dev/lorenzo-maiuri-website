import { cn } from "@/lib/utils";

type Props = {
  variant?: "teal" | "gray";
  className?: string;
};

export default function StatusDot({ variant = "teal", className }: Props) {
  if (variant === "gray") {
    return (
      <span
        className={cn(
          "inline-block w-1.5 h-1.5 rounded-full bg-outline-sub flex-shrink-0",
          className,
        )}
      />
    );
  }
  return (
    <span
      className={cn(
        "inline-block w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0 animate-dot-pulse",
        className,
      )}
    />
  );
}

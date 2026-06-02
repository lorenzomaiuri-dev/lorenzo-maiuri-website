import { profile } from "@/lib/data/profile";

export default function CredentialsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mb-10">
      {profile.credentials.map((block) => (
        <div
          key={block.heading}
          className="border border-hairline border-outline-faint rounded-lg p-5"
        >
          <div className="font-mono text-[10px] text-muted tracking-[0.08em] uppercase mb-4 pb-2 border-b border-hairline border-outline-faint">
            {block.heading}
          </div>

          {block.items.map((item, i) => (
            <div
              key={i}
              className={[
                "flex flex-row justify-between items-start gap-3 relative",
                "py-3 sm:py-2.5",
                i === 0 ? "pt-0" : "",
                i < block.items.length - 1
                  ? "border-b border-hairline border-outline-faint"
                  : "pb-0",
                item.recent ? "pl-3" : "",
              ].join(" ")}
            >
              {item.recent && (
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-teal rounded-[2px]" />
              )}
              <div className="flex-1 min-w-0 pr-1">
                <div className="text-[13px] font-medium mb-0.5 leading-[1.4]">{item.title}</div>
                <div className="font-mono text-[11px] text-muted">{item.org}</div>
              </div>
              <div
                className={[
                  "font-mono text-[10px] whitespace-nowrap shrink-0 self-start mt-0.5 px-[7px] py-[3px] rounded-[3px]",
                  item.tealYear
                    ? "text-teal border border-hairline border-teal bg-transparent"
                    : "text-muted bg-surface",
                ].join(" ")}
              >
                {item.year}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

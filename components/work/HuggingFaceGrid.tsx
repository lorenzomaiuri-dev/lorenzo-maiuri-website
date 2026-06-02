import Pill from "@/components/ui/Pill";
import { huggingFaceModels } from "@/lib/data/projects";

export default function HuggingFaceGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
      {huggingFaceModels.map((m) => (
        <a
          key={m.name}
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-hairline border-outline-faint rounded-md p-5 bg-canvas hover:border-outline-sub transition-colors flex flex-col gap-2 group"
        >
          <div className="flex justify-between items-start mb-2">
            <Pill className="!px-2 !py-[2px]">{m.tag}</Pill>
            <span className="font-mono text-[11px] text-teal group-hover:underline">HF ↗</span>
          </div>

          <div className="font-mono text-[15px] font-bold leading-snug tracking-[-0.01em]">
            {m.name}
          </div>

          <p className="text-[12px] text-muted leading-[1.5] mb-2">{m.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
            {m.footer.split(" · ").map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
            <span className="font-mono text-[10px] text-muted ml-auto self-center opacity-70">
              {m.year}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

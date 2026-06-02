import StatusDot from "@/components/ui/StatusDot";
import { profile } from "@/lib/data/profile";

export default function AboutHero() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-[1fr_260px] gap-12 items-start mb-0">
      <div>
        <h1 className="text-[44px] font-bold leading-[1.1] tracking-[-0.02em] mb-8">
          Engineer first.
          <br />
          <em className="not-italic text-muted font-normal">Consultant by necessity.</em>
        </h1>

        <p className="text-base leading-[1.7] font-medium mb-5">
          I&apos;m <span className="text-teal font-medium">Lorenzo Maiuri</span> — an AI engineer
          and software consultant based in northern Italy, working with startups and B2B companies
          across Europe.
        </p>

        <p className="text-[14px] leading-[1.75] text-muted mb-5">
          I design and deploy AI systems that actually run in production — not demos, not slide
          decks. I started writing code at 15, graduated with full marks, and spent three years at{" "}
          <span className="text-foreground font-medium">Pharmaidea</span> building platforms used by
          millions.
        </p>

        <div className="text-[15px] leading-[1.5] font-medium border-l-2 border-teal pl-4 py-2 my-4 mb-6">
          In 2025 I went independent to focus entirely on AI consulting, while completing my MSc in
          Artificial Intelligence.
        </div>

        <p className="text-[14px] leading-[1.75] text-muted">
          When I&apos;m not shipping: I do <span className="text-foreground">theatre</span>, read{" "}
          <span className="text-foreground">classical and postmodern literature</span>, and train at
          the gym. The variety helps — good systems thinking rarely comes from staring at the same
          screen all day.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 font-mono text-[11px] text-muted mt-8 py-6 px-4 border-y border-hairline border-outline-faint">
          <div className="flex flex-col gap-1">
            <span className="opacity-55 uppercase tracking-wider text-[9px]">location</span>
            <span className="text-foreground">{profile.meta.location}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="opacity-55 uppercase tracking-wider text-[9px]">remote</span>
            <span className="text-foreground">{profile.meta.remote}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="opacity-55 uppercase tracking-wider text-[9px]">languages</span>
            <span className="text-foreground">{profile.meta.languages}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="opacity-55 uppercase tracking-wider text-[9px]">available</span>
            <span className="text-teal font-medium">{profile.meta.availability}</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="w-[260px] h-[320px] rounded-sm border border-hairline border-outline-sub bg-surface overflow-hidden relative flex items-center justify-center">
          <span className="font-mono text-[60px] font-bold text-muted select-none">LM</span>
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 flex justify-between items-center bg-black/45 backdrop-blur-md">
            <span className="font-mono text-[10px] text-white/65">
              {"//"} Brescia, IT · b. 2002
            </span>
            <span className="flex items-center gap-[5px] font-mono text-[10px] text-teal">
              <StatusDot variant="teal" />
              open to work
            </span>
          </div>
        </div>
        <p className="font-mono text-[10px] text-muted mt-2 text-center tracking-[0.04em]">
          Lorenzo Maiuri
        </p>
      </div>
    </section>
  );
}

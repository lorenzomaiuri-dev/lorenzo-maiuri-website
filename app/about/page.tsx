import type { Metadata } from "next";
import AboutFooterCTA from "@/components/about/AboutFooterCTA";
import AboutHero from "@/components/about/AboutHero";
import CredentialsGrid from "@/components/about/CredentialsGrid";
import Manifesto from "@/components/about/Manifesto";
import Principles from "@/components/about/Principles";
import ScoresRow from "@/components/about/ScoresRow";
import Timeline from "@/components/about/Timeline";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About — Lorenzo Maiuri",
  description:
    "AI engineer and software consultant based in Italy. Engineer first, consultant by necessity.",
};

export default function AboutPage() {
  return (
    <>
      <div className="font-mono text-[11px] text-teal uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
        <span className="w-[18px] h-px bg-teal shrink-0" />/ about
      </div>

      <AboutHero />
      <Manifesto />

      <SectionLabel num="01" title="Journey" sub="from classroom to production" />
      <Timeline />

      <SectionLabel num="02" title="How I work" sub="principles, not buzzwords" />
      <Principles />

      <SectionLabel num="03" title="Education & credentials" sub="formal and verifiable" />
      <ScoresRow />
      <CredentialsGrid />

      <AboutFooterCTA />
    </>
  );
}

import type { Metadata } from "next";
import FooterCTA from "@/components/home/FooterCTA";
import Hero from "@/components/home/Hero";
import LorenzoBotPreview from "@/components/home/LorenzoBotPreview";
import StackSection from "@/components/home/StackSection";
import TerminalPreview from "@/components/home/TerminalPreview";
import WorkSection from "@/components/home/WorkSection";

export const metadata: Metadata = {
  title: "Lorenzo Maiuri — I build AI systems that ship.",
  description:
    "AI engineer and software consultant based in Italy. Production-grade AI systems for startups and B2B companies across Europe.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <LorenzoBotPreview />
      <TerminalPreview />
      <StackSection />
      <FooterCTA />
    </>
  );
}

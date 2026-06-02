import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import FeaturedCaseStudy from "@/components/work/FeaturedCaseStudy";
import HuggingFaceGrid from "@/components/work/HuggingFaceGrid";
import ProjectsSection from "@/components/work/ProjectsSection";
import WorkFooterCTA from "@/components/work/WorkFooterCTA";
import WorkHeader from "@/components/work/WorkHeader";
import { projects as allProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work — Lorenzo Maiuri",
  description:
    "Production AI systems, open-source models, and applied research. Four years of shipped work.",
};

export default function WorkPage() {
  // Featured project rendered as hero — excluded from the list
  const listProjects = allProjects.filter((p) => !p.featured);

  return (
    <>
      <div className="font-mono text-[11px] text-teal uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
        <span className="w-[18px] h-px bg-teal shrink-0" />/ work
      </div>

      <WorkHeader />
      <FeaturedCaseStudy />

      <SectionLabel num="01" title="Selected projects" sub="client engagements and applied work" />
      <ProjectsSection projects={listProjects} />

      <SectionLabel num="02" title="Open models & research" sub="published on HuggingFace Hub" />
      <HuggingFaceGrid />

      <WorkFooterCTA />
    </>
  );
}

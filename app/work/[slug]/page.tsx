import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchDiagram from "@/components/case-study/ArchDiagram";
import CaseBody from "@/components/case-study/CaseBody";
import CaseBreadcrumb from "@/components/case-study/CaseBreadcrumb";
import CaseHero from "@/components/case-study/CaseHero";
import CaseStackSection from "@/components/case-study/CaseStackSection";
import CaseStudyFooterCTA from "@/components/case-study/CaseStudyFooterCTA";
import DecisionsList from "@/components/case-study/DecisionsList";
import ProjectNav from "@/components/case-study/ProjectNav";
import PullQuote from "@/components/case-study/PullQuote";
import ResultsGrid from "@/components/case-study/ResultsGrid";
import SectionLabel from "@/components/ui/SectionLabel";
import { getProjectBySlug, projects } from "@/lib/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((p) => p.hasCaseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Lorenzo Maiuri`,
    description: p.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);

  if (!p?.hasCaseStudy || !p.caseStudy) notFound();

  const cs = p.caseStudy;

  // Adjacent case studies for prev/next nav
  const caseStudies = projects.filter((x) => x.hasCaseStudy);
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null;

  return (
    <>
      <CaseBreadcrumb slug={slug} />
      <CaseHero project={p} />

      <SectionLabel num="01" title="The challenge" sub="why this problem was worth solving" />
      <CaseBody text={cs.challenge} />
      {cs.pullQuote && <PullQuote text={cs.pullQuote} />}

      <SectionLabel
        num="02"
        title="Approach & architecture"
        sub="technical design and system components"
      />
      <CaseBody text={cs.approach} />
      {cs.architecture && <ArchDiagram data={cs.architecture} />}

      <SectionLabel num="03" title="Implementation decisions" sub="the trade-offs that mattered" />
      <DecisionsList decisions={cs.decisions} />
      <CaseStackSection stack={cs.stack} />

      <SectionLabel num="04" title="Results" sub="measured in production" />
      <ResultsGrid results={cs.results} />

      <SectionLabel num="05" title="What I'd do differently" sub="honest retrospective" />
      <CaseBody text={cs.retrospective} />

      <ProjectNav prev={prev} next={next} />
      <CaseStudyFooterCTA />
    </>
  );
}

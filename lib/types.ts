import { Brain, Code, Database } from 'lucide-react'
import { type LucideIcon } from 'lucide-react';

// lib/types.ts
export interface Project {
  slug: string;
  frontmatter: string;
  title: string;
  description: string;
  highlighted: boolean;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  sections?: {
    title?: string;
    content?: string;
    listItems?: string[];
    // Aggiungi altri tipi di contenuto se necessario
  }[];
}

export interface ProjectCardProps {
  project: Pick<Project, 'slug' | 'frontmatter'>;
}

export interface GenericParams {
  slug: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  imageDetail: string;
  link: string;
  icon: string;
  features: string[];
  caseStudy: {
    title: string;
    description: string;
    link: string;
  };
};


export const iconMap: Record<string, LucideIcon> = {
  "Brain": Brain,
  "Code": Code,
  "Database": Database,
};
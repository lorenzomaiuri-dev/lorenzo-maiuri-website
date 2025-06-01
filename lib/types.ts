import { Brain, Code, Database } from 'lucide-react'
import { type LucideIcon } from 'lucide-react';

// lib/types.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  highlighted?: boolean;
  image?: string;
  liveUrl?: string | null | undefined;
  githubUrl?: string | null | undefined;
  technologies?: string[];
  sections?: {
    title?: string;
    content?: string;
    listItems?: string[];
  }[];
}

export interface ProjectCardProps {
  project: Pick<Project, 'slug'>;
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

export interface ChatRequest {
  chatId?: string | null;
  message: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: ChatResponseAction;
  isExpanded?: boolean; 
}

export type ChatResponseAction =
  | { action_type: 'show_contact'; data: { email?: string; linkedin?: string; github?: string; portfolio?: string; } }
  | { action_type: 'show_projects'; data: { projects: Array<{ title: string; description: string; link?: string; technologies: string[]; }> } }
  | { action_type: 'show_bio'; data: { bio: string } }
  | { action_type: 'show_skills'; data: { skills: Record<string, string[]> } }
  | { action_type: 'show_experience'; data: { experience: Array<{ title: string; company: string; period: string; description: string; }> } }
  | { action_type: 'show_certifications'; data: { certifications: Array<{ name: string; year: number; }> } }
  | { action_type: 'send_email'; data: { subject?: string; body?: string } }
  | { action_type: 'display_message'; data: { message: string } }
  | { action_type: 'none'; data: {} };

export interface ChatResponse {
  success?: boolean;
  chatId: string;
  message: string;
  thought?: string;
  action: ChatResponseAction;
  error?: string;
  fallback?: boolean;
}

export interface ToastState {
  show: boolean;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  link?: { href: string; text: string; target?: '_self' | '_blank' };
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
  duration?: number;
  link?: {
    href: string;
    text: string;
    target?: '_self' | '_blank';
  };
  show: boolean;
}

export interface LorenzoBotProps {
  onNotification?: () => void;
}

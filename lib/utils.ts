import fs from 'fs/promises';
import path from 'path';
import { type Project } from './types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// used by cursors
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const featuredProjectsDirectory = path.join(process.cwd(), 'content', 'featured_projects');
const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

export async function getAllProjects(): Promise<Project[]> {
  return getAllProjectsByDir(projectsDirectory);
}

export async function getAllFeaturedProjects(): Promise<Project[]> {
  return getAllProjectsByDir(featuredProjectsDirectory);
}

export async function getAllProjectsByDir(directory: string): Promise<Project[]> {
  const fileNames = await fs.readdir(directory);
  const projects = await Promise.all(
    fileNames.map(async (fileName) => {
      if (fileName.endsWith('.json')) {
        const slug = fileName.replace(/\.json$/, '');
        const fullPath = path.join(directory, fileName);
        const fileContent = await fs.readFile(fullPath, 'utf8');
        const data = JSON.parse(fileContent) as Project;
        return { ...data, slug };
      }
      return null;
    })
  );

  return projects.filter(Boolean) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const fullPath = path.join(projectsDirectory, `${slug}.json`);
  try {
    const fileContent = await fs.readFile(fullPath, 'utf8');
    const projectData = JSON.parse(fileContent) as Project;
    return projectData;
  } catch (error) {
    console.error(`Errore nella lettura del progetto con slug ${slug}:`, error);
    return undefined;
  }
}

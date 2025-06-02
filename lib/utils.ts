import { type Project } from './types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// used by cursors
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Importing project data from JSON files
import project1 from '../content/projects/airflow-migration.json';
import project2 from '../content/projects/data-warehouse-modernization.json';
import project3 from '../content/projects/b2b-app-xamarin-to-maui-migration.json';
import project4 from '../content/projects/b2b-portal-redesign.json';
import project5 from '../content/projects/b2b-web-app-automated-tests.json';
import project6 from '../content/projects/bloom-filter-python-package.json';
import project7 from '../content/projects/codice-fiscale-dotnet-library.json';
import project8 from '../content/projects/dante-gpt.json';
import project9 from '../content/projects/data-warehouse-modernization.json';
import project10 from '../content/projects/documents-customer-chatbot.json';
import project11 from '../content/projects/drug-traceability-standardization.json';
import project12 from '../content/projects/erp-release-upgrade.json';
import project13 from '../content/projects/erp-soap-integration-automation.json';
import project14 from '../content/projects/gdpr-bert.json';
import project15 from '../content/projects/gdxvania-arcade-homage-game.json';
import project16 from '../content/projects/generic-data-reporter.json';
import project17 from '../content/projects/gentleman-closet-app.json';
import project18 from '../content/projects/histopathologic-cancer-detection-cnn.json';
import project19 from '../content/projects/internal-b2b-system-migration.json';
import project20 from '../content/projects/it-asset-management-system.json';
import project21 from '../content/projects/italian-misogyny-detection-bert.json';
import project22 from '../content/projects/logistics-cost-control-dashboard.json';
import project23 from '../content/projects/ml-prioritization-b2b.json';
import project24 from '../content/projects/mobile-app-distribution-management.json';
import project25 from '../content/projects/pharmaceutical-data-integration.json';
import project26 from '../content/projects/reactive-architecture-guide.json';
import project27 from '../content/projects/sales-booster-system-integration.json';
import project28 from '../content/projects/svn-to-git-migration.json';
import project29 from '../content/projects/veterinary-platform-integrations.json';


// Define your project arrays directly
const allFeaturedProjectsData: Project[] = [
  { ...project4},
  { ...project2},
  { ...project10},
];

const allProjectsData: Project[] = [
  { ...project1},
  { ...project2},
  { ...project3},
  { ...project4},
  { ...project5},
  { ...project6},
  { ...project7},
  { ...project8},
  { ...project9},
  { ...project10},
  { ...project11},
  { ...project12},
  { ...project13},
  { ...project14},
  { ...project15},
  { ...project16},
  { ...project17},
  { ...project18},
  { ...project19},
  { ...project20},
  { ...project21},
  { ...project22},
  { ...project23},
  { ...project24},
  { ...project25},
  { ...project26},
  { ...project27},
  { ...project28},
  { ...project29},
];

export function getAllProjects(): Project[] {
  return allProjectsData;
}

export function getAllFeaturedProjects(): Project[] {
  return allFeaturedProjectsData;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const allCombinedProjects = getAllProjects()
  return allCombinedProjects.find((project) => project.slug === slug);
}
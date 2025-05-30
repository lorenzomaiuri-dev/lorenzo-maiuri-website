import { Metadata } from 'next';
import AnimatedProjectPageContent from '@/components/projects/AnimatedProjectPageContent';
import { getAllProjects } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'My Featured Projects | Lorenzo Maiuri',
  description: 'Explore my main portfolio of software engineering, AI, and data solutions.',
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();
  const highlightedProjects = allProjects.filter(project => project.highlighted === true);

  return (
    <div className="bg-black text-white py-12 min-h-screen pt-30">
      <AnimatedProjectPageContent
        projects={highlightedProjects}
        title="Highlighted Projects"
        buttonText="View All My Projects →"
        buttonHref="/projects/all"
        noProjectsMessage="No highlighted projects found."
      />
    </div>
  );
}
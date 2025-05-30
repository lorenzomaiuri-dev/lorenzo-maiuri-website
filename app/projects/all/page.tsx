import { Metadata } from 'next';
import AnimatedProjectPageContent from '@/components/projects/AnimatedProjectPageContent';
import { getAllProjects } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'All Projects | Lorenzo Maiuri',
  description: 'A comprehensive list of all my software engineering, AI, and data projects.',
};

export default async function AllProjectsPage() {
  const allProjects = await getAllProjects();
  const furtherProjects = allProjects.filter(project => project.highlighted === false);

  return (
    <div className="bg-black text-white py-12 min-h-screen pt-30">
      <AnimatedProjectPageContent
        projects={furtherProjects}
        title="All My Other Projects"
        buttonText="← Back to Highlighted Projects"
        buttonHref="/projects"
        noProjectsMessage="No additional projects found."
      />
    </div>
  );
}
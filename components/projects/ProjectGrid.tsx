import { type Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Pick<Project, 'slug' | 'title' | 'description' | 'image' | 'technologies'>[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
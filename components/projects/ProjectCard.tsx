import Link from 'next/link';
import Image from 'next/image';
import { type Project } from '@/lib/types';

interface ProjectCardProps {
  project: Pick<Project, 'slug' | 'title' | 'description' | 'image' | 'technologies'>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, image, technologies } = project;

  return (
    <div className="bg-zinc-900 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl text-white">
      {image && (
        <div className="relative w-full h-64">
          <Image
            src={`${image}`}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-zinc-800 text-blue-400 rounded-full px-3 py-1 text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-400 font-medium transition-colors"
        >
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
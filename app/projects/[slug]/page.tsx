import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug } from '@/lib/utils';


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project not found | Lorenzo Maiuri',
      description: 'This project does not exist.',
    };
  }

  let seoDescription = project.description;
  if (project.technologies && project.technologies.length > 0) {
    seoDescription += ` Technologies used: ${project.technologies.join(', ')}.`;
  }


  return {
    title: `${project.title} | Lorenzo Maiuri`,
    description: seoDescription,
    openGraph: {
      title: `${project.title} | Lorenzo Maiuri`,
      description: seoDescription,
      url: `https://lorenzomaiuri.dev/projects/${slug}`,
      siteName: 'Lorenzo Maiuri',
      images: project.image
        ? [
            {
              url: `https://lorenzomaiuri.dev${project.image}`,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [],
      type: 'article',
      locale: 'en_US',
    },
    alternates: {
      canonical: `https://lorenzomaiuri.dev/projects/${params.slug}`,
    },
    keywords: project.technologies ? project.technologies.join(', ') : '',
  };
}


interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = async ({ params }) => {

  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return <div className="bg-black text-white py-10 pt-30">Project not found.</div>;
  }

  const { title, description, image, liveUrl, githubUrl, technologies, sections } = project;

  const baseUrl = 'https://lorenzomaiuri.dev';
  let seoDescription = project.description;
  if (project.technologies && project.technologies.length > 0) {
    seoDescription += ` Technologies used: ${project.technologies.join(', ')}.`;
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: seoDescription,
    url: `${baseUrl}/projects/${slug}`,
    image: project.image ? `${baseUrl}${project.image}` : undefined,
    author: {
      '@type': 'Person',
      name: 'Lorenzo Maiuri',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lorenzo Maiuri',
    },
  };


  return (
    <>
      <div className="bg-black text-white py-10 pt-30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
            {description && <p className="text-gray-300 text-lg mb-6">{description}</p>}

            {image && (
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md mb-6">
                <Image
                  src={`${image}`}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              {liveUrl && (
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
                >
                  Try it
                </Link>
              )}
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
                >
                  Repository
                </Link>
              )}
            </div>

            {technologies && technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Tech Stack:</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-zinc-800 text-blue-400 rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {sections && sections.map((section, index) => (
            <div key={index} className="mb-8">
              {section.title && <h2 className="text-2xl font-semibold mb-3 text-white">{section.title}</h2>}
              {section.content && <p className="text-gray-300 mb-4">{section.content.split('\n').map((paragraph, i) => <React.Fragment key={i}>{paragraph}<br/></React.Fragment>)}</p>}
              {section.listItems && (
                <ul className="list-disc list-inside text-gray-300">
                  {section.listItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-8">
            <Link
              href="/projects"
              className="text-blue-500 hover:text-blue-400 inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default ProjectDetailPage;
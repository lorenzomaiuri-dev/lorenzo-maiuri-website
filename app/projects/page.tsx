import { Metadata } from 'next';
import AnimatedProjectPageContent from '@/components/projects/AnimatedProjectPageContent';
import { getAllProjects } from '@/lib/utils';


export const metadata: Metadata = {
  title: 'My Featured Projects | Lorenzo Maiuri',
  description: 'Explore my main portfolio of software engineering, AI, and data solutions.',
  openGraph: {
    title: 'My Featured Projects | Lorenzo Maiuri',
    description: 'Explore my main portfolio of software engineering, AI, and data solutions.',
    url: 'https://lorenzomaiuri.dev/projects',
    siteName: 'Lorenzo Maiuri',
    images: [
      {
        url: 'https://lorenzomaiuri.dev/images/seo/projects.png',
        width: 1200,
        height: 630,
        alt: 'My Featured Projects | Lorenzo Maiuri',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();
  const highlightedProjects = allProjects.filter(project => project.highlighted === true);

  const baseUrl = 'https://lorenzomaiuri.dev';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'My Featured Projects | Lorenzo Maiuri',
    description: 'Explore my main portfolio of software engineering, AI, and data solutions.',
    url: `${baseUrl}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: highlightedProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1, 
        item: {
          '@type': 'CreativeWork',
          url: `${baseUrl}/projects/${project.slug}`,
          name: project.title,
          description: project.description,
          image: project.image ? `${baseUrl}${project.image}` : undefined,
          author: { '@type': 'Person', name: 'Lorenzo Maiuri' },
        },
      })),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lorenzo Maiuri',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/seo/logo.png`,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/seo/projects.png`,
      width: 1200,
      height: 630,
      alt: 'My Featured Projects | Lorenzo Maiuri',
    },
    datePublished: '2025-06-01',
    dateModified: new Date().toISOString().split('T')[0],
  };

  return (
    <div className="bg-black text-white py-12 min-h-screen pt-30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image';
import { type Project } from '@lib/types';

export default function ProjectsSection({ featuredProjects }: { featuredProjects: Project[] }) {
  return (
    <section className="bg-black text-white relative pt-[105px] scroll-pt-60 py-20" id="projects">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">The Art of Bringing Ideas to Life</h2>
        <p className="mb-12 text-gray-300">Discover the stories behind my successful projects</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="relative w-full h-48 md:h-56 rounded-t-2xl overflow-hidden mb-4">
                <Image
                  src={project.image ?? '/images/default.jpg'}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <Link href={'/projects/' + project.slug} className="text-primary-light hover:text-primary-dark font-medium inline-flex items-center">
                  View details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects" className="inline-block text-white font-medium py-2 px-4 rounded-full hover:underline">
            Explore other projects
          </Link>
        </div>
      </div>
    </section>
  )
}
'use client';

import { motion } from 'framer-motion';
import ProjectGrid from '@/components/projects/ProjectGrid';
import Link from 'next/link';
import { Project } from '@/lib/types';

interface AnimatedProjectPageContentProps {
  projects: Project[];
  title: string;
  buttonText: string;
  buttonHref: string;
  noProjectsMessage: string;
}

export default function AnimatedProjectPageContent({
  projects,
  title,
  buttonText,
  buttonHref,
  noProjectsMessage,
}: AnimatedProjectPageContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: projects.length > 0 ? 0.5 + (projects.length * 0.1) : 0.5,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 max-w-7xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-white text-center"
        variants={itemVariants}
      >
        {title}
      </motion.h1>

      {projects.length > 0 ? (
        <motion.div variants={containerVariants}>
          <ProjectGrid projects={projects} />
        </motion.div>
      ) : (
        <motion.p
          className="text-gray-300 text-center text-lg"
          variants={itemVariants}
        >
          {noProjectsMessage}
        </motion.p>
      )}

      <motion.div
        className="text-center mt-16 md:mt-24"
        variants={buttonVariants}
      >
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {buttonText}
        </Link>
      </motion.div>
    </motion.div>
  );
}
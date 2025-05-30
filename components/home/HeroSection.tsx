'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const fullText = 'TRANSFORMING COMPLEX DATA INTO TECH SOLUTIONS THAT GENERATE TANGIBLE RESULTS';
  const words = fullText.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const wordFadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">      
      <div className="absolute inset-0 bg-gray-800 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div className="container-custom relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordFadeIn}
                style={{ display: 'inline-block', marginRight: index < words.length - 1 ? '10px' : '0' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 + (words.length * 0.15) }}
          >
            I combine advanced skills in artificial intelligence, software development, and data engineering to create technology solutions that optimize processes, reduce costs, and enhance your business.
          </motion.p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + (words.length * 0.15) }}
              className="relative hidden md:inline-block bg-black text-black font-medium px-4 py-2 rounded-lg overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-gray-100 before:to-transparent before:animate-shimmer hover:bg-zinc-900 transition-all"
            >
              <Link href="#services" className="glow-button block">
                DISCOVER MY SERVICES
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
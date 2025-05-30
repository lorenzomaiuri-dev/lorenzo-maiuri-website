'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  initial?: { opacity: number; y?: number; x?: number; scale?: number };
  animate?: { opacity: number; y?: number; x?: number; scale?: number };
  transition?: { duration?: number; delay?: number; ease?: any };
  threshold?: number; // Quanto della sezione deve essere visibile per attivare l'animazione
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5, ease: 'easeInOut' },
  threshold = 0.2,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true  });

  const variants = {
    hidden: initial,
    visible: animate,
  };

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={transition}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
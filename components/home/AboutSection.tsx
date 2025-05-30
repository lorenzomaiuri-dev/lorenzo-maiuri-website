'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Lightbulb, Settings } from 'lucide-react';
import Link from 'next/link';

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.2 },
};

const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay: 0.4 },
};

export default function ExpertiseSection() {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial="initial"
                    whileInView="animate"
                    variants={textVariants}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-6"
                >
                    My Expertise
                </motion.h2>
                <motion.p
                    initial="initial"
                    whileInView="animate"
                    variants={textVariants}
                    viewport={{ once: true }}
                    className="text-lg text-gray-400 text-center mb-12"
                >
                    A skill set to address complex challenges.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        variants={cardVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="bg-zinc-900 rounded-lg shadow-md p-10 flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center mb-6 shadow-inner">
                            <BrainCircuit size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Machine Learning & AI</h3>
                        <motion.p variants={textVariants} className="text-gray-300 leading-relaxed">
                            Leveraging advanced algorithms and AI techniques to develop smart solutions and drive innovation.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-zinc-900 rounded-lg shadow-md p-10 flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center mb-6 shadow-inner">
                            <Lightbulb size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Innovative Solutions</h3>
                        <motion.p variants={textVariants} className="text-gray-300 leading-relaxed">
                            Combining technical expertise with a deep understanding of business needs to create tailored, high-impact solutions.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-zinc-900 rounded-lg shadow-md p-10 flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center mb-6 shadow-inner">
                            <Settings size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Automation & Efficiency</h3>
                        <motion.p variants={textVariants} className="text-gray-300 leading-relaxed">
                            Process optimization and improved operational efficiency through strategic automation and intelligent systems.
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
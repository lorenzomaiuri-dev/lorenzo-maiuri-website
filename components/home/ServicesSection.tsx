'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import IconComponent from '@/components/common/IconComponent';
import { type Service } from '@/lib/types';
import servicesData from '@/content//services/services.json';
import { useState, useCallback } from 'react';

// Animation variants (mantienili come sono)
const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
};

const detailsVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
};

const serviceItemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    layout: (isSelected: boolean) => ({
        opacity: 1,
        y: 0,
        borderWidth: isSelected ? 2 : 0,
        borderColor: isSelected ? 'var(--primary)' : 'transparent',
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 0.2,
        },
    }),
};

const descriptionVariants = {
    initial: { opacity: 0, y: 5, height: 0 },
    animate: { opacity: 1, y: 0, height: 'auto' },
    exit: { opacity: 0, y: -5, height: 0 },
    transition: { duration: 0.15 },
};

export default function ServicesSection() {
    const services = servicesData as Service[];
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleServiceClick = useCallback((service: Service) => {
        setSelectedService(service);
    }, []);

    return (
        <section className="section bg-black relative pt-[90px] scroll-pt-60 text-white" id="services">
            <div className="container-custom">
                <div className="mb-8">
                    <Link
                        href="/services"
                        className="inline-block bg-zinc-900 text-white text-sm py-2 px-4 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        My Services
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <motion.div layout className="rounded-lg shadow-md overflow-hidden bg-zinc-900">
                            {services.map((service, index) => (
                                <motion.button
                                    key={service.title}
                                    layout
                                    variants={serviceItemVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    custom={selectedService?.title === service.title}
                                    className={`flex flex-col w-full p-6 cursor-pointer hover:bg-gray-700 ${ // Sfondo hover scuro
                                        selectedService?.title === service.title ? 'relative z-10 bg-gray-700' : 'bg-zinc-900' // Sfondo selezionato più scuro
                                    }`}
                                    onClick={() => handleServiceClick(service)}
                                >
                                    <div className="mb-4 text-blue-500">
                                        <IconComponent iconName={service.icon} size={36} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                    <AnimatePresence>
                                        {selectedService?.title === service.title && (
                                            <motion.p
                                                variants={descriptionVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="text-gray-300" // Testo descrizione più chiaro
                                            >
                                                {service.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                    {index < services.length - 1 && (
                                        <div className="border-b border-gray-700 mt-4" />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>

                        <div className="mt-8 text-center">
                            <Link href="/services" className="inline-block text-white font-medium py-2 px-4 rounded-full hover:underline">
                                Learn more about my services
                            </Link>
                        </div>
                    </div>

                    <AnimatePresence>
                        {selectedService && selectedService.image && (
                            <motion.div
                                layout
                                className="rounded-lg overflow-hidden shadow-md"
                                variants={imageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                key={selectedService.title}
                            >
                                <Image
                                    src={selectedService.image}
                                    alt={selectedService.title}
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                                <motion.div
                                    className="p-4 bg-gray-800"
                                    variants={detailsVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.15 }}
                                >
                                    <h4 className="text-lg font-semibold mb-2">{selectedService.title}</h4>
                                    <p className="text-gray-300">{selectedService.description}</p>
                                    {selectedService.link && (
                                        <Link
                                            href={selectedService.link}
                                            className="text-primary hover:text-primary-dark font-medium inline-flex items-center mt-2"
                                        >
                                            Learn more
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
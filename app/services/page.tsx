'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { type Service } from '@/lib/types';
import servicesData from '@/content/services/services.json';

export default function ServicesPage() {
  const services = servicesData as Service[];

  return (
    <div className="bg-black text-white">
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">My Services</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
          Specialized services designed to help your business leverage technology for growth,
            efficiency and innovation. From AI implementation to custom software development and
            to data engineering, I provide comprehensive solutions tailored to your unique needs.
          </p>
        </div>
      </section>
      
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${index % 2 === 1 ? 'bg-black' : 'bg-zinc-900'}`}
        >
          <div className="container mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full bg-zinc-700 relative rounded-lg overflow-hidden shadow-md">
                <Image
                  src={service.imageDetail}
                  alt={service.title}
                  width={1024}
                  height={1024}
                  className="flex items-center justify-center text-gray-500 object-contain"
                  priority
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features && service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle size={20} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                 {service.caseStudy && (<Link href={service.caseStudy.link}>
                  <div className="bg-zinc-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl text-white font-semibold mb-2">{`Case Study: ${service.caseStudy.title}`}</h3>
                    <p className="text-gray-400">{service.caseStudy.description}</p>
                  </div>
                  </Link>)}
              </div>
            </div>
          </div>
        </section>
      ))}


      <section className="py-24 bg-black text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
          Let's discuss how my services can help you achieve your goals and overcome your technology challenges.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + (0.15) }}
              className="relative hidden md:inline-block bg-black text-black font-medium px-4 py-2 rounded-lg overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-gray-100 before:to-transparent before:animate-shimmer hover:bg-zinc-900 transition-all"
            >
              <Link href="/#contact" className="glow-button block">
                CONTACT ME
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
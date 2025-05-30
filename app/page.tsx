import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import WhyMeSection from '@/components/home/WhyMeSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import ContactForm from '@/components/common/ContactForm'
import CustomCursor from '@/components/common/CustomCursor'
import { getAllFeaturedProjects } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Lorenzo Maiuri - AI, Software & Automation per il tuo Business',
  description: 'Consulente AI e software engineer specializzato in intelligenza artificiale, machine learning e automazione per applicazioni business.',
}

export default async function Home() {
  const featuredProjects =  await getAllFeaturedProjects();

  return (
    <> 
    <CustomCursor />   
    <main>      
      <HeroSection />
      <WhyMeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection featuredProjects={featuredProjects}  />

      {/* Contact Section */}
      <section className="py-24 bg-black text-white" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-white">Contact Me</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-zinc-800 p-8 rounded-lg shadow-md">
            <ContactForm />
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Would you rather ask LorenzoBot?</h3>
              <p className="mb-6 text-gray-400">Get quick answers to your questions through my AI assistant.</p>
              <div className="text-center">
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center py-3 px-6 rounded-md shadow-sm text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>    
    </main>    
    </>
  )
}
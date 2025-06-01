import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import WhyMeSection from '@/components/home/WhyMeSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import ContactSection from '@/components/home/ContactSection'
import CustomCursorWrapper from '@/components/common/CustomCursorWrapper'

export const metadata: Metadata = {
  title: 'Lorenzo Maiuri - AI, Software & Automation per il tuo Business',
  description: 'Consulente AI e software engineer specializzato in intelligenza artificiale, machine learning e automazione per applicazioni business.',
}

export default async function Home() {  

  return (
    <> 
    <CustomCursorWrapper />   
    <main>      
      <HeroSection />
      <WhyMeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection  />
      <ContactSection  />
       
    </main>    
    </>
  )
}
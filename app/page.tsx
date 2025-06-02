import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import WhyMeSection from '@/components/home/WhyMeSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import ContactSection from '@/components/home/ContactSection'
import CustomCursorWrapper from '@/components/common/CustomCursorWrapper'

// SEO Metadata
export const metadata: Metadata = {
  title:
    "Lorenzo Maiuri - AI Engineer & Software Developer | Business Solutions",
  description:
    "AI engineer and software consultant specializing in machine learning, automation, and custom software development. Serving businesses across Italy and Europe with data-driven solutions.",
  keywords: [
    "AI Engineer",
    "Machine Learning Consultant",
    "Software Developer",
    "Automation Solutions",
    "Fullstack Developer",
    "Data Engineering",
    "Business Intelligence",
    "Custom Software Development",
    "MLOps",
    "DevOps Consultant",

    "AI Consultant Italy",
    "Software Developer Milan",
    "Machine Learning Italia",
    "Consulente AI",
    "Sviluppatore Software",
    "Automazione Processi",
    "Intelligenza Artificiale",
    "Data Science Consultant",

    "Brescia",
    "Milan",
    "Lombardy",
    "Northern Italy",
    "Remote Developer",

    "Ai Agents",
    "LLM Fine-tuning",
    "PostgreSQL",
    "ETL Pipeline",
    "B2B Platforms",
  ],
  openGraph: {
    title: "Lorenzo Maiuri - AI Engineer & Software Consultant",
    description:
      "Transforming complex data into intelligent solutions. AI engineer and software consultant specializing in machine learning, automation, and custom development for businesses in Italy and Europe.",
    url: "https://lorenzomaiuri.dev",
    siteName: "Lorenzo Maiuri - AI & Software Solutions",
    images: [
      {
        url: 'https://lorenzomaiuri.dev/images/seo/main.png',
        width: 1200,
        height: 630,
        alt: 'Lorenzo Maiuri - AI Engineer & Software Consultant',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorenzo Maiuri - AI Engineer & Software Consultant",
    description:
      "AI engineer specializing in machine learning, automation, and custom software development for business-critical applications.",
    images: ['https://lorenzomaiuri.dev/images/seo/main.png'],
  },
  alternates: {
    canonical: "https://lorenzomaiuri.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
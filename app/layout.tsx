import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import dynamic from 'next/dynamic'
const Header = dynamic(() => import('@/components/layout/Header'))
import Footer from '@/components/layout/Footer'

// Font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

// SEO Metadata
export const metadata: Metadata = {
  title: 'Lorenzo Maiuri – AI, Software & Automation',
  description: 'AI engineer and software consultant specialized in machine learning, automation, and fullstack development for business-critical applications.',
  keywords: [
    'AI Engineer',
    'Software Developer',
    'Machine Learning',
    'Automation',
    'Fullstack Developer',
    'Freelance Consultant',
    'Data Engineering',
    'Business Applications',
    'Custom Software',
  ],
  openGraph: {
    title: 'Lorenzo Maiuri – AI, Software & Automation',
    description: 'AI engineer and software consultant specialized in machine learning, automation, and fullstack development for business-critical applications.',
    url: 'https://lorenzomaiuri.com',
    siteName: 'Lorenzo Maiuri',
    locale: 'en_US',
    type: 'website',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="flex flex-col min-h-screen">      
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />      
      </body>
    </html>
  )
}
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Carica i font
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

// Metadata per SEO
export const metadata: Metadata = {
  title: 'Lorenzo Maiuri - AI, Software & Automation',
  description: 'Software engineer e consulente AI con competenze multidisciplinari in intelligenza artificiale, machine learning e automazione per applicazioni business.',
  keywords: 'AI, software, automation, machine learning, business, consulente, developer',
  openGraph: {
    title: 'Lorenzo Maiuri - AI, Software & Automation',
    description: 'Software engineer e consulente AI con competenze multidisciplinari in intelligenza artificiale, machine learning e automazione per applicazioni business.',
    url: 'https://lorenzomaiuri.com',
    siteName: 'Lorenzo Maiuri',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${robotoMono.variable}`}>
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
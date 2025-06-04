import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/layout/Header"));
import Footer from "@/components/layout/Footer";

// Font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lorenzo Maiuri",
  jobTitle: "AI Engineer & Software Consultant",
  description:
    "AI engineer and software consultant specializing in machine learning, automation, and custom software development",
  url: "https://lorenzomaiuri.dev",
  sameAs: [
    "https://www.linkedin.com/in/maiurilorenzo/",
    "https://github.com/lorenzomaiuri-dev",
    "https://huggingface.co/maiurilorenzo",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Trenzano",
    addressRegion: "Lombardy",
    addressCountry: "IT",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Generative AI",
    "Ai Agents",
    "Machine Learning",
    "Software Development",
    "Data Engineering",
    "Automation",
  ],
};

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="42c9798b-e169-491e-947f-fbf026f4df01"></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        </main>
        <Footer />
      </body>
    </html>
  );
}

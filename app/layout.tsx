import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import ContactModal from "@/components/layout/ContactModal";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { ContactModalProvider } from "@/lib/context/contact-modal-context";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

const SITE_URL = "https://lorenzomaiuri.dev";

export const metadata: Metadata = {
  title: "Lorenzo Maiuri — AI Engineer & Software Consultant",
  description:
    "AI engineer and software consultant. I build production-grade AI systems for startups and B2B companies across Europe.",
  keywords: [
    "AI Engineer",
    "AI Consultant",
    "LangChain",
    "LlamaIndex",
    "Software Consultant",
    "Italy",
    "EU",
  ],
  openGraph: {
    title: "Lorenzo Maiuri — AI Engineer & Software Consultant",
    description: "I build AI systems that ship.",
    url: SITE_URL,
    siteName: "lorenzomaiuri.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorenzo Maiuri — AI Engineer & Software Consultant",
    description: "I build AI systems that ship.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lorenzo Maiuri",
  jobTitle: "AI Engineer & Software Consultant",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/maiurilorenzo/",
    "https://github.com/lorenzomaiuri-dev",
    "https://huggingface.co/maiurilorenzo",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Trenzano",
    addressRegion: "Lombardy",
    addressCountry: "IT",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional — theme detection script prevents flash
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="42c9798b-e169-491e-947f-fbf026f4df01"
        />
      </head>
      <body>
        <ContactModalProvider>
          <ContactModal />
          <div className="mx-auto max-w-[860px] px-4 sm:px-6 lg:px-0 pb-16">
            <Nav />
            <main>{children}</main>
            <Footer />
          </div>
        </ContactModalProvider>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional — JSON-LD schema markup
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

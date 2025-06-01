import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Services | Lorenzo Maiuri',
  description: 'Specialized services for AI implementation, custom software development, and data engineering to help your business grow, improve efficiency, and innovate.',
  alternates: {
    canonical: 'https://lorenzomaiuri.dev/services',
  },
  openGraph: {
    title: 'My Services | Lorenzo Maiuri',
    description: 'Specialized services for AI implementation, custom software development, and data engineering to help your business grow, improve efficiency, and innovate.',
    url: 'https://lorenzomaiuri.dev/services',
    siteName: 'Lorenzo Maiuri',
    images: [
      {
        url: 'https://lorenzomaiuri.dev/images/seo/services.png',
        width: 1200,
        height: 630,
        alt: 'My Services | Lorenzo Maiuri',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  keywords: 'AI implementation, custom software development, data engineering, machine learning, automation, freelance consultant, enterprise solutions',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
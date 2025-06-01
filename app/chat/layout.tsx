import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat with LorenzoBot | Lorenzo Maiuri',
  description: 'Interact with LorenzoBot, an AI-powered assistant designed by Lorenzo Maiuri. Ask about my portfolio, services, or anything else!',
  alternates: {
    canonical: 'https://lorenzomaiuri.dev/chat',
  },
  openGraph: {
    title: 'Chat with LorenzoBot | Lorenzo Maiuri',
    description: 'Interact with LorenzoBot, an AI-powered assistant designed by Lorenzo Maiuri. Ask about my portfolio, services, or anything else!',
    url: 'https://lorenzomaiuri.dev/chat',
    siteName: 'Lorenzo Maiuri',
    images: [
      {
        url: 'https://lorenzomaiuri.dev/images/seo/chat.png',
        width: 1200,
        height: 630,
        alt: 'Chat with LorenzoBot - AI Assistant',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  keywords: 'LorenzoBot, chatbot, AI assistant, artificial intelligence, conversational AI, Lorenzo Maiuri, portfolio AI',
};

export default function ChatLayout({
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
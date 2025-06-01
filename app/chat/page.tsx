'use client'

import React, { useRef, useCallback } from 'react';
import LorenzoBot from '@/components/chat/LorenzoBot';

const ChatPage = () => {
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Function to trigger the ripple animation
  const triggerRippleEffect = useCallback(() => {
    if (mainContentRef.current) {
      mainContentRef.current.classList.remove('animate-notification-ripple');
      void mainContentRef.current.offsetWidth;
      mainContentRef.current.classList.add('animate-notification-ripple');
    }
  }, []);

  const baseUrl = 'https://lorenzomaiuri.dev';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Chat with LorenzoBot',
    description: 'Interact with LorenzoBot, an AI-powered assistant designed by Lorenzo Maiuri. Ask about my portfolio, services, or anything else!',
    url: `${baseUrl}/chat`,
    mainEntityOfPage: {
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}/chat`,
    },
    applicationCategory: 'AI Assistant',
    operatingSystem: 'Web',
    softwareHelp: {
      '@type': 'WebPage',
      url: `${baseUrl}/#contact`
    },
    featureList: ['Conversational AI', 'Portfolio Inquiry', 'Service Information'],
    
    author: {
      '@type': 'Person',
      name: 'Lorenzo Maiuri',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lorenzo Maiuri',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/seo/logo.png`,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/seo/chat.png`,
      width: 1200,
      height: 630,
      alt: 'LorenzoBot AI Assistant',
    },
    datePublished: '2025-06-01',
    dateModified: new Date().toISOString().split('T')[0],
  };


  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        ref={mainContentRef}
        className="container mx-auto py-10 flex flex-col flex-grow px-4 sm:px-6 lg:px-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Chat with LorenzoBot</h1>
        </div>
        <div className="flex-grow flex justify-center items-center">
          <LorenzoBot onNotification={triggerRippleEffect} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
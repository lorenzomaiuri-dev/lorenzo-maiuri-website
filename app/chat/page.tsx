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

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
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
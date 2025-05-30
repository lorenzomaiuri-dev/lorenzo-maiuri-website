'use client'

import ChatUI from '@/components/chat/ChatUI';
import LorenzoBot from '@/components/chat/LorenzoBot';
import { Metadata } from 'next';

// You can uncomment and modify metadata if you are using Pages Router or add it to layout.tsx for App Router
// export const metadata: Metadata = {
//   title: 'Chat con LorenzoBot | Lorenzo Maiuri',
//   description: 'Parla con il mio chatbot AI per saperne di più sui miei servizi.',
// };

const ChatPage = () => {
  return (    
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="container mx-auto py-10 flex flex-col flex-grow px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Chat with LorenzoBot</h1>
        </div>
        <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <LorenzoBot />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
import React from 'react';
import { Bot } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-zinc-900 text-white p-4 border-b border-zinc-800">
      <div className="flex items-center space-x-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center
                     bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg
                     flex-shrink-0"
        >
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">LorenzoBot</h2>
          <p className="text-gray-300 text-sm leading-tight">
            Lorenzo Maiuri's AI-powered Virtual Assistant{' '}
            <a
              className='text-blue-400 hover:text-blue-300 transition-colors duration-200 underline'
              href='https://github.com/lorenzomaiuri-dev/lorenzo-maiuri-website'
              target='_blank'
              rel='noopener noreferrer'
            >
              (check on github how it was made)
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { type Message } from '@/lib/types';
import ChatMessage from './ChatMessage';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onToggleExpand: (messageIndex: number) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading, onToggleExpand }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive or loading state changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div
      ref={chatContainerRef}
      className="h-96 overflow-y-auto p-4 space-y-4 bg-zinc-900 custom-scrollbar"
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          onToggleExpand={onToggleExpand}
          index={index}
        />
      ))}

      {isLoading && (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-zinc-700 px-4 py-2 rounded-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
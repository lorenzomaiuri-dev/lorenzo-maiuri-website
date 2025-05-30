import React from 'react';
import { Bot, User, ChevronDown, ChevronUp } from 'lucide-react';
import { type Message } from '@/lib/types';
import ChatContentRenderer from './ChatContentRenderer';

interface ChatMessageProps {
  message: Message;
  onToggleExpand: (messageIndex: number) => void;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onToggleExpand, index }) => {
  const formatTime = (timestamp: string) => {    
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Time';
    }
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Check if the message has an action that requires expandable content
  const hasExpandableContent =
    message.action?.action_type === 'show_bio' ||
    message.action?.action_type === 'show_skills' ||
    message.action?.action_type === 'show_experience' ||
    message.action?.action_type === 'show_projects' ||
    message.action?.action_type === 'show_certifications';

  return (
    <div
      className={`flex items-start space-x-3 ${
        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >

      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.role === 'user'
          ? 'bg-blue-600 text-white' // User icon
          : 'bg-zinc-800 text-white' // Bot icon
      }`}>
        {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        message.role === 'user'
          ? 'bg-blue-500 text-white ml-auto' // User bubble
          : 'bg-zinc-700 text-gray-200' // Bot bubble
      }`}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {hasExpandableContent && message.action && (
          <div className="mt-2">
            <button
              onClick={() => onToggleExpand(index)}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs font-medium focus:outline-none" // Blue link style
            >
              {message.isExpanded ? 'Nascondi Dettagli' : 'Mostra Dettagli'}
              {message.isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
            </button>
            {message.isExpanded && (
              <div className="mt-2 p-2 bg-zinc-800 rounded-md shadow-inner text-gray-200">
                <ChatContentRenderer action={message.action} />
              </div>
            )}
          </div>
        )}

        <p className={`text-xs mt-1 ${
          message.role === 'user' ? 'text-white/70' : 'text-gray-400'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
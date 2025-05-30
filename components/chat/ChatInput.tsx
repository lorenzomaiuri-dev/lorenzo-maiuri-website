import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ inputMessage, setInputMessage, sendMessage, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

  const maxMessageLength = 500;
  const currentLength = inputMessage.length
  const isOverLength = maxMessageLength && currentLength > maxMessageLength;

  return (    
    <div className="bg-zinc-900 border-t border-zinc-800 p-4">
      <div className="flex items-end space-x-2">
        <input
        type="text"
        className="flex-grow p-3 rounded-md bg-zinc-800 text-white placeholder-gray-400
                   border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        placeholder={isLoading ? "Please wait..." : "Ask LorenzoBot something..."}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        maxLength={maxMessageLength}
      />
        <button
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim() || isOverLength}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg // Use blue-600 for consistency
                     hover:bg-blue-700 transition-colors duration-200 // Darker hover
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
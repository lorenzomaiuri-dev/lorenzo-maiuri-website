import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ inputMessage, setInputMessage, sendMessage, isLoading }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (    
    <div className="bg-zinc-900 border-t border-zinc-800 p-4">
      <div className="flex items-end space-x-2">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isLoading ? "Generating response..." : "Type your message..."}
          className="flex-1 px-3 py-2
                     bg-zinc-800 text-white placeholder-gray-400 // Dark background, white text, gray placeholder
                     border border-zinc-700 rounded-lg // Darker border
                     focus:outline-none focus:ring-2 focus:ring-blue-500 // Focus ring remains blue
                     resize-none overflow-hidden // Prevent scrollbar unless needed, remove default resize handle
                     max-h-24"
          rows={1}
          disabled={isLoading}
          style={{ height: 'auto' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim()}
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
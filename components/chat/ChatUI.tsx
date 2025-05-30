import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newUserMessage = { text: inputText, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputText('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputText }),
        });

        if (response.ok) {
          const data = await response.json();
          const botReply = { text: data.reply || 'Error detected in LorenzoBot answer. Try using the contact form', isUser: false };
          setMessages((prevMessages) => [...prevMessages, botReply]);
        } else {
          console.error('Error in communication with LorenzoBot:', response.status);
          const errorMessage = { text: 'An error happened in the communication with LorenzoBot. Try using the contact form', isUser: false };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = { text: 'Cannot send message to LorenzoBot. Try using the contact form', isUser: false };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md">      
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 flex flex-col-reverse space-y-4 space-y-reverse">
        {messages.slice().reverse().map((msg, index) => (
          <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <textarea
            rows={1}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow focus:ring-primary-light focus:border-primary-light block w-full rounded-full border border-gray-300 dark:border-gray-600 bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark resize-none pr-10"
            placeholder="Send a message to LorenzoBot..."
            style={{ minHeight: '40px', maxHeight: '120px', padding: '10px 15px' }}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-primary-light hover:bg-primary-dark text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-gray-800"
            aria-label="Send Message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
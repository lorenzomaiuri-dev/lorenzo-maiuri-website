import React, { useState, useRef} from 'react';
import { type Message, type ChatResponseAction, type ToastState, LorenzoBotProps } from '@/lib/types';

import Toast from '../common/Toast'; 
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';
import { useChatbot } from '@/lib/hooks/useChatbot';

const MESSAGE_COOLDOWN_SECONDS = (process.env.FRONTEND_MESSAGE_COOLDOWN) ? parseInt(process.env.FRONTEND_MESSAGE_COOLDOWN) : 10000;

const LorenzoBot: React.FC<LorenzoBotProps> = ({ onNotification }) => {

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I am LorenzoBot, Lorenzo Maiuri's personal virtual assitant\nI can help you know better Lorenzo, his projects and how to contact him. How can I help you?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string>('');

  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [toast, _setToast] = useState<ToastState | null>(null);

  // Custom setToast function that also triggers the onNotification callback
  const setToast = (newToast: ToastState | null) => {
    _setToast(newToast); // Update the actual toast state
    if (newToast && newToast.show && onNotification) {
      onNotification();
    }
  };

  const handleNewMessage = (newMessage: Message) => {
    setMessages(prev => [...prev, newMessage]);
  };

  const handleToggleExpand = (messageIndex: number) => {
    setMessages(prevMessages =>
      prevMessages.map((msg, idx) =>
        idx === messageIndex ? { ...msg, isExpanded: !msg.isExpanded } : msg
      )
    );
  };

  // Callback to handle actions from the chatbot API
  const handleBotAction = (action: ChatResponseAction) => {
    if (!action) return;

    switch (action.action_type) {
      case 'show_contact':
        setToast({
          show: true,
          message: 'Do you need to contact me?',
          type: 'info',
          link: { href: '/#contact', text: 'Contact me'},
          duration: 10000,
        });
        handleNewMessage({
            role: 'assistant',
            content: 'I have provided you a notification to go straight to the contact form\nQuick, it will expire soon!.',
            timestamp: new Date().toISOString()            
        });
        break
      case 'show_projects':
        setToast({
          show: true,
          message: 'Explore my projects.',
          type: 'info',
          link: { href: '/projects', text: 'Go to Projects'},
          duration: 10000,
        });
        handleNewMessage({
            role: 'assistant',
            content: 'Sure! I have provided you a notification to go straight to the projects section\nDid you know that he published the source code of this website and of myself on github?\nQuick, it will expire soon!.',
            timestamp: new Date().toISOString(),
        });
        break;
      case 'show_bio':
      case 'show_skills':
      case 'show_experience':
      case 'show_certifications':
        break;
      case 'display_message':
      case 'none':
      default:
        break;
    }
  };


  // Instantiate the custom hook
  const { sendMessageToApi } = useChatbot({
    onNewMessage: handleNewMessage,
    onAction: handleBotAction,
    chatId,
    setChatId,
    setIsLoading,
  });

  // Send a message to the API  
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (isOnCooldown) {
      setToast({
        show: true,
        message: `Please wait ${MESSAGE_COOLDOWN_SECONDS/1000} seconds before sending another message.`,
        type: 'warning',
        duration: 2000,
      });
      return;
    }

    const currentInput = inputMessage;
    setInputMessage('');

    // Activate cooldown
    setIsOnCooldown(true);
    cooldownTimerRef.current = setTimeout(() => {
      setIsOnCooldown(false);
      cooldownTimerRef.current = null;
    }, MESSAGE_COOLDOWN_SECONDS);

    await sendMessageToApi(currentInput);
  };


  return (
    <div
      className="w-full h-full
                 bg-zinc-950 text-white
                 rounded-lg shadow-2xl overflow-hidden
                "
    >
      <ChatHeader />
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        onToggleExpand={handleToggleExpand}
      />
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
      {toast && toast.show && (
        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={toast.duration}
          link={toast.link}
        />
      )}
    </div>
  );


};

export default LorenzoBot;
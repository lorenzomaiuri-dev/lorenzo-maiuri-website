import { useCallback } from 'react';
import { type Message, type ChatResponse, type ChatResponseAction } from '@/lib/types';

interface UseChatbotOptions {
  onNewMessage: (message: Message) => void;
  onAction: (action: ChatResponseAction) => void;
  chatId: string | null;
  setChatId: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
}

interface SendMessageResult {
  success: boolean;
  error?: string;
}

export const useChatbot = ({
  onNewMessage,
  onAction,
  chatId,
  setChatId,
  setIsLoading,
}: UseChatbotOptions) => {
  const sendMessageToApi = useCallback(async (
    userMessageContent: string
  ): Promise<SendMessageResult> => {
    setIsLoading(true);

    const userMessage: Message = {
      role: 'user',
      content: userMessageContent,
      timestamp: new Date().toISOString(),
    };

    onNewMessage(userMessage);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chatId || undefined,
          message: userMessageContent,
        }),
      });

      const data: ChatResponse = await response.json();

      // If chatId is not set yet, and the backend returns one, set it.
      // This is crucial for the backend to maintain conversation state.
      if (!chatId && data.chatId) {
        setChatId(data.chatId);
      }

      const botMessage: Message = {
        role: 'assistant',
        content: data.message || data.error || 'Error in the answer',
        timestamp: new Date().toISOString(),
        action: data.action,
      };

      onNewMessage(botMessage); // Add bot response to UI

      // Trigger side-effects based on the action returned by the bot
      if (data.action) { // Only trigger action if it exists
        setTimeout(() => onAction(data.action!), 300); // Pass the action to the parent
      }

      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I have encountered a technical problem. Retry later or contact Lorenzo directly using the form',
        timestamp: new Date().toISOString(),
        action: { action_type: 'show_contact', data: {} }, // Fallback to show contact on error
      };
      onNewMessage(errorMessage); // Add error message to UI
      // Trigger fallback action in LorenzoBot
      setTimeout(() => onAction({ action_type: 'show_contact', data: {} }), 500);
      return { success: false, error: (error as Error).message || 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  }, [chatId, onNewMessage, onAction, setChatId, setIsLoading]);

  return { sendMessageToApi };
};
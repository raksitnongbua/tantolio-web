import { useState, useCallback } from 'react';
import type { ChatMessage } from '@/types/chat';

export interface UseChatMessagesReturn {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addMessage: (message: ChatMessage) => void;
  updateWelcomeMessage: (content: string) => void;
  clearMessages: () => void;
}

export function useChatMessages(): UseChatMessagesReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const updateWelcomeMessage = useCallback((content: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => {
        if (message.id === "welcome") {
          return {
            ...message,
            content
          };
        }
        return message;
      })
    );
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    setMessages,
    addMessage,
    updateWelcomeMessage,
    clearMessages
  };
}
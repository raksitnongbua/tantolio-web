import { useEffect } from 'react';
import { useLocale, useMessages } from 'next-intl';
import { PortfolioChatBot } from '@/lib/chat-responses';
import type { ChatMessage, TranslationMessages } from '@/types/chat';

interface UseChatInitializationProps {
  isInitialized: boolean;
  setIsInitialized: (value: boolean) => void;
  addMessage: (message: ChatMessage) => void;
  setSuggestions: (suggestions: string[]) => void;
  updateWelcomeMessage: (content: string) => void;
  scrollToBottom: (smooth?: boolean) => void;
}

export function useChatInitialization({
  isInitialized,
  setIsInitialized,
  addMessage,
  setSuggestions,
  updateWelcomeMessage,
  scrollToBottom
}: UseChatInitializationProps) {
  const locale = useLocale() as 'en' | 'th';
  const translations = useMessages() as TranslationMessages;

  // Initialize with welcome message only once
  useEffect(() => {
    if (!isInitialized) {
      const welcomeResponse = PortfolioChatBot.getWelcomeMessage(locale, translations);
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        content: welcomeResponse.content,
        isUser: false,
        timestamp: new Date()
      };
      addMessage(welcomeMessage);
      setSuggestions(welcomeResponse.suggestions || []);
      setIsInitialized(true);
      
      // Ensure initial scroll position is at bottom with multiple attempts
      setTimeout(() => {
        scrollToBottom(false);
      }, 100);
      
      setTimeout(() => {
        scrollToBottom(false);
      }, 300);
    }
  }, [locale, isInitialized, translations, addMessage, setSuggestions, setIsInitialized, scrollToBottom]);

  // Handle language changes separately - only update welcome message content
  useEffect(() => {
    if (isInitialized) {
      const welcomeResponse = PortfolioChatBot.getWelcomeMessage(locale, translations);
      updateWelcomeMessage(welcomeResponse.content);
      setSuggestions(welcomeResponse.suggestions || []);
    }
  }, [locale, isInitialized, translations, updateWelcomeMessage, setSuggestions]);
}
import { useCallback } from 'react';
import { useLocale, useMessages, useTranslations } from 'next-intl';
import { PortfolioChatBot } from '@/lib/chat-responses';
import { splitLongMessage, calculateReadingTime, generateThinkingDelay } from '@/utils/message-utils';
import type { ChatMessage, TranslationMessages } from '@/types/chat';

interface UseChatActionsProps {
  addMessage: (message: ChatMessage) => void;
  setInputValue: (value: string) => void;
  setIsTyping: (value: boolean) => void;
  setIsGenerating: (value: boolean) => void;
  setLoadingSuggestion: (value: string | null) => void;
  setSuggestions: (suggestions: string[]) => void;
  setLastResponse: (response: {isSkillsResponse?: boolean} | null) => void;
  setShouldAutoScroll: (value: boolean) => void;
  setShowScrollButton: (value: boolean) => void;
  scrollToBottom: (smooth?: boolean) => void;
  activeTimeoutsRef: React.MutableRefObject<NodeJS.Timeout[]>;
  clearTimeouts: () => void;
}

export function useChatActions({
  addMessage,
  setInputValue,
  setIsTyping,
  setIsGenerating,
  setLoadingSuggestion,
  setSuggestions,
  setLastResponse,
  setShouldAutoScroll,
  setShowScrollButton,
  scrollToBottom,
  activeTimeoutsRef,
  clearTimeouts
}: UseChatActionsProps) {
  const locale = useLocale() as 'en' | 'th';
  const translations = useMessages() as TranslationMessages;
  const t = useTranslations();

  const stopGeneration = useCallback(() => {
    clearTimeouts();
    setIsTyping(false);
    setIsGenerating(false);
    setLoadingSuggestion(null);
  }, [clearTimeouts, setIsTyping, setIsGenerating, setLoadingSuggestion]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || false) return; // Note: removed isTyping check for now

    clearTimeouts();

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date()
    };

    // Force auto-scroll for new conversations
    setShouldAutoScroll(true);
    setShowScrollButton(false);
    
    addMessage(userMessage);
    setInputValue("");
    setIsTyping(true);
    setIsGenerating(true);
    setLoadingSuggestion(null);

    // Force immediate scroll to bottom after adding user message
    setTimeout(() => {
      scrollToBottom(true);
    }, 10);

    // Simulate AI thinking time with random delay for more natural feel
    const initialDelay = generateThinkingDelay();
    setTimeout(() => {
      const response = PortfolioChatBot.getResponse(messageText, locale, translations);
      
      // Split long responses into multiple messages
      const splitMessages = splitLongMessage(response.content);
      
      // Generate unique base ID for this conversation
      const baseId = Date.now();
      let cumulativeDelay = 0;
      
      // Send messages with cumulative delays
      splitMessages.forEach((messageContent, index) => {
        // Calculate reading time for previous message (simulate user reading)
        if (index > 0) {
          const prevMessage = splitMessages[index - 1];
          const readingTime = calculateReadingTime(prevMessage);
          cumulativeDelay += readingTime;
        }
        
        const timeoutId = setTimeout(() => {
          const botMessage: ChatMessage = {
            id: `${baseId}-${index}`,
            content: messageContent,
            isUser: false,
            timestamp: new Date()
          };

          addMessage(botMessage);
          
          // Always enable auto-scroll during answer generation
          setShouldAutoScroll(true);
          
          // Force scroll to bottom after each message part
          setTimeout(() => {
            scrollToBottom(true);
          }, 50);
          
          // Only set suggestions and lastResponse on the final message
          if (index === splitMessages.length - 1) {
            setSuggestions(response.suggestions || []);
            setLastResponse(response);
            setIsTyping(false);
            setIsGenerating(false);
          }
          
          // Remove this timeout from active list
          activeTimeoutsRef.current = activeTimeoutsRef.current.filter(id => id !== timeoutId);
        }, cumulativeDelay);
        
        // Track active timeouts
        activeTimeoutsRef.current.push(timeoutId);
      });
    }, initialDelay);
  }, [
    locale, translations, clearTimeouts, addMessage, setInputValue, setIsTyping, 
    setIsGenerating, setLoadingSuggestion, setShouldAutoScroll, setShowScrollButton,
    scrollToBottom, setSuggestions, setLastResponse, activeTimeoutsRef
  ]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setLoadingSuggestion(suggestion);
    setShouldAutoScroll(true); // Always enable auto-scroll when suggestion is clicked
    
    // Map suggestion to appropriate translation key
    let suggestionKey = '';
    if (suggestion.includes('Who is') || suggestion.includes('รักษิต หนองบัว คือใคร')) {
      suggestionKey = 'whoIsRaksit';
    } else if (suggestion.includes('experience') || suggestion.includes('ประสบการณ์')) {
      suggestionKey = 'experience';
    } else if (suggestion.includes('skill') || suggestion.includes('ทักษะ')) {
      suggestionKey = 'skills';
    } else if (suggestion.includes('contact') || suggestion.includes('ติดต่อ')) {
      suggestionKey = 'contact';
    }
    
    const localizedSuggestion = suggestionKey ? t(`suggestions.${suggestionKey}`) : suggestion;
    handleSendMessage(localizedSuggestion);
  }, [setLoadingSuggestion, setShouldAutoScroll, t, handleSendMessage]);

  const handleSubmit = useCallback((e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    setShouldAutoScroll(true); // Always enable auto-scroll when form is submitted
    handleSendMessage(inputValue);
  }, [setShouldAutoScroll, handleSendMessage]);

  return {
    stopGeneration,
    handleSendMessage,
    handleSuggestionClick,
    handleSubmit
  };
}
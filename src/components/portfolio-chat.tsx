"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Square, ChevronDown } from "lucide-react";
import { StarBackground } from "@/components/star-background";
import { useTranslations } from 'next-intl';
import { PortfolioChatBot } from '@/lib/chat-responses';
import { useLocale, useMessages } from 'next-intl';
import type { TranslationMessages } from '@/types/chat';

// Import existing components
import { AnimatedAvatar } from "@/components/chat/animated-avatar";
import { ChatInput } from "@/components/chat/chat-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Simple message splitting function
function splitMessage(content: string): string[] {
  const paragraphs = content.split('\n\n');
  const messages: string[] = [];
  let currentMessage = '';
  
  for (const paragraph of paragraphs) {
    if (currentMessage && (currentMessage + '\n\n' + paragraph).length > 300) {
      messages.push(currentMessage.trim());
      currentMessage = paragraph;
    } else {
      currentMessage = currentMessage ? currentMessage + '\n\n' + paragraph : paragraph;
    }
  }
  
  if (currentMessage.trim()) {
    messages.push(currentMessage.trim());
  }
  
  return messages.length > 0 ? messages : [content];
}

// Calculate delay based on word count (0.5s to 3s)
function calculateDelay(text: string): number {
  const wordCount = text.trim().split(/\s+/).length;
  const baseDelay = Math.max(500, Math.min(3000, wordCount * 100));
  return baseDelay;
}

export default function PortfolioChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTimeouts, setActiveTimeouts] = useState<NodeJS.Timeout[]>([]);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const locale = useLocale() as 'en' | 'th';
  const translations = useMessages() as TranslationMessages;

  // Check if user is near bottom of scroll area
  const checkIfNearBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const threshold = 100; // pixels from bottom
        const nearBottom = scrollHeight - scrollTop - clientHeight <= threshold;
        setIsNearBottom(nearBottom);
        setShowScrollButton(!nearBottom && messages.length > 0);
      }
    }
  }, [messages.length]);

  // Smart auto-scroll: only scroll to bottom when user is near bottom
  useEffect(() => {
    if (isNearBottom && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isThinking, isNearBottom]);

  // Add scroll listener to detect user scroll position
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const handleScroll = () => {
          checkIfNearBottom();
        };
        
        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }
  }, [messages, checkIfNearBottom]);

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
        setIsNearBottom(true);
        setShowScrollButton(false);
      }
    }
  };

  // Stop generation function
  const stopGeneration = () => {
    // Clear all active timeouts
    activeTimeouts.forEach(timeout => clearTimeout(timeout));
    setActiveTimeouts([]);
    setIsThinking(false);
    setIsGenerating(false);
  };

  // Initialize welcome message
  const initializeChat = () => {
    if (isInitialized) return;
    
    const welcomeResponse = PortfolioChatBot.getWelcomeMessage(locale, translations);
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      content: welcomeResponse.content,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages([welcomeMessage]);
    setIsInitialized(true);
  };

  // Handle message sending (both suggestions and input)
  const handleSendMessage = (messageText: string) => {
    if (isThinking || !messageText.trim()) return;
    
    // Clear any existing timeouts
    stopGeneration();
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);
    setIsGenerating(true);
    
    // 2 second thinking delay
    const thinkingTimeout = setTimeout(() => {
      try {
        // Generate response
        const response = PortfolioChatBot.getResponse(messageText, locale, translations);
        
        // Split the response into parts
        const messageParts = splitMessage(response.content);
        
        // Add messages step by step
        let partIndex = 0;
        const newTimeouts: NodeJS.Timeout[] = [];
        
        const addNextPart = () => {
          if (partIndex >= messageParts.length) {
            setIsThinking(false);
            setIsGenerating(false);
            setActiveTimeouts([]);
            return;
          }
          
          const botMessage: ChatMessage = {
            id: `${Date.now()}-${partIndex}`,
            content: messageParts[partIndex],
            isUser: false,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, botMessage]);
          partIndex++;
          
          if (partIndex < messageParts.length) {
            // Calculate delay for next part
            const delay = calculateDelay(messageParts[partIndex - 1]);
            const nextTimeout = setTimeout(addNextPart, delay);
            newTimeouts.push(nextTimeout);
            setActiveTimeouts(prev => [...prev, nextTimeout]);
          } else {
            setIsThinking(false);
            setIsGenerating(false);
            setActiveTimeouts([]);
          }
        };
        
        addNextPart();
      } catch (error) {
        console.error('Error generating response:', error);
        setIsThinking(false);
        setIsGenerating(false);
        setActiveTimeouts([]);
      }
    }, 2000); // 2 second thinking time
    
    setActiveTimeouts([thinkingTimeout]);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  // Initialize chat on component mount
  if (!isInitialized) {
    initializeChat();
  }

  // Get current suggestions
  const suggestions = [
    t('suggestions.whoIsRaksit') || "Who is Raksit Nongbua?",
    t('suggestions.workExperience') || "His detailed work experience",
    t('suggestions.skills') || "His skill and tech stack knowledge",
    t('suggestions.contact') || "His contact"
  ];

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 relative">
      <StarBackground />
      <Card className="flex-1 flex flex-col relative z-10 overflow-hidden min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <AnimatedAvatar 
              isBot={true}
              isTyping={isThinking}
              isActive={true}
              className="w-10 h-10"
            />
            <div>
              <h2 className="font-semibold">{t('chat.botName') || 'Tantolio AI'}</h2>
              <p className="text-sm text-muted-foreground">{t('chat.botRole') || 'Portfolio Assistant'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 overflow-hidden h-0" ref={scrollAreaRef}>
          <div className="p-4 space-y-4 pb-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 items-start animate-in fade-in duration-200 ${
                  message.isUser ? 'justify-end' : ''
                }`}
              >
                {!message.isUser && (
                  <AnimatedAvatar 
                    isBot={true}
                    isTyping={false}
                    isActive={false}
                  />
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted/80'
                  }`}
                >
                  {message.isUser ? (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  ) : (
                    <MarkdownRenderer content={message.content} />
                  )}
                </div>
                {message.isUser && (
                  <AnimatedAvatar 
                    isBot={false}
                    isTyping={false}
                    isActive={false}
                  />
                )}
              </div>
            ))}

            {/* Thinking indicator */}
            {isThinking && (
              <div className="flex gap-3 items-start animate-in fade-in duration-200">
                <AnimatedAvatar 
                  isBot={true}
                  isTyping={true}
                  isActive={true}
                />
                <div className="bg-muted/80 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Stop generation button */}
            {isGenerating && (
              <div className="flex justify-center py-2">
                <Button
                  onClick={stopGeneration}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Square className="h-3 w-3 mr-2" />
                  {t('ui.stopGenerating') || 'Stop generating'}
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <div className="absolute bottom-20 right-4 z-10">
            <Button
              onClick={scrollToBottom}
              size="sm"
              className="rounded-full h-10 w-10 p-0 shadow-lg"
              variant="default"
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">{t('ui.scrollToBottom') || 'Scroll to bottom'}</span>
            </Button>
          </div>
        )}

        {/* Suggestions */}
        {!isThinking && !isGenerating && (
          <div className="p-4 border-t border-b">
            <p className="text-sm text-muted-foreground mb-2">{t('ui.suggestions') || 'Suggestions:'}</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs"
                  disabled={isThinking || isGenerating}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleSubmit}
          isTyping={isThinking || isGenerating}
          inputRef={inputRef}
        />
      </Card>
    </div>
  );
}
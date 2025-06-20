"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Square } from "lucide-react";
import { StarBackground } from "@/components/star-background";
import { useTranslations } from 'next-intl';

// Custom hooks
import { useChatMessages } from "@/hooks/use-chat-messages";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useChatState } from "@/hooks/use-chat-state";
import { useChatInitialization } from "@/hooks/use-chat-initialization";
import { useChatActions } from "@/hooks/use-chat-actions";

// Components
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessage } from "@/components/chat/chat-message";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { ChatSuggestions } from "@/components/chat/chat-suggestions";
import { ChatInput } from "@/components/chat/chat-input";

export default function ChatInterface() {
  const t = useTranslations();
  
  // Custom hooks for state management
  const { messages, addMessage, updateWelcomeMessage } = useChatMessages();
  const {
    scrollAreaRef,
    bottomRef,
    showScrollButton,
    shouldAutoScroll,
    setShouldAutoScroll,
    scrollToBottom,
    handleScrollButtonClick
  } = useChatScroll(messages.length);
  
  const {
    inputValue,
    setInputValue,
    isTyping,
    setIsTyping,
    suggestions,
    setSuggestions,
    lastResponse,
    setLastResponse,
    isGenerating,
    setIsGenerating,
    loadingSuggestion,
    setLoadingSuggestion,
    isInitialized,
    setIsInitialized,
    activeTimeoutsRef,
    inputRef,
    clearTimeouts
  } = useChatState();

  // Chat initialization
  useChatInitialization({
    isInitialized,
    setIsInitialized,
    addMessage,
    setSuggestions,
    updateWelcomeMessage,
    scrollToBottom
  });

  // Chat actions
  const { stopGeneration, handleSuggestionClick, handleSubmit } = useChatActions({
    addMessage,
    setInputValue,
    setIsTyping,
    setIsGenerating,
    setLoadingSuggestion,
    setSuggestions,
    setLastResponse,
    setShouldAutoScroll,
    setShowScrollButton: () => {}, // Not needed in actions
    scrollToBottom,
    activeTimeoutsRef,
    clearTimeouts
  });

  // Auto-scroll effects
  useEffect(() => {
    // Auto-scroll to bottom when new messages are added, but only if user is near bottom
    if (shouldAutoScroll) {
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          scrollToBottom();
        });
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [messages, shouldAutoScroll, scrollToBottom]);

  useEffect(() => {
    // Scroll to bottom when typing indicator changes, but only if user is near bottom
    if (isTyping && shouldAutoScroll) {
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          scrollToBottom();
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [isTyping, shouldAutoScroll, scrollToBottom]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 relative">
      <StarBackground />
      <Card className="flex-1 flex flex-col relative z-10 overflow-hidden min-h-0">
        <ChatHeader />

        <ScrollArea className="flex-1 overflow-hidden h-0" ref={scrollAreaRef}>
          <div className="p-4 space-y-4 pb-8">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLastMessage={index === messages.length - 1}
                showSkills={lastResponse?.isSkillsResponse || false}
              />
            ))}

            {isTyping && <TypingIndicator />}
            
            {isGenerating && (
              <div className="flex justify-center py-2">
                <Button
                  onClick={stopGeneration}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Square className="h-3 w-3 mr-2" />
                  {t('ui.stopGenerating')}
                </Button>
              </div>
            )}
            
            {/* Invisible element to scroll to */}
            <div ref={bottomRef} className="h-1" />
          </div>
        </ScrollArea>

        {showScrollButton && (
          <div className="absolute bottom-24 right-6 z-20">
            <Button
              onClick={handleScrollButtonClick}
              size="sm"
              className="rounded-full h-10 w-10 p-0 shadow-lg border border-border/50"
              variant="secondary"
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">{t('ui.scrollToBottom')}</span>
            </Button>
          </div>
        )}

        <ChatSuggestions
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          isTyping={isTyping}
          loadingSuggestion={loadingSuggestion}
        />

        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={(e) => handleSubmit(e, inputValue)}
          isTyping={isTyping}
          inputRef={inputRef}
        />
      </Card>
    </div>
  );
}
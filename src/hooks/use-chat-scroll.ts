import { useRef, useCallback, useEffect, useState } from 'react';

export interface UseChatScrollReturn {
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  showScrollButton: boolean;
  shouldAutoScroll: boolean;
  setShouldAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToBottom: (smooth?: boolean) => void;
  handleScrollButtonClick: () => void;
}

export function useChatScroll(messagesLength: number): UseChatScrollReturn {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = useCallback((smooth = true) => {
    // Method 1: Use scrollIntoView on bottom element (most reliable)
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
      return;
    }
    
    // Method 2: Fallback to scroll container approach
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const behavior = smooth ? 'smooth' : 'auto';
        
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior
        });
        
        // Additional fallback for instant scrolling
        if (!smooth) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }
  }, []);

  const checkScrollPosition = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom && messagesLength > 3);
      }
    }
  }, [messagesLength]);

  const handleScrollButtonClick = useCallback(() => {
    scrollToBottom();
    setShouldAutoScroll(true);
  }, [scrollToBottom]);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [messagesLength, checkScrollPosition]);

  return {
    scrollAreaRef,
    bottomRef,
    showScrollButton,
    shouldAutoScroll,
    setShouldAutoScroll,
    scrollToBottom,
    handleScrollButtonClick
  };
}
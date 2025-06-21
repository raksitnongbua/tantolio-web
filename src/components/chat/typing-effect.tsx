import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number; // milliseconds per character
  onComplete?: () => void;
  className?: string;
}

export function TypingEffect({ 
  text, 
  speed = 30, 
  onComplete, 
  className 
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (text.length === 0) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typeTimer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typeTimer);
        setIsTyping(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(typeTimer);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
}
import { useState, useRef } from 'react';

export interface UseChatStateReturn {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  suggestions: string[];
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
  lastResponse: {isSkillsResponse?: boolean} | null;
  setLastResponse: React.Dispatch<React.SetStateAction<{isSkillsResponse?: boolean} | null>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  loadingSuggestion: string | null;
  setLoadingSuggestion: React.Dispatch<React.SetStateAction<string | null>>;
  isInitialized: boolean;
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  activeTimeoutsRef: React.MutableRefObject<NodeJS.Timeout[]>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  clearTimeouts: () => void;
}

export function useChatState(): UseChatStateReturn {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [lastResponse, setLastResponse] = useState<{isSkillsResponse?: boolean} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const activeTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearTimeouts = () => {
    activeTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    activeTimeoutsRef.current = [];
  };

  return {
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
  };
}
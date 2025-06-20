export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  content: string;
  suggestions?: string[];
  isSkillsResponse?: boolean;
}

export interface TranslationMessages {
  chat?: {
    welcome?: string;
    default?: string;
    whoIsRaksit?: string;
    skills?: string;
    contact?: string;
    [key: string]: string | undefined;
  };
  suggestions?: {
    whoIsRaksit?: string;
    experience?: string;
    skills?: string;
    contact?: string;
  };
  [key: string]: unknown;
}

export interface ChatState {
  inputValue: string;
  isTyping: boolean;
  suggestions: string[];
  lastResponse: { isSkillsResponse?: boolean } | null;
  isGenerating: boolean;
  loadingSuggestion: string | null;
  isInitialized: boolean;
}

export interface ScrollState {
  showScrollButton: boolean;
  shouldAutoScroll: boolean;
}
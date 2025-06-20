import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

interface ChatSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isTyping: boolean;
  loadingSuggestion: string | null;
}

export function ChatSuggestions({ 
  suggestions, 
  onSuggestionClick, 
  isTyping, 
  loadingSuggestion 
}: ChatSuggestionsProps) {
  const t = useTranslations();

  if (suggestions.length === 0) return null;

  return (
    <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
      <p className="text-sm text-muted-foreground mb-3 font-medium">{t('ui.tryAsking')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs h-auto py-2 px-3 text-left justify-start whitespace-normal"
            disabled={isTyping || loadingSuggestion === suggestion}
          >
            {loadingSuggestion === suggestion && (
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-2" />
            )}
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useTranslations } from 'next-intl';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isTyping: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function ChatInput({ 
  inputValue, 
  setInputValue, 
  onSubmit, 
  isTyping,
  inputRef 
}: ChatInputProps) {
  const t = useTranslations();

  return (
    <form onSubmit={onSubmit} className="p-4 border-t bg-background">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('ui.placeholder')}
          className="flex-1"
          disabled={isTyping}
        />
        <Button type="submit" disabled={isTyping || !inputValue.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">{t('ui.sendMessage')}</span>
        </Button>
      </div>
    </form>
  );
}
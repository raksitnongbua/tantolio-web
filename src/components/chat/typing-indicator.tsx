import { AnimatedAvatar } from "./animated-avatar";

export function TypingIndicator() {
  return (
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
  );
}
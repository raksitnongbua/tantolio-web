import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedAvatarProps {
  isBot?: boolean;
  isTyping?: boolean;
  isActive?: boolean;
  className?: string;
}

export function AnimatedAvatar({ 
  isBot = false, 
  isTyping = false, 
  isActive = false,
  className 
}: AnimatedAvatarProps) {
  return (
    <Avatar 
      className={cn(
        "h-8 w-8 transition-all duration-200",
        isActive && "scale-105", // Reduced from scale-110
        className
      )}
    >
      <AvatarFallback 
        className={cn(
          "transition-all duration-200",
          isBot ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          isTyping && "animate-pulse" // Removed bounce, kept only pulse
        )}
      >
        {isBot ? (
          <Bot 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              // Removed spin animation, just keep subtle pulse from parent
            )} 
          />
        ) : (
          <User 
            className="h-4 w-4" // Removed all animations for user avatar
          />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
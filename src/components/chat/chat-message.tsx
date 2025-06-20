import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { SkillsDisplay } from "@/components/skills-display";
import { portfolioData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  isLastMessage: boolean;
  showSkills: boolean;
}

export function ChatMessage({ message, isLastMessage, showSkills }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 items-start",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      {!message.isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "max-w-[85%] rounded-lg p-4",
          message.isUser
            ? "bg-primary text-primary-foreground ml-auto"
            : "bg-muted/60"
        )}
      >
        <div className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</div>
        {!message.isUser && showSkills && isLastMessage && (
          <div className="mt-4 space-y-3">
            <SkillsDisplay skills={portfolioData.skills.frontend} title="Frontend" />
            <SkillsDisplay skills={portfolioData.skills.backend} title="Backend" />
            <SkillsDisplay skills={portfolioData.skills.authentication} title="Authentication & Security" />
            <SkillsDisplay skills={portfolioData.skills.database} title="Database" />
            <SkillsDisplay skills={portfolioData.skills.tools} title="Tools" />
            <SkillsDisplay skills={portfolioData.skills.specializations} title="Specializations" />
          </div>
        )}
      </div>

      {message.isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
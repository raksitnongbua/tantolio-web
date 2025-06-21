import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { AnimatedAvatar } from "./animated-avatar";
import { useTranslations } from 'next-intl';

export function ChatHeader() {
  const t = useTranslations();

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AnimatedAvatar 
            isBot={true}
            isActive={true}
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-xl font-semibold">{t('ui.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('ui.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
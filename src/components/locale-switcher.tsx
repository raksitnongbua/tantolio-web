'use client';

import { Button } from "@/components/ui/button";
import { setUserLocale } from '@/i18n/locale';
import { Locale } from '@/i18n/config';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale() as Locale;

  function onSelectChange(newLocale: Locale) {
    startTransition(() => {
      setUserLocale(newLocale);
    });
  }

  return (
    <div className="flex bg-muted rounded-lg p-1">
      <Button
        variant={locale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onSelectChange('en')}
        className="h-8 px-3 text-xs font-medium"
        disabled={isPending}
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={locale === 'th' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onSelectChange('th')}
        className="h-8 px-3 text-xs font-medium"
        disabled={isPending}
      >
        🇹🇭 TH
      </Button>
    </div>
  );
}
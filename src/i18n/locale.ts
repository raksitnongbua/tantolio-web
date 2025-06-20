'use server';
 
import {cookies} from 'next/headers';
import {Locale, defaultLocale} from './config';
 
const COOKIE_NAME = 'tantolio-locale';
 
export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return (cookieStore.get(COOKIE_NAME)?.value as Locale) ?? defaultLocale;
}
 
export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
}

export async function getMessages() {
  const locale = await getUserLocale();
  return (await import(`../../messages/${locale}.json`)).default;
}
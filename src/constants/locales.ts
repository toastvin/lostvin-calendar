import { Locale, LocaleConfig } from '@/types/i18n';

/**
 * 지원하는 로케일 목록
 */
export const LOCALES: Locale[] = ['ko', 'en'] as const;

/**
 * 기본 로케일
 */
export const DEFAULT_LOCALE: Locale = 'ko';

/**
 * 로케일 설정
 */
export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  ko: {
    locale: 'ko',
    label: '한국어',
    flag: '🇰🇷',
  },
  en: {
    locale: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
};

/**
 * 로케일이 유효한지 확인
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

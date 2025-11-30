/**
 * i18n 타입 정의
 */

/**
 * 지원하는 로케일 타입
 */
export type Locale = 'ko' | 'en';

/**
 * 번역 메시지 구조
 */
export interface Messages {
  common: {
    title: string;
    subtitle: string;
    downloadPDF: string;
    print: string;
    share: string;
    copyLink: string;
    linkCopied: string;
  };
  calendar: {
    year: string;
    month: string;
    day: string;
    today: string;
    weekend: string;
    holiday: string;
    yearlyCalendar: string;
    monthlyCalendar: string;
  };
  settings: {
    title: string;
    year: string;
    country: string;
    paperSize: string;
    orientation: string;
    weekStart: string;
    ecoMode: string;
    showLunar: string;
    showWeekNumber: string;
    countries: {
      KR: string;
      US: string;
      JP: string;
      CN: string;
    };
    paperSizes: {
      A4: string;
      A3: string;
    };
    orientations: {
      portrait: string;
      landscape: string;
    };
    weekStarts: {
      sunday: string;
      monday: string;
    };
  };
  seo: {
    '2025': {
      title: string;
      description: string;
    };
    '2026': {
      title: string;
      description: string;
    };
    holidaysKr2026: {
      title: string;
      description: string;
    };
    habitTracker: {
      title: string;
      description: string;
    };
  };
}

/**
 * 로케일 설정
 */
export interface LocaleConfig {
  locale: Locale;
  label: string;
  flag: string;
}

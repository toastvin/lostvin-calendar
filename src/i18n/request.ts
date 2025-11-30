import { getRequestConfig } from 'next-intl/server';
import { Locale } from '@/types/i18n';
import { DEFAULT_LOCALE } from '@/constants/locales';

/**
 * next-intl 요청 설정
 *
 * 각 요청에 대해 로케일에 맞는 메시지를 로드합니다.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale은 middleware에서 설정된 로케일
  let locale = (await requestLocale) as Locale;

  // 유효하지 않은 로케일이면 기본값 사용
  if (!locale) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

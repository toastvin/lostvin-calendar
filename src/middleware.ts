import createMiddleware from 'next-intl/middleware';
import { LOCALES, DEFAULT_LOCALE } from './constants/locales';

/**
 * next-intl 미들웨어
 *
 * 브라우저의 Accept-Language 헤더를 감지하여 자동으로 로케일을 설정합니다.
 */
export default createMiddleware({
  // 지원하는 모든 로케일
  locales: LOCALES,

  // 기본 로케일
  defaultLocale: DEFAULT_LOCALE,

  // URL에 항상 로케일 접두사 추가 (예: /ko, /en)
  localePrefix: 'always',

  // 로케일 감지 활성화 (Accept-Language 헤더 사용)
  localeDetection: true,
});

/**
 * 미들웨어가 실행될 경로 설정
 */
export const config = {
  // 다음 경로에서만 미들웨어 실행
  matcher: [
    // 모든 경로 포함
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // 루트 경로
    '/',
    // 로케일 접두사가 있는 경로 (예: /ko, /en)
    '/(ko|en)/:path*',
  ],
};

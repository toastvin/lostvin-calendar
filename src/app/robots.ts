import { MetadataRoute } from 'next';

const BASE_URL = 'https://lostvin-calendar.vercel.app'; // TODO: 실제 도메인으로 변경

/**
 * robots.txt 생성
 *
 * 검색 엔진 크롤러를 위한 설정입니다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/test-*', // 테스트 페이지는 크롤링 제외
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

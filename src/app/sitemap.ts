import { MetadataRoute } from 'next';
import { YEAR_RANGE } from '@/constants/calendar';
import { LOCALES } from '@/constants/locales';
import { Country } from '@/types/calendar';

const SUPPORTED_COUNTRIES: Country[] = ['KR', 'US', 'JP', 'CN'];
const BASE_URL = 'https://lostvin-calendar.vercel.app'; // TODO: 실제 도메인으로 변경

/**
 * 동적 sitemap 생성
 *
 * SEO 최적화를 위해 모든 연도별, 국가별 페이지를 sitemap에 포함합니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // 1. 홈 페이지 (각 로케일)
  LOCALES.forEach((locale) => {
    sitemap.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    });
  });

  // 2. 연도별 달력 페이지 (각 로케일)
  for (let year = YEAR_RANGE.MIN; year <= YEAR_RANGE.MAX; year++) {
    LOCALES.forEach((locale) => {
      sitemap.push({
        url: `${BASE_URL}/${locale}/${year}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      });
    });
  }

  // 3. 공휴일 달력 페이지 (각 로케일, 연도, 국가)
  for (let year = YEAR_RANGE.MIN; year <= YEAR_RANGE.MAX; year++) {
    SUPPORTED_COUNTRIES.forEach((country) => {
      LOCALES.forEach((locale) => {
        sitemap.push({
          url: `${BASE_URL}/${locale}/holidays/${year}/${country.toLowerCase()}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 0.7,
        });
      });
    });
  }

  // 4. 습관 추적 페이지 (각 로케일)
  LOCALES.forEach((locale) => {
    sitemap.push({
      url: `${BASE_URL}/${locale}/habit-tracker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return sitemap;
}

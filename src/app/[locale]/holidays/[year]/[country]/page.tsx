import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { YEAR_RANGE } from '@/constants/calendar';
import { Country } from '@/types/calendar';

type Props = {
  params: Promise<{ locale: string; year: string; country: string }>;
};

const SUPPORTED_COUNTRIES: Country[] = ['KR', 'US', 'JP', 'CN'];

const COUNTRY_NAMES = {
  ko: {
    KR: '한국',
    US: '미국',
    JP: '일본',
    CN: '중국',
  },
  en: {
    KR: 'Korean',
    US: 'US',
    JP: 'Japanese',
    CN: 'Chinese',
  },
};

/**
 * 동적 메타데이터 생성 (공휴일 페이지 SEO)
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, year, country } = await params;
  const countryUpper = country.toUpperCase() as Country;
  const countryName =
    COUNTRY_NAMES[locale as keyof typeof COUNTRY_NAMES][countryUpper];

  // 동적 번역
  const title =
    locale === 'ko'
      ? `${year}년 ${countryName} 공휴일 달력 - 무료 프린트 | Lostvin Calendar`
      : `${year} ${countryName} Holidays Calendar - Free Printable | Lostvin Calendar`;

  const description =
    locale === 'ko'
      ? `${year}년 ${countryName} 공휴일이 표시된 달력을 무료로 프린트하세요. 모든 법정 공휴일 포함.`
      : `Print your free ${year} ${countryName} calendar with all public holidays.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/holidays/${year}/${country}`,
      languages: {
        ko: `/ko/holidays/${year}/${country}`,
        en: `/en/holidays/${year}/${country}`,
      },
    },
  };
}

/**
 * 정적 생성을 위한 경로 목록
 */
export function generateStaticParams() {
  const paths: { year: string; country: string }[] = [];

  for (let year = YEAR_RANGE.MIN; year <= YEAR_RANGE.MAX; year++) {
    SUPPORTED_COUNTRIES.forEach((country) => {
      paths.push({
        year: year.toString(),
        country: country.toLowerCase(),
      });
    });
  }

  return paths;
}

/**
 * 공휴일 달력 페이지 (SEO 전용)
 */
export default async function HolidaysPage({ params }: Props) {
  const { year, country } = await params;
  const yearNum = parseInt(year, 10);
  const countryUpper = country.toUpperCase() as Country;

  // 유효성 검사
  if (
    yearNum < YEAR_RANGE.MIN ||
    yearNum > YEAR_RANGE.MAX ||
    !SUPPORTED_COUNTRIES.includes(countryUpper)
  ) {
    notFound();
  }

  // TODO: 공휴일 달력 컴포넌트로 교체
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {year}년 {countryUpper} 공휴일 달력
      </h1>
      <p className="text-gray-600 mb-8">
        {year}년 {countryUpper} 공휴일이 표시된 달력을 무료로 프린트하세요.
      </p>

      {/* TODO: 공휴일 달력 컴포넌트 추가 */}
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-500">
          공휴일 달력 컴포넌트는 Week 3에서 구현되었습니다.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          이 페이지는 SEO 최적화를 위한 전용 페이지입니다.
        </p>
      </div>
    </div>
  );
}

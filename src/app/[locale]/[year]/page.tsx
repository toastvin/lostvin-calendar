import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { YEAR_RANGE } from '@/constants/calendar';

type Props = {
  params: Promise<{ locale: string; year: string }>;
};

/**
 * 동적 메타데이터 생성 (연도별 SEO)
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, year } = await params;

  // 동적 번역 (모든 연도에 대해 동일한 패턴 사용)
  const title =
    locale === 'ko'
      ? `${year}년 달력 프린트 - 무료 다운로드 | Lostvin Calendar`
      : `${year} Calendar Printable - Free Download | Lostvin Calendar`;

  const description =
    locale === 'ko'
      ? `${year}년 달력을 무료로 프린트하세요. 공휴일 포함, A4/A3 크기, PDF 다운로드 가능. 로그인 없이 3클릭으로 완성!`
      : `Print your free ${year} calendar with holidays. Available in A4/A3 size, downloadable as PDF. Create in 3 clicks without login!`;

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
      canonical: `/${locale}/${year}`,
      languages: {
        ko: `/ko/${year}`,
        en: `/en/${year}`,
      },
    },
  };
}

/**
 * 정적 생성을 위한 연도 목록
 */
export function generateStaticParams() {
  const years: string[] = [];
  for (let year = YEAR_RANGE.MIN; year <= YEAR_RANGE.MAX; year++) {
    years.push(year.toString());
  }
  return years.map((year) => ({ year }));
}

/**
 * 연도별 달력 페이지 (SEO 전용)
 */
export default async function YearPage({ params }: Props) {
  const { year } = await params;
  const yearNum = parseInt(year, 10);

  // 유효하지 않은 연도면 404
  if (yearNum < YEAR_RANGE.MIN || yearNum > YEAR_RANGE.MAX) {
    notFound();
  }

  // TODO: YearlyCalendar 컴포넌트로 교체
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{year}년 달력</h1>
      <p className="text-gray-600 mb-8">
        {year}년 달력을 무료로 프린트하세요. 공휴일 포함, A4/A3 크기, PDF
        다운로드 가능.
      </p>

      {/* TODO: YearlyCalendar 컴포넌트 추가 */}
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-500">
          달력 컴포넌트는 Week 2에서 구현되었습니다.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          이 페이지는 SEO 최적화를 위한 전용 페이지입니다.
        </p>
      </div>
    </div>
  );
}

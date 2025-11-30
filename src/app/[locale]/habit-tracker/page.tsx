import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * 동적 메타데이터 생성 (습관 추적 페이지 SEO)
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const title = t('habitTracker.title');
  const description = t('habitTracker.description');

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
      canonical: `/${locale}/habit-tracker`,
      languages: {
        ko: '/ko/habit-tracker',
        en: '/en/habit-tracker',
      },
    },
  };
}

/**
 * 습관 추적 달력 페이지 (SEO 전용)
 */
export default async function HabitTrackerPage() {
  // TODO: 습관 추적 달력 컴포넌트로 교체
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">습관 추적 달력</h1>
      <p className="text-gray-600 mb-8">
        습관을 추적할 수 있는 달력을 무료로 프린트하세요. 체크박스 포함, A4
        크기, 매일 기록 가능.
      </p>

      {/* TODO: 습관 추적 달력 컴포넌트 추가 */}
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-500">
          습관 추적 달력 컴포넌트는 Week 7에서 구현 예정입니다.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          이 페이지는 SEO 최적화를 위한 전용 페이지입니다.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LOCALES, isValidLocale } from '@/constants/locales';
import '@/styles/globals.css';
import '@/styles/print.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * 메타데이터 생성 (다국어 지원)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
    },
  };
}

/**
 * 정적 생성을 위한 로케일 목록
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * 로케일 기반 루트 레이아웃
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // 유효하지 않은 로케일이면 404
  if (!isValidLocale(locale)) {
    notFound();
  }

  // 현재 로케일의 메시지 로드
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

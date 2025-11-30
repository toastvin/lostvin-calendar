/**
 * PDF 다운로드 버튼 컴포넌트 (Week 4)
 *
 * 책임:
 * - PDF 다운로드 UI
 * - 로딩 상태 표시
 * - 에러 핸들링
 */

'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import type { CalendarConfig, Month } from '@/types/calendar';
import { generatePDFFilename } from '@/lib/pdf/generator';
import { registerKoreanFonts } from '@/lib/pdf/fonts';

// @react-pdf/renderer는 클라이언트에서만 작동 (SSR 비활성화)
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
      >
        PDF 도구 로딩 중...
      </button>
    ),
  }
);

// CalendarPDF도 dynamic import (SSR 비활성화)
const CalendarPDF = dynamic(
  () => import('@/lib/pdf/generator').then((mod) => ({ default: mod.CalendarPDF })),
  { ssr: false }
);

interface PDFDownloadButtonProps {
  config: CalendarConfig;
  months: Month[];
}

export function PDFDownloadButton({ config, months }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // 폰트 등록 (클라이언트에서만)
    registerKoreanFonts();
  }, []);

  if (!isClient) {
    return (
      <button
        disabled
        className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
      >
        PDF 준비 중...
      </button>
    );
  }

  const filename = generatePDFFilename(config);

  return (
    <PDFDownloadLink
      document={<CalendarPDF config={config} months={months} />}
      fileName={filename}
      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
    >
      {({ loading, error }) => {
        if (error) {
          return '❌ PDF 생성 실패';
        }
        if (loading) {
          return '📄 PDF 생성 중...';
        }
        return '📥 PDF 다운로드';
      }}
    </PDFDownloadLink>
  );
}

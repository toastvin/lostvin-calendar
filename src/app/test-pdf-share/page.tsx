'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { YearlyCalendar } from '@/components/calendar/YearlyCalendar';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { PDFDownloadButton } from '@/components/shared/PDFDownloadButton';
import { ShareButton } from '@/components/shared/ShareButton';
import { useCalendar } from '@/hooks/useCalendar';
import { DEFAULT_CONFIG } from '@/constants/calendar';
import { decodeConfig } from '@/lib/utils/url-params';
import type { CalendarConfig } from '@/types/calendar';

function TestPDFShareContent() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<CalendarConfig>(DEFAULT_CONFIG);
  const [isUrlRestored, setIsUrlRestored] = useState(false);
  const { months } = useCalendar(config);

  // URL 파라미터에서 설정 복원
  useEffect(() => {
    if (searchParams) {
      const restoredConfig = decodeConfig(searchParams);
      setConfig(restoredConfig);
      setIsUrlRestored(true);
    }
  }, [searchParams]);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Week 4: PDF 생성 & URL 공유 테스트</h1>

      <div className="space-y-4 mb-8">
        {/* 테스트 목적 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">테스트 목적</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>PDF 생성 및 다운로드 기능 검증</li>
            <li>한글 폰트 (Gowun Batang) 렌더링 확인</li>
            <li>URL 공유 기능 (클립보드 복사)</li>
            <li>URL에서 설정 복원 검증</li>
            <li>모바일 Safari PDF 다운로드 테스트</li>
          </ul>
        </div>

        {/* URL 복원 상태 */}
        {isUrlRestored && searchParams && searchParams.toString() && (
          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">✅ URL에서 설정 복원됨</h2>
            <p className="text-sm text-gray-700 break-all">
              파라미터: <code className="bg-gray-200 px-2 py-1 rounded">{searchParams.toString()}</code>
            </p>
          </div>
        )}

        {/* 검증 항목 */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">확인 사항</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>PDF 다운로드 버튼 클릭 → 파일 다운로드</li>
            <li>PDF 열기 → 한글 깨짐 없는지 확인</li>
            <li>링크 복사 버튼 클릭 → 클립보드에 복사됨</li>
            <li>새 탭에서 URL 붙여넣기 → 설정 복원되는지 확인</li>
            <li>모바일 Safari에서 PDF 다운로드 테스트</li>
          </ul>
        </div>
      </div>

      {/* 설정 & 미리보기 */}
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* 설정 패널 */}
        <div>
          <SettingsPanel config={config} onChange={setConfig} />

          {/* 현재 URL */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
            <h3 className="font-semibold mb-2">공유 URL 미리보기</h3>
            <div className="space-y-2">
              <p className="text-xs text-gray-600 break-all">
                {typeof window !== 'undefined' &&
                  `${window.location.origin}${window.location.pathname}?` +
                  new URLSearchParams(
                    Object.fromEntries(
                      Object.entries({
                        year: config.year.toString(),
                        type: config.type,
                        countries: config.countries.join(','),
                        paper: config.paperSize,
                        orient: config.orientation,
                        start: config.weekStart,
                        week: config.showWeekNumber ? '1' : '0',
                      })
                    )
                  ).toString()}
              </p>
            </div>
          </div>
        </div>

        {/* 달력 미리보기 */}
        <div>
          <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-semibold">미리보기</h2>

            {/* 액션 버튼 */}
            <div className="flex gap-3">
              <ShareButton config={config} />
              <PDFDownloadButton config={config} months={months} />
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
            <YearlyCalendar
              year={config.year}
              months={months}
              weekStart={config.weekStart}
              paperSize={config.paperSize}
              orientation={config.orientation}
              showWeekNumber={config.showWeekNumber}
            />
          </div>
        </div>
      </div>

      {/* 사용 가이드 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg print:hidden">
        <h2 className="text-xl font-semibold mb-2">사용 가이드</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">1. PDF 다운로드 테스트</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>설정 변경 (연도, 국가, 용지 크기 등)</li>
              <li>"PDF 다운로드" 버튼 클릭</li>
              <li>다운로드된 PDF 파일 열기</li>
              <li>한글이 깨지지 않고 정상 표시되는지 확인</li>
              <li>공휴일이 빨간색으로 표시되는지 확인</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-1">2. URL 공유 테스트</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>설정 변경</li>
              <li>"링크 복사" 버튼 클릭</li>
              <li>새 탭 열기 (Cmd/Ctrl + T)</li>
              <li>복사한 URL 붙여넣기 (Cmd/Ctrl + V)</li>
              <li>설정이 동일하게 복원되는지 확인</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-1">3. 모바일 테스트 (선택)</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>모바일 Safari에서 이 페이지 열기</li>
              <li>"PDF 다운로드" 버튼 클릭</li>
              <li>다운로드 및 미리보기 확인</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function TestPDFSharePage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center">Loading...</div>}>
      <TestPDFShareContent />
    </Suspense>
  );
}

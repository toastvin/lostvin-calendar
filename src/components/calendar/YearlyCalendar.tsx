/**
 * 연간 달력 컴포넌트 (UI 레이어)
 *
 * 책임:
 * - 12개월 달력 렌더링
 * - A4/A3 레이아웃 대응
 * - 세로/가로 방향 대응
 * - 프린트 최적화
 */

import type { Month, WeekStart, PaperSize, Orientation } from '@/types/calendar';
import { MonthlyCalendar } from './MonthlyCalendar';

interface YearlyCalendarProps {
  year: number;
  months: Month[];
  weekStart: WeekStart;
  paperSize: PaperSize;
  orientation: Orientation;
  showWeekNumber?: boolean;
}

export function YearlyCalendar({
  year,
  months,
  weekStart,
  paperSize,
  orientation,
  showWeekNumber = false,
}: YearlyCalendarProps) {
  // 레이아웃 계산
  const isA4 = paperSize === 'A4';
  const isPortrait = orientation === 'portrait';

  // A4 세로: 3x4 그리드 (컴팩트)
  // A4 가로: 4x3 그리드 (컴팩트)
  // A3 세로: 3x4 그리드 (여유)
  // A3 가로: 4x3 그리드 (여유)
  const columns = isPortrait ? 3 : 4;
  const compact = isA4;

  return (
    <div className="yearly-calendar w-full max-w-[210mm] mx-auto p-4 print:p-0 print:max-w-none">
      {/* 연도 제목 */}
      <h1 className="text-4xl font-bold text-center mb-6 print:mb-4 font-serif">
        {year}년 달력
      </h1>

      {/* 12개월 그리드 */}
      <div
        className={`
          grid gap-4 print:gap-2
          ${columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}
        `}
      >
        {months.map((month) => (
          <div key={month.month} className="no-page-break">
            <MonthlyCalendar
              month={month}
              weekStart={weekStart}
              showWeekNumber={showWeekNumber}
              compact={compact}
            />
          </div>
        ))}
      </div>

      {/* 프린트용 페이지 브레이크 힌트 */}
      <style jsx global>{`
        @media print {
          @page {
            size: ${paperSize} ${orientation};
            margin: 10mm;
          }

          body {
            font-family: 'Gowun Batang', serif;
          }

          /* A4 세로: 한 페이지에 모두 */
          ${
            isA4 && isPortrait
              ? `
          .print\\:max-w-none {
            max-width: 190mm;
          }
          `
              : ''
          }

          /* 페이지 나누기 방지 */
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

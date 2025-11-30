/**
 * 월간 달력 컴포넌트 (UI 레이어)
 *
 * 책임:
 * - 단일 월 달력 렌더링
 * - 7일 그리드 레이아웃
 * - 요일 헤더 표시
 * - 빈 칸 처리
 * - Week 7: Eco 모드, 프리셋, 메모 지원
 */

import type { Month, WeekStart, PresetType } from '@/types/calendar';
import { DayCell } from './DayCell';
import { getCalendarGrid, getMonthName, getWeekdayNames } from '@/lib/calendar/generator';

interface MonthlyCalendarProps {
  month: Month;
  weekStart: WeekStart;
  showWeekNumber?: boolean;
  compact?: boolean;
  ecoMode?: boolean; // Week 7
  preset?: PresetType; // Week 7
  memos?: Record<string, string>; // Week 7: 날짜별 메모
  onMemoChange?: (date: string, content: string) => void; // Week 7
}

export function MonthlyCalendar({
  month,
  weekStart,
  showWeekNumber = false,
  compact = false,
  ecoMode = false,
  preset = 'default',
  memos = {},
  onMemoChange,
}: MonthlyCalendarProps) {
  const { leadingBlanks, trailingBlanks } = getCalendarGrid(month, weekStart);
  const weekdayNames = getWeekdayNames(weekStart);

  const headerSize = compact ? 'text-sm' : 'text-base';
  const monthTitleSize = compact ? 'text-lg' : 'text-2xl';

  return (
    <div className="w-full">
      {/* 월 제목 */}
      <h3 className={`${monthTitleSize} font-bold text-center mb-2 print:mb-1`}>
        {getMonthName(month.month)}
      </h3>

      {/* 달력 그리드 */}
      <div className="border border-gray-300 print:border-black">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 bg-gray-100 print:bg-white">
          {weekdayNames.map((dayName, index) => (
            <div
              key={dayName}
              className={`
                ${headerSize}
                text-center font-semibold py-1
                border-r border-gray-300 last:border-r-0
                print:border-black
                ${index === 5 || index === 6 ? 'text-blue-600' : 'text-gray-700'}
              `}
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {/* 앞 빈 칸 */}
          {Array.from({ length: leadingBlanks }).map((_, index) => (
            <div
              key={`leading-${index}`}
              className="h-12 border-r border-b border-gray-200 print:border-gray-300 last:border-r-0"
            />
          ))}

          {/* 날짜 셀 */}
          {month.days.map((day) => {
            const dateString = day.date.toISOString().split('T')[0];
            return (
              <div
                key={day.date.toISOString()}
                className="border-r border-b border-gray-200 print:border-gray-300 last:border-r-0"
              >
                <DayCell
                  day={day}
                  showWeekNumber={showWeekNumber}
                  compact={compact}
                  ecoMode={ecoMode}
                  preset={preset}
                  memo={memos[dateString]}
                  onMemoChange={onMemoChange}
                />
              </div>
            );
          })}

          {/* 뒤 빈 칸 */}
          {Array.from({ length: trailingBlanks }).map((_, index) => (
            <div
              key={`trailing-${index}`}
              className="h-12 border-r border-b border-gray-200 print:border-gray-300 last:border-r-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

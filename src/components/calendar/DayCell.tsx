/**
 * 날짜 셀 컴포넌트 (UI 레이어)
 *
 * 책임:
 * - 단일 날짜 셀 렌더링
 * - 오늘, 주말, 공휴일 스타일 적용
 * - 주차 번호 표시 (옵션)
 */

import type { Day } from '@/types/calendar';

interface DayCellProps {
  day: Day;
  showWeekNumber?: boolean;
  compact?: boolean; // A4 용지용 컴팩트 모드
}

export function DayCell({ day, showWeekNumber = false, compact = false }: DayCellProps) {
  const dateNumber = day.date.getDate();

  // 스타일 계산
  const isSpecialDay = day.isHoliday || day.isWeekend;
  const textColor = day.isHoliday
    ? 'text-red-600'
    : day.isWeekend
    ? 'text-blue-600'
    : 'text-gray-900';

  const bgColor = day.isToday ? 'bg-blue-100 ring-2 ring-blue-500' : '';

  const cellSize = compact ? 'h-8' : 'h-12';
  const fontSize = compact ? 'text-sm' : 'text-base';

  return (
    <div
      className={`
        ${cellSize}
        ${bgColor}
        ${textColor}
        flex items-center justify-center
        relative
        print:border print:border-gray-200
      `}
    >
      {/* 주차 번호 (왼쪽 상단) */}
      {showWeekNumber && day.weekNumber && day.dayOfWeek === 0 && (
        <span className="absolute top-0 left-1 text-xs text-gray-400">
          W{day.weekNumber}
        </span>
      )}

      {/* 날짜 번호 */}
      <span className={`${fontSize} font-medium`}>
        {dateNumber}
      </span>

      {/* 공휴일 표시 (작은 점) */}
      {day.isHoliday && (
        <span className="absolute bottom-0.5 w-1 h-1 bg-red-500 rounded-full" />
      )}
    </div>
  );
}

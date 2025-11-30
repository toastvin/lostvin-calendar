/**
 * 날짜 셀 컴포넌트 (UI 레이어)
 *
 * 책임:
 * - 단일 날짜 셀 렌더링
 * - 오늘, 주말, 공휴일 스타일 적용
 * - 주차 번호 표시 (옵션)
 * - 공휴일 이름 툴팁 (Week 3)
 * - Week 7: Eco 모드, 메모 입력, 오늘 하이라이트
 */

'use client';

import { useState } from 'react';
import type { Day, PresetType } from '@/types/calendar';
import { ECO_MODE_STYLES } from '@/constants/calendar';

interface DayCellProps {
  day: Day;
  showWeekNumber?: boolean;
  compact?: boolean; // A4 용지용 컴팩트 모드
  ecoMode?: boolean; // Week 7: Eco 모드
  preset?: PresetType; // Week 7: 프리셋 타입
  memo?: string; // Week 7: 메모 내용
  onMemoChange?: (date: string, content: string) => void; // Week 7: 메모 변경 핸들러
}

export function DayCell({
  day,
  showWeekNumber = false,
  compact = false,
  ecoMode = false,
  preset = 'default',
  memo = '',
  onMemoChange,
}: DayCellProps) {
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memoText, setMemoText] = useState(memo);

  const dateNumber = day.date.getDate();
  const dateString = day.date.toISOString().split('T')[0];

  // Week 7: Eco 모드 스타일
  const ecoStyles = ecoMode
    ? {
        color: ECO_MODE_STYLES.COLOR,
        borderWidth: ECO_MODE_STYLES.BORDER_WIDTH,
        borderStyle: ECO_MODE_STYLES.BORDER_STYLE,
        fontWeight: ECO_MODE_STYLES.FONT_WEIGHT,
      }
    : {};

  // 스타일 계산
  const textColor = ecoMode
    ? 'text-gray-600'
    : day.isHoliday
    ? 'text-red-600'
    : day.isWeekend
    ? 'text-blue-600'
    : 'text-gray-900';

  // Week 7: 오늘 날짜 하이라이트 (연한 노란색 원)
  const bgColor = day.isToday ? 'bg-yellow-100 ring-2 ring-yellow-400' : '';

  const cellSize = compact ? 'h-8' : preset === 'meal-planner' ? 'h-24' : 'h-16';
  const fontSize = compact ? 'text-sm' : 'text-base';

  // 공휴일 이름 (툴팁용)
  const holidayName = day.holidayInfo?.name;

  // 메모 저장 핸들러
  const handleMemoSave = () => {
    if (onMemoChange) {
      onMemoChange(dateString, memoText);
    }
    setIsEditingMemo(false);
  };

  return (
    <div
      className={`
        ${cellSize}
        ${bgColor}
        ${textColor}
        ${preset === 'default' ? 'flex items-center justify-center' : 'flex flex-col p-1'}
        relative
        border border-gray-200
        group
        cursor-pointer
        hover:bg-gray-50
      `}
      style={ecoMode ? ecoStyles : undefined}
      title={holidayName} // 브라우저 기본 툴팁
      onClick={() => !isEditingMemo && setIsEditingMemo(true)}
    >
      {/* 주차 번호 (왼쪽 상단) */}
      {showWeekNumber && day.weekNumber && day.dayOfWeek === 0 && (
        <span className="absolute top-0 left-1 text-xs text-gray-400">
          W{day.weekNumber}
        </span>
      )}

      {/* 날짜 번호 */}
      <span className={`${fontSize} ${preset === 'default' ? 'font-medium' : 'text-sm font-bold'}`}>
        {dateNumber}
      </span>

      {/* Week 7: 습관 추적 프리셋 - 체크박스 3개 */}
      {preset === 'habit-tracker' && (
        <div className="flex gap-1 mt-1 print:hidden">
          <span className="text-xs">☐</span>
          <span className="text-xs">☐</span>
          <span className="text-xs">☐</span>
        </div>
      )}

      {/* Week 7: 메모 입력 영역 */}
      {preset === 'meal-planner' && (
        <div className="mt-1 w-full flex-1">
          {isEditingMemo ? (
            <textarea
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              onBlur={handleMemoSave}
              className="w-full h-full text-xs border border-blue-500 rounded p-1 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="메모..."
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="text-xs text-gray-600 whitespace-pre-wrap break-words h-full overflow-hidden">
              {memoText || '클릭하여 메모 입력'}
            </div>
          )}
        </div>
      )}

      {/* 기본 프리셋: 간단한 메모 표시 */}
      {preset === 'default' && memo && (
        <div className="absolute bottom-0 left-0 right-0 text-xs text-gray-500 bg-gray-100 px-1 truncate print:text-[8px]">
          {memo}
        </div>
      )}

      {/* 공휴일 표시 (작은 점) */}
      {day.isHoliday && (
        <span className={`absolute ${preset === 'default' ? 'bottom-0.5' : 'top-0.5 right-0.5'} w-1 h-1 ${ecoMode ? 'bg-gray-500' : 'bg-red-500'} rounded-full`} />
      )}

      {/* 공휴일 이름 (hover 툴팁) - 화면 전용 */}
      {day.isHoliday && holidayName && !compact && (
        <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 print:hidden">
          {holidayName}
        </div>
      )}
    </div>
  );
}

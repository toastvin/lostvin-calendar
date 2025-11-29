/**
 * 달력 상태 관리 훅
 *
 * 책임:
 * - 달력 데이터 생성
 * - 설정 관리
 * - 데이터 메모이제이션
 */

'use client';

import { useMemo } from 'react';
import type { CalendarConfig, Month } from '@/types/calendar';
import { generateYearlyCalendar, generateMonthlyCalendar } from '@/lib/calendar/generator';

interface UseCalendarResult {
  months: Month[];
  config: CalendarConfig;
}

export function useCalendar(config: CalendarConfig): UseCalendarResult {
  // 달력 데이터 생성 (메모이제이션)
  const months = useMemo(() => {
    if (config.type === 'yearly') {
      return generateYearlyCalendar(
        config.year,
        config.weekStart,
        config.showWeekNumber
      );
    }

    if (config.type === 'monthly') {
      // 현재 월만 생성 (추후 확장)
      const currentMonth = new Date().getMonth() + 1;
      return [
        generateMonthlyCalendar(
          config.year,
          currentMonth,
          config.weekStart,
          config.showWeekNumber
        ),
      ];
    }

    // quarterly는 Week 6에서 구현 예정
    return [];
  }, [config.year, config.type, config.weekStart, config.showWeekNumber]);

  return {
    months,
    config,
  };
}

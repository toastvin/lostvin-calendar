/**
 * 달력 상태 관리 훅
 *
 * 책임:
 * - 달력 데이터 생성
 * - 공휴일 데이터 통합 (Week 3)
 * - 설정 관리
 * - 데이터 메모이제이션
 */

'use client';

import { useMemo } from 'react';
import type { CalendarConfig, Month } from '@/types/calendar';
import { generateYearlyCalendar, generateMonthlyCalendar } from '@/lib/calendar/generator';
import { getHolidays } from '@/lib/holidays/provider';

interface UseCalendarResult {
  months: Month[];
  config: CalendarConfig;
}

export function useCalendar(config: CalendarConfig): UseCalendarResult {
  // 공휴일 데이터 가져오기 (메모이제이션)
  const holidays = useMemo(() => {
    return getHolidays(config.year, config.countries);
  }, [config.year, config.countries]);

  // 달력 데이터 생성 (메모이제이션)
  const months = useMemo(() => {
    if (config.type === 'yearly') {
      return generateYearlyCalendar(
        config.year,
        config.weekStart,
        config.showWeekNumber,
        holidays
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
          config.showWeekNumber,
          holidays
        ),
      ];
    }

    // quarterly는 Week 6에서 구현 예정
    return [];
  }, [config.year, config.type, config.weekStart, config.showWeekNumber, holidays]);

  return {
    months,
    config,
  };
}

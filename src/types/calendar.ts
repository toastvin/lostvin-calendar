/**
 * 달력 관련 타입 정의 (One Source of Truth)
 */

import { z } from 'zod';

// 기본 타입
export type CalendarType = 'yearly' | 'monthly' | 'quarterly';
export type PaperSize = 'A4' | 'A3';
export type Orientation = 'portrait' | 'landscape';
export type WeekStart = 'sunday' | 'monday';
export type Country = 'KR' | 'US' | 'JP' | 'CN';

// Zod 스키마 (런타임 검증)
export const CalendarConfigSchema = z.object({
  year: z.number().int().min(2020).max(2030),
  type: z.enum(['yearly', 'monthly', 'quarterly']),
  countries: z.array(z.enum(['KR', 'US', 'JP', 'CN'])),
  paperSize: z.enum(['A4', 'A3']),
  orientation: z.enum(['portrait', 'landscape']),
  weekStart: z.enum(['sunday', 'monday']),
  ecoMode: z.boolean(),
  showLunar: z.boolean(),
  showWeekNumber: z.boolean(),
});

// 타입 추론
export type CalendarConfig = z.infer<typeof CalendarConfigSchema>;

// 달력 데이터 구조
export interface Month {
  month: number; // 1~12
  days: Day[];
}

export interface Day {
  date: Date;
  dayOfWeek: number; // 0~6 (일~토)
  isWeekend: boolean;
  isHoliday: boolean;
  isToday: boolean;
  weekNumber?: number; // ISO 8601 주차
}

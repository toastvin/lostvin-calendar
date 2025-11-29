/**
 * 달력 관련 상수 (매직 값 금지)
 */

import type { CalendarConfig } from '@/types/calendar';

export const CURRENT_YEAR = new Date().getFullYear();

export const YEAR_RANGE = {
  MIN: 2020,
  MAX: 2030,
} as const;

export const PAPER_SIZES = {
  A4: 'A4',
  A3: 'A3',
} as const;

export const ORIENTATIONS = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
} as const;

export const WEEK_STARTS = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
} as const;

export const COUNTRIES = {
  KR: 'KR',
  US: 'US',
  JP: 'JP',
  CN: 'CN',
} as const;

export const DEFAULT_CONFIG: CalendarConfig = {
  year: CURRENT_YEAR,
  type: 'yearly',
  countries: ['KR'],
  paperSize: 'A4',
  orientation: 'portrait',
  weekStart: 'monday',
  ecoMode: false,
  showLunar: false,
  showWeekNumber: false,
};

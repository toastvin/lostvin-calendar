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
  preset: 'default',
};

// Week 7: Eco 모드 스타일 상수
export const ECO_MODE_STYLES = {
  COLOR: '#555555', // #000 → #555 (잉크 절약)
  BORDER_WIDTH: '0.5px', // 1px → 0.5px
  BORDER_STYLE: 'dotted' as const, // solid → dotted
  FONT_WEIGHT: '400' as const, // 500 → 400
} as const;

// Week 7: 올해/내년 퀵 버튼
export const QUICK_YEARS = {
  THIS_YEAR: CURRENT_YEAR,
  NEXT_YEAR: CURRENT_YEAR + 1,
} as const;

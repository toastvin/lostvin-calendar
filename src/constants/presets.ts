/**
 * Week 7: 목적별 프리셋 정의
 */

import type { PresetConfig } from '@/types/calendar';

export const PRESETS: Record<string, PresetConfig> = {
  default: {
    id: 'default',
    name: '기본 달력',
    description: '심플한 기본 달력',
    defaultSettings: {
      ecoMode: false,
    },
    cellLayout: 'default',
  },
  'habit-tracker': {
    id: 'habit-tracker',
    name: '습관 추적',
    description: '매일 체크박스 3개로 습관 기록',
    defaultSettings: {
      ecoMode: false,
      type: 'monthly',
    },
    cellLayout: 'checkboxes',
  },
  'meal-planner': {
    id: 'meal-planner',
    name: '식단표',
    description: '큰 메모 공간으로 식단 기록',
    defaultSettings: {
      ecoMode: false,
      type: 'monthly',
    },
    cellLayout: 'large-memo',
  },
} as const;

export const PRESET_LIST = Object.values(PRESETS);

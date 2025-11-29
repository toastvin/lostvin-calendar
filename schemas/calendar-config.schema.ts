/**
 * Calendar Configuration Schema
 *
 * 달력 설정의 유효성을 검증하는 Zod 스키마
 */

import { z } from 'zod';

// ============================================
// Enum 타입 정의
// ============================================

export const CalendarTypeSchema = z.enum(['yearly', 'monthly', 'quarterly']);
export const PaperSizeSchema = z.enum(['A4', 'A3']);
export const OrientationSchema = z.enum(['portrait', 'landscape']);
export const WeekStartSchema = z.enum(['sunday', 'monday']);
export const CountrySchema = z.enum(['KR', 'US', 'JP', 'CN']);
export const PresetTypeSchema = z.enum(['basic', 'habit', 'meal', 'study', 'work']);

// ============================================
// 상수 정의
// ============================================

const YEAR_MIN = 2020;
const YEAR_MAX = 2030;
const MONTH_MIN = 1;
const MONTH_MAX = 12;

// ============================================
// 달력 설정 스키마
// ============================================

export const CalendarConfigSchema = z.object({
  // 연도 (2020~2030)
  year: z
    .number()
    .int('Year must be an integer')
    .min(YEAR_MIN, `Year must be at least ${YEAR_MIN}`)
    .max(YEAR_MAX, `Year must be at most ${YEAR_MAX}`),

  // 달력 유형
  type: CalendarTypeSchema,

  // 국가 (다중 선택 가능)
  countries: z
    .array(CountrySchema)
    .min(1, 'At least one country must be selected')
    .max(4, 'Maximum 4 countries can be selected'),

  // 용지 크기
  paperSize: PaperSizeSchema,

  // 방향
  orientation: OrientationSchema,

  // 주 시작 요일
  weekStart: WeekStartSchema,

  // Eco 모드 (잉크 절약)
  ecoMode: z.boolean(),

  // 음력 표시
  showLunar: z.boolean(),

  // 주차 번호 표시
  showWeekNumber: z.boolean(),

  // 프리셋 타입 (선택)
  preset: PresetTypeSchema.optional(),

  // 월간 달력 전용: 특정 월
  month: z
    .number()
    .int()
    .min(MONTH_MIN)
    .max(MONTH_MAX)
    .optional(),

  // 커스텀 제목 (선택)
  customTitle: z
    .string()
    .max(100, 'Title must be 100 characters or less')
    .optional(),
});

export type CalendarConfig = z.infer<typeof CalendarConfigSchema>;

// ============================================
// 메모 설정 스키마
// ============================================

export const MemoSchema = z.object({
  // 날짜 (ISO 8601 형식)
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  // 메모 내용
  content: z
    .string()
    .max(200, 'Memo must be 200 characters or less'),

  // 생성 시간
  createdAt: z.string().datetime(),
});

export type Memo = z.infer<typeof MemoSchema>;

// ============================================
// URL 파라미터 스키마
// ============================================

export const URLParamsSchema = z.object({
  year: z.string().optional(),
  type: z.string().optional(),
  countries: z.string().optional(), // 쉼표로 구분 "KR,US"
  paper: z.string().optional(),
  orient: z.string().optional(),
  start: z.string().optional(),
  eco: z.enum(['0', '1']).optional(),
  lunar: z.enum(['0', '1']).optional(),
  week: z.enum(['0', '1']).optional(),
  preset: z.string().optional(),
  month: z.string().optional(),
  title: z.string().optional(),
});

// ============================================
// 공휴일 스키마
// ============================================

export const HolidaySchema = z.object({
  // 날짜
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  // 공휴일 이름 (다국어 지원)
  name: z.string(),

  // 국가 코드
  countryCode: CountrySchema,

  // 유형 (공휴일, 기념일 등)
  type: z.enum(['public', 'bank', 'school', 'optional', 'observance']),

  // 전국 공휴일 여부
  isNational: z.boolean(),
});

export type Holiday = z.infer<typeof HolidaySchema>;

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 설정 유효성 검증
 */
export function validateConfig(config: unknown): CalendarConfig {
  return CalendarConfigSchema.parse(config);
}

/**
 * 설정 안전 검증 (에러 반환)
 */
export function safeValidateConfig(config: unknown) {
  return CalendarConfigSchema.safeParse(config);
}

/**
 * URL 파라미터 → 설정 변환
 */
export function parseURLParams(params: Record<string, string | undefined>): Partial<CalendarConfig> {
  const result = URLParamsSchema.safeParse(params);

  if (!result.success) {
    return {};
  }

  const data = result.data;

  return {
    year: data.year ? parseInt(data.year) : undefined,
    type: data.type as CalendarConfig['type'] | undefined,
    countries: data.countries?.split(',') as CalendarConfig['countries'] | undefined,
    paperSize: data.paper as CalendarConfig['paperSize'] | undefined,
    orientation: data.orient as CalendarConfig['orientation'] | undefined,
    weekStart: data.start as CalendarConfig['weekStart'] | undefined,
    ecoMode: data.eco === '1',
    showLunar: data.lunar === '1',
    showWeekNumber: data.week === '1',
    preset: data.preset as CalendarConfig['preset'] | undefined,
    month: data.month ? parseInt(data.month) : undefined,
    customTitle: data.title,
  };
}

/**
 * 설정 → URL 파라미터 변환
 */
export function toURLParams(config: CalendarConfig): Record<string, string> {
  return {
    year: config.year.toString(),
    type: config.type,
    countries: config.countries.join(','),
    paper: config.paperSize,
    orient: config.orientation,
    start: config.weekStart,
    eco: config.ecoMode ? '1' : '0',
    lunar: config.showLunar ? '1' : '0',
    week: config.showWeekNumber ? '1' : '0',
    ...(config.preset && { preset: config.preset }),
    ...(config.month && { month: config.month.toString() }),
    ...(config.customTitle && { title: config.customTitle }),
  };
}

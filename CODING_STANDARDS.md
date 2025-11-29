# Coding Standards - Lostvin Calendar

> **목적**: 바이브 코딩 방지 및 일관된 코드 품질 유지
>
> **원칙**: "Smart, Not Vibe" - 감으로 짜지 말고, 구조와 규칙을 따르자

---

## 🚫 바이브 코딩이란?

LLM이 "그럴듯하게" 생성한 코드가 실제로는 프로젝트 구조를 무시하고 문제를 양산하는 현상.

### 바이브 코딩의 전형적인 문제들

1. **팀 패턴 무시**: 기존 폴더 구조·레이어링을 어기는 코드 생성
2. **One Source of Truth 위반**: 타입/모델을 여러 곳에 중복 정의
3. **매직 값 하드코딩**: 상태/숫자/문자열이 여기저기 박힘
4. **예외·에러 처리 부실**: 해피 패스만 통과, 콘솔 로그로 덮기, any 남발
5. **단일 책임 위반**: UI·비즈 로직·IO가 한 파일/함수에 뒤엉킴
6. **Shared 관리 실종**: 재사용 유틸이 여기저기 복제, 공용 모듈 부재

---

## 📁 프로젝트 구조 (강제)

```
src/
├── app/                    # Next.js App Router (라우팅만)
│   ├── (routes)/          # 페이지 그룹
│   ├── api/               # API 라우트
│   └── layout.tsx         # 루트 레이아웃
│
├── components/            # UI 컴포넌트
│   ├── calendar/         # 달력 관련 컴포넌트
│   │   ├── YearlyCalendar.tsx
│   │   ├── MonthlyCalendar.tsx
│   │   └── DayCell.tsx
│   ├── settings/         # 설정 패널
│   │   ├── SettingsPanel.tsx
│   │   └── CountrySelector.tsx
│   ├── ui/               # shadcn/ui 기반 공통 UI
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── select.tsx
│   └── shared/           # 프로젝트 공통 컴포넌트
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/                   # 비즈니스 로직 (UI와 분리)
│   ├── calendar/         # 달력 생성 로직
│   │   ├── generator.ts  # 달력 데이터 생성
│   │   ├── formatter.ts  # 날짜 포맷팅
│   │   └── validator.ts  # 입력 검증
│   ├── holidays/         # 공휴일 데이터
│   │   ├── provider.ts   # 공휴일 데이터 제공
│   │   └── cache.ts      # 공휴일 캐싱
│   ├── pdf/              # PDF 생성
│   │   ├── generator.tsx # PDF 문서 생성
│   │   └── fonts.ts      # 폰트 설정
│   ├── storage/          # LocalStorage 관리
│   │   └── config.ts     # 설정 저장/불러오기
│   └── utils/            # 유틸리티 함수
│       ├── url-params.ts # URL 파라미터 인코딩/디코딩
│       ├── date.ts       # 날짜 유틸리티
│       └── validators.ts # 공통 검증 함수
│
├── types/                 # TypeScript 타입 정의 (단일 진실 공급원)
│   ├── calendar.ts       # 달력 관련 타입
│   ├── holiday.ts        # 공휴일 타입
│   └── config.ts         # 설정 타입
│
├── constants/             # 상수 (매직 값 금지)
│   ├── calendar.ts       # 달력 상수
│   ├── countries.ts      # 국가 코드
│   └── defaults.ts       # 기본값
│
├── hooks/                 # Custom React Hooks
│   ├── useCalendar.ts    # 달력 상태 관리
│   ├── useSettings.ts    # 설정 상태 관리
│   └── useLocalStorage.ts # LocalStorage 훅
│
└── styles/                # 전역 스타일
    ├── globals.css       # Tailwind + 전역 CSS
    └── print.css         # @media print 전용
```

### ✅ 규칙 1: 레이어 분리

| 레이어 | 책임 | 금지 사항 |
|--------|------|-----------|
| `app/` | 라우팅, 레이아웃만 | ❌ 비즈니스 로직, API 호출 |
| `components/` | UI 렌더링, 이벤트 처리 | ❌ 직접 API 호출, 복잡한 계산 |
| `lib/` | 비즈니스 로직, 데이터 처리 | ❌ React 컴포넌트, JSX |
| `types/` | 타입 정의만 | ❌ 구현 코드, 함수 |
| `constants/` | 상수 정의만 | ❌ 동적 값, 함수 |

**잘못된 예 (바이브 코딩)**:
```tsx
// ❌ components/calendar/YearlyCalendar.tsx
export function YearlyCalendar() {
  // 비즈니스 로직이 컴포넌트에 직접 들어감
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i, 1);
    const days = new Date(2025, i + 1, 0).getDate();
    // ...복잡한 계산
  });

  return <div>{/* ... */}</div>;
}
```

**올바른 예**:
```tsx
// ✅ lib/calendar/generator.ts
export function generateYearlyCalendar(year: number): Month[] {
  // 비즈니스 로직은 lib에
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    days: getDaysInMonth(year, i),
    // ...
  }));
}

// ✅ components/calendar/YearlyCalendar.tsx
export function YearlyCalendar({ year }: Props) {
  // 컴포넌트는 UI만
  const months = generateYearlyCalendar(year);
  return <div>{months.map(m => <MonthGrid key={m.month} {...m} />)}</div>;
}
```

---

## 🎯 타입 정의 규칙 (One Source of Truth)

### ✅ 규칙 2: 모든 타입은 `types/` 폴더에만

**잘못된 예**:
```typescript
// ❌ components/calendar/YearlyCalendar.tsx
interface CalendarProps {  // 여기에 타입 정의하지 말 것!
  year: number;
  type: 'yearly' | 'monthly';
}

// ❌ lib/calendar/generator.ts
type CalendarType = 'yearly' | 'monthly';  // 중복 정의!
```

**올바른 예**:
```typescript
// ✅ types/calendar.ts (단일 진실 공급원)
export type CalendarType = 'yearly' | 'monthly' | 'quarterly';

export interface CalendarConfig {
  year: number;
  type: CalendarType;
  countries: Country[];
  paperSize: PaperSize;
  orientation: Orientation;
  weekStart: WeekStart;
  ecoMode: boolean;
  showLunar: boolean;
  showWeekNumber: boolean;
}

export interface Month {
  month: number;
  days: Day[];
  holidays: Holiday[];
}

export interface Day {
  date: Date;
  isWeekend: boolean;
  isHoliday: boolean;
  isToday: boolean;
}
```

### ✅ 규칙 3: Zod로 런타임 검증

```typescript
// types/calendar.ts
import { z } from 'zod';

export const CalendarConfigSchema = z.object({
  year: z.number().min(2020).max(2030),
  type: z.enum(['yearly', 'monthly', 'quarterly']),
  countries: z.array(z.enum(['KR', 'US', 'JP', 'CN'])),
  paperSize: z.enum(['A4', 'A3']),
  orientation: z.enum(['portrait', 'landscape']),
  weekStart: z.enum(['sunday', 'monday']),
  ecoMode: z.boolean(),
  showLunar: z.boolean(),
  showWeekNumber: z.boolean(),
});

export type CalendarConfig = z.infer<typeof CalendarConfigSchema>;
```

---

## 🔢 상수 관리 (매직 값 금지)

### ✅ 규칙 4: 모든 매직 값은 `constants/`로

**잘못된 예**:
```typescript
// ❌ 매직 값 직접 사용
if (year < 2020 || year > 2030) {
  throw new Error('Invalid year');
}

const defaultConfig = {
  paperSize: 'A4',  // 문자열 리터럴 반복
  orientation: 'portrait',
};
```

**올바른 예**:
```typescript
// ✅ constants/calendar.ts
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

export const DEFAULT_CONFIG: CalendarConfig = {
  year: new Date().getFullYear(),
  type: 'yearly',
  countries: ['KR'],
  paperSize: PAPER_SIZES.A4,
  orientation: ORIENTATIONS.PORTRAIT,
  weekStart: 'monday',
  ecoMode: false,
  showLunar: false,
  showWeekNumber: false,
};

// ✅ 사용
import { YEAR_RANGE } from '@/constants/calendar';

if (year < YEAR_RANGE.MIN || year > YEAR_RANGE.MAX) {
  throw new Error(`Year must be between ${YEAR_RANGE.MIN} and ${YEAR_RANGE.MAX}`);
}
```

---

## 🎨 컴포넌트 작성 규칙

### ✅ 규칙 5: 단일 책임 원칙

**잘못된 예**:
```tsx
// ❌ UI + 로직 + API 호출이 한 컴포넌트에
export function CalendarPage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    // API 호출이 컴포넌트에 직접
    fetch('/api/holidays')
      .then(res => res.json())
      .then(setHolidays);
  }, []);

  // 복잡한 계산이 컴포넌트에
  const calendarData = useMemo(() => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      // 100줄의 로직...
    }
    return months;
  }, [config]);

  return (
    <div>
      {/* 200줄의 JSX */}
    </div>
  );
}
```

**올바른 예**:
```tsx
// ✅ lib/holidays/provider.ts (데이터 레이어)
export async function getHolidays(year: number, countries: Country[]): Promise<Holiday[]> {
  // API 호출 로직
}

// ✅ hooks/useCalendar.ts (로직 레이어)
export function useCalendar(config: CalendarConfig) {
  const months = useMemo(
    () => generateYearlyCalendar(config.year),
    [config.year]
  );

  const holidays = useMemo(
    () => getHolidays(config.year, config.countries),
    [config.year, config.countries]
  );

  return { months, holidays };
}

// ✅ components/calendar/CalendarPage.tsx (UI 레이어)
export function CalendarPage() {
  const [config, setConfig] = useSettings();
  const { months, holidays } = useCalendar(config);

  return (
    <div>
      <SettingsPanel config={config} onChange={setConfig} />
      <YearlyCalendar months={months} holidays={holidays} />
    </div>
  );
}
```

### ✅ 규칙 6: Props 타입은 명시적으로

```typescript
// ✅ 컴포넌트 Props는 명시적 인터페이스
interface YearlyCalendarProps {
  months: Month[];
  holidays: Holiday[];
  ecoMode?: boolean;
  onDayClick?: (date: Date) => void;
}

export function YearlyCalendar({
  months,
  holidays,
  ecoMode = false,
  onDayClick,
}: YearlyCalendarProps) {
  // ...
}
```

---

## 🛡️ 에러 처리 규칙

### ✅ 규칙 7: any 금지, 에러는 명시적으로

**잘못된 예**:
```typescript
// ❌ any 남발
function parseConfig(data: any): any {
  return data;  // 타입 체크 없음
}

// ❌ 에러 무시
try {
  const config = parseConfig(data);
} catch (e) {
  console.log(e);  // 에러 로그만 찍고 무시
}
```

**올바른 예**:
```typescript
// ✅ 명시적 타입 + Zod 검증
function parseConfig(data: unknown): CalendarConfig {
  const result = CalendarConfigSchema.safeParse(data);

  if (!result.success) {
    throw new ConfigValidationError(
      'Invalid calendar configuration',
      result.error.errors
    );
  }

  return result.data;
}

// ✅ 에러 처리
try {
  const config = parseConfig(data);
} catch (error) {
  if (error instanceof ConfigValidationError) {
    // 사용자에게 친절한 메시지
    toast.error(`설정 오류: ${error.message}`);
    // 로깅
    logger.error('Config validation failed', { error });
  } else {
    // 예상치 못한 에러
    toast.error('알 수 없는 오류가 발생했습니다.');
    logger.error('Unexpected error', { error });
  }
}
```

### ✅ 규칙 8: 커스텀 에러 클래스

```typescript
// lib/errors.ts
export class CalendarError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'CalendarError';
  }
}

export class ConfigValidationError extends CalendarError {
  constructor(message: string, public validationErrors: unknown[]) {
    super(message, 'CONFIG_VALIDATION_ERROR', validationErrors);
  }
}

export class HolidayFetchError extends CalendarError {
  constructor(message: string, public country: Country) {
    super(message, 'HOLIDAY_FETCH_ERROR', { country });
  }
}
```

---

## 🔄 Shared 컴포넌트/유틸 관리

### ✅ 규칙 9: 중복 코드는 즉시 공통화

**잘못된 예**:
```tsx
// ❌ 같은 로직이 여러 파일에 복제됨
// components/calendar/YearlyCalendar.tsx
function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// components/settings/DatePicker.tsx
function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
```

**올바른 예**:
```typescript
// ✅ lib/utils/date.ts (공통 유틸)
export function formatDate(date: Date, format: 'ISO' | 'KR' = 'ISO'): string {
  if (format === 'KR') {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  }
  return date.toISOString().split('T')[0];
}

// ✅ 모든 곳에서 재사용
import { formatDate } from '@/lib/utils/date';
```

### ✅ 규칙 10: 3번 반복되면 공통화

1. 같은 코드가 2곳에서 발견 → 일단 복사 (나중에 판단)
2. 3곳에서 발견 → **즉시 공통 유틸/컴포넌트로 추출**
3. 공통화 후 이전 코드 삭제

---

## 🎨 스타일링 규칙

### ✅ 규칙 11: Tailwind CSS 우선, 커스텀은 최소화

**잘못된 예**:
```tsx
// ❌ 인라인 스타일
<div style={{ width: '210mm', height: '297mm', padding: '20px' }}>
  ...
</div>

// ❌ CSS-in-JS
const StyledDiv = styled.div`
  width: 210mm;
  height: 297mm;
  padding: 20px;
`;
```

**올바른 예**:
```tsx
// ✅ Tailwind CSS 클래스
<div className="w-[210mm] h-[297mm] p-5">
  ...
</div>

// ✅ 재사용되는 스타일은 컴포넌트로
// components/shared/A4Page.tsx
export function A4Page({ children, orientation = 'portrait' }: Props) {
  return (
    <div className={cn(
      'w-[210mm] h-[297mm] p-5 bg-white',
      orientation === 'landscape' && 'w-[297mm] h-[210mm]'
    )}>
      {children}
    </div>
  );
}
```

### ✅ 규칙 12: 프린트 CSS는 별도 파일

```css
/* styles/print.css */
@media print {
  /* 광고 숨김 */
  .no-print {
    display: none !important;
  }

  /* 페이지 나누기 */
  .page-break {
    page-break-after: always;
  }

  /* 배경색 출력 강제 */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* A4 크기 고정 */
  @page {
    size: A4;
    margin: 0;
  }
}
```

---

## 📝 네이밍 규칙

### ✅ 규칙 13: 명확하고 일관된 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `YearlyCalendar`, `SettingsPanel` |
| 함수 | camelCase, 동사로 시작 | `generateCalendar`, `formatDate` |
| 타입/인터페이스 | PascalCase | `CalendarConfig`, `Holiday` |
| 상수 | UPPER_SNAKE_CASE | `DEFAULT_CONFIG`, `YEAR_RANGE` |
| 훅 | `use-` 접두사 | `useCalendar`, `useSettings` |
| 파일명 | kebab-case | `yearly-calendar.tsx`, `url-params.ts` |

---

## 🧪 테스트 작성 규칙

### ✅ 규칙 14: 비즈니스 로직은 필수 테스트

```typescript
// lib/calendar/generator.test.ts
describe('generateYearlyCalendar', () => {
  it('should generate 12 months for a year', () => {
    const result = generateYearlyCalendar(2025);
    expect(result).toHaveLength(12);
  });

  it('should handle leap year correctly', () => {
    const result = generateMonthlyCalendar(2024, 2);
    expect(result.days).toHaveLength(29);
  });
});
```

---

## 📚 주석 규칙

### ✅ 규칙 15: 코드로 설명 불가능한 것만 주석

**잘못된 예**:
```typescript
// ❌ 불필요한 주석
// 날짜를 포맷팅하는 함수
function formatDate(date: Date) {
  // 연도를 가져옴
  const year = date.getFullYear();
  // 월을 가져옴 (0부터 시작하므로 +1)
  const month = date.getMonth() + 1;
  // ...
}
```

**올바른 예**:
```typescript
// ✅ "왜"를 설명하는 주석만
function calculateEasterSunday(year: number): Date {
  // Computus 알고리즘 사용 (부활절 계산)
  // https://en.wikipedia.org/wiki/Computus
  const a = year % 19;
  const b = Math.floor(year / 100);
  // ...
}
```

---

## 🔍 코드 리뷰 체크리스트

### PR 올리기 전 자가 점검

- [ ] 레이어 분리 준수 (app, components, lib 역할 명확)
- [ ] 타입 정의가 `types/`에만 존재
- [ ] 매직 값 없음 (모두 `constants/`로 이동)
- [ ] 에러 처리 명시적 (try-catch, 커스텀 에러)
- [ ] any 사용 0개
- [ ] 중복 코드 0개 (3회 반복 시 공통화)
- [ ] Tailwind CSS 우선 사용
- [ ] 테스트 작성 (비즈니스 로직)
- [ ] ESLint 에러 0개
- [ ] TypeScript 컴파일 에러 0개

---

## 🚀 자동화 도구

### ESLint 설정 (필수)

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": ["warn", { "allow": ["error"] }],
    "prefer-const": "error"
  }
}
```

### Git Hooks (Husky)

```bash
# .husky/pre-commit
npm run lint
npm run type-check
```

---

## 📖 참고 문서

- [SHARED_COMPONENTS.md](./SHARED_COMPONENTS.md) - 공통 컴포넌트 목록
- [plans/FINAL_ROADMAP.md](./plans/FINAL_ROADMAP.md) - 프로젝트 로드맵
- [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) - Git 브랜치 전략

---

**마지막 업데이트**: 2025-11-29

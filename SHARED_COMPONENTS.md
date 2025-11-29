# Shared Components - Lostvin Calendar

> **목적**: 재사용 가능한 컴포넌트 및 유틸리티 중앙 관리
>
> **규칙**: 3번 반복되면 즉시 공통화, 여기에 등록

---

## 📦 UI 컴포넌트 (`components/ui/`)

### 기본 UI (shadcn/ui 기반)

| 컴포넌트 | 경로 | 용도 | 사용 예시 |
|---------|------|------|-----------|
| `Button` | `components/ui/button.tsx` | 버튼 | PDF 다운로드, 설정 저장 |
| `Input` | `components/ui/input.tsx` | 텍스트 입력 | 메모 입력, 제목 입력 |
| `Select` | `components/ui/select.tsx` | 드롭다운 선택 | 연도 선택, 국가 선택 |
| `Switch` | `components/ui/switch.tsx` | 토글 스위치 | Eco 모드, 음력 표시 |
| `Checkbox` | `components/ui/checkbox.tsx` | 체크박스 | 국가 다중 선택 |
| `Label` | `components/ui/label.tsx` | 라벨 | 폼 라벨 |
| `Card` | `components/ui/card.tsx` | 카드 컨테이너 | 설정 섹션 |
| `Tabs` | `components/ui/tabs.tsx` | 탭 | 달력 유형 선택 |
| `Toast` | `components/ui/toast.tsx` | 알림 | 성공/에러 메시지 |
| `Dialog` | `components/ui/dialog.tsx` | 모달 | 공유 모달 |

### 설치 방법

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input select switch checkbox label card tabs toast dialog
```

---

## 🎨 공통 레이아웃 컴포넌트 (`components/shared/`)

### 1. A4Page

**경로**: `components/shared/A4Page.tsx`

**용도**: A4 크기 페이지 컨테이너

```tsx
interface A4PageProps {
  children: React.ReactNode;
  orientation?: 'portrait' | 'landscape';
  padding?: boolean;
}

export function A4Page({
  children,
  orientation = 'portrait',
  padding = true,
}: A4PageProps) {
  return (
    <div
      className={cn(
        'bg-white shadow-lg',
        orientation === 'portrait' ? 'w-[210mm] h-[297mm]' : 'w-[297mm] h-[210mm]',
        padding && 'p-5'
      )}
    >
      {children}
    </div>
  );
}
```

**사용 예시**:
```tsx
<A4Page orientation="landscape">
  <YearlyCalendar year={2025} />
</A4Page>
```

---

### 2. PageBreak

**경로**: `components/shared/PageBreak.tsx`

**용도**: 프린트 시 페이지 나누기

```tsx
export function PageBreak() {
  return <div className="page-break" />;
}
```

**사용 예시**:
```tsx
<MonthlyCalendar month={1} />
<PageBreak />
<MonthlyCalendar month={2} />
```

---

### 3. LoadingSpinner

**경로**: `components/shared/LoadingSpinner.tsx`

**용도**: 로딩 인디케이터

```tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-blue-600', sizeClasses[size])} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}
```

---

### 4. ErrorBoundary

**경로**: `components/shared/ErrorBoundary.tsx`

**용도**: 에러 캐치 및 폴백 UI

```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error?: Error }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-red-600">오류가 발생했습니다</h2>
          <p className="text-sm text-gray-600">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

### 5. ShareButton

**경로**: `components/shared/ShareButton.tsx`

**용도**: URL 복사 및 카카오톡 공유

```tsx
interface ShareButtonProps {
  url: string;
  title?: string;
  variant?: 'copy' | 'kakao';
}

export function ShareButton({ url, title = '달력 공유', variant = 'copy' }: ShareButtonProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('링크가 복사되었습니다!');
  };

  const handleKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          imageUrl: 'https://yoursite.com/og-image.png',
          link: { mobileWebUrl: url, webUrl: url },
        },
      });
    }
  };

  if (variant === 'kakao') {
    return (
      <Button onClick={handleKakao} className="bg-yellow-400 text-black">
        <KakaoIcon /> 카카오톡 공유
      </Button>
    );
  }

  return (
    <Button onClick={handleCopy} variant="outline">
      <CopyIcon /> 링크 복사
    </Button>
  );
}
```

---

## 🛠️ 유틸리티 함수 (`lib/utils/`)

### 1. 날짜 관련

**경로**: `lib/utils/date.ts`

```typescript
/**
 * 날짜를 포맷팅합니다
 */
export function formatDate(date: Date, format: 'ISO' | 'KR' | 'US' = 'ISO'): string {
  switch (format) {
    case 'KR':
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    case 'US':
      return date.toLocaleDateString('en-US');
    default:
      return date.toISOString().split('T')[0];
  }
}

/**
 * 해당 월의 일수를 반환합니다
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 윤년 여부를 확인합니다
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 주차 번호를 계산합니다 (ISO 8601)
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * 오늘 날짜인지 확인합니다
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * 주말 여부를 확인합니다
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}
```

---

### 2. URL 파라미터

**경로**: `lib/utils/url-params.ts`

```typescript
import { CalendarConfig } from '@/types/calendar';

/**
 * 설정을 URL 파라미터로 인코딩합니다
 */
export function encodeConfig(config: CalendarConfig): string {
  const params = new URLSearchParams({
    year: config.year.toString(),
    type: config.type,
    countries: config.countries.join(','),
    paper: config.paperSize,
    orient: config.orientation,
    start: config.weekStart,
    eco: config.ecoMode ? '1' : '0',
    lunar: config.showLunar ? '1' : '0',
    week: config.showWeekNumber ? '1' : '0',
  });

  return params.toString();
}

/**
 * URL 파라미터를 설정으로 디코딩합니다
 */
export function decodeConfig(params: URLSearchParams): Partial<CalendarConfig> {
  return {
    year: params.get('year') ? parseInt(params.get('year')!) : undefined,
    type: (params.get('type') as CalendarType) || undefined,
    countries: params.get('countries')?.split(',') as Country[] || undefined,
    paperSize: (params.get('paper') as PaperSize) || undefined,
    orientation: (params.get('orient') as Orientation) || undefined,
    weekStart: (params.get('start') as WeekStart) || undefined,
    ecoMode: params.get('eco') === '1',
    showLunar: params.get('lunar') === '1',
    showWeekNumber: params.get('week') === '1',
  };
}

/**
 * 전체 공유 URL을 생성합니다
 */
export function generateShareUrl(config: CalendarConfig, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const params = encodeConfig(config);
  return `${base}?${params}`;
}
```

---

### 3. 검증

**경로**: `lib/utils/validators.ts`

```typescript
import { YEAR_RANGE } from '@/constants/calendar';

/**
 * 유효한 연도인지 확인합니다
 */
export function isValidYear(year: number): boolean {
  return year >= YEAR_RANGE.MIN && year <= YEAR_RANGE.MAX;
}

/**
 * 유효한 월인지 확인합니다 (1-12)
 */
export function isValidMonth(month: number): boolean {
  return month >= 1 && month <= 12;
}

/**
 * 유효한 날짜인지 확인합니다
 */
export function isValidDate(year: number, month: number, day: number): boolean {
  if (!isValidYear(year) || !isValidMonth(month)) return false;
  const daysInMonth = getDaysInMonth(year, month - 1);
  return day >= 1 && day <= daysInMonth;
}
```

---

### 4. 클래스 네임 유틸

**경로**: `lib/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스를 머지합니다
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🎣 Custom Hooks (`hooks/`)

### 1. useLocalStorage

**경로**: `hooks/useLocalStorage.ts`

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
```

---

### 2. useSettings

**경로**: `hooks/useSettings.ts`

```typescript
import { DEFAULT_CONFIG } from '@/constants/calendar';
import { CalendarConfig } from '@/types/calendar';
import { useLocalStorage } from './useLocalStorage';

export function useSettings() {
  const [config, setConfig] = useLocalStorage<CalendarConfig>(
    'calendar-config',
    DEFAULT_CONFIG
  );

  return [config, setConfig] as const;
}
```

---

### 3. useCalendar

**경로**: `hooks/useCalendar.ts`

```typescript
import { useMemo } from 'react';
import { CalendarConfig } from '@/types/calendar';
import { generateYearlyCalendar, generateMonthlyCalendar } from '@/lib/calendar/generator';

export function useCalendar(config: CalendarConfig) {
  const months = useMemo(() => {
    if (config.type === 'yearly') {
      return generateYearlyCalendar(config.year);
    } else {
      return [generateMonthlyCalendar(config.year, new Date().getMonth())];
    }
  }, [config.year, config.type]);

  return { months };
}
```

---

### 4. useHolidays

**경로**: `hooks/useHolidays.ts`

```typescript
import { useMemo } from 'react';
import { Country } from '@/types/calendar';
import { getHolidays } from '@/lib/holidays/provider';

export function useHolidays(year: number, countries: Country[]) {
  const holidays = useMemo(
    () => getHolidays(year, countries),
    [year, countries]
  );

  return holidays;
}
```

---

## 📋 컴포넌트 사용 예시

### 전체 플로우

```tsx
// app/page.tsx
import { A4Page } from '@/components/shared/A4Page';
import { YearlyCalendar } from '@/components/calendar/YearlyCalendar';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { ShareButton } from '@/components/shared/ShareButton';
import { useSettings } from '@/hooks/useSettings';
import { useCalendar } from '@/hooks/useCalendar';
import { useHolidays } from '@/hooks/useHolidays';
import { generateShareUrl } from '@/lib/utils/url-params';

export default function HomePage() {
  const [config, setConfig] = useSettings();
  const { months } = useCalendar(config);
  const holidays = useHolidays(config.year, config.countries);
  const shareUrl = generateShareUrl(config);

  return (
    <div className="container mx-auto p-4">
      <SettingsPanel config={config} onChange={setConfig} />

      <div className="flex justify-end gap-2 my-4 no-print">
        <ShareButton url={shareUrl} variant="copy" />
        <ShareButton url={shareUrl} variant="kakao" />
        <Button onClick={() => window.print()}>인쇄하기</Button>
      </div>

      <A4Page orientation={config.orientation}>
        <YearlyCalendar
          months={months}
          holidays={holidays}
          ecoMode={config.ecoMode}
        />
      </A4Page>
    </div>
  );
}
```

---

## 🔄 공통화 프로세스

### 새로운 공통 컴포넌트/유틸 추가 시

1. **파일 생성**: 적절한 폴더에 파일 생성
   - UI 컴포넌트 → `components/ui/`
   - 공통 레이아웃 → `components/shared/`
   - 유틸리티 → `lib/utils/`
   - 훅 → `hooks/`

2. **이 문서에 등록**: 위 섹션에 추가
   - 경로, 용도, 코드 예시 포함

3. **기존 코드 마이그레이션**: 중복 코드 삭제하고 공통 컴포넌트 사용

4. **테스트 작성**: `__tests__/` 폴더에 테스트 추가

---

## 📚 참고

- [CODING_STANDARDS.md](./CODING_STANDARDS.md) - 코딩 표준
- [shadcn/ui 문서](https://ui.shadcn.com/) - UI 컴포넌트 라이브러리

**마지막 업데이트**: 2025-11-29

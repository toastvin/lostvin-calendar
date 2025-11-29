# Week 2 진행 상황

> **기간**: 2025-11-30
> **목표**: 달력 렌더링 엔진 구현

---

## 완료한 작업

### 1. 달력 생성 로직 구현 ✅

**파일**: [src/lib/calendar/generator.ts](../src/lib/calendar/generator.ts)

구현된 함수:
- `generateYearlyCalendar()` - 12개월 달력 생성
- `generateMonthlyCalendar()` - 단일 월 달력 생성
- `isLeapYear()` - 윤년 확인
- `getDaysInMonth()` - 월별 일수 계산 (윤년 처리)
- `getWeekNumber()` - ISO 8601 주차 계산
- `adjustDayOfWeek()` - 주 시작 요일 조정 (일요일/월요일)
- `isWeekend()` - 주말 여부 확인
- `getCalendarGrid()` - 그리드 렌더링용 앞뒤 빈 칸 계산
- `getMonthName()` - 월 이름 한국어 반환
- `getWeekdayNames()` - 요일 이름 배열 반환

**핵심 로직**:
- 윤년 처리: `(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0`
- ISO 8601 주차: 1월 4일이 포함된 주가 1주차
- 주 시작 요일 대응: 일요일/월요일 선택 가능

---

### 2. UI 컴포넌트 구현 ✅

#### DayCell 컴포넌트
**파일**: [src/components/calendar/DayCell.tsx](../src/components/calendar/DayCell.tsx)

기능:
- 날짜 번호 표시
- 오늘 날짜 하이라이트 (파란색 배경 + 링)
- 주말 표시 (파란색 텍스트)
- 공휴일 표시 (빨간색 텍스트 + 작은 점)
- 주차 번호 표시 (왼쪽 상단, 월요일 셀에만)
- 컴팩트 모드 지원 (A4 용지용)

#### MonthlyCalendar 컴포넌트
**파일**: [src/components/calendar/MonthlyCalendar.tsx](../src/components/calendar/MonthlyCalendar.tsx)

기능:
- 7일 그리드 레이아웃
- 요일 헤더 (한국어)
- 월 이름 제목 (1월~12월)
- 앞뒤 빈 칸 자동 계산 및 렌더링
- 주말 요일 헤더 색상 구분
- 프린트 최적화 (border, spacing)

#### YearlyCalendar 컴포넌트
**파일**: [src/components/calendar/YearlyCalendar.tsx](../src/components/calendar/YearlyCalendar.tsx)

기능:
- 12개월 그리드 레이아웃
- A4/A3 용지 크기 대응
- 세로/가로 방향 대응
- 자동 컬럼 계산:
  - A4 세로: 3x4 그리드 (컴팩트)
  - A4 가로: 4x3 그리드 (컴팩트)
  - A3: 여유 있는 레이아웃
- 프린트 최적화:
  - `@page` 설정 (size, margin)
  - Gowun Batang 폰트 적용
  - 페이지 나누기 방지

---

### 3. 상태 관리 훅 구현 ✅

**파일**: [src/hooks/useCalendar.ts](../src/hooks/useCalendar.ts)

기능:
- 달력 데이터 자동 생성
- `useMemo`를 통한 메모이제이션
- `CalendarConfig` 기반 설정 반영
- yearly/monthly 타입 대응

---

### 4. 테스트 페이지 구현 ✅

**파일**: [src/app/test-calendar/page.tsx](../src/app/test-calendar/page.tsx)

기능:
- 연도 선택 (2024, 2025, 2028 - 윤년 포함)
- 주 시작 요일 선택 (일요일/월요일)
- 주차 번호 표시 토글
- 실시간 달력 렌더링
- 프린트 미리보기 안내

**검증 항목**:
- ✅ 2024년 2월 29일 표시 (윤년)
- ✅ 2025년 2월 28일까지 표시
- ✅ 주 시작 요일 변경 시 그리드 변화
- ✅ 오늘 날짜 하이라이트
- ✅ 주말 색상 구분
- ✅ 주차 번호 표시

---

## 생성/수정된 파일

### 새로 생성된 파일
1. `src/lib/calendar/generator.ts` - 달력 생성 로직 (213줄)
2. `src/components/calendar/DayCell.tsx` - 날짜 셀 컴포넌트
3. `src/components/calendar/MonthlyCalendar.tsx` - 월간 달력 컴포넌트
4. `src/components/calendar/YearlyCalendar.tsx` - 연간 달력 컴포넌트
5. `src/hooks/useCalendar.ts` - 달력 상태 관리 훅
6. `src/app/test-calendar/page.tsx` - 달력 테스트 페이지
7. `phases/week-2-progress.md` - 이 문서

### 수정된 파일
없음 (기존 타입 및 상수 재사용)

---

## Week 2 완료 기준 달성

| 항목 | 상태 | 비고 |
|------|------|------|
| generateYearlyCalendar() 구현 | ✅ | 12개월 달력 생성 |
| generateMonthlyCalendar() 구현 | ✅ | 단일 월 달력 생성 |
| 윤년 처리 | ✅ | 2024, 2028 검증 완료 |
| 주 시작 요일 대응 | ✅ | 일요일/월요일 선택 가능 |
| ISO 8601 주차 계산 | ✅ | 1월 4일 기준 |
| YearlyCalendar 컴포넌트 | ✅ | A4/A3 레이아웃 대응 |
| MonthlyCalendar 컴포넌트 | ✅ | 7일 그리드 |
| DayCell 컴포넌트 | ✅ | 날짜 셀 렌더링 |
| useCalendar 훅 | ✅ | 상태 관리 + 메모이제이션 |
| A4/A3 레이아웃 | ✅ | 세로/가로 방향 대응 |
| 프린트 최적화 | ✅ | @page 설정 |
| Gowun Batang 폰트 | ✅ | 프린트 시 적용 |
| pnpm build 성공 | ✅ | 모든 페이지 Static 렌더링 |
| TypeScript 에러 0개 | ✅ | pnpm type-check 통과 |

---

## 기술 세부사항

### 윤년 로직
```typescript
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
```
- 4로 나누어떨어지고 100으로 나누어떨어지지 않거나
- 400으로 나누어떨어지는 경우

### ISO 8601 주차 계산
```typescript
function getWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7; // 월요일 = 0
  target.setDate(target.getDate() - dayNr + 3); // 목요일로 이동
  const jan4 = new Date(target.getFullYear(), 0, 4);
  const dayDiff = (target.valueOf() - jan4.valueOf()) / 86400000;
  return 1 + Math.ceil(dayDiff / 7);
}
```
- 주는 월요일부터 시작
- 1월 4일이 포함된 주가 1주차

### 그리드 레이아웃
- **A4 세로**: 3x4 그리드 (3열 × 4행) - 컴팩트
- **A4 가로**: 4x3 그리드 (4열 × 3행) - 컴팩트
- **A3 세로**: 3x4 그리드 - 여유
- **A3 가로**: 4x3 그리드 - 여유

### 메모이제이션
`useCalendar` 훅에서 `useMemo`를 사용하여 불필요한 재계산 방지:
- 의존성: `year`, `type`, `weekStart`, `showWeekNumber`

---

## 테스트 결과

### 윤년 테스트
- ✅ 2024년 2월 29일 표시됨
- ✅ 2025년 2월 28일까지 표시됨
- ✅ 2028년 2월 29일 표시됨

### 주 시작 요일 테스트
- ✅ 일요일 시작: 일~토 순서
- ✅ 월요일 시작: 월~일 순서
- ✅ 그리드 앞뒤 빈 칸 정확

### 주차 번호 테스트
- ✅ ISO 8601 표준 준수
- ✅ 월요일 셀 왼쪽 상단에 표시
- ✅ 1월 4일이 포함된 주가 1주차

### 프린트 테스트
- ✅ A4 세로 용지에 12개월 한 페이지 렌더링
- ✅ Gowun Batang 폰트 적용됨 (CSS `@media print`)
- ✅ 테두리 선명하게 표시
- ✅ 페이지 나누기 방지 (`break-inside-avoid`)

---

## 코딩 표준 준수

### 레이어 분리 ✅
- **lib/calendar/generator.ts**: 순수 비즈니스 로직 (React 미사용)
- **components/calendar/**: UI 컴포넌트 (비즈니스 로직 미포함)
- **hooks/useCalendar.ts**: 상태 관리 (lib/ 로직 활용)

### 타입 안정성 ✅
- 모든 함수 파라미터 타입 명시
- `types/calendar.ts`에서 타입 임포트
- `any` 타입 사용 없음
- pnpm type-check 통과

### 매직 값 제거 ✅
- 요일 이름: `getWeekdayNames()` 함수
- 월 이름: `getMonthName()` 함수
- 레이아웃 설정: props로 전달

### 컴포넌트화 ✅
- DayCell → MonthlyCalendar → YearlyCalendar 계층 구조
- 재사용 가능한 단위로 분리
- Props 인터페이스 명시

---

## 다음 작업 (Week 3)

Week 3에서는 공휴일 통합 및 설정 패널을 구현합니다:

- [ ] lib/holidays/ 확장 - 공휴일 데이터 캐싱
- [ ] components/settings/SettingsPanel.tsx - 설정 UI
- [ ] components/settings/CountrySelector.tsx - 국가 선택
- [ ] hooks/useSettings.ts - 설정 상태 관리
- [ ] hooks/useHolidays.ts - 공휴일 데이터 관리
- [ ] 달력에 공휴일 병합 로직
- [ ] 공휴일 이름 툴팁 표시

---

## 기술 스택 (확정)

### 프레임워크 & 라이브러리
- Next.js: 16.0.5 (Turbopack)
- React: 19.2.0
- TypeScript: 5.9.3

### UI & 스타일
- Tailwind CSS: 4.1.17
- Gowun Batang (명조체, 프린트용)

### 달력 & PDF
- @react-pdf/renderer: 4.3.1
- date-fns: 4.1.0 (Week 3에서 활용 예정)
- date-holidays: 3.26.5 (Week 3에서 통합 예정)

### 유틸리티
- zod: 4.1.13
- zustand: 5.0.8

---

**작성일**: 2025-11-30
**작성자**: Claude (AI Assistant)

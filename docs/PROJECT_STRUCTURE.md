# 프로젝트 구조 문서

> **목적**: Lostvin Calendar 프로젝트의 폴더 및 파일 구조 설명
> **작성일**: 2025-11-29
> **버전**: 1.0

---

## 📁 전체 구조 개요

```
just-calendar/
├── .claude/                    # Claude Code 설정
│   └── commands/              # 슬래시 커맨드
├── docs/                      # 프로젝트 문서
│   ├── TECH_VALIDATION.md    # 기술 검증 결과
│   ├── WEEK0_CHECKLIST.md    # Week 0 체크리스트
│   └── PROJECT_STRUCTURE.md  # 이 문서
├── phases/                    # Week별 진행 상황
│   └── week-0-progress.md    # Week 0 진행 기록
├── plans/                     # 프로젝트 계획
│   └── FINAL_ROADMAP.md      # 8주 개발 로드맵
├── schemas/                   # 데이터 스키마
│   └── calendar-config.schema.ts
├── templates/                 # 문서 템플릿
│   └── week_progress_template.md
├── src/                       # 소스 코드 (메인)
│   ├── app/                  # Next.js App Router
│   ├── components/           # React 컴포넌트
│   ├── lib/                  # 비즈니스 로직
│   ├── types/                # TypeScript 타입
│   ├── constants/            # 상수 정의
│   ├── hooks/                # Custom Hooks
│   └── styles/               # 스타일 파일
├── CODING_STANDARDS.md       # 코딩 표준
├── SHARED_COMPONENTS.md      # 공통 컴포넌트 목록
├── GIT_WORKFLOW.md           # Git 브랜치 전략
├── WORK_CHECKLIST.md         # 작업 체크리스트
├── package.json              # 패키지 설정
├── tsconfig.json             # TypeScript 설정
├── next.config.ts            # Next.js 설정
├── tailwind.config.ts        # Tailwind CSS 설정
└── eslint.config.mjs         # ESLint 설정
```

---

## 🎯 src/ 폴더 상세 구조

### 1. app/ - Next.js App Router

> **역할**: 라우팅 및 페이지 레이아웃만 담당

```
src/app/
├── layout.tsx              # 루트 레이아웃
├── page.tsx               # 홈페이지 (/)
├── test-pdf/              # PDF 테스트 페이지
│   └── page.tsx
├── test-holidays/         # 공휴일 테스트 페이지
│   └── page.tsx
└── test-print/            # 프린트 테스트 페이지
    └── page.tsx
```

**규칙**:
- ❌ 비즈니스 로직 금지
- ❌ 직접 API 호출 금지
- ✅ 라우팅 및 레이아웃만
- ✅ 컴포넌트 조합만

---

### 2. components/ - UI 컴포넌트

> **역할**: UI 렌더링 및 이벤트 처리

```
src/components/
├── calendar/              # 달력 관련 컴포넌트
│   ├── YearlyCalendar.tsx    (Week 2 예정)
│   ├── MonthlyCalendar.tsx   (Week 2 예정)
│   └── DayCell.tsx           (Week 2 예정)
├── settings/              # 설정 패널
│   ├── SettingsPanel.tsx     (Week 3 예정)
│   └── CountrySelector.tsx   (Week 3 예정)
├── ui/                    # shadcn/ui 기반 공통 UI
│   ├── button.tsx            (Week 1 예정)
│   ├── input.tsx             (Week 1 예정)
│   └── select.tsx            (Week 1 예정)
└── shared/                # 프로젝트 공통 컴포넌트
    ├── Header.tsx            (Week 1 예정)
    ├── Footer.tsx            (Week 1 예정)
    ├── A4Page.tsx            (Week 2 예정)
    └── LoadingSpinner.tsx    (Week 1 예정)
```

**규칙**:
- ❌ 비즈니스 로직 금지
- ❌ 직접 API 호출 금지
- ✅ UI 렌더링만
- ✅ 이벤트 핸들러는 props로 받기

---

### 3. lib/ - 비즈니스 로직

> **역할**: 순수 비즈니스 로직 및 데이터 처리

```
src/lib/
├── calendar/              # 달력 생성 로직
│   ├── generator.ts          (Week 2 예정)
│   ├── formatter.ts          (Week 2 예정)
│   └── validator.ts          (Week 2 예정)
├── holidays/              # 공휴일 데이터
│   ├── provider.ts           ✅ 완료
│   └── cache.ts              (Week 3 예정)
├── pdf/                   # PDF 생성
│   ├── font-test.tsx         ✅ 완료
│   ├── generator.tsx         (Week 4 예정)
│   └── fonts.ts              (Week 4 예정)
├── storage/               # LocalStorage 관리
│   └── config.ts             (Week 7 예정)
└── utils/                 # 유틸리티 함수
    ├── url-params.ts         ✅ 완료
    ├── date.ts               (Week 2 예정)
    └── validators.ts         (Week 2 예정)
```

**규칙**:
- ❌ React 컴포넌트 금지
- ❌ JSX 사용 금지 (PDF 제외)
- ✅ 순수 함수만
- ✅ 테스트 가능한 코드

---

### 4. types/ - TypeScript 타입 정의

> **역할**: 타입 정의 (One Source of Truth)

```
src/types/
├── calendar.ts            ✅ 완료
│   ├── CalendarType
│   ├── PaperSize
│   ├── Orientation
│   ├── WeekStart
│   ├── Country
│   ├── CalendarConfig
│   ├── Month
│   └── Day
├── holiday.ts             (Week 3 예정)
└── config.ts              (Week 3 예정)
```

**규칙**:
- ✅ 타입 정의만
- ❌ 구현 코드 금지
- ❌ 함수 금지
- ✅ Zod 스키마 허용

---

### 5. constants/ - 상수 정의

> **역할**: 매직 값 제거 (매직 값 금지)

```
src/constants/
├── calendar.ts            ✅ 완료
│   ├── CURRENT_YEAR
│   ├── YEAR_RANGE
│   ├── PAPER_SIZES
│   ├── ORIENTATIONS
│   ├── WEEK_STARTS
│   ├── COUNTRIES
│   └── DEFAULT_CONFIG
├── countries.ts           (Week 3 예정)
└── defaults.ts            (Week 3 예정)
```

**규칙**:
- ✅ 상수 정의만
- ❌ 동적 값 금지
- ❌ 함수 금지
- ✅ `as const` 사용

---

### 6. hooks/ - Custom React Hooks

> **역할**: 상태 관리 및 재사용 로직

```
src/hooks/
├── useCalendar.ts         (Week 2 예정)
├── useSettings.ts         (Week 3 예정)
├── useLocalStorage.ts     (Week 7 예정)
└── useHolidays.ts         (Week 3 예정)
```

**규칙**:
- ✅ `use-` 접두사 필수
- ✅ React Hooks 규칙 준수
- ❌ 비즈니스 로직 포함 금지
- ✅ lib/에서 로직 가져오기

---

### 7. styles/ - 스타일 파일

> **역할**: 전역 스타일 및 특수 스타일

```
src/styles/
├── globals.css            ✅ 완료
└── print.css              ✅ 완료
```

**규칙**:
- ✅ Tailwind CSS 우선
- ✅ 전역 스타일만
- ❌ 컴포넌트 스타일 금지 (Tailwind 사용)

---

## 🎨 아키텍처 레이어

### 레이어 흐름도

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│   (app/, components/)               │
│   - 라우팅                          │
│   - UI 렌더링                       │
├─────────────────────────────────────┤
│         Business Logic Layer        │
│   (lib/, hooks/)                    │
│   - 달력 생성 로직                  │
│   - 공휴일 처리                     │
│   - URL 파라미터 처리               │
├─────────────────────────────────────┤
│         Data Layer                  │
│   (types/, constants/)              │
│   - 타입 정의                       │
│   - 상수 정의                       │
└─────────────────────────────────────┘
```

### 데이터 흐름

```
User Input (URL 파라미터)
  ↓
app/page.tsx (라우팅)
  ↓
hooks/useSettings.ts (상태 관리)
  ↓
lib/utils/url-params.ts (디코딩)
  ↓
CalendarConfig (types/calendar.ts)
  ↓
lib/calendar/generator.ts (비즈니스 로직)
  ↓
Month[] (types/calendar.ts)
  ↓
components/calendar/YearlyCalendar.tsx (UI)
  ↓
lib/pdf/generator.tsx (PDF 생성)
  ↓
Download / Print
```

---

## 📝 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `YearlyCalendar.tsx` |
| 함수 | camelCase, 동사로 시작 | `generateCalendar()` |
| 타입/인터페이스 | PascalCase | `CalendarConfig` |
| 상수 | UPPER_SNAKE_CASE | `DEFAULT_CONFIG` |
| 훅 | `use-` 접두사 | `useCalendar()` |
| 파일명 | kebab-case 또는 PascalCase | `url-params.ts` |

---

## 🔍 파일 찾기 가이드

### "달력 생성 로직을 찾고 싶어요"
→ `src/lib/calendar/generator.ts`

### "공휴일 데이터를 가져오는 코드는?"
→ `src/lib/holidays/provider.ts`

### "URL 파라미터를 처리하는 코드는?"
→ `src/lib/utils/url-params.ts`

### "달력 타입 정의는 어디에?"
→ `src/types/calendar.ts`

### "기본 설정값은 어디에?"
→ `src/constants/calendar.ts`

### "연간 달력 컴포넌트는?"
→ `src/components/calendar/YearlyCalendar.tsx` (Week 2 예정)

### "PDF 생성 로직은?"
→ `src/lib/pdf/generator.tsx` (Week 4 예정)

---

## 🚀 Week별 파일 추가 계획

### Week 1 (현재)
- ✅ 기본 구조 완성
- ✅ types/calendar.ts
- ✅ constants/calendar.ts
- ✅ lib/holidays/provider.ts
- ✅ lib/utils/url-params.ts

### Week 2
- lib/calendar/generator.ts
- components/calendar/YearlyCalendar.tsx
- components/calendar/MonthlyCalendar.tsx

### Week 3
- components/settings/SettingsPanel.tsx
- lib/holidays/cache.ts
- hooks/useHolidays.ts

### Week 4
- lib/pdf/generator.tsx
- lib/pdf/fonts.ts

### Week 5~8
- 추가 기능 및 최적화

---

## 📚 관련 문서

- [CODING_STANDARDS.md](../CODING_STANDARDS.md) - 코딩 표준
- [SHARED_COMPONENTS.md](../SHARED_COMPONENTS.md) - 공통 컴포넌트
- [GIT_WORKFLOW.md](../GIT_WORKFLOW.md) - Git 브랜치 전략
- [plans/FINAL_ROADMAP.md](../plans/FINAL_ROADMAP.md) - 개발 로드맵

---

**문서 버전**: 1.0
**최종 수정**: 2025-11-29

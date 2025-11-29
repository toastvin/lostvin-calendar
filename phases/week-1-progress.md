# Week 1 진행 상황

> **기간**: 2025-11-29
> **목표**: 개발 환경 및 아키텍처 기반 구축

---

## 완료한 작업

### 1. 프로젝트 구조 확정 ✅
- [x] 폴더 구조 생성 (Week 0에서 이미 완료)
  ```
  src/
  ├── app/         # Next.js App Router
  ├── components/  # UI 컴포넌트 (calendar, settings, ui, shared)
  ├── lib/         # 비즈니스 로직 (calendar, holidays, pdf, utils)
  ├── types/       # TypeScript 타입 정의
  ├── constants/   # 상수 정의
  ├── hooks/       # Custom Hooks
  └── styles/      # 스타일 파일
  ```

- [x] 프로젝트 구조 문서 작성
  - docs/PROJECT_STRUCTURE.md 생성
  - 각 폴더의 역할 및 규칙 명시
  - 레이어 아키텍처 설명
  - 데이터 흐름도 추가

### 2. 코딩 표준 수립 ✅
- [x] CODING_STANDARDS.md 존재 (Week 0에서 작성)
- [x] TypeScript strict 모드 활성화
- [x] ESLint 설정 완료
- [x] 레이어 분리 규칙 준수

### 3. 공통 타입 정의 ✅
- [x] types/calendar.ts 생성 완료 (Week 0)
  - CalendarType, PaperSize, Orientation, WeekStart, Country
  - CalendarConfig, Month, Day
  - CalendarConfigSchema (Zod 검증)

### 4. 상수 정의 ✅
- [x] constants/calendar.ts 생성 완료 (Week 0)
  - CURRENT_YEAR
  - YEAR_RANGE
  - PAPER_SIZES, ORIENTATIONS, WEEK_STARTS, COUNTRIES
  - DEFAULT_CONFIG

### 5. Git 브랜치 전략 확정 ✅
- [x] main 브랜치 (프로덕션)
- [x] develop 브랜치 (개발 통합)
- [x] feature/week-1-project-setup 브랜치 생성

### 6. 빌드 시스템 수정 ✅
- [x] Tailwind CSS 4 PostCSS 플러그인 설치
  - @tailwindcss/postcss 추가
  - postcss.config.mjs 업데이트

- [x] Next.js 16 Turbopack 설정
  - next.config.ts에 `turbopack: {}` 추가

- [x] @react-pdf/renderer SSR 비활성화
  - test-pdf 페이지에 dynamic import 적용
  - SSR 문제 해결

- [x] pnpm build 성공 ✅
  - 모든 페이지 정상 빌드
  - Static 페이지 생성 완료

---

## 생성된 파일

### 문서
- `docs/PROJECT_STRUCTURE.md` - 프로젝트 구조 문서

### 수정된 파일
- `next.config.ts` - Turbopack 설정 추가
- `postcss.config.mjs` - @tailwindcss/postcss 플러그인 적용
- `src/app/test-pdf/page.tsx` - dynamic import 적용
- `package.json` - @tailwindcss/postcss 추가

---

## Week 1 완료 기준 달성

| 항목 | 상태 | 비고 |
|------|------|------|
| pnpm build 성공 | ✅ | 모든 페이지 빌드 성공 |
| ESLint 에러 0개 | ✅ | 에러 없음 |
| TypeScript 컴파일 에러 0개 | ✅ | 에러 없음 |
| 프로젝트 구조 문서화 | ✅ | PROJECT_STRUCTURE.md 작성 |
| 코딩 표준 수립 | ✅ | CODING_STANDARDS.md 존재 |
| 타입 정의 | ✅ | types/calendar.ts 완성 |
| 상수 정의 | ✅ | constants/calendar.ts 완성 |

---

## 주요 해결 사항

### 1. Tailwind CSS 4 빌드 에러 해결
**문제**:
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package.
```

**해결**:
- @tailwindcss/postcss 패키지 설치
- postcss.config.mjs에서 플러그인 변경
  ```javascript
  plugins: {
    '@tailwindcss/postcss': {},  // tailwindcss → @tailwindcss/postcss
    autoprefixer: {},
  }
  ```

### 2. Next.js 16 Turbopack 경고 해결
**문제**:
```
ERROR: This build is using Turbopack, with a `webpack` config and no `turbopack` config.
```

**해결**:
- next.config.ts에 `turbopack: {}` 추가

### 3. @react-pdf/renderer SSR 에러 해결
**문제**:
```
Error: PDFDownloadLink is a web specific API.
You're either using this component on Node, or your bundler is not loading react-pdf from the appropriate web build.
```

**해결**:
- dynamic import 사용 + ssr: false 옵션
  ```typescript
  const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <p>PDF 도구 로딩 중...</p> }
  );
  ```

---

## 다음 작업 (Week 2)

Week 2에서는 달력 렌더링 엔진을 구현합니다:

- [ ] lib/calendar/generator.ts - 달력 생성 로직
- [ ] components/calendar/YearlyCalendar.tsx - 연간 달력 컴포넌트
- [ ] components/calendar/MonthlyCalendar.tsx - 월간 달력 컴포넌트
- [ ] components/calendar/DayCell.tsx - 날짜 셀 컴포넌트
- [ ] hooks/useCalendar.ts - 달력 상태 관리

---

## 기술 스택 (확정)

### 프레임워크 & 라이브러리
- Next.js: 16.0.5 (Turbopack)
- React: 19.2.0
- TypeScript: 5.9.3

### UI & 스타일
- Tailwind CSS: 4.1.17
- @tailwindcss/postcss: 4.1.17

### PDF & 달력
- @react-pdf/renderer: 4.3.1
- date-fns: 4.1.0
- date-holidays: 3.26.5

### 유틸리티
- zod: 4.1.13 (스키마 검증)
- zustand: 5.0.8 (상태 관리)

---

**작성일**: 2025-11-29
**작성자**: Claude (AI Assistant)

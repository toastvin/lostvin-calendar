# Lostvin Calendar - Final Roadmap

> 프린트용 달력 제작 웹서비스 개발 로드맵
>
> **프로젝트 목표**: 로그인 없이 3클릭으로 프린트용 달력 생성
> **기술 스택**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
> **예상 기간**: 8주 (MVP 완성 기준)

---

## 📊 프로젝트 분석

### 기능 우선순위 (MoSCoW)

#### Must Have (MVP 필수 - Week 1~6)
1. **기본 달력 생성** - 연간/월간 달력 렌더링
2. **공휴일 데이터** - KR/US 공휴일 표시
3. **PDF 생성** - @react-pdf/renderer로 정확한 레이아웃
4. **URL 공유** - 모든 설정을 URL 파라미터로 인코딩
5. **프린트 최적화** - @media print CSS 완벽 분리
6. **다국어 UI** - 한국어/영어 자동 감지

#### Should Have (MVP 권장 - Week 6~7)
1. **Eco 모드** - 잉크 절약 (#555 회색, 얇은 선)
2. **목적별 프리셋** - 습관 추적, 식단표
3. **올해/내년 퀵 버튼** - 12~1월 트래픽 전환율 극대화
4. **오늘 날짜 하이라이트** - 연한 노란색 원
5. **간단한 메모 입력** - LocalStorage 저장
6. **음력 표시** - 한중일 시장 대응

#### Could Have (Ver.2 이후)
1. CSV 업로드
2. 메모 색상/카테고리
3. 24절기
4. 교대근무표 자동 색칠

#### Won't Have (이번 버전 제외)
1. 로그인/회원가입
2. 템플릿 갤러리
3. 복잡한 일정 관리 기능

---

## 🎯 주요 리스크 분석

### 기술적 리스크

| 리스크 | 영향도 | 확률 | 대응 방안 |
|--------|--------|------|-----------|
| **PDF 한글 폰트 깨짐** | 🔴 High | 80% | Week 0에 @react-pdf/renderer 한글 테스트 필수 |
| **프린트 CSS 브라우저 호환** | 🟡 Medium | 60% | Chrome/Safari/Firefox 각각 테스트, fallback 준비 |
| **URL 길이 제한 (메모 포함)** | 🟡 Medium | 40% | Base64 인코딩 + 압축, 또는 메모 길이 제한 |
| **공휴일 데이터 정확성** | 🟡 Medium | 30% | date-holidays 라이브러리 검증, 수동 검수 |
| **모바일 PDF 다운로드** | 🟢 Low | 20% | iOS Safari 테스트, 대체 다운로드 방법 제공 |

### 비즈니스 리스크

| 리스크 | 영향도 | 확률 | 대응 방안 |
|--------|--------|------|-----------|
| **SEO 경쟁 실패** | 🟡 Medium | 50% | 롱테일 키워드(이유식 식단표 등) 집중 공략 |
| **AdSense 승인 거부** | 🟡 Medium | 30% | 콘텐츠 품질 확보, 트래픽 1만 이상 확보 후 신청 |
| **계절성 트래픽 편중** | 🟢 Low | 80% | 연중 사용 가능한 프리셋 제공 (습관, 식단) |

---

## 📅 Week별 상세 계획

### Week 0: 기술 검증 (Priority 0) - 3일
**목표**: MVP 구현 전 기술 리스크 제거

#### 작업 항목
- [ ] Next.js 15 + TypeScript 프로젝트 초기화
- [ ] @react-pdf/renderer 한글 폰트 테스트
  - Gowun Batang, Noto Sans KR 등 웹폰트 임베딩
  - PDF 생성 속도 측정 (12개월 연간 달력)
- [ ] 공휴일 데이터 라이브러리 선정
  - date-holidays vs Nager.Date API 비교
  - 2025~2030 KR/US 데이터 정확성 검증
- [ ] URL 파라미터 설계
  - 모든 설정값 인코딩 구조 설계
  - Next.js SSR 상태 복원 로직 검증
- [ ] @media print CSS 테스트
  - Chrome/Safari/Firefox 여백 테스트
  - 광고 숨김, 페이지 나누기 확인

#### 산출물
- `docs/TECH_VALIDATION.md` - 기술 검증 결과 문서
- `lib/pdf/font-test.tsx` - PDF 폰트 테스트 컴포넌트
- `lib/holidays/api-comparison.md` - 공휴일 API 비교표

#### 완료 기준
- PDF 한글 출력 정상 동작
- 공휴일 라이브러리 선정 완료
- URL 파라미터 구조 확정

---

### Week 1: 프로젝트 기반 & 코어 구조 - 5일
**목표**: 개발 환경 및 아키텍처 기반 구축

#### 작업 항목
- [ ] 프로젝트 구조 설계
  ```
  src/
  ├── app/              # Next.js App Router
  ├── components/       # UI 컴포넌트
  │   ├── calendar/     # 달력 관련
  │   ├── ui/           # shadcn/ui 기반 공통 UI
  │   └── shared/       # 재사용 컴포넌트
  ├── lib/              # 비즈니스 로직
  │   ├── calendar/     # 달력 생성 로직
  │   ├── holidays/     # 공휴일 데이터
  │   ├── pdf/          # PDF 생성
  │   └── utils/        # 유틸리티
  ├── types/            # TypeScript 타입 정의
  ├── constants/        # 상수 (매직 값 금지)
  └── hooks/            # Custom Hooks
  ```

- [ ] 코딩 표준 수립
  - TypeScript strict 모드
  - ESLint + Prettier 설정
  - 컴포넌트 네이밍 규칙
  - 타입 정의 규칙

- [ ] 공통 타입 정의
  ```typescript
  // types/calendar.ts
  export type CalendarType = 'yearly' | 'monthly' | 'quarterly';
  export type PaperSize = 'A4' | 'A3';
  export type Orientation = 'portrait' | 'landscape';
  export type WeekStart = 'sunday' | 'monday';
  export type Country = 'KR' | 'US' | 'JP' | 'CN';

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
  ```

- [ ] 상수 정의
  ```typescript
  // constants/calendar.ts
  export const CURRENT_YEAR = new Date().getFullYear();
  export const YEAR_RANGE = { min: 2020, max: 2030 };
  export const DEFAULT_CONFIG: CalendarConfig = { ... };
  ```

- [ ] Git 브랜치 전략 확정
  - main: 프로덕션
  - develop: 개발
  - feature/[week]-[name]: 기능 개발

#### 산출물
- 프로젝트 스캐폴딩 완료
- `CODING_STANDARDS.md` 문서
- `types/` 폴더 기본 타입 정의
- `constants/` 폴더 상수 정의

#### 완료 기준
- `pnpm build` 성공
- ESLint 에러 0개
- TypeScript 컴파일 에러 0개

---

### Week 2: 달력 렌더링 엔진 - 5일
**목표**: 연간/월간 달력 화면 렌더링

#### 작업 항목
- [ ] 달력 데이터 생성 로직
  ```typescript
  // lib/calendar/generator.ts
  export function generateYearlyCalendar(year: number): Month[] { ... }
  export function generateMonthlyCalendar(year: number, month: number): Day[] { ... }
  ```

- [ ] 달력 UI 컴포넌트
  - `components/calendar/YearlyCalendar.tsx`
  - `components/calendar/MonthlyCalendar.tsx`
  - `components/calendar/DayCell.tsx`

- [ ] 레이아웃 시스템
  - A4/A3 크기 대응
  - 가로/세로 방향 대응
  - 프린트 미리보기

- [ ] 스타일링
  - Tailwind CSS 설정
  - 프린트 친화적 디자인
  - 명조체 폰트 적용 (Gowun Batang)

#### 테스트 항목
- [ ] 2025년 연간 달력 렌더링
- [ ] 윤년 처리 (2024, 2028)
- [ ] 주 시작 요일 변경 (일요일/월요일)

#### 산출물
- 달력 렌더링 컴포넌트
- 달력 데이터 생성 유틸리티

#### 완료 기준
- 연간 달력 12개월 정상 표시
- 월간 달력 날짜 정확성 100%
- 화면에서 시각적 확인 가능

---

### Week 3: 공휴일 & 설정 UI - 5일
**목표**: 공휴일 데이터 통합 및 설정 패널 구현

#### 작업 항목
- [ ] 공휴일 데이터 통합
  ```typescript
  // lib/holidays/provider.ts
  export function getHolidays(year: number, countries: Country[]): Holiday[] { ... }
  export function isHoliday(date: Date, holidays: Holiday[]): boolean { ... }
  ```

- [ ] 공휴일 표시 로직
  - 달력에 공휴일 마킹
  - 국가별 색상 구분
  - 툴팁으로 공휴일 이름 표시

- [ ] 설정 패널 UI
  - `components/settings/SettingsPanel.tsx`
  - 연도 선택 (올해/내년 퀵 버튼)
  - 국가 선택 (다중 선택)
  - 용지 크기/방향
  - 주 시작 요일

- [ ] 미리보기 실시간 갱신
  - 설정 변경 시 달력 즉시 업데이트
  - 디바운싱 처리 (성능 최적화)

#### 테스트 항목
- [ ] 2025년 한국 공휴일 15개 정확성
- [ ] 미국 공휴일 12개 정확성
- [ ] KR + US 동시 선택 시 겹침 확인

#### 산출물
- 공휴일 데이터 레이어
- 설정 패널 컴포넌트

#### 완료 기준
- 공휴일 표시 정확도 100%
- 설정 변경 → 미리보기 갱신 정상

---

### Week 4: PDF 생성 & URL 공유 - 5일
**목표**: 핵심 기능 구현 (PDF + URL 공유)

#### 작업 항목
- [ ] PDF 생성 구현
  ```typescript
  // lib/pdf/generator.tsx
  import { Document, Page, Text, View } from '@react-pdf/renderer';

  export const CalendarPDF = ({ config }: { config: CalendarConfig }) => (
    <Document>
      <Page size="A4" orientation={config.orientation}>
        {/* 달력 렌더링 */}
      </Page>
    </Document>
  );
  ```

- [ ] 한글 폰트 임베딩
  - Gowun Batang 웹폰트 다운로드
  - Font.register() 설정
  - 폰트 로딩 에러 핸들링

- [ ] PDF 다운로드 기능
  - "PDF로 저장" 버튼
  - 파일명: `calendar-2025.pdf`
  - 모바일 다운로드 테스트

- [ ] URL 공유 기능
  ```typescript
  // lib/utils/url-params.ts
  export function encodeConfig(config: CalendarConfig): string { ... }
  export function decodeConfig(params: URLSearchParams): CalendarConfig { ... }
  ```

- [ ] 공유 UI
  - "링크 복사" 버튼 (클립보드 API)
  - 카카오톡 공유 버튼 (Kakao SDK)
  - 공유 성공 토스트

#### 테스트 항목
- [ ] PDF 한글 깨짐 없음
- [ ] URL 복사 → 새 탭에서 설정 복원
- [ ] 모바일 Safari PDF 다운로드

#### 산출물
- PDF 생성 모듈
- URL 공유 기능

#### 완료 기준
- PDF 다운로드 성공률 100%
- URL 공유 → 설정 복원 정확도 100%

---

### Week 5: 프린트 최적화 & 반응형 - 5일
**목표**: 프린트 CSS 완벽 분리 및 모바일 대응

#### 작업 항목
- [ ] @media print CSS
  ```css
  @media print {
    .no-print { display: none !important; }
    .page-break { page-break-after: always; }
    body { background: white; }
    * { -webkit-print-color-adjust: exact; }
  }
  ```

- [ ] 광고 숨김 처리
  - 화면: 광고 표시
  - 프린트: 광고 완전 제거

- [ ] 페이지 나누기
  - 월별 달력: 1개월 = 1페이지
  - 연간 달력: 전체 1페이지

- [ ] 브라우저별 테스트
  - Chrome: 여백 설정 가이드
  - Safari: 배경색 출력 설정
  - Firefox: 페이지 크기 설정

- [ ] 모바일 UI
  - 설정 패널 하단 시트
  - 터치 최적화
  - 공유 버튼 크게

#### 테스트 항목
- [ ] Chrome 인쇄 미리보기
- [ ] Safari 인쇄 미리보기
- [ ] 실제 프린터 출력 (A4)

#### 산출물
- 프린트 CSS 파일
- 브라우저별 가이드 문서

#### 완료 기준
- 3개 브라우저 프린트 정상
- 모바일 반응형 완성

---

### Week 6: 다국어 & SEO - 5일
**목표**: 다국어 지원 및 SEO 최적화

#### 작업 항목
- [ ] i18n 설정
  - next-intl 또는 next-i18next
  - 한국어/영어 번역 파일

- [ ] 브라우저 언어 자동 감지
  ```typescript
  // middleware.ts
  export function middleware(request: NextRequest) {
    const locale = request.headers.get('accept-language');
    // ...
  }
  ```

- [ ] SEO 전용 페이지
  - `/2025` → 2025년 달력
  - `/2026` → 2026년 달력
  - `/holidays/2026/kr` → 2026 한국 공휴일
  - `/habit-tracker` → 습관 추적 달력

- [ ] 메타 태그 최적화
  ```tsx
  export const metadata: Metadata = {
    title: '2025년 달력 프린트 - 무료 다운로드',
    description: '로그인 없이 3클릭으로 예쁜 달력 만들기',
    openGraph: { ... }
  };
  ```

- [ ] 사이트맵 생성
  - 동적 연도별 페이지
  - 정적 페이지 목록

#### 산출물
- 다국어 번역 파일
- SEO 페이지들
- sitemap.xml

#### 완료 기준
- 한/영 번역 100% 완료
- Lighthouse SEO 점수 90+

---

### Week 7: MVP 권장 기능 - 5일
**목표**: Eco 모드, 프리셋, 메모 입력

#### 작업 항목
- [ ] Eco 모드 (잉크 절약)
  - 색상: #000 → #555
  - 선 두께: 1px → 0.5px
  - 테두리: 실선 → 점선

- [ ] 목적별 프리셋
  - 기본 달력
  - 습관 추적 (체크박스 3개)
  - 식단표 (큰 메모 공간)

- [ ] 간단한 메모 입력
  - 날짜 클릭 → 텍스트 입력
  - LocalStorage 저장
  - 메모 표시 (작은 폰트)

- [ ] 추가 기능
  - 올해/내년 퀵 버튼
  - 오늘 날짜 하이라이트
  - 음력 표시 (선택)

#### 산출물
- Eco 모드 스타일
- 프리셋 템플릿 3종
- 메모 입력 기능

#### 완료 기준
- Eco 모드 토너 절약 확인
- 프리셋 전환 정상
- 메모 저장/불러오기 정상

---

### Week 8: 테스트 & 배포 - 5일
**목표**: QA, 성능 최적화, 배포

#### 작업 항목
- [ ] 통합 테스트
  - 전체 플로우 시나리오
  - 브라우저 호환성
  - 모바일 테스트

- [ ] 성능 최적화
  - Next.js 이미지 최적화
  - 폰트 서브셋
  - 코드 스플리팅

- [ ] Vercel 배포
  - 환경 변수 설정
  - 도메인 연결
  - Analytics 설정

- [ ] 문서화
  - README.md
  - 사용자 가이드
  - 개발자 문서

#### 테스트 체크리스트
- [ ] 연간 달력 생성 → PDF 다운로드
- [ ] 월간 달력 + 공휴일 → 프린트
- [ ] URL 공유 → 모바일에서 열기 → PDF
- [ ] Eco 모드 → 실제 프린터 출력
- [ ] 다국어 전환 확인

#### 산출물
- 프로덕션 배포
- 사용자 문서
- 테스트 리포트

#### 완료 기준
- Vercel 배포 성공
- Lighthouse 점수 90+
- 주요 플로우 에러 0개

---

## 🏗️ 아키텍처 설계

### 레이어 구조

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│   (components/, app/, pages/)       │
├─────────────────────────────────────┤
│         Business Logic Layer        │
│   (lib/calendar, lib/holidays)      │
├─────────────────────────────────────┤
│         Data Access Layer           │
│   (lib/api, lib/storage)            │
├─────────────────────────────────────┤
│         Infrastructure Layer        │
│   (PDF, i18n, Analytics)            │
└─────────────────────────────────────┘
```

### 데이터 흐름

```
User Input (설정 변경)
  ↓
Settings Panel (components/settings)
  ↓
Calendar Config (types/calendar.ts)
  ↓
Calendar Generator (lib/calendar/generator.ts)
  ↓
Calendar Data (Month[], Day[])
  ↓
Calendar UI (components/calendar)
  ↓
PDF Generator (lib/pdf/generator.tsx)
  ↓
Download / Print
```

---

## 📦 핵심 패키지

### 필수
- `next@15` - 프레임워크
- `react@19` - UI 라이브러리
- `typescript` - 타입 안정성
- `@react-pdf/renderer` - PDF 생성
- `date-fns` - 날짜 유틸리티
- `date-holidays` - 공휴일 데이터

### 권장
- `tailwindcss` - 스타일링
- `next-intl` - 다국어
- `zustand` - 상태 관리
- `react-hook-form` - 폼 관리
- `zod` - 스키마 검증

---

## 🎯 성공 지표

### 기술 지표
- [ ] TypeScript 커버리지 100%
- [ ] ESLint 에러 0개
- [ ] Lighthouse 성능 90+
- [ ] PDF 생성 속도 < 2초

### 비즈니스 지표
- [ ] 첫 달 방문자 1,000명
- [ ] PDF 다운로드율 30%+
- [ ] URL 공유율 10%+
- [ ] 모바일 사용자 40%+

---

## 📝 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2025-11-29 | 1.0 | 초기 로드맵 작성 |

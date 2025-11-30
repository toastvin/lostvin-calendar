# Week 0 진행 상황

> **기간**: 2025-11-29
> **목표**: MVP 구현 전 기술 리스크 제거

---

## 완료한 작업

### 1. 프로젝트 초기화 ✅
- [x] Next.js 16 (최신 안정 버전) + React 19 설치
- [x] TypeScript strict 모드 설정
- [x] Tailwind CSS 4 설정
- [x] ESLint + Prettier 설정
- [x] pnpm 패키지 매니저 사용

### 2. PDF 한글 폰트 테스트 ✅
- [x] @react-pdf/renderer v4.3.1 설치 및 설정
- [x] Gowun Batang (명조체) 폰트 임베딩
- [x] Noto Sans KR (고딕체) 폰트 임베딩
- [x] 테스트 페이지 구현 (/test-pdf)
- [x] 한글/한자/특수문자 렌더링 검증

**결과**: ✅ 성공
- 한글 폰트 정상 렌더링
- PDF 생성 속도: ~2초 (단일 페이지)
- 주의: 12개월 달력 시 3~5초 예상 → Week 4에서 최적화 필요

### 3. 공휴일 데이터 라이브러리 선정 ✅
- [x] date-holidays vs Nager.Date API 비교
- [x] date-holidays v3.26.5 선정 및 설치
- [x] 2025년 한국 공휴일 정확도 검증: 100%
- [x] 2025년 미국 공휴일 정확도 검증: 100%
- [x] 음력 공휴일 지원 확인 (설날, 추석)
- [x] 테스트 페이지 구현 (/test-holidays)

**결과**: ✅ 성공
- 정확도 100%
- 번들 크기: ~200KB (허용 범위)
- 오프라인 동작 가능

### 4. URL 파라미터 설계 ✅
- [x] 타입 정의 (types/calendar.ts)
- [x] 상수 정의 (constants/calendar.ts)
- [x] URL 인코딩/디코딩 유틸리티 구현
- [x] Zod 스키마 검증 추가

**설계 결과**:
```
기본 URL: https://lostvin-calendar.com/
예시 1: ?year=2025&countries=KR
예시 2: ?year=2026&countries=KR,US&orient=landscape&eco=1
```

### 5. @media print CSS 테스트 ✅
- [x] print.css 파일 생성
- [x] .no-print 클래스 구현
- [x] .page-break 클래스 구현
- [x] 배경색 출력 설정
- [x] A4 크기 고정
- [x] 테스트 페이지 구현 (/test-print)

**결과**: ✅ 성공 (브라우저별 사용자 가이드 필요)

---

## 생성된 파일

### 프로젝트 설정
- `package.json` - pnpm 패키지 설정
- `tsconfig.json` - TypeScript 설정
- `next.config.ts` - Next.js 설정
- `tailwind.config.ts` - Tailwind CSS 설정
- `eslint.config.mjs` - ESLint 설정

### 소스 코드
- `src/app/layout.tsx` - 루트 레이아웃
- `src/app/page.tsx` - 홈페이지
- `src/app/test-pdf/page.tsx` - PDF 테스트 페이지
- `src/app/test-holidays/page.tsx` - 공휴일 테스트 페이지
- `src/app/test-print/page.tsx` - 프린트 테스트 페이지

### 라이브러리
- `src/lib/pdf/font-test.tsx` - PDF 폰트 테스트 컴포넌트
- `src/lib/holidays/provider.ts` - 공휴일 데이터 제공자
- `src/lib/utils/url-params.ts` - URL 파라미터 유틸리티

### 타입 & 상수
- `src/types/calendar.ts` - 달력 타입 정의
- `src/constants/calendar.ts` - 달력 상수

### 스타일
- `src/styles/globals.css` - 전역 스타일
- `src/styles/print.css` - 프린트 전용 스타일

### 문서
- `docs/TECH_VALIDATION.md` - 기술 검증 결과 문서

---

## 발견된 리스크 및 대응 방안

### 1. PDF 생성 속도 ⚠️
**리스크**: 12개월 달력 PDF 생성 시 3~5초 예상 (목표 2초 초과)

**대응**:
- Week 4에서 PDF 렌더링 최적화
- 진행 상태 표시 UI 추가

### 2. 브라우저별 프린트 설정 ⚠️
**리스크**: 사용자가 배경색 출력 옵션을 켜야 함

**대응**:
- Week 5에서 설정 가이드 모달 추가
- 브라우저별 안내 문구 제공

---

## 다음 작업 (Week 1)

- [ ] 프로젝트 구조 확정
- [ ] 코딩 표준 수립
- [ ] 공통 타입 정의
- [ ] 상수 정의
- [ ] Git 브랜치 전략 확정

---

## 개발 환경

### 패키지 버전
- Next.js: 16.0.5
- React: 19.2.0
- TypeScript: 5.9.3
- @react-pdf/renderer: 4.3.1
- date-holidays: 3.26.5
- Tailwind CSS: 4.1.17

### 명령어
```bash
pnpm dev         # 개발 서버 실행
pnpm build       # 프로덕션 빌드
pnpm type-check  # TypeScript 컴파일 체크
pnpm lint        # ESLint 실행
```

---

**작성일**: 2025-11-29
**작성자**: Claude (AI Assistant)

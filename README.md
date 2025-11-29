# Lostvin Calendar

> 프린트용 달력 제작 웹서비스 - 로그인 없이 3클릭으로 예쁜 달력 만들기

**컨셉**: "책상 위에 올려둘 종이 달력을, 몇 번의 클릭으로 만들어주는 조용한 공방"

---

## 🎯 프로젝트 개요

프린트에 최적화된 달력을 쉽고 빠르게 만들 수 있는 웹서비스입니다.
- 로그인 불필요
- 다국가 공휴일 지원 (KR, US, JP, CN)
- PDF 다운로드
- URL 공유로 간편한 협업
- Eco 모드 (잉크 절약)

**기술 스택**: Next.js 15 + React 19 + TypeScript + Tailwind CSS

---

## 📁 프로젝트 구조

```
lostvin-calendar/
├── .claude/                    # Claude Code 자동화
│   └── commands/
│       └── project-task.md    # 슬래시 커맨드
│
├── plans/                      # 개발 계획
│   └── FINAL_ROADMAP.md       # Week별 로드맵
│
├── schemas/                    # Zod 검증 스키마
│   └── calendar-config.schema.ts
│
├── templates/                  # 문서 템플릿
│   └── week_progress_template.md
│
├── phases/                     # Week별 진행 기록
│   └── (추후 생성)
│
├── src/                        # 소스 코드 (추후 생성)
│   ├── app/                   # Next.js App Router
│   ├── components/            # UI 컴포넌트
│   ├── lib/                   # 비즈니스 로직
│   ├── types/                 # TypeScript 타입
│   ├── constants/             # 상수
│   ├── hooks/                 # Custom Hooks
│   └── styles/                # 전역 스타일
│
├── 계획안 v1.md                # 초기 계획안
├── 계획안 v2.md                # 개선 계획안
├── 계획안 v3.md                # 최종 계획안
│
├── CODING_STANDARDS.md         # 코딩 표준 (바이브 코딩 방지)
├── SHARED_COMPONENTS.md        # 공통 컴포넌트 목록
├── GIT_WORKFLOW.md             # Git 브랜치 전략
├── WORK_CHECKLIST.md           # Week별 체크리스트
│
├── .env.example                # 환경 변수 템플릿
├── .gitignore
└── README.md                   # 이 파일
```

---

## 🚀 빠른 시작 (개발 예정)

### 1. 환경 설정

```bash
# 저장소 클론
git clone https://github.com/toastvin/lostvin-calendar.git
cd lostvin-calendar

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

### 2. 브라우저에서 열기

```
http://localhost:3000
```

---

## 📚 핵심 문서

| 문서 | 용도 |
|------|------|
| [plans/FINAL_ROADMAP.md](./plans/FINAL_ROADMAP.md) | Week별 개발 계획 (8주) |
| [CODING_STANDARDS.md](./CODING_STANDARDS.md) | 코딩 표준 및 바이브 코딩 방지 |
| [SHARED_COMPONENTS.md](./SHARED_COMPONENTS.md) | 재사용 가능한 컴포넌트 목록 |
| [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) | Git 브랜치 전략 |
| [WORK_CHECKLIST.md](./WORK_CHECKLIST.md) | Week별 작업 체크리스트 |

---

## 🎯 MVP 기능 (8주 계획)

### Week 0: 기술 검증 (3일)
- @react-pdf/renderer 한글 폰트 테스트
- 공휴일 API 선정
- URL 파라미터 구조 설계

### Week 1: 프로젝트 기반 (5일)
- Next.js 프로젝트 초기화
- 폴더 구조 설계
- 타입/상수 정의

### Week 2: 달력 렌더링 (5일)
- 연간/월간 달력 렌더링
- A4/A3 크기 대응
- 레이아웃 시스템

### Week 3: 공휴일 & UI (5일)
- 공휴일 데이터 통합
- 설정 패널 구현
- 실시간 미리보기

### Week 4: PDF & URL 공유 (5일)
- PDF 생성 구현
- URL 공유 기능
- 카카오톡 공유

### Week 5: 프린트 최적화 (5일)
- @media print CSS
- 브라우저 호환성
- 모바일 반응형

### Week 6: 다국어 & SEO (5일)
- 한국어/영어 자동 감지
- SEO 페이지 생성
- 메타 태그 최적화

### Week 7: MVP 권장 기능 (5일)
- Eco 모드 (잉크 절약)
- 목적별 프리셋
- 간단한 메모 입력

### Week 8: 테스트 & 배포 (5일)
- 통합 테스트
- 성능 최적화
- Vercel 배포

---

## 🛠️ 개발 스크립트 (추후 추가)

```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# 프로덕션 서버
npm run start

# 린트
npm run lint

# 타입 체크
npm run type-check

# 테스트
npm run test

# 테스트 커버리지
npm run test:coverage
```

---

## 🔧 기술 스택

### 코어
- **Next.js 15** - React 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성

### 스타일링
- **Tailwind CSS** - 유틸리티 CSS
- **shadcn/ui** - UI 컴포넌트

### PDF 생성
- **@react-pdf/renderer** - PDF 렌더링
- **date-fns** - 날짜 유틸리티

### 데이터 검증
- **Zod** - 스키마 검증

### 상태 관리
- **Zustand** (선택적)

### 다국어
- **next-intl** - i18n

---

## 📖 주요 개념

### 바이브 코딩 방지

이 프로젝트는 "바이브 코딩" 방지에 중점을 둡니다:

❌ **바이브 코딩이란?**
- LLM이 "그럴듯하게" 생성한 코드가 실제로는 프로젝트 구조를 무시
- 타입 중복 정의, 매직 값 하드코딩, any 남발 등

✅ **방지 방법**
- 명확한 레이어 분리 (app, components, lib, types, constants)
- One Source of Truth (타입은 types/에만)
- 매직 값 금지 (constants/ 사용)
- any 사용 금지
- 3번 반복 시 공통화

자세한 내용: [CODING_STANDARDS.md](./CODING_STANDARDS.md)

---

## 🔍 슬래시 커맨드

`.claude/commands/project-task.md` 참고

```bash
# 작업 시작 (자동으로 의존성 체크, 코딩 표준 참조)
/project-task [작업명]
```

---

## 🤝 기여 가이드

### 브랜치 전략

```
main (프로덕션)
  ↑
develop (개발)
  ↑
feature/week-X-[name] (기능 개발)
```

### 커밋 메시지 규칙

```
<type>(<scope>): <subject>

feat: 새로운 기능
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가/수정
chore: 기타
```

자세한 내용: [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)

---

## 📊 프로젝트 진행 상황

| Week | 주제 | 상태 | 완료일 |
|------|------|------|--------|
| 0 | 기술 검증 | ⏳ 예정 | - |
| 1 | 프로젝트 기반 | ⏳ 예정 | - |
| 2 | 달력 렌더링 | ⏳ 예정 | - |
| 3 | 공휴일 & UI | ⏳ 예정 | - |
| 4 | PDF & URL 공유 | ⏳ 예정 | - |
| 5 | 프린트 최적화 | ⏳ 예정 | - |
| 6 | 다국어 & SEO | ⏳ 예정 | - |
| 7 | MVP 권장 기능 | ⏳ 예정 | - |
| 8 | 테스트 & 배포 | ⏳ 예정 | - |

---

## 🎯 성공 지표

### 기술 지표
- TypeScript 커버리지 100%
- ESLint 에러 0개
- Lighthouse 성능 90+
- PDF 생성 속도 < 2초

### 비즈니스 지표
- 첫 달 방문자 1,000명
- PDF 다운로드율 30%+
- URL 공유율 10%+
- 모바일 사용자 40%+

---

## 📄 라이선스

MIT License

---

## 👤 Author

**Lostvin**
- GitHub: [@toastvin](https://github.com/toastvin)

---

## 📝 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2025-11-29 | 0.1.0 | 프로젝트 초기화, 문서 작성 |

---

**마지막 업데이트**: 2025-11-29

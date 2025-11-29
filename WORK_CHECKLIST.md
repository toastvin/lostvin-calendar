# 📋 Lostvin Calendar 작업 체크리스트

**사용법**: 각 작업 단계를 순서대로 복사-붙여넣기하세요.

---

## 🔬 작업 0: Week 0 (기술 검증)

### 0-1. 작업 시작
```
/project-task Week 0 시작해줘. 기술 검증 단계야.
```

### 0-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout main
git pull origin main
git checkout -b develop
git push -u origin develop
git checkout -b feature/week-0-tech-validation
```

### 0-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week0): 기술 검증 완료 - PDF/공휴일/URL 파라미터"로
```

### 0-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 0] 기술 검증 완료"
```

### 0-5. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
# 피드백 반영 후
git add .
git commit -m "fix(week0): 검토 피드백 반영"
git push origin feature/week-0-tech-validation

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## 🏗️ 작업 1: Week 1 (프로젝트 기반 & 코어 구조)

### 1-1. 작업 시작
```
/project-task Week 1 시작해줘. 프로젝트 기반 구축이야.
```

### 1-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-1-project-setup
```

### 1-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week1): Next.js 프로젝트 초기화 및 타입/상수 정의 완료"로
```

### 1-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 1] 프로젝트 기반 & 코어 구조"
```

### 1-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. CODING_STANDARDS.md 준수 여부
2. 타입 정의가 types/에만 있는지
3. 매직 값이 constants/에 있는지
4. ESLint 에러 0개
5. TypeScript 컴파일 에러 0개
```

### 1-6. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
git add .
git commit -m "fix(week1): 검토 피드백 반영"
git push origin feature/week-1-project-setup

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## 📅 작업 2: Week 2 (달력 렌더링 엔진)

### 2-1. 작업 시작
```
/project-task Week 2 시작해줘. 달력 렌더링 엔진 구현이야.
```

### 2-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-2-calendar-renderer
```

### 2-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week2): 연간/월간 달력 렌더링 및 레이아웃 시스템 완료"로
```

### 2-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 2] 달력 렌더링 엔진"
```

### 2-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. generateYearlyCalendar 함수 테스트 (2025년)
2. 윤년 처리 확인 (2024, 2028)
3. 주 시작 요일 변경 테스트
4. A4/A3 레이아웃 확인
5. 비즈니스 로직이 lib/에만 있는지
```

### 2-6. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
git add .
git commit -m "fix(week2): 검토 피드백 반영"
git push origin feature/week-2-calendar-renderer

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## 🎌 작업 3: Week 3 (공휴일 & 설정 UI)

### 3-1. 작업 시작
```
/project-task Week 3 시작해줘. 공휴일 데이터 통합 및 설정 UI야.
```

### 3-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-3-holidays-ui
```

### 3-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week3): 공휴일 데이터 통합 및 설정 패널 구현 완료"로
```

### 3-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 3] 공휴일 & 설정 UI"
```

### 3-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. 2025년 한국 공휴일 15개 정확성
2. 미국 공휴일 12개 정확성
3. KR + US 동시 선택 시 표시
4. 설정 변경 → 미리보기 즉시 갱신
5. 올해/내년 퀵 버튼 동작
```

### 3-6. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
git add .
git commit -m "fix(week3): 검토 피드백 반영"
git push origin feature/week-3-holidays-ui

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## 📄 작업 4: Week 4 (PDF 생성 & URL 공유)

### 4-1. 작업 시작
```
/project-task Week 4 시작해줘. PDF 생성 및 URL 공유 기능이야.
```

### 4-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-4-pdf-url-share
```

### 4-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week4): @react-pdf/renderer PDF 생성 및 URL 공유 기능 완료"로
```

### 4-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 4] PDF 생성 & URL 공유"
```

### 4-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. PDF 한글 폰트 깨짐 없음
2. PDF 다운로드 성공 (2025년 연간)
3. URL 복사 → 새 탭 → 설정 복원
4. 모바일 Safari PDF 다운로드
5. 카카오톡 공유 버튼 동작
```

### 4-6. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
git add .
git commit -m "fix(week4): 검토 피드백 반영"
git push origin feature/week-4-pdf-url-share

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## 🖨️ 작업 5: Week 5 (프린트 최적화 & 반응형)

### 5-1. 작업 시작
```
/project-task Week 5 시작해줘. 프린트 CSS 최적화 및 반응형이야.
```

### 5-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-5-print-responsive
```

### 5-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week5): @media print CSS 및 모바일 반응형 완료"로
```

### 5-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 5] 프린트 최적화 & 반응형"
```

### 5-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. Chrome 인쇄 미리보기 (광고 숨김)
2. Safari 인쇄 미리보기
3. Firefox 인쇄 미리보기
4. 실제 프린터 출력 (A4)
5. 모바일 레이아웃 (iPhone, Android)
```

### 5-6. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
git add .
git commit -m "fix(week5): 검토 피드백 반영"
git push origin feature/week-5-print-responsive

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## 🌐 작업 6: Week 6 (다국어 & SEO)

### 6-1. 작업 시작
```
/project-task Week 6 시작해줘. 다국어 지원 및 SEO 최적화야.
```

### 6-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-6-i18n-seo
```

### 6-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week6): next-intl 다국어 및 SEO 페이지 생성 완료"로
```

### 6-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 6] 다국어 & SEO"
```

### 6-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. 브라우저 언어 자동 감지 (ko/en)
2. /2025, /2026 페이지 생성
3. /holidays/2026/kr 페이지 생성
4. sitemap.xml 생성
5. Lighthouse SEO 점수 90+
```

### 6-6. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
git add .
git commit -m "fix(week6): 검토 피드백 반영"
git push origin feature/week-6-i18n-seo

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## ⚡ 작업 7: Week 7 (MVP 권장 기능)

### 7-1. 작업 시작
```
/project-task Week 7 시작해줘. Eco 모드, 프리셋, 메모 입력이야.
```

### 7-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-7-mvp-features
```

### 7-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week7): Eco 모드, 목적별 프리셋, 메모 입력 완료"로
```

### 7-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 7] MVP 권장 기능"
```

### 7-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. Eco 모드 (#555 회색, 얇은 선)
2. 프리셋 전환 (기본/습관/식단)
3. 메모 입력 → LocalStorage 저장
4. 음력 표시 정확성
5. 오늘 날짜 하이라이트
```

### 7-6. 검토 결과 반영 후 머지 (터미널에서 실행)
```bash
git add .
git commit -m "fix(week7): 검토 피드백 반영"
git push origin feature/week-7-mvp-features

# GitHub에서 PR 머지 후
git checkout develop
git pull origin develop
```

---

## 🚀 작업 8: Week 8 (테스트 & 배포)

### 8-1. 작업 시작
```
/project-task Week 8 시작해줘. 통합 테스트 및 Vercel 배포야.
```

### 8-2. Git 브랜치 생성 (터미널에서 실행)
```bash
git checkout develop
git pull origin develop
git checkout -b feature/week-8-test-deploy
```

### 8-3. 작업 완료 후 커밋
```
작업 완료했어. Git에 커밋하고 푸시해줘. 커밋 메시지는 "feat(week8): 통합 테스트 및 프로덕션 배포 완료"로
```

### 8-4. GitHub PR 생성
```
GitHub에 Pull Request 만들어줘. 제목은 "[Week 8] 테스트 & 배포"
```

### 8-5. 검토 항목 확인
```
다음 항목을 확인해줘:
1. 전체 플로우 테스트 (생성 → PDF → 공유)
2. Lighthouse 점수 (Performance/SEO 90+)
3. 브라우저 호환성 (Chrome/Safari/Firefox)
4. 모바일 테스트 (iOS/Android)
5. Vercel 배포 성공
```

### 8-6. develop → main 머지 및 배포 (터미널에서 실행)
```bash
git checkout main
git pull origin main
git merge develop
git push origin main

# 태그 생성
git tag -a v1.0.0 -m "MVP 완성: Lostvin Calendar"
git push origin v1.0.0

# develop 브랜치 정리
git checkout develop
git pull origin develop
```

---

## 🎉 최종 점검

### 최종 검토
```
전체 프로젝트 최종 검토해줘. 다음 항목 확인:
1. 모든 Week (0~8) 완료 여부
2. CODING_STANDARDS.md 준수 (레이어 분리, any 0개)
3. 모든 테스트 통과
4. Lighthouse 점수 90+
5. Vercel 배포 확인
```

### 프로덕션 체크리스트
```
프로덕션 배포 전 체크리스트 확인해줘:
1. .env 환경 변수 설정 (Vercel)
2. Google Analytics 설정
3. Google AdSense 승인 (트래픽 확보 후)
4. 도메인 연결 (calprint.kr 등)
5. HTTPS 인증서 확인
```

### 축하합니다! 🎊
```
Lostvin Calendar MVP 완성! 🎉
8주 작업이 모두 끝났습니다.
이제 실제 사용자 피드백을 받을 준비가 되었어요!
```

---

## 📌 빠른 참조

### 진행 상황 확인
```bash
# Week별 진행 기록
ls phases/

# 현재 브랜치
git branch

# 커밋 로그
git log --oneline --graph
```

### 로컬 테스트
```bash
# 개발 서버
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint

# 타입 체크
pnpm type-check

# 테스트
pnpm test
```

### 문서 참조
```bash
# 로드맵
cat plans/FINAL_ROADMAP.md

# 코딩 표준
cat CODING_STANDARDS.md

# Git 워크플로우
cat GIT_WORKFLOW.md
```

---

## 🔧 트러블슈팅

### PDF 한글 폰트 깨짐
```
PDF 한글 폰트가 깨지면:
1. lib/pdf/fonts.ts에서 Font.register 확인
2. Gowun Batang 웹폰트 URL 확인
3. 폰트 로딩 에러 콘솔 체크
```

### URL 공유 안됨
```
URL 공유가 안되면:
1. lib/utils/url-params.ts의 encodeConfig 확인
2. URL 길이 제한 (2048자) 확인
3. Base64 인코딩 적용 고려
```

### 프린트 시 광고 나옴
```
프린트 시 광고가 나오면:
1. styles/print.css의 .no-print 클래스 확인
2. @media print에서 광고 숨김 확인
3. 브라우저 개발자 도구에서 print 미리보기
```

---

**작성일**: 2025-11-29
**총 작업 기간**: 8주 (Week 0~8)
**예상 완료**: 2026-01-24

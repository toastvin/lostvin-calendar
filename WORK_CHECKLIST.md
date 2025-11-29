# Work Checklist - Week별 복붙 체크리스트

> **목적**: 각 Week 시작/종료 시 반복 작업 자동화
>
> **사용법**: Week 시작 시 해당 섹션 복사 → `phases/week-X-progress.md`에 붙여넣기

---

## 📋 Week 시작 체크리스트

### Week [X]: [주제명]

**기간**: YYYY-MM-DD ~ YYYY-MM-DD

#### 1. 브랜치 생성

```bash
# develop 최신화
git checkout develop
git pull origin develop

# 새 feature 브랜치 생성
git checkout -b feature/week-[X]-[name]

# 첫 커밋
git commit --allow-empty -m "Start Week [X]: [주제명]"
git push -u origin feature/week-[X]-[name]
```

- [ ] develop 브랜치 최신화 완료
- [ ] feature/week-[X] 브랜치 생성 완료
- [ ] 빈 커밋 푸시 완료

#### 2. 문서 준비

- [ ] `phases/week-[X]-progress.md` 파일 생성
- [ ] 이 체크리스트 복붙
- [ ] ROADMAP의 해당 Week 작업 항목 복사

#### 3. 개발 환경 확인

```bash
# 의존성 최신화
npm install

# 린트 & 타입 체크
npm run lint
npm run type-check

# 빌드 확인
npm run build
```

- [ ] 의존성 설치 완료
- [ ] 린트 에러 0개
- [ ] 타입 체크 통과
- [ ] 빌드 성공

#### 4. 이전 Week 리뷰

- [ ] 이전 Week PR 머지 확인
- [ ] 이전 Week 브랜치 삭제 확인
- [ ] 완료된 기능 동작 확인

---

## 🔨 개발 중 일일 체크리스트

### Day [X] - YYYY-MM-DD

#### 작업 전

- [ ] develop 브랜치 최신 변경사항 확인
- [ ] 오늘 목표 작성 (구체적으로)
- [ ] 관련 문서 읽기 (CODING_STANDARDS, SHARED_COMPONENTS)

#### 코딩 중

- [ ] 작은 단위로 커밋 (50줄 이하)
- [ ] 커밋 메시지 규칙 준수 (Conventional Commits)
- [ ] 바이브 코딩 자가 점검
  - [ ] 레이어 분리 준수 (app, components, lib)
  - [ ] 타입 정의가 `types/`에만 존재
  - [ ] 매직 값 없음 (모두 `constants/`로)
  - [ ] any 사용 0개
  - [ ] 중복 코드 없음

#### 작업 후

- [ ] 린트 & 타입 체크
  ```bash
  npm run lint
  npm run type-check
  ```
- [ ] 로컬 테스트
  ```bash
  npm run dev
  # 브라우저에서 동작 확인
  ```
- [ ] 커밋 & 푸시
  ```bash
  git add .
  git commit -m "feat: [작업 내용]"
  git push
  ```
- [ ] 진행 상황 기록 (`phases/week-[X]-progress.md`)

---

## ✅ Week 완료 체크리스트

### Week [X]: [주제명] 완료

**완료일**: YYYY-MM-DD

#### 1. 최종 코드 점검

- [ ] ESLint 에러 0개
  ```bash
  npm run lint
  ```
- [ ] TypeScript 컴파일 에러 0개
  ```bash
  npm run type-check
  ```
- [ ] 빌드 성공
  ```bash
  npm run build
  ```
- [ ] 모든 테스트 통과
  ```bash
  npm run test
  ```

#### 2. 문서 업데이트

- [ ] SHARED_COMPONENTS.md 업데이트 (새로운 공통 컴포넌트 추가 시)
- [ ] README.md 업데이트 (필요 시)
- [ ] 주석 작성 확인 ("왜"를 설명하는 주석만)

#### 3. 코딩 표준 준수 확인

- [ ] 레이어 분리 준수
  - app: 라우팅만
  - components: UI만
  - lib: 비즈니스 로직
  - types: 타입 정의
  - constants: 상수

- [ ] One Source of Truth
  - [ ] 타입 정의가 여러 곳에 중복되지 않음
  - [ ] 상수가 여러 곳에 하드코딩되지 않음

- [ ] 에러 처리
  - [ ] any 사용 0개
  - [ ] try-catch 명시적 처리
  - [ ] 커스텀 에러 클래스 사용

- [ ] 공통화
  - [ ] 3번 이상 반복되는 코드 공통화 완료
  - [ ] SHARED_COMPONENTS.md에 등록

#### 4. 기능 테스트

**연간 달력 (Week 2 예시)**:
- [ ] 2025년 연간 달력 렌더링
- [ ] 2024년 윤년 처리 (2월 29일)
- [ ] 주 시작 요일 변경 (일요일/월요일)
- [ ] A4/A3 크기 대응
- [ ] 가로/세로 방향 대응

**공휴일 (Week 3 예시)**:
- [ ] 한국 공휴일 표시 정확성
- [ ] 미국 공휴일 표시 정확성
- [ ] 다중 국가 선택 시 겹침 확인
- [ ] 설정 변경 → 미리보기 실시간 갱신

**PDF (Week 4 예시)**:
- [ ] PDF 다운로드 성공
- [ ] 한글 폰트 깨짐 없음
- [ ] A4 크기 정확성
- [ ] 모바일 다운로드 확인

**URL 공유 (Week 4 예시)**:
- [ ] URL 복사 성공
- [ ] 새 탭에서 설정 복원 확인
- [ ] 모든 설정값 인코딩/디코딩 정확성

#### 5. 브라우저 호환성

- [ ] Chrome 최신 버전
- [ ] Safari 최신 버전 (특히 프린트)
- [ ] Firefox 최신 버전
- [ ] 모바일 Safari (iOS)
- [ ] 모바일 Chrome (Android)

#### 6. 성능 확인

- [ ] Lighthouse 점수
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 90+

- [ ] 번들 크기
  ```bash
  npm run build
  # .next/analyze 확인
  ```

#### 7. PR 준비

- [ ] develop 브랜치 최신화 & 머지
  ```bash
  git checkout develop
  git pull origin develop
  git checkout feature/week-[X]
  git merge develop
  # 충돌 해결 (필요 시)
  git push
  ```

- [ ] PR 설명 작성
  - [ ] 변경 내용 체크리스트
  - [ ] 관련 이슈 번호
  - [ ] 테스트 항목
  - [ ] 스크린샷

- [ ] Self Review
  - [ ] 변경된 파일 모두 확인
  - [ ] 불필요한 console.log 제거
  - [ ] 주석 정리
  - [ ] 포맷팅 확인

#### 8. PR 생성

```bash
# GitHub에서 PR 생성
# Title: [Week X] 주제명
# Base: develop ← Compare: feature/week-X-[name]
```

- [ ] PR 생성 완료
- [ ] 라벨 추가 (week-X)
- [ ] 리뷰어 지정 (팀 프로젝트 시)

#### 9. 머지 & 정리

- [ ] PR 승인 (리뷰 통과)
- [ ] develop에 머지
- [ ] feature 브랜치 삭제
  ```bash
  git checkout develop
  git pull origin develop
  git branch -d feature/week-[X]
  git push origin --delete feature/week-[X]
  ```

#### 10. 완료 기록

- [ ] `phases/week-[X]-progress.md` 최종 업데이트
- [ ] GIT_WORKFLOW.md의 "완료" 테이블에 추가
- [ ] ROADMAP의 해당 Week 체크박스 완료 표시

---

## 🚨 긴급 Hotfix 체크리스트

### Hotfix: [버그 설명]

**발견일**: YYYY-MM-DD

#### 1. 버그 확인

- [ ] 버그 재현 단계 문서화
- [ ] 영향 범위 파악
- [ ] 우선순위 결정 (긴급 / 일반)

#### 2. Hotfix 브랜치 생성

```bash
# main 브랜치에서 생성
git checkout main
git pull origin main
git checkout -b hotfix/[issue-number]-[name]
```

- [ ] hotfix 브랜치 생성 완료

#### 3. 버그 수정

- [ ] 버그 원인 파악
- [ ] 최소한의 변경으로 수정
- [ ] 테스트로 재현 방지

#### 4. 테스트

- [ ] 로컬 테스트
- [ ] 관련 기능 회귀 테스트
- [ ] 브라우저 호환성 확인

#### 5. PR 생성 (main으로)

```bash
# Title: [Hotfix] 버그 설명
# Base: main ← Compare: hotfix/[name]
```

- [ ] PR 생성
- [ ] 긴급 라벨 추가

#### 6. 머지 & develop 반영

```bash
# main 머지 후
git checkout develop
git pull origin develop
git merge hotfix/[name]
git push origin develop

# hotfix 브랜치 삭제
git branch -d hotfix/[name]
git push origin --delete hotfix/[name]
```

- [ ] main 머지 완료
- [ ] develop 반영 완료
- [ ] hotfix 브랜치 삭제

#### 7. 배포 확인

- [ ] Vercel 배포 성공
- [ ] 프로덕션에서 버그 수정 확인
- [ ] 모니터링 (에러 로그)

---

## 📊 주간 회고 템플릿

### Week [X] 회고 - YYYY-MM-DD

#### 🎯 목표 달성도

- [ ] 모든 작업 항목 완료
- [ ] 예상 일정 준수
- [ ] 품질 기준 충족

#### ✅ 잘한 점

1.
2.
3.

#### 🚧 개선할 점

1.
2.
3.

#### 📚 배운 점

1.
2.
3.

#### ⏰ 시간 분석

- 계획: X일
- 실제: X일
- 차이 원인:

#### 🔮 다음 Week 준비

- [ ] 다음 Week 작업 항목 확인
- [ ] 필요한 학습/리서치
- [ ] 리스크 사전 파악

---

## 🎯 배포 전 최종 체크리스트

### 프로덕션 배포 (Week 8 또는 MVP 완성 시)

#### 1. 기능 완성도

- [ ] 모든 MVP 기능 구현 완료
- [ ] 주요 플로우 에러 없음
- [ ] 브라우저 호환성 100%

#### 2. 성능 최적화

- [ ] Lighthouse 점수 90+
- [ ] 번들 크기 최적화
- [ ] 이미지 최적화
- [ ] 폰트 서브셋

#### 3. 보안

- [ ] 환경 변수 검증 (.env.example 확인)
- [ ] API 키 노출 없음
- [ ] CORS 설정
- [ ] CSP 설정

#### 4. SEO

- [ ] 메타 태그 모든 페이지
- [ ] OG 이미지
- [ ] sitemap.xml
- [ ] robots.txt

#### 5. 모니터링

- [ ] Google Analytics 설정
- [ ] Vercel Analytics 활성화
- [ ] Error 로깅 (Sentry 등)

#### 6. 문서

- [ ] README.md 완성
- [ ] 사용자 가이드
- [ ] API 문서 (필요 시)

#### 7. 배포

```bash
# main 브랜치 최종 푸시
git checkout main
git pull origin main
git merge develop
git push origin main

# 태그 생성
git tag -a v1.0.0 -m "MVP 완성"
git push origin v1.0.0
```

- [ ] main 브랜치 푸시
- [ ] 태그 생성
- [ ] Vercel 배포 성공
- [ ] 도메인 연결
- [ ] HTTPS 인증서 확인

#### 8. 배포 후

- [ ] 프로덕션 전체 플로우 테스트
- [ ] 모바일 테스트
- [ ] 에러 모니터링
- [ ] 성능 모니터링

---

**마지막 업데이트**: 2025-11-29

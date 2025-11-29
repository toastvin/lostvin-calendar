# Project Task Command

당신은 Lostvin Calendar 프로젝트의 개발 보조 AI입니다.
사용자가 `/project-task [작업명]`을 입력하면 다음 프로세스를 따르세요.

## 📋 실행 프로세스

### 1. 의존성 체크

먼저 다음 문서들을 읽고 현재 프로젝트 상태를 파악하세요:

```
필수 읽기:
- plans/FINAL_ROADMAP.md (Week별 작업 계획)
- CODING_STANDARDS.md (코딩 표준)
- SHARED_COMPONENTS.md (공통 컴포넌트)
- GIT_WORKFLOW.md (브랜치 전략)
```

#### 체크 항목:
- [ ] 현재 Week 확인
- [ ] 이전 Week 완료 여부 확인
- [ ] 현재 브랜치 확인 (feature/week-X)
- [ ] 요청된 작업이 현재 Week 범위 내인지 확인

❌ **의존성 문제 발견 시**:
```
⚠️ 의존성 문제 발견

Week X의 다음 작업들이 먼저 완료되어야 합니다:
- [ ] 작업 A
- [ ] 작업 B

다음 중 하나를 선택하세요:
1. 이전 작업 먼저 완료
2. Week 순서 무시하고 진행 (비권장)
```

✅ **의존성 통과 시**: 2단계로 진행

---

### 2. 코딩 표준 자동 참조

작업 시작 전 관련 표준을 출력하세요:

```
📚 코딩 표준 체크리스트

✅ 레이어 분리:
- app/: 라우팅만
- components/: UI만
- lib/: 비즈니스 로직
- types/: 타입 정의
- constants/: 상수

✅ 필수 규칙:
- any 사용 금지
- 매직 값 금지 (constants/ 사용)
- 타입 정의는 types/에만
- 3번 반복 시 공통화 (SHARED_COMPONENTS.md 등록)

✅ 파일 생성 전 확인:
- 기존 컴포넌트 재사용 가능? → SHARED_COMPONENTS.md 확인
- 같은 로직이 이미 있는지? → lib/ 폴더 검색
```

---

### 3. 작업 실행

#### 3.1. 파일 생성/수정 시

**Before (확인 먼저)**:
```typescript
// ❌ 바로 생성하지 말 것
// components/calendar/DateFormatter.tsx

// ✅ 먼저 물어보기
"lib/utils/date.ts에 formatDate 함수가 이미 있습니다.
이것을 재사용하시겠습니까? (Y/n)"
```

**After (코드 작성)**:
```typescript
// ✅ 코딩 표준 준수
// lib/calendar/generator.ts

import { YEAR_RANGE } from '@/constants/calendar';
import { CalendarConfig, Month } from '@/types/calendar';

export function generateYearlyCalendar(year: number): Month[] {
  // 검증
  if (year < YEAR_RANGE.MIN || year > YEAR_RANGE.MAX) {
    throw new CalendarError(
      `Year must be between ${YEAR_RANGE.MIN} and ${YEAR_RANGE.MAX}`,
      'INVALID_YEAR'
    );
  }

  // 로직...
}
```

#### 3.2. 공통 컴포넌트 등록

새로운 공통 컴포넌트/유틸을 만들었다면:

```
🔄 공통화 프로세스

1. 파일 생성 완료: lib/utils/validators.ts
2. SHARED_COMPONENTS.md에 등록 필요

다음 정보를 추가하시겠습니까? (Y/n)
- 파일 경로
- 용도
- 사용 예시
```

---

### 4. 진행 상황 자동 기록

작업 완료 후 `phases/week-X-progress.md`에 자동 기록:

```markdown
## Day X - YYYY-MM-DD

### 완료한 작업
- [x] generateYearlyCalendar 함수 구현
- [x] 윤년 처리 로직 추가
- [x] 테스트 작성

### 생성된 파일
- lib/calendar/generator.ts
- lib/calendar/__tests__/generator.test.ts

### 업데이트된 문서
- SHARED_COMPONENTS.md (generateYearlyCalendar 함수 추가)

### 다음 작업
- [ ] MonthlyCalendar 컴포넌트 구현
```

---

### 5. 커밋 메시지 제안

작업 완료 후 커밋 메시지를 제안하세요:

```bash
# 제안된 커밋 메시지:

git add lib/calendar/generator.ts lib/calendar/__tests__/generator.test.ts
git commit -m "feat(calendar): Add generateYearlyCalendar function

- 12개월 데이터 생성
- 윤년 처리 포함
- Week 시작 요일 옵션 지원
- 단위 테스트 작성

Refs #15"

# 이 커밋으로 진행하시겠습니까? (Y/n)
```

---

## 🎯 작업 예시

### 예시 1: 간단한 함수 추가

**입력**: `/project-task Add date formatting utility`

**출력**:
```
📋 작업: Add date formatting utility

1️⃣ 의존성 체크
✅ Week 1 진행 중
✅ feature/week-1-project-setup 브랜치

2️⃣ 기존 코드 확인
⚠️ lib/utils/date.ts가 이미 존재합니다.
   - formatDate() 함수 이미 있음
   - 추가하려는 기능이 이미 구현되어 있을 수 있습니다.

확인 후 진행하시겠습니까? (Y/n)
```

---

### 예시 2: 컴포넌트 생성

**입력**: `/project-task Create YearlyCalendar component`

**출력**:
```
📋 작업: Create YearlyCalendar component

1️⃣ 의존성 체크
✅ Week 2: Calendar Renderer
✅ 이전 Week 완료 확인

2️⃣ 코딩 표준 참조
📚 컴포넌트 작성 규칙:
- UI만 담당 (비즈니스 로직은 lib/calendar/generator.ts)
- Props 타입 명시
- 재사용 고려 (3번 반복 시 공통화)

3️⃣ 파일 생성
생성할 파일:
- components/calendar/YearlyCalendar.tsx
- components/calendar/__tests__/YearlyCalendar.test.tsx

필요한 의존성:
- lib/calendar/generator.ts (generateYearlyCalendar)
- types/calendar.ts (Month, CalendarConfig)
- hooks/useCalendar.ts (상태 관리)

진행하시겠습니까? (Y/n)
```

---

## 🚨 에러 처리

### 에러 1: Week 순서 위반

```
❌ Week 순서 위반

현재: Week 2
요청한 작업: PDF 생성 (Week 4의 작업)

Week 2의 다음 작업들을 먼저 완료하세요:
- [ ] YearlyCalendar 컴포넌트
- [ ] MonthlyCalendar 컴포넌트
- [ ] 레이아웃 시스템

그래도 진행하시겠습니까? (y/N)
```

### 에러 2: 코딩 표준 위반

```
⚠️ 코딩 표준 위반 감지

파일: components/calendar/YearlyCalendar.tsx
문제:
- any 타입 사용 (라인 15)
- 매직 값 "2025" 하드코딩 (라인 23)
- 비즈니스 로직이 컴포넌트 내부에 있음 (라인 30-50)

수정 제안:
1. any → 명시적 타입
2. 2025 → constants/calendar.ts의 CURRENT_YEAR
3. 로직 → lib/calendar/generator.ts로 이동

자동 수정하시겠습니까? (Y/n)
```

---

## 📊 진행 상황 리포트

작업 완료 후 요약 출력:

```
✅ 작업 완료: Add date formatting utility

📁 변경된 파일:
- lib/utils/date.ts (새로 생성)
- lib/utils/__tests__/date.test.ts (새로 생성)
- SHARED_COMPONENTS.md (업데이트)

📝 커밋 준비:
git commit -m "feat(utils): Add date formatting utilities"

📋 다음 작업:
- [ ] Calendar 컴포넌트에서 formatDate 사용
- [ ] 테스트 작성 완료

🎯 Week 1 진행률: 40% (2/5 완료)
```

---

## 🔧 설정

### 자동화 레벨

사용자가 원하는 자동화 수준을 선택할 수 있습니다:

```
자동화 레벨 선택:

1. 최소 (권장) - 확인만 하고 실행은 사용자가
2. 중간 - 간단한 작업은 자동 실행, 중요한 것만 확인
3. 최대 (비권장) - 모든 작업 자동 실행

현재: 최소 (변경: /project-task --config)
```

---

**마지막 업데이트**: 2025-11-29

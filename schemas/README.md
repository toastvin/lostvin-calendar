# Schemas

> 데이터 검증 스키마 및 타입 정의

## 📁 파일 구조

```
schemas/
├── calendar-config.schema.ts    # 달력 설정 스키마
├── holiday.schema.ts            # 공휴일 데이터 스키마 (추후 추가)
└── README.md                    # 이 파일
```

## 🎯 사용 목적

1. **런타임 검증**: Zod를 사용한 데이터 유효성 검증
2. **타입 안정성**: TypeScript 타입 자동 생성
3. **URL 파라미터 파싱**: 안전한 데이터 변환
4. **API 응답 검증**: 외부 API 데이터 검증

## 📖 사용 예시

### 설정 검증

```typescript
import { validateConfig, CalendarConfig } from '@/schemas/calendar-config.schema';

// 유효한 설정
const config: CalendarConfig = {
  year: 2025,
  type: 'yearly',
  countries: ['KR', 'US'],
  paperSize: 'A4',
  orientation: 'portrait',
  weekStart: 'monday',
  ecoMode: false,
  showLunar: false,
  showWeekNumber: false,
};

// 검증
try {
  const validated = validateConfig(config);
  console.log('Valid config:', validated);
} catch (error) {
  console.error('Invalid config:', error);
}
```

### URL 파라미터 파싱

```typescript
import { parseURLParams } from '@/schemas/calendar-config.schema';

// URL: /?year=2025&type=yearly&countries=KR,US&eco=1
const params = {
  year: '2025',
  type: 'yearly',
  countries: 'KR,US',
  eco: '1',
};

const config = parseURLParams(params);
// { year: 2025, type: 'yearly', countries: ['KR', 'US'], ecoMode: true }
```

### 안전한 검증

```typescript
import { safeValidateConfig } from '@/schemas/calendar-config.schema';

const result = safeValidateConfig(userInput);

if (result.success) {
  // 유효한 데이터
  const config = result.data;
} else {
  // 에러 처리
  console.error(result.error.errors);
}
```

## 🔒 검증 규칙

### CalendarConfig

| 필드 | 타입 | 필수 | 제약 조건 |
|------|------|------|-----------|
| year | number | ✅ | 2020~2030 |
| type | 'yearly' \| 'monthly' \| 'quarterly' | ✅ | - |
| countries | Country[] | ✅ | 1~4개 |
| paperSize | 'A4' \| 'A3' | ✅ | - |
| orientation | 'portrait' \| 'landscape' | ✅ | - |
| weekStart | 'sunday' \| 'monday' | ✅ | - |
| ecoMode | boolean | ✅ | - |
| showLunar | boolean | ✅ | - |
| showWeekNumber | boolean | ✅ | - |
| preset | PresetType | ❌ | 선택 |
| month | number | ❌ | 1~12 |
| customTitle | string | ❌ | 최대 100자 |

### Memo

| 필드 | 타입 | 필수 | 제약 조건 |
|------|------|------|-----------|
| date | string | ✅ | YYYY-MM-DD 형식 |
| content | string | ✅ | 최대 200자 |
| createdAt | string | ✅ | ISO 8601 datetime |

## 🛠️ 타입 추출

```typescript
import { z } from 'zod';
import { CalendarConfigSchema } from '@/schemas/calendar-config.schema';

// Zod 스키마에서 TypeScript 타입 추출
type CalendarConfig = z.infer<typeof CalendarConfigSchema>;

// 부분 타입
type PartialConfig = Partial<CalendarConfig>;

// 필수 필드만
type RequiredConfig = Required<Pick<CalendarConfig, 'year' | 'type'>>;
```

## 📚 참고

- [Zod 문서](https://zod.dev/)
- [types/calendar.ts](../types/calendar.ts) - 타입 정의
- [CODING_STANDARDS.md](../CODING_STANDARDS.md) - 코딩 표준

# Week 4 검증 체크리스트

**테스트 URL**: http://localhost:3000/test-pdf-share

---

## 1. PDF 한글 폰트 깨짐 없음

**현재 구현 상태**: ✅ 구현 완료

**구현 내용**:
- Gowun Batang (serif) - 본문용
- Noto Sans KR (sans-serif) - 요일 헤더용
- Google Fonts CDN 활용
- 클라이언트 사이드 폰트 등록

**테스트 방법**:
1. http://localhost:3000/test-pdf-share 접속
2. "PDF 다운로드" 버튼 클릭
3. 다운로드된 PDF 파일 열기
4. 제목 "2025년 달력" 확인
5. 월 이름 (1월, 2월, ...) 확인
6. 요일 이름 (일, 월, 화, ...) 확인
7. 한글이 깨지지 않고 선명하게 보이는지 확인

**예상 결과**:
- ✅ 모든 한글 텍스트가 정상 렌더링
- ✅ 공휴일 이름이 빨간색으로 표시
- ✅ PDF 뷰어에서 폰트가 임베디드되어 표시됨

---

## 2. PDF 다운로드 성공 (2025년 연간)

**현재 구현 상태**: ✅ 구현 완료

**구현 내용**:
- @react-pdf/renderer 사용
- A4/A3 용지 크기 지원
- 세로/가로 방향 지원
- 12개월 그리드 레이아웃 (세로 3열, 가로 4열)
- 공휴일, 주말, 오늘 표시

**테스트 방법**:
1. 설정 패널에서 연도 변경 (2025, 2026 등)
2. 국가 선택 (KR, US, JP)
3. 용지 크기 선택 (A4, A3)
4. 방향 선택 (세로, 가로)
5. "PDF 다운로드" 버튼 클릭
6. 파일명 확인: `calendar-2025-KR.pdf` 형식

**예상 결과**:
- ✅ 브라우저 다운로드 시작
- ✅ PDF 파일이 정상적으로 저장됨
- ✅ 12개월이 모두 한 페이지에 표시
- ✅ 공휴일이 빨간색으로 표시
- ✅ 주말이 파란색으로 표시

---

## 3. URL 복사 → 새 탭 → 설정 복원

**현재 구현 상태**: ✅ 구현 완료

**구현 내용**:
- Clipboard API 활용
- URL 파라미터 인코딩/디코딩
- useSearchParams + Suspense 패턴
- 성공/실패 토스트 (2초 자동 리셋)

**테스트 방법**:
1. 설정 패널에서 여러 옵션 변경:
   - 연도: 2026
   - 국가: US, JP
   - 용지: A3
   - 방향: 가로
   - 주번호 표시: ON
2. "링크 복사" 버튼 클릭
3. 버튼이 "✅ 링크 복사됨!"으로 변경되는지 확인
4. 새 탭 열기 (Cmd/Ctrl + T)
5. 주소창에 붙여넣기 (Cmd/Ctrl + V)
6. Enter 키 누르기

**예상 결과**:
- ✅ URL 형식: `http://localhost:3000/test-pdf-share?year=2026&type=yearly&countries=US,JP&paper=A3&orient=landscape&start=sunday&week=1`
- ✅ 새 탭에서 동일한 설정으로 복원됨
- ✅ 달력 미리보기도 동일하게 표시
- ✅ "✅ URL에서 설정 복원됨" 메시지 표시

---

## 4. 모바일 Safari PDF 다운로드

**현재 구현 상태**: ⚠️ 테스트 필요 (구현은 완료)

**구현 내용**:
- @react-pdf/renderer의 PDFDownloadLink 사용
- 브라우저 네이티브 다운로드 API 활용

**테스트 방법**:
1. 모바일 기기에서 로컬 네트워크 주소 접속
   - http://192.168.0.34:3000/test-pdf-share
2. "PDF 다운로드" 버튼 클릭
3. Safari의 다운로드 동작 확인

**예상 결과**:
- ✅ Safari에서 PDF 미리보기 표시
- ✅ 공유 버튼으로 저장 가능
- ⚠️ iOS의 보안 정책에 따라 직접 다운로드가 아닌 미리보기 → 공유 흐름일 수 있음

**알려진 제약사항**:
- iOS Safari는 직접 파일 다운로드를 제한할 수 있음
- 대신 PDF 미리보기 → "공유" 버튼 → "파일에 저장" 흐름 권장

---

## 5. 카카오톡 공유 버튼 동작

**현재 구현 상태**: ❌ 미구현

**현재 구현 내용**:
- URL 복사 기능만 구현됨 (Clipboard API)

**필요한 작업**:
카카오톡 공유 버튼이 필요하다면 추가 구현이 필요합니다:

### Option A: 카카오톡 JavaScript SDK 사용
```typescript
// Kakao SDK 초기화
Kakao.init('YOUR_KAKAO_APP_KEY');

// 공유하기 버튼
Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '2025년 달력',
    description: '프린트 친화적인 달력',
    imageUrl: 'https://example.com/calendar-preview.png',
    link: {
      mobileWebUrl: shareUrl,
      webUrl: shareUrl,
    },
  },
});
```

### Option B: 카카오톡 공유 URL 스킴 사용
```typescript
const kakaoShareUrl = `https://sharer.kakao.com/talk/friends?url=${encodeURIComponent(shareUrl)}`;
window.open(kakaoShareUrl, '_blank');
```

### 추가 필요 사항:
1. Kakao Developers에서 앱 등록
2. JavaScript SDK 추가
3. ShareButton 컴포넌트 확장
4. 카카오톡 공유 전용 버튼 UI

**권장사항**:
- Week 4 범위에는 포함되지 않음 (FINAL_ROADMAP.md 확인)
- Week 5 (메인 페이지) 또는 향후 개선 사항으로 고려
- 현재는 URL 복사 후 사용자가 직접 카카오톡에 붙여넣기 가능

---

## 자동화 검증

### 빌드 검증 (완료 ✅)
```bash
pnpm type-check  # ✅ 통과
pnpm build       # ✅ 성공
```

### 수동 검증 체크리스트

브라우저에서 http://localhost:3000/test-pdf-share 접속 후:

- [ ] 1. PDF 다운로드 버튼 클릭
- [ ] 2. PDF 파일 열기
- [ ] 3. 한글 폰트 정상 렌더링 확인
- [ ] 4. 공휴일 빨간색 표시 확인
- [ ] 5. 주말 파란색 표시 확인
- [ ] 6. 설정 변경 (연도, 국가, 용지, 방향)
- [ ] 7. "링크 복사" 버튼 클릭
- [ ] 8. 성공 토스트 확인 ("✅ 링크 복사됨!")
- [ ] 9. 새 탭에서 복사한 URL 붙여넣기
- [ ] 10. 설정이 동일하게 복원되는지 확인
- [ ] 11. (선택) 모바일 Safari 테스트

---

## 결론

### 구현 완료 항목 (4/5)
1. ✅ PDF 한글 폰트 깨짐 없음
2. ✅ PDF 다운로드 성공 (2025년 연간)
3. ✅ URL 복사 → 새 탭 → 설정 복원
4. ⚠️ 모바일 Safari PDF 다운로드 (테스트 필요)
5. ❌ 카카오톡 공유 버튼 동작 (미구현)

### 다음 단계

**즉시 가능한 테스트**:
- 브라우저에서 1~3번 항목 수동 테스트

**추가 논의 필요**:
- 카카오톡 공유 기능이 Week 4 필수 요구사항인지 확인
- FINAL_ROADMAP.md에는 "URL 공유" 기능만 명시됨
- 카카오톡 전용 버튼은 Week 5 이후 추가 개선사항으로 고려 권장

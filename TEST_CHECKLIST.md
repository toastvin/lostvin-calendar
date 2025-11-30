# Week 8 테스트 체크리스트

**작성일**: 2025-11-30
**목적**: Week 8 배포 전 최종 검증

---

## 1. 전체 플로우 테스트 ✅

### 1.1 기본 달력 생성
- [ ] 홈페이지 접속 (`http://localhost:3000/ko`)
- [ ] 연도 선택 (올해/내년)
- [ ] 국가 선택 (한국/미국/일본/중국)
- [ ] 용지 크기 선택 (A4/A3)
- [ ] 방향 선택 (세로/가로)
- [ ] 주 시작 요일 선택 (월요일/일요일)
- [ ] 달력 생성 확인

### 1.2 프리셋 테스트
- [ ] 기본 달력 프리셋 선택
- [ ] 습관 추적 프리셋 선택 (체크박스 3개 표시 확인)
- [ ] 식단표 프리셋 선택 (큰 메모 공간 확인)

### 1.3 Eco 모드 테스트
- [ ] Eco 모드 ON
- [ ] 텍스트 색상 회색(#555) 확인
- [ ] 선 두께 얇게(0.5px) 확인
- [ ] 점선 테두리 확인

### 1.4 음력 표시 테스트
- [ ] 음력 표시 ON
- [ ] 음력 날짜 표시 확인 (예: 1.1, 8.15)
- [ ] 윤달 표시 확인 (예: 윤4.15)

### 1.5 메모 기능 테스트
- [ ] 날짜 클릭하여 메모 입력
- [ ] LocalStorage에 저장 확인
- [ ] 페이지 새로고침 후 메모 유지 확인
- [ ] 빈 메모 삭제 확인

### 1.6 공휴일 표시 테스트
- [ ] 한국 공휴일 표시 (빨간색)
- [ ] 미국 공휴일 표시
- [ ] 일본 공휴일 표시
- [ ] 중국 공휴일 표시
- [ ] 공휴일 hover 시 이름 툴팁 표시

### 1.7 PDF 다운로드 테스트
- [ ] "PDF 다운로드" 버튼 클릭
- [ ] PDF 파일 생성 확인
- [ ] PDF 파일명 확인 (예: calendar-2025-ko.pdf)
- [ ] PDF 내용 확인 (공휴일, 음력 포함)

### 1.8 URL 공유 테스트
- [ ] "URL 공유" 버튼 클릭
- [ ] URL 복사 확인
- [ ] 새 탭에서 URL 열어서 동일한 설정 확인
- [ ] 쿼리 파라미터 확인 (year, countries, paperSize 등)

### 1.9 프린트 테스트
- [ ] 브라우저 프린트 (Cmd/Ctrl + P)
- [ ] 설정 패널 숨김 확인
- [ ] 프린트 미리보기 확인
- [ ] A4/A3 용지 크기 확인
- [ ] 페이지 나누기 확인

### 1.10 다국어 테스트
- [ ] 한국어(ko) 페이지 확인
- [ ] 영어(en) 페이지 확인
- [ ] 언어 전환 시 메타데이터 확인
- [ ] SEO 태그 확인 (title, description, og:locale)

---

## 2. Lighthouse 점수 측정 ⏳

### 2.1 Performance
```bash
# Chrome DevTools에서 Lighthouse 실행
# Target: 90+
```
- [ ] Performance 점수: ____ / 100
- [ ] First Contentful Paint: ____ ms
- [ ] Largest Contentful Paint: ____ ms
- [ ] Total Blocking Time: ____ ms
- [ ] Cumulative Layout Shift: ____

### 2.2 Accessibility
- [ ] Accessibility 점수: ____ / 100
- [ ] 색상 대비 확인
- [ ] 키보드 네비게이션 확인
- [ ] ARIA 레이블 확인

### 2.3 Best Practices
- [ ] Best Practices 점수: ____ / 100
- [ ] HTTPS 사용
- [ ] 보안 헤더 확인
- [ ] 콘솔 에러 0개

### 2.4 SEO
```bash
# Target: 90+
```
- [ ] SEO 점수: ____ / 100
- [ ] Meta description 확인
- [ ] Canonical URL 확인
- [ ] robots.txt 확인
- [ ] sitemap.xml 확인

---

## 3. 브라우저 호환성 ⏳

### 3.1 Chrome (최신 버전)
- [ ] 달력 렌더링 정상
- [ ] PDF 다운로드 정상
- [ ] 프린트 미리보기 정상
- [ ] 메모 기능 정상

### 3.2 Safari (macOS)
- [ ] 달력 렌더링 정상
- [ ] PDF 다운로드 정상
- [ ] 프린트 미리보기 정상
- [ ] 메모 기능 정상

### 3.3 Firefox (최신 버전)
- [ ] 달력 렌더링 정상
- [ ] PDF 다운로드 정상
- [ ] 프린트 미리보기 정상
- [ ] 메모 기능 정상

### 3.4 Edge (최신 버전)
- [ ] 달력 렌더링 정상
- [ ] PDF 다운로드 정상
- [ ] 프린트 미리보기 정상
- [ ] 메모 기능 정상

---

## 4. 모바일 테스트 ⏳

### 4.1 iOS Safari
- [ ] 반응형 레이아웃 확인
- [ ] 터치 인터랙션 정상
- [ ] PDF 다운로드 정상
- [ ] 공유 기능 정상

### 4.2 Android Chrome
- [ ] 반응형 레이아웃 확인
- [ ] 터치 인터랙션 정상
- [ ] PDF 다운로드 정상
- [ ] 공유 기능 정상

### 4.3 화면 크기 테스트
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 414px (iPhone 12/13 Pro Max)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)

---

## 5. Vercel 배포 ⏳

### 5.1 배포 준비
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login
```
- [ ] Vercel CLI 설치 완료
- [ ] Vercel 로그인 완료

### 5.2 배포 실행
```bash
# 첫 배포
vercel

# 프로덕션 배포
vercel --prod
```
- [ ] 첫 배포 성공
- [ ] 프로덕션 배포 성공
- [ ] 배포 URL 확인: ____________________

### 5.3 환경 변수 설정
- [ ] `NODE_ENV=production` 설정
- [ ] `NEXT_PUBLIC_DEFAULT_LOCALE=ko` 설정
- [ ] 기타 필요한 환경 변수 설정

### 5.4 도메인 연결 (선택)
- [ ] 커스텀 도메인 추가
- [ ] DNS 설정 완료
- [ ] SSL 인증서 확인

### 5.5 배포 후 확인
- [ ] 프로덕션 URL 접속 확인
- [ ] 전체 기능 동작 확인
- [ ] 에러 로그 확인
- [ ] Analytics 확인 (Vercel Analytics)

---

## 6. 최종 검증 체크리스트

### 6.1 코드 품질
- [x] TypeScript 타입 에러 0개
- [x] ESLint 에러 0개
- [x] 빌드 성공
- [x] 130개 정적 페이지 생성

### 6.2 기능 완성도
- [ ] MVP 필수 기능 100% 완료
- [ ] MVP 권장 기능 100% 완료
- [ ] 모든 Week 완료 (Week 0-8)

### 6.3 성능
- [ ] 빌드 시간 < 5초
- [ ] 페이지 로드 시간 < 3초
- [ ] Lighthouse Performance > 90

### 6.4 사용자 경험
- [ ] 직관적인 UI
- [ ] 모바일 친화적
- [ ] 프린트 최적화
- [ ] 다국어 지원

### 6.5 보안
- [x] 보안 헤더 설정
- [ ] XSS 방지
- [ ] CSRF 방지
- [ ] 민감 정보 노출 없음

---

## 7. 알려진 이슈 및 개선 사항

### 7.1 현재 알려진 이슈
- 없음

### 7.2 향후 개선 사항
- [ ] Lighthouse Performance 점수 개선
- [ ] 이미지 최적화
- [ ] 폰트 서브셋 최적화
- [ ] 코드 스플리팅 최적화
- [ ] PWA 지원

---

## 8. 테스트 실행 가이드

### 로컬 개발 서버 실행
```bash
cd /Users/thesymbol/Desktop/just-calendar
pnpm dev
```

### Lighthouse 실행
1. Chrome DevTools 열기 (F12)
2. "Lighthouse" 탭 선택
3. "Analyze page load" 클릭
4. 결과 확인

### 브라우저 호환성 테스트
- BrowserStack 또는 실제 디바이스 사용

### 모바일 테스트
- Chrome DevTools Device Mode
- 실제 iOS/Android 디바이스

---

**체크리스트 작성자**: Claude Code
**최종 업데이트**: 2025-11-30

# 프로덕션 배포 체크리스트

**프로젝트**: Lostvin Calendar v1.0.0
**작성일**: 2025-11-30
**배포 플랫폼**: Vercel

---

## ✅ 1. 개발 완료 확인

### Week 0-8 완료 여부
- ✅ Week 0: 프로젝트 설정 및 타입 정의
- ✅ Week 1: 달력 생성 로직
- ✅ Week 2: 공휴일 통합
- ✅ Week 3: UI 컴포넌트
- ✅ Week 4: PDF 생성 및 URL 공유
- ✅ Week 5: 프린트 CSS 최적화 및 반응형
- ✅ Week 6: 다국어(i18n) 및 SEO 최적화
- ✅ Week 7: MVP 권장 기능 (Eco, 프리셋, 메모, 음력)
- ✅ Week 8: 테스트 & 배포 준비

**완료율**: 100% (9/9)

---

## ✅ 2. 코딩 표준 준수

### CODING_STANDARDS.md 체크
- ✅ 레이어 분리 (app/, components/, lib/, types/, constants/)
- ✅ `any` 타입 사용: 0개
- ✅ 매직 값 하드코딩: 0개 (모두 constants/로 분리)
- ✅ One Source of Truth 준수
- ✅ 단일 책임 원칙 준수
- ✅ 공용 컴포넌트 관리 (components/shared/)

### TypeScript Strict Mode
```bash
✅ TypeScript 타입 에러: 0개
✅ strict mode: 100% 준수
✅ any 사용: 0개 (검증 완료)
```

### ESLint
```bash
✅ ESLint 에러: 0개
✅ ESLint 경고: 0개
✅ 규칙 준수: 100%
```

---

## ✅ 3. 테스트 통과 확인

### 자동 테스트
- ✅ TypeScript 타입 체크 통과
- ✅ ESLint 검사 통과
- ✅ 빌드 성공 (130 static pages)
- ✅ 개발 서버 정상 작동

### 수동 테스트 (필요 시)
- ⏳ Lighthouse 성능 점수 (목표: 90+)
- ⏳ 브라우저 호환성 (Chrome, Safari, Firefox, Edge)
- ⏳ 모바일 반응형 테스트
- ⏳ 실제 프린터 출력 테스트

---

## 🚀 4. Vercel 배포

### 4.1 배포 준비 완료 항목
- ✅ vercel.json 설정
- ✅ .vercelignore 설정
- ✅ 보안 헤더 설정
- ✅ 환경 변수 템플릿 (.env.example)
- ✅ GitHub 저장소 푸시
- ✅ v1.0.0 태그 생성

### 4.2 Vercel 배포 실행

#### Step 1: Vercel CLI 설치
```bash
npm i -g vercel
```
- [ ] Vercel CLI 설치 완료

#### Step 2: Vercel 로그인
```bash
vercel login
```
- [ ] Vercel 계정 로그인 완료

#### Step 3: 첫 배포 (Preview)
```bash
cd /Users/thesymbol/Desktop/just-calendar
vercel
```
- [ ] Preview 배포 성공
- [ ] Preview URL 확인: ____________________
- [ ] Preview URL 기능 테스트 완료

#### Step 4: 프로덕션 배포
```bash
vercel --prod
```
- [ ] 프로덕션 배포 성공
- [ ] 프로덕션 URL 확인: ____________________

### 4.3 Vercel 대시보드 설정

#### 프로젝트 설정
- [ ] Project Name: just-calendar (또는 원하는 이름)
- [ ] Framework Preset: Next.js
- [ ] Build Command: `pnpm build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `pnpm install`
- [ ] Node.js Version: 18.x

#### 환경 변수 설정
```
Production 환경 변수:
```
- [ ] `NODE_ENV` = `production`
- [ ] `NEXT_PUBLIC_DEFAULT_LOCALE` = `ko`
- [ ] `NEXT_PUBLIC_SUPPORTED_LOCALES` = `ko,en`

```
선택적 환경 변수 (나중에 추가 가능):
```
- [ ] `NEXT_PUBLIC_GA_ID` (Google Analytics)
- [ ] `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (Google AdSense)
- [ ] `NEXT_PUBLIC_APP_URL` (커스텀 도메인)

---

## 📊 5. 배포 후 검증

### 5.1 기본 기능 테스트
- [ ] 홈페이지 접속 확인
- [ ] 한국어/영어 전환 확인
- [ ] 달력 생성 확인
- [ ] PDF 다운로드 확인
- [ ] URL 공유 확인
- [ ] 프린트 미리보기 확인

### 5.2 SEO 확인
- [ ] robots.txt 접근 가능 (https://your-domain.com/robots.txt)
- [ ] sitemap.xml 접근 가능 (https://your-domain.com/sitemap.xml)
- [ ] Google Search Console 등록
- [ ] Meta 태그 확인 (title, description, og:image)

### 5.3 성능 측정
- [ ] Lighthouse 성능 점수: ____ / 100 (목표: 90+)
- [ ] Lighthouse Accessibility: ____ / 100
- [ ] Lighthouse Best Practices: ____ / 100
- [ ] Lighthouse SEO: ____ / 100 (목표: 90+)

### 5.4 Vercel Analytics
- [ ] Vercel Analytics 활성화
- [ ] Web Vitals 모니터링 확인
- [ ] 트래픽 모니터링 확인

---

## 🌐 6. 도메인 연결 (선택사항)

### 6.1 도메인 구매
- [ ] 도메인 이름 결정: ____________________
- [ ] 도메인 등록 (예: calprint.kr, lostvin-calendar.com)
- [ ] 도메인 등록 완료

### 6.2 Vercel 도메인 설정
- [ ] Vercel 대시보드 → Domains
- [ ] 커스텀 도메인 추가
- [ ] DNS 설정 (A 레코드 또는 CNAME)
- [ ] SSL 인증서 자동 발급 확인

### 6.3 DNS 설정 예시
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```
- [ ] DNS 설정 완료
- [ ] DNS 전파 확인 (최대 48시간)
- [ ] HTTPS 접속 확인

---

## 📈 7. Google Analytics 설정 (선택사항)

### 7.1 Google Analytics 계정 생성
- [ ] Google Analytics 계정 생성
- [ ] 속성 생성 (GA4)
- [ ] 측정 ID 발급: G-XXXXXXXXXX

### 7.2 Next.js 통합
- [ ] Vercel 환경 변수에 `NEXT_PUBLIC_GA_ID` 추가
- [ ] 코드에 Google Analytics 스크립트 추가 (layout.tsx)
- [ ] 배포 후 실시간 데이터 확인

---

## 💰 8. Google AdSense 설정 (선택사항, 나중에)

**조건**: 트래픽 확보 후 (최소 월 1,000 방문자)

### 8.1 AdSense 신청
- [ ] Google AdSense 계정 생성
- [ ] 사이트 추가 및 승인 요청
- [ ] 승인 대기 (보통 2-4주)

### 8.2 광고 코드 삽입
- [ ] AdSense 승인 완료
- [ ] 광고 단위 생성
- [ ] 광고 코드 삽입
- [ ] 광고 표시 확인

---

## 🔒 9. 보안 확인

### 보안 헤더 (vercel.json에 이미 설정됨)
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block

### HTTPS
- [ ] HTTPS 자동 리디렉션 확인
- [ ] SSL 인증서 유효성 확인

### 환경 변수 보안
- [ ] `.env.local` 파일 `.gitignore`에 포함 확인
- [ ] 민감한 정보 GitHub에 푸시되지 않았는지 확인

---

## 📱 10. 소셜 미디어 및 마케팅 (선택사항)

### Open Graph 메타 태그
- ✅ og:title 설정
- ✅ og:description 설정
- ✅ og:type = website
- ✅ og:locale 설정 (ko_KR, en_US)
- [ ] og:image 설정 (소셜 미디어 공유 이미지)

### 소셜 미디어 공유
- [ ] Facebook 공유 테스트
- [ ] Twitter 공유 테스트
- [ ] 카카오톡 공유 테스트 (선택)

---

## 🎯 11. 최종 체크리스트

### 필수 항목
- ✅ 모든 Week (0-8) 완료
- ✅ 코딩 표준 100% 준수
- ✅ TypeScript 타입 에러 0개
- ✅ ESLint 에러/경고 0개
- ✅ 빌드 성공
- [ ] Vercel 배포 성공
- [ ] 프로덕션 URL 접속 확인
- [ ] 기본 기능 동작 확인

### 권장 항목
- [ ] Lighthouse 성능 90+
- [ ] 브라우저 호환성 테스트
- [ ] 모바일 반응형 테스트
- [ ] 실제 프린터 출력 테스트

### 선택 항목
- [ ] 커스텀 도메인 연결
- [ ] Google Analytics 설정
- [ ] Google AdSense 승인
- [ ] 소셜 미디어 마케팅

---

## 📋 Vercel 배포 명령어 요약

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. Preview 배포
cd /Users/thesymbol/Desktop/just-calendar
vercel

# 4. 프로덕션 배포
vercel --prod

# 5. 배포 상태 확인
vercel ls

# 6. 환경 변수 추가
vercel env add NEXT_PUBLIC_GA_ID

# 7. 도메인 추가
vercel domains add your-domain.com
```

---

## 🎉 배포 완료 후 할 일

1. **팀원/고객에게 공유**
   - 프로덕션 URL 공유
   - 사용 가이드 제공

2. **모니터링 설정**
   - Vercel Analytics 확인
   - Google Analytics 설정 (선택)
   - 에러 로그 모니터링

3. **사용자 피드백 수집**
   - 버그 리포트 채널 준비
   - 기능 개선 요청 수집

4. **마케팅**
   - SEO 최적화 (이미 완료)
   - 소셜 미디어 홍보
   - 블로그/커뮤니티 공유

---

## 📞 문제 해결

### 배포 실패 시
1. 로그 확인: `vercel logs`
2. 빌드 에러 확인: `pnpm build`
3. 환경 변수 확인
4. Vercel 대시보드에서 빌드 로그 확인

### 성능 이슈 시
1. Lighthouse 성능 측정
2. Next.js 이미지 최적화
3. 코드 스플리팅 확인
4. Vercel Analytics에서 병목 지점 확인

---

**체크리스트 작성**: Claude Code
**마지막 업데이트**: 2025-11-30
**프로젝트 상태**: 배포 준비 완료 ✅

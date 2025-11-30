/**
 * PDF 폰트 등록 (Week 4)
 *
 * 책임:
 * - 한글 폰트 등록 (Gowun Batang, Noto Sans KR)
 * - 폰트 로딩 에러 핸들링
 *
 * 참고:
 * - Week 0에서 검증 완료 (한글 깨짐 없음)
 * - Google Fonts CDN 사용 (프로덕션 ready)
 */

import { Font } from '@react-pdf/renderer';

/**
 * PDF에서 사용할 한글 폰트 등록
 *
 * 이 함수는 애플리케이션 초기화 시 한 번만 호출되어야 합니다.
 * (PDF 생성 시마다 호출하면 중복 등록 경고 발생)
 */
export function registerKoreanFonts(): void {
  try {
    // Gowun Batang (명조체) - 달력 제목, 날짜에 사용
    Font.register({
      family: 'Gowun Batang',
      src: 'https://fonts.gstatic.com/s/gowunbatang/v7/ijwSs5nhRMIjYsdSgcMa3wRhXLH-yuAtLw.woff2',
    });

    // Noto Sans KR (고딕체) - 공휴일 이름, 부가 정보에 사용
    Font.register({
      family: 'Noto Sans KR',
      src: 'https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5CgmOsn7uwpYcuH8y.woff2',
      fontWeight: 400,
    });

    Font.register({
      family: 'Noto Sans KR',
      src: 'https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5CgmOqXbuwpYcuH8y.woff2',
      fontWeight: 700,
    });
  } catch (error) {
    console.error('폰트 등록 실패:', error);
    // 폰트 등록 실패 시에도 PDF 생성은 계속 진행 (기본 폰트 사용)
  }
}

/**
 * PDF에서 사용할 폰트 패밀리 상수
 */
export const PDF_FONTS = {
  SERIF: 'Gowun Batang', // 명조체
  SANS_SERIF: 'Noto Sans KR', // 고딕체
} as const;

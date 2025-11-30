/**
 * Week 7: 음력 변환 유틸리티
 *
 * lunar-javascript 라이브러리를 사용하여 양력 날짜를 음력으로 변환
 * 한국, 중국, 일본 등 한자문화권 음력 지원
 */

import { Solar } from 'lunar-javascript';

/**
 * 음력 날짜 정보
 */
export interface LunarDate {
  year: number;        // 음력 연도
  month: number;       // 음력 월 (1~12)
  day: number;         // 음력 일 (1~30)
  isLeapMonth: boolean; // 윤달 여부
  monthInKorean: string; // 한국어 월 (예: "정월", "유월")
  dayInKorean: string;   // 한국어 일 (예: "초하루", "보름")
  formatted: string;     // 포맷된 문자열 (예: "정월 초하루")
}

// 음력 월 한국어 표현
const LUNAR_MONTHS_KR = [
  '',
  '정월', '이월', '삼월', '사월', '오월', '유월',
  '칠월', '팔월', '구월', '시월', '동월', '섣달'
];

// 음력 일 한국어 표현
const LUNAR_DAYS_KR = [
  '',
  '초하루', '초이틀', '초사흘', '초나흘', '초닷새', '초엿새', '초이레', '초여드레', '초아흐레', '초열흘',
  '열하루', '열이틀', '열사흘', '열나흘', '열닷새', '열엿새', '열이레', '열여드레', '열아흐레', '스무날',
  '스물하루', '스물이틀', '스물사흘', '스물나흘', '스물닷새', '스물엿새', '스물이레', '스물여드레', '스물아흐레', '그믐날'
];

/**
 * 양력 날짜를 음력으로 변환합니다
 *
 * @param date - 양력 날짜
 * @returns 음력 날짜 정보
 */
export function convertToLunar(date: Date): LunarDate {
  try {
    // Solar 객체 생성 (양력)
    const solar = Solar.fromDate(date);

    // 음력으로 변환
    const lunar = solar.getLunar();

    const year = lunar.getYear();
    const month = lunar.getMonth();
    const day = lunar.getDay();
    const isLeapMonth = lunar.getLeapMonth() > 0;

    // 한국어 표현
    const monthInKorean = isLeapMonth ? `윤${LUNAR_MONTHS_KR[month]}` : LUNAR_MONTHS_KR[month];
    const dayInKorean = LUNAR_DAYS_KR[day] || `${day}일`;

    // 포맷된 문자열
    const formatted = `${monthInKorean} ${dayInKorean}`;

    return {
      year,
      month,
      day,
      isLeapMonth,
      monthInKorean,
      dayInKorean,
      formatted,
    };
  } catch (error) {
    console.error('Error converting to lunar date:', error);
    // 에러 발생 시 기본값 반환
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      isLeapMonth: false,
      monthInKorean: '',
      dayInKorean: '',
      formatted: '',
    };
  }
}

/**
 * 음력 날짜를 간단한 형식으로 반환합니다 (월.일)
 *
 * @param date - 양력 날짜
 * @returns 간단한 음력 표시 (예: "1.1", "윤4.15")
 */
export function getLunarSimple(date: Date): string {
  const lunar = convertToLunar(date);
  const prefix = lunar.isLeapMonth ? '윤' : '';
  return `${prefix}${lunar.month}.${lunar.day}`;
}

/**
 * 음력 절기(24절기) 여부를 확인합니다
 *
 * @param date - 양력 날짜
 * @returns 절기 이름 (없으면 빈 문자열)
 */
export function getSolarTerm(date: Date): string {
  try {
    const solar = Solar.fromDate(date);
    const lunar = solar.getLunar();

    // 절기 확인
    const jieQi = lunar.getJieQi();
    return jieQi || '';
  } catch (error) {
    console.error('Error getting solar term:', error);
    return '';
  }
}

/**
 * 음력 명절 여부를 확인합니다
 *
 * @param date - 양력 날짜
 * @returns 명절 이름 (없으면 빈 문자열)
 */
export function getLunarFestival(date: Date): string {
  const lunar = convertToLunar(date);

  // 주요 음력 명절
  const festivals: Record<string, string> = {
    '1.1': '설날',
    '1.15': '정월대보름',
    '4.8': '부처님오신날',
    '8.15': '추석',
    '12.30': '섣달그믐', // 윤년 대비
  };

  const key = `${lunar.month}.${lunar.day}`;
  return festivals[key] || '';
}

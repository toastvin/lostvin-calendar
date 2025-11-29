/**
 * 달력 생성 로직 (비즈니스 로직 레이어)
 *
 * 책임:
 * - 연간/월간 달력 데이터 생성
 * - 윤년 처리
 * - 주 시작 요일 처리 (일요일/월요일)
 * - 주차 계산 (ISO 8601)
 */

import type { Month, Day, WeekStart } from '@/types/calendar';

/**
 * 윤년 확인
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 특정 월의 일수 반환
 */
function getDaysInMonth(year: number, month: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2 && isLeapYear(year)) {
    return 29;
  }

  return daysInMonth[month - 1];
}

/**
 * ISO 8601 주차 계산
 * - 주는 월요일부터 시작
 * - 1월 4일이 포함된 주가 1주차
 */
function getWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7; // 월요일 = 0
  target.setDate(target.getDate() - dayNr + 3); // 목요일로 이동
  const jan4 = new Date(target.getFullYear(), 0, 4);
  const dayDiff = (target.valueOf() - jan4.valueOf()) / 86400000;
  return 1 + Math.ceil(dayDiff / 7);
}

/**
 * 요일 번호 조정 (주 시작 요일에 따라)
 * - sunday: 0(일) ~ 6(토)
 * - monday: 0(월) ~ 6(일)
 */
function adjustDayOfWeek(dayOfWeek: number, weekStart: WeekStart): number {
  if (weekStart === 'monday') {
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  }
  return dayOfWeek;
}

/**
 * 주말 여부 확인
 * - 주 시작이 일요일: 토요일(6), 일요일(0)
 * - 주 시작이 월요일: 토요일(5), 일요일(6)
 */
function isWeekend(dayOfWeek: number, weekStart: WeekStart): boolean {
  if (weekStart === 'monday') {
    return dayOfWeek === 5 || dayOfWeek === 6; // 토, 일
  }
  return dayOfWeek === 0 || dayOfWeek === 6; // 일, 토
}

/**
 * 오늘 날짜 확인
 */
function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * 단일 Day 객체 생성
 */
function createDay(
  date: Date,
  weekStart: WeekStart,
  includeWeekNumber: boolean
): Day {
  const dayOfWeek = adjustDayOfWeek(date.getDay(), weekStart);

  return {
    date,
    dayOfWeek,
    isWeekend: isWeekend(dayOfWeek, weekStart),
    isHoliday: false, // 공휴일은 별도로 병합 (Week 3)
    isToday: isToday(date),
    weekNumber: includeWeekNumber ? getWeekNumber(date) : undefined,
  };
}

/**
 * 월간 달력 생성
 */
export function generateMonthlyCalendar(
  year: number,
  month: number,
  weekStart: WeekStart = 'monday',
  includeWeekNumber: boolean = false
): Month {
  const days: Day[] = [];
  const daysInMonth = getDaysInMonth(year, month);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    days.push(createDay(date, weekStart, includeWeekNumber));
  }

  return {
    month,
    days,
  };
}

/**
 * 연간 달력 생성 (12개월)
 */
export function generateYearlyCalendar(
  year: number,
  weekStart: WeekStart = 'monday',
  includeWeekNumber: boolean = false
): Month[] {
  const months: Month[] = [];

  for (let month = 1; month <= 12; month++) {
    months.push(generateMonthlyCalendar(year, month, weekStart, includeWeekNumber));
  }

  return months;
}

/**
 * 그리드 렌더링을 위한 앞뒤 빈 칸 계산
 *
 * @returns { leadingBlanks, trailingBlanks }
 * - leadingBlanks: 월 시작 전 빈 칸 수
 * - trailingBlanks: 월 종료 후 빈 칸 수 (전체 주를 채우기 위해)
 */
export function getCalendarGrid(month: Month, weekStart: WeekStart): {
  leadingBlanks: number;
  trailingBlanks: number;
} {
  if (month.days.length === 0) {
    return { leadingBlanks: 0, trailingBlanks: 0 };
  }

  const firstDay = month.days[0];
  const lastDay = month.days[month.days.length - 1];

  const firstDayOfWeek = adjustDayOfWeek(firstDay.date.getDay(), weekStart);
  const lastDayOfWeek = adjustDayOfWeek(lastDay.date.getDay(), weekStart);

  const leadingBlanks = firstDayOfWeek;
  const trailingBlanks = 6 - lastDayOfWeek;

  return { leadingBlanks, trailingBlanks };
}

/**
 * 월 이름 반환 (한국어)
 */
export function getMonthName(month: number): string {
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ];
  return monthNames[month - 1];
}

/**
 * 요일 이름 반환 (한국어)
 */
export function getWeekdayNames(weekStart: WeekStart): string[] {
  if (weekStart === 'monday') {
    return ['월', '화', '수', '목', '금', '토', '일'];
  }
  return ['일', '월', '화', '수', '목', '금', '토'];
}

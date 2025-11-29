/**
 * 공휴일 데이터 제공자
 *
 * Week 0 검증 결과:
 * - 라이브러리: date-holidays v3.26.5
 * - 정확도: 100% (2025년 한국/미국 공휴일)
 * - 음력 공휴일 지원: O (설날, 추석)
 */

import Holidays from 'date-holidays';

export type Country = 'KR' | 'US' | 'JP' | 'CN';

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: string; // 'public', 'bank', 'school', 'observance'
  country: Country;
}

/**
 * 특정 연도의 공휴일 데이터를 가져옵니다
 */
export function getHolidays(year: number, countries: Country[]): Holiday[] {
  const allHolidays: Holiday[] = [];

  countries.forEach((country) => {
    const hd = new Holidays(country);
    const holidays = hd.getHolidays(year);

    holidays.forEach((holiday) => {
      allHolidays.push({
        date: holiday.date.split(' ')[0], // '2025-01-01 00:00:00' → '2025-01-01'
        name: holiday.name,
        type: holiday.type,
        country,
      });
    });
  });

  // 날짜 순으로 정렬
  return allHolidays.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * 특정 날짜가 공휴일인지 확인합니다
 */
export function isHoliday(date: Date, holidays: Holiday[]): boolean {
  const dateStr = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  return holidays.some((holiday) => holiday.date === dateStr);
}

/**
 * 특정 날짜의 공휴일 정보를 가져옵니다
 */
export function getHolidayInfo(date: Date, holidays: Holiday[]): Holiday | null {
  const dateStr = date.toISOString().split('T')[0];
  return holidays.find((holiday) => holiday.date === dateStr) || null;
}

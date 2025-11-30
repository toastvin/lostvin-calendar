/**
 * lunar-javascript 라이브러리 타입 선언
 */

declare module 'lunar-javascript' {
  export class Solar {
    static fromDate(date: Date): Solar;
    getLunar(): Lunar;
  }

  export class Lunar {
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getLeapMonth(): number;
    getJieQi(): string;
  }
}

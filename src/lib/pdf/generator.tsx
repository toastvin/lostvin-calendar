/**
 * PDF 달력 생성기 (Week 4)
 *
 * 책임:
 * - CalendarConfig를 받아 PDF Document 생성
 * - A4/A3 용지 크기 및 방향 대응
 * - 공휴일 표시
 * - 한글 폰트 적용
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { CalendarConfig, Month } from '@/types/calendar';
import { PDF_FONTS } from './fonts';
import { getMonthName, getWeekdayNames } from '@/lib/calendar/generator';

// PDF 스타일 정의
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: PDF_FONTS.SERIF,
  },
  title: {
    fontSize: 24,
    fontFamily: PDF_FONTS.SERIF,
    textAlign: 'center',
    marginBottom: 20,
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthBox: {
    marginBottom: 15,
    border: '1px solid #000',
  },
  monthTitle: {
    fontSize: 14,
    fontFamily: PDF_FONTS.SERIF,
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#f5f5f5',
  },
  weekdayRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    backgroundColor: '#e5e5e5',
  },
  weekdayCell: {
    fontSize: 9,
    fontFamily: PDF_FONTS.SANS_SERIF,
    textAlign: 'center',
    padding: 3,
    flex: 1,
    borderRight: '0.5px solid #ccc',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    fontSize: 9,
    fontFamily: PDF_FONTS.SERIF,
    textAlign: 'center',
    padding: 5,
    minHeight: 25,
    borderRight: '0.5px solid #ccc',
    borderBottom: '0.5px solid #ccc',
  },
  blankCell: {
    flex: 1,
    minHeight: 25,
    borderRight: '0.5px solid #ccc',
    borderBottom: '0.5px solid #ccc',
  },
  holiday: {
    color: '#d32f2f',
    fontWeight: 700,
  },
  weekend: {
    color: '#1976d2',
  },
  today: {
    backgroundColor: '#bbdefb',
  },
});

interface CalendarPDFProps {
  config: CalendarConfig;
  months: Month[];
}

/**
 * 단일 월 달력 렌더링
 */
function MonthCalendar({ month, config }: { month: Month; config: CalendarConfig }) {
  const weekdayNames = getWeekdayNames(config.weekStart);

  // 앞 빈 칸 계산
  const firstDay = month.days[0];
  const firstDayOfWeek = config.weekStart === 'monday'
    ? (firstDay.date.getDay() === 0 ? 6 : firstDay.date.getDay() - 1)
    : firstDay.date.getDay();

  const leadingBlanks = firstDayOfWeek;

  // 월 박스 너비 계산 (A4 세로: 3열, A4 가로: 4열)
  const isPortrait = config.orientation === 'portrait';
  const columns = isPortrait ? 3 : 4;
  const boxWidth = `${100 / columns - 2}%`;

  return (
    <View style={[styles.monthBox, { width: boxWidth }]}>
      {/* 월 제목 */}
      <Text style={styles.monthTitle}>{getMonthName(month.month)}</Text>

      {/* 요일 헤더 */}
      <View style={styles.weekdayRow}>
        {weekdayNames.map((day, index) => (
          <Text key={index} style={styles.weekdayCell}>
            {day}
          </Text>
        ))}
      </View>

      {/* 날짜 그리드 */}
      <View style={styles.daysGrid}>
        {/* 앞 빈 칸 */}
        {Array.from({ length: leadingBlanks }).map((_, index) => (
          <View key={`blank-${index}`} style={[styles.blankCell, { width: `${100 / 7}%` }]} />
        ))}

        {/* 날짜 셀 */}
        {month.days.map((day) => {
          const isWeekend = day.isWeekend;
          const isHoliday = day.isHoliday;
          const isToday = day.isToday;

          let textStyle = {};
          if (isHoliday) {
            textStyle = styles.holiday;
          } else if (isWeekend) {
            textStyle = styles.weekend;
          }

          return (
            <View
              key={day.date.toISOString()}
              style={[
                styles.dayCell,
                { width: `${100 / 7}%` },
                isToday ? styles.today : {}
              ]}
            >
              <Text style={textStyle}>{day.date.getDate()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/**
 * 연간 달력 PDF 생성
 */
export function CalendarPDF({ config, months }: CalendarPDFProps) {
  return (
    <Document>
      <Page
        size={config.paperSize}
        orientation={config.orientation}
        style={styles.page}
      >
        {/* 제목 */}
        <Text style={styles.title}>{config.year}년 달력</Text>

        {/* 12개월 그리드 */}
        <View style={styles.monthsContainer}>
          {months.map((month) => (
            <MonthCalendar
              key={month.month}
              month={month}
              config={config}
            />
          ))}
        </View>
      </Page>
    </Document>
  );
}

/**
 * PDF 파일명 생성
 */
export function generatePDFFilename(config: CalendarConfig): string {
  const { year, type, countries } = config;
  const countryStr = countries.join('-');

  if (type === 'yearly') {
    return `calendar-${year}-${countryStr}.pdf`;
  }

  return `calendar-${year}-${type}-${countryStr}.pdf`;
}

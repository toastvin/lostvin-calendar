/**
 * Week 0: PDF 한글 폰트 테스트
 *
 * 목적:
 * - @react-pdf/renderer의 한글 폰트 렌더링 검증
 * - Gowun Batang, Noto Sans KR 등 웹폰트 임베딩 테스트
 * - PDF 생성 속도 측정 (12개월 연간 달력 기준)
 */

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// 한글 폰트 등록 (Google Fonts CDN 사용)
// 프로덕션에서는 로컬 폰트 파일을 사용해야 함
Font.register({
  family: 'Gowun Batang',
  src: 'https://fonts.gstatic.com/s/gowunbatang/v7/ijwSs5nhRMIjYsdSgcMa3wRhXLH-yuAtLw.woff2',
});

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

// PDF 스타일
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Gowun Batang',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Noto Sans KR',
    fontWeight: 700,
    marginBottom: 5,
  },
  body: {
    fontSize: 12,
    fontFamily: 'Noto Sans KR',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  calendar: {
    fontSize: 10,
    fontFamily: 'Noto Sans KR',
    fontWeight: 400,
  },
  highlight: {
    color: '#FF6B6B',
    fontWeight: 700,
  },
});

// 테스트용 PDF 문서
export const FontTestPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>한글 폰트 테스트</Text>
        <Text style={styles.subtitle}>Gowun Batang (명조체)</Text>
        <Text style={styles.body}>
          이 문서는 @react-pdf/renderer의 한글 폰트 렌더링을 테스트합니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Noto Sans KR (고딕체)</Text>
        <Text style={styles.body}>
          가나다라마바사아자차카타파하
        </Text>
        <Text style={styles.body}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </Text>
        <Text style={styles.body}>
          0123456789 !@#$%^&*()
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>달력 샘플 (2025년 1월)</Text>
        <Text style={styles.calendar}>
          일 월 화 수 목 금 토
        </Text>
        <Text style={styles.calendar}>
                1  2  3  4
        </Text>
        <Text style={styles.calendar}>
          5  6  7  8  9 10 11
        </Text>
        <Text style={styles.calendar}>
         12 13 14 15 16 17 18
        </Text>
        <Text style={styles.calendar}>
         19 20 21 22 23 24 25
        </Text>
        <Text style={styles.calendar}>
         26 27 28 29 30 31
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>공휴일 테스트</Text>
        <Text style={styles.body}>
          1월 1일: <Text style={styles.highlight}>신정</Text>
        </Text>
        <Text style={styles.body}>
          3월 1일: <Text style={styles.highlight}>삼일절</Text>
        </Text>
        <Text style={styles.body}>
          5월 5일: <Text style={styles.highlight}>어린이날</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>특수 문자 테스트</Text>
        <Text style={styles.body}>
          • 음력: 丁亥年 正月 初一
        </Text>
        <Text style={styles.body}>
          • 한자: 大韓民國 萬歲
        </Text>
        <Text style={styles.body}>
          • 기호: ★ ☆ ◆ ◇ ● ○
        </Text>
      </View>
    </Page>
  </Document>
);

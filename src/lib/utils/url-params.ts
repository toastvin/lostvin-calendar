/**
 * URL 파라미터 인코딩/디코딩 유틸리티
 *
 * Week 0 설계 목표:
 * - 짧고 읽기 쉬운 URL
 * - 기본값은 생략하여 URL 길이 최소화
 * - 모든 설정을 URL로 공유 가능
 */

import type { CalendarConfig, Country, CalendarType, PaperSize, Orientation, WeekStart } from '@/types/calendar';
import { DEFAULT_CONFIG } from '@/constants/calendar';

/**
 * 설정을 URL 파라미터로 인코딩합니다
 */
export function encodeConfig(config: CalendarConfig): string {
  const params = new URLSearchParams();

  // 기본값과 다른 경우에만 추가 (URL 길이 최소화)
  if (config.year !== DEFAULT_CONFIG.year) {
    params.set('year', config.year.toString());
  }

  if (config.type !== DEFAULT_CONFIG.type) {
    params.set('type', config.type);
  }

  if (JSON.stringify(config.countries) !== JSON.stringify(DEFAULT_CONFIG.countries)) {
    params.set('countries', config.countries.join(','));
  }

  if (config.paperSize !== DEFAULT_CONFIG.paperSize) {
    params.set('paper', config.paperSize);
  }

  if (config.orientation !== DEFAULT_CONFIG.orientation) {
    params.set('orient', config.orientation);
  }

  if (config.weekStart !== DEFAULT_CONFIG.weekStart) {
    params.set('start', config.weekStart);
  }

  if (config.ecoMode !== DEFAULT_CONFIG.ecoMode) {
    params.set('eco', config.ecoMode ? '1' : '0');
  }

  if (config.showLunar !== DEFAULT_CONFIG.showLunar) {
    params.set('lunar', config.showLunar ? '1' : '0');
  }

  if (config.showWeekNumber !== DEFAULT_CONFIG.showWeekNumber) {
    params.set('week', config.showWeekNumber ? '1' : '0');
  }

  return params.toString();
}

/**
 * URL 파라미터를 설정으로 디코딩합니다
 */
export function decodeConfig(params: URLSearchParams): CalendarConfig {
  const config: CalendarConfig = { ...DEFAULT_CONFIG };

  // year
  const year = params.get('year');
  if (year) {
    const yearNum = parseInt(year, 10);
    if (!isNaN(yearNum)) {
      config.year = yearNum;
    }
  }

  // type
  const type = params.get('type');
  if (type && (type === 'yearly' || type === 'monthly' || type === 'quarterly')) {
    config.type = type as CalendarType;
  }

  // countries
  const countries = params.get('countries');
  if (countries) {
    const countryList = countries.split(',').filter((c): c is Country =>
      ['KR', 'US', 'JP', 'CN'].includes(c)
    );
    if (countryList.length > 0) {
      config.countries = countryList;
    }
  }

  // paper
  const paper = params.get('paper');
  if (paper && (paper === 'A4' || paper === 'A3')) {
    config.paperSize = paper as PaperSize;
  }

  // orient
  const orient = params.get('orient');
  if (orient && (orient === 'portrait' || orient === 'landscape')) {
    config.orientation = orient as Orientation;
  }

  // start
  const start = params.get('start');
  if (start && (start === 'sunday' || start === 'monday')) {
    config.weekStart = start as WeekStart;
  }

  // eco
  const eco = params.get('eco');
  if (eco !== null) {
    config.ecoMode = eco === '1';
  }

  // lunar
  const lunar = params.get('lunar');
  if (lunar !== null) {
    config.showLunar = lunar === '1';
  }

  // week
  const week = params.get('week');
  if (week !== null) {
    config.showWeekNumber = week === '1';
  }

  return config;
}

/**
 * 전체 공유 URL을 생성합니다
 */
export function generateShareUrl(config: CalendarConfig, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const params = encodeConfig(config);

  if (!params) {
    return base; // 모든 값이 기본값이면 파라미터 없이
  }

  return `${base}?${params}`;
}

'use client';

import { useState } from 'react';
import { YearlyCalendar } from '@/components/calendar/YearlyCalendar';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { useCalendar } from '@/hooks/useCalendar';
import { DEFAULT_CONFIG } from '@/constants/calendar';
import type { CalendarConfig } from '@/types/calendar';

export default function TestSettingsPage() {
  const [config, setConfig] = useState<CalendarConfig>(DEFAULT_CONFIG);
  const { months } = useCalendar(config);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Week 3: 공휴일 & 설정 UI 테스트</h1>

      <div className="space-y-4 mb-8">
        {/* 테스트 목적 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">테스트 목적</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>공휴일 데이터 통합 및 표시 검증</li>
            <li>설정 패널 UI 및 실시간 미리보기</li>
            <li>다중 국가 공휴일 동시 표시</li>
            <li>공휴일 이름 툴팁 표시</li>
            <li>설정 변경 시 즉시 갱신</li>
          </ul>
        </div>

        {/* 검증 항목 */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">확인 사항</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>2025년 한국 공휴일 15개 표시 (설날, 추석 등)</li>
            <li>미국 공휴일 표시 (New Year, Independence Day 등)</li>
            <li>공휴일 날짜가 빨간색으로 표시되는지</li>
            <li>공휴일에 마우스 오버 시 이름이 나타나는지</li>
            <li>설정 변경 시 달력이 즉시 갱신되는지</li>
            <li>KR + US 동시 선택 시 두 국가의 공휴일 모두 표시</li>
          </ul>
        </div>
      </div>

      {/* 설정 & 미리보기 */}
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* 설정 패널 */}
        <div>
          <SettingsPanel config={config} onChange={setConfig} />

          {/* 현재 설정 정보 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
            <h3 className="font-semibold mb-2">현재 설정</h3>
            <ul className="space-y-1 text-gray-700">
              <li>연도: {config.year}</li>
              <li>국가: {config.countries.join(', ')}</li>
              <li>용지: {config.paperSize}</li>
              <li>방향: {config.orientation === 'portrait' ? '세로' : '가로'}</li>
              <li>주 시작: {config.weekStart === 'monday' ? '월요일' : '일요일'}</li>
              <li>주차 번호: {config.showWeekNumber ? '표시' : '숨김'}</li>
            </ul>
          </div>
        </div>

        {/* 달력 미리보기 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">미리보기</h2>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
            >
              프린트 미리보기
            </button>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
            <YearlyCalendar
              year={config.year}
              months={months}
              weekStart={config.weekStart}
              paperSize={config.paperSize}
              orientation={config.orientation}
              showWeekNumber={config.showWeekNumber}
            />
          </div>
        </div>
      </div>

      {/* 공휴일 리스트 (디버깅용) */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg print:hidden">
        <h2 className="text-xl font-semibold mb-2">공휴일 리스트 (디버깅)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {months.map((month) => {
            const holidaysInMonth = month.days.filter((day) => day.isHoliday);
            if (holidaysInMonth.length === 0) return null;

            return (
              <div key={month.month} className="border border-gray-200 rounded p-3">
                <h3 className="font-semibold mb-2">{month.month}월</h3>
                <ul className="space-y-1 text-sm">
                  {holidaysInMonth.map((day) => (
                    <li key={day.date.toISOString()} className="text-red-600">
                      {day.date.getDate()}일: {day.holidayInfo?.name}
                      {day.holidayInfo?.country && (
                        <span className="text-gray-500 ml-1">
                          ({day.holidayInfo.country})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 통계 */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg print:hidden">
        <h3 className="font-semibold mb-2">통계</h3>
        <p className="text-sm text-gray-700">
          총 공휴일: {months.reduce((total, month) =>
            total + month.days.filter((day) => day.isHoliday).length, 0
          )}개
        </p>
      </div>
    </main>
  );
}

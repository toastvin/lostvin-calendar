'use client';

import { YearlyCalendar } from '@/components/calendar/YearlyCalendar';
import { useCalendar } from '@/hooks/useCalendar';
import { DEFAULT_CONFIG } from '@/constants/calendar';
import { useState } from 'react';
import type { WeekStart } from '@/types/calendar';

export default function TestCalendarPage() {
  const [year, setYear] = useState(2025);
  const [weekStart, setWeekStart] = useState<WeekStart>('monday');
  const [showWeekNumber, setShowWeekNumber] = useState(false);

  const config = {
    ...DEFAULT_CONFIG,
    year,
    weekStart,
    showWeekNumber,
  };

  const { months } = useCalendar(config);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Week 2: 달력 렌더링 테스트</h1>

      <div className="space-y-4 mb-8">
        {/* 테스트 목적 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">테스트 목적</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>연간 달력 (12개월) 렌더링 검증</li>
            <li>윤년 처리 검증 (2024, 2028)</li>
            <li>주 시작 요일 변경 (일요일/월요일)</li>
            <li>주차 번호 표시</li>
            <li>A4 세로 레이아웃 테스트</li>
          </ul>
        </div>

        {/* 설정 패널 */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">설정</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* 연도 선택 */}
            <div>
              <label className="block text-sm font-medium mb-1">연도</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value={2024}>2024 (윤년)</option>
                <option value={2025}>2025</option>
                <option value={2028}>2028 (윤년)</option>
              </select>
            </div>

            {/* 주 시작 요일 */}
            <div>
              <label className="block text-sm font-medium mb-1">주 시작</label>
              <select
                value={weekStart}
                onChange={(e) => setWeekStart(e.target.value as WeekStart)}
                className="w-full p-2 border rounded"
              >
                <option value="monday">월요일</option>
                <option value="sunday">일요일</option>
              </select>
            </div>

            {/* 주차 번호 */}
            <div>
              <label className="block text-sm font-medium mb-1">주차 번호</label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showWeekNumber}
                  onChange={(e) => setShowWeekNumber(e.target.checked)}
                  className="w-5 h-5"
                />
                <span>표시</span>
              </label>
            </div>
          </div>
        </div>

        {/* 검증 항목 */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">확인 사항</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>2024년 2월 29일이 표시되는지 (윤년)</li>
            <li>2025년 2월이 28일까지 표시되는지</li>
            <li>주 시작 요일 변경 시 그리드가 올바른지</li>
            <li>오늘 날짜가 파란색 배경으로 표시되는지</li>
            <li>주말이 파란색 텍스트로 표시되는지</li>
            <li>주차 번호가 월요일 셀 왼쪽 상단에 표시되는지</li>
          </ul>
        </div>
      </div>

      {/* 달력 렌더링 */}
      <div className="border-2 border-gray-300 p-4">
        <YearlyCalendar
          year={year}
          months={months}
          weekStart={weekStart}
          paperSize="A4"
          orientation="portrait"
          showWeekNumber={showWeekNumber}
        />
      </div>

      {/* 프린트 안내 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">프린트 테스트</h2>
        <p className="text-sm mb-2">
          브라우저에서 <kbd className="px-2 py-1 bg-gray-200 rounded">Cmd/Ctrl + P</kbd>를 눌러 프린트 미리보기를 확인하세요.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>A4 세로 용지에 모든 달이 한 페이지에 표시되는지</li>
          <li>Gowun Batang 폰트가 적용되는지</li>
          <li>테두리와 그리드가 선명한지</li>
        </ul>
      </div>
    </main>
  );
}

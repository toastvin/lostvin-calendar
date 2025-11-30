/**
 * 설정 패널 컴포넌트 (UI 레이어)
 *
 * 책임:
 * - 달력 설정 UI 렌더링
 * - 사용자 입력 처리
 * - 설정 변경 이벤트 전달
 */

'use client';

import type { CalendarConfig, Country, PaperSize, Orientation, WeekStart, PresetType } from '@/types/calendar';
import { CURRENT_YEAR } from '@/constants/calendar';
import { PRESET_LIST } from '@/constants/presets';

interface SettingsPanelProps {
  config: CalendarConfig;
  onChange: (config: CalendarConfig) => void;
}

export function SettingsPanel({ config, onChange }: SettingsPanelProps) {
  const handleYearChange = (year: number) => {
    onChange({ ...config, year });
  };

  const handleCountryToggle = (country: Country) => {
    const newCountries = config.countries.includes(country)
      ? config.countries.filter((c) => c !== country)
      : [...config.countries, country];

    onChange({ ...config, countries: newCountries });
  };

  const handlePaperSizeChange = (paperSize: PaperSize) => {
    onChange({ ...config, paperSize });
  };

  const handleOrientationChange = (orientation: Orientation) => {
    onChange({ ...config, orientation });
  };

  const handleWeekStartChange = (weekStart: WeekStart) => {
    onChange({ ...config, weekStart });
  };

  const handleWeekNumberToggle = () => {
    onChange({ ...config, showWeekNumber: !config.showWeekNumber });
  };

  // Week 7: Eco 모드 토글
  const handleEcoModeToggle = () => {
    onChange({ ...config, ecoMode: !config.ecoMode });
  };

  // Week 7: 프리셋 변경
  const handlePresetChange = (presetId: PresetType) => {
    const preset = PRESET_LIST.find((p) => p.id === presetId);
    if (preset) {
      onChange({
        ...config,
        ...preset.defaultSettings,
        preset: presetId,
      });
    }
  };

  const countries: { code: Country; name: string }[] = [
    { code: 'KR', name: '🇰🇷 대한민국' },
    { code: 'US', name: '🇺🇸 미국' },
    { code: 'JP', name: '🇯🇵 일본' },
    { code: 'CN', name: '🇨🇳 중국' },
  ];

  return (
    <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 space-y-6 print:hidden">
      <h2 className="text-2xl font-bold text-gray-900">달력 설정</h2>

      {/* Week 7: 프리셋 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          프리셋
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PRESET_LIST.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetChange(preset.id)}
              className={`px-3 py-2 rounded border text-sm ${
                config.preset === preset.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* 연도 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          연도
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleYearChange(CURRENT_YEAR)}
            className={`px-4 py-2 rounded border ${
              config.year === CURRENT_YEAR
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            올해 ({CURRENT_YEAR})
          </button>
          <button
            onClick={() => handleYearChange(CURRENT_YEAR + 1)}
            className={`px-4 py-2 rounded border ${
              config.year === CURRENT_YEAR + 1
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            내년 ({CURRENT_YEAR + 1})
          </button>
          <input
            type="number"
            min={2020}
            max={2030}
            value={config.year}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 국가 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          공휴일 국가 (다중 선택 가능)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {countries.map(({ code, name }) => (
            <button
              key={code}
              onClick={() => handleCountryToggle(code)}
              className={`px-4 py-2 rounded border text-left ${
                config.countries.includes(code)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* 용지 크기 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          용지 크기
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handlePaperSizeChange('A4')}
            className={`flex-1 px-4 py-2 rounded border ${
              config.paperSize === 'A4'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            A4
          </button>
          <button
            onClick={() => handlePaperSizeChange('A3')}
            className={`flex-1 px-4 py-2 rounded border ${
              config.paperSize === 'A3'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            A3
          </button>
        </div>
      </div>

      {/* 방향 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          방향
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleOrientationChange('portrait')}
            className={`flex-1 px-4 py-2 rounded border ${
              config.orientation === 'portrait'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            세로
          </button>
          <button
            onClick={() => handleOrientationChange('landscape')}
            className={`flex-1 px-4 py-2 rounded border ${
              config.orientation === 'landscape'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            가로
          </button>
        </div>
      </div>

      {/* 주 시작 요일 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          주 시작 요일
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleWeekStartChange('monday')}
            className={`flex-1 px-4 py-2 rounded border ${
              config.weekStart === 'monday'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            월요일
          </button>
          <button
            onClick={() => handleWeekStartChange('sunday')}
            className={`flex-1 px-4 py-2 rounded border ${
              config.weekStart === 'sunday'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            일요일
          </button>
        </div>
      </div>

      {/* 주차 번호 */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.showWeekNumber}
            onChange={handleWeekNumberToggle}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            주차 번호 표시
          </span>
        </label>
      </div>

      {/* Week 7: Eco 모드 */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.ecoMode}
            onChange={handleEcoModeToggle}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Eco 모드 (잉크 절약)
          </span>
        </label>
        <p className="mt-1 text-xs text-gray-500 ml-7">
          색상을 회색으로, 선을 얇게 변경하여 잉크를 절약합니다
        </p>
      </div>
    </div>
  );
}

/**
 * URL 공유 버튼 컴포넌트 (Week 4)
 *
 * 책임:
 * - URL 복사 UI
 * - 클립보드 API 활용
 * - 성공/실패 토스트 표시
 */

'use client';

import { useState } from 'react';
import type { CalendarConfig } from '@/types/calendar';
import { generateShareUrl } from '@/lib/utils/url-params';

interface ShareButtonProps {
  config: CalendarConfig;
}

export function ShareButton({ config }: ShareButtonProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopyLink = async () => {
    try {
      const shareUrl = generateShareUrl(config);

      // Clipboard API 사용
      await navigator.clipboard.writeText(shareUrl);

      setCopyStatus('success');

      // 2초 후 상태 초기화
      setTimeout(() => {
        setCopyStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      setCopyStatus('error');

      setTimeout(() => {
        setCopyStatus('idle');
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`
        px-6 py-3 rounded-lg font-semibold shadow-md transition-all
        ${
          copyStatus === 'success'
            ? 'bg-green-600 text-white'
            : copyStatus === 'error'
            ? 'bg-red-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }
      `}
    >
      {copyStatus === 'success' && '✅ 링크 복사됨!'}
      {copyStatus === 'error' && '❌ 복사 실패'}
      {copyStatus === 'idle' && '🔗 링크 복사'}
    </button>
  );
}

/**
 * Week 7: 메모 관리 Custom Hook
 */

import { useState, useCallback } from 'react';
import { saveMemo, getAllMemos } from '@/lib/storage/memo';
import type { MemoStorage } from '@/types/calendar';

export function useMemo() {
  const [memos, setMemos] = useState<MemoStorage>(() => getAllMemos());

  const updateMemo = useCallback((date: string, content: string) => {
    saveMemo(date, content);
    setMemos((prev) => {
      if (content.trim() === '') {
        const updated = { ...prev };
        delete updated[date];
        return updated;
      }
      return { ...prev, [date]: content };
    });
  }, []);

  const getMemoByDate = useCallback(
    (date: string): string => {
      return memos[date] || '';
    },
    [memos]
  );

  return {
    memos,
    getMemoByDate,
    updateMemo,
  };
}

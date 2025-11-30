/**
 * Week 7: 메모 LocalStorage 관리
 */

import type { MemoStorage } from '@/types/calendar';

const MEMO_STORAGE_KEY = 'calendar-memos';

/**
 * 특정 날짜의 메모를 가져옵니다
 */
export function getMemo(date: string): string {
  if (typeof window === 'undefined') return '';

  try {
    const storage = localStorage.getItem(MEMO_STORAGE_KEY);
    if (!storage) return '';

    const memos: MemoStorage = JSON.parse(storage);
    return memos[date] || '';
  } catch (error) {
    console.error('Error loading memo:', error);
    return '';
  }
}

/**
 * 특정 날짜에 메모를 저장합니다
 */
export function saveMemo(date: string, content: string): void {
  if (typeof window === 'undefined') return;

  try {
    const storage = localStorage.getItem(MEMO_STORAGE_KEY);
    const memos: MemoStorage = storage ? JSON.parse(storage) : {};

    if (content.trim() === '') {
      // 빈 메모는 삭제
      delete memos[date];
    } else {
      memos[date] = content;
    }

    localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(memos));
  } catch (error) {
    console.error('Error saving memo:', error);
  }
}

/**
 * 모든 메모를 가져옵니다
 */
export function getAllMemos(): MemoStorage {
  if (typeof window === 'undefined') return {};

  try {
    const storage = localStorage.getItem(MEMO_STORAGE_KEY);
    return storage ? JSON.parse(storage) : {};
  } catch (error) {
    console.error('Error loading all memos:', error);
    return {};
  }
}

/**
 * 특정 날짜의 메모를 삭제합니다
 */
export function deleteMemo(date: string): void {
  saveMemo(date, '');
}

/**
 * 모든 메모를 삭제합니다
 */
export function clearAllMemos(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(MEMO_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing memos:', error);
  }
}

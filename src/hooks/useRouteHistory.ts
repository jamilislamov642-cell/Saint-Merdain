import { useCallback, useEffect, useState } from 'react';
import type { Location } from '../data';

const STORAGE_KEY = 'saint-meridian.route-history';

export type RouteHistoryItem = {
  id: string;
  destinationId: string;
  destinationName: string;
  district: string;
  timestamp: number;
};

function readHistory(): RouteHistoryItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item: unknown): item is RouteHistoryItem => {
      if (!item || typeof item !== 'object') return false;
      const candidate = item as Partial<RouteHistoryItem>;
      return typeof candidate.id === 'string' && typeof candidate.destinationId === 'string' && typeof candidate.destinationName === 'string' && typeof candidate.district === 'string' && typeof candidate.timestamp === 'number';
    }).slice(0, 8);
  } catch {
    return [];
  }
}

export function useRouteHistory() {
  const [history, setHistory] = useState<RouteHistoryItem[]>(readHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const remember = useCallback((location: Location) => {
    setHistory((current: RouteHistoryItem[]) => [{
      id: `${location.id}-${Date.now()}`,
      destinationId: location.id,
      destinationName: location.name,
      district: location.district,
      timestamp: Date.now()
    }, ...current.filter((item: RouteHistoryItem) => item.destinationId !== location.id)].slice(0, 8));
  }, []);

  const remove = useCallback((id: string) => setHistory((current: RouteHistoryItem[]) => current.filter((item: RouteHistoryItem) => item.id !== id)), []);
  const clear = useCallback(() => setHistory([]), []);
  return { history, remember, remove, clear };
}

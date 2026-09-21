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
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as RouteHistoryItem[];
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
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
    setHistory(current => [{
      id: `${location.id}-${Date.now()}`,
      destinationId: location.id,
      destinationName: location.name,
      district: location.district,
      timestamp: Date.now()
    }, ...current.filter(item => item.destinationId !== location.id)].slice(0, 8));
  }, []);

  const remove = useCallback((id: string) => setHistory(current => current.filter(item => item.id !== id)), []);
  const clear = useCallback(() => setHistory([]), []);
  return { history, remember, remove, clear };
}

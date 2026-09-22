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

function isRouteHistoryItem(value: unknown): value is RouteHistoryItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<RouteHistoryItem>;
  return typeof item.id === 'string' && typeof item.destinationId === 'string' && typeof item.destinationName === 'string' && typeof item.district === 'string' && typeof item.timestamp === 'number';
}

function readHistory(): RouteHistoryItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) ? value.filter(isRouteHistoryItem).slice(0, 8) : [];
  } catch {
    return [];
  }
}

export function useRouteHistory() {
  const [history, setHistory] = useState<RouteHistoryItem[]>(readHistory);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); }, [history]);
  const remember = useCallback((location: Location) => {
    setHistory((current: RouteHistoryItem[]) => [{ id: `${location.id}-${Date.now()}`, destinationId: location.id, destinationName: location.name, district: location.district, timestamp: Date.now() }, ...current.filter((item: RouteHistoryItem) => item.destinationId !== location.id)].slice(0, 8));
  }, []);
  const remove = useCallback((id: string) => setHistory((current: RouteHistoryItem[]) => current.filter((item: RouteHistoryItem) => item.id !== id)), []);
  const clear = useCallback(() => setHistory([]), []);
  return { history, remember, remove, clear };
}

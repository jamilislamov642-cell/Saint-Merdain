import { useEffect, useState } from 'react';

export function useStoredList(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(key) ?? '[]') as string[]; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(items)); }, [key, items]);
  const toggle = (value: string) => setItems(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
  return { items, toggle, has: (value: string) => items.includes(value) };
}

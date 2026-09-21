import { useEffect, useState } from 'react';

export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  const [lastKey, setLastKey] = useState('');
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setLastKey(key);
      if ((event.metaKey || event.ctrlKey) && key === 'k') { event.preventDefault(); shortcuts.search?.(); return; }
      if (shortcuts[key]) shortcuts[key]();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcuts]);
  return lastKey;
}

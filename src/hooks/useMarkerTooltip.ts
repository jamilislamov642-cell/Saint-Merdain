import { useEffect, useState } from 'react';
import type { Location } from '../data';

export function useMarkerTooltip() {
  const [tooltip, setTooltip] = useState<{ location: Location; x: number; y: number } | null>(null);

  useEffect(() => {
    const hide = () => setTooltip(null);
    window.addEventListener('blur', hide);
    return () => window.removeEventListener('blur', hide);
  }, []);

  return {
    tooltip,
    show: (location: Location, x: number, y: number) => setTooltip({ location, x, y }),
    hide: () => setTooltip(null)
  };
}

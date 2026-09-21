import type { Location } from '../data';

export function exportLocations(locations: Location[]) {
  const blob = new Blob([JSON.stringify(locations, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'saint-meridian-locations.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

export const formatDistance = (distanceInWorldUnits: number) => distanceInWorldUnits < 1 ? `${Math.round(distanceInWorldUnits * 1000)} m` : `${distanceInWorldUnits.toFixed(1)} km`;
export const openNow = (hours: string) => hours === 'Always open' || hours === '24/7' || !hours.includes('—');

import type { District, Location } from '../data';

export type DistrictDensity = District & {
  count: number;
  intensity: number;
  percent: number;
};

export function calculateDistrictDensity(districts: District[], locations: Location[]): DistrictDensity[] {
  const counts = districts.map(district => ({ district, count: locations.filter(location => location.district === district.name).length }));
  const max = Math.max(1, ...counts.map(item => item.count));
  const total = Math.max(1, locations.length);
  return counts.map(({ district, count }) => ({
    ...district,
    count,
    intensity: count / max,
    percent: (count / total) * 100
  }));
}

export const densityColor = (intensity: number) => {
  if (intensity > .75) return '#d87868';
  if (intensity > .45) return '#d1a45f';
  if (intensity > .2) return '#8ca27b';
  return '#638c99';
};

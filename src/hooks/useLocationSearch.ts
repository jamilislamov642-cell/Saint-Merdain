import { useMemo } from 'react';
import type { Category, Location } from '../data';

export function useLocationSearch(locations: Location[], query: string, category: Category | 'ALL', district: string) {
  return useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return locations.filter(location => {
      const categoryMatch = category === 'ALL' || location.category === category;
      const districtMatch = district === 'ALL' || location.district === district;
      const textMatch = !normalized || [location.name, location.category, location.district, location.address, location.description].some(value => value.toLowerCase().includes(normalized));
      return categoryMatch && districtMatch && textMatch;
    });
  }, [locations, query, category, district]);
}

import type { Location } from '../data';

export type CatalogIssue = { id: string; message: string };
export function validateCatalog(locations: Location[]): CatalogIssue[] {
  const issues: CatalogIssue[] = [];
  const ids = new Set<string>();
  locations.forEach(location => {
    if (ids.has(location.id)) issues.push({ id: location.id, message: 'Duplicate location id' });
    ids.add(location.id);
    if (!location.name.trim()) issues.push({ id: location.id, message: 'Missing location name' });
    if (!location.district.trim()) issues.push({ id: location.id, message: 'Missing district' });
    if (!Number.isFinite(location.x) || !Number.isFinite(location.z)) issues.push({ id: location.id, message: 'Invalid map coordinates' });
  });
  return issues;
}
export const isDevelopment = (): boolean => import.meta.env.DEV;

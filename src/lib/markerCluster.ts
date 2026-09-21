import type { Location } from '../data';

export type MarkerCluster = { id: string; x: number; z: number; count: number; locations: Location[] };

/** Screen-independent spatial clustering for dense POI layers. */
export function clusterLocations(locations: Location[], radius = 3): MarkerCluster[] {
  const cells = new Map<string, Location[]>();
  const cellKey = (location: Location) => `${Math.floor(location.x / radius)}:${Math.floor(location.z / radius)}`;
  locations.forEach(location => cells.set(cellKey(location), [...(cells.get(cellKey(location)) ?? []), location]));
  return [...cells.entries()].map(([id, grouped]) => ({
    id: `cluster-${id}`,
    x: grouped.reduce((sum, location) => sum + location.x, 0) / grouped.length,
    z: grouped.reduce((sum, location) => sum + location.z, 0) / grouped.length,
    count: grouped.length,
    locations: grouped
  }));
}

export function visibleLocations(locations: Location[], bounds: { minX: number; maxX: number; minZ: number; maxZ: number }, max = 500) {
  return locations.filter(location => location.x >= bounds.minX && location.x <= bounds.maxX && location.z >= bounds.minZ && location.z <= bounds.maxZ).slice(0, max);
}

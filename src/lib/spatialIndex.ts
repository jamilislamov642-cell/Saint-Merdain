import type { Location } from '../data';

export type SpatialBucket = { key: string; locations: Location[] };

/** Lightweight grid index for viewport queries before a real vector-tile backend is introduced. */
export function createSpatialIndex(locations: Location[], cellSize = 8) {
  const buckets = new Map<string, Location[]>();
  const keyFor = (x: number, z: number) => `${Math.floor(x / cellSize)}:${Math.floor(z / cellSize)}`;
  locations.forEach(location => {
    const key = keyFor(location.x, location.z);
    buckets.set(key, [...(buckets.get(key) ?? []), location]);
  });
  return {
    query(bounds: { minX: number; maxX: number; minZ: number; maxZ: number }) {
      const result: Location[] = [];
      const minX = Math.floor(bounds.minX / cellSize), maxX = Math.floor(bounds.maxX / cellSize);
      const minZ = Math.floor(bounds.minZ / cellSize), maxZ = Math.floor(bounds.maxZ / cellSize);
      for (let x = minX; x <= maxX; x += 1) for (let z = minZ; z <= maxZ; z += 1) {
        (buckets.get(`${x}:${z}`) ?? []).forEach(location => {
          if (location.x >= bounds.minX && location.x <= bounds.maxX && location.z >= bounds.minZ && location.z <= bounds.maxZ) result.push(location);
        });
      }
      return result;
    },
    buckets: buckets.size,
  };
}

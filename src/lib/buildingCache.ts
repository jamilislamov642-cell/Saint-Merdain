import * as THREE from 'three';

export type BuildingStyle = 'tower' | 'warehouse' | 'rowhouse' | 'modern' | 'industrial';
export type BuildingSeed = { x: number; z: number; width: number; depth: number; height: number; style: BuildingStyle; color: string };

/** Shared geometry cache for repeated city forms. */
export function createBuildingGeometryCache() {
  const cache = new Map<string, THREE.BufferGeometry>();
  return {
    get(width: number, height: number, depth: number) {
      const key = `${width.toFixed(2)}:${height.toFixed(2)}:${depth.toFixed(2)}`;
      let geometry = cache.get(key);
      if (!geometry) {
        geometry = new THREE.BoxGeometry(width, height, depth);
        cache.set(key, geometry);
      }
      return geometry;
    },
    dispose() { cache.forEach(geometry => geometry.dispose()); cache.clear(); },
    size: () => cache.size
  };
}

export function buildingStyle(index: number): BuildingStyle {
  return ['rowhouse', 'warehouse', 'modern', 'tower', 'industrial'][index % 5] as BuildingStyle;
}

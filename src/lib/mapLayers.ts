import type { Category } from '../data';

export type MapLayerKey = 'City' | 'Businesses' | 'Nightlife' | 'Transport' | 'Landmarks' | 'Density';

export const defaultLayers: Record<MapLayerKey, boolean> = {
  City: true,
  Businesses: true,
  Nightlife: true,
  Transport: true,
  Landmarks: true,
  Density: false
};

export const layerCategories: Record<MapLayerKey, Category[]> = {
  City: [],
  Businesses: ['Food & Drink', 'Stay', 'Culture', 'Shopping', 'Services', 'Parks'],
  Nightlife: ['Nightlife'],
  Transport: ['Transport'],
  Landmarks: [],
  Density: []
};

export const layerLabel = (layer: MapLayerKey, count: number) => layer === 'Density' ? 'HEAT' : String(count);

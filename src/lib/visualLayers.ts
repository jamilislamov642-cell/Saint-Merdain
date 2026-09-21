import type { Category } from '../data';

export type VisualLayer = 'Businesses' | 'Nightlife' | 'Transport' | 'Landmarks' | 'Density';
export const visualLayerMeta: Record<VisualLayer, { label: string; color: string; categories: Category[] }> = {
  Businesses: { label: 'BUSINESS GRID', color: '#9bb57e', categories: ['Food & Drink', 'Stay', 'Culture', 'Shopping', 'Services', 'Parks'] },
  Nightlife: { label: 'AFTER DARK', color: '#c47ac0', categories: ['Nightlife'] },
  Transport: { label: 'TRANSIT / ROADS', color: '#79aabd', categories: ['Transport'] },
  Landmarks: { label: 'CITY MARKERS', color: '#d9a666', categories: [] },
  Density: { label: 'POI DENSITY', color: '#d27765', categories: [] }
};

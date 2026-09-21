import type { Category, District, Location } from '../data';

export type TransitLine = { id: string; name: string; color: string; stations: string[] };
export type Landmark = { id: string; name: string; district: string; kind: string; x: number; z: number };

export const transitLines: TransitLine[] = [
  { id: 'blue', name: 'Bluewater Line', color: '#6ea2b5', stations: ['Pacific Verge', 'The Narrows', 'Meridian Core', 'Morrow Point'] },
  { id: 'amber', name: 'Amber Loop', color: '#c8a15e', stations: ['Cinder Wharf', 'Meridian Core', 'Vesper Row', 'Saint Orison'] },
  { id: 'green', name: 'Juniper Branch', color: '#8ba77f', stations: ['Saint Orison', 'Juniper Flats', 'Crown Terrace'] }
];

export const landmarks: Landmark[] = [
  { id: 'lighthouse', name: 'Old Meridian Light', district: 'Pacific Verge', kind: 'Lighthouse', x: -38, z: -21 },
  { id: 'exchange', name: 'Meridian Exchange', district: 'Meridian Core', kind: 'Civic landmark', x: -2, z: 2 },
  { id: 'terminal', name: 'Northline Terminal', district: 'Northline Yards', kind: 'Rail terminal', x: -15, z: 20 },
  { id: 'observatory', name: 'Bellweather Observatory', district: 'Bellweather Hills', kind: 'Viewpoint', x: 30, z: -16 },
  { id: 'stadium', name: 'Rook Field', district: 'Saint Orison', kind: 'Stadium', x: 9, z: -10 },
  { id: 'airport', name: 'Crown International', district: 'Crown Terrace', kind: 'Airport', x: 35, z: -29 }
];

export const districtStats = (districts: District[], locations: Location[]) => districts.map(district => ({
  ...district,
  places: locations.filter(location => location.district === district.name).length,
  categories: [...new Set(locations.filter(location => location.district === district.name).map(location => location.category as Category))]
}));

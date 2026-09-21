export type Category = 'Food & Drink' | 'Stay' | 'Culture' | 'Shopping' | 'Nightlife' | 'Services' | 'Transport';
export type District = { name: string; code: string; mood: string; color: string; x: number; z: number };
export type Location = { id: string; name: string; category: Category; district: string; rating: string; hours: string; description: string; address: string; x: number; z: number; accent: string };

export const districts: District[] = [
  { name: 'Cinder Wharf', code: 'CW', mood: 'Salt, steel & low tide', color: '#b87352', x: -34, z: 15 },
  { name: 'Northline Yards', code: 'NY', mood: 'Freight after midnight', color: '#d49a5e', x: -14, z: 17 },
  { name: 'Morrow Point', code: 'MP', mood: 'The city’s sharp edge', color: '#d5b06e', x: 10, z: 17 },
  { name: 'Meridian Core', code: 'MC', mood: 'Glass, rain & ambition', color: '#e0c98a', x: 0, z: 3 },
  { name: 'Vesper Row', code: 'VR', mood: 'Warm light, late hours', color: '#bc6c62', x: 19, z: 2 },
  { name: 'The Narrows', code: 'TN', mood: 'Old brick, new money', color: '#8e9a7d', x: -22, z: -2 },
  { name: 'Saint Orison', code: 'SO', mood: 'A quiet kind of grand', color: '#a7a58d', x: 4, z: -13 },
  { name: 'Bellweather Hills', code: 'BH', mood: 'Wind through the pines', color: '#819a83', x: 28, z: -13 },
  { name: 'Pacific Verge', code: 'PV', mood: 'Open water, no apologies', color: '#7193a2', x: -28, z: -18 },
  { name: 'Juniper Flats', code: 'JF', mood: 'Porches and long shadows', color: '#9a9679', x: 8, z: -25 },
  { name: 'Crown Terrace', code: 'CT', mood: 'Above the weather', color: '#c4ae84', x: 30, z: -25 },
  { name: 'Redhaven', code: 'RH', mood: 'Dust at the city limit', color: '#a97659', x: -26, z: 31 }
];

const venues: Array<[string, Category, string, string, string, string, number, number, string]> = [
  ['The Last Light', 'Food & Drink', 'Meridian Core', '4.8', '06:30 — 22:00', 'A narrow coffee room beneath the old exchange, known for its bitter espresso and very good records.', 'Marrow Street 12', 1, 1, '#d5a66c'],
  ['Tideglass Hotel', 'Stay', 'Pacific Verge', '4.6', 'Always open', 'A weathered boutique hotel with ocean-facing rooms and a lobby that never quite sleeps.', 'Verge Boulevard 88', -29, -17, '#80aebb'],
  ['Orison Picture House', 'Culture', 'Saint Orison', '4.7', '12:00 — 01:00', 'A restored single-screen cinema showing midnight features and films nobody else remembers.', 'Orison Avenue 41', 4, -12, '#c47c68'],
  ['Sable & Sons', 'Shopping', 'Vesper Row', '4.5', '10:00 — 20:00', 'Hardwearing clothes, handmade boots and a back room full of things with stories.', 'Vesper Lane 7', 18, 2, '#c09b70'],
  ['Low Meridian', 'Nightlife', 'Vesper Row', '4.9', '20:00 — 03:00', 'A basement club under a former tram office. No sign outside. You will hear it.', 'Lumen Street 19', 20, 1, '#b776bd'],
  ['Breakwater Garage', 'Services', 'Cinder Wharf', '4.4', '07:00 — 19:00', 'Salt-air mechanics, honest estimates and the best view of the container cranes.', 'Anchor Road 103', -33, 14, '#d2855e'],
  ['Holloway Market', 'Shopping', 'The Narrows', '4.6', '08:00 — 23:00', 'A crowded neighborhood market in an old streetcar depot.', 'Holloway Street 5', -21, -2, '#adbd78'],
  ['Aster Bank Tower', 'Services', 'Meridian Core', '4.1', '09:00 — 17:00', 'The city’s original high-rise, still keeping its lights on through every storm.', 'Civic Ring 1', -2, 2, '#b8c2cb'],
  ['Driftwood Social', 'Food & Drink', 'Pacific Verge', '4.7', '11:00 — 00:00', 'A bright little seafood kitchen with a dark view of the water.', 'Breakwater Walk 3', -26, -20, '#d88a65'],
  ['Northline Motors', 'Transport', 'Northline Yards', '4.3', '09:00 — 21:00', 'Used cars, old vans and one immaculate black sedan in the corner.', 'Switchyard Avenue 60', -14, 17, '#8194a8'],
  ['Juniper Athletic', 'Services', 'Juniper Flats', '4.5', '05:00 — 23:00', 'A low concrete gym built around a former train shed.', 'Juniper Road 28', 8, -25, '#a1b27c'],
  ['The Lantern Room', 'Nightlife', 'Morrow Point', '4.8', '18:00 — 02:00', 'Cocktails, brass lamps and a view down to the aircraft lights.', 'Morrow Street 44', 11, 16, '#d0a04c']
];
export const locations: Location[] = venues.map((v, i) => ({ id: `venue-${i}`, name: v[0] as string, category: v[1] as Category, district: v[2] as string, rating: v[3] as string, hours: v[4] as string, description: v[5] as string, address: v[6] as string, x: v[7] as number, z: v[8] as number, accent: v[9] as string }));

export type Category = 'Food & Drink' | 'Stay' | 'Culture' | 'Shopping' | 'Nightlife' | 'Services' | 'Transport' | 'Parks';
export type District = { name: string; code: string; mood: string; color: string; x: number; z: number };
export type Location = {
  id: string;
  name: string;
  category: Category;
  district: string;
  rating: string;
  hours: string;
  description: string;
  address: string;
  x: number;
  z: number;
  accent: string;
};

export const districts: District[] = [
  { name: 'Cinder Wharf', code: 'CW', mood: 'Salt, steel and low tide', color: '#b87352', x: -34, z: 15 },
  { name: 'Northline Yards', code: 'NY', mood: 'Freight after midnight', color: '#d49a5e', x: -14, z: 17 },
  { name: 'Morrow Point', code: 'MP', mood: 'Sharp corners and signal haze', color: '#d5b06e', x: 10, z: 17 },
  { name: 'Meridian Core', code: 'MC', mood: 'Glass, rain and ambition', color: '#e0c98a', x: 0, z: 3 },
  { name: 'Vesper Row', code: 'VR', mood: 'Warm light and late hours', color: '#bc6c62', x: 19, z: 2 },
  { name: 'The Narrows', code: 'TN', mood: 'Brick, old money and fog', color: '#8e9a7d', x: -22, z: -2 },
  { name: 'Saint Orison', code: 'SO', mood: 'A quiet kind of grand', color: '#a7a58d', x: 4, z: -13 },
  { name: 'Bellweather Hills', code: 'BH', mood: 'Wind through the pines', color: '#819a83', x: 28, z: -13 },
  { name: 'Pacific Verge', code: 'PV', mood: 'Open ocean and clean light', color: '#7193a2', x: -28, z: -18 },
  { name: 'Juniper Flats', code: 'JF', mood: 'Porches and long shadows', color: '#9a9679', x: 8, z: -25 },
  { name: 'Crown Terrace', code: 'CT', mood: 'High above the weather', color: '#c4ae84', x: 30, z: -25 },
  { name: 'Redhaven', code: 'RH', mood: 'Dust at the edge of town', color: '#a97659', x: -26, z: 31 },
  { name: 'Harbor Row', code: 'HR', mood: 'Tide flats and seafood smoke', color: '#8fb3b6', x: -42, z: -2 },
  { name: 'Lumen Dock', code: 'LD', mood: 'Industrial glow and cranes', color: '#c28e5b', x: -46, z: 26 },
  { name: 'Solace Quarter', code: 'SQ', mood: 'Gardened avenues and hush', color: '#9bb18c', x: 15, z: -38 },
  { name: 'Iron Dock', code: 'ID', mood: 'Concrete and steam', color: '#6a7679', x: -9, z: 32 },
  { name: 'Quarry Heights', code: 'QH', mood: 'Ridges and valet roads', color: '#a78a6f', x: 39, z: 15 },
  { name: 'Glasswater', code: 'GW', mood: 'Wet reflections and neon', color: '#6d8897', x: 15, z: 27 },
  { name: 'Lantern Row', code: 'LR', mood: 'Late-night storefronts', color: '#b8838a', x: 6, z: 24 },
  { name: 'East Fairway', code: 'EF', mood: 'Broad roads and old suburbs', color: '#9aa786', x: 32, z: 34 },
  { name: 'Ashwater', code: 'AW', mood: 'Warehouse shadows and sparse light', color: '#7c8b84', x: -20, z: 38 }
];

const seedLocations: Omit<Location, 'id'>[] = [
  { name: 'The Last Light', category: 'Food & Drink', district: 'Meridian Core', rating: '4.8', hours: '06:30 — 22:00', description: 'A narrow coffee room beneath the old exchange, known for bitter espresso and very good records.', address: 'Marrow Street 12', x: 1, z: 1, accent: '#d5a66c' },
  { name: 'Tideglass Hotel', category: 'Stay', district: 'Pacific Verge', rating: '4.6', hours: 'Always open', description: 'A weathered boutique hotel with ocean-facing rooms and a lobby that never quite sleeps.', address: 'Verge Boulevard 88', x: -29, z: -17, accent: '#80aebb' },
  { name: 'Orison Picture House', category: 'Culture', district: 'Saint Orison', rating: '4.7', hours: '12:00 — 01:00', description: 'A restored single-screen cinema showing midnight features and films nobody else remembers.', address: 'Orison Avenue 41', x: 4, z: -12, accent: '#c47c68' },
  { name: 'Sable & Sons', category: 'Shopping', district: 'Vesper Row', rating: '4.5', hours: '10:00 — 20:00', description: 'Hardwearing clothes, handmade boots and a back room full of stories from the road.', address: 'Vesper Lane 7', x: 18, z: 2, accent: '#c09b70' },
  { name: 'Low Meridian', category: 'Nightlife', district: 'Vesper Row', rating: '4.9', hours: '20:00 — 03:00', description: 'A basement club under a former tram office. No sign outside. You will hear it.', address: 'Lumen Street 19', x: 20, z: 1, accent: '#b776bd' },
  { name: 'Breakwater Garage', category: 'Services', district: 'Cinder Wharf', rating: '4.4', hours: '07:00 — 19:00', description: 'Salt-air mechanics, honest estimates and the best view of the container cranes.', address: 'Anchor Road 103', x: -33, z: 14, accent: '#d2855e' },
  { name: 'Holloway Market', category: 'Shopping', district: 'The Narrows', rating: '4.6', hours: '08:00 — 23:00', description: 'A crowded neighborhood market in an old streetcar depot with iron-framed stalls.', address: 'Holloway Street 5', x: -21, z: -2, accent: '#adbd78' },
  { name: 'Aster Bank Tower', category: 'Services', district: 'Meridian Core', rating: '4.1', hours: '09:00 — 17:00', description: 'The city’s original high-rise, still keeping its lights on through every storm.', address: 'Civic Ring 1', x: -2, z: 2, accent: '#b8c2cb' },
  { name: 'Driftwood Social', category: 'Food & Drink', district: 'Pacific Verge', rating: '4.7', hours: '11:00 — 00:00', description: 'A bright little seafood kitchen with a dark view of the water and a crowded bar by sunset.', address: 'Breakwater Walk 3', x: -26, z: -20, accent: '#d88a65' },
  { name: 'Northline Motors', category: 'Transport', district: 'Northline Yards', rating: '4.3', hours: '09:00 — 21:00', description: 'Used cars, old vans and one immaculate black sedan in the corner.', address: 'Switchyard Avenue 60', x: -14, z: 17, accent: '#8194a8' },
  { name: 'Juniper Athletic', category: 'Services', district: 'Juniper Flats', rating: '4.5', hours: '05:00 — 23:00', description: 'A low concrete gym built around a former train shed and all the weight rooms in between.', address: 'Juniper Road 28', x: 8, z: -25, accent: '#a1b27c' },
  { name: 'The Lantern Room', category: 'Nightlife', district: 'Morrow Point', rating: '4.8', hours: '18:00 — 02:00', description: 'Cocktails, brass lamps and a view down to the aircraft lights.', address: 'Morrow Street 44', x: 11, z: 16, accent: '#d0a04c' },
  { name: 'Bellglass & Co', category: 'Shopping', district: 'Bellweather Hills', rating: '4.4', hours: '09:00 — 18:00', description: 'A boutique home goods store that looks more like a gallery than a shop.', address: 'Hearth Lane 9', x: 28, z: -13, accent: '#b6b08a' },
  { name: 'Morrow Bay Lodge', category: 'Stay', district: 'Morrow Point', rating: '4.7', hours: 'Always open', description: 'An old boathouse turned hotel with a heavy cedar bar and salt-stained windows.', address: 'Morrow Bell 77', x: 9, z: 10, accent: '#d3b175' },
  { name: 'Tern Street Cafe', category: 'Food & Drink', district: 'Redhaven', rating: '4.2', hours: '07:00 — 19:00', description: 'A bright roadside café trading in strong coffee, slow breakfasts and old local radio.', address: 'Tern Street 20', x: -24, z: 30, accent: '#d9a267' },
  { name: 'Harborline Terminal', category: 'Transport', district: 'Harbor Row', rating: '4.3', hours: '05:00 — 23:00', description: 'Commuter ferries, freight shuttles and the city’s least glamorous but steady transit artery.', address: 'Harbor Row 3', x: -38, z: -3, accent: '#88a9ba' },
  { name: 'Crown International', category: 'Transport', district: 'Crown Terrace', rating: '4.6', hours: '24/7', description: 'A gleaming airport terminal with long glass corridors and a constant loop of arrivals.', address: 'Airway Loop 1', x: 35, z: -29, accent: '#7ea4b8' },
  { name: 'Copper Lantern', category: 'Nightlife', district: 'Lantern Row', rating: '4.8', hours: '19:00 — 03:00', description: 'A long, red-lit dance floor tucked below a row of old apartment blocks.', address: 'Lantern Row 22', x: 6, z: 24, accent: '#d5857d' },
  { name: 'Radiant Library', category: 'Culture', district: 'Glasswater', rating: '4.9', hours: '09:00 — 18:00', description: 'A bright civic library built with skylit atriums and a whole floor of local archives.', address: 'Glasswater Ave 4', x: 15, z: 27, accent: '#8c9ab8' },
  { name: 'The Winged Oak', category: 'Food & Drink', district: 'Solace Quarter', rating: '4.5', hours: '08:00 — 21:00', description: 'A leafy neighborhood restaurant with polished timber and a menu built around market vegetables.', address: 'Maple Crest 14', x: 15, z: -38, accent: '#93ad75' },
  { name: 'Stonecut Clinic', category: 'Services', district: 'Quarry Heights', rating: '4.6', hours: '08:00 — 22:00', description: 'A no-nonsense hospital wing with emergency access and a calm, practical staff.', address: 'Quarry Terrace 66', x: 39, z: 15, accent: '#96a7a6' },
  { name: 'Half Moon Arcade', category: 'Culture', district: 'Iron Dock', rating: '4.4', hours: '14:00 — 01:00', description: 'A neon-lit arcade with old cabinets, side rooms and a reputation for long nights.', address: 'Iron Dock 81', x: -9, z: 32, accent: '#d9b77e' },
  { name: 'Pinehouse Suites', category: 'Stay', district: 'Bellweather Hills', rating: '4.5', hours: 'Always open', description: 'A hillside inn with pine-lined balconies and long views over the city in the rain.', address: 'Hillside Rise 44', x: 31, z: -18, accent: '#8da891' },
  { name: 'North Salt Market', category: 'Shopping', district: 'Harbor Row', rating: '4.3', hours: '09:00 — 21:00', description: 'Fishmongers, small electronics stalls and cheap imported fabrics under one long roof.', address: 'North Salt 23', x: -42, z: -8, accent: '#a6b1bb' },
  { name: 'Duneline Park', category: 'Parks', district: 'Pacific Verge', rating: '4.9', hours: '06:00 — 22:00', description: 'A windswept public park that curves toward the water with a slow promenade and long benches.', address: 'Sea Line 4', x: -23, z: -25, accent: '#7aa77f' },
  { name: 'Northwatch Station', category: 'Transport', district: 'Northline Yards', rating: '4.2', hours: '05:00 — 23:30', description: 'A transit stop with tiled walls, constant commuters and a line to the hill districts.', address: 'Northwatch Ave 12', x: -15, z: 22, accent: '#7ca4af' },
  { name: 'Meridian Exchange', category: 'Services', district: 'Meridian Core', rating: '4.7', hours: '08:00 — 18:00', description: 'A ceremonial civic hall and grain exchange turned to offices, events and occasional speeches.', address: 'Exchange Loop 1', x: -4, z: 6, accent: '#c4b483' },
  { name: 'Glassline Goods', category: 'Shopping', district: 'Vesper Row', rating: '4.4', hours: '10:00 — 19:00', description: 'A small design store selling hand-assembled lamps, ceramic work and glassware.', address: 'Vesper Lane 13', x: 22, z: 4, accent: '#b0a9d3' },
  { name: 'Lighthouse House', category: 'Stay', district: 'Pacific Verge', rating: '4.8', hours: 'Always open', description: 'A historic inn perched on a low ridgeline with a nightly watch over the coast.', address: 'Beacon Point 31', x: -30, z: -34, accent: '#86a6b2' },
  { name: 'Gull & Grain', category: 'Food & Drink', district: 'Harbor Row', rating: '4.6', hours: '12:00 — 23:00', description: 'A harbor-facing kitchen with fried fish, beer and a steady stream of dockworkers.', address: 'Harbor Row 58', x: -44, z: -15, accent: '#d1a86e' }
];

const generated: Omit<Location, 'id'>[] = [
  { name: 'Cinder Chapel', category: 'Culture', district: 'Cinder Wharf', rating: '4.5', hours: '10:00 — 20:00', description: 'A converted chapel filled with local paintings and a basement rehearsal room.', address: 'Cinder Way 18', x: -31, z: 11, accent: '#c29a75' },
  { name: 'Nineteen Steps', category: 'Food & Drink', district: 'The Narrows', rating: '4.6', hours: '17:00 — 01:00', description: 'A tucked-away restaurant with soft lamps and a menu built around winter comfort food.', address: 'Nineteen Steps 12', x: -19, z: -8, accent: '#c68f72' },
  { name: 'Upper Dock Supply', category: 'Services', district: 'Ashwater', rating: '4.2', hours: '07:00 — 17:00', description: 'A small industrial supply yard for repair crews and warehouse teams.', address: 'Ashwater Lane 9', x: -19, z: 38, accent: '#8ea090' },
  { name: 'Maryn Square', category: 'Parks', district: 'Morrow Point', rating: '4.8', hours: '06:00 — 22:00', description: 'A compact town square with old trees, metal benches and the city’s best sunset view.', address: 'Morrow Walk 6', x: 7, z: 20, accent: '#7ea56d' },
  { name: 'Tramworks Depot', category: 'Transport', district: 'Lumen Dock', rating: '4.1', hours: '05:00 — 22:00', description: 'Transit maintenance sheds, old tram lines and a low hum that never quite stops.', address: 'Lumen Dock 73', x: -46, z: 26, accent: '#a29e7d' },
  { name: 'North Terrace Gym', category: 'Services', district: 'East Fairway', rating: '4.3', hours: '05:00 — 23:00', description: 'A bright chain gym with mirrored walls and a steady stream of early runners.', address: 'Fairway West 29', x: 32, z: 34, accent: '#9da380' },
  { name: 'Hush Arcade', category: 'Culture', district: 'Glasswater', rating: '4.4', hours: '14:00 — 00:00', description: 'A retro arcade with dangling prize lights and glowing cabinets humming through the cool air.', address: 'Glasswater 18', x: 18, z: 24, accent: '#8ca7c9' },
  { name: 'St. Delmar Hotel', category: 'Stay', district: 'Redhaven', rating: '4.5', hours: 'Always open', description: 'A practical roadside hotel for long-haul drivers and early commuter flights.', address: 'Delmar Road 14', x: -29, z: 31, accent: '#ba8d72' }
];

const allLocations: Omit<Location, 'id'>[] = [...seedLocations, ...generated];
export const locations: Location[] = allLocations.map((entry, index) => ({
  id: `loc-${index}`,
  ...entry
}));

export const categoryOrder: Category[] = ['Food & Drink', 'Stay', 'Culture', 'Shopping', 'Nightlife', 'Services', 'Transport', 'Parks'];

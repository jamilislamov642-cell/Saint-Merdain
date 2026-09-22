import { districts, locations as seedLocations, type Category, type Location } from '../data';

const names: Record<Category, string[]> = {
  'Food & Drink': ['Blue Finch Cafe', 'Rainline Diner', 'Salt & Coal', 'Mariner Coffee', 'Oxbow Kitchen', 'Nightjar Bakery', 'Cedar Spoon', 'Harbor Cup'],
  Stay: ['Lowtide Rooms', 'Orchard House', 'The Meridian Arms', 'Rainbird Hotel', 'Westward Suites', 'Anchorlight Inn'],
  Culture: ['Southbank Archive', 'The Lantern Cinema', 'Signal Gallery', 'Civic Workshop', 'Morrow Arts Hall', 'Old Tram Museum'],
  Shopping: ['Foundry Supply', 'Tide & Thread', 'Parlor Goods', 'Mercury Books', 'Hearthline Market', 'Cobalt Outfitters'],
  Nightlife: ['Blue Static', 'Velvet Current', 'The Long Weekend', 'Nocturne Bar', 'Rook & Bell', 'After Hours'],
  Services: ['Meridian Pharmacy', 'Bayline Motors', 'Crown Cleaners', 'Tern Legal', 'Northstar Clinic', 'Alder Hardware'],
  Transport: ['Harbor Bus Depot', 'East Meridian Station', 'Cinder Ferry', 'Morrow Taxi Co', 'Verge Shuttle', 'Crown Rail Link'],
  Parks: ['Duneline Green', 'Juniper Common', 'Tide Park', 'Orison Gardens', 'Northbank Field']
};
const categoryList = Object.keys(names) as Category[];
const accents = ['#d5a66c', '#80aebb', '#c47c68', '#b776bd', '#9bb57e', '#d2855e'];

export const catalogLocations: Location[] = [...seedLocations];
for (let i = 0; i < 320; i += 1) {
  const category = categoryList[i % categoryList.length];
  const district = districts[(i * 7 + Math.floor(i / 9)) % districts.length];
  catalogLocations.push({
    id: `catalog-${i}`,
    name: `${names[category][i % names[category].length]} ${String(i + 1).padStart(2, '0')}`,
    category,
    district: district.name,
    rating: (4 + ((i * 13) % 10) / 10).toFixed(1),
    hours: i % 11 === 0 ? 'Always open' : i % 5 === 0 ? '18:00 — 02:00' : '08:00 — 21:00',
    description: `A fictional ${category.toLowerCase()} stop in ${district.name}, with its own corner of Saint Meridian atmosphere.`,
    address: `${district.code} ${['Avenue', 'Street', 'Boulevard', 'Lane'][i % 4]} ${10 + ((i * 17) % 890)}`,
    x: district.x + ((i * 13) % 17 - 8) * 0.72,
    z: district.z + ((i * 19) % 15 - 7) * 0.7,
    accent: accents[i % accents.length]
  });
}

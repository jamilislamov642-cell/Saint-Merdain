import { districts } from '../data';
import type { RoadEdge, RoadNode } from '../lib/routePlanner';

export const roadNodes: RoadNode[] = districts.map((district, index) => ({ id: `district-${index}`, name: district.name, x: district.x, z: district.z }));

const link = (from: number, to: number, name: string): RoadEdge => ({ from: `district-${from}`, to: `district-${to}`, name, distance: Math.hypot(districts[from].x - districts[to].x, districts[from].z - districts[to].z) });

export const roadEdges: RoadEdge[] = [
  link(0, 1, 'Wharf Connector'), link(1, 2, 'Northline Boulevard'), link(1, 3, 'Civic Freight Road'), link(2, 3, 'Morrow Avenue'), link(2, 4, 'Vesper Approach'), link(3, 4, 'Meridian Spine'), link(3, 5, 'Old Exchange Road'), link(3, 6, 'Orison Avenue'), link(4, 6, 'Vesper Run'), link(5, 6, 'Narrows Road'), link(6, 7, 'Bellweather Climb'), link(6, 9, 'Juniper Parkway'), link(7, 10, 'Crown Terrace Road'), link(9, 10, 'Fairway Drive'), link(0, 8, 'Breakwater Road'), link(5, 8, 'Verge Boulevard'), link(1, 11, 'Redhaven Spur'), link(2, 11, 'Morrow Spur')
];

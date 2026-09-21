import type { Location } from '../data';

export type CityPoint = { x: number; z: number };
export type RoadNode = CityPoint & { id: string; name?: string };
export type RoadEdge = { from: string; to: string; distance: number; name: string };
export type RouteResult = { nodes: RoadNode[]; edges: RoadEdge[]; distance: number; minutes: number };

export const distance = (a: CityPoint, b: CityPoint) => Math.hypot(a.x - b.x, a.z - b.z);

export function createRoadGraph(nodes: RoadNode[], edges: RoadEdge[]) {
  const adjacency = new Map<string, RoadEdge[]>();
  nodes.forEach(node => adjacency.set(node.id, []));
  edges.forEach(edge => {
    adjacency.get(edge.from)?.push(edge);
    adjacency.get(edge.to)?.push({ ...edge, from: edge.to, to: edge.from });
  });
  return { nodes, edges, adjacency };
}

function nearestNode(point: CityPoint, nodes: RoadNode[]) {
  return nodes.reduce((nearest, node) => distance(point, node) < distance(point, nearest) ? node : nearest, nodes[0]);
}

/** Dijkstra route search kept renderer-agnostic so it can later be fed by GeoJSON/vector tiles. */
export function findRoute(origin: CityPoint | Location, destination: CityPoint | Location, nodes: RoadNode[], edges: RoadEdge[]): RouteResult | null {
  if (!nodes.length) return null;
  const graph = createRoadGraph(nodes, edges);
  const start = nearestNode(origin, nodes);
  const goal = nearestNode(destination, nodes);
  const costs = new Map<string, number>(nodes.map(node => [node.id, Infinity]));
  const previous = new Map<string, { node: string; edge: RoadEdge }>();
  const open = new Set(nodes.map(node => node.id));
  costs.set(start.id, 0);

  while (open.size) {
    const current = [...open].reduce((best, id) => (costs.get(id)! < costs.get(best)!) ? id : best);
    open.delete(current);
    if (current === goal.id) break;
    for (const edge of graph.adjacency.get(current) ?? []) {
      if (!open.has(edge.to)) continue;
      const nextCost = costs.get(current)! + edge.distance;
      if (nextCost < costs.get(edge.to)!) {
        costs.set(edge.to, nextCost);
        previous.set(edge.to, { node: current, edge });
      }
    }
  }

  if (!previous.has(goal.id) && start.id !== goal.id) return null;
  const path: string[] = [goal.id];
  const pathEdges: RoadEdge[] = [];
  while (path[0] !== start.id) {
    const step = previous.get(path[0]);
    if (!step) return null;
    pathEdges.unshift(step.edge);
    path.unshift(step.node);
  }
  const byId = new Map(nodes.map(node => [node.id, node]));
  const pathNodes = path.map(id => byId.get(id)!);
  const total = costs.get(goal.id) ?? 0;
  return { nodes: pathNodes, edges: pathEdges, distance: total, minutes: Math.max(1, Math.round(total * 1.8)) };
}

export const routeLabel = (route: RouteResult | null) => route ? `${route.minutes} min · ${(route.distance * 100).toFixed(0)} m` : 'No mapped route';

import type { Location } from '../data';
import { catalogLocations } from '../data/catalog';

export function MarkerPreview({ location, x, y, onRoute, onOpen }: { location: Location; x: number; y: number; onRoute: (location: Location) => void; onOpen: (location: Location) => void }) {
  return <div className="marker-preview" style={{ left: x + 16, top: y - 12 }} onClick={() => onOpen(location)}>
    <div className="preview-accent" style={{ background: location.accent }} />
    <span className="type">{location.category.toUpperCase()}</span>
    <strong>{location.name}</strong>
    <small>{location.district} · ★ {location.rating}</small>
    <p>{location.description}</p>
    <button onClick={event => { event.stopPropagation(); onRoute(location); }}>ROUTE HERE ↗</button>
  </div>;
}

export const previewLocation = (id: string) => catalogLocations.find(location => location.id === id) ?? null;

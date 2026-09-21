import type { Location } from '../data';

export function MapTooltip({ location, x, y }: { location: Location; x: number; y: number }) {
  return <div className="map-tooltip" style={{ left: x + 14, top: y + 14 }} role="status">
    <span className="tooltip-kicker">{location.category.toUpperCase()}</span>
    <strong>{location.name}</strong>
    <small>{location.district} · ★ {location.rating}</small>
  </div>;
}

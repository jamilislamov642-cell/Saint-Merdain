import { useMemo, useState } from 'react';
import type { Location } from '../data';
import { catalogLocations } from '../data/catalog';

export function RoutePlannerPanel({ origin, destination, onOrigin, onDestination, onRoute, onSwap, onClear }: { origin: Location | null; destination: Location | null; onOrigin: (location: Location) => void; onDestination: (location: Location) => void; onRoute: () => void; onSwap: () => void; onClear: () => void }) {
  const [picker, setPicker] = useState<'origin' | 'destination' | null>(null);
  const [query, setQuery] = useState('');
  const choices = useMemo(() => {
    const q = query.toLowerCase().trim();
    return catalogLocations.filter(location => !q || `${location.name} ${location.district} ${location.category}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);
  const choose = (location: Location) => { if (picker === 'origin') onOrigin(location); if (picker === 'destination') onDestination(location); setPicker(null); setQuery(''); };
  return <section className="route-planner-panel">
    <div className="route-planner-head"><div><span className="eyebrow">NAVIGATION / LIVE ROUTE</span><strong>Plan a way through Meridian</strong></div><button onClick={onClear}>CLEAR</button></div>
    <button className={`route-stop ${picker === 'origin' ? 'route-picking' : ''}`} onClick={() => setPicker('origin')}><span className="route-dot start"/><span><small>STARTING POINT</small><b>{origin?.name ?? 'Choose origin'}</b></span><i>⌄</i></button>
    <div className="route-connector" />
    <button className={`route-stop ${picker === 'destination' ? 'route-picking' : ''}`} onClick={() => setPicker('destination')}><span className="route-dot end"/><span><small>DESTINATION</small><b>{destination?.name ?? 'Choose destination'}</b></span><i>⌄</i></button>
    <div className="route-actions"><button onClick={onSwap} disabled={!origin || !destination}>⇅ SWAP</button><button className="route-go" onClick={onRoute} disabled={!origin || !destination}>DRAW ROUTE ↗</button></div>
    {picker && <div className="route-picker"><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a place..." />{choices.map(location => <button key={location.id} onClick={() => choose(location)}><span style={{ background: location.accent }} /><span><b>{location.name}</b><small>{location.district} · {location.category}</small></span></button>)}</div>}
  </section>;
}

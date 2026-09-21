import type { Location } from '../data';
import type { RouteHistoryItem } from '../hooks/useRouteHistory';

export function RouteHistoryPanel({ history, locations, onSelect, onRemove, onClear }: { history: RouteHistoryItem[]; locations: Location[]; onSelect: (location: Location) => void; onRemove: (id: string) => void; onClear: () => void }) {
  return <section className="route-history-panel">
    <div className="route-panel-head"><div><span className="eyebrow">RECENT ROUTES</span><strong>{history.length ? `${history.length} destinations` : 'No destinations yet'}</strong></div>{history.length > 0 && <button onClick={onClear}>CLEAR</button>}</div>
    {history.map(item => { const location = locations.find(candidate => candidate.id === item.destinationId); if (!location) return null; return <button className="history-row" key={item.id} onClick={() => onSelect(location)}><span className="history-line"/><span><strong>{item.destinationName}</strong><small>{item.district} · route destination</small></span><i onClick={event => { event.stopPropagation(); onRemove(item.id); }}>×</i></button>; })}
  </section>;
}

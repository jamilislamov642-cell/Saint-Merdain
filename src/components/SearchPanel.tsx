import { useMemo, useState } from 'react';
import type { Category, Location } from '../data';
import { catalogLocations } from '../data/catalog';

export const useCatalogSearch = (query: string, category: Category | 'ALL', district: string) => useMemo(() => {
  const q = query.trim().toLowerCase();
  return catalogLocations.filter(location => (category === 'ALL' || location.category === category) && (district === 'ALL' || location.district === district) && (!q || `${location.name} ${location.category} ${location.district} ${location.address}`.toLowerCase().includes(q)));
}, [query, category, district]);

export function SearchPanel({ query, setQuery, results, onSelect }: { query: string; setQuery: (value: string) => void; results: Location[]; onSelect: (location: Location) => void }) {
  const [expanded, setExpanded] = useState(true);
  return <section className={`search-panel ${expanded ? 'expanded' : 'collapsed'}`}><div className="search-panel-head"><span className="eyebrow">CITY SEARCH / {results.length}</span><button onClick={() => setExpanded(value => !value)}>{expanded ? '—' : '+'}</button></div><input autoFocus={false} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search venues, streets, districts..." />{expanded && <div className="search-results">{results.slice(0, 12).map(location => <button key={location.id} onClick={() => onSelect(location)}><span className="result-dot" style={{ background: location.accent }} /><span><strong>{location.name}</strong><small>{location.category} · {location.district}</small></span><b>›</b></button>)}{results.length > 12 && <small className="result-more">+ {results.length - 12} more results</small>}</div>}</section>;
}

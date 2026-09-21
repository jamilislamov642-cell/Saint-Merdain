import { calculateDistrictDensity, densityColor } from '../lib/districtDensity';
import type { District, Location } from '../data';

export function DensityPanel({ districts, locations, enabled, onToggle }: { districts: District[]; locations: Location[]; enabled: boolean; onToggle: () => void }) {
  const density = calculateDistrictDensity(districts, locations);
  return <section className={`density-panel ${enabled ? 'density-visible' : ''}`}>
    <div className="density-head"><div><span className="eyebrow">CITY DENSITY</span><strong>POI HEATMAP</strong></div><button onClick={onToggle}>{enabled ? 'ON' : 'OFF'}</button></div>
    {enabled && <div className="density-list">{density.sort((a, b) => b.count - a.count).slice(0, 7).map(item => <div className="density-row" key={item.name}><span className="density-swatch" style={{ background: densityColor(item.intensity) }} /><span>{item.name}</span><i><b style={{ width: `${Math.max(5, item.intensity * 100)}%`, background: densityColor(item.intensity) }} /></i><small>{item.count}</small></div>)}</div>}
  </section>;
}

import { useMemo } from 'react';
import { calculateDistrictDensity, densityColor } from '../lib/districtDensity';
import type { District, Location } from '../data';

export function DistrictHeatmap({ districts, locations, visible, onToggle }: { districts: District[]; locations: Location[]; visible: boolean; onToggle: () => void }) {
  const values = useMemo(() => calculateDistrictDensity(districts, locations), [districts, locations]);
  return <section className={`heatmap-panel ${visible ? 'is-visible' : ''}`}><div className="heatmap-head"><div><span className="eyebrow">CARTOGRAPHY / ANALYTICS</span><strong>District heatmap</strong></div><button onClick={onToggle}>{visible ? 'HIDE' : 'SHOW'}</button></div>{visible && <div className="heatmap-bars">{values.sort((a, b) => b.count - a.count).slice(0, 8).map(item => <div className="heatmap-bar" key={item.name}><div><span>{item.name}</span><b>{item.count}</b></div><i><em style={{ width: `${Math.max(4, item.intensity * 100)}%`, background: densityColor(item.intensity) }} /></i></div>)}</div>}</section>;
}

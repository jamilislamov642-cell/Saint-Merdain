import { useEffect, useMemo, useRef, useState } from 'react';
import { createCity } from './city';
import { categoryOrder, districts, locations, type Category, type Location } from './data';

const categories: Array<{ name: Category; icon: string }> = [
  { name: 'Food & Drink', icon: '✦' },
  { name: 'Nightlife', icon: '◒' },
  { name: 'Culture', icon: '▣' },
  { name: 'Shopping', icon: '◇' },
  { name: 'Stay', icon: '⌂' },
  { name: 'Services', icon: '＋' },
  { name: 'Transport', icon: '↗' },
  { name: 'Parks', icon: '❋' }
];

export default function App() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cityRef = useRef<ReturnType<typeof createCity> | null>(null);

  const [selected, setSelected] = useState<Location | null>(locations[0]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'ALL'>('ALL');
  const [district, setDistrict] = useState('ALL');
  const [night, setNight] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [districtIndexOpen, setDistrictIndexOpen] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const city = createCity((location) => {
      setSelected(location);
      city.focus(location);
    });

    cityRef.current = city;
    mountRef.current.appendChild(city.renderer.domElement);

    const resize = () => {
      if (!mountRef.current) return;
      city.renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight, false);
      city.camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      city.camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      city.renderer.render(city.scene, city.camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      mountRef.current?.removeChild(city.renderer.domElement);
    };
  }, []);

  useEffect(() => {
    cityRef.current?.setNight(night);
  }, [night]);

  const visible = useMemo(() => {
    return locations.filter((location) => {
      const categoryMatch = category === 'ALL' || location.category === category;
      const districtMatch = district === 'ALL' || location.district === district;
      const searchText = `${location.name} ${location.category} ${location.district}`.toLowerCase();
      const queryMatch = !query || searchText.includes(query.toLowerCase());
      return categoryMatch && districtMatch && queryMatch;
    });
  }, [category, district, query]);

  const nearby = useMemo(() => {
    if (!selected) return [];
    return locations.filter((location) => location.id !== selected.id).slice(0, 3);
  }, [selected]);

  const handleFocus = (location: Location) => {
    setSelected(location);
    cityRef.current?.focus(location);
  };

  const toggleFavorite = () => {
    if (!selected) return;
    setFavorites((current) => 
      current.includes(selected.id) ? current.filter((id) => id !== selected.id) : [...current, selected.id]
    );
  };

  return (
    <main className={night ? 'app night' : 'app'}>
      <div className="map" ref={mountRef} />

      <header className="topbar">
        <div className="brand">
          <span className="mark">✦</span>
          <div>
            <strong>SAINT MERIDIAN</strong>
            <small>CITY ATLAS / 04:17 PM</small>
          </div>
        </div>

        <div className="search">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the city..." />
          <kbd>⌘ K</kbd>
        </div>

        <div className="top-actions">
          <button className="icon-btn" onClick={() => setNight((value) => !value)} title="Toggle day / night">
            {night ? '☼' : '◐'}
          </button>
          <button className="avatar">JM</button>
        </div>
      </header>

      <aside className="left-rail">
        <div className="eyebrow">MAP LAYERS</div>
        {['City', 'Businesses', 'Nightlife', 'Transport', 'Landmarks'].map((layer, index) => (
          <button className={`layer ${index === 0 ? 'active' : ''}`} key={layer}>
            <i className={`layer-dot layer-${index}`} />
            {layer}
            <span>{index === 0 ? 'ON' : index === 1 ? String(locations.length) : index === 2 ? String(locations.filter((loc) => loc.category === 'Nightlife').length) : index === 3 ? '42' : '18'}</span>
          </button>
        ))}

        <div className="rail-rule" />
        <div className="eyebrow">CITY STATUS</div>
        <div className="status"><span className="live" />LIVE MODEL <b>0.8</b></div>
        <div className="status"><span className="sun" />CLEAR / 18°C</div>

        <button className="district-open" onClick={() => setDistrictIndexOpen(true)}>
          VIEW DISTRICT INDEX ↗
        </button>

        <div className="coords">
          34° 02′ 18″ N<br />
          118° 14′ 02″ W <em>fictional coordinates</em>
        </div>
      </aside>

      <section className="filter-panel">
        <div className="eyebrow">DISCOVER / {visible.length} PLACES</div>
        <div className="chips">
          {categories.map((item) => (
            <button
              key={item.name}
              className={category === item.name ? 'chip selected' : 'chip'}
              onClick={() => setCategory((current) => (current === item.name ? 'ALL' : item.name))}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>

        <select value={district} onChange={(event) => setDistrict(event.target.value)}>
          <option value="ALL">All districts</option>
          {districts.map((item) => (
            <option value={item.name} key={item.name}>{item.name}</option>
          ))}
        </select>
      </section>

      {selected && (
        <aside className="detail">
          <div className="detail-head">
            <span className="type">{selected.category.toUpperCase()}</span>
            <button onClick={() => setSelected(null)}>×</button>
          </div>

          <div className="detail-title">
            <h1>{selected.name}</h1>
            <button className={favorites.includes(selected.id) ? 'heart saved' : 'heart'} onClick={toggleFavorite}>♥</button>
          </div>

          <div className="rating">
            <b>★ {selected.rating}</b>
            <span> / 5.0</span>
            <span className="open">● OPEN NOW</span>
          </div>

          <p>{selected.description}</p>

          <div className="info-row">
            <span>⌖</span>
            <div>
              <small>ADDRESS</small>
              <strong>{selected.address}</strong>
            </div>
          </div>

          <div className="info-row">
            <span>◷</span>
            <div>
              <small>HOURS</small>
              <strong>{selected.hours}</strong>
            </div>
          </div>

          <div className="info-row">
            <span>◈</span>
            <div>
              <small>DISTRICT</small>
              <strong>{selected.district}</strong>
            </div>
          </div>

          <button className="route" onClick={() => handleFocus(selected)}>
            ↗ FLY TO LOCATION
          </button>

          <div className="nearby">
            <div className="eyebrow">NEARBY / {nearby.length}</div>
            {nearby.map((location) => (
              <button onClick={() => handleFocus(location)} key={location.id}>
                <span className="near-dot" style={{ background: location.accent }} />
                <span>
                  {location.name}
                  <small>{location.category} · {location.district}</small>
                </span>
                <b>›</b>
              </button>
            ))}
          </div>
        </aside>
      )}

      <div className="controls">
        <span>DRAG TO ROTATE</span>
        <i />
        <span>SCROLL TO ZOOM</span>
        <button onClick={() => cityRef.current?.focus({ x: 0, z: 0 })}>◎</button>
      </div>

      <div className="scale">
        <span>0</span>
        <i />
        <span>500 M</span>
      </div>

      <div className="district-tag">
        <span className="pulse" />
        {selected?.district ?? 'MERIDIAN CORE'}
        <small>SECTOR 04</small>
      </div>

      {districtIndexOpen && (
        <div className="modal-backdrop" onClick={() => setDistrictIndexOpen(false)}>
          <section className="district-modal" onClick={(event) => event.stopPropagation()}>
            <div className="detail-head">
              <span className="type">SAINT MERIDIAN / DISTRICTS</span>
              <button onClick={() => setDistrictIndexOpen(false)}>×</button>
            </div>

            <h2>City, in twenty moods.</h2>
            <p className="modal-copy">A quick atlas of neighborhoods, every one carrying its own weather, architecture and after-hours rhythm.</p>

            <div className="district-grid">
              {districts.map((districtItem) => (
                <button key={districtItem.name} onClick={() => {
                  setDistrict(districtItem.name);
                  setDistrictIndexOpen(false);
                  cityRef.current?.focus(districtItem);
                }}>
                  <span style={{ background: districtItem.color }} />
                  <strong>{districtItem.name}</strong>
                  <small>{districtItem.mood}</small>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

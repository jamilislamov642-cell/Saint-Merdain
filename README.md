# Saint Meridian

Saint Meridian is a fictional coastal American city rendered as a cinematic interactive 3D atlas. It is an original setting: no real streets, landmarks, brands, or game assets are used.

## Run locally

```bash
npm install
npm run dev
```

## Foundation

- React, TypeScript, Vite and Three.js
- Procedural coastal terrain, ocean, hills, roads, bridge and skyline
- Twelve original districts with distinct visual identities
- Generated venue catalog with category, district, rating, hours and address metadata
- Search, category and district discovery
- Clickable 3D location markers with focus animation
- Day/night lighting, favorites, district index and route-preview state
- Camera drag rotation, tilt, wheel zoom and responsive layout

## Data and performance direction

The map is intentionally data-driven. `src/data/cityManifest.ts` contains transit and landmark metadata, while `src/lib/spatialIndex.ts` provides a small grid index for viewport queries. The index keeps the UI independent from the renderer and gives the project a clean path toward clustered markers, lazy-loaded JSON tiles, and instanced building geometry as the city expands.

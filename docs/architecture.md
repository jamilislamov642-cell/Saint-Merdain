# Saint Meridian implementation notes

This commit adds the first renderer-independent gameplay-map systems:

- `src/lib/routePlanner.ts` — weighted road graph and Dijkstra route search.
- `src/lib/markerCluster.ts` — grid clustering and viewport culling helpers for dense POI layers.
- `src/data/roads.ts` — fictional district road graph seed data.
- `src/hooks/useLocationSearch.ts` — reusable full-text, category and district filtering.
- `src/hooks/useStoredList.ts` — localStorage-backed favorites primitive.
- `src/lib/presentation.ts` — location export, distance formatting and opening-state helpers.
- `src/hooks/useKeyboardShortcuts.ts` — keyboard interaction foundation.

These modules intentionally do not depend on Three.js, so the catalog, routing and UI can be tested or moved to a worker without touching the 3D renderer.

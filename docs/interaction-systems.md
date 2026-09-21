## Interaction upgrade

The latest map systems add a focused interaction layer around destinations:

- `useRouteHistory` persists the last eight route destinations locally.
- `RouteHistoryPanel` gives the user one-click return trips and clear/remove controls.
- `useMarkerTooltip` and `MapTooltip` provide a reusable hover-card model for projected Three.js markers.
- `calculateDistrictDensity` calculates normalized district intensity for a heatmap or overlay pass.
- `DensityPanel` presents the live district ranking and layer toggle.
- `mapLayers` centralizes category-to-layer behavior for Businesses, Nightlife, Transport and Density.

The components are deliberately independent of the renderer. That keeps route history and district analytics usable if the city later moves marker projection into a worker or MapLibre overlay.

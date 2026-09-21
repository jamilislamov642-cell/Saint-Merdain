# Production pass checklist

The application entry point now mounts `MapExperience`, including the advanced interaction styles instead of the original prototype shell.

## Verification

Run the following before release:

```bash
npm install
npm run build
npm run dev
```

The build command is the TypeScript integration gate. Browser verification should cover:

- selecting a marker and flying to it
- choosing an origin and destination
- drawing a route and clearing it
- toggling day/night and map layers
- opening the search result list
- opening the heatmap and district index
- resizing from desktop to mobile

## Remaining production work

The current renderer has the data and UI primitives for the final pass. The remaining work is wiring every advanced panel into one state owner, exposing marker hover/projection events from Three.js, rendering density rings in the scene, and replacing the prototype road graph with a complete road network. After that, profile with a large catalog and move marker/building generation to instanced or viewport-loaded batches.

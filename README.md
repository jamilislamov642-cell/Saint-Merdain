# Saint Merdain

**Saint Merdain** is an original fictional coastal metropolis presented as a cinematic interactive city atlas. It explores how a city can communicate history, mood, infrastructure, and everyday life through a map rather than a traditional game world.

**Live site:** [saintmerdain.city](https://saintmerdain.city/) · [source](https://github.com/jamilislamov642-cell/Saint-Merdain) · [license](./LICENSE) · [deployment guide](./docs/deployment.md)

## Features

- Procedural Three.js coastal city with ocean, terrain, roads, bridges, hills, skyline, landmarks, and district overlays.
- Searchable fictional places with category and district filtering.
- Clickable locations, detail panels, favorites, day/night lighting, camera orbit, tilt, zoom, and focus transitions.
- Route-planning foundations, route history, POI clustering, spatial lookup, density analytics, and generated catalog data.
- A single-file browser edition in [`standalone.html`](./standalone.html) for quick exploration.
- Static-only architecture suitable for GitHub Pages and a Cloudflare-managed custom domain.

## Run locally

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
npm run preview
```

To open the dependency-light standalone edition, open [`standalone.html`](./standalone.html) or run `npx serve .`.

## Technology

React, TypeScript, Vite, Three.js, semantic HTML, CSS, and data-driven TypeScript modules. No backend, database, API key, or server runtime is required.

## Project structure

- `src/` — React UI, Three.js renderer, data, hooks, and map utilities.
- `src/data/` — generated catalog, road graph, city manifest, and worldbuilding.
- `src/lib/` — routing, clustering, density, validation, geometry caching, and presentation helpers.
- `public/` — browser metadata, favicon, robots policy, and sitemap.
- `standalone.html` — self-contained CDN-powered browser edition.
- `.github/workflows/pages.yml` — GitHub Pages build and deployment workflow.

## GitHub Pages and Cloudflare

The included workflow builds the Vite app and deploys `dist` through GitHub Pages. In repository **Settings → Pages**, select **GitHub Actions** as the source. The root `CNAME` file is set to `saintmerdain.city`; retain it during deployments.

In Cloudflare DNS, point the domain to GitHub Pages using the current GitHub Pages custom-domain instructions. Keep SSL/TLS on **Full** or **Full (strict)** after the certificate becomes available. DNS changes can take time to propagate.

## Languages

- [English](./README.md)
- [Deutsch](./README.de.md)
- [Русский](./README.ru.md)

## License and credits

Released under the [MIT License](./LICENSE). Saint Merdain is original fictional content created for this project. No real-world map data, copyrighted game assets, logos, characters, or branded locations are included.

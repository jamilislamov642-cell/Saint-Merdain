# Saint Merdain

**Saint Merdain** ist eine vollständig fiktive Küstenmetropole, die als filmischer interaktiver Stadtatlas umgesetzt wird. Das Projekt untersucht, wie Karten Geschichte, Atmosphäre, Infrastruktur und Alltag vermitteln können.

**Website:** [saintmerdain.city](https://saintmerdain.city/) · [Quellcode](https://github.com/jamilislamov642-cell/Saint-Merdain) · [Lizenz](./LICENSE) · [Deployment](./docs/deployment.md)

## Funktionen

- Prozedurale Three.js-Stadt mit Küste, Gelände, Straßen, Brücken, Hügeln, Skyline und Bezirks-Overlays.
- Suche, Kategorien, Bezirksfilter, klickbare Orte, Detailkarten, Favoriten und Tag/Nacht-Modus.
- Kamera-Rotation, Neigung, Zoom, Fokusbewegungen, Routing-Grundlagen, Clustering und Dichteanalyse.
- Statische Architektur für GitHub Pages und eine eigene Cloudflare-Domain.

## Lokal starten

```bash
npm install
npm run dev
```

Produktionsprüfung:

```bash
npm run build
npm run preview
```

## Technologie und Struktur

React, TypeScript, Vite, Three.js, HTML und CSS. `src/` enthält UI, Renderer und Daten; `public/` enthält Browser-Metadaten; `standalone.html` ist eine eigenständige Schnellversion.

## Lizenz

Das Projekt steht unter der [MIT-Lizenz](./LICENSE). Alle Stadtnamen, Orte und Inhalte sind fiktional und original.

[English](./README.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md)

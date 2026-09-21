# Running the standalone website

`standalone.html` is a single-file browser version of Saint Meridian. It includes a Three.js coastal city, searchable fictional locations, category and district filters, hover previews, day/night mode, district density, and route drawing.

Open it directly by double-clicking `standalone.html`, or serve the repository folder with:

```bash
npx serve .
```

Then open the local URL shown by the command. The standalone version loads Three.js and fonts from CDNs, so an internet connection is required. The full React/Vite application remains available through `npm install` and `npm run dev`.

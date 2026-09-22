# GitHub Pages + Cloudflare deployment

## GitHub Pages

1. Push to `main`.
2. Open **Settings → Pages** and choose **GitHub Actions**.
3. The workflow at `.github/workflows/pages.yml` installs dependencies, runs `npm run build`, and deploys `dist`.
4. Wait for the workflow to finish. The Pages URL appears in the workflow summary.

The Vite configuration uses `base: './'`, so generated assets work from a repository path as well as a custom domain.

## Cloudflare custom domain

The repository already contains `CNAME` with `saintmerdain.city`. In Cloudflare DNS, configure the domain according to GitHub’s current Pages custom-domain documentation. Use GitHub’s recommended apex or `www` records for your account, then enable HTTPS in GitHub Pages after DNS resolves.

Cloudflare should proxy only after the GitHub certificate is active. Do not add a server, rewrite engine, database, or API requirement: this site is static.

## Local verification

```bash
npm ci
npm run build
npm run preview
```

Open the preview URL and test the map, filters, route controls, mobile layout, and direct navigation. The standalone edition can be checked independently with `npx serve .`.

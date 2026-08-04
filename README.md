# Imaginne Lab

Marketing site for Imaginne Lab, a 3D printing studio (miniatures, home
organization, personalized gifts). Static HTML/CSS/JS, no build step,
localized in English (default), Portuguese, and Spanish.

**Live:** https://imaginne-lab-site.vercel.app

## Structure

```
public/            deployed site (Vercel outputDirectory)
  index.html         English (default, served at /)
  pt/index.html       Portuguese
  es/index.html       Spanish
  assets/
    css/styles.css   design system + all page styles
    js/main.js       theme toggle, mobile nav, scroll-reveal
    fonts/           self-hosted Outfit + DM Mono (woff2)
    icons/           Phosphor icon SVGs (inlined in HTML)
    img/             logos and product photography
  robots.txt
  sitemap.xml

source-assets/      original files as provided by the client (logos, photos),
                    not part of the deployed site
scripts/            local tooling (dev server)
```

## Local development

No dependencies to install. Requires only Node.js.

```
npm run dev
```

Serves `public/` at http://localhost:3000.

## Editing content

- All three languages share the same structure and the same
  `assets/` folder. When changing copy or styling, update
  `index.html`, `pt/index.html`, and `es/index.html` together to
  keep them in sync.
- Paths in HTML are root-relative (`/assets/...`), which is why
  `pt/index.html` and `es/index.html` can reference the same
  `public/assets/` folder without adjustment.

## Deployment

Connected to Vercel via GitHub: pushing to `main` deploys automatically.
`vercel.json` points Vercel at `public/` as the site root.

To deploy manually:

```
vercel --prod
```

# 🚀 Deployment Guide — GitHub Pages

## Automatic Deployment (Recommended)

Push to the `main` branch. The GitHub Actions workflow at `.github/workflows/deploy.yml` will automatically build and deploy to GitHub Pages.

**Live URL**: https://elie-e.github.io

## Prerequisites (for manual / local work)

- Node.js 18+
- npm

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## GitHub Pages Setup (one-time)

1. Go to the repository **Settings → Pages**
2. Set **Source** to `GitHub Actions`
3. Push to `main` — the workflow handles the rest

## Troubleshooting

### Build Failures
```bash
# Run locally to reproduce
npm run build
```

### Base path issues
The `base` in `astro.config.mjs` must match the repository name if deploying to a project page (e.g. `/repo-name/`). For a user/org page (`elie-e.github.io`) it should be `/`.

---

🎉 **Live at https://elie-e.github.io**

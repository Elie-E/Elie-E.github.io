# Deployment Guide - GitHub Pages

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
3. Push to `main` - the workflow handles the rest

## Contact Form — Cloudflare Worker

The contact forms on `/contact` and `/services` send emails via a Cloudflare Worker + [Resend](https://resend.com).

### One-time setup

**1. Install Worker dependencies**
```bash
cd worker
npm install
```

**2. Edit `worker/wrangler.jsonc`**
- `ALLOWED_ORIGIN` — your GitHub Pages URL (already set to `https://elie-e.github.io`)
- `TO_EMAIL` — where you want to receive messages
- `FROM_EMAIL` — a verified Resend sender (e.g. `Portfolio Contact <contact@yourdomain.com>`)

**3. Add your Resend API key as a secret** (never commit it)
```bash
cd worker
npx wrangler secret put RESEND_API_KEY
```

**4. Deploy the Worker**
```bash
cd worker
npx wrangler deploy
# → prints: https://resume-contact-worker.YOUR_SUBDOMAIN.workers.dev
```

**5. Set the Worker URL**

Locally — add to `.env`:
```
PUBLIC_CONTACT_WORKER_URL=https://resume-contact-worker.YOUR_SUBDOMAIN.workers.dev
```

On GitHub — add `PUBLIC_CONTACT_WORKER_URL` as a **repository secret** (Settings → Secrets → Actions). The workflow already reads it.

### Local Worker development
```bash
cd worker
npx wrangler dev
```

---

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

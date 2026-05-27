# Alban - Professional Resume

A multi-language professional resume website built with Astro and deployed on GitHub Pages.

## 🌍 Languages Supported
- �� English
- �� Français
- 🇪🇸 Español

## 🚀 Features
- **Multi-language support** with i18n
- **SEO optimized** with meta tags and sitemaps
- **Responsive design** with Tailwind CSS
- **Fast loading** with Astro's static generation
- **GitHub Pages** deployment via GitHub Actions

## 🛠️ Tech Stack
- **Framework**: Astro 4.0
- **Styling**: Tailwind CSS
- **Components**: React
- **TypeScript**: Full type safety
- **Deployment**: GitHub Pages
- **Contact form**: Cloudflare Worker + Resend

## 📁 Project Structure
```
/
├── src/
│   ├── pages/           # Multi-language pages
│   ├── components/      # Astro/React components
│   ├── layouts/         # Page layouts
│   ├── data/            # Resume data (index.ts)
│   ├── i18n/            # Translation files (en/fr/es)
│   └── types/           # TypeScript types
├── public/              # Static assets
├── worker/              # Cloudflare Worker (contact form email API)
└── .github/workflows/   # GitHub Actions CI/CD
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment on GitHub Pages

Pushing to `main` triggers the GitHub Actions workflow which builds and deploys to GitHub Pages automatically.

## ✉️ Contact Form (Cloudflare Worker)

Emails are sent via a Cloudflare Worker in `worker/` using [Resend](https://resend.com). See [DEPLOYMENT.md](./DEPLOYMENT.md#contact-form--cloudflare-worker) for the full setup guide.

Required secrets:
- `PUBLIC_CONTACT_WORKER_URL` — GitHub repo secret (used at build time)
- `RESEND_API_KEY` — Cloudflare Worker secret (set via `wrangler secret put`)

## 📞 Contact

- **LinkedIn**: [Alban Augier](https://linkedin.com/in/alban-augier-a64297108/)
- **Website**: https://elie-e.github.io

---

Built with Astro

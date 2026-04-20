# README.md
# Oussema Trabelsi - Professional Portfolio

A minimalist, multi-language professional portfolio website built with Astro and deployed on Koyeb.

## 🌍 Languages Supported
- 🇫🇷 Français (Default)
- 🇬🇧 English
- 🇪🇸 Español
- 🇩🇪 Deutsch
- 🇵🇹 Português
- 🇯🇵 日本語
- 🇰🇷 한국어
- 🇨🇳 中文
- 🇸🇦 العربية

## 🚀 Features
- **Multi-language support** with i18n
- **SEO optimized** with meta tags and sitemaps
- **Responsive design** with Tailwind CSS
- **Fast loading** with Astro's static generation
- **Docker containerized** for easy deployment
- **Koyeb ready** for serverless deployment

## 🛠️ Tech Stack
- **Framework**: Astro 4.0
- **Styling**: Tailwind CSS
- **Components**: React
- **TypeScript**: Full type safety
- **Deployment**: Docker + Koyeb

## 📁 Project Structure
```
/
├── src/
│   ├── pages/           # Multi-language pages
│   ├── components/      # React components
│   ├── layouts/         # Page layouts
│   ├── content/         # Blog posts (Markdown)
│   ├── data/           # JSON data files
│   ├── i18n/           # Translation files
│   └── styles/         # Global styles
├── public/             # Static assets
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Local development
└── koyeb.yaml         # Koyeb deployment config
```

## 🐳 Docker Commands

### Local Development
```bash
# Build the image
make build

# Run locally
make run

# Development with hot reload
make dev
```

### Production Deployment
```bash
# Build for production
make build-prod

# Push to Docker Hub
make push

# Deploy to Koyeb
make deploy
```

## 🌐 Deployment on Koyeb

1. **Build and push** your Docker image to Docker Hub
2. **Create a new service** on Koyeb
3. **Select Docker** as deployment method
4. **Configure** environment variables
5. **Deploy** and enjoy!

## 📝 Content Management

- **Blog posts**: Markdown files in `src/content/blog/`
- **Portfolio**: JSON data in `src/data/projects.json`
- **CV data**: JSON data in `src/data/index.ts`
- **Translations**: JSON files in `src/i18n/`

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

## 📊 SEO Features

- **Meta tags** for all languages
- **Open Graph** and Twitter Cards
- **Sitemap** generation
- **Hreflang** tags for internationalization
- **Structured data** for rich snippets

## 🎨 Design System

- **Minimalist** and professional
- **Responsive** design
- **Dark/Light** mode support
- **Accessibility** compliant
- **Performance** optimized

## 📞 Contact

- **Email**: contact@oussematrabelsi.com
- **LinkedIn**: [Oussema Trabelsi](https://www.linkedin.com/in/oussema-trabelsi/)
- **Website**: https://www.oussematrabelsi.com

---

Built with ❤️ by Oussema Trabelsi

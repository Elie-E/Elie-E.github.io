# 🚀 Deployment Guide for Koyeb

## Prerequisites
- Docker installed locally
- Docker Hub account
- Koyeb account
- Domain name (oussematrabelsi.com)

## Step 1: Build and Test Locally

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test locally
npm run preview
```

## Step 2: Docker Build

```bash
# Build Docker image
docker build -t oussema-portfolio .

# Test Docker image locally
docker run -p 3000:3000 oussema-portfolio
```

## Step 3: Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag your image
docker tag oussema-portfolio:latest yourusername/oussema-portfolio:latest

# Push to Docker Hub
docker push yourusername/oussema-portfolio:latest
```

## Step 4: Deploy to Koyeb

### Option A: Using Koyeb CLI
```bash
# Install Koyeb CLI
curl -fsSL https://cli.koyeb.com/install.sh | sh

# Login to Koyeb
koyeb auth login

# Create service
koyeb service create \
  --name oussema-portfolio \
  --image yourusername/oussema-portfolio:latest \
  --region fra \
  --type web
```

### Option B: Using Koyeb Dashboard
1. Go to [Koyeb Dashboard](https://app.koyeb.com)
2. Click "Create Service"
3. Select "Docker" as source
4. Enter image: `yourusername/oussema-portfolio:latest`
5. Configure:
   - **Name**: oussema-portfolio
   - **Region**: Europe (fra)
   - **Instance Type**: Nano (Free tier)
   - **Port**: 3000
6. Click "Create Service"

## Step 5: Configure Custom Domain

1. In Koyeb dashboard, go to your service
2. Click "Domains" tab
3. Add custom domain: `oussematrabelsi.com`
4. Update DNS records:
   - **A Record**: `@` → Koyeb IP
   - **CNAME**: `www` → `your-service.koyeb.app`

## Step 6: Environment Variables (Optional)

Add these environment variables in Koyeb:
- `NODE_ENV=production`
- `PORT=3000`
- `HOST=0.0.0.0`

## Step 7: SSL Certificate

Koyeb automatically provides SSL certificates for custom domains.

## Monitoring and Updates

### View Logs
```bash
koyeb service logs oussema-portfolio
```

### Update Service
```bash
# Push new image
docker push yourusername/oussema-portfolio:latest

# Update service
koyeb service update oussema-portfolio --image yourusername/oussema-portfolio:latest
```

## Performance Optimization

### Koyeb Free Tier Limits
- **Memory**: 512MB
- **CPU**: 0.1 vCPU
- **Storage**: 2GB SSD
- **Bandwidth**: 100GB/month

### Optimization Tips
1. **Image Size**: Use multi-stage builds
2. **Static Assets**: Serve from CDN
3. **Caching**: Enable browser caching
4. **Compression**: Enable gzip compression

## Troubleshooting

### Common Issues
1. **Build Failures**: Check Dockerfile syntax
2. **Port Issues**: Ensure port 3000 is exposed
3. **Memory Issues**: Optimize image size
4. **DNS Issues**: Check domain configuration

### Support
- [Koyeb Documentation](https://docs.koyeb.com)
- [Koyeb Community](https://community.koyeb.com)
- [Docker Documentation](https://docs.docker.com)

---

🎉 **Your portfolio is now live at https://www.oussematrabelsi.com!**

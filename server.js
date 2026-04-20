import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4321;

// Handle root route - redirect to /en
app.get('/', (req, res) => {
  res.redirect('/en');
});

// Serve static files from dist (but not for root route)
app.use(express.static(join(__dirname, 'dist')));

// Handle dynamic routes [lang]/* (with trailing slash)
app.get('/:lang/*', (req, res) => {
  const lang = req.params.lang;
  const path = req.params[0] || '';
  
  // Remove trailing slash if present
  const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
  
  // Check if the requested file exists
  const filePath = join(__dirname, 'dist', lang, cleanPath, 'index.html');
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Fallback to 404
    res.status(404).sendFile(join(__dirname, 'dist', '404.html'));
  }
});

// Handle root language routes (without trailing slash)
app.get('/:lang', (req, res) => {
  const lang = req.params.lang;
  const filePath = join(__dirname, 'dist', lang, 'index.html');
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).sendFile(join(__dirname, 'dist', '404.html'));
  }
});

// Handle routes without trailing slash that should have one
app.get('/:lang/:path([^/]+)', (req, res) => {
  const lang = req.params.lang;
  const path = req.params.path;
  
  // Check if this should be a directory route
  const dirPath = join(__dirname, 'dist', lang, path, 'index.html');
  
  if (fs.existsSync(dirPath)) {
    res.sendFile(dirPath);
  } else {
    // Check if it's a file route
    const filePath = join(__dirname, 'dist', lang, path + '.html');
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).sendFile(join(__dirname, 'dist', '404.html'));
    }
  }
});

// Catch all other routes
app.get('*', (req, res) => {
  res.status(404).sendFile(join(__dirname, 'dist', '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
# Scripts

Ce dossier contient tous les scripts utilitaires du projet.

## Structure
```
scripts/
├── cv/
│   ├── generate-cv.js    # Générateur de CV PDF avec Puppeteer
│   └── README.md         # Documentation CV
└── README.md            # Ce fichier
```

## Scripts disponibles

### CV PDF Generator
- **Fichier** : `cv/generate-cv.js`
- **Description** : Génère des CVs PDF professionnels en 9 langues
- **Bibliothèque** : Puppeteer (Node.js)
- **Utilisation** : `cd scripts/cv && node generate-cv.js`
- **Avantages** : Support RTL natif, polices CJK, CSS moderne

## Installation des dépendances
```bash
npm install puppeteer
```

## Notes
- Tous les scripts sont organisés par fonctionnalité
- Chaque dossier contient sa propre documentation
- Les scripts génèrent des fichiers dans les dossiers appropriés du projet
- Puppeteer nécessite Chrome/Chromium (installé automatiquement)
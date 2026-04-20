# CV PDF Generator

## Description
Script pour générer des CVs PDF professionnels en 9 langues avec un design moderne et des traductions complètes.

## Bibliothèque utilisée
- **Puppeteer** : Bibliothèque Node.js pour contrôler Chrome/Chromium
  - Installation : `npm install puppeteer`
  - Documentation : https://pptr.dev/
  - Avantages : 
    - Support natif UTF-8 et RTL (arabe)
    - Polices CJK (chinois, japonais, coréen) via Google Fonts
    - CSS moderne pour le layout
    - HTML → PDF avec rendu parfait
    - Support des images et couleurs

## Langues supportées
- Français (fr)
- Anglais (en) 
- Espagnol (es)
- Allemand (de)
- Portugais (pt)
- Japonais (ja) - Police Noto Sans JP
- Coréen (ko) - Police Noto Sans KR
- Chinois (zh) - Police Noto Sans SC
- Arabe (ar) - Police Noto Sans Arabic + RTL

## Fonctionnalités
- Header 3 colonnes : Nom/Titre (gauche) + Contact traduit (milieu) + Photo (droite)
- Footer centré au bas de la page A4
- Support RTL natif pour l'arabe
- Polices Google Fonts pour toutes les langues
- Layout 2 colonnes : Expérience (gauche) + Compétences/Formation (droite)
- Photo intégrée (80x80px)
- Descriptions complètes (jamais de "...")
- Compétences techniques organisées par type
- Une seule page A4
- CSS moderne avec flexbox

## Utilisation
```bash
cd scripts/cv
node generate-cv.js
```

## Fichiers générés
Les PDFs sont générés dans `public/cv/` :
- `oussema-trabelsi-cv-fr.pdf`
- `oussema-trabelsi-cv-en.pdf`
- `oussema-trabelsi-cv-es.pdf`
- `oussema-trabelsi-cv-de.pdf`
- `oussema-trabelsi-cv-pt.pdf`
- `oussema-trabelsi-cv-ja.pdf`
- `oussema-trabelsi-cv-ko.pdf`
- `oussema-trabelsi-cv-zh.pdf`
- `oussema-trabelsi-cv-ar.pdf`

## Structure du code
- `cvContent` : Objet contenant toutes les traductions pour les 9 langues
- `generateCVHTML()` : Fonction pour générer le HTML avec CSS
- `createPDFWithPuppeteer()` : Fonction principale de génération PDF
- Format A4 : 210mm x 297mm
- Couleurs : Bleu #3366CC, Gris foncé #333333, Gris clair #666666

## Avantages de Puppeteer vs PDFKit
- ✅ Support RTL natif (arabe)
- ✅ Polices CJK via Google Fonts
- ✅ CSS moderne (flexbox, grid)
- ✅ Rendering identique au navigateur
- ✅ Support des images et couleurs
- ✅ Meilleur contrôle du layout
- ✅ Pas de problèmes d'encodage
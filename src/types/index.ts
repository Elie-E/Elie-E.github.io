import type { MarkdownHeading } from 'astro';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '/flags/gb.png' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '/flags/fr.png' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '/flags/es.png' },
];

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  website: string;
  location: string;
  bio: string;
  languages: string[];
  certifications: string[];
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  technologies: string[];
  duration: string;
  type: 'CDI' | 'Freelance' | 'Stage' | 'Internship' | 'Full-time';
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  location?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'ai' | 'backend' | 'frontend' | 'fullstack';
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  content: string;
}

export interface Translation {
  [key: string]: string;
}

export interface PageTranslations {
  [language: string]: Translation;
}

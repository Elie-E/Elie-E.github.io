import { languages, type PersonalInfo, type Experience, type Education, type Project, type BlogPost, type IntroTextData, type ServiceSectionContent } from '../types';

// Testimonial type definition
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  image: string;
  rating: number;
  clientSince: string;
  projectType: string;
  testimonial: string;
  fullTestimonial: string;
  projectUrl?: string;
}

// Dynamic date calculation functions
function calculateDuration(startDate: string, endDate?: string): { years: number; months: number; days: number } {
  const start = new Date(startDate + '-01');
  const end = endDate ? new Date(endDate + '-01') : new Date();
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) { months--; const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0); days += lastMonth.getDate(); }
  if (months < 0) { years--; months += 12; }
  return { years, months, days };
}

function formatDuration(duration: { years: number; months: number; days: number }, lang: string): string {
  const t = {
    fr:  { year: 'an', years: 'ans', month: 'mois', months: 'mois', day: 'jour', days: 'jours', and: 'et' },
    en:  { year: 'year', years: 'years', month: 'month', months: 'months', day: 'day', days: 'days', and: 'and' },
    es:  { year: 'año', years: 'años', month: 'mes', months: 'meses', day: 'día', days: 'días', and: 'y' },
  }[lang as 'fr' | 'en' | 'es'] ?? { year: 'year', years: 'years', month: 'month', months: 'months', day: 'day', days: 'days', and: 'and' };
  const parts: string[] = [];
  if (duration.years > 0) parts.push(`${duration.years} ${duration.years === 1 ? t.year : t.years}`);
  if (duration.months > 0) parts.push(`${duration.months} ${duration.months === 1 ? t.month : t.months}`);
  if (duration.days > 0 && duration.years === 0) parts.push(`${duration.days} ${duration.days === 1 ? t.day : t.days}`);
  if (parts.length === 0) return lang === 'fr' ? '1 mois' : '1 month';
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return parts.join(` ${t.and} `);
  return parts.slice(0, -1).join(', ') + ` ${t.and} ${parts[parts.length - 1]}`;
}

function formatDate(dateStr: string, lang: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const monthNames = {
    fr: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    es: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
  };
  const months = monthNames[lang as 'fr' | 'en' | 'es'] || monthNames.en;
  const monthName = months[parseInt(month) - 1];
  return `${monthName.substring(0, 4)}. ${year}`;
}

export { formatDate };

// Journey Storytelling Content
const journeyTranslations = {
  en: {
    title: 'My Journey',
    subtitle: 'Before becoming a full-stack developer, I worked in project management, team leadership and entrepreneurship. This helps me understand business constraints, communicate clearly and build solutions that are useful beyond the code.',
    story: [
      { year: '2013-2015', title: 'Globe Trotter', description: 'Traveled and worked across Europe and the Americas, developing adaptability, independence and intercultural communication skills.', icon: '✈️' },
      { year: '2015-2017', title: 'Team Manager', description: 'Led teams of street fundraisers at Ong Conseil, ensuring achievement of financial targets.', icon: '👥' },
      { year: '2017-2021', title: 'Founder & Restaurant Manager', description: 'Created El Viaje - Mexico from scratch. Managed daily operations, staff and guest experience.', icon: '🍽️' },
      { year: '2021-2022', title: 'E-Commerce Project Manager', description: 'Led and coordinated e-commerce website projects at Nateev, from conception to delivery.', icon: '🛒' },
      { year: '2022-Present', title: 'Full-Stack Developer', description: 'Building efficient web applications at Advercity with PHP, Laravel, Angular and more.', icon: '💻' },
    ],
    ctaTitle: 'Ready to collaborate?',
    ctaDescription: 'Autonomous, professional and always eager to take on new challenges.',
    ctaButton: 'Get in Touch'
  },
  fr: {
    title: 'Mon Parcours',
    subtitle: '',
    story: [
      { year: '2013-2015', title: 'Globe Trotteur', description: 'Voyage et travail en Europe et en Amérique, développement de l\'adaptabilité, de l\'autonomie et de compétences interculturelles.', icon: '✈️' },
      { year: '2015-2017', title: 'Team Manager', description: 'Encadrement d\'équipes de fundraiseurs chez Ong Conseil, avec atteinte des objectifs financiers.', icon: '👥' },
      { year: '2017-2021', title: 'Fondateur & Gérant', description: 'Création du restaurant El Viaje - Mexico. Gestion des opérations quotidiennes, équipes et satisfaction clients.', icon: '🍽️' },
      { year: '2021-2022', title: 'Chef de Projet E-Commerce', description: 'Coordination des projets e-commerce chez Nateev, de la conception à la livraison finale.', icon: '🛒' },
      { year: '2022-Présent', title: 'Développeur Full-Stack', description: 'Développement d\'applications web efficaces chez Advercity avec PHP, Laravel, Angular et plus.', icon: '💻' },
    ],
    ctaTitle: 'Prêt à collaborer ?',
    ctaDescription: 'Autonome, professionnel et toujours prêt à relever de nouveaux défis.',
    ctaButton: 'Contactez-moi'
  },
  es: {
    title: 'Mi Trayectoria',
    subtitle: '',
    story: [
      { year: '2013-2015', title: 'Trotamundos', description: 'Viajé y trabajé por Europa y las Américas, desarrollando adaptabilidad, autonomía y habilidades de comunicación intercultural.', icon: '✈️' },
      { year: '2015-2017', title: 'Team Manager', description: 'Lideré equipos de captadores de fondos en Ong Conseil, asegurando el logro de los objetivos financieros.', icon: '👥' },
      { year: '2017-2021', title: 'Fundador y Gerente', description: 'Creé el restaurante El Viaje - Mexico desde cero. Gestioné las operaciones diarias, personal y experiencia de los clientes.', icon: '🍽️' },
      { year: '2021-2022', title: 'Jefe de Proyecto E-Commerce', description: 'Coordiné proyectos de e-commerce en Nateev, desde la concepción hasta la entrega final.', icon: '🛒' },
      { year: '2022-Presente', title: 'Desarrollador Full-Stack', description: 'Construcción de aplicaciones web eficientes en Advercity con PHP, Laravel, Angular y más.', icon: '💻' },
    ],
    ctaTitle: '¿Listo para colaborar?',
    ctaDescription: 'Autónomo, profesional y siempre listo para nuevos desafíos.',
    ctaButton: 'Contáctame'
  }
};

// Skills Data - grouped by domain, no misleading percentages
const skillsData = {
  backend: ['PHP', 'Laravel', 'Symfony', 'Node.js', 'REST APIs'],
  frontend: ['JavaScript', 'TypeScript', 'Angular', 'Vue', 'Nuxt', 'Astro', 'Tailwind'],
  databases: ['MySQL', 'PostgreSQL', 'Supabase', 'SQL', 'Query Optimization'],
  devops: ['Docker', 'Linux', 'AWS', 'CI/CD', 'VPS Deployment', 'Cloudflare', 'Caddy', 'Apache'],
  mobile: ['Ionic', 'Capacitor', 'Angular', 'Android', 'Google Play Console'],
  automation: ['Python', 'JavaScript', 'Scripting', 'Data Processing'],
  aiAssisted: ['AI Agents', 'Claude Code', 'Agentic Workflows', 'Generated Code Review'],
  web: ['Technical SEO', 'Analytics', 'Performance Optimization'],
  practices: ['Git', 'Debugging', 'Production Maintenance', 'Project Management', 'Code Review'],
  exploring: ['Java', 'Software Architecture', 'Advanced DevOps', 'Cloud'],
  certifications: ['PSM 1 - Professional Scrum Master', 'EF SET C2 Proficient']
};

// Contact Information
const contactInfo = {
  email: '',
  linkedin: 'https://linkedin.com/in/alban-augier-a64297108/',
  website: 'https://elie-e.github.io/',
  location: 'France / Mexique',
  phone: ''
};

// Personal information translations
const personalInfoTranslations = {
  en: {
    title: 'Full-Stack Developer PHP / Laravel / Angular',
    subtitle : 'PHP/Laravel · JavaScript · SQL · Docker · Production Maintenance',
    tagline: 'Autonomous developer specialized in production web applications, modernization of existing systems and AI-agent-assisted development.',
    bio: `Full-stack developer with close to 5 years of experience in developing, modernizing and maintaining production web applications.

    Autonomous, I master the whole development cycle and have hands-on experience with legacy environments, debugging, performance optimization and deployments.

    I use coding agents and AI-assisted development workflows to speed up code analysis, implementation and problem-solving, with particular attention to code review, testing and maintainability.

    My background in project management and entrepreneurship lets me combine technical efficiency, autonomy and an understanding of business needs.`,
    languages: ['French (Native)', 'English (Professional)', 'Spanish (Professional)'],
    certifications: [
      { label: 'PSM 1 - Professional Scrum Master' },
      { label: 'EF SET English Certificate C2 Proficient', url: 'https://cert.efset.org/en/7dN2sm' },
    ]
  },
  fr: {
    title: 'Développeur Full-Stack PHP / Laravel / Angular',
    subtitle : 'PHP/Laravel · JavaScript · SQL · Docker · Production Maintenance',
    tagline: 'Développeur autonome, spécialisé dans les applications web en production, la modernisation de systèmes existants et le développement assisté par agents IA.',
    bio: `Développeur full-stack avec près de 5 ans d'expérience dans le développement, la modernisation et la maintenance d'applications web en production.

    Autonome, je maîtrise l'ensemble du cycle de développement et possède une expérience concrète des environnements legacy, du débogage, de l'optimisation des performances et des déploiements.

    J'utilise les agents de codage et les workflows de développement assistés par IA pour accélérer l'analyse de code, l'implémentation et la résolution de problèmes, avec une attention particulière à la revue du code, aux tests et à la maintenabilité.

    Mon parcours en gestion de projet et en entrepreneuriat me permet d'allier efficacité technique, autonomie et compréhension des enjeux métier.`,
    languages: ['Français (Natif)', 'Anglais (Professionnel)', 'Espagnol (Professionnel)'],
    certifications: [
      { label: 'PSM 1 - Professional Scrum Master' },
      { label: 'EF SET English Certificate C2 Proficient', url: 'https://cert.efset.org/en/7dN2sm' },
    ]
  },
  es: {
    title: 'Desarrollador Full-Stack PHP / Laravel / Angular',
    subtitle : 'PHP/Laravel · JavaScript · SQL · Docker · Production Maintenance',
    tagline: 'Desarrollador autónomo, especializado en aplicaciones web en producción, modernización de sistemas existentes y desarrollo asistido por agentes de IA.',
    bio: `Desarrollador full-stack con casi 5 años de experiencia en el desarrollo, la modernización y el mantenimiento de aplicaciones web en producción.

    Autónomo, domino todo el ciclo de desarrollo y tengo experiencia concreta en entornos legacy, depuración, optimización del rendimiento y despliegues.

    Utilizo agentes de código y flujos de desarrollo asistidos por IA para acelerar el análisis de código, la implementación y la resolución de problemas, con especial atención a la revisión del código, las pruebas y la mantenibilidad.

    Mi trayectoria en gestión de proyectos y emprendimiento me permite combinar eficiencia técnica, autonomía y comprensión de los retos de negocio.`,
    languages: ['Francés (Nativo)', 'Inglés (Profesional)', 'Español (Profesional)'],
    certifications: [
      { label: 'PSM 1 - Professional Scrum Master' },
      { label: 'EF SET English Certificate C2 Proficient', url: 'https://cert.efset.org/en/7dN2sm' },
    ]
  }
};

const introTextTranslations = {
  en: {
    title: 'More than just code',
    firstParagraph : 'Before becoming a full-stack developer, I founded and managed a restaurant, then coordinated e-commerce projects.',
    secondParagraph: 'This background gives me a practical understanding of business constraints, client communication, team collaboration and delivery pressure. Today, it helps me build solutions that are not only technically solid, but also useful, maintainable and aligned with real-world needs.'
  },
  fr: {
    title: 'Plus que du code',
    firstParagraph: 'Avant de devenir développeur full-stack, j’ai fondé et géré un restaurant, puis coordonné des projets e-commerce.',
    secondParagraph: 'Ce parcours me donne une compréhension concrète des contraintes business, de la communication client, du travail en équipe et de la pression liée à la livraison. Aujourd’hui, cela m’aide à créer des solutions non seulement solides techniquement, mais aussi utiles, maintenables et alignées avec les besoins réels.'
  },
  es: {
    title: 'Más que solo código',
    firstParagraph: 'Antes de convertirme en desarrollador full-stack, fundé y gestioné un restaurante, y después coordiné proyectos de e-commerce.',
    secondParagraph: 'Esta experiencia me da una comprensión práctica de las limitaciones del negocio, la comunicación con clientes, la colaboración en equipo y la presión de entrega. Hoy, me ayuda a crear soluciones que no solo son técnicamente sólidas, sino también útiles, mantenibles y alineadas con necesidades reales.'
  }
}

const ctaContentTranslations = {
  en: {
    ctaTitle: 'Ready to collaborate?',
    ctaDescription: 'Autonomous, professional and always eager to take on new challenges.',
    ctaButton: 'Get in Touch'
  },
  fr: {
    ctaTitle: 'Prêt à collaborer ?',
    ctaDescription: 'Autonome, professionnel et toujours motivé par de nouveaux défis.',
    ctaButton: 'Me contacter'
  },
  es: {
    ctaTitle: '¿Listo para colaborar?',
    ctaDescription: 'Autónomo, profesional y siempre dispuesto a asumir nuevos retos.',
    ctaButton: 'Contactar'
  }
}

// Home hero content - short, home-specific intro (distinct from the longer resume bio)
const heroContentTranslations = {
  en: {
    roleTitle: 'Full-Stack Developer',
    tagline: 'PHP & JavaScript',
    headline: 'Autonomous, versatile and production-oriented.',
    subheadline: 'Development, modernization and maintenance of web applications, with a pragmatic approach and the use of AI tools to be more efficient.',
    focus: 'Developing, modernizing and maintaining reliable web applications, from requirements analysis to production.',
    intro: `Full-stack developer with close to 5 years of experience on production web applications, mainly in the PHP and JavaScript ecosystems.

    Autonomous and versatile, I work across the full development cycle: backend, frontend, APIs, databases, infrastructure and deployment. Comfortable with existing applications as well as new projects, I can quickly get up to speed on a codebase, understand the business stakes and deliver reliable, maintainable solutions.

    I also integrate AI tools and coding agents into my workflow to speed up development, analysis and problem-solving, while staying in control of the code produced, its quality and the technical decisions.`,
    ctaResume: 'View my resume',
    ctaProjects: 'Discover my projects',
  },
  fr: {
    roleTitle: 'Développeur Full-Stack',
    tagline: 'PHP & JavaScript',
    headline: 'Autonome, polyvalent et orienté production.',
    subheadline: "Développement, modernisation et maintenance d'applications web, avec une approche pragmatique et l'utilisation d'outils IA pour gagner en efficacité.",
    focus: "Développer, moderniser et maintenir des applications web fiables, de l'analyse du besoin jusqu'à la production.",
    intro: `Développeur full-stack avec près de 5 ans d'expérience sur des applications web en production, principalement dans les écosystèmes PHP et JavaScript.

    Autonome et polyvalent, j'interviens sur l'ensemble du cycle de développement : backend, frontend, APIs, bases de données, infrastructure et déploiement. À l'aise avec les applications existantes comme les nouveaux projets, je sais rapidement prendre en main une codebase, comprendre les enjeux métier et apporter des solutions fiables et maintenables.

    J'intègre également les outils d'IA et les agents de codage à mon workflow pour accélérer le développement, l'analyse et la résolution de problèmes, tout en gardant la maîtrise du code produit, de sa qualité et des choix techniques.`,
    ctaResume: 'Voir mon CV',
    ctaProjects: 'Découvrir mes projets',
  },
  es: {
    roleTitle: 'Desarrollador Full-Stack',
    tagline: 'PHP & JavaScript',
    headline: 'Autónomo, polivalente y orientado a producción.',
    subheadline: 'Desarrollo, modernización y mantenimiento de aplicaciones web, con un enfoque pragmático y el uso de herramientas de IA para ganar eficiencia.',
    focus: 'Desarrollar, modernizar y mantener aplicaciones web fiables, desde el análisis de la necesidad hasta la producción.',
    intro: `Desarrollador full-stack con casi 5 años de experiencia en aplicaciones web en producción, principalmente en los ecosistemas PHP y JavaScript.

    Autónomo y polivalente, trabajo en todo el ciclo de desarrollo: backend, frontend, APIs, bases de datos, infraestructura y despliegue. Cómodo tanto con aplicaciones existentes como con proyectos nuevos, sé ponerme al día rápidamente en una base de código, entender los retos de negocio y aportar soluciones fiables y mantenibles.

    También integro herramientas de IA y agentes de código en mi flujo de trabajo para acelerar el desarrollo, el análisis y la resolución de problemas, manteniendo el control del código producido, de su calidad y de las decisiones técnicas.`,
    ctaResume: 'Ver mi currículum',
    ctaProjects: 'Descubrir mis proyectos',
  },
};

// Hero frameworks strip - each badge uses its own brand color, same across languages (proper nouns)
const heroFrameworks: { name: string; key: 'laravel' | 'symfony' | 'node' | 'angular' | 'vue' }[] = [
  { name: 'Laravel', key: 'laravel' },
  { name: 'Symfony', key: 'symfony' },
  { name: 'Node.js', key: 'node' },
  { name: 'Angular', key: 'angular' },
  { name: 'Vue', key: 'vue' },
];

// Home "strengths" strip (Full-stack / Production / AI-assisted)
const strengthsTranslations = {
  en: [
    { title: 'Full-Stack & Autonomy', description: 'Backend, frontend, APIs, databases and end-to-end project ownership' },
    { title: 'Production & Modernization', description: 'Maintenance, migrations, performance optimization, infrastructure and deployment' },
    { title: 'AI-Assisted Development', description: 'Coding agents, automation, AI workflows and code review' },
  ],
  fr: [
    { title: 'Full-Stack & Autonomie', description: 'Backend, frontend, APIs, bases de données et prise en charge de projets de bout en bout' },
    { title: 'Production & Modernisation', description: 'Maintenance, migrations, optimisation des performances, infrastructure et déploiement' },
    { title: 'Développement assisté par IA', description: 'Agents de codage, automatisation, workflows IA et revue de code' },
  ],
  es: [
    { title: 'Full-Stack y Autonomía', description: 'Backend, frontend, APIs, bases de datos y gestión de proyectos de principio a fin' },
    { title: 'Producción y Modernización', description: 'Mantenimiento, migraciones, optimización del rendimiento, infraestructura y despliegue' },
    { title: 'Desarrollo asistido por IA', description: 'Agentes de código, automatización, flujos de trabajo con IA y revisión de código' },
  ],
};

// Home "Engineering & development practices" section
const practicesContentTranslations = {
  en: {
    title: 'Engineering & Development Practices',
    subtitle: 'What I know how to do, beyond the list of tools.',
    items: [
      { label: 'Application Architecture', icon: '🏗️' },
      { label: 'Existing Codebases / Legacy', icon: '🗄️' },
      { label: 'Production Debugging', icon: '🐞' },
      { label: 'Performance Optimization', icon: '⚡' },
      { label: 'Deployment & Maintenance', icon: '🚀' },
      { label: 'Automation', icon: '🤖' },
      { label: 'AI-Assisted Development', icon: '🧠' },
      { label: 'Code Review', icon: '👀' },
    ],
  },
  fr: {
    title: 'Ingénierie & pratiques de développement',
    subtitle: 'Ce que je sais faire, au-delà de la liste des outils.',
    items: [
      { label: 'Architecture applicative', icon: '🏗️' },
      { label: 'Codebase existante / Legacy', icon: '🗄️' },
      { label: 'Débogage en production', icon: '🐞' },
      { label: 'Optimisation des performances', icon: '⚡' },
      { label: 'Déploiement et maintenance', icon: '🚀' },
      { label: 'Automatisation', icon: '🤖' },
      { label: 'Développement assisté par IA', icon: '🧠' },
      { label: 'Revue de code', icon: '👀' },
    ],
  },
  es: {
    title: 'Ingeniería y prácticas de desarrollo',
    subtitle: 'Lo que sé hacer, más allá de la lista de herramientas.',
    items: [
      { label: 'Arquitectura de aplicaciones', icon: '🏗️' },
      { label: 'Código existente / Legacy', icon: '🗄️' },
      { label: 'Depuración en producción', icon: '🐞' },
      { label: 'Optimización del rendimiento', icon: '⚡' },
      { label: 'Despliegue y mantenimiento', icon: '🚀' },
      { label: 'Automatización', icon: '🤖' },
      { label: 'Desarrollo asistido por IA', icon: '🧠' },
      { label: 'Revisión de código', icon: '👀' },
    ],
  },
};

const serviceSectionContentTranslations = {
  en: {
    title: '/ services',
    subtitle: 'Need a dev for your project?',
    text: 'New website, urgent bug fix, or long-term maintenance - clear scope, no bloated agency process.',
    label1: {
      title: 'New website',
      description: 'Custom build, no generic theme',
      icon: '⚡'
    },
    label2: {
      title: 'Debug & rescue',
      description: 'Investigate & fix broken things',
      icon: '🔧'
    },
    label3: {
      title: 'Maintenance',
      description: 'Updates, backups, monitoring',
      icon: '🛡️'
    },
    label4: {
      title: 'Evolution',
      description: 'New features & UX improvements',
      icon: '🚀'
    },
    ctaButton: 'View all services'
  },
  fr: {
    title: '/ services',
    subtitle: 'Besoin d’un développeur pour votre projet ?',
    text: 'Nouveau site web, correction de bug urgente ou maintenance à long terme - un périmètre clair, sans processus d’agence inutilement lourd.',
    label1: {
      title: 'Nouveau site web',
      description: 'Développement sur mesure, sans thème générique',
      icon: '⚡'
    },
    label2: {
      title: 'Debug & urgence',
      description: 'Analyse et correction de problèmes',
      icon: '🔧'
    },
    label3: {
      title: 'Maintenance',
      description: 'Mises à jour, sauvegardes, monitoring',
      icon: '🛡️'
    },
    label4: {
      title: 'Évolution',
      description: 'Nouvelles fonctionnalités et améliorations UX',
      icon: '🚀'
    },
    ctaButton: 'Voir les Services'
  },
  es: {
    title: '/ servicios',
    subtitle: '¿Necesitas un desarrollador para tu proyecto?',
    text: 'Nuevo sitio web, corrección urgente de errores o mantenimiento a largo plazo: alcance claro, sin procesos de agencia innecesariamente pesados.',
    label1: {
      title: 'Nuevo sitio web',
      description: 'Desarrollo a medida, sin plantillas genéricas',
      icon: '⚡'
    },
    label2: {
      title: 'Debug & rescate',
      description: 'Investigar y corregir problemas',
      icon: '🔧'
    },
    label3: {
      title: 'Mantenimiento',
      description: 'Actualizaciones, copias de seguridad, monitoreo',
      icon: '🛡️'
    },
    label4: {
      title: 'Evolución',
      description: 'Nuevas funcionalidades y mejoras UX',
      icon: '🚀'
    },
    ctaButton: 'Ver todos los servicios'
  }
}

export function getPersonalInfo(lang: string = 'en'): PersonalInfo {
  const translations = personalInfoTranslations[lang as keyof typeof personalInfoTranslations] || personalInfoTranslations.en;
  return {
    name: 'Alban',
    title: translations.title,
    subtitle: translations.subtitle,
    email: contactInfo.email,
    linkedin: contactInfo.linkedin,
    website: contactInfo.website,
    location: contactInfo.location,
    tagline: translations.tagline,
    bio: translations.bio,
    languages: translations.languages,
    certifications: translations.certifications
  };
}

export function getIntroTextData(lang: string = 'en'): IntroTextData {
  const translations = introTextTranslations[lang as keyof typeof introTextTranslations] || introTextTranslations.en;
  return {
    title: translations.title,
    firstParagraph: translations.firstParagraph,
    secondParagraph: translations.secondParagraph,
  }
}

export function getCtaContent(lang: string = 'en') {
  return ctaContentTranslations[lang as keyof typeof ctaContentTranslations] || ctaContentTranslations.en;
}

export function getServiceSectionContent(lang: string = 'en'): ServiceSectionContent {
  return serviceSectionContentTranslations[lang as keyof typeof serviceSectionContentTranslations] || serviceSectionContentTranslations.en;
}

export function getHeroContent(lang: string = 'en') {
  return heroContentTranslations[lang as keyof typeof heroContentTranslations] || heroContentTranslations.en;
}

export function getHeroFrameworks() {
  return heroFrameworks;
}

export function getStrengths(lang: string = 'en') {
  return strengthsTranslations[lang as keyof typeof strengthsTranslations] || strengthsTranslations.en;
}

export function getPracticesContent(lang: string = 'en') {
  return practicesContentTranslations[lang as keyof typeof practicesContentTranslations] || practicesContentTranslations.en;
}

export function getJourneyContent(lang: string = 'en') {
  return journeyTranslations[lang as keyof typeof journeyTranslations] || journeyTranslations.en;
}

export function getSkillsData() {
  return skillsData;
}

export function getContactInfo() {
  return contactInfo;
}

// Experiences with translations
export function getExperiences(lang: string): Experience[] {
  const data = {
    en: [
      {
        company: 'Advercity',
        position: 'Full-Stack Developer',
        startDate: '2022-01',
        location: 'France',
        description: 'Autonomous full-stack developer within a small technical team, handling the maintenance, modernization and evolution of several production applications, from analysis of technical needs through to deployment of the solutions.',
        technologies: ['PHP', 'Laravel', 'Symfony', 'Doctrine', 'Twig', 'JavaScript', 'Angular', 'Python', 'SQL', 'Docker', 'AWS', 'CloudFront', 'Memcached', 'Varnish', 'Cloudflare'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Maintenance, modernization and evolution of legacy PHP and Laravel applications, handling both technical and functional issues.',
          'Corrective and evolutionary maintenance of an internal application built with Angular.',
          'Maintenance and evolution of an internal administration tool developed with Symfony.',
          'Development of back-end and front-end features on native PHP and Laravel applications: business logic, forms, data management, admin interfaces and JavaScript interactions.',
          'Modernization of existing PHP applications: version migrations, code adaptation and improved maintainability.',
          'Migration of several development environments to Docker, facilitating setup, maintenance and onboarding of new developers.',
          'Global optimisation of websites: performance, SQL queries, application processing and page rendering.',
          'Implementation of application and server-side caching systems using Memcached, Varnish and Cloudflare.',
          'Participation in transforming server-side rendered PHP sites into static sites distributed via AWS CloudFront, to reduce server load and improve delivery.',
          'Design of Python and JavaScript automations to remove repetitive manual tasks and improve operational efficiency.',
          'Monitoring and maintenance of applications hosted on AWS, including diagnosis and resolution of production incidents.',
        ]
      },
      {
        company: 'Nateev',
        position: 'E-Commerce Project Manager & Front-End Developer',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'France',
        description: 'Management and evolution of e-commerce projects built on a proprietary PHP framework based on CodeIgniter.',
        technologies: ['PHP', 'CodeIgniter 3', 'JavaScript', 'jQuery', 'HTML', 'Sass', 'SQL'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Management of several e-commerce projects from requirements gathering to delivery, ensuring scope and deadline compliance.',
          'Coordination between clients, developers, designers and SEO teams, to streamline communication and reduce misunderstandings during development.',
          'Development of front-end features in JavaScript, jQuery, HTML and Sass, improving interfaces and user journeys.',
          'Correction of functional, visual and JavaScript bugs on live e-commerce sites.',
          'Participation in site evolutions based on CodeIgniter 3 and carrying out acceptance testing before release, to secure production deployments.'
        ]
      },
      {
        company: 'El Viaje - Mexico',
        position: 'Founder & Restaurant Manager',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'Mexico',
        description: 'Built a restaurant business - from concept and branding to operations, recruitment, team management and customer experience. Developed strong skills in leadership, communication, decision-making and problem-solving.',
        technologies: [],
        duration: formatDuration(calculateDuration('2017-01', '2021-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Business operations',
          'Team management',
          'Customer experience',
          'Problem-solving'
        ]
      },
      {
        company: 'Ong Conseil',
        position: 'Team Manager',
        startDate: '2015-01',
        endDate: '2017-01',
        location: 'France',
        description: 'Led and trained teams of street fundraisers, with responsibility for motivation, field organization and achievement of financial targets.',
        technologies: [],
        duration: formatDuration(calculateDuration('2015-01', '2017-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Team leadership',
          'Training',
          'Communication',
          'Performance tracking'
        ]
      },
      {
        company: 'Europe & Americas',
        position: 'Globe Trotter',
        startDate: '2013-01',
        endDate: '2015-01',
        location: 'World',
        description: 'Traveled and worked across Europe and the Americas, developing adaptability, independence and intercultural communication skills.',
        technologies: [],
        duration: formatDuration(calculateDuration('2013-01', '2015-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Adaptability',
          'Autonomy',
          'Intercultural communication'
        ]
      }
    ],
    fr: [
      {
        company: 'Advercity',
        position: 'Développeur Full-Stack',
        startDate: '2022-01',
        location: 'France',
        description: 'Développeur full-stack autonome au sein d\'une petite équipe technique, prenant en charge la maintenance, la modernisation et l\'évolution de plusieurs applications en production, de l\'analyse des besoins techniques jusqu\'au déploiement des solutions.',
        technologies: ['PHP', 'Laravel', 'Symfony', 'Doctrine', 'Twig', 'JavaScript', 'Angular', 'Python', 'SQL', 'Docker', 'AWS', 'CloudFront', 'Memcached', 'Varnish', 'Cloudflare'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          
          'Maintenance, modernisation et évolution d\'applications PHP legacy et Laravel, avec prise en charge de problématiques techniques et fonctionnelles.',
          'Maintenace corrective et évolutive d\'application interne avec Angular',
          'Maintenance et évolution d’un outil d’administration interne développé avec Symfony.',
          'Développement de fonctionnalités back-end et front-end sur des applications PHP natif et Laravel : logique métier, formulaires, gestion de données, interfaces d’administration et interactions JavaScript.',
          'Modernisation d\'applications PHP existantes : migrations de versions, adaptation du code et amélioration de la maintenabilité.',
          'Migration de plusieurs environnements de développement vers Docker, facilitant l’installation, la maintenance et l’intégration de nouveaux développeurs.',
          'Optimisation globale de sites web : performances, requêtes SQL, traitements applicatifs et affichage des pages.',
          'Mise en place de systèmes de cache applicatifs et serveur avec Memcached, Varnish et Cloudflare.',
          'Participation à la transformation de sites PHP (rendu serveur) en sites statiques distribués avec AWS CloudFront, afin de réduire la charge serveur et d\'améliorer leur diffusion.',
          'Conception d\'automatisations Python et JavaScript pour supprimer des tâches manuelles répétitives et améliorer l\'efficacité opérationnelle.',
          'Monitoring et maintenance d\'applications hébergées sur AWS, avec diagnostic et résolution d\'incidents en production.',
        ]
      },
      {
        company: 'Nateev',
        position: 'Chef de Projet E-Commerce & Développeur Front-End',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'France',
        description: 'Gestion et évolution de projets e-commerce développés avec un framework PHP propriétaire basé sur CodeIgniter.',
        technologies: ['PHP', 'CodeIgniter 3', 'JavaScript', 'jQuery', 'HTML', 'Sass', 'SQL'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Gestion de plusieurs projets e-commerce, du recueil du besoin à la livraison, en assurant le respect du périmètre et des délais.',
          'Coordination entre clients, développeurs, designers et équipes SEO, afin de fluidifier les échanges et de limiter les incompréhensions lors des développements.',
          'Développement de fonctionnalités front-end en JavaScript, jQuery, HTML et Sass, améliorant les interfaces et les parcours utilisateurs.',
          'Correction d\'anomalies fonctionnelles, graphiques et JavaScript sur des sites e-commerce en production.',
          'Participation aux évolutions de sites reposant sur CodeIgniter 3 et réalisation des recettes avant livraison, afin de sécuriser les mises en production.'
        ]
      },
      {
        company: 'El Viaje - Mexico',
        position: 'Fondateur & Gérant de Restaurant',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'Mexico',
        description: 'Création d\'un restaurant - du concept et de l\'identité visuelle aux opérations, au recrutement, au management d\'équipe et à l\'expérience client. Développement de compétences solides en leadership, communication, prise de décision et résolution de problèmes..',
        technologies: [],
        duration: formatDuration(calculateDuration('2017-01', '2021-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Gestion des opérations',
          'Management d\'équipe',
          'Expérience client',
          'Résolution de problèmes'
        ]
      },
      {
        company: 'Ong Conseil',
        position: 'Team Manager',
        startDate: '2015-01',
        endDate: '2017-01',
        location: 'France',
        description: 'Gestion de mission, formation et management d\'équipes de fundraiseurs, avec responsabilité sur la motivation, l\'organisation terrain et l\'atteinte des objectifs financiers.',
        technologies: [],
        duration: formatDuration(calculateDuration('2015-01', '2017-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Leadership d\'équipe',
          'Formation',
          'Communication',
          'Suivi des performances'
        ]
      },
      {
        company: 'Europe & Amérique',
        position: 'Globe Trotteur',
        startDate: '2013-01',
        endDate: '2015-01',
        location: 'Monde',
        description: 'Voyage et travail en Europe et en Amérique, développement de l\'adaptabilité, de l\'autonomie et de compétences interculturelles.',
        technologies: [],
        duration: formatDuration(calculateDuration('2013-01', '2015-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Adaptabilité',
          'Autonomie',
          'Communication interculturelle'
        ]
      }
    ],
    es: [
      {
        company: 'Advercity',
        position: 'Desarrollador Full-Stack',
        startDate: '2022-01',
        location: 'Francia',
        description: 'Desarrollador full-stack autónomo en un pequeño equipo técnico, a cargo del mantenimiento, la modernización y la evolución de varias aplicaciones en producción, desde el análisis de las necesidades técnicas hasta el despliegue de las soluciones.',
        technologies: ['PHP', 'Laravel', 'Symfony', 'Doctrine', 'Twig', 'JavaScript', 'Angular', 'Python', 'SQL', 'Docker', 'AWS', 'CloudFront', 'Memcached', 'Varnish', 'Cloudflare'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Mantenimiento, modernización y evolución de aplicaciones PHP legacy y Laravel, atendiendo problemáticas técnicas y funcionales.',
          'Mantenimiento correctivo y evolutivo de una aplicación interna desarrollada con Angular.',
          'Mantenimiento y evolución de una herramienta de administración interna desarrollada con Symfony.',
          'Desarrollo de funcionalidades back-end y front-end en aplicaciones PHP nativo y Laravel: lógica de negocio, formularios, gestión de datos, interfaces de administración e interacciones JavaScript.',
          'Modernización de aplicaciones PHP existentes: migraciones de versión, adaptación del código y mejora de la mantenibilidad.',
          'Migración de varios entornos de desarrollo a Docker, facilitando la instalación, el mantenimiento y la incorporación de nuevos desarrolladores.',
          'Optimización global de sitios web: rendimiento, consultas SQL, procesamiento de la aplicación y renderizado de páginas.',
          'Implementación de sistemas de caché a nivel de aplicación y servidor con Memcached, Varnish y Cloudflare.',
          'Participación en la transformación de sitios PHP (renderizado en servidor) en sitios estáticos distribuidos con AWS CloudFront, para reducir la carga del servidor y mejorar su distribución.',
          'Diseño de automatizaciones Python y JavaScript para eliminar tareas manuales repetitivas y mejorar la eficiencia operativa.',
          'Monitorización y mantenimiento de aplicaciones alojadas en AWS, con diagnóstico y resolución de incidentes en producción.',
        ]
      },
      {
        company: 'Nateev',
        position: 'Jefe de Proyecto E-Commerce & Desarrollador Front-End',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'Francia',
        description: 'Gestión y evolución de proyectos e-commerce desarrollados con un framework PHP propietario basado en CodeIgniter.',
        technologies: ['PHP', 'CodeIgniter 3', 'JavaScript', 'jQuery', 'HTML', 'Sass', 'SQL'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Gestión de varios proyectos e-commerce, desde la recogida de necesidades hasta la entrega, asegurando el cumplimiento del alcance y los plazos.',
          'Coordinación entre clientes, desarrolladores, diseñadores y equipos SEO, para agilizar los intercambios y reducir malentendidos durante el desarrollo.',
          'Desarrollo de funcionalidades front-end en JavaScript, jQuery, HTML y Sass, mejorando las interfaces y los recorridos de usuario.',
          'Corrección de anomalías funcionales, visuales y JavaScript en sitios e-commerce en producción.',
          'Participación en la evolución de sitios basados en CodeIgniter 3 y realización de pruebas de aceptación antes de la entrega, para asegurar las puestas en producción.'
        ]
      },
      {
        company: 'El Viaje - Mexico',
        position: 'Fundador y Gerente de Restaurante',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'Mexico',
        description: 'Construí un negocio de restaurante desde cero - del concepto y branding a las operaciones, la contratación, la gestión de equipo y la experiencia del cliente. Desarrollé habilidades sólidas de liderazgo, comunicación, toma de decisiones y resolución de problemas que ahora apoyan mi trabajo como desarrollador.',
        technologies: [],
        duration: formatDuration(calculateDuration('2017-01', '2021-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Gestión de operaciones',
          'Gestión de equipos',
          'Experiencia del cliente',
          'Resolución de problemas'
        ]
      },
      {
        company: 'Ong Conseil',
        position: 'Team Manager',
        startDate: '2015-01',
        endDate: '2017-01',
        location: 'Francia',
        description: 'Lideré y formé equipos de captadores de fondos, con responsabilidad sobre la motivación, organización en campo y logro de objetivos financieros.',
        technologies: [],
        duration: formatDuration(calculateDuration('2015-01', '2017-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Liderazgo de equipos',
          'Formación',
          'Comunicación',
          'Seguimiento del rendimiento'
        ]
      },
      {
        company: 'Europa & Américas',
        position: 'Trotamundos',
        startDate: '2013-01',
        endDate: '2015-01',
        location: 'Mundo',
        description: 'Viajé y trabajé por Europa y las Américas, desarrollando adaptabilidad, autonomía y habilidades de comunicación intercultural.',
        technologies: [],
        duration: formatDuration(calculateDuration('2013-01', '2015-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Adaptabilidad',
          'Autonomía',
          'Comunicación intercultural'
        ]
      }
    ]
  };
  return (data[lang as keyof typeof data] || data.en) as Experience[];
}


// Experiences with translations
export function getExperiencesDev(lang: string): Experience[] {
  const data = {
    en: [
      {
        company: 'Advercity',
        position: 'Full-Stack Developer',
        startDate: '2022-01',
        location: 'France',
        description: 'Developing and maintaining production web applications and company websites, with responsibilities across backend logic, frontend interfaces, database updates, performance improvements, production debugging and deployment workflows.',
        technologies: ['PHP', 'Laravel', 'JavaScript', 'jQuery', 'Python', 'HTML/SASS', 'SQL', 'Docker', 'AWS'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Built and maintained multiple production web applications',
          'Implemented new backend and frontend features on existing codebases',
          'Managed database operations and performance improvements',
          'Containerized applications with Docker and deployed on AWS'
        ]
      },
      {
        company: 'Nateev',
        position: 'E-Commerce Project Manager & Front-End Developer',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'France',
        description: 'Coordinated e-commerce website projects from requirements to delivery while contributing front-end features, JavaScript interactions, SEO tracking and analytics-related improvements.',
        technologies: ['JavaScript', 'CodeIgniter', 'HTML/SASS', 'SEO', 'Analytics'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Managed multiple e-commerce projects end-to-end',
          'Coordinated cross-functional teams (design, dev, SEO, marketing)',
          'Delivered the Season Paper project on time and within scope',
          'Improved client communication and delivery quality'
        ]
      },
    ],
    fr: [
      {
        company: 'Advercity',
        position: 'Développeur Full-Stack',
        startDate: '2022-01',
        location: 'France',
        description: 'Développement et maintenance d\'applications web en production et de sites d\'entreprise, avec des responsabilités sur la logique back-end, les interfaces front-end, les mises à jour de base de données, l\'amélioration des performances, le débogage en production et les workflows de déploiement.',
        technologies: ['PHP', 'Laravel', 'JavaScript', 'jQuery', 'Python', 'HTML/SASS', 'SQL', 'Docker', 'AWS'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Développement et maintenance de plusieurs applications web en production',
          'Implémentation de fonctionnalités back-end et front-end',
          'Gestion des bases de données et amélioration des performances',
          'Conteneurisation avec Docker et déploiement sur AWS'
        ]
      },
      {
        company: 'Nateev',
        position: 'Chef de Projet E-Commerce & Développeur Front-End',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'France',
        description: 'Coordination de projets e-commerce de la définition des besoins à la livraison, avec contribution aux fonctionnalités front-end, interactions JavaScript, suivi SEO et améliorations analytics.',
        technologies: ['JavaScript', 'CodeIgniter', 'HTML/SASS', 'SEO', 'Analytics'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Gestion de plusieurs projets e-commerce de bout en bout',
          'Coordination d\'équipes pluridisciplinaires (design, dev, SEO, marketing)',
          'Livraison du projet Season Paper dans les délais et le périmètre défini',
          'Amélioration de la communication client et de la qualité de livraison'
        ]
      },
    ],
    es: [
      {
        company: 'Advercity',
        position: 'Desarrollador Full-Stack',
        startDate: '2022-01',
        location: 'Francia',
        description: 'Desarrollo y mantenimiento de aplicaciones web en producción y sitios corporativos, con responsabilidades en lógica back-end, interfaces front-end, actualizaciones de base de datos, mejoras de rendimiento, depuración en producción y flujos de despliegue.',
        technologies: ['PHP', 'Laravel', 'JavaScript', 'jQuery', 'Python', 'HTML/SASS', 'SQL', 'Docker', 'AWS'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Desarrollo y mantenimiento de múltiples aplicaciones web en producción',
          'Implementación de funcionalidades back-end y front-end',
          'Gestión de bases de datos y mejoras de rendimiento',
          'Containerización con Docker y despliegue en AWS'
        ]
      },
      {
        company: 'Nateev',
        position: 'Jefe de Proyecto E-Commerce & Desarrollador Front-End',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'Francia',
        description: 'Coordinación de proyectos e-commerce desde la definición de requisitos hasta la entrega, con contribución a funcionalidades front-end, interacciones JavaScript, seguimiento SEO y mejoras de analítica.',
        technologies: ['JavaScript', 'CodeIgniter', 'HTML/SASS', 'SEO', 'Analytics'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Gestión de múltiples proyectos e-commerce de principio a fin',
          'Coordinación de equipos multifuncionales (diseño, dev, SEO, marketing)',
          'Entrega del proyecto Season Paper en plazo y alcance definido',
          'Mejora de la comunicación con clientes y la calidad de entrega'
        ]
      }
    ]
  };
  return (data[lang as keyof typeof data] || data.en) as Experience[];
}

// Education
export function getEducation(lang: string = 'en'): Education[] {
  const data = {
    en: [
      {
        title: 'Professional Certification in Web and Mobile Web Development - RNCP Level 5',
        subtitle: '(Bac+2)',
        institution: 'Human Booster',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        grade: '',
        location: '',
      },
    ],
    fr: [
      {
        title: 'Titre professionnel Développeur Web et Web Mobile - RNCP niveau 5',
        subtitle: '(Bac+2)',
        institution: 'Human Booster',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        grade: '',
        location: '',
      },
    ],
    es: [
      {
        title: 'Título profesional de Desarrollo Web y Web Móvil - RNCP nivel 5',
        subtitle: '(Bac+2)',
        institution: 'Human Booster',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        grade: '',
        location: '',
      },
    ],
  }

  return (data[lang as keyof typeof data] || data.en) as Education[]
}

// Keep backward compat exports
export const personalInfo = getPersonalInfo('en');
export const education: Education[] = [];

export const projects: Project[] = [];
export const blogPosts: BlogPost[] = [];

export const testimonialsData: Record<string, Testimonial[]> = {
  en: [],
  fr: [],
  es: []
};

export function getTestimonials(lang: string): Testimonial[] {
  return testimonialsData[lang] || testimonialsData['en'] || [];
}

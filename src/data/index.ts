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
      { year: '2022-Present', title: 'Full-Stack Developer', description: 'Building efficient web applications at Advercity with PHP, Laravel, React and more.', icon: '💻' },
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
      { year: '2022-Présent', title: 'Développeur Full-Stack', description: 'Développement d\'applications web efficaces chez Advercity avec PHP, Laravel, React et plus.', icon: '💻' },
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
      { year: '2022-Presente', title: 'Desarrollador Full-Stack', description: 'Construcción de aplicaciones web eficientes en Advercity con PHP, Laravel, React y más.', icon: '💻' },
    ],
    ctaTitle: '¿Listo para colaborar?',
    ctaDescription: 'Autónomo, profesional y siempre listo para nuevos desafíos.',
    ctaButton: 'Contáctame'
  }
};

// Skills Data - grouped by pillar, no misleading percentages
const skillsData = {
  mainStack: ['PHP', 'Laravel', 'JavaScript', 'Typescript', 'SQL', 'HTML', 'SCSS'],
  frontend: ['Angular', 'Nuxt', 'Vue', 'Astro', 'Tailwind'],
  backend: ['Laravel', 'PHP', 'REST APIs', 'Node.js', 'Python'],
  databases: ['MySQL', 'PostgreSQL', 'Supabase', 'Database Design', 'Query Optimization'],
  devops: ['Docker', 'Git', 'Linux', 'AWS', 'VPS Deployment', 'CI/CD', 'Cloudflare', 'Caddy', 'Apache'],
  mobile: ['Ionic', 'Capacitor', 'Angular', 'Android', 'Google Play Console'],
  web: ['SEO', 'Analytics', 'Performance Optimization'],
  exploring: ['Software Architecture', 'DevOps', 'Cloud Infrastructure', 'Monitoring', 'Scalable Deployment'],
  practices: ['Project Management', 'Debugging', 'Production maintenance', 'Code review'],
  certifications: ['PSM 1 - Professional Scrum Master']
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
    bio: `'Full-stack developer with over 4 years of experience designing, developing, and maintaining production web applications. 
    
    I work across the full product lifecycle: requirements analysis, backend and frontend development, databases, deployment, optimization, and maintenance. My background in e-commerce, project management, and entrepreneurship gives me a pragmatic approach focused on business needs and user value.'`,
    languages: ['French (Native)', 'English (Professional)', 'Spanish (Professional)'],
    certifications: ['PSM 1 - Professional Scrum Master']
  },
  fr: {
    title: 'Développeur Full-Stack PHP / Laravel / Angular',
    subtitle : 'PHP/Laravel · JavaScript · SQL · Docker · Production Maintenance',
    bio: `Développeur full-stack avec plus de 4 ans d’expérience dans la conception, le développement et la maintenance d’applications web en production. 
    
    J’interviens sur l’ensemble du cycle produit : analyse du besoin, développement backend et frontend, base de données, déploiement, optimisation et maintenance. Mon parcours en e-commerce, gestion de projet et entrepreneuriat me donne une approche pragmatique, orientée métier et utilisateur.`,
    languages: ['Français (Natif)', 'Anglais (Professionnel)', 'Espagnol (Professionnel)'],
    certifications: ['PSM 1 - Professional Scrum Master']
  },
  es: {
    title: 'Desarrollador Full-Stack PHP / Laravel / Angular',
    subtitle : 'PHP/Laravel · JavaScript · SQL · Docker · Production Maintenance',
    bio: `'Desarrollador full-stack con más de 4 años de experiencia en el diseño, desarrollo y mantenimiento de aplicaciones web en producción. 
    
    Trabajo en todo el ciclo de vida del producto: análisis de necesidades, desarrollo backend y frontend, bases de datos, despliegue, optimización y mantenimiento. Mi experiencia en e-commerce, gestión de proyectos y emprendimiento me da un enfoque pragmático, orientado al negocio y al usuario.'`,
    languages: ['Francés (Nativo)', 'Inglés (Profesional)', 'Español (Profesional)'],
    certifications: ['PSM 1 - Professional Scrum Master']
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
      title: 'Debug & sauvetage',
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
        description: 'Developing and maintaining production web applications and company websites. Responsible for implementing new features, debugging production issues, updating databases, improving performance and contributing to deployment workflows using Docker and AWS. Work across backend logic, frontend interfaces and production support.',
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
        description: 'Coordinated e-commerce website projects from requirements to delivery, working with clients, designers, developers, SEO and marketing teams. Also contributed front-end features, JavaScript interactions, SEO tracking and analytics-related improvements.',
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
      {
        company: 'El Viaje - Mexico',
        position: 'Founder & Restaurant Manager',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'Mexico',
        description: 'Built a restaurant business from scratch - from concept and branding to operations, recruitment, team management and customer experience. Developed strong skills in leadership, communication, decision-making and problem-solving that now support my work as a developer.',
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
        description: 'Développement et maintenance d\'applications web en production et de sites d\'entreprise. Implémentation de nouvelles fonctionnalités, débogage de problèmes en production, gestion des mises à jour de base de données, amélioration des performances et contribution aux workflows de déploiement avec Docker et AWS.',
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
        description: 'Coordination de projets e-commerce de la définition des besoins à la livraison, en travaillant avec les clients, designers, développeurs, équipes SEO et marketing. Contribution aux fonctionnalités front-end, interactions JavaScript, suivi SEO et améliorations analytics.',
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
      {
        company: 'El Viaje - Mexico',
        position: 'Fondateur & Gérant de Restaurant',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'Mexico',
        description: 'Création d\'une activité de restauration from scratch - du concept et de l\'identité visuelle aux opérations, au recrutement, au management d\'équipe et à l\'expérience client. Développement de compétences solides en leadership, communication, prise de décision et résolution de problèmes qui soutiennent aujourd\'hui mon travail de développeur.',
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
        description: 'Formation et management d\'équipes de fundraiseurs, avec responsabilité sur la motivation, l\'organisation terrain et l\'atteinte des objectifs financiers.',
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
        description: 'Desarrollo y mantenimiento de aplicaciones web en producción y sitios corporativos. Responsable de implementar nuevas funcionalidades, depurar problemas en producción, actualizar bases de datos, mejorar el rendimiento y contribuir a los flujos de despliegue con Docker y AWS. Trabajo en lógica back-end, interfaces front-end y soporte en producción.',
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
        description: 'Coordinación de proyectos e-commerce desde la definición de requisitos hasta la entrega, trabajando con clientes, diseñadores, desarrolladores, equipos SEO y marketing. Contribución a funcionalidades front-end, interacciones JavaScript, seguimiento SEO y mejoras de analítica.',
        technologies: ['JavaScript', 'CodeIgniter', 'HTML/SASS', 'SEO', 'Analytics'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Gestión de múltiples proyectos e-commerce de principio a fin',
          'Coordinación de equipos multifuncionales (diseño, dev, SEO, marketing)',
          'Entrega del proyecto Season Paper en plazo y alcance definido',
          'Mejora de la comunicación con clientes y la calidad de entrega'
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

import { languages, type PersonalInfo, type Experience, type Education, type Project, type BlogPost } from '../types';

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
    subtitle: 'From adventure to profession',
    story: [
      { year: '2013-2015', title: 'Globe Trotter', description: 'Traveled and worked around the world across Europe and the Americas.', icon: '✈️' },
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
    subtitle: 'De l\'aventure à la profession',
    story: [
      { year: '2013-2015', title: 'Globe Trotteur', description: 'Voyage et travail autour du monde, en Europe et en Amérique.', icon: '✈️' },
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
    subtitle: 'De la aventura a la profesión',
    story: [
      { year: '2013-2015', title: 'Trotamundos', description: 'Viajé y trabajé por el mundo, por Europa y las Américas.', icon: '✈️' },
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

// Skills Data
const skillsData = {
  programming: [
    { name: 'PHP', level: 88, category: 'Backend' },
    { name: 'Laravel', level: 85, category: 'Backend' },
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'jQuery', level: 82, category: 'Frontend' },
    { name: 'Python', level: 70, category: 'Backend' },
    { name: 'HTML/SASS', level: 88, category: 'Frontend' },
    { name: 'SQL', level: 85, category: 'Database' },
    { name: 'CodeIgniter', level: 72, category: 'Backend' },
  ],
  cloud: [
    { name: 'AWS', level: 72, category: 'Cloud' },
    { name: 'Docker', level: 75, category: 'DevOps' },
    { name: 'CI/CD', level: 68, category: 'DevOps' },
  ],
  databases: [
    { name: 'MySQL', level: 88, category: 'Database' },
    { name: 'PostgreSQL', level: 72, category: 'Database' },
  ],
  design: [
    { name: 'UI/UX Design', level: 75, category: 'Design' },
    { name: 'SEO', level: 78, category: 'Marketing' },
    { name: 'Project Management', level: 85, category: 'Management' },
  ]
};

// Contact Information
const contactInfo = {
  email: '',
  linkedin: 'https://linkedin.com/in/alban-augier-a64297108/',
  website: 'https://elie-e.github.io/',
  location: 'France',
  phone: ''
};

// Personal information translations
const personalInfoTranslations = {
  en: {
    title: 'Full Stack Developer',
    bio: 'I am an autonomous and professional web developer with two years of experience in full-stack development and project management. Skilled in working with a variety of programming languages. I have a comprehensive understanding of both front-end and back-end technologies, supplemented by my abilities to interpret requirements and designing solutions to coordinating teams and handling client communications.',
    languages: ['French (Native)', 'English (Professional)', 'Spanish (Conversational)'],
    certifications: []
  },
  fr: {
    title: 'Développeur Full Stack',
    bio: 'Développeur web autonome et professionnel avec deux ans d\'expérience en développement full-stack et gestion de projet. Compétent dans divers langages de programmation. Bonne maîtrise des technologies front-end et back-end, complétée par mes capacités à analyser les besoins, concevoir des solutions, coordonner des équipes et gérer les communications clients.',
    languages: ['Français (Natif)', 'Anglais (Professionnel)', 'Espagnol (Conversationnel)'],
    certifications: []
  },
  es: {
    title: 'Desarrollador Full Stack',
    bio: 'Desarrollador web autónomo y profesional con dos años de experiencia en desarrollo full-stack y gestión de proyectos. Con habilidades en múltiples lenguajes de programación. Tengo una comprensión integral de las tecnologías front-end y back-end, complementada con mi capacidad para interpretar requisitos, diseñar soluciones, coordinar equipos y gestionar comunicaciones con clientes.',
    languages: ['Francés (Nativo)', 'Inglés (Profesional)', 'Español (Conversacional)'],
    certifications: []
  }
};

export function getPersonalInfo(lang: string = 'en'): PersonalInfo {
  const translations = personalInfoTranslations[lang as keyof typeof personalInfoTranslations] || personalInfoTranslations.en;
  return {
    name: 'Alban Augier',
    title: translations.title,
    email: contactInfo.email,
    linkedin: contactInfo.linkedin,
    website: contactInfo.website,
    location: contactInfo.location,
    bio: translations.bio,
    languages: translations.languages,
    certifications: translations.certifications
  };
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
        description: 'Specializing in constructing efficient web applications and enhancing existing company websites with new functionalities. Managing database operations, troubleshooting and resolving issues across multiple websites built with PHP, Laravel, React and various CMS platforms. Implementing changes and improvements, contributing significantly to website stability and user experience. Employed Docker for containerization and AWS for deployment.',
        technologies: ['Laravel', 'Python', 'jQuery', 'PHP', 'HTML/SASS', 'SQL'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Led full stack development of web applications and functionalities',
          'Handled database operations and improvement',
          'Employed Docker for containerization and AWS for deployment',
          'Optimized website performance'
        ]
      },
      {
        company: 'Nateev',
        position: 'E-Commerce Project Manager / Front End Developer',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'France',
        description: 'As project manager, led and coordinated all phases of e-commerce website projects from initial conception to final delivery. Implemented new features to keep sites modern, user-friendly, and aligned with client business needs.',
        technologies: ['JavaScript', 'CodeIgniter', 'RedBooth', 'HTML/SASS'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Managed and coordinated multiple e-commerce projects',
          'Managed a cross-functional team of designers and developers',
          'Worked closely with SEO, marketing, and analytics teams',
          'Successfully managed the entire Season Paper project from engagement to delivery'
        ]
      },
      {
        company: 'El Viaje - Mexico',
        position: 'Founder & Restaurant Manager',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'France',
        description: 'Created a restaurant from scratch, injecting personal vision into everything from the unique style and decor to the innovative menu. Ensured smooth operations and that every guest left with a smile.',
        technologies: [],
        duration: formatDuration(calculateDuration('2017-01', '2021-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Conceived and launched a restaurant concept',
          'Managed daily operations, ensuring efficient and high-quality service',
          'Recruited, trained, and mentored restaurant staff'
        ]
      },
      {
        company: 'Ong Conseil',
        position: 'Team Manager',
        startDate: '2015-01',
        endDate: '2017-01',
        location: 'France',
        description: 'Provided training and leadership to teams of street fundraisers, while also ensuring the achievement of financial targets.',
        technologies: [],
        duration: formatDuration(calculateDuration('2015-01', '2017-01'), lang),
        type: 'Full-time' as const,
        achievements: []
      },
      {
        company: 'Europe & America',
        position: 'Globe Trotter',
        startDate: '2013-01',
        endDate: '2015-01',
        location: 'World',
        description: 'Travel and work around the world.',
        technologies: [],
        duration: formatDuration(calculateDuration('2013-01', '2015-01'), lang),
        type: 'Freelance' as const,
        achievements: []
      }
    ],
    fr: [
      {
        company: 'Advercity',
        position: 'Développeur Full-Stack',
        startDate: '2022-01',
        location: 'France',
        description: 'Spécialisé dans la construction d\'applications web efficaces et l\'amélioration des sites existants avec de nouvelles fonctionnalités. Gestion des opérations de base de données, dépannage et résolution de problèmes sur plusieurs sites construits avec PHP, Laravel, React et diverses plateformes CMS. Mise en œuvre de changements et améliorations contribuant à la stabilité et à l\'expérience utilisateur.',
        technologies: ['Laravel', 'Python', 'jQuery', 'PHP', 'HTML/SASS', 'SQL'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Direction du développement full stack d\'applications web',
          'Gestion des opérations et améliorations de base de données',
          'Utilisation de Docker pour la conteneurisation et AWS pour le déploiement',
          'Optimisation des performances des sites web'
        ]
      },
      {
        company: 'Nateev',
        position: 'Chef de Projet E-Commerce / Développeur Front End',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'France',
        description: 'En tant que chef de projet, direction et coordination de toutes les phases des projets de sites e-commerce, de la conception initiale à la livraison finale. Mise en œuvre de nouvelles fonctionnalités pour maintenir les sites modernes et alignés avec les besoins clients.',
        technologies: ['JavaScript', 'CodeIgniter', 'RedBooth', 'HTML/SASS'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Gestion et coordination de multiples projets e-commerce',
          'Management d\'une équipe pluridisciplinaire de designers et développeurs',
          'Collaboration étroite avec les équipes SEO, marketing et analytics',
          'Gestion complète du projet Season Paper du début à la livraison'
        ]
      },
      {
        company: 'El Viaje - Mexico',
        position: 'Fondateur & Gérant de Restaurant',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'France',
        description: 'Création d\'un restaurant from scratch, en injectant ma vision personnelle dans le style, le décor et le menu. Gestion de la totalité des opérations et satisfaction des clients.',
        technologies: [],
        duration: formatDuration(calculateDuration('2017-01', '2021-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Conception et lancement d\'un concept de restaurant',
          'Gestion des opérations quotidiennes avec un service de qualité',
          'Recrutement, formation et encadrement du personnel'
        ]
      },
      {
        company: 'Ong Conseil',
        position: 'Team Manager',
        startDate: '2015-01',
        endDate: '2017-01',
        location: 'France',
        description: 'Formation et management d\'équipes de fundraiseurs, tout en assurant l\'atteinte des objectifs financiers.',
        technologies: [],
        duration: formatDuration(calculateDuration('2015-01', '2017-01'), lang),
        type: 'Full-time' as const,
        achievements: []
      },
      {
        company: 'Europe & Amérique',
        position: 'Globe Trotteur',
        startDate: '2013-01',
        endDate: '2015-01',
        location: 'Monde',
        description: 'Voyage et travail autour du monde.',
        technologies: [],
        duration: formatDuration(calculateDuration('2013-01', '2015-01'), lang),
        type: 'Freelance' as const,
        achievements: []
      }
    ],
    es: [
      {
        company: 'Advercity',
        position: 'Desarrollador Full-Stack',
        startDate: '2022-01',
        location: 'Francia',
        description: 'Especializado en construir aplicaciones web eficientes y mejorar sitios web existentes con nuevas funcionalidades. Gestión de operaciones de base de datos, resolución de problemas en múltiples sitios web construidos con PHP, Laravel, React y varias plataformas CMS.',
        technologies: ['Laravel', 'Python', 'jQuery', 'PHP', 'HTML/SASS', 'SQL'],
        duration: formatDuration(calculateDuration('2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Lideré el desarrollo full stack de aplicaciones web',
          'Gestioné operaciones y mejoras de base de datos',
          'Utilicé Docker para containerización y AWS para despliegue',
          'Optimicé el rendimiento de sitios web'
        ]
      },
      {
        company: 'Nateev',
        position: 'Jefe de Proyecto E-Commerce / Desarrollador Front End',
        startDate: '2021-01',
        endDate: '2022-01',
        location: 'Francia',
        description: 'Como jefe de proyecto, lideré y coordiné todas las fases de proyectos de sitios e-commerce, desde la concepción hasta la entrega final. Implementé nuevas funcionalidades para mantener los sitios modernos y alineados con las necesidades del cliente.',
        technologies: ['JavaScript', 'CodeIgniter', 'RedBooth', 'HTML/SASS'],
        duration: formatDuration(calculateDuration('2021-01', '2022-01'), lang),
        type: 'Full-time' as const,
        achievements: [
          'Gestioné y coordiné múltiples proyectos e-commerce',
          'Gestioné un equipo multifuncional de diseñadores y desarrolladores',
          'Gestioné exitosamente el proyecto completo Season Paper de inicio a entrega'
        ]
      },
      {
        company: 'El Viaje - Mexico',
        position: 'Fundador y Gerente de Restaurante',
        startDate: '2017-01',
        endDate: '2021-01',
        location: 'Francia',
        description: 'Creé un restaurante desde cero, imprimiendo mi visión personal en el estilo, la decoración y el menú. Aseguré el buen funcionamiento de las operaciones y la satisfacción de cada cliente.',
        technologies: [],
        duration: formatDuration(calculateDuration('2017-01', '2021-01'), lang),
        type: 'Freelance' as const,
        achievements: [
          'Concebí y lancé un concepto de restaurante',
          'Gestioné operaciones diarias con servicio de calidad',
          'Reclutamiento, formación y mentoría del personal'
        ]
      },
      {
        company: 'Ong Conseil',
        position: 'Team Manager',
        startDate: '2015-01',
        endDate: '2017-01',
        location: 'Francia',
        description: 'Formación y liderazgo de equipos de captadores de fondos, asegurando el logro de objetivos financieros.',
        technologies: [],
        duration: formatDuration(calculateDuration('2015-01', '2017-01'), lang),
        type: 'Full-time' as const,
        achievements: []
      },
      {
        company: 'Europa & América',
        position: 'Trotamundos',
        startDate: '2013-01',
        endDate: '2015-01',
        location: 'Mundo',
        description: 'Viaje y trabajo alrededor del mundo.',
        technologies: [],
        duration: formatDuration(calculateDuration('2013-01', '2015-01'), lang),
        type: 'Freelance' as const,
        achievements: []
      }
    ]
  };
  return (data[lang as keyof typeof data] || data.en) as Experience[];
}

// Education
export function getEducation(lang: string = 'en'): Education[] {
  return [];
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

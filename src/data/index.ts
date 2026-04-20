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
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
}

function formatDuration(duration: { years: number; months: number; days: number }, lang: string): string {
  const durationTranslations = {
    fr: {
      year: 'an', years: 'ans',
      month: 'mois', months: 'mois',
      day: 'jour', days: 'jours',
      and: 'et'
    },
    en: {
      year: 'year', years: 'years',
      month: 'month', months: 'months',
      day: 'day', days: 'days',
      and: 'and'
    },
    es: {
      year: 'año', years: 'años',
      month: 'mes', months: 'meses',
      day: 'día', days: 'días',
      and: 'y'
    },
    de: {
      year: 'Jahr', years: 'Jahre',
      month: 'Monat', months: 'Monate',
      day: 'Tag', days: 'Tage',
      and: 'und'
    },
    pt: {
      year: 'ano', years: 'anos',
      month: 'mês', months: 'meses',
      day: 'dia', days: 'dias',
      and: 'e'
    },
    ja: {
      year: '年', years: '年',
      month: 'ヶ月', months: 'ヶ月',
      day: '日', days: '日',
      and: ''
    },
    ko: {
      year: '년', years: '년',
      month: '개월', months: '개월',
      day: '일', days: '일',
      and: ''
    },
    zh: {
      year: '年', years: '年',
      month: '个月', months: '个月',
      day: '天', days: '天',
      and: ''
    },
    ar: {
      year: 'سنة', years: 'سنوات',
      month: 'شهر', months: 'أشهر',
      day: 'يوم', days: 'أيام',
      and: 'و'
    }
  };
  
  const t = durationTranslations[lang as keyof typeof durationTranslations] || durationTranslations.en;
  
  const parts: string[] = [];
  
  if (duration.years > 0) {
    parts.push(`${duration.years} ${duration.years === 1 ? t.year : t.years}`);
  }
  
  if (duration.months > 0) {
    parts.push(`${duration.months} ${duration.months === 1 ? t.month : t.months}`);
  }
  
  if (duration.days > 0 && duration.years === 0) {
    parts.push(`${duration.days} ${duration.days === 1 ? t.day : t.days}`);
  }
  
  if (parts.length === 0) {
    return lang === 'fr' ? '1 mois' : lang === 'en' ? '1 month' : '1 ' + t.month;
  }
  
  if (parts.length === 1) {
    return parts[0];
  }
  
  if (parts.length === 2) {
    return parts.join(` ${t.and} `);
  }
  
  return parts.slice(0, -1).join(', ') + ` ${t.and} ${parts[parts.length - 1]}`;
}

function formatDate(dateStr: string, lang: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  
  const monthNames = {
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  };
  
  const months = monthNames[lang as keyof typeof monthNames] || monthNames.en;
  const monthName = months[parseInt(month) - 1];
  
  // Short format for some languages
  if (['fr', 'es', 'de', 'pt'].includes(lang)) {
    return `${monthName.substring(0, 4)}. ${year}`;
  }
  
  return `${monthName} ${year}`;
}

// My Journey Storytelling Content
const journeyTranslations = {
  fr: {
    title: 'Mon Parcours',
    subtitle: 'De la passion à la profession',
    story: [
      {
        year: '2010-2013',
        title: 'La Passion Naissante',
        description: 'Fasciné par internet et la technologie depuis l\'enfance. Première découverte du code HTML à 12 ans.',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: 'Premiers Sites Web',
        description: 'Création de mes premiers sites à 16 ans avec HTML, CSS, JS et PHP. Début de la passion pour le design.',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: 'Freelance & Créativité',
        description: 'Vente de logos et créations sur Freelancer.com. Développement de sites et créations numériques.',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: 'Développeur Full Stack',
        description: 'Transition vers le développement professionnel. Spécialisation en architectures complexes.',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: 'Lead Developer',
        description: 'Encadrement d\'équipes et gestion de projets techniques. Mentorat des développeurs juniors.',
        icon: '👥'
      },
      {
        year: '2022-Présent',
        title: 'CTO & Visionnaire',
        description: 'Direction technique chez Advercity. Stratégie, architecture et innovation tout en continuant à coder.',
        icon: '🎯'
      }
    ],
    ctaTitle: 'Prêt à collaborer ?',
    ctaDescription: 'Passionné par l\'innovation et toujours à la recherche de nouveaux défis techniques.',
    ctaButton: 'Contactez-moi'
  },
  en: {
    title: 'My Journey',
    subtitle: 'From passion to profession',
    story: [
      {
        year: '2010-2013',
        title: 'Growing Passion',
        description: 'Fascinated by the internet and technology since childhood. First HTML code discovery at age 12.',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: 'First Websites',
        description: 'Built my first websites at 16 using HTML, CSS, JS, and PHP. Started loving design.',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: 'Freelance & Creativity',
        description: 'Sold logos and creative works on Freelancer.com. Developed sites and digital creations.',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: 'Full Stack Developer',
        description: 'Transition to professional development. Specialized in complex architectures.',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: 'Lead Developer',
        description: 'Team leadership and technical project management. Mentoring junior developers.',
        icon: '👥'
      },
      {
        year: '2022-Present',
        title: 'CTO & Visionary',
        description: 'Technical leadership at Advercity. Strategy, architecture, and innovation while still coding.',
        icon: '🎯'
      }
    ],
    ctaTitle: 'Ready to collaborate?',
    ctaDescription: 'Passionate about innovation and always seeking new technical challenges.',
    ctaButton: 'Get in Touch'
  },
  es: {
    title: 'Mi Viaje',
    subtitle: 'De la pasión a la profesión',
    story: [
      {
        year: '2010-2013',
        title: 'Pasión Creciente',
        description: 'Fascinado por internet y la tecnología desde la infancia. Primer descubrimiento del código HTML a los 12 años.',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: 'Primeros Sitios Web',
        description: 'Construí mis primeros sitios a los 16 años usando HTML, CSS, JS y PHP. Empecé a amar el diseño.',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: 'Freelance y Creatividad',
        description: 'Vendí logos y trabajos creativos en Freelancer.com. Desarrollé sitios y creaciones digitales.',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: 'Desarrollador Full Stack',
        description: 'Transición al desarrollo profesional. Especializado en arquitecturas complejas.',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: 'Lead Developer',
        description: 'Liderazgo de equipos y gestión de proyectos técnicos. Mentoría de desarrolladores junior.',
        icon: '👥'
      },
      {
        year: '2022-Presente',
        title: 'CTO y Visionario',
        description: 'Liderazgo técnico en Advercity. Estrategia, arquitectura e innovación mientras sigo programando.',
        icon: '🎯'
      }
    ],
    ctaTitle: '¿Listo para colaborar?',
    ctaDescription: 'Apasionado por la innovación y siempre buscando nuevos desafíos técnicos.',
    ctaButton: 'Ponte en contacto'
  },
  de: {
    title: 'Mein Weg',
    subtitle: 'Von der Leidenschaft zum Beruf',
    story: [
      {
        year: '2010-2013',
        title: 'Wachsende Leidenschaft',
        description: 'Seit der Kindheit fasziniert von Internet und Technologie. Erste HTML-Code-Entdeckung mit 12 Jahren.',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: 'Erste Websites',
        description: 'Meine ersten Websites mit 16 Jahren mit HTML, CSS, JS und PHP erstellt. Begann Design zu lieben.',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: 'Freelance & Kreativität',
        description: 'Logos und kreative Arbeiten auf Freelancer.com verkauft. Websites und digitale Kreationen entwickelt.',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: 'Full Stack Entwickler',
        description: 'Übergang zur professionellen Entwicklung. Spezialisiert auf komplexe Architekturen.',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: 'Lead Developer',
        description: 'Teamführung und technisches Projektmanagement. Mentoring von Junior-Entwicklern.',
        icon: '👥'
      },
      {
        year: '2022-Gegenwart',
        title: 'CTO & Visionär',
        description: 'Technische Führung bei Advercity. Strategie, Architektur und Innovation während ich weiter programmiere.',
        icon: '🎯'
      }
    ],
    ctaTitle: 'Bereit zur Zusammenarbeit?',
    ctaDescription: 'Leidenschaftlich für Innovation und immer auf der Suche nach neuen technischen Herausforderungen.',
    ctaButton: 'Kontakt aufnehmen'
  },
  pt: {
    title: 'Minha Jornada',
    subtitle: 'Da paixão à profissão',
    story: [
      {
        year: '2010-2013',
        title: 'Paixão Crescente',
        description: 'Fascinado por internet e tecnologia desde a infância. Primeira descoberta do código HTML aos 12 anos.',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: 'Primeiros Sites',
        description: 'Construí meus primeiros sites aos 16 anos usando HTML, CSS, JS e PHP. Comecei a amar design.',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: 'Freelance e Criatividade',
        description: 'Vendi logos e trabalhos criativos no Freelancer.com. Desenvolvi sites e criações digitais.',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: 'Desenvolvedor Full Stack',
        description: 'Transição para desenvolvimento profissional. Especializado em arquiteturas complexas.',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: 'Lead Developer',
        description: 'Liderança de equipes e gestão de projetos técnicos. Mentoria de desenvolvedores júnior.',
        icon: '👥'
      },
      {
        year: '2022-Presente',
        title: 'CTO e Visionário',
        description: 'Liderança técnica na Advercity. Estratégia, arquitetura e inovação enquanto continuo programando.',
        icon: '🎯'
      }
    ],
    ctaTitle: 'Pronto para colaborar?',
    ctaDescription: 'Apaixonado por inovação e sempre buscando novos desafios técnicos.',
    ctaButton: 'Entre em contato'
  },
  ja: {
    title: '私の旅路',
    subtitle: '情熱から職業へ',
    story: [
      {
        year: '2010-2013',
        title: '成長する情熱',
        description: '幼少期からインターネットとテクノロジーに魅了されていました。12歳でHTMLコードを初めて発見。',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: '最初のウェブサイト',
        description: '16歳でHTML、CSS、JS、PHPを使って最初のウェブサイトを構築。デザインを愛し始めました。',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: 'フリーランスと創造性',
        description: 'Freelancer.comでロゴやクリエイティブ作品を販売。サイトやデジタル作品を開発。',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: 'フルスタック開発者',
        description: 'プロフェッショナルな開発への移行。複雑なアーキテクチャに特化。',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: 'リード開発者',
        description: 'チームリーダーシップと技術プロジェクト管理。ジュニア開発者のメンタリング。',
        icon: '👥'
      },
      {
        year: '2022-現在',
        title: 'CTOとビジョナリー',
        description: 'Advercityでの技術リーダーシップ。コーディングを続けながら戦略、アーキテクチャ、イノベーション。',
        icon: '🎯'
      }
    ],
    ctaTitle: 'コラボレーションの準備はできていますか？',
    ctaDescription: 'イノベーションに情熱を注ぎ、常に新しい技術的挑戦を求めています。',
    ctaButton: 'お問い合わせ'
  },
  ko: {
    title: '나의 여정',
    subtitle: '열정에서 직업으로',
    story: [
      {
        year: '2010-2013',
        title: '성장하는 열정',
        description: '어린 시절부터 인터넷과 기술에 매료되었습니다. 12세에 HTML 코드를 처음 발견했습니다.',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: '첫 번째 웹사이트',
        description: '16세에 HTML, CSS, JS, PHP를 사용하여 첫 번째 웹사이트를 구축했습니다. 디자인을 사랑하기 시작했습니다.',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: '프리랜서와 창의성',
        description: 'Freelancer.com에서 로고와 창작 작품을 판매했습니다. 사이트와 디지털 작품을 개발했습니다.',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: '풀스택 개발자',
        description: '전문적인 개발로의 전환. 복잡한 아키텍처에 특화.',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: '리드 개발자',
        description: '팀 리더십과 기술 프로젝트 관리. 주니어 개발자 멘토링.',
        icon: '👥'
      },
      {
        year: '2022-현재',
        title: 'CTO와 비전가',
        description: 'Advercity에서 기술 리더십. 계속 코딩하면서 전략, 아키텍처, 혁신.',
        icon: '🎯'
      }
    ],
    ctaTitle: '협업할 준비가 되셨나요?',
    ctaDescription: '혁신에 열정적이고 항상 새로운 기술적 도전을 추구합니다.',
    ctaButton: '연락하기'
  },
  zh: {
    title: '我的旅程',
    subtitle: '从激情到职业',
    story: [
      {
        year: '2010-2013',
        title: '成长的激情',
        description: '从小就对互联网和技术着迷。12岁时第一次发现HTML代码。',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: '第一个网站',
        description: '16岁时使用HTML、CSS、JS和PHP构建了我的第一个网站。开始热爱设计。',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: '自由职业和创造力',
        description: '在Freelancer.com上销售标志和创意作品。开发网站和数字创作。',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: '全栈开发者',
        description: '转向专业开发。专注于复杂架构。',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: '首席开发者',
        description: '团队领导和技术项目管理。指导初级开发者。',
        icon: '👥'
      },
      {
        year: '2022-现在',
        title: 'CTO和愿景家',
        description: '在Advercity的技术领导。在继续编码的同时进行战略、架构和创新。',
        icon: '🎯'
      }
    ],
    ctaTitle: '准备好合作了吗？',
    ctaDescription: '对创新充满热情，始终寻求新的技术挑战。',
    ctaButton: '联系我'
  },
  ar: {
    title: 'رحلتي',
    subtitle: 'من الشغف إلى المهنة',
    story: [
      {
        year: '2010-2013',
        title: 'الشغف المتزايد',
        description: 'مفتون بالإنترنت والتكنولوجيا منذ الطفولة. اكتشاف أول كود HTML في سن 12.',
        icon: '💻'
      },
      {
        year: '2013-2016',
        title: 'المواقع الأولى',
        description: 'بنيت مواقعي الأولى في سن 16 باستخدام HTML و CSS و JS و PHP. بدأت أحب التصميم.',
        icon: '🎨'
      },
      {
        year: '2016-2019',
        title: 'العمل الحر والإبداع',
        description: 'بعت شعارات وأعمال إبداعية على Freelancer.com. طورت مواقع وإبداعات رقمية.',
        icon: '🚀'
      },
      {
        year: '2019-2020',
        title: 'مطور Full Stack',
        description: 'الانتقال إلى التطوير المهني. متخصص في المعماريات المعقدة.',
        icon: '⚙️'
      },
      {
        year: '2020-2022',
        title: 'Lead Developer',
        description: 'قيادة الفرق وإدارة المشاريع التقنية. إرشاد المطورين المبتدئين.',
        icon: '👥'
      },
      {
        year: '2022-الحاضر',
        title: 'CTO ورؤيوي',
        description: 'القيادة التقنية في Advercity. الاستراتيجية والمعمارية والابتكار بينما أواصل البرمجة.',
        icon: '🎯'
      }
    ],
    ctaTitle: 'مستعد للتعاون؟',
    ctaDescription: 'شغوف بالابتكار ودائم البحث عن تحديات تقنية جديدة.',
    ctaButton: 'تواصل معي'
  }
};

// Skills Data
const skillsData = {
  programming: [
    { name: 'Java', level: 95, category: 'Backend' },
    { name: 'JavaScript', level: 98, category: 'Frontend' },
    { name: 'Angular', level: 90, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'Next.js', level: 80, category: 'Frontend' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'PHP', level: 92, category: 'Backend' },
    { name: 'Laravel', level: 90, category: 'Backend' },
    { name: 'Symfony', level: 85, category: 'Backend' },
    { name: 'Typo3', level: 75, category: 'CMS' },
    { name: 'Zend', level: 80, category: 'Backend' }
  ],
  cloud: [
    { name: 'AWS Stack', level: 85, category: 'Cloud' },
    { name: 'Google Cloud Platform', level: 75, category: 'Cloud' },
    { name: 'OVH Cloud', level: 80, category: 'Cloud' },
    { name: 'Docker', level: 90, category: 'DevOps' },
    { name: 'Kubernetes', level: 70, category: 'DevOps' },
    { name: 'CI/CD', level: 85, category: 'DevOps' }
  ],
  databases: [
    { name: 'MySQL', level: 95, category: 'Database' },
    { name: 'PostgreSQL', level: 85, category: 'Database' },
    { name: 'MongoDB', level: 80, category: 'Database' },
    { name: 'Redis', level: 75, category: 'Database' },
    { name: 'Elasticsearch', level: 70, category: 'Database' }
  ],
  design: [
    { name: 'UI/UX Design', level: 85, category: 'Design' },
    { name: 'SEO', level: 90, category: 'Marketing' },
    { name: 'Adobe Creative Suite', level: 80, category: 'Design' },
    { name: 'Digital Marketing', level: 75, category: 'Marketing' }
  ]
};

// Enhanced Contact Information
const contactInfo = {
  email: 'contact@oussematrabelsi.com',
  linkedin: 'https://www.linkedin.com/in/oussema-trabelsi/',
  website: 'https://www.oussematrabelsi.com',
  location: 'Lyon, France',
  phone: '+33 6 XX XX XX XX' // You can add your real phone if you want
};

// Personal information translations
const personalInfoTranslations = {
  fr: {
    title: 'CTO & Lead Developer',
    bio: 'CTO et Lead Developer expérimenté avec plus de 5 ans chez Advercity, spécialisé dans le développement full-stack, le leadership d\'équipe et l\'architecture technique. Passionné par la construction de solutions évolutives et le mentorat des équipes de développement.',
    languages: ['Français (Natif)', 'Anglais (Professionnel complet)', 'Italien (Professionnel limité)', 'Arabe'],
    certifications: ['Score TOEIC 880']
  },
  en: {
    title: 'CTO & Lead Developer',
    bio: 'Experienced CTO and Lead Developer with 5+ years at Advercity, specializing in full-stack development, team leadership, and technical architecture. Passionate about building scalable solutions and mentoring development teams.',
    languages: ['French (Native)', 'English (Full Professional)', 'Italian (Limited Working)', 'Arabic'],
    certifications: ['TOEIC Score 880']
  },
  es: {
    title: 'CTO y Lead Developer',
    bio: 'CTO y Lead Developer experimentado con más de 5 años en Advercity, especializado en desarrollo full-stack, liderazgo de equipos y arquitectura técnica. Apasionado por construir soluciones escalables y mentorizar equipos de desarrollo.',
    languages: ['Francés (Nativo)', 'Inglés (Profesional completo)', 'Italiano (Profesional limitado)', 'Árabe'],
    certifications: ['Puntuación TOEIC 880']
  },
  de: {
    title: 'CTO & Lead Developer',
    bio: 'Erfahrener CTO und Lead Developer mit über 5 Jahren bei Advercity, spezialisiert auf Full-Stack-Entwicklung, Teamführung und technische Architektur. Leidenschaftlich für den Aufbau skalierbarer Lösungen und die Betreuung von Entwicklungsteams.',
    languages: ['Französisch (Muttersprache)', 'Englisch (Vollständig professionell)', 'Italienisch (Begrenzt professionell)', 'Arabisch'],
    certifications: ['TOEIC-Score 880']
  },
  pt: {
    title: 'CTO e Lead Developer',
    bio: 'CTO e Lead Developer experiente com mais de 5 anos na Advercity, especializado em desenvolvimento full-stack, liderança de equipes e arquitetura técnica. Apaixonado por construir soluções escaláveis e mentorar equipes de desenvolvimento.',
    languages: ['Francês (Nativo)', 'Inglês (Profissional completo)', 'Italiano (Profissional limitado)', 'Árabe'],
    certifications: ['Pontuação TOEIC 880']
  },
  ja: {
    title: 'CTO & Lead Developer',
    bio: 'Advercityで5年以上の経験を持つ経験豊富なCTO兼Lead Developer。フルスタック開発、チームリーダーシップ、技術アーキテクチャを専門とし、スケーラブルなソリューションの構築と開発チームのメンタリングに情熱を注いでいます。',
    languages: ['フランス語（母国語）', '英語（完全にプロフェッショナル）', 'イタリア語（限定的にプロフェッショナル）', 'アラビア語'],
    certifications: ['TOEICスコア880']
  },
  ko: {
    title: 'CTO & Lead Developer',
    bio: 'Advercity에서 5년 이상의 경험을 가진 숙련된 CTO이자 Lead Developer입니다. 풀스택 개발, 팀 리더십, 기술 아키텍처를 전문으로 하며, 확장 가능한 솔루션 구축과 개발 팀 멘토링에 열정을 가지고 있습니다.',
    languages: ['프랑스어 (모국어)', '영어 (완전 전문)', '이탈리아어 (제한적 전문)', '아랍어'],
    certifications: ['TOEIC 점수 880']
  },
  zh: {
    title: 'CTO & Lead Developer',
    bio: '在Advercity拥有5年以上经验的资深CTO兼Lead Developer，专注于全栈开发、团队领导和技术架构。热衷于构建可扩展的解决方案和指导开发团队。',
    languages: ['法语（母语）', '英语（完全专业）', '意大利语（有限专业）', '阿拉伯语'],
    certifications: ['TOEIC分数880']
  },
  ar: {
    title: 'CTO ومطور رئيسي',
    bio: 'CTO ومطور رئيسي ذو خبرة مع أكثر من 5 سنوات في Advercity، متخصص في التطوير الشامل، قيادة الفرق، والهندسة المعمارية التقنية. شغوف ببناء حلول قابلة للتوسع وإرشاد فرق التطوير.',
    languages: ['الفرنسية (اللغة الأم)', 'الإنجليزية (احترافية كاملة)', 'الإيطالية (احترافية محدودة)', 'العربية'],
    certifications: ['درجة TOEIC 880']
  }
};

export function getPersonalInfo(lang: string = 'fr'): PersonalInfo {
  const translations = personalInfoTranslations[lang as keyof typeof personalInfoTranslations] || personalInfoTranslations.en;
  
  // Names in different languages
  const names = {
    fr: 'Oussema Trabelsi',
    en: 'Oussema Trabelsi',
    es: 'Oussema Trabelsi',
    de: 'Oussema Trabelsi',
    pt: 'Oussema Trabelsi',
    ja: 'Oussema Trabelsi',
    ko: 'Oussema Trabelsi',
    zh: 'Oussema Trabelsi',
    ar: 'أسامة الطرابلسي'
  };
  
  return {
    name: names[lang as keyof typeof names] || names.en,
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

export function getJourneyContent(lang: string = 'fr') {
  return journeyTranslations[lang as keyof typeof journeyTranslations] || journeyTranslations.en;
}

export function getSkillsData() {
  return skillsData;
}

export function getContactInfo() {
  return contactInfo;
}

// Get experiences with translations
export function getExperiences(lang: string): Experience[] {
  const experiencesData = {
    fr: [
      {
        company: 'Advercity',
        position: 'Directeur technique (CTO)',
        startDate: '2024-02',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, France',
        description: 'Direction technique et stratégie technologique. Gestion des équipes de développement et excellence technique sur tous les projets.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Lead Developer',
        startDate: '2022-09',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, France',
        description: 'Encadrement des équipes de développement et gestion de projets techniques. Implémentation des meilleures pratiques et mentorat des développeurs juniors.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Développeur Full Stack',
        startDate: '2020-09',
        endDate: '2022-09',
        location: 'Saint-Étienne, Rhône-Alpes, France',
        description: 'Développement d\'applications full-stack et solutions web. Architecture de bases de données et développement d\'APIs.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: 'Indépendant',
        startDate: '2011-01',
        location: 'Remote',
        description: 'Services de développement freelance dans diverses technologies et industries. Création de sites web, logos et solutions numériques.',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'Backend Developer',
        startDate: '2019-09',
        endDate: '2020-09',
        location: 'Région de Lyon, France',
        description: 'Migration complète de l\'ERP interne de Java vers Java JEE et Spring Boot. Amélioration des processus de génération de contrats et d\'offres clients pour optimiser l\'efficacité opérationnelle.',
        technologies: ['Java', 'Java JEE', 'Spring Boot', 'MySQL', 'ERP'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI',
        achievements: [
          'Migration complète Java',
          'Optimisation ERP',
          'Génération de contrats',
          'Amélioration des processus'
        ]
      }
    ],
    en: [
      {
        company: 'Advercity',
        position: 'Chief Technology Officer (CTO)',
        startDate: '2024-02',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, France',
        description: 'Technical leadership and technology strategy. Managing development teams and technical excellence across all projects.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Lead Developer',
        startDate: '2022-09',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, France',
        description: 'Leading development teams and managing technical projects. Implementing best practices and mentoring junior developers.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Full Stack Developer',
        startDate: '2020-09',
        endDate: '2022-09',
        location: 'Saint-Étienne, Rhône-Alpes, France',
        description: 'Full-stack application development and web solutions. Database architecture and API development.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: 'Independent',
        startDate: '2011-01',
        location: 'Remote',
        description: 'Freelance development services across various technologies and industries. Web development, logos, and digital solutions.',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'Backend Developer',
        startDate: '2019-09',
        endDate: '2020-09',
        location: 'Lyon Region, France',
        description: 'Complete migration of internal ERP from Java to Java JEE and Spring Boot. Improvement of contract generation and client offer processes to optimize operational efficiency.',
        technologies: ['Java', 'Java JEE', 'Spring Boot', 'MySQL', 'ERP'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI',
        achievements: [
          'Complete Java migration',
          'ERP optimization',
          'Contract generation',
          'Process improvement'
        ]
      }
    ],
    ar: [
      {
        company: 'Advercity',
        position: 'مدير تقني (CTO)',
        startDate: '2024-02',
        location: 'سانت إتيان، أوفرن-رون-ألب، فرنسا',
        description: 'القيادة التقنية واستراتيجية التكنولوجيا. إدارة فرق التطوير والتميز التقني في جميع المشاريع.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'مطور رئيسي',
        startDate: '2022-09',
        location: 'سانت إتيان، أوفرن-رون-ألب، فرنسا',
        description: 'قيادة فرق التطوير وإدارة المشاريع التقنية. تنفيذ أفضل الممارسات وإرشاد المطورين المبتدئين.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'مطور Full Stack',
        startDate: '2020-09',
        endDate: '2022-09',
        location: 'سانت إتيان، رون-ألب، فرنسا',
        description: 'تطوير التطبيقات الشاملة وحلول الويب. هندسة قواعد البيانات وتطوير APIs.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: 'مستقل',
        startDate: '2011-01',
        location: 'عن بُعد',
        description: 'خدمات التطوير المستقل عبر تقنيات وصناعات متنوعة. تطوير الويب والشعارات والحلول الرقمية.',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'مطور برمجيات ويب',
        startDate: '2019-09',
        endDate: '2020-09',
        location: 'منطقة ليون، فرنسا',
        description: 'تطوير التطبيقات الويب وحلول البرمجيات. المشاركة في الهندسة المعمارية وتطوير الميزات الجديدة.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel', 'Vue.js'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI'
      }
    ],
    es: [
      {
        company: 'Advercity',
        position: 'Director de Tecnología (CTO)',
        startDate: '2024-02',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, Francia',
        description: 'Liderazgo técnico y estrategia tecnológica. Gestión de equipos de desarrollo y excelencia técnica en todos los proyectos.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Desarrollador Principal',
        startDate: '2022-09',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, Francia',
        description: 'Liderazgo de equipos de desarrollo y gestión de proyectos técnicos. Implementación de mejores prácticas y mentoría de desarrolladores junior.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Desarrollador Full Stack',
        startDate: '2020-09',
        endDate: '2022-09',
        location: 'Saint-Étienne, Rhône-Alpes, Francia',
        description: 'Desarrollo de aplicaciones full-stack y soluciones web. Arquitectura de bases de datos y desarrollo de APIs.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: 'Independiente',
        startDate: '2011-01',
        location: 'Remoto',
        description: 'Servicios de desarrollo freelance en diversas tecnologías e industrias. Desarrollo web, logos y soluciones digitales.',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'Desarrollador de Software Web',
        startDate: '2019-09',
        endDate: '2020-09',
        location: 'Región de Lyon, Francia',
        description: 'Desarrollo de aplicaciones web y soluciones de software. Participación en arquitectura y desarrollo de nuevas funcionalidades.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel', 'Vue.js'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI'
      }
    ],
    de: [
      {
        company: 'Advercity',
        position: 'Chief Technology Officer (CTO)',
        startDate: '2024-02',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, Frankreich',
        description: 'Technische Führung und Technologiestrategie. Leitung von Entwicklungsteams und technische Exzellenz in allen Projekten.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Lead Developer',
        startDate: '2022-09',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, Frankreich',
        description: 'Leitung von Entwicklungsteams und Management technischer Projekte. Implementierung von Best Practices und Mentoring von Junior-Entwicklern.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Full Stack Developer',
        startDate: '2020-09',
        endDate: '2022-09',
        location: 'Saint-Étienne, Rhône-Alpes, Frankreich',
        description: 'Full-Stack-Anwendungsentwicklung und Web-Lösungen. Datenbankarchitektur und API-Entwicklung.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: 'Freiberuflich',
        startDate: '2011-01',
        location: 'Remote',
        description: 'Freelance-Entwicklungsdienste in verschiedenen Technologien und Branchen. Webentwicklung, Logos und digitale Lösungen.',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'Web-Softwareentwickler',
        startDate: '2019-09',
        endDate: '2020-09',
        location: 'Lyon-Region, Frankreich',
        description: 'Web-Anwendungsentwicklung und Software-Lösungen. Teilnahme an Architektur und Entwicklung neuer Funktionen.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel', 'Vue.js'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI'
      }
    ],
    pt: [
      {
        company: 'Advercity',
        position: 'Diretor de Tecnologia (CTO)',
        startDate: '2024-02',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, França',
        description: 'Liderança técnica e estratégia tecnológica. Gestão de equipes de desenvolvimento e excelência técnica em todos os projetos.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Desenvolvedor Principal',
        startDate: '2022-09',
        location: 'Saint-Étienne, Auvergne-Rhône-Alpes, França',
        description: 'Liderança de equipes de desenvolvimento e gestão de projetos técnicos. Implementação de melhores práticas e mentoria de desenvolvedores júnior.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'Desenvolvedor Full Stack',
        startDate: '2020-09',
        endDate: '2022-09',
        location: 'Saint-Étienne, Rhône-Alpes, França',
        description: 'Desenvolvimento de aplicações full-stack e soluções web. Arquitetura de bancos de dados e desenvolvimento de APIs.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: 'Independente',
        startDate: '2011-01',
        location: 'Remoto',
        description: 'Serviços de desenvolvimento freelance em várias tecnologias e indústrias. Desenvolvimento web, logos e soluções digitais.',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'Desenvolvedor de Software Web',
        startDate: '2019-09',
        endDate: '2020-09',
        location: 'Região de Lyon, França',
        description: 'Desenvolvimento de aplicações web e soluções de software. Participação na arquitetura e desenvolvimento de novas funcionalidades.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel', 'Vue.js'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI'
      }
    ],
    ja: [
      {
        company: 'Advercity',
        position: '最高技術責任者（CTO）',
        startDate: '2024-02',
        location: 'サン・テティエンヌ、オーヴェルニュ・ローヌ・アルプ、フランス',
        description: '技術的リーダーシップと技術戦略。開発チームの管理とすべてのプロジェクトでの技術的卓越性。',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'リードデベロッパー',
        startDate: '2022-09',
        location: 'サン・テティエンヌ、オーヴェルニュ・ローヌ・アルプ、フランス',
        description: '開発チームのリーダーシップと技術プロジェクトの管理。ベストプラクティスの実装とジュニア開発者のメンタリング。',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: 'フルスタック開発者',
        startDate: '2020-09',
        endDate: '2022-09',
        location: 'サン・テティエンヌ、ローヌ・アルプ、フランス',
        description: 'フルスタックアプリケーション開発とWebソリューション。データベースアーキテクチャとAPI開発。',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: '独立',
        startDate: '2011-01',
        location: 'リモート',
        description: '様々な技術と業界でのフリーランス開発サービス。Web開発、ロゴ、デジタルソリューション。',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'Webソフトウェア開発者',
        startDate: '2019-09',
        endDate: '2020-09',
        location: 'リヨン地域、フランス',
        description: 'Webアプリケーション開発とソフトウェアソリューション。アーキテクチャと新機能の開発への参加。',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel', 'Vue.js'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI'
      }
    ],
    ko: [
      {
        company: 'Advercity',
        position: '최고기술책임자 (CTO)',
        startDate: '2024-02',
        location: '생테티엔, 오베르뉴-론-알프, 프랑스',
        description: '기술적 리더십과 기술 전략. 개발팀 관리 및 모든 프로젝트에서의 기술적 우수성.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: '리드 개발자',
        startDate: '2022-09',
        location: '생테티엔, 오베르뉴-론-알프, 프랑스',
        description: '개발팀 리더십과 기술 프로젝트 관리. 모범 사례 구현 및 주니어 개발자 멘토링.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: '풀스택 개발자',
        startDate: '2020-09',
        endDate: '2022-09',
        location: '생테티엔, 론-알프, 프랑스',
        description: '풀스택 애플리케이션 개발 및 웹 솔루션. 데이터베이스 아키텍처 및 API 개발.',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: '독립',
        startDate: '2011-01',
        location: '원격',
        description: '다양한 기술과 산업에서의 프리랜서 개발 서비스. 웹 개발, 로고, 디지털 솔루션.',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: '웹 소프트웨어 개발자',
        startDate: '2019-09',
        endDate: '2020-09',
        location: '리옹 지역, 프랑스',
        description: '웹 애플리케이션 개발 및 소프트웨어 솔루션. 아키텍처 및 신기능 개발 참여.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel', 'Vue.js'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI'
      }
    ],
    zh: [
      {
        company: 'Advercity',
        position: '首席技术官 (CTO)',
        startDate: '2024-02',
        location: '圣艾蒂安，奥弗涅-罗讷-阿尔卑斯，法国',
        description: '技术领导和技术战略。管理开发团队并在所有项目中实现技术卓越。',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony'],
        duration: formatDuration(calculateDuration('2024-02'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: '首席开发员',
        startDate: '2022-09',
        location: '圣艾蒂安，奥弗涅-罗讷-阿尔卑斯，法国',
        description: '领导开发团队和管理技术项目。实施最佳实践并指导初级开发人员。',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'Python', 'MySQL'],
        duration: formatDuration(calculateDuration('2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Advercity',
        position: '全栈开发员',
        startDate: '2020-09',
        endDate: '2022-09',
        location: '圣艾蒂安，罗讷-阿尔卑斯，法国',
        description: '全栈应用程序开发和Web解决方案。数据库架构和API开发。',
        technologies: ['JavaScript', 'Java', 'Angular', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
        duration: formatDuration(calculateDuration('2020-09', '2022-09'), lang),
        type: 'CDI'
      },
      {
        company: 'Freelancer.com',
        position: '独立',
        startDate: '2011-01',
        location: '远程',
        description: '各种技术和行业的自由职业开发服务。Web开发、标志和数字解决方案。',
        technologies: ['JavaScript', 'Java', 'PHP', 'Python', 'MySQL', 'Laravel', 'Symfony', 'HTML', 'CSS'],
        duration: formatDuration(calculateDuration('2011-01'), lang),
        type: 'Freelance'
      },
      {
        company: 'ANDRICE',
        position: 'Web软件开发员',
        startDate: '2019-09',
        endDate: '2020-09',
        location: '里昂地区，法国',
        description: 'Web应用程序开发和软件解决方案。参与架构和新功能开发。',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Laravel', 'Vue.js'],
        duration: formatDuration(calculateDuration('2019-09', '2020-09'), lang),
        type: 'CDI'
      }
    ]
  };

  return (experiencesData[lang as keyof typeof experiencesData] || experiencesData.en) as Experience[];
}

// Keep the original for backward compatibility
export const personalInfo = getPersonalInfo('en');

// Education data with translations
const educationTranslations = {
  fr: {
    degrees: {
      'Master': 'Master',
      'Licence': 'Licence', 
      'Baccalauréat': 'Baccalauréat'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': 'Informatique, Données et Systèmes Connectés',
      'Informatique': 'Informatique'
    },
    institutions: {
      'Université de Lyon': 'Université de Lyon',
      'Université Jean Monnet Saint-Étienne': 'Université Jean Monnet Saint-Étienne',
      'Université de Monastir': 'Université de Monastir',
      'Lycée Taha Hussein Tunis': 'Lycée Taha Hussein Tunis'
    },
    grades: {
      'Assez Bien': 'Assez Bien'
    }
  },
  en: {
    degrees: {
      'Master': 'Master\'s Degree',
      'Licence': 'Bachelor\'s Degree',
      'Baccalauréat': 'High School Diploma'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': 'Computer Science, Data and Connected Systems',
      'Informatique': 'Computer Science'
    },
    institutions: {
      'Université de Lyon': 'University of Lyon',
      'Université Jean Monnet Saint-Étienne': 'Jean Monnet University Saint-Étienne',
      'Université de Monastir': 'University of Monastir',
      'Lycée Taha Hussein Tunis': 'Taha Hussein High School Tunis'
    },
    grades: {
      'Assez Bien': 'Good'
    }
  },
  es: {
    degrees: {
      'Master': 'Maestría',
      'Licence': 'Licenciatura',
      'Baccalauréat': 'Bachillerato'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': 'Informática, Datos y Sistemas Conectados',
      'Informatique': 'Informática'
    },
    institutions: {
      'Université de Lyon': 'Universidad de Lyon',
      'Université Jean Monnet Saint-Étienne': 'Universidad Jean Monnet Saint-Étienne',
      'Université de Monastir': 'Universidad de Monastir',
      'Lycée Taha Hussein Tunis': 'Liceo Taha Hussein Túnez'
    },
    grades: {
      'Assez Bien': 'Bien'
    }
  },
  de: {
    degrees: {
      'Master': 'Master',
      'Licence': 'Bachelor',
      'Baccalauréat': 'Abitur'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': 'Informatik, Daten und vernetzte Systeme',
      'Informatique': 'Informatik'
    },
    institutions: {
      'Université de Lyon': 'Universität Lyon',
      'Université Jean Monnet Saint-Étienne': 'Jean Monnet Universität Saint-Étienne',
      'Université de Monastir': 'Universität Monastir',
      'Lycée Taha Hussein Tunis': 'Taha Hussein Gymnasium Tunis'
    },
    grades: {
      'Assez Bien': 'Gut'
    }
  },
  pt: {
    degrees: {
      'Master': 'Mestrado',
      'Licence': 'Licenciatura',
      'Baccalauréat': 'Ensino Médio'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': 'Informática, Dados e Sistemas Conectados',
      'Informatique': 'Informática'
    },
    institutions: {
      'Université de Lyon': 'Universidade de Lyon',
      'Université Jean Monnet Saint-Étienne': 'Universidade Jean Monnet Saint-Étienne',
      'Université de Monastir': 'Universidade de Monastir',
      'Lycée Taha Hussein Tunis': 'Colégio Taha Hussein Tunis'
    },
    grades: {
      'Assez Bien': 'Bom'
    }
  },
  ja: {
    degrees: {
      'Master': '修士号',
      'Licence': '学士号',
      'Baccalauréat': '高校卒業'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': '情報学、データと接続システム',
      'Informatique': '情報学'
    },
    institutions: {
      'Université de Lyon': 'リヨン大学',
      'Université Jean Monnet Saint-Étienne': 'ジャン・モネ大学サン・テティエンヌ',
      'Université de Monastir': 'モナスティール大学',
      'Lycée Taha Hussein Tunis': 'タハ・フセイン高校チュニス'
    },
    grades: {
      'Assez Bien': '良好'
    }
  },
  ko: {
    degrees: {
      'Master': '석사',
      'Licence': '학사',
      'Baccalauréat': '고등학교 졸업'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': '컴퓨터 과학, 데이터 및 연결된 시스템',
      'Informatique': '컴퓨터 과학'
    },
    institutions: {
      'Université de Lyon': '리옹 대학교',
      'Université Jean Monnet Saint-Étienne': '장 모네 대학교 생테티엔',
      'Université de Monastir': '모나스티르 대학교',
      'Lycée Taha Hussein Tunis': '타하 후세인 고등학교 튀니스'
    },
    grades: {
      'Assez Bien': '양호'
    }
  },
  zh: {
    degrees: {
      'Master': '硕士学位',
      'Licence': '学士学位',
      'Baccalauréat': '高中毕业'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': '计算机科学、数据和连接系统',
      'Informatique': '计算机科学'
    },
    institutions: {
      'Université de Lyon': '里昂大学',
      'Université Jean Monnet Saint-Étienne': '让·莫内大学圣艾蒂安',
      'Université de Monastir': '莫纳斯提尔大学',
      'Lycée Taha Hussein Tunis': '塔哈·侯赛因高中突尼斯'
    },
    grades: {
      'Assez Bien': '良好'
    }
  },
  ar: {
    degrees: {
      'Master': 'ماجستير',
      'Licence': 'إجازة',
      'Baccalauréat': 'بكالوريا'
    },
    fields: {
      'Informatique, Données et Systèmes Connectés': 'علوم الحاسوب، البيانات والأنظمة المتصلة',
      'Informatique': 'علوم الحاسوب'
    },
    institutions: {
      'Université de Lyon': 'جامعة ليون',
      'Université Jean Monnet Saint-Étienne': 'جامعة جان مونيه سانت إتيان',
      'Université de Monastir': 'جامعة المنستير',
      'Lycée Taha Hussein Tunis': 'ثانوية طه حسين تونس'
    },
    grades: {
      'Assez Bien': 'جيد'
    }
  }
};

export function getEducation(lang: string = 'fr'): Education[] {
  const translations = educationTranslations[lang as keyof typeof educationTranslations] || educationTranslations.en;
  
  return [
    {
      institution: translations.institutions['Université de Lyon'],
      degree: translations.degrees['Master'],
      field: translations.fields['Informatique, Données et Systèmes Connectés'],
      startDate: '2018',
      endDate: '2020'
    },
    {
      institution: translations.institutions['Université Jean Monnet Saint-Étienne'],
      degree: translations.degrees['Licence'],
      field: translations.fields['Informatique'],
      startDate: '2015',
      endDate: '2018'
    },
    {
      institution: translations.institutions['Université de Monastir'],
      degree: translations.degrees['Licence'],
      field: translations.fields['Informatique'],
      startDate: '2014',
      endDate: '2015'
    },
    {
      institution: translations.institutions['Lycée Taha Hussein Tunis'],
      degree: translations.degrees['Baccalauréat'],
      field: translations.fields['Informatique'],
      startDate: '2013',
      endDate: '2014',
      grade: translations.grades['Assez Bien']
    }
  ];
}

export const education: Education[] = getEducation('fr');

export const projects: Project[] = [
  {
    id: 'advercity-platform',
    title: 'Advercity Platform',
    description: 'Full-stack advertising platform with real-time analytics and campaign management.',
    longDescription: 'Led the development of a comprehensive advertising platform featuring real-time analytics, campaign management, and automated optimization. Built with modern web technologies and scalable architecture.',
    technologies: ['JavaScript', 'AngularJS', 'Java', 'MySQL', 'Redis'],
    category: 'fullstack',
    featured: true
  },
  {
    id: 'freelance-projects',
    title: 'Freelance Development Projects',
    description: 'Various web applications and software solutions for diverse clients.',
    longDescription: 'Delivered multiple web applications and software solutions across different industries, including e-commerce platforms, business management systems, and custom web applications.',
    technologies: ['JavaScript', 'PHP', 'Laravel', 'Symfony', 'MySQL', 'React'],
    category: 'web',
    featured: true
  },
  {
    id: 'database-architecture',
    title: 'Database Architecture Solutions',
    description: 'Designed and implemented scalable database architectures for enterprise applications.',
    longDescription: 'Specialized in designing and implementing robust database architectures for enterprise-level applications, ensuring optimal performance and scalability.',
    technologies: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'],
    category: 'backend',
    featured: false
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'cto-leadership-tips',
    title: 'Essential Leadership Tips for New CTOs',
    description: 'Key insights and strategies for technical leaders transitioning to CTO roles.',
    publishDate: '2024-09-20',
    tags: ['Leadership', 'CTO', 'Management'],
    featured: true,
    readingTime: 8,
    content: 'Content about CTO leadership...'
  },
  {
    id: 'fullstack-development',
    title: 'Modern Full-Stack Development Practices',
    description: 'Best practices and tools for building scalable full-stack applications.',
    publishDate: '2024-09-15',
    tags: ['Development', 'Full-Stack', 'Best Practices'],
    featured: true,
    readingTime: 12,
    content: 'Content about full-stack development...'
  },
  {
    id: 'team-management',
    title: 'Building High-Performance Development Teams',
    description: 'Strategies for creating and managing effective development teams.',
    publishDate: '2024-09-10',
    tags: ['Team Management', 'Development', 'Leadership'],
    featured: false,
    readingTime: 10,
    content: 'Content about team management...'
  }
];

// Testimonials data
export const testimonialsData = {
  fr: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: 'Client Freelancer',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Design de Logo',
      testimonial: 'Will hire again.',
      fullTestimonial: 'Excellent travail sur le design du logo pour notre centre islamique. Oussema a su comprendre nos besoins et livrer un design professionnel et adapté. Je recommande vivement ses services.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: 'Client Anonyme',
      company: 'Istanbul Jazz Cafe',
      role: 'Client Freelancer',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Design de Logo',
      testimonial: 'Very nice logo',
      fullTestimonial: 'Logo magnifique pour notre café jazz à Istanbul. Le design était parfaitement adapté à notre ambiance et notre identité. Travail de qualité professionnelle.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: 'Client Freelancer',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Design de Logo',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: 'Excellent travail! Très original. J\'adore votre design! Le logo avec le poing et les bâtons était parfaitement adapté à notre projet. Design créatif et professionnel.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: 'Président',
      image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: 'Plateforme web complexe',
      testimonial: 'Oussema a rejoint notre équipe en tant que développeur full-stack et a rapidement évolué jusqu\'au poste de CTO. Son expertise technique est remarquable.',
      fullTestimonial: 'Oussema a rejoint Advercity en 2020 en tant que développeur full-stack et a immédiatement impressionné par ses compétences techniques. En 2021, il est devenu Lead Developer grâce à sa capacité à diriger des projets complexes. En 2022, nous l\'avons promu CTO car il avait révolutionné notre approche technique. Il a mis en place une architecture scalable qui nous permet de gérer plus d\'un million de clics par mois. Son leadership technique et sa vision stratégique ont été déterminants pour notre croissance.',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: 'Directeur Commercial',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: 'Refonte de site web',
      testimonial: 'La refonte de notre site correspond exactement à nos attentes. Oussema a su livrer un projet qui dépasse nos espérances.',
      fullTestimonial: 'Nous avons été très satisfaits de la refonte de notre site web. Le nouveau site correspond exactement à nos attentes et nous sommes ravis du résultat. Après la livraison, nous avons eu besoin de quelques modifications et Oussema s\'est montré très réactif. Il a effectué les ajustements nécessaires sans problème, toujours avec le sourire. Nous sommes revenus vers lui 2 ou 3 fois et à chaque fois, il a su répondre à nos besoins rapidement et efficacement. Je recommande vivement ses services pour la qualité de son travail et son professionnalisme.',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: 'Fondatrice et Propriétaire',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: 'E-commerce Artisanal',
      testimonial: 'Oussema continue à travailler sur les évolutions et la maintenance de notre site depuis sa création en 2011. Nous sommes toujours contentes de sa collaboration.',
      fullTestimonial: 'Oussema développe et maintient notre plateforme e-commerce WordPress pour bijoux traditionnels tunisiens depuis 2011. Le site fonctionne parfaitement depuis sa création avec des ventes quotidiennes et des clients récurrents. Il assure une optimisation continue et une maintenance technique régulière. Nous sommes toujours très satisfaites de sa collaboration et de son professionnalisme. Le site est stable depuis 2011 et continue d\'évoluer grâce à ses améliorations constantes.',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'ERP Redesign',
      testimonial: 'Oussema a travaillé avec moi sur le projet de migration ERP. Son expertise en backend Java était impressionnante.',
      fullTestimonial: 'Oussema a travaillé avec moi sur le projet de migration ERP chez ANDRICE. Son expertise en backend Java était impressionnante. Il a réussi à migrer complètement notre ERP interne de Java vers Java JEE et Spring Boot. Les améliorations apportées aux processus de génération de contrats et d\'offres clients ont considérablement optimisé notre efficacité opérationnelle. Je recommande vivement ses compétences techniques et son professionnalisme.',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  en: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: 'Freelancer Client',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Logo Design',
      testimonial: 'Will hire again.',
      fullTestimonial: 'Excellent work on the logo design for our Islamic center. Oussema understood our needs and delivered a professional and suitable design. I highly recommend his services.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: 'Anonymous Client',
      company: 'Istanbul Jazz Cafe',
      role: 'Freelancer Client',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Logo Design',
      testimonial: 'Very nice logo',
      fullTestimonial: 'Beautiful logo for our jazz cafe in Istanbul. The design was perfectly suited to our atmosphere and identity. Professional quality work.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: 'Freelancer Client',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Logo Design',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: 'Excellent work! Very original. I love your design! The logo with the fist and sticks was perfectly suited to our project. Creative and professional design.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: 'President',
      image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: 'Complex web platform',
      testimonial: 'Oussema joined our team as a full-stack developer and quickly evolved to the CTO position. His technical expertise is remarkable.',
      fullTestimonial: 'Oussema joined Advercity in 2020 as a full-stack developer and immediately impressed with his technical skills. In 2021, he became Lead Developer thanks to his ability to lead complex projects. In 2022, we promoted him to CTO because he had revolutionized our technical approach. He implemented a scalable architecture that allows us to handle more than a million clicks per month. His technical leadership and strategic vision have been decisive for our growth.',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: 'Commercial Director',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: 'Website redesign',
      testimonial: 'The redesign of our website meets our expectations exactly. Oussema delivered a project that exceeds our hopes.',
      fullTestimonial: 'We were very satisfied with the redesign of our website. The new site meets our expectations exactly and we are delighted with the result. After delivery, we needed some modifications and Oussema was very responsive. He made the necessary adjustments without any problems, always with a smile. We came back to him 2 or 3 times and each time, he was able to respond to our needs quickly and efficiently. I highly recommend his services for the quality of his work and professionalism.',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: 'Founder & Owner',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: 'Artisanal E-commerce',
      testimonial: 'Oussema continues to work on the evolution and maintenance of our site since its creation in 2011. We are always happy with his collaboration.',
      fullTestimonial: 'Oussema develops and maintains our WordPress e-commerce platform for traditional Tunisian jewelry since 2011. The site works perfectly since its creation with daily sales and recurring customers. He ensures continuous optimization and regular technical maintenance. We are always very satisfied with his collaboration and professionalism. The site has been stable since 2011 and continues to evolve thanks to his constant improvements.',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'ERP Redesign',
      testimonial: 'Oussema worked with me on the ERP migration project. His Java backend expertise was impressive.',
      fullTestimonial: 'Oussema worked with me on the ERP migration project at ANDRICE. His Java backend expertise was impressive. He successfully migrated our entire internal ERP from Java to Java JEE and Spring Boot. The improvements made to contract generation and client offer processes have significantly optimized our operational efficiency. I highly recommend his technical skills and professionalism.',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  es: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: 'Cliente Freelancer',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Diseño de Logo',
      testimonial: 'Will hire again.',
      fullTestimonial: 'Excelente trabajo en el diseño del logo para nuestro centro islámico. Oussema entendió nuestras necesidades y entregó un diseño profesional y adecuado. Recomiendo altamente sus servicios.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: 'Cliente Anónimo',
      company: 'Istanbul Jazz Cafe',
      role: 'Cliente Freelancer',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Diseño de Logo',
      testimonial: 'Very nice logo',
      fullTestimonial: 'Hermoso logo para nuestro café de jazz en Estambul. El diseño era perfectamente adecuado para nuestra atmósfera e identidad. Trabajo de calidad profesional.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: 'Cliente Freelancer',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Diseño de Logo',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: '¡Excelente trabajo! Muy original. ¡Me encanta tu diseño! El logo con el puño y los palos era perfectamente adecuado para nuestro proyecto. Diseño creativo y profesional.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: 'Presidente',
      image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: 'Plataforma web compleja',
      testimonial: 'Oussema se unió a nuestro equipo como desarrollador full-stack y evolucionó rápidamente hasta el puesto de CTO. Su experiencia técnica es notable.',
      fullTestimonial: 'Oussema se unió a Advercity en 2020 como desarrollador full-stack e inmediatamente impresionó con sus habilidades técnicas. En 2021, se convirtió en Lead Developer gracias a su capacidad para liderar proyectos complejos. En 2022, lo promovimos a CTO porque había revolucionado nuestro enfoque técnico. Implementó una arquitectura escalable que nos permite manejar más de un millón de clics por mes. Su liderazgo técnico y visión estratégica han sido decisivos para nuestro crecimiento.',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: 'Director Comercial',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: 'Rediseño de sitio web',
      testimonial: 'El rediseño de nuestro sitio web cumple exactamente con nuestras expectativas. Oussema entregó un proyecto que supera nuestras esperanzas.',
      fullTestimonial: 'Estuvimos muy satisfechos con el rediseño de nuestro sitio web. El nuevo sitio cumple exactamente con nuestras expectativas y estamos encantados con el resultado. Después de la entrega, necesitamos algunas modificaciones y Oussema fue muy receptivo. Realizó los ajustes necesarios sin problemas, siempre con una sonrisa. Volvimos a él 2 o 3 veces y cada vez, supo responder a nuestras necesidades de manera rápida y eficiente. Recomiendo encarecidamente sus servicios por la calidad de su trabajo y profesionalismo.',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: 'Fundadora y Propietaria',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: 'E-commerce Artesanal',
      testimonial: 'Oussema continúa trabajando en las evoluciones y mantenimiento de nuestro sitio desde su creación en 2011. Siempre estamos contentas con su colaboración.',
      fullTestimonial: 'Oussema desarrolla y mantiene nuestra plataforma e-commerce WordPress para joyería tradicional tunecina desde 2011. El sitio funciona perfectamente desde su creación con ventas diarias y clientes recurrentes. Asegura una optimización continua y mantenimiento técnico regular. Siempre estamos muy satisfechas con su colaboración y profesionalismo. El sitio ha sido estable desde 2011 y continúa evolucionando gracias a sus mejoras constantes.',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'Rediseño ERP',
      testimonial: 'Oussema trabajó conmigo en el proyecto de migración ERP. Su experiencia en backend Java fue impresionante.',
      fullTestimonial: 'Oussema trabajó conmigo en el proyecto de migración ERP en ANDRICE. Su experiencia en backend Java fue impresionante. Logró migrar completamente nuestro ERP interno de Java a Java JEE y Spring Boot. Las mejoras realizadas en los procesos de generación de contratos y ofertas de clientes han optimizado significativamente nuestra eficiencia operacional. Recomiendo altamente sus habilidades técnicas y profesionalismo.',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  de: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: 'Freelancer Kunde',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Logo Design',
      testimonial: 'Will hire again.',
      fullTestimonial: 'Ausgezeichnete Arbeit am Logo-Design für unser islamisches Zentrum. Oussema verstand unsere Bedürfnisse und lieferte ein professionelles und passendes Design. Ich empfehle seine Dienste sehr.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: 'Anonymer Kunde',
      company: 'Istanbul Jazz Cafe',
      role: 'Freelancer Kunde',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Logo Design',
      testimonial: 'Very nice logo',
      fullTestimonial: 'Schönes Logo für unser Jazz-Café in Istanbul. Das Design war perfekt für unsere Atmosphäre und Identität geeignet. Professionelle Qualitätsarbeit.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: 'Freelancer Kunde',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Logo Design',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: 'Ausgezeichnete Arbeit! Sehr originell. Ich liebe Ihr Design! Das Logo mit der Faust und den Stöcken war perfekt für unser Projekt geeignet. Kreatives und professionelles Design.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: 'Vertriebsleiter',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: 'Website-Redesign',
      testimonial: 'Die Neugestaltung unserer Website entspricht genau unseren Erwartungen. Oussema hat ein Projekt geliefert, das unsere Hoffnungen übertrifft.',
      fullTestimonial: 'Wir waren sehr zufrieden mit der Neugestaltung unserer Website. Die neue Website entspricht genau unseren Erwartungen und wir sind begeistert vom Ergebnis. Nach der Lieferung benötigten wir einige Änderungen und Oussema war sehr reaktionsschnell. Er führte die notwendigen Anpassungen ohne Probleme durch, immer mit einem Lächeln. Wir sind 2 oder 3 Mal zu ihm zurückgekehrt und jedes Mal konnte er schnell und effizient auf unsere Bedürfnisse eingehen. Ich empfehle seine Dienstleistungen wärmstens für die Qualität seiner Arbeit und Professionalität.',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: 'Gründerin & Eigentümerin',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: 'Handwerklicher E-commerce',
      testimonial: 'Oussema arbeitet weiterhin an der Entwicklung und Wartung unserer Website seit ihrer Erstellung im Jahr 2011. Wir sind immer zufrieden mit seiner Zusammenarbeit.',
      fullTestimonial: 'Oussema entwickelt und wartet unsere WordPress E-Commerce-Plattform für traditionellen tunesischen Schmuck seit 2011. Die Website funktioniert perfekt seit ihrer Erstellung mit täglichen Verkäufen und wiederkehrenden Kunden. Er sorgt für kontinuierliche Optimierung und regelmäßige technische Wartung. Wir sind immer sehr zufrieden mit seiner Zusammenarbeit und Professionalität. Die Website ist seit 2011 stabil und entwickelt sich dank seiner konstanten Verbesserungen weiter.',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: 'Präsident',
        image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: 'Komplexe Webplattform',
      testimonial: 'Oussema trat unserem Team als Full-Stack-Entwickler bei und entwickelte sich schnell zur CTO-Position. Seine technische Expertise ist bemerkenswert.',
      fullTestimonial: 'Oussema trat Advercity 2020 als Full-Stack-Entwickler bei und beeindruckte sofort mit seinen technischen Fähigkeiten. 2021 wurde er Lead Developer dank seiner Fähigkeit, komplexe Projekte zu leiten. 2022 beförderten wir ihn zum CTO, weil er unseren technischen Ansatz revolutioniert hatte. Er implementierte eine skalierbare Architektur, die es uns ermöglicht, über eine Million Klicks pro Monat zu verarbeiten. Seine technische Führung und strategische Vision waren entscheidend für unser Wachstum.',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'ERP-Redesign',
      testimonial: 'Oussema arbeitete mit mir am ERP-Migrationsprojekt. Seine Java Backend-Expertise war beeindruckend.',
      fullTestimonial: 'Oussema arbeitete mit mir am ERP-Migrationsprojekt bei ANDRICE. Seine Java Backend-Expertise war beeindruckend. Er schaffte es, unser gesamtes internes ERP von Java zu Java JEE und Spring Boot zu migrieren. Die Verbesserungen an den Vertragsgenerierungs- und Kundenangebotsprozessen haben unsere operative Effizienz erheblich optimiert. Ich empfehle seine technischen Fähigkeiten und Professionalität sehr.',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  pt: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: 'Cliente Freelancer',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Design de Logo',
      testimonial: 'Will hire again.',
      fullTestimonial: 'Excelente trabalho no design do logo para nosso centro islâmico. Oussema entendeu nossas necessidades e entregou um design profissional e adequado. Recomendo altamente seus serviços.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: 'Cliente Anônimo',
      company: 'Istanbul Jazz Cafe',
      role: 'Cliente Freelancer',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Design de Logo',
      testimonial: 'Very nice logo',
      fullTestimonial: 'Lindo logo para nosso café de jazz em Istambul. O design era perfeitamente adequado para nossa atmosfera e identidade. Trabalho de qualidade profissional.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: 'Cliente Freelancer',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'Design de Logo',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: 'Excelente trabalho! Muito original. Adoro seu design! O logo com o punho e os bastões era perfeitamente adequado para nosso projeto. Design criativo e profissional.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: 'Diretor Comercial',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: 'Redesign de website',
      testimonial: 'O redesign do nosso site atende exatamente às nossas expectativas. Oussema entregou um projeto que supera nossas esperanças.',
      fullTestimonial: 'Ficamos muito satisfeitos com o redesign do nosso site. O novo site atende exatamente às nossas expectativas e estamos encantados com o resultado. Após a entrega, precisamos de algumas modificações e Oussema foi muito responsivo. Ele fez os ajustes necessários sem problemas, sempre com um sorriso. Voltamos a ele 2 ou 3 vezes e cada vez, ele soube responder às nossas necessidades de forma rápida e eficiente. Recomendo vivamente seus serviços pela qualidade de seu trabalho e profissionalismo.',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: 'Fundadora e Proprietária',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: 'E-commerce Artesanal',
      testimonial: 'Oussema continua trabalhando nas evoluções e manutenção do nosso site desde sua criação em 2011. Estamos sempre contentes com sua colaboração.',
      fullTestimonial: 'Oussema desenvolve e mantém nossa plataforma e-commerce WordPress para joias tradicionais tunisianas desde 2011. O site funciona perfeitamente desde sua criação com vendas diárias e clientes recorrentes. Ele garante otimização contínua e manutenção técnica regular. Estamos sempre muito satisfeitas com sua colaboração e profissionalismo. O site tem sido estável desde 2011 e continua evoluindo graças às suas melhorias constantes.',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: 'Presidente',
        image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: 'Plataforma web complexa',
      testimonial: 'Oussema juntou-se à nossa equipe como desenvolvedor full-stack e evoluiu rapidamente para a posição de CTO. Sua expertise técnica é notável.',
      fullTestimonial: 'Oussema juntou-se à Advercity em 2020 como desenvolvedor full-stack e impressionou imediatamente com suas habilidades técnicas. Em 2021, tornou-se Lead Developer graças à sua capacidade de liderar projetos complexos. Em 2022, promovemos ele a CTO porque havia revolucionado nossa abordagem técnica. Ele implementou uma arquitetura escalável que nos permite lidar com mais de um milhão de cliques por mês. Sua liderança técnica e visão estratégica foram decisivas para nosso crescimento.',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'Redesign ERP',
      testimonial: 'Oussema trabalhou comigo no projeto de migração ERP. Sua expertise em backend Java foi impressionante.',
      fullTestimonial: 'Oussema trabalhou comigo no projeto de migração ERP na ANDRICE. Sua expertise em backend Java foi impressionante. Ele conseguiu migrar completamente nosso ERP interno de Java para Java JEE e Spring Boot. As melhorias feitas nos processos de geração de contratos e ofertas de clientes otimizaram significativamente nossa eficiência operacional. Recomendo altamente suas habilidades técnicas e profissionalismo.',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  ja: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: 'フリーランサークライアント',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'ロゴデザイン',
      testimonial: 'Will hire again.',
      fullTestimonial: 'イスラムセンターのロゴデザインで素晴らしい仕事をしてくれました。Oussemaは私たちのニーズを理解し、プロフェッショナルで適切なデザインを提供してくれました。彼のサービスを強くお勧めします。',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: '匿名クライアント',
      company: 'Istanbul Jazz Cafe',
      role: 'フリーランサークライアント',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'ロゴデザイン',
      testimonial: 'Very nice logo',
      fullTestimonial: 'イスタンブールのジャズカフェの美しいロゴでした。デザインは私たちの雰囲気とアイデンティティに完璧に合っていました。プロフェッショナルな品質の仕事です。',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: 'フリーランサークライアント',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'ロゴデザイン',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: '素晴らしい仕事！とても独創的です。あなたのデザインが大好きです！拳と棒のロゴは私たちのプロジェクトに完璧に合っていました。創造的でプロフェッショナルなデザインです。',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: '営業部長',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: 'ウェブサイトリデザイン',
      testimonial: '私たちのウェブサイトのリデザインは、まさに私たちの期待に応えています。Oussemaは私たちの希望を超えるプロジェクトを提供しました。',
      fullTestimonial: '私たちのウェブサイトのリデザインに非常に満足しています。新しいサイトはまさに私たちの期待に応え、結果に喜んでいます。納品後、いくつかの修正が必要でしたが、Oussemaは非常に反応が良く、常に笑顔で必要な調整を問題なく行いました。私たちは2回または3回彼に戻りましたが、毎回、彼は迅速かつ効率的に私たちのニーズに対応することができました。彼の仕事の質とプロフェッショナリズムのために、彼のサービスを強くお勧めします。',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: '創設者・オーナー',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: '手工芸Eコマース',
      testimonial: 'Oussemaは2011年のサイト作成以来、進化とメンテナンスに継続的に取り組んでいます。私たちは常に彼の協力に満足しています。',
      fullTestimonial: 'Oussemaは2011年以来、伝統的なチュニジアのジュエリー用のWordPress Eコマースプラットフォームを開発・維持しています。サイトは作成以来完璧に機能し、毎日の売上とリピート顧客があります。彼は継続的な最適化と定期的な技術メンテナンスを確保しています。私たちは常に彼の協力とプロフェッショナリズムに非常に満足しています。サイトは2011年以来安定しており、彼の継続的な改善により進化し続けています。',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: '社長',
        image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: '複雑なウェブプラットフォーム',
      testimonial: 'AdvercityのCTOとして、Oussemasは私たちの技術アーキテクチャを変革しました。彼の戦略的ビジョンと専門知識により、数百万の訪問者を処理できるようになりました。',
      fullTestimonial: 'OussemasはAdvercityにCTOとして参加し、私たちの技術的アプローチを完全に革新しました。月間100万クリック以上を処理できるスケーラブルなアーキテクチャを実装しました。',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'ERPリデザイン',
      testimonial: 'OussemaはERP移行プロジェクトで私と一緒に働きました。彼のJavaバックエンドの専門知識は印象的でした。',
      fullTestimonial: 'OussemaはANDRICEのERP移行プロジェクトで私と一緒に働きました。彼のJavaバックエンドの専門知識は印象的でした。彼は内部ERPをJavaからJava JEEとSpring Bootに完全に移行することに成功しました。契約生成とクライアントオファープロセスの改善により、私たちの運営効率が大幅に最適化されました。彼の技術スキルとプロフェッショナリズムを強く推奨します。',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  ko: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: '프리랜서 클라이언트',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: '로고 디자인',
      testimonial: 'Will hire again.',
      fullTestimonial: '우리 이슬람 센터의 로고 디자인에서 훌륭한 작업을 해주었습니다. Oussema는 우리의 요구사항을 이해하고 전문적이고 적합한 디자인을 제공했습니다. 그의 서비스를 강력히 추천합니다.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: '익명 클라이언트',
      company: 'Istanbul Jazz Cafe',
      role: '프리랜서 클라이언트',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: '로고 디자인',
      testimonial: 'Very nice logo',
      fullTestimonial: '이스탄불의 우리 재즈 카페를 위한 아름다운 로고였습니다. 디자인은 우리의 분위기와 정체성에 완벽하게 맞았습니다. 전문적인 품질의 작업입니다.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: '프리랜서 클라이언트',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: '로고 디자인',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: '훌륭한 작업! 매우 독창적입니다. 당신의 디자인을 사랑합니다! 주먹과 막대기가 있는 로고는 우리 프로젝트에 완벽하게 맞았습니다. 창의적이고 전문적인 디자인입니다.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: '영업 이사',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: '웹사이트 리디자인',
      testimonial: '우리 웹사이트의 리디자인이 정확히 우리의 기대에 부합합니다. Oussema는 우리의 희망을 뛰어넘는 프로젝트를 제공했습니다.',
      fullTestimonial: '우리 웹사이트의 리디자인에 매우 만족했습니다. 새로운 사이트는 정확히 우리의 기대에 부합하며 결과에 만족합니다. 납품 후 몇 가지 수정이 필요했고 Oussema는 매우 반응적이었습니다. 그는 항상 미소를 지으며 문제없이 필요한 조정을 수행했습니다. 우리는 2-3번 그에게 돌아갔고, 매번 그는 빠르고 효율적으로 우리의 요구사항에 대응할 수 있었습니다. 그의 작업 품질과 전문성으로 인해 그의 서비스를 강력히 추천합니다.',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: '창립자 및 소유자',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: '수공예 전자상거래',
      testimonial: 'Oussema는 2011년 사이트 생성 이후 계속해서 진화와 유지보수에 노력하고 있습니다. 우리는 항상 그의 협력을 만족스럽게 생각합니다.',
      fullTestimonial: 'Oussema는 2011년부터 전통적인 튀니지 보석을 위한 WordPress 전자상거래 플랫폼을 개발하고 유지하고 있습니다. 사이트는 생성 이후 완벽하게 작동하며 일일 판매와 재방문 고객이 있습니다. 그는 지속적인 최적화와 정기적인 기술 유지보수를 보장합니다. 우리는 항상 그의 협력과 전문성에 매우 만족하고 있습니다. 사이트는 2011년부터 안정적이며 그의 지속적인 개선으로 계속 발전하고 있습니다.',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: '사장',
        image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: '복잡한 웹 플랫폼',
      testimonial: 'Advercity의 CTO로서 Oussema는 우리의 기술 아키텍처를 변화시켰습니다. 그의 전략적 비전과 전문성으로 수백만 방문자를 처리할 수 있게 되었습니다.',
      fullTestimonial: 'Oussema는 Advercity에 CTO로 합류하여 우리의 기술적 접근 방식을 완전히 혁신했습니다. 월 100만 클릭 이상을 처리할 수 있는 확장 가능한 아키텍처를 구현했습니다.',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'ERP 리디자인',
      testimonial: 'Oussema는 ERP 마이그레이션 프로젝트에서 저와 함께 일했습니다. 그의 Java 백엔드 전문성은 인상적이었습니다.',
      fullTestimonial: 'Oussema는 ANDRICE의 ERP 마이그레이션 프로젝트에서 저와 함께 일했습니다. 그의 Java 백엔드 전문성은 인상적이었습니다. 그는 내부 ERP를 Java에서 Java JEE와 Spring Boot로 완전히 마이그레이션하는 데 성공했습니다. 계약 생성 및 클라이언트 제안 프로세스의 개선으로 우리의 운영 효율성이 크게 최적화되었습니다. 그의 기술적 기술과 전문성을 강력히 추천합니다.',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  zh: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: '自由职业者客户',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: '标志设计',
      testimonial: 'Will hire again.',
      fullTestimonial: '为我们伊斯兰中心的标志设计做了出色的工作。Oussema理解我们的需求并提供了专业且合适的设计。我强烈推荐他的服务。',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: '匿名客户',
      company: 'Istanbul Jazz Cafe',
      role: '自由职业者客户',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: '标志设计',
      testimonial: 'Very nice logo',
      fullTestimonial: '为我们伊斯坦布尔爵士咖啡馆设计的美丽标志。设计完美地适合我们的氛围和身份。专业质量的工作。',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: '自由职业者客户',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: '标志设计',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: '出色的工作！非常原创。我爱你的设计！带有拳头和棍子的标志完美地适合我们的项目。创意和专业的设计。',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: '商务总监',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: '网站重新设计',
      testimonial: '我们网站的重新设计完全符合我们的期望。Oussema交付了一个超越我们希望的项目。',
      fullTestimonial: '我们对网站重新设计非常满意。新网站完全符合我们的期望，我们对结果感到高兴。交付后，我们需要一些修改，Oussema非常响应。他总是面带微笑，毫无问题地进行了必要的调整。我们回到他那里2-3次，每次他都能快速高效地回应我们的需求。我强烈推荐他的服务，因为他的工作质量和专业性。',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: '创始人兼所有者',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: '手工电商',
      testimonial: 'Oussema自2011年网站创建以来一直致力于网站的演进和维护。我们总是对他的合作感到满意。',
      fullTestimonial: 'Oussema自2011年以来一直开发和维护我们用于传统突尼斯珠宝的WordPress电商平台。网站自创建以来运行完美，有日常销售和回头客。他确保持续优化和定期技术维护。我们总是对他的合作和专业精神非常满意。网站自2011年以来一直稳定，并因他的持续改进而不断发展。',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: '总裁',
        image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: '复杂网络平台',
      testimonial: '作为Advercity的CTO，Oussema改变了我们的技术架构。他的战略眼光和专业知识使我们能够处理数百万访问者。',
      fullTestimonial: 'Oussema作为CTO加入Advercity，完全革新了我们的技术方法。他实施了可扩展的架构，使我们能够处理每月超过100万次点击。',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'ERP重新设计',
      testimonial: 'Oussema与我一起在ERP迁移项目中工作。他的Java后端专业知识令人印象深刻。',
      fullTestimonial: 'Oussema与我一起在ANDRICE的ERP迁移项目中工作。他的Java后端专业知识令人印象深刻。他成功地将我们的内部ERP从Java完全迁移到Java JEE和Spring Boot。对合同生成和客户报价流程的改进显著优化了我们的运营效率。我强烈推荐他的技术技能和专业精神。',
      projectUrl: 'https://andricegroup.com/'
    }
  ],
  ar: [
    // Freelancer.com recommendations (oldest - 2014)
    {
      id: 'freelancer-mohammed',
      name: 'Mohammed A.',
      company: 'Center',
      role: 'عميل مستقل',
      image: '/images/testimonials/mohammed.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'تصميم شعار',
      testimonial: 'Will hire again.',
      fullTestimonial: 'عمل ممتاز في تصميم الشعار لمركزنا الإسلامي. فهم Oussema احتياجاتنا وقدم تصميماً مهنياً ومناسباً. أنصح بشدة بخدماته.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-istanbul',
      name: 'عميل مجهول',
      company: 'Istanbul Jazz Cafe',
      role: 'عميل مستقل',
      image: '/images/testimonials/istanbul.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'تصميم شعار',
      testimonial: 'Very nice logo',
      fullTestimonial: 'شعار جميل لمقهى الجاز الخاص بنا في إسطنبول. كان التصميم مناسباً تماماً لأجواءنا وهويتنا. عمل بجودة مهنية.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'freelancer-crystal',
      name: 'Crystal T.',
      company: 'Find The Fallen',
      role: 'عميل مستقل',
      image: '/images/testimonials/crystal.webp',
      rating: 5,
      clientSince: '2014',
      projectType: 'تصميم شعار',
      testimonial: 'Great work! Very original. Love your design!',
      fullTestimonial: 'عمل ممتاز! أصلي جداً. أحب تصميمك! كان الشعار مع القبضة والعصي مناسباً تماماً لمشروعنا. تصميم إبداعي ومهني.',
      projectUrl: 'https://www.freelancer.com/u/trcoolmec'
    },
    {
      id: 'ahmed-scit',
      name: 'Ahmed M.',
      company: 'S.C.I.T',
      role: 'مدير تجاري',
        image: '/images/testimonials/ahmed.webp',
      rating: 5,
      clientSince: '2023',
      projectType: 'إعادة تصميم الموقع',
      testimonial: 'إعادة تصميم موقعنا تفي تماماً بتوقعاتنا. قدم Oussema مشروعاً يتجاوز آمالنا.',
      fullTestimonial: 'كنا راضين جداً عن إعادة تصميم موقعنا. الموقع الجديد يفي تماماً بتوقعاتنا ونحن سعداء بالنتيجة. بعد التسليم، احتجنا لبعض التعديلات وكان Oussema متجاوباً جداً. قام بالتعديلات اللازمة دون مشاكل، دائماً بابتسامة. عدنا إليه 2 أو 3 مرات وفي كل مرة، استطاع الرد على احتياجاتنا بسرعة وكفاءة. أنصح بشدة بخدماته لجودة عمله ومهنته.',
      projectUrl: 'https://scit-export.com/'
    },
    {
      id: 'sarah-elkhomssa',
      name: 'Sarah T.',
      company: 'El Khomssa',
      role: 'مؤسسة ومالكة',
        image: '/images/testimonials/sarah-t.webp',
      rating: 5,
      clientSince: '2011',
      projectType: 'تجارة إلكترونية حرفية',
      testimonial: 'يستمر Oussema في العمل على تطور وصيانة موقعنا منذ إنشائه في عام 2011. نحن دائماً راضيات عن تعاونه.',
      fullTestimonial: 'يطور Oussema ويحافظ على منصة التجارة الإلكترونية WordPress الخاصة بنا للمجوهرات التقليدية التونسية منذ عام 2011. يعمل الموقع بشكل مثالي منذ إنشائه مع مبيعات يومية وعملاء متكررين. يضمن التحسين المستمر والصيانة التقنية المنتظمة. نحن دائماً راضيات جداً عن تعاونه ومهنته. الموقع مستقر منذ عام 2011 ويستمر في التطور بفضل تحسيناته المستمرة.',
      projectUrl: 'https://elkhomssa.com/'
    },
    {
      id: 'pierre-antoine-advercity',
      name: 'Pierre-Antoine M.',
      company: 'Advercity',
      role: 'رئيس',
        image: '/images/testimonials/pierre-antoine.webp',
      rating: 5,
      clientSince: '2020',
      projectType: 'منصة ويب معقدة',
      testimonial: 'كمدير تقني في Advercity، حوّل Oussema هندستنا التقنية. رؤيته الاستراتيجية وخبرته مكنتنا من التعامل مع ملايين الزوار.',
      fullTestimonial: 'انضم Oussema إلى Advercity كمدير تقني وثور نهجنا التقني بالكامل. نفذ هندسة قابلة للتوسع تمكننا من التعامل مع أكثر من مليون نقرة شهرياً.',
      projectUrl: 'https://www.advercity.fr/'
    },
    {
      id: 'davy-andrice',
      name: 'Davy B.',
      company: 'ANDRICE',
      role: 'CTO',
      image: '/images/testimonials/davy.webp',
      rating: 5,
      clientSince: '2019',
      projectType: 'إعادة تصميم ERP',
      testimonial: 'عمل Oussema معي في مشروع ترحيل ERP. خبرته في Java Backend كانت مثيرة للإعجاب.',
      fullTestimonial: 'عمل Oussema معي في مشروع ترحيل ERP في ANDRICE. خبرته في Java Backend كانت مثيرة للإعجاب. نجح في ترحيل نظام ERP الداخلي بالكامل من Java إلى Java JEE وSpring Boot. التحسينات التي تمت على عمليات إنشاء العقود وعروض العملاء حسنت بشكل كبير من كفاءتنا التشغيلية. أنصح بشدة بمهاراته التقنية ومهنته.',
      projectUrl: 'https://andricegroup.com/'
    }
  ]
};

// Function to get testimonials by language
export function getTestimonials(lang: string): Testimonial[] {
  const testimonials = testimonialsData[lang as keyof typeof testimonialsData] || testimonialsData.en;
  // Move Freelancer testimonials to the end and sort by clientSince (newest first)
  const freelancerTestimonials = testimonials.filter(t => t.id.startsWith('freelancer-'));
  const otherTestimonials = testimonials.filter(t => !t.id.startsWith('freelancer-'));
  
  // Sort other testimonials by clientSince (newest first)
  const sortedOtherTestimonials = otherTestimonials.sort((a, b) => {
    const yearA = parseInt(a.clientSince);
    const yearB = parseInt(b.clientSince);
    return yearB - yearA; // Descending order (newest first)
  });
  
  return [...sortedOtherTestimonials, ...freelancerTestimonials];
}

// Export the functions
export { formatDate, formatDuration, calculateDuration };

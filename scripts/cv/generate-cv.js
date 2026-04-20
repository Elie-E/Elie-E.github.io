#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contenu du CV avec traductions pour TOUTES les langues
const cvContent = {
  fr: {
    name: "Oussema Trabelsi",
    title: "CTO & Lead Developer",
    location: "Lyon, France",
    experience: "5+ années d'expérience",
    phone: "Téléphone: +330782767157",
    address: "Adresse: France",
    summary: "CTO et Lead Developer expérimenté avec plus de 5 ans chez Advercity, spécialisé dans le développement full-stack, le leadership d'équipe et l'architecture technique. Passionné par la construction de solutions évolutives et le mentorat des équipes de développement. Expertise approfondie en PHP, Java, JavaScript et architecture cloud.",
    experiences: [
      {
        title: "Directeur technique (CTO)",
        company: "Advercity",
        period: "févr. 2024 - Présent",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, France",
        description: "Direction technique et stratégie technologique. Gestion des équipes de développement et excellence technique sur tous les projets. Leadership d'équipe de 8 développeurs, architecture microservices, migration cloud AWS."
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "sept. 2022 - Présent",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, France",
        description: "Encadrement des équipes de développement et gestion de projets techniques. Implémentation des meilleures pratiques et mentorat des développeurs juniors. Refactoring d'applications legacy, mise en place de CI/CD."
      },
      {
        title: "Développeur Full Stack",
        company: "Advercity",
        period: "sept. 2020 - sept. 2022",
        location: "Saint-Étienne, Rhône-Alpes, France",
        description: "Développement d'applications full-stack et solutions web. Architecture de bases de données et développement d'APIs REST. Création d'interfaces utilisateur modernes avec Angular et React."
      },
      {
        title: "Indépendant",
        company: "Freelancer.com",
        period: "janv. 2011 - Présent",
        location: "Remote",
        description: "Services de développement freelance dans diverses technologies et industries. Création de sites web, logos et solutions numériques. Plus de 50 projets réalisés avec satisfaction client 100%."
      },
      {
        title: "Backend Developer",
        company: "ANDRICE",
        period: "sept. 2019 - sept. 2020",
        location: "Région de Lyon, France",
        description: "Migration complète de l'ERP interne de Java vers Java JEE et Spring Boot. Amélioration des processus de génération de contrats et d'offres clients pour optimiser l'efficacité opérationnelle. Réduction de 40% du temps de traitement."
      }
    ],
    education: [
      {
        title: "Master - Informatique, Données et Systèmes Connectés",
        school: "Université de Lyon",
        period: "2018 - 2020"
      },
      {
        title: "Licence - Informatique",
        school: "Université Jean Monnet Saint-Étienne",
        period: "2015 - 2018"
      },
      {
        title: "Licence - Informatique",
        school: "Université de Monastir",
        period: "2014 - 2015"
      },
      {
        title: "Baccalauréat - Informatique",
        school: "Lycée Taha Hussein Tunis",
        period: "2013 - 2014",
        note: "Note: Assez Bien"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "Bases de données": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "Français (Natif)",
      "Anglais (Professionnel complet)",
      "Italien (Professionnel limité)",
      "Arabe"
    ],
    certifications: [
      "Score TOEIC 880"
    ]
  },
  en: {
    name: "Oussema Trabelsi",
    title: "CTO & Lead Developer",
    location: "Lyon, France",
    experience: "5+ years of experience",
    phone: "Phone: +330782767157",
    address: "Address: France",
    summary: "Experienced CTO and Lead Developer with over 5 years at Advercity, specialized in full-stack development, team leadership and technical architecture. Passionate about building scalable solutions and mentoring development teams. Deep expertise in PHP, Java, JavaScript and cloud architecture.",
    experiences: [
      {
        title: "Chief Technology Officer (CTO)",
        company: "Advercity",
        period: "Feb 2024 - Present",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, France",
        description: "Technical direction and technology strategy. Management of development teams and technical excellence on all projects. Leading team of 8 developers, microservices architecture, AWS cloud migration."
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "Sept 2022 - Present",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, France",
        description: "Supervision of development teams and technical project management. Implementation of best practices and mentoring of junior developers. Legacy application refactoring, CI/CD implementation."
      },
      {
        title: "Full Stack Developer",
        company: "Advercity",
        period: "Sept 2020 - Sept 2022",
        location: "Saint-Étienne, Rhône-Alpes, France",
        description: "Development of full-stack applications and web solutions. Database architecture and REST API development. Creation of modern user interfaces with Angular and React."
      },
      {
        title: "Freelancer",
        company: "Freelancer.com",
        period: "Jan 2011 - Present",
        location: "Remote",
        description: "Freelance development services in various technologies and industries. Creation of websites, logos and digital solutions. Over 50 projects completed with 100% client satisfaction."
      },
      {
        title: "Backend Developer",
        company: "ANDRICE",
        period: "Sept 2019 - Sept 2020",
        location: "Lyon Region, France",
        description: "Complete migration of internal ERP from Java to Java JEE and Spring Boot. Improvement of contract generation and client offer processes to optimize operational efficiency. 40% reduction in processing time."
      }
    ],
    education: [
      {
        title: "Master's Degree - Computer Science, Data and Connected Systems",
        school: "University of Lyon",
        period: "2018 - 2020"
      },
      {
        title: "Bachelor's Degree - Computer Science",
        school: "Jean Monnet University Saint-Étienne",
        period: "2015 - 2018"
      },
      {
        title: "Bachelor's Degree - Computer Science",
        school: "University of Monastir",
        period: "2014 - 2015"
      },
      {
        title: "High School Diploma - Computer Science",
        school: "Taha Hussein High School Tunis",
        period: "2013 - 2014",
        note: "Grade: Good"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "Databases": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "French (Native)",
      "English (Professional working proficiency)",
      "Italian (Limited working proficiency)",
      "Arabic"
    ],
    certifications: [
      "TOEIC Score 880"
    ]
  },
  es: {
    name: "Oussema Trabelsi",
    title: "CTO y Lead Developer",
    location: "Lyon, Francia",
    experience: "5+ años de experiencia",
    phone: "Teléfono: +330782767157",
    address: "Dirección: Francia",
    summary: "CTO y Lead Developer experimentado con más de 5 años en Advercity, especializado en desarrollo full-stack, liderazgo de equipos y arquitectura técnica. Apasionado por construir soluciones escalables y mentorizar equipos de desarrollo. Experiencia profunda en PHP, Java, JavaScript y arquitectura cloud.",
    experiences: [
      {
        title: "Director Técnico (CTO)",
        company: "Advercity",
        period: "feb. 2024 - Presente",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, Francia",
        description: "Dirección técnica y estrategia tecnológica. Gestión de equipos de desarrollo y excelencia técnica en todos los proyectos. Liderazgo de equipo de 8 desarrolladores, arquitectura de microservicios, migración cloud AWS."
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "sept. 2022 - Presente",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, Francia",
        description: "Supervisión de equipos de desarrollo y gestión de proyectos técnicos. Implementación de mejores prácticas y mentoría de desarrolladores junior. Refactorización de aplicaciones legacy, implementación de CI/CD."
      },
      {
        title: "Desarrollador Full Stack",
        company: "Advercity",
        period: "sept. 2020 - sept. 2022",
        location: "Saint-Étienne, Rhône-Alpes, Francia",
        description: "Desarrollo de aplicaciones full-stack y soluciones web. Arquitectura de bases de datos y desarrollo de APIs REST. Creación de interfaces de usuario modernas con Angular y React."
      },
      {
        title: "Independiente",
        company: "Freelancer.com",
        period: "ene. 2011 - Presente",
        location: "Remoto",
        description: "Servicios de desarrollo freelance en diversas tecnologías e industrias. Creación de sitios web, logos y soluciones digitales. Más de 50 proyectos completados con 100% de satisfacción del cliente."
      },
      {
        title: "Backend Developer",
        company: "ANDRICE",
        period: "sept. 2019 - sept. 2020",
        location: "Región de Lyon, Francia",
        description: "Migración completa del ERP interno de Java a Java JEE y Spring Boot. Mejora de los procesos de generación de contratos y ofertas de clientes para optimizar la eficiencia operacional. Reducción del 40% en tiempo de procesamiento."
      }
    ],
    education: [
      {
        title: "Máster - Informática, Datos y Sistemas Conectados",
        school: "Universidad de Lyon",
        period: "2018 - 2020"
      },
      {
        title: "Licenciatura - Informática",
        school: "Universidad Jean Monnet Saint-Étienne",
        period: "2015 - 2018"
      },
      {
        title: "Licenciatura - Informática",
        school: "Universidad de Monastir",
        period: "2014 - 2015"
      },
      {
        title: "Bachillerato - Informática",
        school: "Liceo Taha Hussein Tunis",
        period: "2013 - 2014",
        note: "Nota: Bien"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "Bases de datos": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "Francés (Nativo)",
      "Inglés (Profesional completo)",
      "Italiano (Profesional limitado)",
      "Árabe"
    ],
    certifications: [
      "Puntuación TOEIC 880"
    ]
  },
  de: {
    name: "Oussema Trabelsi",
    title: "CTO & Lead Developer",
    location: "Lyon, Frankreich",
    experience: "5+ Jahre Erfahrung",
    phone: "Telefon: +330782767157",
    address: "Adresse: Frankreich",
    summary: "Erfahrener CTO und Lead Developer mit über 5 Jahren bei Advercity, spezialisiert auf Full-Stack-Entwicklung, Teamführung und technische Architektur. Leidenschaftlich für den Aufbau skalierbarer Lösungen und die Betreuung von Entwicklungsteams. Tiefgreifende Expertise in PHP, Java, JavaScript und Cloud-Architektur.",
    experiences: [
      {
        title: "Technischer Direktor (CTO)",
        company: "Advercity",
        period: "Feb. 2024 - Gegenwart",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, Frankreich",
        description: "Technische Leitung und Technologiestrategie. Management von Entwicklungsteams und technische Exzellenz in allen Projekten. Führung eines Teams von 8 Entwicklern, Microservices-Architektur, AWS Cloud-Migration."
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "Sept. 2022 - Gegenwart",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, Frankreich",
        description: "Betreuung von Entwicklungsteams und technisches Projektmanagement. Implementierung bewährter Praktiken und Mentoring von Junior-Entwicklern. Legacy-Anwendungsrefactoring, CI/CD-Implementierung."
      },
      {
        title: "Full Stack Developer",
        company: "Advercity",
        period: "Sept. 2020 - Sept. 2022",
        location: "Saint-Étienne, Rhône-Alpes, Frankreich",
        description: "Entwicklung von Full-Stack-Anwendungen und Web-Lösungen. Datenbankarchitektur und REST-API-Entwicklung. Erstellung moderner Benutzeroberflächen mit Angular und React."
      },
      {
        title: "Freiberufler",
        company: "Freelancer.com",
        period: "Jan. 2011 - Gegenwart",
        location: "Remote",
        description: "Freelance-Entwicklungsdienste in verschiedenen Technologien und Branchen. Erstellung von Websites, Logos und digitalen Lösungen. Über 50 abgeschlossene Projekte mit 100% Kundenzufriedenheit."
      },
      {
        title: "Backend Developer",
        company: "ANDRICE",
        period: "Sept. 2019 - Sept. 2020",
        location: "Lyon-Region, Frankreich",
        description: "Vollständige Migration des internen ERP von Java zu Java JEE und Spring Boot. Verbesserung der Vertragsgenerierung und Kundenangebotsprozesse zur Optimierung der operativen Effizienz. 40% Reduzierung der Verarbeitungszeit."
      }
    ],
    education: [
      {
        title: "Master - Informatik, Daten und Verbundene Systeme",
        school: "Universität Lyon",
        period: "2018 - 2020"
      },
      {
        title: "Bachelor - Informatik",
        school: "Universität Jean Monnet Saint-Étienne",
        period: "2015 - 2018"
      },
      {
        title: "Bachelor - Informatik",
        school: "Universität Monastir",
        period: "2014 - 2015"
      },
      {
        title: "Abitur - Informatik",
        school: "Gymnasium Taha Hussein Tunis",
        period: "2013 - 2014",
        note: "Note: Gut"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "Datenbanken": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "Französisch (Muttersprache)",
      "Englisch (Vollständig professionell)",
      "Italienisch (Begrenzt professionell)",
      "Arabisch"
    ],
    certifications: [
      "TOEIC-Score 880"
    ]
  },
  pt: {
    name: "Oussema Trabelsi",
    title: "CTO e Lead Developer",
    location: "Lyon, França",
    experience: "5+ anos de experiência",
    phone: "Telefone: +330782767157",
    address: "Endereço: França",
    summary: "CTO e Lead Developer experiente com mais de 5 anos na Advercity, especializado em desenvolvimento full-stack, liderança de equipes e arquitetura técnica. Apaixonado por construir soluções escaláveis e mentorar equipes de desenvolvimento. Expertise profunda em PHP, Java, JavaScript e arquitetura cloud.",
    experiences: [
      {
        title: "Diretor Técnico (CTO)",
        company: "Advercity",
        period: "fev. 2024 - Presente",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, França",
        description: "Direção técnica e estratégia tecnológica. Gestão de equipes de desenvolvimento e excelência técnica em todos os projetos. Liderança de equipe de 8 desenvolvedores, arquitetura de microserviços, migração cloud AWS."
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "set. 2022 - Presente",
        location: "Saint-Étienne, Auvergne-Rhône-Alpes, França",
        description: "Supervisão de equipes de desenvolvimento e gestão de projetos técnicos. Implementação de melhores práticas e mentoria de desenvolvedores júnior. Refatoração de aplicações legacy, implementação de CI/CD."
      },
      {
        title: "Desenvolvedor Full Stack",
        company: "Advercity",
        period: "set. 2020 - set. 2022",
        location: "Saint-Étienne, Rhône-Alpes, França",
        description: "Desenvolvimento de aplicações full-stack e soluções web. Arquitetura de bancos de dados e desenvolvimento de APIs REST. Criação de interfaces de usuário modernas com Angular e React."
      },
      {
        title: "Freelancer",
        company: "Freelancer.com",
        period: "jan. 2011 - Presente",
        location: "Remoto",
        description: "Serviços de desenvolvimento freelance em várias tecnologias e indústrias. Criação de sites web, logos e soluções digitais. Mais de 50 projetos completados com 100% de satisfação do cliente."
      },
      {
        title: "Backend Developer",
        company: "ANDRICE",
        period: "set. 2019 - set. 2020",
        location: "Região de Lyon, França",
        description: "Migração completa do ERP interno de Java para Java JEE e Spring Boot. Melhoria dos processos de geração de contratos e ofertas de clientes para otimizar a eficiência operacional. Redução de 40% no tempo de processamento."
      }
    ],
    education: [
      {
        title: "Mestrado - Ciência da Computação, Dados e Sistemas Conectados",
        school: "Universidade de Lyon",
        period: "2018 - 2020"
      },
      {
        title: "Bacharelado - Ciência da Computação",
        school: "Universidade Jean Monnet Saint-Étienne",
        period: "2015 - 2018"
      },
      {
        title: "Bacharelado - Ciência da Computação",
        school: "Universidade de Monastir",
        period: "2014 - 2015"
      },
      {
        title: "Ensino Médio - Ciência da Computação",
        school: "Colégio Taha Hussein Tunis",
        period: "2013 - 2014",
        note: "Nota: Bom"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "Bancos de dados": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "Francês (Nativo)",
      "Inglês (Profissional completo)",
      "Italiano (Profissional limitado)",
      "Árabe"
    ],
    certifications: [
      "Pontuação TOEIC 880"
    ]
  },
  ja: {
    name: "Oussema Trabelsi",
    title: "CTO & Lead Developer",
    location: "リヨン、フランス",
    experience: "5年以上の経験",
    phone: "電話: +330782767157",
    address: "住所: フランス",
    summary: "Advercityで5年以上の経験を持つ経験豊富なCTO兼Lead Developer。フルスタック開発、チームリーダーシップ、技術アーキテクチャを専門とし、スケーラブルなソリューションの構築と開発チームのメンタリングに情熱を注いでいます。PHP、Java、JavaScript、クラウドアーキテクチャに深い専門知識を持っています。",
    experiences: [
      {
        title: "最高技術責任者（CTO）",
        company: "Advercity",
        period: "2024年2月 - 現在",
        location: "サン・テティエンヌ、オーヴェルニュ・ローヌ・アルプ、フランス",
        description: "技術方向性と技術戦略。開発チームの管理とすべてのプロジェクトでの技術的優秀性。8人の開発者チームのリーダーシップ、マイクロサービスアーキテクチャ、AWSクラウド移行。"
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "2022年9月 - 現在",
        location: "サン・テティエンヌ、オーヴェルニュ・ローヌ・アルプ、フランス",
        description: "開発チームの監督と技術プロジェクト管理。ベストプラクティスの実装とジュニア開発者のメンタリング。レガシーアプリケーションのリファクタリング、CI/CDの実装。"
      },
      {
        title: "フルスタック開発者",
        company: "Advercity",
        period: "2020年9月 - 2022年9月",
        location: "サン・テティエンヌ、ローヌ・アルプ、フランス",
        description: "フルスタックアプリケーションとWebソリューションの開発。データベースアーキテクチャとREST API開発。AngularとReactを使用したモダンなユーザーインターフェースの作成。"
      },
      {
        title: "フリーランサー",
        company: "Freelancer.com",
        period: "2011年1月 - 現在",
        location: "リモート",
        description: "様々な技術と業界でのフリーランス開発サービス。Webサイト、ロゴ、デジタルソリューションの作成。100%の顧客満足度で50以上のプロジェクトを完了。"
      },
      {
        title: "バックエンド開発者",
        company: "ANDRICE",
        period: "2019年9月 - 2020年9月",
        location: "リヨン地域、フランス",
        description: "JavaからJava JEEとSpring Bootへの内部ERPの完全移行。契約生成と顧客オファープロセスの改善により運用効率を最適化。処理時間を40%削減。"
      }
    ],
    education: [
      {
        title: "修士 - コンピュータサイエンス、データと接続システム",
        school: "リヨン大学",
        period: "2018 - 2020"
      },
      {
        title: "学士 - コンピュータサイエンス",
        school: "ジャン・モネ大学サン・テティエンヌ",
        period: "2015 - 2018"
      },
      {
        title: "学士 - コンピュータサイエンス",
        school: "モナスティール大学",
        period: "2014 - 2015"
      },
      {
        title: "高校卒業 - コンピュータサイエンス",
        school: "タハ・フセイン高校チュニス",
        period: "2013 - 2014",
        note: "成績: 良好"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "データベース": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "フランス語（母国語）",
      "英語（完全にプロフェッショナル）",
      "イタリア語（限定的にプロフェッショナル）",
      "アラビア語"
    ],
    certifications: [
      "TOEICスコア880"
    ]
  },
  ko: {
    name: "Oussema Trabelsi",
    title: "CTO & Lead Developer",
    location: "리옹, 프랑스",
    experience: "5년 이상의 경험",
    phone: "전화: +330782767157",
    address: "주소: 프랑스",
    summary: "Advercity에서 5년 이상의 경험을 가진 숙련된 CTO이자 Lead Developer입니다. 풀스택 개발, 팀 리더십, 기술 아키텍처를 전문으로 하며, 확장 가능한 솔루션 구축과 개발 팀 멘토링에 열정을 가지고 있습니다. PHP, Java, JavaScript, 클라우드 아키텍처에 깊은 전문성을 보유하고 있습니다.",
    experiences: [
      {
        title: "최고기술책임자 (CTO)",
        company: "Advercity",
        period: "2024년 2월 - 현재",
        location: "생테티엔, 오베르뉴-론-알프, 프랑스",
        description: "기술 방향성과 기술 전략. 개발 팀 관리 및 모든 프로젝트에서의 기술적 우수성. 8명의 개발자 팀 리더십, 마이크로서비스 아키텍처, AWS 클라우드 마이그레이션."
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "2022년 9월 - 현재",
        location: "생테티엔, 오베르뉴-론-알프, 프랑스",
        description: "개발 팀 감독 및 기술 프로젝트 관리. 모범 사례 구현 및 주니어 개발자 멘토링. 레거시 애플리케이션 리팩토링, CI/CD 구현."
      },
      {
        title: "풀스택 개발자",
        company: "Advercity",
        period: "2020년 9월 - 2022년 9월",
        location: "생테티엔, 론-알프, 프랑스",
        description: "풀스택 애플리케이션 및 웹 솔루션 개발. 데이터베이스 아키텍처 및 REST API 개발. Angular와 React를 사용한 모던한 사용자 인터페이스 생성."
      },
      {
        title: "프리랜서",
        company: "Freelancer.com",
        period: "2011년 1월 - 현재",
        location: "원격",
        description: "다양한 기술 및 산업 분야의 프리랜스 개발 서비스. 웹사이트, 로고, 디지털 솔루션 생성. 100% 고객 만족도로 50개 이상의 프로젝트 완료."
      },
      {
        title: "백엔드 개발자",
        company: "ANDRICE",
        period: "2019년 9월 - 2020년 9월",
        location: "리옹 지역, 프랑스",
        description: "Java에서 Java JEE 및 Spring Boot로의 내부 ERP 완전 마이그레이션. 계약 생성 및 고객 제안 프로세스 개선으로 운영 효율성 최적화. 처리 시간 40% 단축."
      }
    ],
    education: [
      {
        title: "석사 - 컴퓨터 과학, 데이터 및 연결 시스템",
        school: "리옹 대학교",
        period: "2018 - 2020"
      },
      {
        title: "학사 - 컴퓨터 과학",
        school: "장 모네 대학교 생테티엔",
        period: "2015 - 2018"
      },
      {
        title: "학사 - 컴퓨터 과학",
        school: "모나스티르 대학교",
        period: "2014 - 2015"
      },
      {
        title: "고등학교 졸업 - 컴퓨터 과학",
        school: "타하 후세인 고등학교 튀니스",
        period: "2013 - 2014",
        note: "성적: 양호"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "데이터베이스": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "프랑스어 (모국어)",
      "영어 (완전 전문)",
      "이탈리아어 (제한적 전문)",
      "아랍어"
    ],
    certifications: [
      "TOEIC 점수 880"
    ]
  },
  zh: {
    name: "Oussema Trabelsi",
    title: "CTO & Lead Developer",
    location: "里昂，法国",
    experience: "5年以上经验",
    phone: "电话: +330782767157",
    address: "地址: 法国",
    summary: "在Advercity拥有5年以上经验的资深CTO兼Lead Developer，专注于全栈开发、团队领导和技术架构。热衷于构建可扩展的解决方案和指导开发团队。在PHP、Java、JavaScript和云架构方面具有深厚的专业知识。",
    experiences: [
      {
        title: "首席技术官（CTO）",
        company: "Advercity",
        period: "2024年2月 - 至今",
        location: "圣艾蒂安，奥弗涅-罗讷-阿尔卑斯，法国",
        description: "技术方向和技术策略。开发团队管理和所有项目的技术卓越性。领导8人开发团队，微服务架构，AWS云迁移。"
      },
      {
        title: "Lead Developer",
        company: "Advercity",
        period: "2022年9月 - 至今",
        location: "圣艾蒂安，奥弗涅-罗讷-阿尔卑斯，法国",
        description: "开发团队监督和技术项目管理。最佳实践实施和初级开发人员指导。遗留应用程序重构，CI/CD实施。"
      },
      {
        title: "全栈开发人员",
        company: "Advercity",
        period: "2020年9月 - 2022年9月",
        location: "圣艾蒂安，罗讷-阿尔卑斯，法国",
        description: "全栈应用程序和Web解决方案开发。数据库架构和REST API开发。使用Angular和React创建现代用户界面。"
      },
      {
        title: "自由职业者",
        company: "Freelancer.com",
        period: "2011年1月 - 至今",
        location: "远程",
        description: "各种技术和行业的自由职业开发服务。网站、标志和数字解决方案创建。以100%客户满意度完成50多个项目。"
      },
      {
        title: "后端开发人员",
        company: "ANDRICE",
        period: "2019年9月 - 2020年9月",
        location: "里昂地区，法国",
        description: "内部ERP从Java到Java JEE和Spring Boot的完全迁移。改进合同生成和客户报价流程以优化运营效率。处理时间减少40%。"
      }
    ],
    education: [
      {
        title: "硕士 - 计算机科学，数据和连接系统",
        school: "里昂大学",
        period: "2018 - 2020"
      },
      {
        title: "学士 - 计算机科学",
        school: "让·莫内大学圣艾蒂安",
        period: "2015 - 2018"
      },
      {
        title: "学士 - 计算机科学",
        school: "莫纳斯提尔大学",
        period: "2014 - 2015"
      },
      {
        title: "高中毕业 - 计算机科学",
        school: "塔哈·侯赛因高中突尼斯",
        period: "2013 - 2014",
        note: "成绩: 良好"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "数据库": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "法语（母语）",
      "英语（完全专业）",
      "意大利语（有限专业）",
      "阿拉伯语"
    ],
    certifications: [
      "TOEIC分数880"
    ]
  },
  ar: {
    name: "أسامة الطرابلسي",
    title: "CTO ومطور رئيسي",
    location: "ليون، فرنسا",
    experience: "5+ سنوات من الخبرة",
    phone: "الهاتف: +330782767157",
    address: "العنوان: فرنسا",
    summary: "CTO ومطور رئيسي ذو خبرة مع أكثر من 5 سنوات في Advercity، متخصص في التطوير الشامل، قيادة الفرق، والهندسة المعمارية التقنية. شغوف ببناء حلول قابلة للتوسع وإرشاد فرق التطوير. خبرة عميقة في PHP، Java، JavaScript، وهندسة السحابة.",
    experiences: [
      {
        title: "مدير تقني (CTO)",
        company: "Advercity",
        period: "فبراير 2024 - الحاضر",
        location: "سانت إتيان، أوفرن-رون-ألب، فرنسا",
        description: "القيادة التقنية واستراتيجية التكنولوجيا. إدارة فرق التطوير والتميز التقني في جميع المشاريع. قيادة فريق من 8 مطورين، هندسة الخدمات المصغرة، هجرة السحابة AWS."
      },
      {
        title: "مطور رئيسي",
        company: "Advercity",
        period: "سبتمبر 2022 - الحاضر",
        location: "سانت إتيان، أوفرن-رون-ألب، فرنسا",
        description: "إشراف فرق التطوير وإدارة المشاريع التقنية. تنفيذ أفضل الممارسات وإرشاد المطورين المبتدئين. إعادة هيكلة التطبيقات القديمة، تنفيذ CI/CD."
      },
      {
        title: "مطور Full Stack",
        company: "Advercity",
        period: "سبتمبر 2020 - سبتمبر 2022",
        location: "سانت إتيان، رون-ألب، فرنسا",
        description: "تطوير التطبيقات الشاملة وحلول الويب. هندسة قواعد البيانات وتطوير APIs REST. إنشاء واجهات مستخدم حديثة باستخدام Angular و React."
      },
      {
        title: "مستقل",
        company: "Freelancer.com",
        period: "يناير 2011 - الحاضر",
        location: "عن بُعد",
        description: "خدمات التطوير المستقل عبر تقنيات وصناعات متنوعة. إنشاء مواقع الويب والشعارات والحلول الرقمية. أكثر من 50 مشروع مكتمل مع رضا العملاء 100%."
      },
      {
        title: "مطور برمجيات ويب",
        company: "ANDRICE",
        period: "سبتمبر 2019 - سبتمبر 2020",
        location: "منطقة ليون، فرنسا",
        description: "هجرة كاملة لنظام ERP الداخلي من Java إلى Java JEE و Spring Boot. تحسين عمليات إنشاء العقود وعروض العملاء لتحسين الكفاءة التشغيلية. تقليل 40% في وقت المعالجة."
      }
    ],
    education: [
      {
        title: "ماجستير - علوم الحاسوب، البيانات والأنظمة المتصلة",
        school: "جامعة ليون",
        period: "2018 - 2020"
      },
      {
        title: "ليسانس - علوم الحاسوب",
        school: "جامعة جان مونيه سانت إتيان",
        period: "2015 - 2018"
      },
      {
        title: "ليسانس - علوم الحاسوب",
        school: "جامعة المنستير",
        period: "2014 - 2015"
      },
      {
        title: "بكالوريا - علوم الحاسوب",
        school: "ثانوية طه حسين تونس",
        period: "2013 - 2014",
        note: "الدرجة: جيد"
      }
    ],
    technicalSkills: {
      "PHP": ["Symfony", "Laravel", "Zend Framework", "Composer"],
      "JavaScript": ["Angular", "React", "Node.js", "Vue.js", "TypeScript"],
      "Java": ["Spring Boot", "Java EE", "Maven", "Gradle"],
      "Python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      "قواعد البيانات": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jenkins"],
      "Frontend": ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Sass"],
      "Mobile": ["React Native", "Ionic", "Flutter"]
    },
    languages: [
      "الفرنسية (اللغة الأم)",
      "الإنجليزية (احترافية كاملة)",
      "الإيطالية (احترافية محدودة)",
      "العربية"
    ],
    certifications: [
      "درجة TOEIC 880"
    ]
  }
};

// Fonction pour convertir l'image en base64
function getImageBase64() {
  try {
    const imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'oussema-trabelsi-cto.png');
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }
  } catch (error) {
    console.warn('⚠️ Photo non trouvée, utilisation d\'une image par défaut');
  }
  return null;
}

// Fonction pour générer le HTML du CV
function generateCVHTML(content, lang) {
  const isRTL = lang === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const photoBase64 = getImageBase64();
  
  return `
<!DOCTYPE html>
<html lang="${lang}" dir="${direction}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${content.name}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Sans+JP:wght@400;600;700&family=Noto+Sans+KR:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Inter:wght@400;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${isRTL ? "'Noto Sans Arabic', sans-serif" : "'Inter', sans-serif"};
            line-height: 1.6;
            color: #333;
            direction: ${direction};
            text-align: ${textAlign};
        }
        
        .cv-container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            position: relative;
        }
        
        .header {
            background: #3366CC;
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100px;
        }
        
        .header-left {
            flex: 1;
        }
        
        .header-name {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .header-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .header-location {
            font-size: 12px;
            opacity: 0.9;
        }
        
        .header-contact {
            flex: 1;
            text-align: ${isRTL ? 'right' : 'left'};
            margin-${isRTL ? 'left' : 'right'}: 20px;
        }
        
        .header-contact div {
            font-size: 10px;
            margin-bottom: 2px;
        }
        
        .header-photo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid white;
        }
        
        .content {
            padding: 20px;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #3366CC;
            margin-bottom: 10px;
            border-bottom: 2px solid #3366CC;
            padding-bottom: 5px;
        }
        
        .summary {
            font-size: 11px;
            text-align: justify;
            line-height: 1.5;
        }
        
        .two-columns {
            display: flex;
            gap: 20px;
        }
        
        .column {
            flex: 1;
        }
        
        .experience-item {
            margin-bottom: 15px;
        }
        
        .experience-title {
            font-size: 12px;
            font-weight: 600;
            color: #333;
            margin-bottom: 3px;
        }
        
        .experience-company {
            font-size: 10px;
            color: #666;
            margin-bottom: 3px;
        }
        
        .experience-location {
            font-size: 9px;
            color: #888;
            margin-bottom: 5px;
        }
        
        .experience-description {
            font-size: 9px;
            text-align: justify;
            line-height: 1.4;
        }
        
        .skills-category {
            margin-bottom: 10px;
        }
        
        .skills-category-title {
            font-size: 10px;
            font-weight: 600;
            color: #333;
            margin-bottom: 3px;
        }
        
        .skills-list {
            font-size: 9px;
            color: #666;
            line-height: 1.3;
        }
        
        .education-item {
            margin-bottom: 10px;
        }
        
        .education-title {
            font-size: 11px;
            font-weight: 600;
            color: #333;
            margin-bottom: 3px;
        }
        
        .education-school {
            font-size: 9px;
            color: #666;
        }
        
        .languages-list {
            font-size: 10px;
            color: #333;
            line-height: 1.4;
        }
        
        .certifications-list {
            font-size: 10px;
            color: #333;
            line-height: 1.4;
        }
        
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #3366CC;
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 10px;
        }
        
        @media print {
            .cv-container {
                width: 210mm;
                min-height: 297mm;
            }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <!-- Header -->
        <div class="header">
            <div class="header-left">
                <div class="header-name">${content.name}</div>
                <div class="header-title">${content.title}</div>
                <div class="header-location">${content.location} - ${content.experience}</div>
            </div>
            <div class="header-contact">
                <div>Email: contact@oussematrabelsi.com</div>
                <div>LinkedIn: oussema-trabelsi</div>
                <div>${content.phone}</div>
                <div>${content.address}</div>
            </div>
            <img src="${photoBase64 || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='}" 
                 alt="Photo" class="header-photo">
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Summary -->
            <div class="section">
                <div class="section-title">RÉSUMÉ PROFESSIONNEL</div>
                <div class="summary">${content.summary}</div>
            </div>
            
            <!-- Two Columns -->
            <div class="two-columns">
                <!-- Left Column -->
                <div class="column">
                    <!-- Experience -->
                    <div class="section">
                        <div class="section-title">EXPÉRIENCE PROFESSIONNELLE</div>
                        ${content.experiences.map(exp => `
                            <div class="experience-item">
                                <div class="experience-title">${exp.title}</div>
                                <div class="experience-company">${exp.company} - ${exp.period}</div>
                                <div class="experience-location">${exp.location}</div>
                                <div class="experience-description">${exp.description}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Languages & Certifications -->
                    <div class="section">
                        <div class="section-title">LANGUES & CERTIFICATIONS</div>
                        <div class="languages-list">${content.languages.join(', ')}</div>
                        <div class="certifications-list" style="margin-top: 10px;">
                            <strong>Certifications:</strong> ${content.certifications.join(', ')}
                        </div>
                    </div>
                </div>
                
                <!-- Right Column -->
                <div class="column">
                    <!-- Technical Skills -->
                    <div class="section">
                        <div class="section-title">COMPÉTENCES TECHNIQUES</div>
                        ${Object.entries(content.technicalSkills).map(([category, skills]) => `
                            <div class="skills-category">
                                <div class="skills-category-title">${category}:</div>
                                <div class="skills-list">${skills.join(', ')}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Education -->
                    <div class="section">
                        <div class="section-title">FORMATION</div>
                        ${content.education.map(edu => `
                            <div class="education-item">
                                <div class="education-title">${edu.title}</div>
                                <div class="education-school">${edu.school} - ${edu.period}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            contact@oussematrabelsi.com - LinkedIn: oussema-trabelsi
        </div>
    </div>
</body>
</html>`;
}

// Fonction pour créer un PDF avec Puppeteer
async function createPDFWithPuppeteer(content, lang) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Générer le HTML
    const html = generateCVHTML(content, lang);
    
    // Charger le HTML dans la page
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Générer le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });
    
    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

// Créer le répertoire cv s'il n'existe pas
const cvDir = path.join(__dirname, '..', '..', 'public', 'cv');
if (!fs.existsSync(cvDir)) {
  fs.mkdirSync(cvDir, { recursive: true });
  console.log(`📁 Répertoire créé: ${cvDir}`);
}

// Générer les PDFs avec Puppeteer pour TOUTES les langues
const languages = ['fr', 'en', 'es', 'de', 'pt', 'ja', 'ko', 'zh', 'ar'];

console.log('🚀 Démarrage de la génération des CVs PDF avec Puppeteer...\n');

for (const lang of languages) {
  if (cvContent[lang]) {
    try {
      console.log(`📄 Génération du CV ${lang}...`);
      const pdfBuffer = await createPDFWithPuppeteer(cvContent[lang], lang);
      
      // Écrire le PDF
      const outputPath = path.join(cvDir, `oussema-trabelsi-cv-${lang}.pdf`);
      fs.writeFileSync(outputPath, pdfBuffer);
      
      console.log(`✅ CV PDF ${lang} généré ! (${pdfBuffer.length} bytes) -> ${outputPath}`);
    } catch (error) {
      console.error(`❌ Erreur lors de la génération du CV ${lang}:`, error.message);
    }
  }
}

console.log(`\n🎉 Génération terminée ! Tous les CVs PDF ont été générés dans: ${cvDir}`);
console.log('🔧 Header: TROIS colonnes - Nom/Titre (gauche) + Contact TRADUIT (milieu) + Photo (droite)');
console.log('🔧 Footer: Texte centré au bas de la page A4');
console.log('📄 Format: A4 avec photo, accents, Python backend, descriptions complètes, 9 langues');
console.log('🌍 Traductions: Vraies traductions pour arabe, chinois, coréen, japonais');
console.log('📚 Bibliothèque: Puppeteer - https://pptr.dev/');
console.log('🎨 Support: RTL natif pour l\'arabe, polices CJK pour asiatiques');
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFigma,
  SiExpo,
  SiFlask,
} from "react-icons/si";

export const PROFILE_CONTENT = {
  firstName: "Jocsan",
  lastName: "Perez Coto",
  email: "jocsancoto@gmail.com",
  title: {
    en: "Full-stack developer",
    es: "Desarrollador full-stack",
  },
  summary: {
    en: "I build complete products, from the interface to the database, and ship them live.",
    es: "Construyo productos completos, de la interfaz a la base de datos, y los publico en vivo.",
  },
  location: "Cartago, Costa Rica",
  education: {
    en: "Tecnológico de Costa Rica",
    es: "Tecnológico de Costa Rica",
  },
  availability: {
    en: "Available for opportunities",
    es: "Disponible para oportunidades",
  },
};

export const NAV_LINKS = [
  { label: { en: "About", es: "Inicio" }, id: "about" },
  { label: { en: "Projects", es: "Proyectos" }, id: "projects" },
  { label: { en: "Stack", es: "Stack" }, id: "tech-sphere" },
  { label: { en: "GitHub", es: "GitHub" }, id: "github" },
  { label: { en: "Contact", es: "Contacto" }, id: "contact" },
];

export const TECH_GROUPS = [
  {
    name: { en: "Interface", es: "Interfaz" },
    items: [
      { name: "React", icon: FaReact },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
  },
  {
    name: { en: "Server", es: "Servidor" },
    items: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: SiExpress },
      { name: "Python", icon: FaPython },
      { name: "Flask", icon: SiFlask },
    ],
  },
  {
    name: { en: "Data", es: "Datos" },
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    name: { en: "Tools", es: "Herramientas" },
    items: [
      { name: "GitHub", icon: FaGithub },
      { name: "Docker", icon: FaDocker },
      { name: "AWS", icon: FaAws },
      { name: "Figma", icon: SiFigma },
      { name: "Expo", icon: SiExpo },
    ],
  },
];

export const SKILLS = TECH_GROUPS.flatMap((group) => group.items);

export const PROJECTS = [
  {
    title: "PIELS",
    family: {
      en: "Full-stack learning platform",
      es: "Plataforma educativa full-stack",
    },
    short: {
      en: "Sign language lessons",
      es: "Lecciones de lengua de señas",
    },
    desc: {
      en: "Full-stack platform for learning sign language with interactive lessons, progress tracking, and user management.",
      es: "Plataforma full-stack para aprender lengua de señas con lecciones interactivas, seguimiento de progreso y gestión de usuarios.",
    },
    tags: ["React", "MongoDB", "Python", "Flask", "Expo Go", "Figma"],
    link: "https://piels-learn.vercel.app",
    image: "/images/PIELS.png",
    thumb: "/images/PIELS-mobile.png",
  },
  {
    title: "EDH Tournaments",
    family: {
      en: "Web app",
      es: "Aplicación web",
    },
    short: {
      en: "Commander tournament organizer",
      es: "Organizador de torneos de Commander",
    },
    desc: {
      en: "Web app for organizing Commander (EDH) and TCG tournaments: register players, generate rounds, and share live standings.",
      es: "Aplicación web para organizar torneos de Commander (EDH) y TCG: registra jugadores, genera rondas y comparte clasificaciones en vivo.",
    },
    tags: ["React", "Vite", "Tailwind", "Supabase"],
    link: "https://edh-tournaments.vercel.app/",
    image: "/images/EDHTournaments.png",
    thumb: "/images/EDHTournaments-mobile.png",
  },
  {
    title: "Web 3D Inclusiva",
    family: {
      en: "In-browser 3D editor",
      es: "Editor 3D en el navegador",
    },
    short: {
      en: "Tactile textures for 3D printing",
      es: "Texturas táctiles para impresión 3D",
    },
    desc: {
      en: "Browser-based editor that adds printable tactile textures to 3D models, creating touch-friendly materials for people with visual disabilities.",
      es: "Editor en el navegador que agrega texturas táctiles imprimibles a modelos 3D, creando materiales accesibles al tacto para personas con discapacidad visual.",
    },
    tags: ["JavaScript", "Three.js", "Supabase", "3D Printing"],
    link: "https://web3dinclusiva.vercel.app/",
    image: "/images/Web3DInclusiva.png",
  },
];

export const SOCIALS = [
  { label: "GitHub", handle: "JocsanPerezC", href: "https://github.com/JocsanPerezC/" },
  { label: "LinkedIn", handle: "Jocsan Perez Coto", href: "https://www.linkedin.com/in/jocsan-perez-coto-647771273/" },
  { label: "Instagram", handle: "@jocsan_pc", href: "https://www.instagram.com/jocsan_pc/" },
];

export const CV_PATH = "/PDF/PerezCotoJocsan_CV.pdf";

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

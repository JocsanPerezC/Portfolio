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
import { User, FolderGit2, Mail, Share2, Github, Cpu } from "lucide-react";

export const PROFILE_CONTENT = {
  firstName: "Jocsan",
  lastName: "Perez Coto",
  title: {
    en: "Software Developer",
    es: "Desarrollador Full-Stack",
  },
  location: {
    en: "Cartago, Costa Rica",
    es: "Cartago, Costa Rica",
  },
  availability: {
    en: "available for opportunities",
    es: "disponible para oportunidades",
  },
  typewriterPhrases: {
    en: [
      "I build digital experiences focused on clean interfaces, maintainable code and solutions that solve real problems.",
      "Technologies and tools I use to build interfaces, backends, and functional digital products.",
      "I'm open to opportunities, collaborations, and interesting projects.",
    ],
    es: [
      "Construyo experiencias digitales con foco en interfaces limpias, codigo mantenible y soluciones que resuelven problemas reales.",
      "Tecnologias y herramientas con las que construyo interfaces, backends y productos digitales funcionales.",
      "Estoy abierto a oportunidades, colaboraciones y proyectos interesantes.",
    ],
  },
};

export const NAV_LINKS = [
  { label: { en: "About", es: "Inicio" }, id: "about", icon: User },
  { label: { en: "Projects", es: "Proyectos" }, id: "projects", icon: FolderGit2 },
  { label: { en: "Tech", es: "Tecnologías" }, id: "tech-sphere", icon: Cpu },
  { label: { en: "GitHub", es: "GitHub" }, id: "github", icon: Github },
  { label: { en: "Contact", es: "Contacto" }, id: "contact", icon: Mail },
  { label: { en: "Socials", es: "Redes" }, id: "socials", icon: Share2 },
];

export const SKILLS = [
  { name: "React", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Python", icon: FaPython },
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS3", icon: FaCss3Alt },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Express", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "GitHub", icon: FaGithub },
  { name: "Figma", icon: SiFigma },
  { name: "MySQL", icon: SiMysql },
  { name: "AWS", icon: FaAws },
  { name: "Docker", icon: FaDocker },
  { name: "Flask", icon: SiFlask },
  { name: "Expo", icon: SiExpo },
];

export const PROJECTS = [
  {
    title: "PIELS",
    desc: {
      en: "Full-stack platform for learning sign language with interactive lessons, progress tracking, and user management.",
      es: "Plataforma full-stack para aprender lengua de señas con lecciones interactivas, seguimiento de progreso y gestión de usuarios.",
    },
    tags: ["React", "MongoDB", "Python", "Flask", "Expo Go", "Figma"],
    link: "https://piels-learn.vercel.app",
    image: "/images/PIELS.png",
  },
  {
    title: "EDH Tournaments",
    desc: {
      en: "Web app for organizing Commander (EDH) and TCG tournaments: register players, generate rounds, and share live standings.",
      es: "Aplicación web para organizar torneos de Commander (EDH) y TCG: registra jugadores, genera rondas y comparte clasificaciones en vivo.",
    },
    tags: ["React", "Vite", "Tailwind", "Supabase"],
    link: "https://edh-tournaments.vercel.app/",
    image: "/images/EDHTournaments.png",
  },
  {
    title: "Web 3D Inclusiva",
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
  { label: "GitHub", href: "https://github.com/JocsanPerezC/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jocsan-perez-coto-647771273/" },
  { label: "Instagram", href: "https://www.instagram.com/jocsan_pc/" },
];

export const CV_PATH = "/PDF/PerezCotoJocsan_CV.pdf";

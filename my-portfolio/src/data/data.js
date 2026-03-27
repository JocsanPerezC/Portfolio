import { 
  FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt,
  FaGitAlt, FaGithub, FaDocker, FaLinux, FaAws
} from "react-icons/fa";

import { 
  SiJavascript, SiTypescript, SiTailwindcss, SiExpress,
  SiPostgresql, SiMongodb, SiMysql, SiRedis,
  SiFigma, SiExpo, SiFlask
} from "react-icons/si";

import { User, Wrench, FolderGit2, Mail, Share2, Github } from "lucide-react";

export const NAV_LINKS = [
  { label: "About",    id: "about",    icon: User },
  { label: "GitHub",   id: "github",   icon: Github },
  { label: "Skills",   id: "skills",   icon: Wrench },
  { label: "Projects", id: "projects", icon: FolderGit2 },
  { label: "Contact",  id: "contact",  icon: Mail },
  { label: "Socials",  id: "socials",  icon: Share2 },
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
    desc: "Full-stack platform for learning sign language with interactive lessons, progress tracking, and user management.",
    tags: ["React", "MongoDB", "Python", "Flask", "Expo Go", "Figma"],
    link: "https://piels-learn.vercel.app",
    image: "/images/PIELS.png"
  },
  {
    title: "Gestion de Requerimientos",
    desc: "Full-stack platform for managing software projects and their associated requirements, activities, and tasks. ",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://github.com/JocsanPerezC/Proyecto-Requerimientos",
    image: "/images/Gestion_Requerimientos_Iniciar_Sesion.png"
  },
  {
    title: "Death Race",
    desc: "Death Race is a top-down arcade game built in C++ using the Allegro graphics library.",
    tags: ["C++", "Allegro"],
    link: "https://github.com/JocsanPerezC/Death_race",
    image: "/images/DeathRace.png"
  },
];

export const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/JocsanPerezC/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/jocsan-pérez-coto-647771273/" },
  { label: "Instagram", href: "https://www.instagram.com/jocsan_pc/" },
];

export const CV_PATH = "/PDF/PerezCotoJocsan_CV.pdf";
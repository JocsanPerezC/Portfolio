# My Portfolio

> Personal portfolio website — React + Vite + EmailJS

---

## Description

A personal portfolio built to showcase projects, skills, and contact information. It features a collapsible sidebar navigation, smooth scroll-based section tracking, an interactive contact form powered by EmailJS, and a downloadable CV. The layout is clean and responsive, with a dark aesthetic and subtle background effects.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Icons | react-icons, lucide-react |
| Contact Form | EmailJS (@emailjs/browser) |
| Styling | Plain CSS (per-component stylesheets) |
| Linting | ESLint |

---

## Features

### 🧭 Navigation
- Collapsible sidebar with smooth scroll to each section
- Active section tracking via IntersectionObserver
- Mobile-friendly toggle

### 👤 About
- Hero section with name, title, and short bio
- Profile photo display
- Downloadable CV button

### 🛠 Skills
- Visual grid of technologies with icons
- Covers frontend, backend, databases, DevOps, and design tools

### 📁 Projects
- Project cards with title, description, tags, and links
- Includes screenshots for each project

### 📬 Contact
- Contact form with name, email, and message fields
- Sent via EmailJS (no backend required)
- Success and error feedback states

### 🔗 Socials
- Links to GitHub, LinkedIn, and Instagram

---

## Project Structure

```
Portfolio-main/
└── my-portfolio/
    ├── public/
    │   ├── images/                 # Project screenshots and profile photo
    │   └── PDF/
    │       └── PerezCotoJocsan_CV.pdf
    ├── src/
    │   ├── App.jsx                 # Root layout, sidebar state, section observer
    │   ├── App.css                 # Global layout styles
    │   ├── main.jsx                # React entry point
    │   ├── index.css               # Base resets
    │   ├── components/
    │   │   ├── Hero.jsx            # About section — name, bio, CV download
    │   │   ├── Sidebar.jsx         # Collapsible navigation sidebar
    │   │   ├── Skills.jsx          # Skills icon grid
    │   │   ├── Projects.jsx        # Project cards
    │   │   ├── Contact.jsx         # EmailJS contact form
    │   │   └── Socials.jsx         # Social media links
    │   ├── data/
    │   │   └── data.js             # NAV_LINKS, SKILLS, PROJECTS, SOCIALS, CV_PATH
    │   └── styles/
    │       ├── hero.css
    │       ├── sidebar.css
    │       ├── skills.css
    │       ├── projects.css
    │       ├── contact.css
    │       └── socials.css
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

---

## Projects Showcased

| Project | Stack | Link |
|---|---|---|
| PIELS | React, MongoDB, Python, Flask, Expo Go, Figma | [piels-learn.vercel.app](https://piels-learn.vercel.app) |
| Gestion de Requerimientos | React, Node.js, PostgreSQL | [GitHub](https://github.com/JocsanPerezC/Proyecto-Requerimientos) |
| Death Race | C++, Allegro | [GitHub](https://github.com/JocsanPerezC/Death_race) |

---

## Skills Covered

`React` `Node.js` `Python` `HTML5` `CSS3` `JavaScript` `TypeScript` `Tailwind` `Express` `PostgreSQL` `MongoDB` `MySQL` `Redis` `Git` `GitHub` `Docker` `Linux` `AWS` `Flask` `Figma` `Expo`

---

## Setup & Run

### Prerequisites

- Node.js 18+
- An [EmailJS](https://www.emailjs.com/) account with a service, template, and public key set up

### Install & Dev Server

```bash
cd my-portfolio
npm install
npm run dev
# Runs on http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

### Environment Variables

Create a `.env` file in `my-portfolio/` with your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Customization

All content is centralized in `src/data/data.js`. To update the portfolio just edit that file:

- `NAV_LINKS` — sidebar navigation items
- `SKILLS` — skill icons and labels
- `PROJECTS` — project cards (title, description, tags, link, image)
- `SOCIALS` — social media links
- `CV_PATH` — path to the downloadable CV file

---

*Developed by Jocsan Pérez Coto — ITCR.*

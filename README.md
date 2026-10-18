# Yesuf Dergu — Developer Portfolio

A premium, dark-minimal personal portfolio website for **Yesuf Dergu** — Self-taught Developer, Full-Stack Developer, and Aspiring AI/ML Engineer based in Ethiopia.

Designed with a pure near-black canvas (`#0A0A0A`), crisp white typography, and subtle lime-green accents (`#A3E635`). Built for speed, responsiveness, accessibility, and straightforward content customization.

---

## ✦ Live Production Deployments

- **NegadeX (DSA Stock Trading Simulator):** [https://negadex.vercel.app/](https://negadex.vercel.app/)
- **YegnaFarm AI (Agricultural Intelligence):** [https://frontend-alpha-gray-52.vercel.app/](https://frontend-alpha-gray-52.vercel.app/)
- **CGC Woliso (University Innovation Platform):** [https://cgc-woliso.onrender.com/](https://cgc-woliso.onrender.com/)

### In Active Development ("Cooking")
- **De Larada E-Commerce Platform:** [dealrada-ecommerce-platform](https://github.com/YUD-west/dealrada-ecommerce-platform)
- **ScamShield AI:** [ScamShield-AI](https://github.com/YUD-west/ScamShield-AI)
- **Library Management System:** [library-management-system](https://github.com/YUD-west/library-management-system)
- **HomeNet (Local Network Discovery & Management)**
- **Urjii (Job Discovery & Matching Platform)**
- **Kefeta Youth Center Platform**

---

## ✦ Design Philosophy

- **Pure Dark Palette:** Near-black background (`#0A0A0A`), deep surface cards (`#111111`), and refined border contrast (`rgba(255, 255, 255, 0.08)`).
- **Subtle Lime Accents:** Vibrant `#A3E635` accents applied sparingly to active states, badges, and focus indicators.
- **Intentional Restraint:** Zero distracting blobs, unnecessary gradients, or generic AI-generated floaters. Focus is placed on strong typography, clean layout, and real software craftsmanship.
- **Micro-Interactions & Motion:** Smooth scrolling, active navigation section tracking, accessible modal transitions, and responsive touch states.
- **Accessible & Semantic:** Keyboard navigation friendly, semantic HTML landmarks (`<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`), high contrast ratios, and clear ARIA attributes.

---

## ✦ Website Sections

1. **Header & Navigation:** Sticky, translucent bar (`backdrop-blur-md`) with smooth-scrolling section links (`#home`, `#about`, `#projects`, `#experience`, `#skills`, `#achievements`, `#contact`), active section indicator, availability badge, and mobile drawer.
2. **Hero:** Confident introduction, role statement, location tag (Ethiopia), status indicator, direct project navigation, and direct social links (GitHub, LinkedIn, Telegram).
3. **About:** Narrative on Yesuf's self-taught journey, core engineering values (*Learn by Building*, *Practical Problem Solving*, *Craftsmanship & Restraint*), and quick profile facts.
4. **Featured Projects:** Showcases live applications and in-development systems with live deployment buttons, GitHub links, and deep-dive architecture modals.
5. **Experience:** Highlights development work on **Kefeta Youth Center**, **CGC Woliso Platform**, and participation in Ethiopian tech-community initiatives.
6. **Skills:** Structured into four categories: *Frontend Development*, *Backend & Systems*, *Programming & Tools*, and *AI & Machine Learning*.
7. **Achievements:** Features the 2nd place award at the **Ethiopian Cursor Community Hackathon** with key execution takeaways and editable notes.
8. **Contact:**
   - **Email:** [`yesufdergu464@gmail.com`](mailto:yesufdergu464@gmail.com) with one-click copy button
   - **GitHub:** [https://github.com/YUD-west](https://github.com/YUD-west)
   - **LinkedIn:** [https://www.linkedin.com/in/yusuf2537](https://www.linkedin.com/in/yusuf2537)
   - **Telegram:** [https://t.me/SatoshiFlash](https://t.me/SatoshiFlash)
   - **Direct Inquiry Composer:** Pre-filled subject & body email generator.
9. **Footer:** Minimal copyright, social links, and smooth back-to-top button.

---

## ✦ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Bundler & Dev Server:** Vite 6
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Fonts:** Inter & JetBrains Mono

---

## ✦ Getting Started

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### Installation
```bash
# Clone the repository
git clone https://github.com/YUD-west/portfolio.git

# Navigate to project folder
cd portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` to view the website in your browser.

### Production Build
```bash
# Build production bundle with TypeScript check
npm run build

# Preview production build locally
npm run preview
```

---

## ✦ Customization Guide

All personal information, project details, skills, and links are centralized in a single file:
👉 `src/data/portfolioData.ts`

### 1. Updating Contact Details
In `src/data/portfolioData.ts`, update `socials`:
```typescript
socials: {
  github: "https://github.com/YUD-west",
  linkedin: "https://www.linkedin.com/in/yusuf2537",
  telegram: "https://t.me/SatoshiFlash",
  email: "yesufdergu464@gmail.com"
}
```

### 2. Updating Project URLs & Repositories
In `src/data/portfolioData.ts`, each project under `projects` contains `githubUrl` and `liveUrl`:
```typescript
{
  id: "negadex",
  title: "NegadeX",
  githubUrl: "https://github.com/YUD-west/NegadeX-Trading-Simulator",
  liveUrl: "https://negadex.vercel.app/"
}
```

---

## ✦ Deployment

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. The included `vercel.json` ensures all route fallbacks resolve cleanly.

---

## ✦ License & Ownership

Created by **Yesuf Dergu**. All project content and code are open for personal customization.

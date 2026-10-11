# Cyber Guardians Club (CGC) — Official Website

> **Tagline:** Ideas into Impact.  
> **Institution:** Ambo University, Woliso Campus, Oromia, Ethiopia.  
> **Core Principle:** *Don't just attend events. Build things that matter.*

A modern, minimal, professional public web application for **CGC (Cyber Guardians Club)**, a student-led technology and innovation community uniting students from Information Technology, Informatics, Natural Sciences, Agricultural Sciences, Business, and Social Sciences.

---

## 1. Visual Identity & Brand System

The visual identity is anchored by a custom geometric **CGC lettermark** crafted on a 100×100 vector coordinate grid:
- **Guardian Shield Hexagon:** Represents defensive cybersecurity, resilient engineering, and student solidarity.
- **Geometric Monogram (C-G-C):** Custom geometric letterforms with clean chamfers and high legibility at micro-scales (favicons, badges) as well as vector print (certificates, presentations, T-shirts).
- **The Impact Node:** An energetic green spark positioned at the vertex of action, visually communicating "Ideas into Impact."

### Color Palette Tokens
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Midnight Navy** | `#0F172A` | Dominant canvas background & high-contrast foundation |
| **Electric Blue** | `#2563EB` | Primary brand action, digital trust, and interaction states |
| **Off-White** | `#F5F7FA` | Clean typography, subtle surfaces, and negative space |
| **Green Accent** | `#16A34A` | Growth, impact node, and active status indicators |

*Note: An interactive Visual Identity Inspector is built into the website (click the logo or "View Identity & Palette" in the footer) to copy hex tokens and review SVG specifications.*

---

## 2. Key Features & Architecture

### A. Home
- **Hero:** Geometric lettermark showcase, tagline *Ideas into Impact*, student-led community narrative, and clear calls to action.
- **Our Purpose:** Highlights hands-on practical learning, cross-department collaboration, and the open-community model.
- **5 Innovation Areas:** Quick access to all core learning tracks.
- **Featured Projects:** Active campus codebases with GitHub and demo links.
- **Upcoming Events:** In-person lab workshops and hybrid sessions with free seat reservation.
- **Participation Structure:** Visual distinction between the *Open Community* (free public access) and *Official Membership* (project cohorts).

### B. About CGC
- **Mission & Vision:** Clear statements grounded in the Ambo University Woliso Campus context.
- **4 Core Values:** *Innovation*, *Collaboration*, *Integrity*, and *Growth*.
- **The Evolution:** Traces the club's journey starting with IT undergraduates and expanding to all campus departments.
- **Woliso Campus Lab Facilities:** Information on Computer Lab 02 in the Main ICT Building.

### C. Explore (Innovation Tracks)
Detailed curricula, practical lab focus, tools stack, and linked projects for:
1. **Cybersecurity & Digital Defense** (Wireshark, Burp Suite, Nmap, Linux, OWASP, CTFs)
2. **Programming & Problem-Solving** (Data structures, contest algorithms, Python, C++, Java)
3. **Artificial Intelligence & Machine Learning** (Local datasets, computer vision, Afan Oromo / Amharic NLP)
4. **Software & Web Engineering** (React, TypeScript, Node.js, PostgreSQL, Tailwind CSS)
5. **Tech Entrepreneurship & Product Innovation** (Problem validation, Lean MVP, pitch decks)

### D. Projects & Innovation (Heart of the Website)
- **Multi-Faceted Filtering:** Search by keyword, track, status (*Active*, *Contributors Wanted*, *Incubating*, *Completed*), or origin (*CGC Initiated* vs *Student Proposed*).
- **Propose a Project:** Accessible form allowing any student to pitch a campus problem, recruit teammates, and save it dynamically to the live registry.
- **Join Team:** One-click application for members to join active project teams.
- **Honest Sample Content:** Transparent notices indicating that featured projects represent realistic campus problem models.

### E. Events & Activities
- **Timeline:** Toggle between *Upcoming Activities* and *Past Event Recaps*.
- **RSVP Registration:** Free seat reservation with instant downloadable/copyable digital **CGC Event Pass**.
- **Past Highlights:** Recaps of previous CTFs, Git bootcamps, and attendee numbers.

### F. Join CGC
- **Welcoming Onboarding:** Welcomes beginners and non-IT majors explicitly.
- **Accessible Application Form:** Captures name, email, phone/telegram, department, year, track, skill level, learning goals, and motivation.
- **Transparent Local Persistence:** Saves applications to the browser's persistent registry and produces a verified **CGC Digital Member Pass** with unique ID format (`CGC-WL-2026-XXXX`).

### G. Contact & Campus Presence
- **Physical Location:** Main ICT Building, Lab 02, Ambo University Woliso Campus, Oromia, Ethiopia.
- **Digital Channels:** Telegram (`@CGC_Woliso`), GitHub (`cgc-woliso`), and official email placeholder.
- **Inquiry Form & Interactive FAQ:** Searchable/filterable accordion answering common questions.

### H. Command Palette (`Ctrl + K` / `⌘K`)
- Instant site search for jumping directly to projects, events, tracks, or pages from anywhere in the application.

---

## 3. Technology Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS with custom CGC color tokens (`#0F172A`, `#2563EB`, `#F5F7FA`, `#16A34A`)
- **Icons:** Lucide React
- **Build Tool:** Vite 6 (fast compilation, production minification)
- **Persistence:** LocalStorage client registry (ready to bind to REST/Supabase backend)

---

## 4. Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone or navigate to the project directory
cd CGC

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Preview
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

The production server will be accessible at `http://localhost:3000/`.

---

## 5. Future Roadmap Ready
The modular architecture in `src/` is cleanly organized to add future backend integration:
- Student authentication & profile dashboards
- Idea board voting & community comments
- Member directory & public skill portfolios
- Course repository & lab schedule booking

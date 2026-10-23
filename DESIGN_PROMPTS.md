# CGC (Cyber Guardians Club) — UI Design Prompt Pack & Design System

A structured design specification and prompt pack for **Figma AI**, **v0.dev**, **Bolt.new**, **Relume**, **Galileo AI**, and **Midjourney**.

---

## 1. Design Tokens & Brand System (JSON)

```json
{
  "brand": {
    "name": "CGC (Cyber Guardians Club)",
    "institution": "Ambo University, Woliso Campus, Ethiopia",
    "tagline": "Ideas into Impact.",
    "motto": "Don't just attend events. Build things that matter.",
    "established": "2026"
  },
  "colors": {
    "background_canvas": "#0F172A",
    "surface_cards": "#111A2E",
    "surface_elevated": "#15213B",
    "borders_subtle": "#1E293B",
    "primary_action": "#2563EB",
    "primary_action_hover": "#3B82F6",
    "impact_accent_green": "#16A34A",
    "impact_green_glow": "rgba(22, 163, 74, 0.15)",
    "typography_heading": "#FFFFFF",
    "typography_body": "#F5F7FA",
    "typography_muted": "#94A3B8"
  },
  "typography": {
    "primary_font": "Inter, 'Plus Jakarta Sans', system-ui, sans-serif",
    "code_font": "'JetBrains Mono', 'Fira Code', monospace",
    "scale": {
      "hero_title": "64px / 1.1 line-height / 800 weight",
      "section_title": "36px / 1.2 line-height / 700 weight",
      "card_title": "20px / 1.3 line-height / 600 weight",
      "body": "15px / 1.6 line-height / 400 weight",
      "microcopy": "12px / 1.4 line-height / 500 weight"
    }
  },
  "layout_grid": {
    "columns": 12,
    "max_width": "1280px",
    "gutter": "24px",
    "spacing_base": "8px",
    "corner_radius": {
      "button": "10px",
      "card": "16px",
      "modal": "24px"
    }
  }
}
```

---

## 2. Tool-Specific Prompts

### A. Figma AI & Galileo AI (Component & Wireframe Prompt)
```text
System: You are an enterprise-grade UI/UX designer.
Task: Generate a high-fidelity web homepage for "CGC (Cyber Guardians Club)" at Ambo University, Woliso Campus.

Design Directive:
- Theme: Dark Mode. Canvas background #0F172A, card surfaces #111A2E, borders #1E293B.
- Primary CTA: #2563EB (Electric Blue). Accent: #16A34A (Impact Green).
- Typography: Plus Jakarta Sans / Inter. High contrast, generous whitespace.

Sections to Render:
1. Sticky Header:
   - Left: Geometric "CGC" shield lettermark + "Ambo University • Woliso Campus" label.
   - Center: Nav links (Home, About, Tracks, Projects, Events, Contact).
   - Right: "Search ⌘K" search pill + "Join CGC" primary button with pulsing green status dot.
2. Hero Section:
   - Pre-badge: "Student-Led Technology & Innovation Community • Woliso Campus".
   - Headline: "Ideas into Impact." with gradient highlight on "Impact".
   - Subhead: "A community uniting IT, Engineering, Agriculture, and Business students to learn, collaborate, and build software that matters."
   - Principle pill: "Don't just attend events. Build things that matter."
   - CTAs: Primary [Join CGC] + Secondary [Explore Projects].
   - Social proof ticker: "5 Tracks | 100% Student-Led | Active Campus Labs".
3. Track Grid (5 Cards):
   - Cybersecurity, Programming & Algorithms, Applied AI/ML, Software/Web, Tech Entrepreneurship.
   - Each card includes: Track icon, brief description, tag pills (#Wireshark, #PyTorch, #React), and "Explore Track ->".
4. Projects Showcase (3 Cards):
   - Card 1: "GuardianNet" (Defensive lab network monitor) | Badge: [Active] | Lead: Kalkidan T. (IT).
   - Card 2: "AgriVision Oromia" (Maize crop disease classifier) | Badge: [Student Proposed] | Lead: Tolera M. (Informatics + Plant Science).
   - Card 3: "Qajeelfama" (Offline academic notes sync) | Badge: [Open for Contributors] | Lead: Bonsa D. (CS).
   - Card actions: [View Code / GitHub], [Live Demo], [Join Team].
5. Event Schedule:
   - Date badge (e.g. OCT 24), title "Wireshark Packet Inspection Lab", location "Old Classroom ICT Building IT lab 01 and 06", time "2:30 PM EAT", action [Free RSVP].
6. Digital Member Pass Preview:
   - Credential card with ID "CGC-WL-2026-4821", student name "Bontu Desta", department "Information Technology", verified checkmark badge.
```

---

### B. v0.dev / Bolt.new / Lovable (Code Generation Prompt)
```text
Create a high-performance landing page in React, TypeScript, and Tailwind CSS for "CGC (Cyber Guardians Club)" at Ambo University, Woliso Campus, Ethiopia.

Design System:
- Colors: bg-[#0F172A], cards-[#111A2E], border-slate-800, text-white, blue-600, emerald-600.
- Modern, clean, minimal, collaborative, built for impact.
- Avoid generic cyberpunk or futuristic hacker clichés.

Interactive Features to Include:
- Interactive tab switcher between 5 innovation tracks (Cybersecurity, Programming, AI, Web, Entrepreneurship).
- Filterable projects directory by track, status (Active, Incubating, Open for Contributors), and origin (CGC Initiated vs Student Proposed).
- Modal for "Propose a Project Idea" that saves new ideas to local state.
- Modal for "Join This Project Team" with role selection.
- Event RSVP dialog that generates a digital ticket pass with an East Africa Time (EAT) schedule.
- Member onboarding application form with instant verified CGC Digital Pass card output.
- Global search shortcut (Ctrl+K).
```

---

### C. Midjourney / Ideogram / Visual Moodboard Prompt
```text
UI UX design of Cyber Guardians Club modern website homepage, Ambo University Woliso Campus Ethiopia, dark mode midnight navy #0F172A backdrop, sharp electric blue #2563EB buttons, green #16A34A accent nodes, geometric minimalist monogram logo in header, clean card layout, realistic student software projects showcase, high contrast typography, Dribbble top pick, Figma design system showcase, 8k resolution, flat vector clean UI, desktop screen presentation --ar 16:9 --v 6.1
```

---

## 3. Pro Tips for Realism in Design Tools

| Area | What Makes It Feel Real | Avoid |
| :--- | :--- | :--- |
| **Microcopy & Local Context** | Use real campus context: *"Old Classroom ICT Building IT lab 01 and 06"*, *"East Africa Time (EAT)"*, *"Ambo University"*, *"Telebirr API"*, *"Afan Oromo & Amharic NLP"*. | Generic dummy text like *"Lorem ipsum"* or fictional futuristic cities. |
| **Department Representation** | Show cross-department teams: *"Kalkidan T. (IT 3rd Year)"*, *"Tolera M. (Informatics + Plant Science)"*, *"Selamawit G. (Business Administration)"*. | Showing only stereotypical single-programmer teams. |
| **Realistic Status Badges** | Use actionable states: `Active`, `Open for Contributors`, `Incubating`, `Concept Review`. | Generic *"Coming Soon"* placeholders everywhere. |
| **Color Restraint** | 90% Midnight Navy (`#0F172A`) & Off-White (`#F5F7FA`), 8% Electric Blue (`#2563EB`), 2% Green Accent (`#16A34A`). | Over-saturated rainbow gradients or neon glowing purple laser lines. |
| **Component Hierarchy** | Include active states: Hover shadows (`0 0 25px -5px rgba(37,99,235,0.25)`), keyboard focus rings (`ring-2 ring-blue-500`), and modal backdrop blurs (`backdrop-blur-md`). | Flat static mockups without interaction affordances. |

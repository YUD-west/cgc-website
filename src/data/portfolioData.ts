import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Yesuf Dergu",
    role: "Self-taught Developer | Full-Stack Developer | Aspiring AI/ML Engineer",
    subRoles: [
      "Full-Stack Web Development",
      "Applied AI & Machine Learning",
      "Systems & Data Structures (DSA)"
    ],
    location: "Ethiopia",
    availability: "Available for engineering roles & collaborative projects",
    bioShort: "I build real-world software, learn by creating, and solve practical problems with modern web architecture, algorithmic thinking, and applied machine learning.",
    bioLong: [
      "I am a self-taught software developer based in Ethiopia. Rather than relying on traditional academic paths, I learned how to build resilient systems by tackling real problems hands-on — reading documentation, dissecting open-source codebases, and shipping projects from scratch.",
      "My development journey spans full-stack engineering with React, TypeScript, and Node.js, combined with deep explorations into data structures & algorithms (such as custom matching engines) and applied machine learning. I prioritize crafting clean, accessible user interfaces that communicate seamlessly with reliable backend services.",
      "From deploying production platforms like NegadeX, YegnaFarm AI, and CGC Woliso, to actively building projects like De Larada, ScamShield AI, and HomeNet, my philosophy remains constant: build software that is useful, dependable, and solves concrete human needs."
    ],
    coreValues: [
      {
        title: "Learn by Building",
        desc: "Theory solidifies when translated into working software. I grow my skills by writing code, refactoring architectures, and shipping complete solutions to production."
      },
      {
        title: "Practical Problem Solving",
        desc: "Software exists to solve real human and organizational problems. I prioritize pragmatic architecture and clean user experience over needless complexity."
      },
      {
        title: "Craftsmanship & Restraint",
        desc: "Writing maintainable, readable code with deliberate minimalism — in design, architecture, and technology selection."
      }
    ]
  },

  socials: {
    github: "https://github.com/YUD-west",
    linkedin: "https://www.linkedin.com/in/yusuf2537",
    telegram: "https://t.me/SatoshiFlash",
    email: "yesufdergu464@gmail.com"
  },

  projects: [
    // --- LIVE DEPLOYED PROJECTS ---
    {
      id: "negadex",
      title: "NegadeX",
      tagline: "Modern stock trading simulator powered by real DSA",
      description: "A high-performance simulated stock trading platform built with core data structures and algorithms. Features an in-memory order book matching engine utilizing heaps (priority queues), hash maps for O(1) balance tracking, binary search for price history scanning, and real-time trade execution.",
      category: "Systems & DSA",
      status: "Live",
      technologies: ["React", "TypeScript", "Tailwind CSS", "DSA", "Vite"],
      keyHighlights: [
        "In-memory order book matching engine simulating limit & market orders with heaps",
        "O(1) portfolio asset valuation and balance computation using hash maps",
        "Tactile dark terminal-inspired trading UI with responsive execution telemetry"
      ],
      problemSolved: "Traditional financial education lacks interactive, transparent platforms where learners can observe algorithmic order matching and exchange mechanics without real capital risk.",
      architectureNotes: "Pure client-side state architecture implementing priority queue order books, bid/ask spread tracking, and continuous trade settlement algorithms.",
      githubUrl: "https://github.com/YUD-west/NegadeX-Trading-Simulator",
      liveUrl: "https://negadex.vercel.app/",
      isFeatured: true
    },
    {
      id: "yegnafarm-ai",
      title: "YegnaFarm AI",
      tagline: "Agricultural intelligence and crop advisory platform",
      description: "A live agricultural technology platform providing practical, data-informed advisory tools for farmers. Designed to assist with crop observation, disease pattern recognition, localized weather insights, and sustainable agronomic guidance.",
      category: "AI & ML",
      status: "Live",
      technologies: ["React", "TypeScript", "Applied AI", "Python / REST", "Tailwind CSS"],
      keyHighlights: [
        "Live web application delivering practical decision support for agricultural workflows",
        "Crop condition monitoring and localized planting advisory guides",
        "Performance-optimized frontend engineered for low-bandwidth rural connections"
      ],
      problemSolved: "Bridging the information gap between scientific agricultural best practices and everyday smallholder farming decisions in Ethiopia.",
      architectureNotes: "Fast, responsive web client deployed on Vercel, decoupled from analytical backend models for high resilience and low latency.",
      githubUrl: "https://github.com/YUD-west/farmer-consult-platform",
      liveUrl: "https://frontend-alpha-gray-52.vercel.app/",
      isFeatured: true
    },
    {
      id: "cgc-woliso",
      title: "CGC Woliso",
      tagline: "Cyber Guardians Club university innovation platform",
      description: "The official public web platform for the Cyber Guardians Club at Ambo University, Woliso Campus. Facilitates student-led innovation across cybersecurity, AI, and software engineering with digital member passes, workshop registrations, and campus project incubation.",
      category: "Civic Tech",
      status: "Live",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "SQLite"],
      keyHighlights: [
        "Production platform serving students and faculty across multiple university departments",
        "Digital member pass verification system with downloadable ID cards",
        "Dynamic student project proposal incubator and team recruitment workflows"
      ],
      problemSolved: "Centralizing campus technology initiatives, workshop announcements, and student project collaborations into a unified digital hub.",
      architectureNotes: "Full-stack React SPA backed by an Express/SQLite persistent backend, containerized and deployed live on Render with continuous operation.",
      githubUrl: "https://github.com/YUD-west",
      liveUrl: "https://cgc-woliso.onrender.com/",
      isFeatured: true
    },

    // --- COOKING / IN DEVELOPMENT PROJECTS ---
    {
      id: "dealrada",
      title: "De Larada",
      tagline: "Modern minimalist e-commerce storefront platform",
      description: "A streamlined digital retail platform featuring dynamic catalog navigation, responsive attribute filtering, cart state management, and an accessible checkout flow designed with high typographic clarity.",
      category: "E-Commerce",
      status: "In Development",
      technologies: ["React", "TypeScript", "Tailwind CSS", "State Architecture"],
      keyHighlights: [
        "Instant multi-attribute product filtering by category, price, and stock",
        "Client-side cart orchestration with real-time subtotal and tax calculation",
        "Deliberate, tactile card hover interactions and keyboard-friendly checkout"
      ],
      problemSolved: "Building an end-to-end e-commerce user experience with zero layout shift, snappy client transitions, and clean state isolation.",
      architectureNotes: "Modular component tree with typed shopping cart state reducers and decoupled product data fixtures.",
      githubUrl: "https://github.com/YUD-west/dealrada-ecommerce-platform",
      liveUrl: "",
      isFeatured: true
    },
    {
      id: "scamshield-ai",
      title: "ScamShield AI",
      tagline: "AI-powered fraud detection & scam identification",
      description: "A cybersecurity and machine learning initiative designed to protect everyday users from deceptive communication, social engineering attacks, and fraudulent payment solicitations.",
      category: "AI & ML",
      status: "In Development",
      technologies: ["Python", "NLP", "Machine Learning", "FastAPI / React"],
      keyHighlights: [
        "Text classification heuristics detecting deceptive phrasing and urgency cues",
        "Confidence-scored risk assessment with explainable scam factor breakdowns",
        "Lightweight API design ready for browser extension or mobile client integration"
      ],
      problemSolved: "Digital scams and mobile payment fraud are rapidly escalating, requiring accessible heuristic and machine learning defenses.",
      architectureNotes: "Natural language processing pipelines evaluating syntactical patterns, deceptive URLs, and anomalous payment requests.",
      githubUrl: "https://github.com/YUD-west/ScamShield-AI",
      liveUrl: "",
      isFeatured: true
    },
    {
      id: "library-management-system",
      title: "Library Management System",
      tagline: "Institutional catalog, circulation & inventory platform",
      description: "A structured full-stack library management system designed to track institutional book collections, patron checkout histories, automated overdue notices, and catalog search.",
      category: "Full-Stack",
      status: "In Development",
      technologies: ["React", "TypeScript", "Node.js", "Express", "Database Systems"],
      keyHighlights: [
        "Book catalog indexing with ISBN lookup, genre categorization, and shelf location",
        "Patron circulation management, lending limits, and reservation queues",
        "Administrative metrics dashboard for circulation statistics and inventory health"
      ],
      problemSolved: "Replacing manual ledger tracking with an automated, searchable digital catalogue and patron management system.",
      architectureNotes: "Relational database schema with transactional lending flows and role-based staff administration.",
      githubUrl: "https://github.com/YUD-west/library-management-system",
      liveUrl: "",
      isFeatured: false
    },
    {
      id: "homenet",
      title: "HomeNet",
      tagline: "Local network intelligence & device management hub",
      description: "A systems and networking tool designed for local area network discovery, device inventory monitoring, latency diagnostic metrics, and home network traffic visibility.",
      category: "Networking",
      status: "In Development",
      technologies: ["Python", "Networking Protocols", "React", "TypeScript", "REST"],
      keyHighlights: [
        "Automated local subnet scanning and active host IP/MAC identification",
        "Real-time ping, packet latency, and connection stability metrics",
        "Intuitive dashboard for monitoring bandwidth consumption and device status"
      ],
      problemSolved: "Providing straightforward visibility into connected home network devices and connection reliability without complicated enterprise software.",
      architectureNotes: "Lightweight local discovery agent paired with a clean web dashboard for network diagnostics.",
      githubUrl: "https://github.com/YUD-west",
      liveUrl: "",
      isFeatured: false
    },
    {
      id: "urjii",
      title: "Urjii",
      tagline: "Job discovery and opportunity matching platform",
      description: "A modern web platform connecting talent with relevant career and contract opportunities through structured category filtering, applicant profiles, and direct discovery pathways.",
      category: "Full-Stack",
      status: "In Development",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs"],
      keyHighlights: [
        "Structured search and multi-criteria role filtering (location, skill set, work type)",
        "Mobile-optimized job feed tailored for accessible user engagement",
        "Clean candidate profile data model and opportunity matching"
      ],
      problemSolved: "Simplifying fragmented job searching with a focused, minimal interface that highlights essential details quickly.",
      architectureNotes: "Modular React and TypeScript architecture prepared for REST backend integration.",
      githubUrl: "https://github.com/YUD-west",
      liveUrl: "",
      isFeatured: false
    },
    {
      id: "kefeta",
      title: "Kefeta Youth Center",
      tagline: "Youth empowerment center digital platform",
      description: "A dedicated digital hub developed for the Kefeta Youth Center community. Serves as an information center and activity coordination platform to showcase programs, share resources, and engage young people.",
      category: "Civic Tech",
      status: "Active Project",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Modern Web APIs"],
      keyHighlights: [
        "Centralized directory for upcoming youth workshops, training, and events",
        "Digital resource portal for educational materials and youth guides",
        "Accessible, high-contrast user interface tailored for diverse device access"
      ],
      problemSolved: "Coordinating youth development programs and distributing educational resources across local communities.",
      architectureNotes: "Lightweight, performance-tuned frontend with semantic HTML and zero heavy layout overhead.",
      githubUrl: "https://github.com/YUD-west",
      liveUrl: "",
      isFeatured: false
    }
  ],

  experiences: [
    {
      id: "exp-kefeta",
      role: "Full-Stack Development Contributor",
      organization: "Kefeta Youth Center Platform",
      period: "2024 — Present",
      location: "Ethiopia",
      description: "Leading the development and iteration of the digital platform for Kefeta Youth Center, creating reliable tools for youth engagement, program awareness, and community resources.",
      highlights: [
        "Architected responsive web pages to present youth initiatives, workshops, and local programs",
        "Implemented clear information architecture allowing non-technical staff to organize community updates",
        "Focused on performance and cross-device compatibility to support users on varied network speeds"
      ],
      skillsUsed: ["React", "TypeScript", "Tailwind CSS", "UI/UX Architecture", "Community Tech"]
    },
    {
      id: "exp-cgc",
      role: "Lead Platform Developer & Community Lead",
      organization: "Cyber Guardians Club (CGC Woliso)",
      period: "2024 — Present",
      location: "Woliso, Ethiopia",
      description: "Architected, built, and deployed the official CGC platform on Render, enabling hundreds of students to register for tech cohorts, generate digital event passes, and propose campus software projects.",
      highlights: [
        "Engineered full-stack platform with React, TypeScript, Express, and persistent SQLite database",
        "Implemented verifiable digital pass generation system with QR codes and high-contrast card styling",
        "Maintained 100% live uptime on Render for campus community activities"
      ],
      skillsUsed: ["Full-Stack Architecture", "Node.js", "Express", "SQLite", "React", "Render Deployment"]
    },
    {
      id: "exp-community",
      role: "Active Contributor & Peer Developer",
      organization: "Ethiopian Tech Community Initiatives",
      period: "2023 — Present",
      location: "Ethiopia",
      description: "Actively participating in local and national developer ecosystems, engaging in peer code reviews, collaborative hackathons, and open knowledge sharing.",
      highlights: [
        "Secured 2nd place in the nationwide Ethiopian Cursor Community Hackathon with a rapid full-stack delivery",
        "Collaborated with fellow self-taught developers to share project architectures and debugging techniques",
        "Advocated for practical software engineering practices, clean code habits, and hands-on project building"
      ],
      skillsUsed: ["Collaborative Development", "Rapid Prototyping", "Hackathons", "Git / GitHub", "Problem Solving"]
    }
  ],

  skills: [
    {
      title: "Frontend Development",
      description: "Building responsive, fast, and accessible user interfaces with modern toolchains.",
      skills: [
        { name: "React.js", level: "Proficient", tag: "Core" },
        { name: "TypeScript", level: "Proficient", tag: "Core" },
        { name: "JavaScript (ES6+)", level: "Advanced", tag: "Core" },
        { name: "Tailwind CSS", level: "Advanced", tag: "Core" },
        { name: "HTML5 & Semantic Web", level: "Advanced" },
        { name: "CSS3 & Responsive Layouts", level: "Advanced" },
        { name: "State Management", level: "Proficient" },
        { name: "Web Accessibility (a11y)", level: "Working Knowledge" }
      ]
    },
    {
      title: "Backend & Systems",
      description: "Designing reliable server-side architectures, REST APIs, and database structures.",
      skills: [
        { name: "Node.js", level: "Proficient", tag: "Core" },
        { name: "Express.js", level: "Proficient", tag: "Core" },
        { name: "RESTful API Design", level: "Proficient", tag: "Core" },
        { name: "Data Structures & Algorithms", level: "Proficient", tag: "Core" },
        { name: "SQLite & PostgreSQL", level: "Working Knowledge" },
        { name: "Authentication & JWT", level: "Working Knowledge" },
        { name: "API Integration", level: "Proficient" }
      ]
    },
    {
      title: "Programming & Tools",
      description: "Foundational programming languages, version control, and development workflows.",
      skills: [
        { name: "Python", level: "Proficient", tag: "Core" },
        { name: "TypeScript", level: "Proficient", tag: "Core" },
        { name: "JavaScript", level: "Advanced", tag: "Core" },
        { name: "Git & GitHub", level: "Proficient", tag: "Workflow" },
        { name: "Vite & Tooling", level: "Proficient" },
        { name: "Linux / Bash Basics", level: "Working Knowledge" },
        { name: "Networking Fundamentals", level: "Working Knowledge" }
      ]
    },
    {
      title: "AI & Machine Learning",
      description: "Exploring applied intelligence, data modeling, and practical AI implementations.",
      skills: [
        { name: "Python for AI / ML", level: "Working Knowledge", tag: "Focus" },
        { name: "NumPy & Data Handling", level: "Working Knowledge" },
        { name: "Scikit-learn Concepts", level: "Working Knowledge" },
        { name: "NLP & Text Classification", level: "Exploring" },
        { name: "Prompt Engineering & APIs", level: "Proficient", tag: "Applied" },
        { name: "Pattern Detection Logic", level: "Working Knowledge" },
        { name: "Model Evaluation Basics", level: "Exploring" }
      ]
    }
  ],

  achievements: [
    {
      id: "cursor-hackathon-2024",
      title: "Ethiopian Cursor Community Hackathon",
      award: "2nd Place Winner",
      event: "National Developer Hackathon",
      date: "Recent Achievement",
      description: "Achieved 2nd place in the nationwide Ethiopian Cursor Community hackathon. Competing against passionate engineers, I architected and deployed a functional full-stack solution under strict time pressure, demonstrating rapid problem analysis, disciplined code structuring, and practical delivery.",
      takeaways: [
        "High-velocity development using modern AI-assisted engineering workflows",
        "Focused prioritization on solving the core problem before decorative features",
        "Delivered a working prototype that impressed community reviewers and judges"
      ],
      verificationNote: "Verified community competition result. Can be edited or linked to event recap."
    }
  ]
};

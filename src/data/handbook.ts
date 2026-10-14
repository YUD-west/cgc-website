export interface CheatSheetCommand {
  command: string;
  description: string;
  example?: string;
  note?: string;
}

export interface HandbookSection {
  id: string;
  title: string;
  subtitle: string;
  category: 'linux' | 'git' | 'python' | 'cyber' | 'cross-faculty';
  iconName: string;
  practicalScenario: string;
  commands: CheatSheetCommand[];
  proTips: string[];
}

export const HANDBOOK_SECTIONS: HandbookSection[] = [
  {
    id: 'linux-lab02',
    title: 'Computer Lab 02 Linux Terminal Essentials',
    subtitle: 'Navigating student workstations and managing files via CLI',
    category: 'linux',
    iconName: 'Terminal',
    practicalScenario: 'Used when logging into Woliso Campus Computer Lab 02 machines and configuring project directories.',
    commands: [
      {
        command: 'ls -la',
        description: 'List all files including hidden dotfiles with size and permission details',
        example: 'ls -la ~/projects',
        note: 'Crucial for verifying .env and .git folders exist.'
      },
      {
        command: 'mkdir -p project-name/{src,data,tests}',
        description: 'Scaffold a project folder tree in one command',
        example: 'mkdir -p cgc-hackathon/{src,docs,bin}'
      },
      {
        command: 'chmod +x script.sh',
        description: 'Grant execution permissions to your shell script',
        example: 'chmod +x ./deploy_local.sh'
      },
      {
        command: 'grep -rn "TODO" .',
        description: 'Search recursively across all files for a keyword with line numbers',
        example: 'grep -rn "API_URL" ./src'
      },
      {
        command: 'ss -tuln',
        description: 'Inspect all open TCP/UDP listening ports on your workstation',
        note: 'Use to verify if your local Express or FastAPI server is running on port 5055 or 3000.'
      },
      {
        command: 'ip a | grep "inet "',
        description: 'Find your local campus LAN IP address on Woliso subnets',
        note: 'Allows teammates in the lab to test your local web server.'
      }
    ],
    proTips: [
      'Press TAB to auto-complete directory and command names to avoid spelling mistakes.',
      'Use Ctrl + C to abort a runaway script or server, and Ctrl + L to clear the screen without losing your history.',
      'Use history | grep <keyword> to recall long commands you typed earlier.'
    ]
  },
  {
    id: 'git-workflow',
    title: 'Git & Collaborative GitHub Workflow',
    subtitle: 'Branching, clean commits, and pull requests without merge conflicts',
    category: 'git',
    iconName: 'FolderGit2',
    practicalScenario: 'Used when teaming up on CGC open-source repositories and hackathon submissions.',
    commands: [
      {
        command: 'git config --global user.name "Your Name" && git config --global user.email "your@email.com"',
        description: 'One-time setup to attach your identity to all commits',
        example: 'git config --global user.name "Yesuf Dergu"'
      },
      {
        command: 'git checkout -b feature/your-feature-name',
        description: 'Create and switch to an isolated feature branch so main remains untouched',
        example: 'git checkout -b feature/qr-scanner'
      },
      {
        command: 'git status -s',
        description: 'Show a clean, short summary of modified and staged files',
        note: 'Red indicates untracked files; green indicates staged files ready to commit.'
      },
      {
        command: 'git add . && git commit -m "feat: concise description"',
        description: 'Stage all changes and commit with conventional semantic message',
        example: 'git commit -m "feat: add campus project submission modal"'
      },
      {
        command: 'git pull origin main --rebase',
        description: 'Sync latest updates from teammates before pushing to avoid messy merge bubbles',
        note: 'Run this right before pushing your feature branch.'
      },
      {
        command: 'git push -u origin feature/your-feature-name',
        description: 'Push your branch to GitHub and create a PR link',
        example: 'git push -u origin feature/qr-scanner'
      }
    ],
    proTips: [
      'Never commit node_modules, .env secrets, or large database binaries. Always ensure they are listed in .gitignore.',
      'Write commit messages in the imperative mood: "feat: add filter button", not "added filter button".',
      'If you make a mistake in your last unpushed commit message, fix it instantly with: git commit --amend.'
    ]
  },
  {
    id: 'python-prototyping',
    title: 'Python & Rapid API Prototyping',
    subtitle: 'Virtual environments, package locking, and quick REST services',
    category: 'python',
    iconName: 'Code2',
    practicalScenario: 'Used for student AI models, data automation, and building backend services.',
    commands: [
      {
        command: 'python -m venv venv',
        description: 'Create an isolated virtual environment for project dependencies',
        note: 'Prevents dependency conflicts between different Python projects.'
      },
      {
        command: 'source venv/bin/activate  # (Linux/Mac) \n.\\venv\\Scripts\\Activate.ps1  # (Windows)',
        description: 'Activate your project virtual environment in terminal',
        note: 'Your terminal prompt will show (venv) when activated.'
      },
      {
        command: 'pip install fastapi uvicorn pandas requests',
        description: 'Install essential Python prototyping tools in one go',
        example: 'pip install -r requirements.txt'
      },
      {
        command: 'pip freeze > requirements.txt',
        description: 'Export all project dependencies so teammates can install them with 1 command'
      },
      {
        command: 'uvicorn main:app --reload --port 8000',
        description: 'Start live-reloading FastAPI backend on port 8000',
        note: 'Open http://localhost:8000/docs for automatic interactive Swagger documentation.'
      }
    ],
    proTips: [
      'Always activate your virtual environment before running pip install.',
      'Use python -m json.tool file.json to pretty-print JSON files in your terminal without any extra tools.',
      'For CSV dataset cleaning, pandas.read_csv() handles missing entries with .dropna() or .fillna().'
    ]
  },
  {
    id: 'cyber-packet-inspection',
    title: 'Defensive Packet Inspection & Wireshark Lab',
    subtitle: 'Live packet filtering, spotting ARP poisoning, and analyzing network anomalies',
    category: 'cyber',
    iconName: 'ShieldCheck',
    practicalScenario: 'Used during CGC Cybersecurity SIG workshop drills in Computer Lab 02.',
    commands: [
      {
        command: 'ip.addr == 192.168.1.50',
        description: 'Wireshark Display Filter: isolate traffic to/from a specific campus machine',
        note: 'Filters out noise from other lab workstations.'
      },
      {
        command: 'http.request.method == "POST"',
        description: 'Wireshark Filter: inspect web form submissions and unencrypted login parameters',
        note: 'Demonstrates why HTTPS and TLS encryption are mandatory.'
      },
      {
        command: 'dns.flags.response == 0',
        description: 'Wireshark Filter: view outgoing DNS queries to detect beaconing or typosquatting',
        example: 'dns.qry.name contains "ambo"'
      },
      {
        command: 'arp.duplicate-address-frame',
        description: 'Wireshark Filter: detect rogue ARP spoofing/poisoning attacks on the local subnet',
        note: 'Flags when two MAC addresses claim the same IP.'
      },
      {
        command: 'nmap -sT -p 22,80,443,3000,5055 127.0.0.1',
        description: 'Audit local listening services on your machine to verify closed entry points',
        note: 'Only scan localhost or authorized lab test ranges.'
      }
    ],
    proTips: [
      'Ethical Principle: Only run network diagnostic tools on networks you own or have explicit written permission from Woliso Campus ICT administration to test.',
      'Look for the Color Codes in Wireshark: Black indicates errors (like TCP RST or dropped packets), Green indicates HTTP, Blue indicates DNS.',
      'To verify an SSL certificate handshake, search for: ssl.handshake.type == 1 (Client Hello).'
    ]
  },
  {
    id: 'cross-faculty-problem',
    title: 'Cross-Faculty Innovation & Problem Framing',
    subtitle: 'Turning non-technical domain problems into viable tech initiatives',
    category: 'cross-faculty',
    iconName: 'Sparkles',
    practicalScenario: 'For Agriculture, Business, and Health students proposing projects to recruit technical builders.',
    commands: [
      {
        command: '1. The Problem Statement',
        description: 'Define who suffers from the problem in 2 sentences with local context.',
        example: '"Woliso farmers lose 20% of harvested maize due to lack of direct daily price data from town markets."'
      },
      {
        command: '2. The Minimum Viable Solution (MVP)',
        description: 'Focus on the simplest tool that proves the concept before building complex software.',
        example: '"A clean SMS alert and web bulletin board updated every morning with local prices."'
      },
      {
        command: '3. What Roles You Need',
        description: 'Clearly outline what skills you need from teammates in CGC.',
        example: '"Need 1 Frontend React builder, 1 Field researcher from Agriculture, 1 Marketing lead."'
      }
    ],
    proTips: [
      'You do not need to know programming syntax to lead a great project. Domain knowledge (knowing the actual agricultural or business reality) is 50% of the solution.',
      'Use Google Sheets or CSV files to collect initial data before asking for a custom database.',
      'Post your concept on the CGC "Find a Co-Creator" board to pair up with IT and computer science students.'
    ]
  }
];

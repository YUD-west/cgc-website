import React, { useState, useRef, useEffect } from 'react';
import { CGCLogo } from './Logo/CGCLogo';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronRight, 
  Users, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Compass, 
  Layers, 
  Calendar, 
  ExternalLink,
  RotateCcw,
  MessageSquare
} from 'lucide-react';

interface CGCBotProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  options?: {
    label: string;
    query: string;
  }[];
}

const TOUR_STEPS = [
  {
    step: 1,
    title: '1. What is CGC & Our Vision',
    text: `**CGC (Cyber Guardians Club)** is a student-led technology and innovation community at **Ambo University, Woliso Campus**, Ethiopia.\n\nOur tagline is **"Ideas into Impact."**\n\nOur central principle is: **"Don't just attend events. Build things that matter."** We believe university should be about creating tangible, working solutions for real-world problems.`,
    nextQuery: 'Tell me about cross-disciplinary learning at CGC',
    nextLabel: 'Step 2: Cross-Disciplinary Teams →'
  },
  {
    step: 2,
    title: '2. Cross-Disciplinary Learning (Every Department Welcome!)',
    text: `CGC is **NOT just a coding or cybersecurity club**! We bring together students from **every academic discipline** on campus:\n\n• **Informatics & IT**: Software, cybersecurity, AI, and systems architecture.\n• **Agriculture & Sciences**: Smart farming tools, crop health monitoring, and data analysis.\n• **Business & Economics**: Product design, market feasibility, and student entrepreneurship.\n• **Health & Social Sciences**: Community outreach, digital health tools, and user experience.\n\nBeginners are celebrated! You don't need prior coding experience to innovate.`,
    nextQuery: 'What are the 5 innovation tracks?',
    nextLabel: 'Step 3: The 5 Innovation Tracks →'
  },
  {
    step: 3,
    title: '3. The 5 Innovation Tracks',
    text: `CGC provides hands-on learning across 5 core tracks:\n\n1. **Cybersecurity & Defense**: Ethical hacking, network analysis, vulnerability assessment.\n2. **Programming & Problem-Solving**: Python, algorithmic thinking, data structures.\n3. **AI & Machine Learning**: Computer vision, NLP for Ethiopian languages, predictive models.\n4. **Software & Web Development**: Full-stack modern web apps, APIs, and databases.\n5. **Entrepreneurship & Product**: Turning student prototypes into real startups.`,
    nextQuery: 'How do student projects and collaboration work?',
    nextLabel: 'Step 4: Projects & Collaboration →'
  },
  {
    step: 4,
    title: '4. Real-World Projects & Collaboration',
    text: `Collaboration is the beating heart of CGC! In our **Old Classroom ICT Building IT lab 01 and 06** coding sprints, students assemble cross-departmental teams to build real tools.\n\n• **Active projects** include campus network monitoring, agricultural data tools, and student portals.\n• **Propose an idea**: Any student can pitch a concept to recruit team members.\n• **Join existing teams**: Beginners can pair with senior student leads to write real code.`,
    nextQuery: 'How do I join CGC and get my Digital Pass?',
    nextLabel: 'Step 5: Membership & Digital Pass →'
  },
  {
    step: 5,
    title: '5. Membership & Official Digital Pass (100% Free)',
    text: `Joining CGC is **100% free** for all students!\n\n• **Open Community**: Anyone can attend public lab workshops and join our Telegram.\n• **Official Membership**: Submitting the quick Join Form or registering an account gives you your **Verified CGC Digital Member Pass** with your unique Member ID (e.g. CGC-WL-2026-XXXX) for priority lab workstation access and hackathons.`,
    nextQuery: 'Who leads CGC and how can I contact them?',
    nextLabel: 'Step 6: Leadership & Contacts →'
  },
  {
    step: 6,
    title: '6. Leadership & Official Community Channels',
    text: `CGC is organized by students for students at Ambo University Woliso Campus:\n\n• **Lead Administrator & President**: **Yesuf Dergu** (3rd Year IT)\n  - Telegram: [@SatoshiFlash](https://t.me/SatoshiFlash)\n  - LinkedIn: [linkedin.com/in/yusuf2537](https://www.linkedin.com/in/yusuf2537/)\n  - GitHub: [github.com/YUD-west](https://github.com/YUD-west)\n  - Email: yesufdergu464@gmail.com\n\n• **Co-Admin**: [@ame_kt](https://t.me/ame_kt)\n• **Official Telegram Group**: [IT Joint Community](https://t.me/IT_Jointcommunity)`,
    nextQuery: 'Start over from beginning',
    nextLabel: 'Restart Tour ↺'
  }
];

export const CGCBot: React.FC<CGCBotProps> = ({ onNavigate, onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `Hello! 👋 I am the **CGC Campus Assistant**.\n\nWelcome to **Cyber Guardians Club** at Ambo University, Woliso Campus. I can walk you through everything about CGC step-by-step or answer any specific questions!`,
      options: [
        { label: '📖 Step-by-Step CGC Tour (1-by-1)', query: 'Start step-by-step tour of CGC' },
        { label: '👥 Can non-IT students join?', query: 'Can non-IT students join CGC?' },
        { label: '💻 What tracks are available?', query: 'What are the 5 innovation tracks?' },
        { label: '🛡️ How to get Digital Member Pass?', query: 'How do I get my Digital Member Pass?' },
        { label: '📞 Contact Yesuf Dergu & Admins', query: 'Who leads CGC and how can I contact them?' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const processResponse = (userQuery: string) => {
    const q = userQuery.toLowerCase().trim();
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      // Check Tour steps
      if (q.includes('step-by-step') || q.includes('start tour') || q.includes('start step-by-step') || q.includes('start over')) {
        const step1 = TOUR_STEPS[0];
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: step1.text,
            options: [
              { label: step1.nextLabel, query: step1.nextQuery },
              { label: 'Explore Student Projects', query: 'Show me projects' },
              { label: 'Join CGC Now', query: 'How to join' }
            ]
          }
        ]);
        return;
      }

      // Check specific tour transitions
      for (const step of TOUR_STEPS) {
        if (q.includes(step.nextQuery.toLowerCase()) || q.includes(`step ${step.step}`)) {
          // If this step leads to next
          const nextStep = TOUR_STEPS.find(s => s.step === step.step + 1) || TOUR_STEPS[0];
          setMessages(prev => [
            ...prev,
            {
              id: `msg-${Date.now()}`,
              sender: 'bot',
              text: step.text,
              options: [
                { label: step.nextLabel, query: step.nextQuery },
                { label: 'Ask another question', query: 'What else can I ask?' }
              ]
            }
          ]);
          return;
        }
      }

      // Topic: Non-IT / Departments
      if (q.includes('non-it') || q.includes('department') || q.includes('stream') || q.includes('agriculture') || q.includes('business')) {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `**Yes, absolutely!** CGC is designed for students from **all departments** at Ambo University Woliso Campus.\n\nWe actively encourage students from **Agriculture**, **Business & Economics**, **Natural Sciences**, and **Social Sciences** to join. Real innovation happens when diverse disciplines team up: agriculture students provide domain problems, business students analyze viability, and tech students help build the software.`,
            action: {
              label: 'Join CGC Official Community →',
              onClick: () => { setIsOpen(false); onNavigate('join'); }
            },
            options: [
              { label: 'What are the 5 tracks?', query: 'What are the 5 innovation tracks?' },
              { label: 'How do project teams work?', query: 'How do student projects work?' }
            ]
          }
        ]);
        return;
      }

      // Topic: Tracks
      if (q.includes('track') || q.includes('cyber') || q.includes('ai') || q.includes('learn')) {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `CGC features **5 Innovation Tracks**:\n\n1. **Cybersecurity & Defense** (Wireshark, network hardening, ethical security)\n2. **Programming & Problem-Solving** (Python, logic, algorithms)\n3. **Artificial Intelligence & ML** (Machine learning, local language processing)\n4. **Software & Web Development** (React, TypeScript, databases, mobile apps)\n5. **Entrepreneurship & Product** (Startup models, product roadmaps, project defense)\n\nEvery track includes practical weekend sessions in Old Classroom ICT Building IT lab 01 and 06.`,
            action: {
              label: 'Explore Full Tracks Overview →',
              onClick: () => { setIsOpen(false); onNavigate('explore'); }
            },
            options: [
              { label: 'How do project teams work?', query: 'How do student projects work?' },
              { label: 'Who leads CGC?', query: 'Who leads CGC and how can I contact them?' }
            ]
          }
        ]);
        return;
      }

      // Topic: Projects & Propose
      if (q.includes('project') || q.includes('propose') || q.includes('team')) {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `**Projects are the heart of CGC!**\n\n• Students don't just attend lectures—they build working tools.\n• Anyone can propose a project on our website or in the lab.\n• Cross-disciplinary teams form to divide roles: developers, UI designers, researchers, and project leads.\n• Featured projects include network packet analyzers, agricultural disease trackers, and campus utilities.`,
            action: {
              label: 'Browse Projects & Innovation Registry →',
              onClick: () => { setIsOpen(false); onNavigate('projects'); }
            },
            options: [
              { label: 'How to join a team?', query: 'How to join CGC' },
              { label: 'View upcoming workshops', query: 'What events are upcoming?' }
            ]
          }
        ]);
        return;
      }

      // Topic: Join & Member Pass
      if (q.includes('join') || q.includes('pass') || q.includes('register') || q.includes('free') || q.includes('price') || q.includes('cost')) {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `**CGC Membership is 100% Free!**\n\nTo join:\n1. Fill out the quick form on the **Join CGC** page (or click Sign In to create an account).\n2. You will instantly receive your official **Verified CGC Digital Member Pass** with your unique Member ID.\n3. Quote your Member ID when attending weekend sessions in **Old Classroom ICT Building IT lab 01 and 06** to get repo access and project workstation priority.`,
            action: {
              label: 'Open Free Join Form →',
              onClick: () => { setIsOpen(false); onNavigate('join'); }
            },
            options: [
              { label: 'Sign In / My Pass', query: 'How to access my pass' },
              { label: 'Contact Leadership', query: 'Who leads CGC?' }
            ]
          }
        ]);
        return;
      }

      // Topic: Leadership & Contact
      if (q.includes('lead') || q.includes('yesuf') || q.includes('contact') || q.includes('admin') || q.includes('telegram') || q.includes('email')) {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `**CGC Leadership & Official Contact Points:**\n\n• **Lead Administrator & President**: **Yesuf Dergu**\n  - IT 3rd Year, Ambo University Woliso Campus\n  - Telegram: [@SatoshiFlash](https://t.me/SatoshiFlash)\n  - LinkedIn: [linkedin.com/in/yusuf2537](https://www.linkedin.com/in/yusuf2537/)\n  - GitHub: [github.com/YUD-west](https://github.com/YUD-west)\n  - Email: yesufdergu464@gmail.com\n\n• **Co-Admin**: [@ame_kt](https://t.me/ame_kt)\n• **Official Telegram Community**: [IT Joint Community](https://t.me/IT_Jointcommunity)`,
            action: {
              label: 'View Contact & Channels Page →',
              onClick: () => { setIsOpen(false); onNavigate('contact'); }
            },
            options: [
              { label: 'Step-by-Step CGC Tour', query: 'Start step-by-step tour of CGC' },
              { label: 'Explore Student Projects', query: 'Show me projects' }
            ]
          }
        ]);
        return;
      }

      // Topic: Events & Hackathons
      if (q.includes('event') || q.includes('hackathon') || q.includes('workshop') || q.includes('cursor')) {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `CGC organizes competitive hackathons and weekend lab workshops:\n\n• **Cursor Hackathon Ambo**: Competitive sprints where students present prototypes to faculty examiners.\n• **Weekend Lab Sprints**: Hands-on coding and defense sessions in Old Classroom ICT Building IT lab 01 and 06.\n• **Orientation Ceremonies**: Welcoming new batches into peer study cohorts.`,
            action: {
              label: 'View Upcoming Events & Past Highlights →',
              onClick: () => { setIsOpen(false); onNavigate('events'); }
            },
            options: [
              { label: 'How do I join CGC?', query: 'How to join CGC' },
              { label: 'Start 1-by-1 Tour', query: 'Start step-by-step tour of CGC' }
            ]
          }
        ]);
        return;
      }

      // Default fallback
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text: `I'd love to help with that! Here is what you can explore about CGC (Cyber Guardians Club) at Ambo University Woliso Campus:`,
          options: [
            { label: '📖 Step-by-Step CGC Tour (1-by-1)', query: 'Start step-by-step tour of CGC' },
            { label: '👥 Can non-IT students join?', query: 'Can non-IT students join CGC?' },
            { label: '💻 What tracks are available?', query: 'What are the 5 innovation tracks?' },
            { label: '🚀 How do project teams work?', query: 'How do student projects work?' },
            { label: '🛡️ How to get Digital Member Pass?', query: 'How do I get my Digital Member Pass?' },
            { label: '📞 Contact Yesuf Dergu & Admins', query: 'Who leads CGC and how can I contact them?' }
          ]
        }
      ]);

    }, 400);
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: query
      }
    ]);

    setInput('');
    processResponse(query);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-black"
          title="Chat with CGC Assistant"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
          </span>
          <Bot className="w-4 h-4 text-black" />
          <span>Ask CGC Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#080808] border border-[#2A2A2A] w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in text-[#F2F2F2]">
          
          {/* Header */}
          <div className="p-4 bg-[#000000] border-b border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFC21A]/10 text-[#FFC21A] border border-[#FFC21A]/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#FFC21A]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>CGC Campus Assistant</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#FFC21A]/10 text-[#FFC21A] font-mono border border-[#FFC21A]/30">
                    LIVE
                  </span>
                </h4>
                <p className="text-[10px] text-neutral-400">Ambo University, Woliso Campus</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleSend('Start step-by-step tour of CGC')}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#141414] transition-colors text-[10px] font-medium"
                title="Restart Tour"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#141414] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#FFC21A] text-black font-semibold rounded-br-sm'
                      : 'bg-[#141414] border border-[#2A2A2A] text-neutral-200 rounded-bl-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {/* Render basic bold formatting */}
                    {m.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Inline Action Button */}
                  {m.action && (
                    <button
                      onClick={m.action.onClick}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-[11px] font-bold transition-all flex items-center gap-1.5"
                    >
                      <span>{m.action.label}</span>
                    </button>
                  )}
                </div>

                {/* Question Suggestion Chips */}
                {m.options && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {m.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(opt.query)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#FFC21A]/10 text-neutral-300 hover:text-[#FFC21A] border border-[#2A2A2A] hover:border-[#FFC21A]/40 text-[11px] transition-colors text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#141414] border border-[#2A2A2A] max-w-[80px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Step Buttons Row */}
          <div className="px-3 py-2 bg-[#000000] border-t border-[#2A2A2A] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10px]">
            <span className="text-neutral-500 font-semibold uppercase flex-shrink-0">Step-by-step:</span>
            <button
              onClick={() => handleSend('Start step-by-step tour of CGC')}
              className="px-2 py-1 rounded bg-[#141414] text-neutral-300 hover:text-white hover:bg-[#202020] whitespace-nowrap flex-shrink-0"
            >
              1. Vision
            </button>
            <button
              onClick={() => handleSend('Tell me about cross-disciplinary learning at CGC')}
              className="px-2 py-1 rounded bg-[#141414] text-neutral-300 hover:text-white hover:bg-[#202020] whitespace-nowrap flex-shrink-0"
            >
              2. Streams
            </button>
            <button
              onClick={() => handleSend('What are the 5 innovation tracks?')}
              className="px-2 py-1 rounded bg-[#141414] text-neutral-300 hover:text-white hover:bg-[#202020] whitespace-nowrap flex-shrink-0"
            >
              3. Tracks
            </button>
            <button
              onClick={() => handleSend('How do student projects work?')}
              className="px-2 py-1 rounded bg-[#141414] text-neutral-300 hover:text-white hover:bg-[#202020] whitespace-nowrap flex-shrink-0"
            >
              4. Projects
            </button>
            <button
              onClick={() => handleSend('How do I get my Digital Member Pass?')}
              className="px-2 py-1 rounded bg-[#141414] text-neutral-300 hover:text-white hover:bg-[#202020] whitespace-nowrap flex-shrink-0"
            >
              5. Pass
            </button>
            <button
              onClick={() => handleSend('Who leads CGC and how can I contact them?')}
              className="px-2 py-1 rounded bg-[#141414] text-neutral-300 hover:text-white hover:bg-[#202020] whitespace-nowrap flex-shrink-0"
            >
              6. Admins
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#000000] border-t border-[#2A2A2A] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about CGC, tracks, projects, or admins..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#2A2A2A] text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black disabled:opacity-40 transition-colors font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

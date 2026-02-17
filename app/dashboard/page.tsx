"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  Camera, 
  Settings, 
  Home, 
  User, 
  LogOut,
  Brain, 
  Code2, 
  MessageSquare, 
  Target, 
  Play,
  LayoutGrid
} from "lucide-react";
import Link from "next/link"; // Ensure Link is imported

// --- Types & Data ---

type InterviewType = "Technical" | "Behavioral" | "System Design";
type Difficulty = "Junior" | "Mid-Level" | "Senior" | "Lead";

const interviewTypes: { 
  id: InterviewType; 
  label: string; 
  icon: any; 
  desc: string; 
}[] = [
  { id: "Technical", label: "Technical", icon: Code2, desc: "Data structures, algorithms, and coding challenges." },
  { id: "Behavioral", label: "Behavioral", icon: MessageSquare, desc: "STAR method, culture fit, and soft skills." },
  { id: "System Design", label: "System Design", icon: Brain, desc: "Scalability, architecture, and distributed systems." },
];

const difficulties: Difficulty[] = ["Junior", "Mid-Level", "Senior", "Lead"];

// --- Components ---

const NavItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick,
  isMobile 
}: { 
  icon: any; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  isMobile: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center transition-all duration-200 ${
      active 
        ? "text-purple-400" 
        : "text-slate-400 hover:text-white"
    } ${isMobile ? "flex-col gap-1 p-2" : "w-full gap-3 px-4 py-3 rounded-xl border"}`}
  >
    <Icon size={isMobile ? 20 : 20} />
    {!isMobile && <span className="font-medium">{label}</span>}
    {isMobile && <span className="text-[10px] font-medium">{label}</span>}
  </button>
);

const SelectionCard = ({ 
  option, 
  selected, 
  onClick 
}: { 
  option: { id: string; label: string; icon: any; desc: string }; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={`relative p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden group ${
      selected 
        ? "border-purple-500 bg-purple-500/5" 
        : "border-white/10 bg-white/5 hover:border-white/20"
    }`}
  >
    {selected && (
      <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    )}

    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
      selected ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-slate-400 group-hover:text-white"
    }`}>
      <option.icon size={20} />
    </div>

    <h3 className="text-base font-bold text-white mb-1">{option.label}</h3>
    <p className="text-xs text-slate-400 leading-snug">{option.desc}</p>
  </motion.button>
);

const DifficultyPill = ({ 
  level, 
  selected, 
  onClick 
}: { 
  level: Difficulty; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
      selected
        ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
        : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
    }`}
  >
    {level}
  </button>
);

// --- Main Page ---

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Setup");
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [duration, setDuration] = useState(30);

  // Responsive state helper
  const [isMobile, setIsMobile] = useState(false);

  if (typeof window !== "undefined" && window.innerWidth < 768 && !isMobile) {
    setIsMobile(true);
  }

  const isReadyToStart = selectedType && selectedDifficulty;

  return (
    <div className="flex h-screen bg-[#05050A] text-white overflow-hidden font-sans selection:bg-purple-500/30 flex-col md:flex-row">

      {/* Sidebar / Bottom Bar */}
      <aside className={`
        ${isMobile ? 'h-16 w-full fixed bottom-0 z-50 border-t border-white/10 bg-[#05050A]/90 backdrop-blur-xl flex justify-around items-center' : 'h-screen w-64 border-r border-white/5 bg-[#05050A]/50 backdrop-blur-xl hidden md:flex flex-col justify-between z-20'}
      `}>
        {!isMobile && (
          <>
            <div>
              <div className="h-20 flex items-center px-6 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
                  P
                </div>
                <span className="ml-3 font-bold text-lg">PrepGenius</span>
              </div>
              <nav className="p-4 space-y-2">
                <NavItem icon={Home} label="Home" active={activeTab === "Home"} onClick={() => setActiveTab("Home")} isMobile={false} />
                <NavItem icon={LayoutGrid} label="Sessions" active={activeTab === "Setup"} onClick={() => setActiveTab("Setup")} isMobile={false} />
                <NavItem icon={User} label="Profile" active={activeTab === "Profile"} onClick={() => setActiveTab("Profile")} isMobile={false} />
                <NavItem icon={Settings} label="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} isMobile={false} />
              </nav>
            </div>
            <div className="p-4 border-t border-white/5">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </>
        )}

        {isMobile && (
          <nav className="flex justify-around w-full">
            <NavItem icon={Home} label="Home" active={activeTab === "Home"} onClick={() => setActiveTab("Home")} isMobile={true} />
            <NavItem icon={LayoutGrid} label="Setup" active={activeTab === "Setup"} onClick={() => setActiveTab("Setup")} isMobile={true} />
            <NavItem icon={User} label="Profile" active={activeTab === "Profile"} onClick={() => setActiveTab("Profile")} isMobile={true} />
            <NavItem icon={Settings} label="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} isMobile={true} />
          </nav>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full w-full pb-16 md:pb-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <header className="h-16 md:h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#05050A]/30 backdrop-blur-sm z-10 shrink-0">
          <div>
            <h1 className="text-lg md:text-xl font-bold">New Session</h1>
            {!isMobile && <p className="text-sm text-slate-400">Configure your interview parameters</p>}
          </div>

          <div className="flex items-center gap-4">
            {!isMobile && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">System Ready</span>
              </div>
            )}
            <div className={`rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`} />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">

            <section>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className={`rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}>
                  <MessageSquare size={isMobile ? 14 : 18} />
                </div>
                <h2 className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>Select Type</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {interviewTypes.map((type) => (
                  <SelectionCard
                    key={type.id}
                    option={type}
                    selected={selectedType === type.id}
                    onClick={() => setSelectedType(type.id)}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className={`rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}>
                  <Target size={isMobile ? 14 : 18} />
                </div>
                <h2 className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>Parameters</h2>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-8">
                <div className="mb-6 md:mb-8">
                  <label className="block text-xs md:text-sm font-medium text-slate-400 mb-3 md:mb-4">Target Role Level</label>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {difficulties.map((diff) => (
                      <DifficultyPill
                        key={diff}
                        level={diff}
                        selected={selectedDifficulty === diff}
                        onClick={() => setSelectedDifficulty(diff)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 md:mb-4">
                    <label className="text-xs md:text-sm font-medium text-slate-400">Duration</label>
                    <span className="text-white font-mono text-xs md:text-sm">{duration} min</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="5"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-[10px] md:text-xs text-slate-500 mt-1 md:mt-2">
                    <span>15m</span>
                    <span>60m</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
               <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className={`rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}>
                  <Settings size={isMobile ? 14 : 18} />
                </div>
                <h2 className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>Hardware</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-center justify-between p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`rounded-full bg-green-500/20 text-green-400 flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'p-3'}`}>
                      <Mic size={isMobile ? 16 : 20} />
                    </div>
                    <div>
                      <div className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>Microphone</div>
                      <div className="text-[10px] md:text-xs text-green-400">Active</div>
                    </div>
                  </div>
                  <div className="h-1 w-12 md:w-20 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-green-500 animate-pulse" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`rounded-full bg-green-500/20 text-green-400 flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'p-3'}`}>
                      <Camera size={isMobile ? 16 : 20} />
                    </div>
                    <div>
                      <div className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>Camera</div>
                      <div className="text-[10px] md:text-xs text-green-400">Active</div>
                    </div>
                  </div>
                  <div className={`bg-black rounded-lg border border-white/20 overflow-hidden flex items-center justify-center ${isMobile ? 'w-12 h-8' : 'w-20 h-12'}`}>
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse" />
                  </div>
                </div>
              </div>
            </section>

            {isMobile && <div className="h-12" />}

          </div>
        </div>

        {/* Sticky Footer / Action Bar */}
        <div className={`p-4 md:p-8 border-t border-white/5 bg-[#05050A]/80 backdrop-blur-xl z-20 ${isMobile ? 'pb-20' : ''}`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className={`text-slate-400 ${isMobile ? 'text-xs text-center' : 'text-sm'}`}>
              {isReadyToStart ? (
                <span>Ready to start <span className="text-white font-bold">{selectedType}</span></span>
              ) : (
                <span>Select options to begin</span>
              )}
            </div>

            {/* FIXED BUTTON LOGIC */}
            <Link href="/interview-room" className="w-full md:w-auto">
              <motion.button
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ 
                  opacity: isReadyToStart ? 1 : 0.5, 
                  scale: isReadyToStart ? 1 : 0.95,
                  pointerEvents: isReadyToStart ? "auto" : "none"
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-xl shadow-purple-900/20 py-3 md:py-4 px-6 md:px-8 text-base md:text-lg"
              >
                {/* Fix: Ternary operator for size based on isMobile */}
                <Play size={isMobile ? 16 : 20} fill="currentColor" />
                Start Interview
              </motion.button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
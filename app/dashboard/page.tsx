"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Settings,
  LogOut,
  Code2,
  MessageSquare,
  Brain,
  Target,
  Play,
  LayoutGrid,
  Zap,
  Clock,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";

// --- Types & Data ---

type InterviewType = "Technical" | "Behavioral" | "System Design";
type Difficulty = "Junior" | "Mid-Level" | "Senior" | "Lead";

const interviewTypes: {
  id: InterviewType;
  label: string;
  icon: any;
  desc: string;
  gradient: string;
}[] = [
  {
    id: "Technical",
    label: "Technical",
    icon: Code2,
    desc: "Algorithms, data structures, and coding challenges.",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: "Behavioral",
    label: "Behavioral",
    icon: MessageSquare,
    desc: "STAR method, culture fit, and soft skills.",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: "System Design",
    label: "System Design",
    icon: Brain,
    desc: "Scalability, architecture, and trade-offs.",
    gradient: "from-amber-600 to-orange-600",
  },
];

const difficulties: Difficulty[] = ["Junior", "Mid-Level", "Senior", "Lead"];

// --- Components ---

const NavItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  href,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick?: () => void;
  href?: string;
}) => {
  const content = (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full group relative ${
        active
          ? "bg-purple-500/10 text-purple-400 border-l-2 border-purple-500"
          : "text-slate-400 hover:bg-white/[0.03] border-l-2 border-transparent"
      }`}
    >
      <Icon size={20} className={active ? "text-purple-400" : "group-hover:text-white"} />
      <span className="font-medium text-sm">{label}</span>
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute right-4 w-1.5 h-1.5 rounded-full bg-purple-500"
        />
      )}
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

const SelectionCard = ({
  option,
  selected,
  onClick,
}: {
  option: {
    id: string;
    label: string;
    icon: any;
    desc: string;
    gradient: string;
  };
  selected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.01, y: -2 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={`relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden group flex items-start gap-5 ${
      selected
        ? "border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10"
        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03]"
    }`}
  >
    <div
      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 ${
        selected ? "scale-110" : "group-hover:scale-105"
      }`}
    >
      <option.icon size={26} className="text-white" />
    </div>

    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-white mb-1">{option.label}</h3>
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-sm text-slate-400 leading-snug">{option.desc}</p>
    </div>
  </motion.button>
);

const DifficultyPill = ({
  level,
  selected,
  onClick,
}: {
  level: Difficulty;
  selected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
      selected
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/30"
        : "bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] border border-white/[0.06]"
    }`}
  >
    {level}
  </motion.button>
);

// --- Main Page ---

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Sessions");
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [duration, setDuration] = useState(30);

  const isReadyToStart = selectedType && selectedDifficulty;

  const handleComingSoon = () => {
    alert("This feature is coming soon!");
  };

  return (
    <div className="flex h-screen bg-[#030308] text-white overflow-hidden">
      {/* Sidebar (Desktop Only) */}
      <aside className="hidden md:flex w-72 flex-col border-r border-white/[0.05] bg-[#030308]/90 backdrop-blur-xl p-6 z-20">
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-3 px-2 mb-8 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20"
            >
              P
            </motion.div>
            <span className="font-bold text-lg bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              PrepGenius
            </span>
          </Link>

          <nav className="space-y-1">
            <NavItem
              icon={Home}
              label="Home"
              active={activeTab === "Home"}
              href="/"
            />
            <NavItem
              icon={LayoutGrid}
              label="Sessions"
              active={activeTab === "Sessions"}
              onClick={() => setActiveTab("Sessions")}
            />
            <NavItem
              icon={User}
              label="Profile"
              active={activeTab === "Profile"}
              onClick={handleComingSoon}
            />
            <NavItem
              icon={Settings}
              label="Settings"
              active={activeTab === "Settings"}
              onClick={handleComingSoon}
            />
          </nav>
        </div>

        <div className="mt-auto">
          {/* Pro Upgrade Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/[0.05] mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm font-semibold text-white">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Unlock unlimited sessions and advanced analytics.
            </p>
            <button className="w-full py-2 rounded-lg bg-white/[0.05] text-xs font-medium text-white hover:bg-white/[0.08] transition-colors">
              Learn More
            </button>
          </div>

          <button
            onClick={handleComingSoon}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors group"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full w-full overflow-y-auto">
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />
        </div>

        {/* Header */}
        <header className="h-16 border-b border-white/[0.05] bg-[#030308]/70 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
          <div>
            <h1 className="text-lg font-semibold">New Practice Session</h1>
            <p className="text-xs text-slate-500">Configure your interview settings</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-500"
            />
            System Ready
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 relative z-0 pb-32 md:pb-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Section 1: Interview Type */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Zap size={18} className="text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Select Focus Area</h2>
                  <p className="text-xs text-slate-500">Choose your interview type</p>
                </div>
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

            {/* Section 2: Parameters */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Target size={18} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Set Parameters</h2>
                  <p className="text-xs text-slate-500">Configure difficulty and duration</p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm">
                {/* Difficulty Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Target Role Level
                  </label>
                  <div className="flex flex-wrap gap-3">
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

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-slate-300">
                      Session Duration
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-white/[0.05] text-white font-mono text-sm">
                      {duration} min
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full h-2 bg-white/[0.05] rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-3">
                      <span>15m</span>
                      <span>30m</span>
                      <span>45m</span>
                      <span>60m</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Sticky Footer */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 md:left-72 p-4 md:p-6 border-t border-white/[0.05] bg-[#030308]/90 backdrop-blur-xl z-20"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="hidden md:block">
              {isReadyToStart ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <Clock size={16} className="text-purple-400" />
                  <span>
                    Ready for{" "}
                    <span className="text-white font-semibold">{selectedType}</span> session
                  </span>
                </motion.div>
              ) : (
                <span className="text-sm text-slate-500">
                  Select options to continue
                </span>
              )}
            </div>

            <Link
              href={{
                pathname: "/interview-room",
                query: {
                  type: selectedType || "",
                  level: selectedDifficulty || "",
                  duration: duration,
                },
              }}
              className="w-full md:w-auto"
            >
              <motion.button
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{
                  opacity: isReadyToStart ? 1 : 0.5,
                  scale: isReadyToStart ? 1 : 0.95,
                  pointerEvents: isReadyToStart ? "auto" : "none",
                }}
                whileHover={{
                  scale: isReadyToStart ? 1.02 : 0.95,
                  boxShadow: "0 0 30px rgba(139,92,246,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 text-base shadow-lg shadow-purple-900/20 group"
              >
                <Play size={20} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                Start Interview
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 border-t border-white/[0.05] bg-[#030308]/95 backdrop-blur-xl flex justify-around items-end md:hidden z-50 px-2 pb-6 safe-area-bottom">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-500 hover:text-white transition-colors"
        >
          <Home size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <button
          onClick={() => setActiveTab("Sessions")}
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-purple-400"
        >
          <LayoutGrid size={20} />
          <span className="text-[10px] font-medium">Sessions</span>
        </button>

        <button
          onClick={handleComingSoon}
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-500 hover:text-white transition-colors"
        >
          <User size={20} />
          <span className="text-[10px] font-medium">Profile</span>
        </button>

        <button
          onClick={handleComingSoon}
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-500 hover:text-white transition-colors"
        >
          <Settings size={20} />
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </nav>

      <style jsx global>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 1rem);
        }
      `}</style>
    </div>
  );
}
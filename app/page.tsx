"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Zap,
  Target,
  Sparkles,
  MessageSquare,
  BarChart2,
  Brain,
  Menu,
  X,
  BookOpen,
  Users,
  Briefcase,
  Lock,
  CheckCircle,
  Play,
} from "lucide-react";

// --- Floating Particles Background (Fixed for SSR) ---

const ParticleField = () => {
  const [particles, setParticles] = useState<
    { x: number; y: number; duration: number }[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const newParticles = [...Array(30)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 15 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
          initial={{ x: particle.x, y: particle.y, opacity: 0.2 }}
          animate={{ y: [null, Math.random() * -500], opacity: [0.2, 0] }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// --- Enhanced Feature Card ---

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
  gradient,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
  gradient: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl overflow-hidden h-full">
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: gradient }}
        />

        <div className="relative z-10">
          <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
            <Icon size={24} className="text-white" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-slate-400 leading-relaxed text-[15px]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Professional Step Component ---

const Step = ({
  number,
  title,
  description,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {/* Clean Number Circle */}
      <motion.div
        className="relative w-16 h-16 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center mb-8 z-10 group-hover:border-purple-500/50 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
          {number}
        </span>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-full bg-purple-500/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
      </motion.div>

      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed max-w-xs">{description}</p>
    </motion.div>
  );
};

// --- Roadmap / Capability Item ---

const CapabilityItem = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 group"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
        <Icon size={22} />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-[#030308] text-white overflow-hidden selection:bg-purple-500/30 font-sans antialiased"
    >
      {/* Enhanced Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ParticleField />

        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            y: y1,
          }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030308_70%)]" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 border-b border-white/[0.05] bg-[#030308]/60 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20"
            >
              P
            </motion.div>
            <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              PrepGenius
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it Works", "Roadmap"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                Log in
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm shadow-lg shadow-purple-900/20"
              >
                Start Free
              </motion.button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.05] bg-[#030308]/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {["Features", "How it Works", "Roadmap"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-slate-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium">
                    Start Free
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-24 px-6 flex flex-col items-center text-center min-h-screen justify-center">
        <motion.div
          style={{ y: y1, opacity, scale }}
          className="max-w-4xl z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            <span className="text-xs font-medium text-slate-300 tracking-wide">
              AI-Powered Interview Coaching
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]"
          >
            <span className="text-white">Master every</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shimmer">
              interview question
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Practice mock interviews with an AI that adapts to your skill level.
            Get instant, actionable feedback on your answers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-base shadow-2xl shadow-purple-900/30 flex items-center gap-2 group"
              >
                Start practicing free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium text-base flex items-center gap-2 hover:bg-white/[0.08] transition-colors"
            >
              <Play size={18} className="text-purple-400" />
              Watch demo
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-purple-400" />
              Free tier available
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative py-28 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              How it works
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-lg">
              Get interview-ready in three simple steps. No complex setup required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <Step
              number="1"
              title="Choose Your Path"
              description="Select your target role and experience level. We tailor the questions to you."
              delay={0}
            />
            <Step
              number="2"
              title="Practice with AI"
              description="Engage in realistic conversations. Speak or type your answers naturally."
              delay={0.15}
            />
            <Step
              number="3"
              title="Level Up"
              description="Get instant, detailed feedback on structure, clarity, and content."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative py-28 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Built for serious prep
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Everything you need to confidently walk into any interview room.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              title="Adaptive AI"
              description="An AI that learns your strengths and weaknesses, adjusting difficulty dynamically."
              delay={0}
              gradient="bg-gradient-to-br from-purple-600 to-purple-800"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Natural Dialogue"
              description="Real conversational flow with follow-up questions that dig deeper like real interviewers."
              delay={0.1}
              gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            />
            <FeatureCard
              icon={BarChart2}
              title="Deep Analytics"
              description="Comprehensive breakdowns of communication, technical accuracy, and soft skills."
              delay={0.2}
              gradient="bg-gradient-to-br from-pink-600 to-pink-800"
            />
            <FeatureCard
              icon={Zap}
              title="Instant Feedback"
              description="No waiting. Get actionable insights the moment you finish answering."
              delay={0.3}
              gradient="bg-gradient-to-br from-amber-600 to-amber-800"
            />
            <FeatureCard
              icon={Sparkles}
              title="Smart Hints"
              description="Stuck? Ask for guidance. The AI nudges you without giving away the answer."
              delay={0.4}
              gradient="bg-gradient-to-br from-teal-600 to-teal-800"
            />
            <FeatureCard
              icon={Target}
              title="Role Specific"
              description="Targeted practice for Junior, Mid-level, Senior, or Lead positions."
              delay={0.5}
              gradient="bg-gradient-to-br from-rose-600 to-rose-800"
            />
          </div>
        </div>
      </section>

      {/* Roadmap / Capabilities Section */}
      <section id="roadmap" className="relative py-28 px-6 z-10 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                What's Included
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Everything you need
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                A focused toolset designed to help you improve efficiently.
              </p>

              <div className="space-y-6">
                <CapabilityItem
                  icon={Briefcase}
                  title="Multiple Interview Types"
                  description="Behavioral, technical, and system design questions."
                  delay={0}
                />
                <CapabilityItem
                  icon={Users}
                  title="Role-Specific Practice"
                  description="Tailored questions based on your experience level."
                  delay={0.1}
                />
                <CapabilityItem
                  icon={BookOpen}
                  title="Detailed Explanations"
                  description="Learn why answers work and how to improve them."
                  delay={0.2}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-sm text-slate-400">Practice Session</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <p className="text-xs text-purple-400 mb-1">AI Question</p>
                    <p className="text-slate-300 text-sm">"Tell me about a time you had to manage a conflict within your team."</p>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                    <p className="text-xs text-blue-400 mb-1">Your Answer</p>
                    <p className="text-slate-300 text-sm">"In my previous role, our team had a disagreement about..."</p>
                  </div>

                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                    <p className="text-xs text-green-400 mb-1">Feedback</p>
                    <p className="text-slate-300 text-sm">Good STAR structure. Consider adding more specific metrics to strengthen impact.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28 px-6 z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/[0.08] overflow-hidden text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.2),transparent_50%)]" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to practice?
              </h2>
              <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto">
                Start preparing for your next interview today. No payment required to begin.
              </p>

              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(139,92,246,0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg shadow-2xl flex items-center gap-3 mx-auto hover:bg-slate-100 transition-colors group"
                >
                  Get started free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <span className="text-sm text-slate-500">
              © 2026 PrepGenius
            </span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shimmer {
          animation: gradient-shimmer 3s ease infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #030308;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(139,92,246,0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139,92,246,0.5);
        }
      `}</style>
    </main>
  );
}
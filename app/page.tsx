"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Target, Layers, Sparkles } from "lucide-react";

// --- Components ---

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="group relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <div className="relative z-10">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} className="md:hidden" />
        <Icon size={24} className="hidden md:block" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-xs md:text-sm">{description}</p>
    </div>
  </motion.div>
);

const GlowOrb = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-[100px] opacity-30 pointer-events-none ${className}`} />
);

// --- Main Page ---

export default function LandingPage() {
  const containerRef = useRef(null);

  // Physics-based scroll for smooth parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 30 });

  // Parallax effects
  const y1 = useTransform(smoothScroll, [0, 1], [0, -150]);
  const y2 = useTransform(smoothScroll, [0, 1], [0, -300]);
  const opacity = useTransform(smoothScroll, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#05050A] text-white overflow-hidden selection:bg-purple-500/30 font-sans">

      {/* Ambient Background Lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GlowOrb className="top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 animate-pulse" />
        <GlowOrb className="bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#05050A]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg shadow-purple-500/20">
              P
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">PrepGenius</span>
          </div>

          <div className="hidden md:flex items-center gap-6 md:gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Methodology</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-white text-black font-semibold text-xs md:text-sm hover:bg-slate-200 transition-colors"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 flex flex-col items-center text-center min-h-screen justify-center">
        <motion.div style={{ y: y1, opacity }} className="max-w-5xl z-10 w-full">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            System Online
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1]"
          >
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
              Next Interview
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg lg:text-2xl text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2"
          >
            The AI-powered coach that simulates real interviews, analyzes your responses, and guarantees you are ready for the big stage.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full max-w-md mx-auto"
          >
            <Link href="/dashboard" className="flex-1 w-full">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 md:px-8 md:py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base md:text-lg shadow-xl shadow-purple-900/20"
              >
                Start Practice
              </motion.button>
            </Link>

            <Link href="/dashboard" className="flex-1 w-full">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white font-semibold text-base md:text-lg"
              >
                View Demo
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Abstract Visual Element */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full opacity-20 pointer-events-none" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-white/10 rounded-full opacity-30 pointer-events-none delay-100" 
        />
      </section>

      {/* Feature Grid */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Engineered for Success</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We utilize advanced natural language processing to provide feedback that feels human, but acts instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <FeatureCard
              icon={Zap}
              title="Real-time Analysis"
              description="Get instant feedback on your tone, clarity, and content as you speak."
              delay={0}
            />
            <FeatureCard
              icon={Layers}
              title="Adaptive Difficulty"
              description="The AI adjusts its questioning style based on your performance."
              delay={0.1}
            />
            <FeatureCard
              icon={Target}
              title="Pinpoint Accuracy"
              description="Our system tracks filler words, eye contact, and pacing metrics."
              delay={0.2}
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Verified Questions"
              description="Access a database of over 10,000 questions from top tech companies."
              delay={0.3}
            />
            <FeatureCard
              icon={Sparkles}
              title="Smart Suggestions"
              description="Stuck on a question? The AI offers context-aware hints."
              delay={0.4}
            />
            <FeatureCard
              icon={Target}
              title="Progress Tracking"
              description="Visualize your improvement over time with detailed analytics."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#020205] py-8 md:py-12 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs md:text-sm flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-800 rounded-sm" />
            © 2026 PrepGenius AI.
          </div>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
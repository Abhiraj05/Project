"use client";

import { motion } from "framer-motion";

export default function WelcomeBanner({ onPlanClick }) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.12] via-slate-900 to-slate-950 p-6 sm:p-9">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.45, 0.2] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />Your personal AI travel planner
          </div>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Where will your<br className="hidden sm:block" /> next adventure take you?</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">Tell us what you love, where you want to go, and how much you want to spend. Your personalized journey starts here.</p>
          <button onClick={onPlanClick} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400">Plan my next trip <span>→</span></button>
        </div>
        <div className="hidden shrink-0 md:block">
          <motion.div animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex h-32 w-32 items-center justify-center rounded-3xl border border-blue-400/15 bg-blue-500/[0.07] text-6xl shadow-2xl shadow-blue-950/30">🌍</motion.div>
        </div>
      </div>
    </motion.section>
  );
}

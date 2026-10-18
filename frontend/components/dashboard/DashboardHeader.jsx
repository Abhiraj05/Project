"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="sticky top-0 z-30 border-b border-white/[0.07] bg-slate-950/90 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">
        <div>
          <p className="text-xs text-slate-500">Workspace / Dashboard</p>
          <h1 className="mt-1 text-lg font-semibold tracking-tight">Your travel dashboard</h1>
        </div>
        <Link href="/profile" aria-label="Open profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20">JD</Link>
      </div>
    </motion.header>
  );
}

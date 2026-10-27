"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Feedback() {
  const [rating, setRating] = useState(0);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-950 text-white"
    >
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="border-b border-white/10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20"
            >
              ✈
            </motion.div>
            <span className="text-xl font-bold">
              Travel<span className="text-blue-400">AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </motion.header>

      <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-6 py-16">
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-10 z-0 h-100 w-150 max-w-[90vw] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          className="relative w-full max-w-2xl"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
            }}
            className="mb-8 text-center"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm font-semibold uppercase tracking-widest text-blue-400"
            >
              We value your opinion
            </motion.p>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="mt-3 text-4xl font-bold tracking-tight"
            >
              Help us improve TravelAI
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="mt-4 text-slate-400"
            >
              Tell us about your experience and help us make travel planning
              better.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            whileHover={{ borderColor: "rgba(96, 165, 250, 0.22)" }}
            className="rounded-2xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div>
              <label className="text-sm font-medium text-slate-300">
                How was your experience?
              </label>
              <div className="mt-4 flex gap-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Rate ${value} out of 5`}
                    aria-pressed={rating === value}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-colors duration-200 ${
                      rating >= value
                        ? "border-blue-400 bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10"
                        : "border-white/10 bg-slate-800/70 text-slate-600 hover:border-blue-400/40 hover:text-blue-300"
                    }`}
                  >
                    <motion.span
                      animate={{
                        scale: rating === value ? [1, 1.2, 1] : 1,
                        rotate: rating === value ? [0, -8, 8, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      ★
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-7"
            >
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Feedback
              </label>
              <textarea
                rows={6}
                placeholder="Tell us what you liked or what we could improve..."
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.43, duration: 0.4 }}
              className="mt-5"
            >
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Feedback category
              </label>
              <select className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                <option>General feedback</option>
                <option>AI recommendations</option>
                <option>Trip planning</option>
                <option>User experience</option>
                <option>Bug report</option>
                <option>Feature request</option>
              </select>
            </motion.div>

            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="mt-7 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold shadow-lg shadow-blue-500/15 transition-colors hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Submit Feedback
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}

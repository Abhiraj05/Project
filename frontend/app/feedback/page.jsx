"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

export default function Feedback() {
  const [rating, setRating] = useState(0);

  return (
    <>
      <Navbar />
      <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
        <motion.div
          animate={{
            opacity: [0.2, 0.45, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-32 top-40 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-32 bottom-20 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]"
        />

        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 flex justify-start"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-blue-400"
            >
              <motion.span
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
              Back to home
            </Link>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="relative w-full max-w-2xl"
            >
              <div className="mb-8 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm font-semibold uppercase tracking-widest text-blue-400"
                >
                  We value your opinion
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mt-3 text-4xl font-bold tracking-tight text-white"
                >
                  Help us improve TravelAI
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mt-4 leading-7 text-slate-400"
                >
                  Tell us about your experience and help us make travel planning
                  better.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                whileHover={{
                  borderColor: "rgba(96,165,250,0.25)",
                  transition: { duration: 0.3 },
                }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/5 blur-[80px]" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                  >
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-7"
                  >
                    <label className="text-sm font-medium text-slate-300">
                      How was your experience?
                    </label>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <motion.button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          whileHover={{
                            scale: 1.12,
                            y: -3,
                          }}
                          whileTap={{ scale: 0.85 }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 12,
                          }}
                          aria-label={`Rate ${value} out of 5 stars`}
                          aria-pressed={rating === value}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-colors duration-300 ${
                            rating >= value
                              ? "border-blue-400 bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10"
                              : "border-white/10 bg-white/5 text-slate-600 hover:border-blue-400/30 hover:text-blue-300"
                          }`}
                        >
                          <motion.span
                            animate={{
                              scale: rating >= value ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ duration: 0.25 }}
                          >
                            ★
                          </motion.span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-7"
                  >
                    <label
                      htmlFor="feedback"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Feedback
                    </label>

                    <textarea
                      id="feedback"
                      name="feedback"
                      rows={6}
                      placeholder="Tell us what you liked or what we could improve..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-5"
                  >
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Feedback category
                    </label>

                    <select
                      id="category"
                      name="category"
                      defaultValue="General feedback"
                      className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    >
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
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      boxShadow: "0px 8px 25px rgba(59,130,246,0.25)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-7 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors duration-300 hover:bg-blue-400"
                  >
                    Submit Feedback →
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

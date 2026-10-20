"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
return ( <section className="relative isolate overflow-hidden pt-32">


  {/* Background Travel Photo */}
  <div
    className="absolute inset-0 -z-20 bg-cover bg-center opacity-20"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80')",
    }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 -z-10 bg-slate-950/80" />

  {/* Background Glow */}
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="absolute left-1/2 top-20 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
  />

  {/* Floating Background Glow */}
  <motion.div
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -25, 20, 0],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute right-0 top-40 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]"
  />

  <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

    {/* Left Content */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-md"
      >
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-blue-400"
        />
        Your AI-powered travel companion
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
      >
        Travel smarter.
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="block text-blue-400"
        >
          Explore further.
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
      >
        Plan unforgettable trips with an AI travel agent that understands
        your preferences, builds personalized itineraries, and helps you
        discover the world.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-8 flex flex-col gap-4 sm:flex-row"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="/signup"
            className="block rounded-xl bg-blue-500 px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-400"
          >
            Plan My Trip →
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="#how-it-works"
            className="block rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-center font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            See how it works
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-10 flex items-center gap-6 text-sm text-slate-400"
      >
        <div>
          <span className="font-semibold text-white">10K+</span>
          <span className="ml-2">trips planned</span>
        </div>

        <div className="h-5 w-px bg-white/10" />

        <div>
          <span className="font-semibold text-white">50+</span>
          <span className="ml-2">countries</span>
        </div>
      </motion.div>
    </motion.div>

    {/* Right - Travel Card */}
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="relative"
    >
      {/* Card Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 rounded-[2rem] bg-blue-500/20 blur-2xl"
      />

      {/* Floating Card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ y: -5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/30"
      >

        {/* Image */}
        <div
          className="relative h-72 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85')",
          }}
        >
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-3 text-6xl drop-shadow-lg"
              >
                🌍
              </motion.div>

              <p className="text-sm font-medium text-white drop-shadow-md">
                Your next adventure awaits
              </p>
            </motion.div>
          </div>

          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md"
          >
            ✨ AI Recommendation
          </motion.div>
        </div>

        {/* Trip Details */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">
                Recommended destination
              </p>

              <h3 className="mt-1 text-2xl font-semibold text-white">
                Kyoto, Japan
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.1,
                type: "spring",
              }}
              className="shrink-0 rounded-xl border border-blue-400/10 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400"
            >
              96% match
            </motion.div>
          </div>

          {/* Trip Information */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Duration", value: "7 Days" },
              { label: "Budget", value: "$1,800" },
              { label: "Style", value: "Culture" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + index * 0.15,
                }}
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255,255,255,0.09)",
                }}
                className="rounded-xl bg-white/5 p-3 transition-colors"
              >
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="mt-1 font-medium text-white">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* View Itinerary Button */}
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "#e2e8f0",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-semibold text-slate-950"
          >
            View itinerary
          </motion.button>
        </div>
      </motion.div>
    </motion.div>

  </div>
</section>


);
}

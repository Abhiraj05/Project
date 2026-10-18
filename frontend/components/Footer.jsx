"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
return ( <footer className="relative isolate overflow-hidden border-t border-white/10 bg-slate-950">


  {/* Background Glow */}
  <motion.div
    animate={{
      opacity: [0.15, 0.3, 0.15],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -right-32 -top-32 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]"
  />

  <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">

    {/* Logo and Description */}
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Link href="/" className="group inline-block">
        <motion.span
          whileHover={{ scale: 1.04 }}
          className="inline-block text-lg font-bold tracking-tight text-white"
        >
          Travel
          <span className="text-blue-400 transition-colors duration-300 group-hover:text-blue-300">
            AI
          </span>
        </motion.span>
      </Link>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-2 text-sm text-slate-400"
      >
        Your intelligent travel companion.
      </motion.p>
    </motion.div>

    {/* Footer Links */}
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-wrap gap-6 text-sm text-slate-400"
    >
      {[
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Contact", href: "/contact" },
      ].map((link, index) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.12,
          }}
          whileHover={{ y: -2 }}
        >
          <Link
            href={link.href}
            className="group relative transition-colors duration-300 hover:text-blue-400"
          >
            {link.name}

            {/* Animated Underline */}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        </motion.div>
      ))}
    </motion.div>

  </div>

  {/* Copyright */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="border-t border-white/5 bg-white/[0.01] py-5 text-center text-xs text-slate-500"
  >
    © {new Date().getFullYear()} TravelAI. All rights reserved.
  </motion.div>

</footer>

);
}

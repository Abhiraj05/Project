"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
{ name: "Features", href: "#features" },
{ name: "Destinations", href: "#destinations" },
{ name: "How it works", href: "#how-it-works" },
];

export default function Navbar() {
return (
<motion.nav
initial={{ opacity: 0, y: -25 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
> <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">


    {/* Logo */}
    <Link href="/" className="group flex items-center gap-2">
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: -8,
        }}
        whileTap={{ scale: 0.92 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 12,
        }}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20 transition-shadow duration-300 group-hover:shadow-blue-500/40"
      >
        <motion.span
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-lg"
        >
          ✈
        </motion.span>
      </motion.div>

      <motion.span
        whileHover={{ scale: 1.03 }}
        className="text-xl font-bold tracking-tight text-white"
      >
        Travel<span className="text-blue-400">AI</span>
      </motion.span>
    </Link>

    {/* Navigation */}
    <div className="hidden items-center gap-8 md:flex">
      {navLinks.map((link, index) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2 + index * 0.12,
          }}
        >
          <Link
            href={link.href}
            className="group relative text-sm text-slate-300 transition-colors duration-300 hover:text-blue-400"
          >
            {link.name}

            {/* Animated Underline */}
            <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-blue-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        </motion.div>
      ))}
    </div>

    {/* Actions */}
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex items-center gap-3"
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="hidden sm:block"
      >
        <Link
          href="/signin"
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-blue-400"
        >
          Sign in
        </Link>
      </motion.div>

      <motion.div
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: "0px 6px 25px rgba(59,130,246,0.25)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        <Link
          href="/signup"
          className="block rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors duration-300 hover:bg-blue-400"
        >
          Get Started
        </Link>
      </motion.div>
    </motion.div>

  </div>
</motion.nav>

);
}

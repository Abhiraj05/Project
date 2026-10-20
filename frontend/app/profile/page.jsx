"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const preferences = [
"Adventure",
"Food",
"Beaches",
"Culture",
"Nature",
"Nightlife",
"Shopping",
"Photography",
];

const cardVariants = {
hidden: { opacity: 0, y: 30 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.6, ease: "easeOut" },
},
};

export default function Profile() {
return ( <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">

  {/* Background Glow */}
  <motion.div
    animate={{
      opacity: [0.2, 0.4, 0.2],
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

  {/* Header */}
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

      {/* Logo */}
      <Link href="/" className="group flex items-center gap-2">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -8 }}
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
          >
            ✈
          </motion.span>
        </motion.div>

        <span className="text-xl font-bold tracking-tight text-white">
          Travel<span className="text-blue-400">AI</span>
        </span>
      </Link>

      {/* Home Link */}
      <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.97 }}>
        <Link
          href="/"
          className="text-sm text-slate-400 transition-colors duration-300 hover:text-blue-400"
        >
          ← Home
        </Link>
      </motion.div>
    </div>
  </motion.header>

  {/* Profile Content */}
  <div className="relative mx-auto max-w-5xl px-6 py-12">

    {/* Page Heading */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mb-10"
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
        Account
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
        Your travel profile
      </h1>

      <p className="mt-2 text-slate-400">
        Customize your preferences to get better AI recommendations.
      </p>
    </motion.div>

    {/* Profile Grid */}
    <div className="grid gap-6 lg:grid-cols-3">

      {/* Profile Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -5,
          transition: { duration: 0.25 },
        }}
        className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition-colors duration-300 hover:border-blue-400/20"
      >
        <div className="flex flex-col items-center text-center">

          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            className="flex h-24 w-24 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-3xl font-bold text-blue-400 shadow-lg shadow-blue-500/10"
          >
            JD
          </motion.div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            John Doe
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            john@example.com
          </p>

          <motion.button
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(96,165,250,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
          >
            Change profile photo
          </motion.button>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
        whileHover={{
          borderColor: "rgba(96,165,250,0.2)",
          transition: { duration: 0.3 },
        }}
        className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-black/10 backdrop-blur-xl lg:col-span-2"
      >
        <h2 className="text-lg font-semibold text-white">
          Personal information
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">

          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm text-slate-400"
            >
              Full name
            </label>

            <input
              id="fullName"
              defaultValue="John Doe"
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-slate-400"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              defaultValue="john@example.com"
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="travelStyle"
              className="mb-2 block text-sm text-slate-400"
            >
              Preferred travel style
            </label>

            <select
              id="travelStyle"
              defaultValue="Adventure"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            >
              <option>Adventure</option>
              <option>Relaxation</option>
              <option>Luxury</option>
              <option>Culture</option>
              <option>Budget</option>
              <option>Family</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-sm text-slate-400"
            >
              Budget preference
            </label>

            <select
              id="budget"
              defaultValue="Budget"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            >
              <option>Budget</option>
              <option>Mid-range</option>
              <option>Premium</option>
              <option>Luxury</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.04,
            y: -2,
            boxShadow: "0px 8px 25px rgba(59,130,246,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="mt-7 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors duration-300 hover:bg-blue-400"
        >
          Save changes →
        </motion.button>
      </motion.div>
    </div>

    {/* Travel Preferences */}
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.3 }}
      whileHover={{
        borderColor: "rgba(96,165,250,0.2)",
        transition: { duration: 0.3 },
      }}
      className="mt-6 rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-black/10 backdrop-blur-xl"
    >
      <h2 className="text-lg font-semibold text-white">
        Travel preferences
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Help TravelAI understand what you enjoy.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {preferences.map((item, index) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.35 + index * 0.06,
            }}
            whileHover={{
              scale: 1.06,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 transition-colors duration-300 hover:border-blue-400/40 hover:bg-blue-400/20 hover:text-blue-200"
          >
            {item}
          </motion.button>
        ))}
      </div>
    </motion.div>

    {/* Danger Zone */}
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
      className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6"
    >
      <h2 className="font-semibold text-red-400">
        Danger zone
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Permanently delete your TravelAI account and all associated data.
      </p>

      <motion.button
        whileHover={{
          scale: 1.03,
          backgroundColor: "rgba(239,68,68,0.12)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="mt-5 rounded-xl border border-red-500/30 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors duration-300 hover:border-red-500/50"
      >
        Delete account
      </motion.button>
    </motion.div>

  </div>
</main>

);
}

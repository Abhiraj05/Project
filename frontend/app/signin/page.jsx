"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignIn() {
const [showPassword, setShowPassword] = useState(false);

const containerVariants = {
hidden: { opacity: 0, y: 25 },
visible: {
opacity: 1,
y: 0,
transition: {
duration: 0.65,
ease: "easeOut",
staggerChildren: 0.12,
},
},
};

const itemVariants = {
hidden: { opacity: 0, y: 18 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.5, ease: "easeOut" },
},
};

return ( <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
{/* Animated Background Glows */}
<motion.div
animate={{
scale: [1, 1.12, 1],
opacity: [0.4, 0.7, 0.4],
}}
transition={{
duration: 8,
repeat: Infinity,
ease: "easeInOut",
}}
className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
/>

  <motion.div
    animate={{
      x: [0, 20, 0],
      y: [0, 15, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[120px]"
  />

  <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20"
            >
              ✈
            </motion.div>

            <span className="text-xl font-bold">
              Travel<span className="text-blue-400">AI</span>
            </span>
          </Link>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-8 text-3xl font-bold tracking-tight"
        >
          Welcome back
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-2 text-sm text-slate-400"
        >
          Sign in to continue planning your adventures.
        </motion.p>
      </motion.div>

      {/* Sign In Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{
          borderColor: "rgba(96, 165, 250, 0.22)",
        }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-blue-950/20 backdrop-blur-xl"
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {/* Email */}
          <motion.div variants={itemVariants}>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-blue-400/20"
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs text-blue-400 transition-colors duration-300 hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-sm outline-none transition duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-blue-400/20"
              />

              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 transition-colors duration-300 hover:text-blue-400"
              >
                {showPassword ? "Hide" : "Show"}
              </motion.button>
            </div>
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 8px 25px rgba(59, 130, 246, 0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-400"
          >
            Sign In
          </motion.button>
        </form>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="my-6 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-600">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </motion.div>

        {/* Google Sign In */}
        <motion.button
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium transition-colors duration-300"
        >
          <span className="font-semibold text-blue-400">G</span>
          Continue with Google
        </motion.button>

        {/* Sign Up Link */}
        <motion.p
          variants={itemVariants}
          className="mt-7 text-center text-sm text-slate-500"
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300"
          >
            Create account
          </Link>
        </motion.p>
      </motion.div>

      {/* Back to Home */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="mt-6 text-center"
      >
        <Link
          href="/"
          className="text-sm text-slate-500 transition-colors duration-300 hover:text-blue-400"
        >
          ← Back to home
        </Link>
      </motion.div>
    </motion.div>
  </div>
</main>

);
}

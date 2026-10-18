"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPassword() {
const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const [success, setSuccess] = useState(false);

const handleSubmit = (e) => {
e.preventDefault();
setSuccess(true);
};

const containerVariants = {
hidden: { opacity: 0, y: 25 },
visible: {
opacity: 1,
y: 0,
transition: {
duration: 0.7,
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
opacity: [0.5, 0.8, 0.5],
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
      x: [0, 25, 0],
      y: [0, 20, 0],
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
          Create a new password
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-3 text-sm leading-6 text-slate-400"
        >
          Choose a strong password to secure your TravelAI account.
        </motion.p>
      </motion.div>

      {/* Reset Password Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{
          borderColor: "rgba(96, 165, 250, 0.22)",
        }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-blue-950/20 backdrop-blur-xl"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="reset-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* New Password */}
              <motion.div variants={itemVariants}>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  New password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-sm outline-none transition duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-blue-400/20"
                  />

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 transition-colors hover:text-blue-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </motion.button>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Minimum 8 characters
                </p>
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants}>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-sm outline-none transition duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-blue-400/20"
                  />

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 transition-colors hover:text-blue-400"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </motion.button>
                </div>
              </motion.div>

              {/* Update Password Button */}
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 8px 25px rgba(59, 130, 246, 0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
              >
                Update Password
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-2xl text-emerald-400 ring-1 ring-emerald-500/20"
              >
                ✓
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-5 text-xl font-semibold"
              >
                Password updated
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-3 text-sm leading-6 text-slate-400"
              >
                Your password has been successfully changed. You can now
                sign in with your new password.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0px 8px 25px rgba(59, 130, 246, 0.25)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-6 inline-block"
                >
                  <Link
                    href="/signin"
                    className="inline-block rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold transition-colors hover:bg-blue-400"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Back to Home */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="mt-6 text-center"
      >
        <Link
          href="/"
          className="text-sm text-slate-500 transition-colors hover:text-blue-400"
        >
          ← Back to home
        </Link>
      </motion.div>
    </motion.div>
  </div>
</main>


);
}

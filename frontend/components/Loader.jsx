"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-0 h-125 w-175 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-0 right-0 h-87.5 w-87.5 rounded-full bg-indigo-500/10 blur-[120px]"
      />

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-3xl shadow-lg shadow-blue-500/20"
        >
          ✈
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold tracking-tight"
        >
          Travel<span className="text-blue-400">AI</span>
        </motion.h1>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-3 text-sm text-slate-400"
        >
          Planning your next adventure...
        </motion.p>

        <div className="relative mt-8 flex h-10 w-16 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-10 w-10 rounded-full border-2 border-transparent border-t-blue-400 border-r-indigo-400"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-6 w-6 rounded-full border-2 border-transparent border-b-blue-300 border-l-indigo-400"
          />
        </div>

        <div className="mt-5 flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: dot * 0.2,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-blue-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

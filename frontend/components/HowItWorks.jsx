"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Tell us your plans",
    description:
      "Share your destination, dates, budget and the kind of experience you want.",
    icon: "✈️",
  },
  {
    number: "02",
    title: "AI plans your journey",
    description:
      "Our AI analyzes your preferences and creates a personalized travel itinerary.",
    icon: "🗺️",
  },
  {
    number: "03",
    title: "Explore with confidence",
    description:
      "Follow your itinerary, discover new places and chat with your AI assistant anytime.",
    icon: "🌍",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden border-y border-white/5 bg-slate-950 py-24"
    >
      {/* Background Glow */}
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
        className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-widest text-blue-400"
          >
            Simple process
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Your trip, planned in minutes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 text-slate-400"
          >
            No endless searching. Just tell our AI what you want and let it
            handle the planning.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-16 grid gap-8 md:grid-cols-3"
        >
          {/* Connecting Line */}
         

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.25,
                },
              }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-blue-400/20 hover:bg-white/[0.04]"
            >
              {/* Step Number and Icon */}
              <div className="flex items-center justify-between">
                <motion.span
                  whileHover={{
                    scale: 1.1,
                  }}
                  className="text-5xl font-bold tracking-tight text-blue-400/30 transition-colors duration-300 group-hover:text-blue-400/70"
                >
                  {step.number}
                </motion.span>

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.12,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 12,
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-500/10 text-2xl shadow-lg shadow-blue-500/5 transition-colors duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-500/20"
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Step Title */}
              <h3 className="mt-6 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {step.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-6 h-0.5 w-10 rounded-full bg-blue-500/40 transition-all duration-500 group-hover:w-20 group-hover:bg-blue-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="group relative mt-20 overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-r from-blue-500/10 via-slate-900 to-cyan-500/5 p-8 text-center shadow-2xl shadow-blue-950/20 sm:p-12"
        >
          {/* CTA Background Glow */}
          <motion.div
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]"
          />

          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]"
          />

          {/* CTA Content */}
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400"
            >
              Your next adventure starts here
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Ready to plan your next adventure?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-4 max-w-xl text-slate-400"
            >
              Let your AI travel companion create a trip that's made just for
              you.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <motion.a
                href="/signup"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0px 10px 35px rgba(59,130,246,0.3)",
                }}
                whileTap={{
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="mt-8 inline-block rounded-xl bg-blue-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors duration-300 hover:bg-blue-400"
              >
                Start Planning →
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

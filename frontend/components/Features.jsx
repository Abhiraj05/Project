"use client";

import { motion } from "framer-motion";

const features = [
{
icon: "✦",
title: "AI Trip Planning",
description:
"Tell us where you want to go, your budget and travel style. Our AI creates a personalized itinerary for you.",
image:
"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
},
{
icon: "◈",
title: "Personalized Recommendations",
description:
"Discover destinations, hotels, restaurants and activities tailored to your interests.",
image:
"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
},
{
icon: "◎",
title: "Smart Itineraries",
description:
"Get optimized day-by-day plans that balance sightseeing, food, activities and relaxation.",
image:
"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
},
{
icon: "↗",
title: "Travel Assistant",
description:
"Chat with your AI travel companion anytime and get instant answers while planning your trip.",
image:
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
},
];

const containerVariants = {
hidden: {},
visible: {
transition: {
staggerChildren: 0.18,
},
},
};

const cardVariants = {
hidden: {
opacity: 0,
y: 45,
scale: 0.95,
},
visible: {
opacity: 1,
y: 0,
scale: 1,
transition: {
duration: 0.65,
ease: "easeOut",
},
},
};

export default function Features() {
return ( <section
   id="features"
   className="relative isolate overflow-hidden border-t border-white/5 py-24"
 >
{/* Background Travel Photo */}
<div
className="absolute inset-0 -z-20 bg-cover bg-center opacity-15"

/>

  {/* Dark Overlay */}
  <div className="absolute inset-0 -z-10 bg-slate-950/90" />

  {/* Animated Blue Glow */}
  <motion.div
    animate={{
      opacity: [0.25, 0.55, 0.25],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]"
  />

  <motion.div
    animate={{
      x: [0, 30, 0],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -right-32 bottom-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]"
  />

  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-2xl"
    >
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-sm font-semibold uppercase tracking-widest text-blue-400"
      >
        Powerful features
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        Everything you need to plan better trips
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-4 text-slate-400"
      >
        Let AI handle the planning while you focus on enjoying the journey.
      </motion.p>
    </motion.div>

    {/* Feature Cards */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          variants={cardVariants}
          whileHover={{
            y: -10,
            scale: 1.02,
            transition: {
              duration: 0.25,
              ease: "easeOut",
            },
          }}
          className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/10 backdrop-blur-md transition-colors duration-300 hover:border-blue-400/40 hover:bg-slate-900/90"
        >
          {/* Card Background Photo */}
          

          {/* Card Gradient Overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-blue-950/60" />

          {/* Hover Glow */}
          <div className="absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

          {/* Icon */}
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.15,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 12,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-xl text-blue-400 transition-colors duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-500/20"
          >
            {feature.icon}
          </motion.div>

          {/* Title */}
          <h3 className="mt-6 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
            {feature.description}
          </p>

          {/* Bottom Accent */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="absolute bottom-0 left-6 h-0.5 rounded-full bg-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>


);
}

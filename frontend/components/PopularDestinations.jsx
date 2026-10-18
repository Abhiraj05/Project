"use client";

import { motion } from "framer-motion";

const destinations = [
{
name: "Bali",
country: "Indonesia",
emoji: "🌴",
image:
"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
},
{
name: "Kyoto",
country: "Japan",
emoji: "⛩️",
image:
"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85",
},
{
name: "Santorini",
country: "Greece",
emoji: "🏝️",
image:
"https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85",
},
{
name: "Swiss Alps",
country: "Switzerland",
emoji: "🏔️",
image:
"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85",
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
y: 40,
scale: 0.96,
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

export default function PopularDestinations() {
return ( <section
   id="destinations"
   className="relative isolate overflow-hidden border-t border-white/5 bg-slate-950 py-24"
 >
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
    >
      <div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm font-semibold uppercase tracking-widest text-blue-400"
        >
          Get inspired
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Where will you go next?
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-md text-sm leading-6 text-slate-400"
      >
        From relaxing beaches to unforgettable adventures, let AI help you
        find your perfect destination.
      </motion.p>
    </motion.div>

    {/* Destination Cards */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {destinations.map((destination) => (
        <motion.div
          key={destination.name}
          variants={cardVariants}
          whileHover={{
            y: -10,
            scale: 1.02,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
          className="group relative isolate h-72 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/20 transition-colors duration-300 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/10"
        >
          {/* Destination Background Photo */}
          <motion.div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
              backgroundImage: `url('${destination.image}')`,
            }}
            whileHover={{ scale: 1.12 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/10 transition-colors duration-500 group-hover:from-slate-950 group-hover:via-slate-950/45" />

          {/* Blue Hover Glow */}
          <div className="absolute inset-0 bg-blue-500/0 transition-colors duration-500 group-hover:bg-blue-500/10" />

          {/* Destination Emoji */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 8,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 12,
            }}
            className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-4xl shadow-lg backdrop-blur-md transition-colors duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-500/20"
          >
            {destination.emoji}
          </motion.div>

          {/* Destination Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="absolute bottom-0 left-0 right-0 z-10 p-6"
          >
            <p className="text-sm font-medium text-blue-300">
              {destination.country}
            </p>

            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
              {destination.name}
            </h3>

            {/* Animated Accent */}
            <div className="mt-3 h-0.5 w-8 rounded-full bg-blue-400 transition-all duration-500 group-hover:w-16" />
          </motion.div>

          {/* Top Border Glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent transition-all duration-500 group-hover:via-blue-400/80" />
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>

);
}

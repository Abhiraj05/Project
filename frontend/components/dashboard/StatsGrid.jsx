"use client";

import { motion } from "framer-motion";
import { formatMoney } from "@/lib/travel";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function StatsGrid({ trips, budget, selectedCategories }) {
  const stats = [
    { label: "Total trips", value: trips.length, icon: "🧳", description: "Saved in your history" },
    { label: "Upcoming trips", value: trips.filter((trip) => ["Upcoming", "Booking requested"].includes(trip.status)).length, icon: "✈️", description: "Your next adventures" },
    { label: "Travel budget", value: formatMoney(Number(budget) || 0), icon: "💳", description: "Your current planning budget" },
    { label: "Travel categories", value: selectedCategories.length, icon: "✦", description: "Interests selected" },
  ];

  return (
    <motion.section initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={cardVariants} whileHover={{ y: -4 }} className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-5 transition-colors hover:border-blue-400/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-lg">{stat.icon}</span>
          </div>
          <p className="mt-4 text-2xl font-bold tracking-tight">{stat.value}</p>
          <p className="mt-1 text-xs text-slate-500">{stat.description}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}

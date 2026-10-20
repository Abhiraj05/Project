"use client";

import { motion } from "framer-motion";

export default function TripHistory({ trips, formatMoney }) {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Your journeys</p>
          <h2 className="mt-2 text-2xl font-bold">Trip history</h2>
        </div>
        <span className="rounded-full border border-white/[0.08] bg-slate-900 px-3 py-2 text-xs text-slate-400">{trips.length} trips</span>
      </div>

      {trips.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 px-6 py-10 text-center">
          <span className="text-3xl">🧳</span>
          <p className="mt-3 text-sm font-medium">No approved trips yet</p>
          <p className="mt-2 text-xs text-slate-500">Your approved proposals will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <motion.article key={trip.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/[0.08] bg-slate-900/70 p-5">
              <p className="text-xs text-emerald-300">✓ Approved</p>
              <h3 className="mt-2 text-lg font-semibold">{trip.destination}</h3>
              <p className="mt-1 text-xs text-slate-500">{trip.dates}</p>
              <p className="mt-4 text-xl font-bold text-blue-300">{formatMoney(trip.estimatedTotal)}</p>
              <p className="mt-2 text-xs text-slate-400">{trip.duration} days · {trip.travelers} travelers</p>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}

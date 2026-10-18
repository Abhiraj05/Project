"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { formatMoney } from "@/lib/travel";

export default function TripHistory({ trips }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const visibleTrips = showAll ? trips : trips.slice(0, 3);

  return (
    <motion.section id="trip-history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Your journeys</p>
          <h2 className="mt-2 text-2xl font-bold">Trip history</h2>
          <p className="mt-2 text-sm text-slate-500">Review your itineraries, costs and trip status.</p>
        </div>
        <button onClick={() => { setShowAll((value) => !value); setSelectedTripId(null); }} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:border-blue-400/30 hover:text-blue-300">
          {showAll ? "Show recent trips" : "View all trips"} →
        </button>
      </div>

      <div className="space-y-4">
        {visibleTrips.map((trip) => {
          const expanded = selectedTripId === trip.id;
          return (
            <motion.div key={trip.id} layout whileHover={{ y: -2 }} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/80 transition-colors hover:border-blue-400/20">
              <button onClick={() => setSelectedTripId(expanded ? null : trip.id)} className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-2xl">{trip.icon}</div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white sm:text-base">{trip.destination}</h3>
                    <p className="mt-1 text-xs text-slate-500">{trip.dates} · {trip.travelers} travelers</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">{(trip.categories || []).map((category) => <span key={category} className="rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-slate-400">{category}</span>)}</div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${trip.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : trip.status === "Booking requested" ? "bg-amber-500/10 text-amber-300" : "bg-blue-500/10 text-blue-400"}`}>{trip.status}</span>
                  <span className="text-sm font-semibold text-white">{formatMoney(trip.estimatedTotal)}</span>
                  <span className="text-xs text-slate-600">{expanded ? "Close ↑" : "Details ↓"}</span>
                </div>
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="border-t border-white/[0.07] p-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div><p className="text-xs uppercase tracking-widest text-slate-500">Accommodation</p><p className="mt-2 text-sm text-slate-300">{trip.hotel || "Not selected yet"}</p></div>
                        <div><p className="text-xs uppercase tracking-widest text-slate-500">Transportation</p><p className="mt-2 text-sm text-slate-300">{trip.transport || "Not selected yet"}</p></div>
                      </div>
                      <div className="mt-5">
                        <p className="text-xs uppercase tracking-widest text-slate-500">Itinerary highlights</p>
                        <div className="mt-3 space-y-2">{(trip.activities || []).map((activity, index) => <div key={activity} className="flex items-start gap-3"><span className="text-xs text-blue-400">{String(index + 1).padStart(2, "0")}</span><p className="text-sm text-slate-400">{activity}</p></div>)}</div>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                        <div><p className="text-xs text-slate-500">Planned budget</p><p className="mt-1 text-sm font-medium">{formatMoney(trip.budget)}</p></div>
                        <Link href="/profile" className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-400/30 hover:text-blue-300">Traveler profile →</Link>
                      </div>
                      {trip.status === "Booking requested" && <p className="mt-4 rounded-xl border border-amber-400/10 bg-amber-500/[0.05] p-3 text-xs leading-5 text-amber-200/80">Demo status: approved and saved in page state. Supplier reservations have not been completed.</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {trips.length === 0 && <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center"><p className="text-slate-400">Your trip history will appear here.</p></div>}
    </motion.section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/lib/travel";

export default function TripPlannerForm({
  destination, setDestination,
  startDate, setStartDate,
  endDate, setEndDate,
  budget, setBudget,
  travelers, setTravelers,
  selectedCategories, toggleCategory,
  notice, onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-5 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-lg text-blue-400">✦</span>
        <div>
          <h3 className="font-semibold">Trip requirements</h3>
          <p className="mt-1 text-xs text-slate-500">Tell us what your ideal trip looks like.</p>
        </div>
      </div>

      <div>
        <label htmlFor="destination" className="mb-2 block text-sm font-medium text-slate-300">Where do you want to go?</label>
        <input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Tokyo, Bali, Switzerland" className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10" />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-slate-300">Departure date</label>
          <input id="startDate" type="date" min={new Date().toISOString().split("T")[0]} value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-slate-300 outline-none [color-scheme:dark] focus:border-blue-400" />
        </div>
        <div>
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-slate-300">Return date</label>
          <input id="endDate" type="date" min={startDate || new Date().toISOString().split("T")[0]} value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-slate-300 outline-none [color-scheme:dark] focus:border-blue-400" />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-300">Total budget (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">$</span>
            <input id="budget" type="number" min="1" step="1" required value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-3 pl-8 pr-4 text-sm outline-none focus:border-blue-400" />
          </div>
        </div>
        <div>
          <label htmlFor="travelers" className="mb-2 block text-sm font-medium text-slate-300">Travelers</label>
          <select id="travelers" value={travelers} onChange={(e) => setTravelers(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-400">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => <option key={count} value={count}>{count} {count === 1 ? "traveler" : "travelers"}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-7">
        <p className="mb-3 text-sm font-medium text-slate-300">What are you interested in?</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((category) => {
            const selected = selectedCategories.includes(category.name);
            return (
              <motion.button key={category.name} type="button" whileTap={{ scale: 0.96 }} onClick={() => toggleCategory(category.name)} aria-pressed={selected} className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm transition duration-200 ${selected ? "border-blue-400/40 bg-blue-500/10 text-blue-300" : "border-white/[0.08] bg-slate-950/50 text-slate-400 hover:border-white/20 hover:text-white"}`}>
                <span>{category.icon}</span><span>{category.name}</span>{selected && <span className="ml-auto text-xs text-blue-400">✓</span>}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {notice && (
          <motion.div initial={{ opacity: 0, height: 0, y: -5 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0 }} className="mt-5 overflow-hidden">
            <p className="rounded-xl border border-blue-400/15 bg-blue-500/[0.07] p-3 text-xs leading-5 text-blue-300">{notice}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.01, boxShadow: "0 8px 25px rgba(59,130,246,0.2)" }} whileTap={{ scale: 0.98 }} type="submit" className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400">
        <span>✦</span> Generate my travel plan <span>→</span>
      </motion.button>
      <p className="mt-3 text-center text-[11px] leading-5 text-slate-600">Review your itinerary and estimated costs before approving any booking.</p>
    </form>
  );
}

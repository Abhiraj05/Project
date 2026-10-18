"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { initialTrips, formatMoney } from "@/lib/travel";

const filters = ["All trips", "Upcoming", "Completed", "Booking requested", "Awaiting approval"];

export default function HistoryPage() {
  const [trips, setTrips] = useState(initialTrips);
  const [filter, setFilter] = useState("All trips");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const filteredTrips = useMemo(() => trips.filter((trip) => {
    const matchesStatus = filter === "All trips" || trip.status === filter;
    const matchesSearch = `${trip.destination} ${(trip.categories || []).join(" ")}`.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  }), [trips, filter, search]);

  const removeTrip = (id) => setTrips((current) => current.filter((trip) => trip.id !== id));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <div className="min-h-screen lg:pl-64">
        <DashboardHeader />
        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute right-10 top-0 h-72 w-72 rounded-full bg-indigo-500/[0.07] blur-[110px]" />
          <div className="relative mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Your travel journal</p><h1 className="mt-2 text-3xl font-bold tracking-tight">My trips</h1><p className="mt-2 text-sm text-slate-400">All your planned getaways, in one place.</p></div>
            <a href="/chat" className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400">＋ Plan a new trip</a>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {[{ label: "Total trips", value: trips.length, icon: "🧳" }, { label: "Upcoming", value: trips.filter((trip) => ["Upcoming", "Booking requested", "Awaiting approval"].includes(trip.status)).length, icon: "🗓️" }, { label: "Total planned budget", value: formatMoney(trips.reduce((sum, trip) => sum + (Number(trip.budget) || 0), 0)), icon: "💳" }].map((item, index) => <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-white/[0.08] bg-slate-900/70 p-5"><div className="flex items-center justify-between"><p className="text-sm text-slate-400">{item.label}</p><span className="text-xl">{item.icon}</span></div><p className="mt-3 text-2xl font-bold">{item.value}</p></motion.div>)}
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search destinations or interests..." className="w-full rounded-xl border border-white/10 bg-slate-950 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400/40" /></div>
              <div className="flex flex-wrap items-center gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-3 py-2 text-xs transition ${filter === item ? "bg-blue-500/15 font-medium text-blue-300" : "text-slate-500 hover:bg-white/[0.04] hover:text-white"}`}>{item}</button>)}<div className="hidden h-7 w-px bg-white/10 sm:block" /><button onClick={() => setView("grid")} aria-label="Grid view" className={`rounded-lg px-3 py-2 text-xs ${view === "grid" ? "bg-white/10 text-white" : "text-slate-500"}`}>▦</button><button onClick={() => setView("list")} aria-label="List view" className={`rounded-lg px-3 py-2 text-xs ${view === "list" ? "bg-white/10 text-white" : "text-slate-500"}`}>☰</button></div>
            </div>

            {filteredTrips.length ? <div className={`mt-5 ${view === "grid" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}`}>
              {filteredTrips.map((trip, index) => <motion.article key={trip.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/50 transition hover:border-blue-400/20 ${view === "list" ? "flex flex-col sm:flex-row" : ""}`}>
                <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-slate-800 ${view === "grid" ? "h-36" : "h-28 sm:h-auto sm:w-44"}`}><div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl"/><span className="relative text-5xl">{trip.icon || "✈️"}</span><span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium ${trip.status === "Completed" ? "bg-emerald-500/15 text-emerald-300" : trip.status === "Upcoming" ? "bg-blue-500/15 text-blue-300" : "bg-amber-500/15 text-amber-300"}`}>{trip.status}</span></div>
                <div className="flex min-w-0 flex-1 flex-col p-4"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><h2 className="truncate font-semibold">{trip.destination}</h2><p className="mt-1 text-xs text-slate-500">▦ &nbsp;{trip.dates || "Dates to be confirmed"}</p></div><button onClick={() => removeTrip(trip.id)} title="Remove trip" className="rounded-lg px-2 py-1 text-slate-600 transition hover:bg-rose-500/10 hover:text-rose-300">···</button></div>
                  <div className="mt-4 flex flex-wrap gap-1.5">{(trip.categories || []).map((category) => <span key={category} className="rounded-md border border-white/[0.07] px-2 py-1 text-[10px] text-slate-400">{category}</span>)}</div>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/[0.06] pt-4"><div><p className="text-[10px] uppercase tracking-wider text-slate-600">Planned budget</p><p className="mt-1 font-semibold">{formatMoney(trip.budget)}</p></div><p className="text-xs text-slate-500">{trip.travelers || 1} traveler{trip.travelers === 1 ? "" : "s"}</p></div>
                </div>
              </motion.article>)}
            </div> : <div className="mt-5 rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center"><div className="text-4xl">🧭</div><h3 className="mt-4 font-semibold">No trips found</h3><p className="mt-2 text-sm text-slate-500">Try changing your search or status filter.</p><button onClick={() => { setFilter("All trips"); setSearch(""); }} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 transition hover:bg-white/5">Clear filters</button></div>}
          </div>
          <p className="mt-4 text-xs text-slate-600">Trip history is stored in page state for this demo and resets when the page reloads.</p>
        </div>
      </div>
    </main>
  );
}

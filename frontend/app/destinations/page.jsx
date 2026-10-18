"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { categories } from "@/lib/travel";

const destinations = [
  { id: 1, name: "Kyoto", country: "Japan", region: "Asia", category: "Culture", emoji: "⛩️", description: "Ancient temples, peaceful gardens, and traditional tea houses.", budget: "$1,200", duration: "5–7 days", best: "Mar – May", tone: "from-rose-500/25 via-orange-500/10 to-slate-900" },
  { id: 2, name: "Bali", country: "Indonesia", region: "Asia", category: "Beaches", emoji: "🌴", description: "Tropical beaches, emerald rice terraces, and wellness escapes.", budget: "$900", duration: "5–8 days", best: "Apr – Oct", tone: "from-emerald-500/25 via-teal-500/10 to-slate-900" },
  { id: 3, name: "Swiss Alps", country: "Switzerland", region: "Europe", category: "Adventure", emoji: "🏔️", description: "Alpine trails, scenic railways, and postcard-worthy villages.", budget: "$1,800", duration: "6–9 days", best: "Jun – Sep", tone: "from-sky-500/25 via-blue-500/10 to-slate-900" },
  { id: 4, name: "Amalfi Coast", country: "Italy", region: "Europe", category: "Relaxation", emoji: "🍋", description: "Colorful cliffside towns, coastal views, and slow Italian days.", budget: "$1,600", duration: "4–6 days", best: "May – Sep", tone: "from-yellow-500/25 via-orange-500/10 to-slate-900" },
  { id: 5, name: "Marrakech", country: "Morocco", region: "Africa", category: "Culture", emoji: "🕌", description: "Vibrant souks, beautiful riads, gardens, and rich local flavors.", budget: "$850", duration: "3–5 days", best: "Mar – May", tone: "from-orange-500/25 via-amber-500/10 to-slate-900" },
  { id: 6, name: "Costa Rica", country: "Costa Rica", region: "Americas", category: "Nature", emoji: "🦥", description: "Rainforests, wildlife, volcanoes, and unforgettable eco-adventures.", budget: "$1,300", duration: "7–10 days", best: "Dec – Apr", tone: "from-lime-500/25 via-green-500/10 to-slate-900" },
  { id: 7, name: "Bangkok", country: "Thailand", region: "Asia", category: "Food", emoji: "🍜", description: "Street-food discoveries, lively markets, and ornate temples.", budget: "$700", duration: "3–5 days", best: "Nov – Feb", tone: "from-fuchsia-500/20 via-purple-500/10 to-slate-900" },
  { id: 8, name: "Goa", country: "India", region: "Asia", category: "Beaches", emoji: "🏖️", description: "Golden beaches, Portuguese heritage, and laid-back coastal charm.", budget: "$400", duration: "3–5 days", best: "Nov – Feb", tone: "from-cyan-500/25 via-blue-500/10 to-slate-900" },
  { id: 9, name: "Patagonia", country: "Argentina & Chile", region: "Americas", category: "Adventure", emoji: "🥾", description: "Dramatic glaciers, rugged peaks, and wild landscapes.", budget: "$2,000", duration: "8–12 days", best: "Nov – Mar", tone: "from-indigo-500/25 via-sky-500/10 to-slate-900" },
];

const regions = ["All regions", "Asia", "Europe", "Africa", "Americas"];

export default function DestinationsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All styles");
  const [region, setRegion] = useState("All regions");
  const [favorites, setFavorites] = useState([2, 8]);

  const filteredDestinations = useMemo(() => destinations.filter((destination) => {
    const query = search.toLowerCase();
    return (`${destination.name} ${destination.country} ${destination.description}`).toLowerCase().includes(query)
      && (category === "All styles" || destination.category === category)
      && (region === "All regions" || destination.region === region);
  }), [search, category, region]);

  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <div className="min-h-screen lg:pl-64">
        <DashboardHeader />
        <div className="relative mx-auto max-w-[1500px] overflow-hidden px-5 py-8 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute -right-10 top-0 h-96 w-96 rounded-full bg-blue-500/[0.09] blur-[130px]" />
          <section className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.12] via-slate-900 to-indigo-500/[0.08] p-6 sm:p-10 lg:p-12">
            <div className="absolute -right-8 -top-10 select-none text-[180px] opacity-[0.07] sm:right-8 sm:text-[240px]">✈</div>
            <div className="relative max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300"><span>✦</span> Find your next escape</span><h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">The world is waiting.<br /><span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Where to next?</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Discover places worth dreaming about, from quiet coastal hideaways to culture-rich city breaks.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a destination or country..." className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400/40" /></div><Link href="/chat" className="rounded-xl bg-blue-500 px-5 py-3.5 text-center text-sm font-semibold transition hover:bg-blue-400">Plan with AI ↗</Link></div></div>
          </section>

          <div className="relative mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Explore the world</p><h2 className="mt-2 text-2xl font-bold">Popular destinations</h2><p className="mt-1 text-sm text-slate-500">Curated inspiration for your next adventure.</p></div>
            <div className="flex flex-wrap gap-2">{regions.map((item) => <button key={item} onClick={() => setRegion(item)} className={`rounded-lg border px-3 py-2 text-xs transition ${region === item ? "border-blue-400/30 bg-blue-500/10 text-blue-300" : "border-white/[0.07] text-slate-500 hover:border-white/15 hover:text-white"}`}>{item}</button>)}</div>
          </div>

          <div className="relative mt-5 flex gap-2 overflow-x-auto pb-2">{["All styles", ...categories.map((item) => item.name)].map((item) => { const found = categories.find((entry) => entry.name === item); return <button key={item} onClick={() => setCategory(item)} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs transition ${category === item ? "bg-blue-500 text-white shadow-lg shadow-blue-500/15" : "border border-white/[0.07] bg-slate-900/70 text-slate-400 hover:border-blue-400/20 hover:text-white"}`}>{found?.icon || "✦"} {item}</button>; })}</div>

          {filteredDestinations.length ? <div className="relative mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filteredDestinations.map((destination, index) => <motion.article key={destination.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/70 transition duration-300 hover:-translate-y-1 hover:border-blue-400/25 hover:shadow-xl hover:shadow-blue-950/20">
            <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${destination.tone}`}><div className="absolute -left-8 -top-12 h-40 w-40 rounded-full border border-white/[0.06]"/><div className="absolute -bottom-16 -right-6 h-48 w-48 rounded-full border border-white/[0.06]"/><span className="relative text-7xl drop-shadow-lg transition duration-500 group-hover:scale-110">{destination.emoji}</span><span className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-[10px] font-medium text-slate-200 backdrop-blur">{destination.region}</span><button onClick={() => toggleFavorite(destination.id)} aria-label={favorites.includes(destination.id) ? "Remove from favorites" : "Add to favorites"} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/50 text-lg backdrop-blur transition hover:scale-110">{favorites.includes(destination.id) ? <span className="text-rose-400">♥</span> : <span className="text-slate-300">♡</span>}</button><div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-slate-950/60 px-3 py-1.5 text-[10px] text-slate-200 backdrop-blur"><span>✦</span> {destination.category}</div></div>
            <div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-semibold">{destination.name}</h3><p className="mt-1 text-xs text-slate-500">{destination.country}</p></div><div className="text-right"><p className="text-[10px] uppercase tracking-wider text-slate-600">From</p><p className="mt-1 text-sm font-semibold text-blue-300">{destination.budget}</p></div></div><p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-400">{destination.description}</p><div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4"><div><p className="text-[10px] text-slate-600">Ideal duration</p><p className="mt-1 text-xs text-slate-300">{destination.duration}</p></div><div><p className="text-[10px] text-slate-600">Best time to visit</p><p className="mt-1 text-xs text-slate-300">{destination.best}</p></div></div><Link href={`/chat?destination=${encodeURIComponent(`${destination.name}, ${destination.country}`)}`} className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.07] py-3 text-xs font-semibold text-blue-300 transition hover:bg-blue-500 hover:text-white">Plan this trip <span>→</span></Link></div>
          </motion.article>)}</div> : <div className="relative mt-5 rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center"><div className="text-4xl">🌍</div><h3 className="mt-4 font-semibold">No destinations match</h3><p className="mt-2 text-sm text-slate-500">Try another search, region, or travel style.</p><button onClick={() => { setSearch(""); setCategory("All styles"); setRegion("All regions"); }} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/5">Reset filters</button></div>}

          <div className="relative mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 sm:flex-row sm:items-center"><div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">✨</div><div><h3 className="font-semibold">Have somewhere else in mind?</h3><p className="mt-1 text-sm text-slate-500">Tell TravelAI what you love and build a custom itinerary.</p></div></div><Link href="/chat" className="shrink-0 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold transition hover:bg-blue-400">Ask TravelAI ↗</Link></div>
          <p className="relative mt-4 text-xs text-slate-600">Destination budgets are illustrative estimates, not live prices or booking quotes.</p>
        </div>
      </div>
    </main>
  );
}

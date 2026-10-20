"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const groups = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Plan a Trip", href: "/dashboard", icon: "✦", badge: "AI" },
      { name: "My Trips", href: "/history", icon: "🧳" },
      { name: "Destinations", href: "/destinations", icon: "◎" },
    ],
  },
  {
    label: "PERSONAL",
    items: [
      { name: "My Profile", href: "/profile", icon: "♙" },
      { name: "Feedback", href: "/feedback", icon: "♧" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.07] bg-slate-950 lg:flex"
    >
      <div className="flex h-[76px] items-center border-b border-white/[0.07] px-6">
        <Link href="/" className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: -10, scale: 1.08 }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-lg shadow-lg shadow-blue-500/20">
            ✈
          </motion.div>
          <div>
            <p className="text-lg font-bold">Travel<span className="text-blue-400">AI</span></p>
            <p className="text-[10px] tracking-widest text-slate-500">YOUR PERSONAL TRAVEL AGENT</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-8">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.18em] text-slate-600">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href === "/history" && pathname.startsWith("/history"));
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }} className={`relative mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${active ? "bg-blue-500/10 font-medium text-blue-400" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}>
                      {active && <motion.span layoutId="sidebar-active" className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-blue-400" />}
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-base ${active ? "bg-blue-500/10 text-blue-400" : "text-slate-500"}`}>{item.icon}</span>
                      <span>{item.name}</span>
                      {item.badge && <span className="ml-auto rounded-md bg-blue-500/10 px-2 py-1 text-[9px] font-semibold text-blue-400">{item.badge}</span>}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

    

      <Link href="/profile" className="border-t border-white/[0.07] p-4 transition hover:bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-sm font-semibold text-blue-400">JD</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">John Doe</p>
            <p className="truncate text-xs text-slate-500">Personal traveler</p>
          </div>
          <span className="text-slate-600">↗</span>
        </div>
      </Link>
    </motion.aside>
  );
}

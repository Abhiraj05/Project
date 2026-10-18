"use client";

import Link from "next/link";

export default function ProfileSummary({ selectedCategories, name = "John Doe", email = "john@example.com" }) {
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-900/70 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 font-semibold text-blue-400">{initials}</div>
        <div><h3 className="font-semibold">{name}</h3><p className="mt-1 text-xs text-slate-500">{email}</p></div>
      </div>
      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <p className="text-xs text-slate-500">Your travel preferences</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedCategories.map((category) => <span key={category} className="rounded-full border border-blue-400/10 bg-blue-500/[0.07] px-3 py-1.5 text-[11px] text-blue-300">{category}</span>)}
          {selectedCategories.length === 0 && <span className="text-xs text-slate-600">No preferences selected</span>}
        </div>
      </div>
      <Link href="/profile" className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-blue-400 transition hover:text-blue-300">Manage profile <span>→</span></Link>
    </div>
  );
}

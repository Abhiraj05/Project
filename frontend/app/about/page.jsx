"use client";

import Link from "next/link";
import { useState } from "react";

export default function Feedback() {
const [rating, setRating] = useState(0);

return ( <main className="min-h-screen bg-slate-950 text-white">

  <header className="border-b border-white/10">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500">
          ✈
        </div>

        <span className="text-xl font-bold">
          Travel<span className="text-blue-400">AI</span>
        </span>
      </Link>

      <Link
        href="/"
        className="text-sm text-slate-400 hover:text-white"
      >
        ← Back to home
      </Link>

    </div>
  </header>

  <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-16">

    <div className="absolute left-1/2 top-10 -z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

    <div className="relative w-full max-w-2xl">

      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          We value your opinion
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Help us improve TravelAI
        </h1>

        <p className="mt-4 text-slate-400">
          Tell us about your experience and help us make travel planning
          better.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl">

        <div>
          <label className="text-sm font-medium text-slate-300">
            How was your experience?
          </label>

          <div className="mt-4 flex gap-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition ${
                  rating >= value
                    ? "border-blue-400 bg-blue-500/20 text-blue-400"
                    : "border-white/10 bg-white/5 text-slate-600 hover:text-white"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Feedback
          </label>

          <textarea
            rows={6}
            placeholder="Tell us what you liked or what we could improve..."
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Feedback category
          </label>

          <select className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-blue-400">
            <option>General feedback</option>
            <option>AI recommendations</option>
            <option>Trip planning</option>
            <option>User experience</option>
            <option>Bug report</option>
            <option>Feature request</option>
          </select>
        </div>

        <button className="mt-7 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold hover:bg-blue-400">
          Submit Feedback
        </button>

      </div>
    </div>
  </div>
</main>

);
}

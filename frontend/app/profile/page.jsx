"use client";

import Link from "next/link";

export default function Profile() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
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
            ← Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Your travel profile
          </h1>

          <p className="mt-2 text-slate-400">
            Customize your preferences to get better AI recommendations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Profile Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10 text-3xl font-bold text-blue-400">
                JD
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                John Doe
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                john@example.com
              </p>

              <button className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium hover:bg-white/10">
                Change profile photo
              </button>
            </div>

          </div>

          {/* Details */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 lg:col-span-2">

            <h2 className="text-lg font-semibold">
              Personal information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Full name
                </label>

                <input
                  defaultValue="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Email
                </label>

                <input
                  defaultValue="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Preferred travel style
                </label>

                <select className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-blue-400">
                  <option>Adventure</option>
                  <option>Relaxation</option>
                  <option>Luxury</option>
                  <option>Culture</option>
                  <option>Budget</option>
                  <option>Family</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Budget preference
                </label>

                <select className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-blue-400">
                  <option>Budget</option>
                  <option>Mid-range</option>
                  <option>Premium</option>
                  <option>Luxury</option>
                </select>
              </div>

            </div>

            <button className="mt-7 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold hover:bg-blue-400">
              Save changes
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-6">

          <h2 className="text-lg font-semibold">
            Travel preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Help TravelAI understand what you enjoy.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Adventure",
              "Food",
              "Beaches",
              "Culture",
              "Nature",
              "Nightlife",
              "Shopping",
              "Photography",
            ].map((item) => (
              <button
                key={item}
                className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 transition hover:bg-blue-400/20"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="font-semibold text-red-400">
            Danger zone
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Permanently delete your TravelAI account and all associated data.
          </p>

          <button className="mt-5 rounded-xl border border-red-500/30 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10">
            Delete account
          </button>
        </div>

      </div>
    </main>
  );
}


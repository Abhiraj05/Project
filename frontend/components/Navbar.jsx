"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500">
            <span className="text-lg">✈</span>
          </div>

          <span className="text-xl font-bold tracking-tight">
            Travel<span className="text-blue-400">AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#destinations"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Destinations
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            How it works
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:block"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

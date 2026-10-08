import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32">

      {/* Background glow */}
      <div className="absolute left-1/2 top-20 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Your AI-powered travel companion
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Travel smarter.
            <span className="block text-blue-400">
              Explore further.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Plan unforgettable trips with an AI travel agent that understands
            your preferences, builds personalized itineraries, and helps you
            discover the world.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-xl bg-blue-500 px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
            >
              Plan My Trip →
            </Link>

            <Link
              href="#how-it-works"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
            >
              See how it works
            </Link>
          </div>

          {/* Trust */}
          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
            <div>
              <span className="font-semibold text-white">10K+</span>
              <span className="ml-2">trips planned</span>
            </div>

            <div className="h-5 w-px bg-white/10" />

            <div>
              <span className="font-semibold text-white">50+</span>
              <span className="ml-2">countries</span>
            </div>
          </div>
        </div>

        {/* Right - Travel Card */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

            {/* Image */}
            <div className="relative h-72 bg-gradient-to-br from-blue-500/30 via-slate-800 to-slate-950">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-3 text-6xl">🌍</div>
                  <p className="text-sm text-slate-400">
                    Your next adventure awaits
                  </p>
                </div>
              </div>

              <div className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1.5 text-xs backdrop-blur-md">
                AI Recommendation
              </div>
            </div>

            {/* Trip details */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Recommended destination
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold">
                    Kyoto, Japan
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-500/10 px-3 py-2 text-sm text-blue-400">
                  96% match
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="mt-1 font-medium">7 Days</p>
                </div>

                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-slate-500">Budget</p>
                  <p className="mt-1 font-medium">$1,800</p>
                </div>

                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-slate-500">Style</p>
                  <p className="mt-1 font-medium">Culture</p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                View itinerary
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
"use client";

import Link from "next/link";

const recentTrips = [
  {
    destination: "Kyoto, Japan",
    dates: "Oct 18 – Oct 25",
    status: "Upcoming",
    icon: "⛩️",
  },
  {
    destination: "Bali, Indonesia",
    dates: "Aug 04 – Aug 10",
    status: "Completed",
    icon: "🌴",
  },
  {
    destination: "Dubai, UAE",
    dates: "Jun 12 – Jun 17",
    status: "Completed",
    icon: "🏙️",
  },
];

const quickActions = [
  {
    icon: "✦",
    title: "Plan a new trip",
    description: "Create a personalized itinerary with AI.",
    href: "/chat",
  },
  {
    icon: "🗺",
    title: "Explore destinations",
    description: "Discover places based on your interests.",
    href: "/destinations",
  },
  {
    icon: "💬",
    title: "Ask TravelAI",
    description: "Chat with your personal travel assistant.",
    href: "/chat",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500">
              ✈
            </div>

            <span className="text-xl font-bold">
              Travel<span className="text-blue-400">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-5">

            <Link
              href="/feedback"
              className="hidden text-sm text-slate-400 hover:text-white sm:block"
            >
              Feedback
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                JD
              </div>

              <span className="hidden text-sm font-medium sm:block">
                John Doe
              </span>
            </Link>

          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-slate-900 to-slate-950 p-8 sm:p-10">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative max-w-2xl">

            <p className="text-sm font-medium text-blue-400">
              Good evening, John 👋
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Where are we going next?
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-slate-400">
              Tell TravelAI where you want to go, your budget and what you
              love doing. We'll create a personalized journey for you.
            </p>

            <Link
              href="/chat"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
            >
              Plan a new trip
              <span>→</span>
            </Link>

          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">
              Trips planned
            </p>

            <p className="mt-2 text-3xl font-bold">
              12
            </p>

            <p className="mt-1 text-xs text-emerald-400">
              +3 this month
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">
              Countries explored
            </p>

            <p className="mt-2 text-3xl font-bold">
              8
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Keep exploring
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">
              Saved destinations
            </p>

            <p className="mt-2 text-3xl font-bold">
              24
            </p>

            <p className="mt-1 text-xs text-blue-400">
              View collection
            </p>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="mt-12">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                What would you like to do?
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                  {action.icon}
                </div>

                <h3 className="mt-5 font-semibold">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {action.description}
                </p>

                <div className="mt-5 text-sm font-medium text-blue-400">
                  Get started →
                </div>
              </Link>
            ))}

          </div>
        </section>

        {/* Upcoming Trip */}
        <section className="mt-12">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Your journeys
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Recent trips
              </h2>
            </div>

            <button className="text-sm text-blue-400 hover:text-blue-300">
              View all
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

            {recentTrips.map((trip, index) => (
              <div
                key={trip.destination}
                className={`flex items-center justify-between gap-4 p-5 ${
                  index !== recentTrips.length - 1
                    ? "border-b border-white/5"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">
                    {trip.icon}
                  </div>

                  <div>
                    <h3 className="font-medium">
                      {trip.destination}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {trip.dates}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <span
                    className={`hidden rounded-full px-3 py-1 text-xs sm:block ${
                      trip.status === "Upcoming"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {trip.status}
                  </span>

                  <button className="text-slate-500 hover:text-white">
                    →
                  </button>

                </div>

              </div>
            ))}

          </div>
        </section>

        {/* AI Assistant CTA */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-8">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div className="flex items-start gap-5">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                ✦
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Need help planning?
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Ask TravelAI about destinations, budgets, activities,
                  restaurants or anything related to your next adventure.
                </p>
              </div>

            </div>

            <Link
              href="/chat"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              Chat with AI
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}


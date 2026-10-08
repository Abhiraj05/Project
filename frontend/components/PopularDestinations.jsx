const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    emoji: "🌴",
  },
  {
    name: "Kyoto",
    country: "Japan",
    emoji: "⛩️",
  },
  {
    name: "Santorini",
    country: "Greece",
    emoji: "🏝️",
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    emoji: "🏔️",
  },
];

export default function PopularDestinations() {
  return (
    <section id="destinations" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Get inspired
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Where will you go next?
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-400">
            From relaxing beaches to unforgettable adventures, let AI help you
            find your perfect destination.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-slate-900 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              <div className="absolute right-6 top-6 text-5xl transition duration-300 group-hover:scale-110">
                {destination.emoji}
              </div>

              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-sm text-slate-400">
                  {destination.country}
                </p>

                <h3 className="mt-1 text-2xl font-semibold">
                  {destination.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
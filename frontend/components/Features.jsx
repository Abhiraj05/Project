const features = [
  {
    icon: "✦",
    title: "AI Trip Planning",
    description:
      "Tell us where you want to go, your budget and travel style. Our AI creates a personalized itinerary for you.",
  },
  {
    icon: "◈",
    title: "Personalized Recommendations",
    description:
      "Discover destinations, hotels, restaurants and activities tailored to your interests.",
  },
  {
    icon: "◎",
    title: "Smart Itineraries",
    description:
      "Get optimized day-by-day plans that balance sightseeing, food, activities and relaxation.",
  },
  {
    icon: "↗",
    title: "Travel Assistant",
    description:
      "Chat with your AI travel companion anytime and get instant answers while planning your trip.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Powerful features
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to plan better trips
          </h2>

          <p className="mt-4 text-slate-400">
            Let AI handle the planning while you focus on enjoying the journey.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
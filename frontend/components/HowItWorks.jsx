const steps = [
  {
    number: "01",
    title: "Tell us your plans",
    description:
      "Share your destination, dates, budget and the kind of experience you want.",
  },
  {
    number: "02",
    title: "AI plans your journey",
    description:
      "Our AI analyzes your preferences and creates a personalized travel itinerary.",
  },
  {
    number: "03",
    title: "Explore with confidence",
    description:
      "Follow your itinerary, discover new places and chat with your AI assistant anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-white/5 bg-white/[0.02] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Simple process
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Your trip, planned in minutes
          </h2>

          <p className="mt-4 text-slate-400">
            No endless searching. Just tell our AI what you want and let it
            handle the planning.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-5xl font-bold text-blue-500/20">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to plan your next adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Let your AI travel companion create a trip that's made just for
            you.
          </p>

          <a
            href="/signup"
            className="mt-8 inline-block rounded-xl bg-blue-500 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-400"
          >
            Start Planning →
          </a>
        </div>

      </div>
    </section>
  );
}
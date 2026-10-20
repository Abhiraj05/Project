"use client";

export default function TripProposalCard({ plan, formatMoney, onRequestApproval }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl rounded-tl-md border border-blue-400/20 bg-slate-950/70 text-left sm:min-w-[320px]">
      <div className="border-b border-white/[0.07] bg-gradient-to-r from-blue-500/[0.12] to-indigo-500/[0.06] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">Your trip proposal</p>
        <h3 className="mt-2 text-2xl font-bold">{plan.destination}</h3>
        <p className="mt-1 text-xs text-slate-400">{plan.dates}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {plan.categories.map((category) => (
            <span key={category} className="rounded-full border border-white/[0.08] bg-slate-950/40 px-3 py-1.5 text-xs text-slate-300">{category}</span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-slate-900/70 p-3">
            <p className="text-[10px] text-slate-500">Duration</p>
            <p className="mt-1 font-semibold">{plan.duration} days</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-slate-900/70 p-3">
            <p className="text-[10px] text-slate-500">Travelers</p>
            <p className="mt-1 font-semibold">{plan.travelers}</p>
          </div>
        </div>

        <h4 className="mt-6 font-semibold">Itinerary</h4>
        <div className="mt-4 space-y-4">
          {plan.itinerary.map((day) => (
            <div key={day.day} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg">{day.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">Day {day.day}</p>
                <h5 className="mt-1 text-sm font-medium">{day.title}</h5>
                <p className="mt-1 text-xs leading-6 text-slate-400">{day.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-white/[0.07] pt-5">
          <h4 className="font-semibold">Estimated expenses</h4>
          <div className="mt-4 space-y-3">
            {plan.costs.map((cost) => (
              <div key={cost.label} className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400">{cost.icon} {cost.label}</span>
                <span className="text-sm font-medium">{formatMoney(cost.amount)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5">
            <span className="text-sm font-semibold">Total estimated cost</span>
            <span className="text-xl font-bold text-blue-300">{formatMoney(plan.estimatedTotal)}</span>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] p-4">
          <p className="text-xs leading-6 text-slate-300">
            You can ask me to change the destination, budget, duration, activities, or travel preferences. I'll update the plan before you approve it.
          </p>
        </div>

        <div className="mt-5">
          {plan.status === "Booking requested" ? (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.08] px-4 py-3 text-center text-sm font-semibold text-emerald-300">✓ Trip proposal approved</div>
          ) : (
            <button type="button" onClick={onRequestApproval} className="w-full rounded-xl border border-blue-400/25 bg-blue-500/[0.08] px-4 py-3 text-sm font-medium text-blue-300 transition hover:bg-blue-500/[0.14]">
              Request final approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

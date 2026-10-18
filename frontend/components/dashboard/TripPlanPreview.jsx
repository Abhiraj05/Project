"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatMoney } from "@/lib/travel";

export default function TripPlanPreview({ activePlan, onApprove }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">✧</div>
          <div>
            <h3 className="font-semibold">Your travel plan</h3>
            <p className="mt-1 text-xs text-slate-500">Personalized itinerary preview</p>
          </div>
        </div>
        {activePlan && <span className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${activePlan.status === "Booking requested" ? "bg-amber-500/10 text-amber-300" : "bg-blue-500/10 text-blue-300"}`}>{activePlan.status}</span>}
      </div>

      <AnimatePresence mode="wait">
        {activePlan ? (
          <motion.div key={activePlan.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="mt-6">
            <div className="rounded-2xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.09] to-transparent p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-blue-400">DESTINATION</p>
                  <h4 className="mt-2 text-xl font-bold">{activePlan.destination}</h4>
                  <p className="mt-2 text-xs text-slate-400">{activePlan.dates}</p>
                </div>
                <span className="text-3xl">{activePlan.icon}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activePlan.categories.map((category) => <span key={category} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-300">{category}</span>)}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Accommodation & transport</p>
              <div className="space-y-3">
                <DetailRow icon="🏨" title="Accommodation" description={activePlan.hotel} />
                <DetailRow icon="🚕" title="Transportation" description={activePlan.transport} />
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Suggested activities</p>
              <div className="space-y-3">
                {activePlan.activities.map((activity, index) => (
                  <div key={activity} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[10px] text-blue-400">{index + 1}</span>
                    <p className="pt-1 text-xs leading-5 text-slate-400">{activity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Estimated trip cost</p>
                <span className="text-lg font-bold text-blue-400">{formatMoney(activePlan.estimatedTotal)}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500">Your total budget</span>
                <span className="text-slate-300">{formatMoney(activePlan.budget)}</span>
              </div>
              {activePlan.costs && (
                <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                  {activePlan.costs.map((cost) => (
                    <div key={cost.label} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-400">{cost.icon} {cost.label}</span>
                      <span className="font-medium text-slate-200">{formatMoney(cost.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-4 text-[10px] leading-5 text-slate-600">Estimates are illustrative and are not live supplier prices or confirmed reservations.</p>
            </div>

            {activePlan.status !== "Booking requested" ? (
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={onApprove} className="mt-5 w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">Approve this plan →</motion.button>
            ) : (
              <div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-500/[0.06] p-4">
                <p className="text-sm font-medium text-amber-300">Plan approved in this demo</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">The trip is saved in local page state. Real reservations require connected booking APIs and supplier confirmation.</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="empty-plan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/30 px-6 text-center">
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-400/15 bg-blue-500/[0.07] text-4xl">🧭</motion.div>
            <h4 className="mt-6 text-lg font-semibold">Your next journey starts here</h4>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Fill in your travel preferences and generate a personalized itinerary with an estimated budget.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">{["Hotels", "Activities", "Transport", "Budget"].map((item) => <span key={item} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-500">{item}</span>)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-slate-950/50 p-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

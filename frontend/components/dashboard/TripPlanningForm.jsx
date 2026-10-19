"use client";

import { motion } from "framer-motion";

export default function TripPlanningForm({
  form,
  setForm,
  error,
  onSubmit,
  isTyping,
  categories,
  onToggleCategory,
}) {
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ml-0 w-full max-w-2xl overflow-hidden rounded-2xl border border-blue-400/20 bg-slate-950/70 shadow-lg shadow-black/10 sm:ml-12"
    >
      <div className="border-b border-white/[0.07] bg-gradient-to-r from-blue-500/[0.12] to-indigo-500/[0.08] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-xl">✈️</div>
          <div>
            <h3 className="font-semibold text-white">Plan a trip with TravelAI</h3>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Fill in your trip details, then generate a proposal right here in the conversation.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 p-5">
        <div>
          <label htmlFor="planner-destination" className="text-sm font-medium text-slate-200">Destination</label>
          <input
            id="planner-destination"
            type="text"
            value={form.destination}
            onChange={(event) => updateField("destination", event.target.value)}
            placeholder="e.g. Goa, Manali, Japan"
            required
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="planner-start-date" className="text-sm font-medium text-slate-200">Departure date</label>
            <input
              id="planner-start-date"
              type="date"
              min={today}
              value={form.startDate}
              onChange={(event) => updateField("startDate", event.target.value)}
              required
              className="mt-2 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label htmlFor="planner-end-date" className="text-sm font-medium text-slate-200">Return date</label>
            <input
              id="planner-end-date"
              type="date"
              min={form.startDate || today}
              value={form.endDate}
              onChange={(event) => updateField("endDate", event.target.value)}
              required
              className="mt-2 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="planner-budget" className="text-sm font-medium text-slate-200">Total budget (INR)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-sm text-slate-400">₹</span>
              <input
                id="planner-budget"
                type="number"
                min="1"
                value={form.budget}
                onChange={(event) => updateField("budget", event.target.value)}
                placeholder="25000"
                required
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-8 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div>
            <label htmlFor="planner-travelers" className="text-sm font-medium text-slate-200">Travelers</label>
            <select
              id="planner-travelers"
              value={form.travelers}
              onChange={(event) => updateField("travelers", event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              {Array.from({ length: 20 }, (_, index) => index + 1).map((number) => (
                <option key={number} value={number}>{number} {number === 1 ? "traveler" : "travelers"}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-200">Travel interests</p>
          <p className="mt-1 text-xs text-slate-500">Select one or more interests.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => {
              const selected = form.categories.includes(category.name);
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => onToggleCategory(category.name)}
                  aria-pressed={selected}
                  className={`rounded-full border px-3 py-2 text-xs font-medium transition ${selected ? "border-blue-400 bg-blue-500/15 text-blue-300" : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"}`}
                >
                  {selected ? "✓ " : "+ "}{category.icon} {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isTyping}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isTyping ? "Generating your request..." : "Generate trip plan"}
          {!isTyping && <span aria-hidden="true">→</span>}
        </button>
        <p className="text-center text-[11px] leading-5 text-slate-500">
          Your plan appears in this chat. You can request changes before giving explicit final approval.
        </p>
      </form>
    </motion.div>
  );
}

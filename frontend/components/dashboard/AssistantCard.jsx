import Link from "next/link";

export default function AssistantCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.08] to-slate-900 p-5 sm:p-6">
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">✦</span>
        <h3 className="mt-4 font-semibold">Need help planning?</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">Tell your AI travel assistant about your ideal destination, budget, accommodation preferences and activities.</p>
        <Link href="/chat" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-xs font-semibold text-white transition hover:bg-blue-400">Chat with TravelAI <span>→</span></Link>
      </div>
    </div>
  );
}

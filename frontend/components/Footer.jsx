import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">

        <div>
          <Link href="/" className="text-lg font-bold">
            Travel<span className="text-blue-400">AI</span>
          </Link>

          <p className="mt-2 text-sm text-slate-500">
            Your intelligent travel companion.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>

          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>

          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>

      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} TravelAI. All rights reserved.
      </div>
    </footer>
  );
}
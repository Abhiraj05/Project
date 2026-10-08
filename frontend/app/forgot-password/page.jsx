"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
                ✈
              </div>

              <span className="text-xl font-bold">
                Travel<span className="text-blue-400">AI</span>
              </span>
            </Link>

            <h1 className="mt-8 text-3xl font-bold">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Enter your email address and we'll send you a secure link to
              reset your password.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

            {!emailSent ? (
              <form onSubmit={handleSubmit}>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />

                <button
                  type="submit"
                  className="mt-5 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold transition hover:bg-blue-400"
                >
                  Send Reset Link
                </button>

              </form>
            ) : (
              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-2xl">
                  ✉
                </div>

                <h2 className="mt-5 text-xl font-semibold">
                  Check your email
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  We've sent password reset instructions to your email
                  address. Check your inbox and follow the link to continue.
                </p>

                <button
                  onClick={() => setEmailSent(false)}
                  className="mt-6 text-sm text-blue-400 hover:text-blue-300"
                >
                  Try another email
                </button>

              </div>
            )}

            <div className="mt-7 border-t border-white/10 pt-6 text-center">
              <Link
                href="/signin"
                className="text-sm text-slate-400 hover:text-white"
              >
                ← Back to Sign In
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}


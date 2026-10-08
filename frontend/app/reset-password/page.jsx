"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

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
              Create a new password
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Choose a strong password to secure your TravelAI account.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* New Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    New password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-600">
                    Minimum 8 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold transition hover:bg-blue-400"
                >
                  Update Password
                </button>

              </form>
            ) : (
              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-2xl text-emerald-400">
                  ✓
                </div>

                <h2 className="mt-5 text-xl font-semibold">
                  Password updated
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your password has been successfully changed. You can now
                  sign in with your new password.
                </p>

                <Link
                  href="/signin"
                  className="mt-6 inline-block rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold hover:bg-blue-400"
                >
                  Sign In
                </Link>

              </div>
            )}

          </div>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-slate-500 hover:text-white"
          >
            ← Back to home
          </Link>

        </div>
      </div>
    </main>
  );
}


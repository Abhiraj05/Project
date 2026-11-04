"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import axios from "axios";

export default function ForgotPassword() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
    show: false,
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
      show: true,
    });
  };

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const handleNavigate = (route) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(route);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = formData.email.trim();

    if (!email) {
      showToast("Please enter your email address.", "error");
      return;
    }

    if (email.length > 254) {
      showToast("Email address is too long.", "error");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return false;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          email: formData.email.trim(),
        },
      );

      showToast(
        response.data?.message || "Password reset instructions have been sent.",
        "success",
      );

      setEmailSent(true);
    } catch (error) {
      const detail =
        error.response?.data?.detail || error.response?.data?.message;

      const message =
        typeof detail === "string"
          ? detail
          : "Unable to process your request. Please try again.";

      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={closeToast}
        duration={3000}
      />
      {loading && <Loader />}

      {!loading && (
        <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
          <motion.div
            animate={{
              opacity: [0.2, 0.45, 0.2],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
          />

          <motion.div
            animate={{
              x: [0, 25, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -bottom-20 -right-32 -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]"
          />

          <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="w-full max-w-md"
            >
              <div className="mb-8 text-center">
                <Link href="/" className="group inline-flex items-center gap-2">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: -8,
                    }}
                    whileTap={{ scale: 0.92 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20 transition-shadow duration-300 group-hover:shadow-blue-500/40"
                  >
                    <motion.span
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ✈
                    </motion.span>
                  </motion.div>

                  <span className="text-xl font-bold tracking-tight text-white">
                    Travel<span className="text-blue-400">AI</span>
                  </span>
                </Link>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-8 text-3xl font-bold tracking-tight text-white"
                >
                  Forgot your password?
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-3 text-sm leading-6 text-slate-400"
                >
                  Enter your email address and we'll send you a secure link to
                  reset your password.
                </motion.p>
              </div>

              <motion.div
                whileHover={{
                  borderColor: "rgba(96,165,250,0.25)",
                  transition: { duration: 0.3 },
                }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/5 blur-[80px]" />

                <AnimatePresence mode="wait">
                  {!emailSent ? (
                    <motion.form
                      key="forgot-form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        maxLength={254}
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      />

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={
                          !loading
                            ? {
                                scale: 1.02,
                                y: -2,
                                boxShadow: "0px 8px 25px rgba(59,130,246,0.25)",
                              }
                            : {}
                        }
                        whileTap={!loading ? { scale: 0.97 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="mt-5 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors duration-300 hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? "Sending..." : "Send Reset Link →"}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="email-success"
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative z-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                          delay: 0.1,
                        }}
                        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-2xl text-blue-400"
                      >
                        ✉
                      </motion.div>

                      <h2 className="mt-5 text-xl font-semibold text-white">
                        Check your email
                      </h2>

                      <p className="mt-3 wrap-break-word text-sm leading-6 text-slate-400">
                        We've sent password reset instructions to{" "}
                        <span className="font-medium text-blue-400">
                          {email}
                        </span>
                        . Check your inbox and follow the link to continue.
                      </p>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setEmailSent(false);
                          setFormData({ email: "" });
                        }}
                        className="mt-6 text-sm font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300"
                      >
                        Try another email
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative z-10 mt-7 border-t border-white/10 pt-6 text-center"
                >
                  <button
                    onClick={() => handleNavigate("/signin")}
                    className="inline-block text-sm text-slate-400 transition-colors duration-300 hover:text-blue-400"
                  >
                    ← Back to Sign In
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      )}
    </>
  );
}

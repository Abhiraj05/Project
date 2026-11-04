"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import axios from "axios";

export default function Feedback() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    feedback: "",
    category: "General feedback",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
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
    const feedback = formData.feedback.trim();

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

    if (!email) {
      showToast("Please enter your email address.", "error");
      return;
    }

    if (email.length > 254) {
      showToast("Email address is too long.", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (!feedback) {
      showToast("Please enter your feedback.", "error");
      return;
    }

    if (feedback.length < 10) {
      showToast("Feedback must contain at least 10 characters.", "error");
      return;
    }

    if (feedback.length > 2000) {
      showToast("Feedback cannot exceed 2000 characters.", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback/submit`,
        {
          email: formData.email.trim(),
          feedback: formData.feedback.trim(),
          category: formData.category,
        },
      );

      showToast(
        response.data?.message || "Feedback submitted successfully!",
        "success",
      );

      setFormData({
        email: "",
        feedback: "",
        category: "General feedback",
      });
    } catch (error) {
      console.error("Feedback submission error:", error);

      const detail = error.response?.data?.detail;

      showToast(
        typeof detail === "string"
          ? detail
          : "Unable to submit feedback. Please try again.",
        "error",
      );
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
        <>
          {" "}
          <Navbar handleNavigate={handleNavigate} />
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
              className="pointer-events-none absolute -left-32 top-40 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
            />

            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-32 bottom-20 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]"
            />

            <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-8 flex justify-start"
              >
                <button
                  onClick={() => handleNavigate("/")}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-blue-400"
                >
                  <motion.span
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    ←
                  </motion.span>
                  Back to home
                </button>
              </motion.div>

              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="relative w-full max-w-2xl"
                >
                  <div className="mb-8 text-center">
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-sm font-semibold uppercase tracking-widest text-blue-400"
                    >
                      We value your opinion
                    </motion.p>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="mt-3 text-4xl font-bold tracking-tight text-white"
                    >
                      Help us improve TravelAI
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="mt-4 leading-7 text-slate-400"
                    >
                      Tell us about your experience and help us make travel
                      planning better.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    whileHover={{
                      borderColor: "rgba(96,165,250,0.25)",
                      transition: { duration: 0.3 },
                    }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
                  >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/5 blur-[80px]" />

                    <div className="relative z-10">
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                      >
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-slate-300"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-7"
                      >
                        <label
                          htmlFor="feedback"
                          className="mb-2 block text-sm font-medium text-slate-300"
                        >
                          Feedback
                        </label>

                        <textarea
                          id="feedback"
                          name="feedback"
                          rows={6}
                          maxLength={2000}
                          value={formData.feedback}
                          onChange={handleChange}
                          placeholder="Tell us what you liked or what we could improve..."
                          className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mt-5"
                      >
                        <label
                          htmlFor="category"
                          className="mb-2 block text-sm font-medium text-slate-300"
                        >
                          Feedback category
                        </label>

                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        >
                          <option>General feedback</option>
                          <option>AI recommendations</option>
                          <option>Trip planning</option>
                          <option>User experience</option>
                          <option>Bug report</option>
                          <option>Feature request</option>
                        </select>
                      </motion.div>

                      <motion.button
                        type="button"
                        onClick={handleSubmit}
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
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-7 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors duration-300 hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? "Submitting..." : "Submit Feedback →"}
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </main>
          <Footer handleNavigate={handleNavigate} />
        </>
      )}
    </>
  );
}

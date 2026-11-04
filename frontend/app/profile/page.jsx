"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import axios from "axios";

const preferences = [
  "Adventure",
  "Food",
  "Beaches",
  "Culture",
  "Nature",
  "Nightlife",
  "Shopping",
  "Photography",
];

const travelStyles = [
  "Adventure",
  "Relaxation",
  "Luxury",
  "Culture",
  "Budget",
  "Family",
];

const budgets = ["Budget", "Mid-range", "Premium", "Luxury"];
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    travel_style: "Adventure",
    budget: "Budget",
  });

  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info") => {
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

  const getApiUrl = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not configured.");
    }

    return apiUrl;
  };

  const getToken = () => {
    return localStorage.getItem("access_token");
  };

  const getAuthConfig = () => {
    const token = getToken();

    if (!token) {
      throw new Error("Please sign in to continue.");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${getApiUrl()}/auth/get-profile`,
          getAuthConfig(),
        );

        if (cancelled) return;

        const user = response.data?.user ?? response.data;

        setFormData({
          fullname: user.fullname ?? user.name ?? "",
          email: user.email ?? "",
          travel_style: user.travel_style ?? "Adventure",
          budget: user.budget ?? "Budget",
        });

        setSelectedPreferences(
          Array.isArray(user.preferences) ? user.preferences : [],
        );
      } catch (error) {
        if (cancelled) return;

        const status = error.response?.status;

        const message =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Unable to load profile.";

        if (status === 401 || status === 403) {
          showToast("Your session has expired. Please sign in again.", "error");

          localStorage.removeItem("access_token");

          setTimeout(() => {
            router.replace("/signin");
          }, 1200);
        } else {
          showToast(message, "error");
        }
      } finally {
        if (!cancelled) {
          setFetching(false);
        }
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const togglePreference = (item) => {
    setSelectedPreferences((prev) =>
      prev.includes(item)
        ? prev.filter((preference) => preference !== item)
        : [...prev, item],
    );
  };

  const handleSaveChanges = async () => {
    if (saving) return;

    const fullname = formData.fullname.trim();
    const email = formData.email.trim();

    if (!fullname) {
      showToast("Please enter your full name.", "error");
      return;
    }

    if (fullname.length < 2) {
      showToast("Name must contain at least 2 characters.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      showToast("Please enter your email.", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email.", "error");
      return;
    }

    if (!travelStyles.includes(formData.travel_style)) {
      showToast("Please select a valid travel style.", "error");
      return;
    }

    if (!budgets.includes(formData.budget)) {
      showToast("Please select a valid budget.", "error");
      return;
    }

    if (selectedPreferences.some((item) => !preferences.includes(item))) {
      showToast("Invalid travel preference selected.", "error");
      return;
    }

    setSaving(true);

    try {
      const response = await axios.put(
        `${getApiUrl()}/auth/update-profile`,
        {
          fullname: formData.fullname.trim(),
          email: formData.email.trim().toLowerCase(),
          travel_style: formData.travel_style,
          budget: formData.budget,
          preferences: selectedPreferences,
        },
        getAuthConfig(),
      );

      showToast(
        response.data?.message || "Profile updated successfully!",
        "success",
      );
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Unable to update your profile.";

      showToast(
        typeof message === "string"
          ? message
          : "Please check your profile information.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleting) return;

    setDeleting(true);

    try {
      const response = await axios.delete(
        `${getApiUrl()}/auth/delete-account`,
        getAuthConfig(),
      );

      localStorage.removeItem("access_token");

      showToast(
        response.data?.message || "Your account has been deleted.",
        "success",
      );

      setTimeout(() => {
        router.replace("/signup");
      }, 1200);
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Unable to delete your account.";

      showToast(
        typeof message === "string"
          ? message
          : "Unable to delete your account.",
        "error",
      );
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // if (fetching) {
  //   return (
  //     <>
  //       <Toast
  //         show={toast.show}
  //         message={toast.message}
  //         type={toast.type}
  //         onClose={closeToast}
  //         duration={3000}
  //       />

  //       <main className="flex min-h-screen items-center justify-center bg-slate-950">
  //         <Loader />
  //       </main>
  //     </>
  //   );
  // }

  const initials =
    formData.fullname
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  const handleNavigate = (route) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(route);
    }, 2000);
  };

  return (
    <>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
        duration={3500}
      />
      {loading && <Loader />}

      {!loading && (
        <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white pb-9">
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
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

          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <Link href="/" className="group flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -8 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 12,
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20 transition-shadow duration-300 group-hover:shadow-blue-500/40"
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
            </div>
          </motion.header>

          <div className="relative mx-auto max-w-7xl px-6 pt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8 flex justify-start"
            >
              <button
                onClick={() => handleNavigate("/dashboard")}
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-blue-400"
              >
                <motion.span
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  ←
                </motion.span>
                Back to Dashboard
              </button>
            </motion.div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 ">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-10"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Account
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Your travel profile
              </h1>

              <p className="mt-2 text-slate-400">
                Customize your preferences to get better AI recommendations.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25 },
                }}
                className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition-colors duration-300 hover:border-blue-400/20"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-3xl font-bold text-blue-400 shadow-lg shadow-blue-500/10"
                  >
                    {initials}
                  </motion.div>

                  <h2 className="mt-5 text-xl font-semibold text-white">
                    {formData.fullname || "Your name"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {formData.email}
                  </p>

                  <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
                    TravelAI Member
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                whileHover={{
                  borderColor: "rgba(96,165,250,0.2)",
                  transition: { duration: 0.3 },
                }}
                className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-black/10 backdrop-blur-xl lg:col-span-2"
              >
                <h2 className="text-lg font-semibold text-white">
                  Personal information
                </h2>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm text-slate-400"
                    >
                      Full name
                    </label>

                    <input
                      id="fullName"
                      name="fullname"
                      type="text"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-slate-400"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="travelStyle"
                      className="mb-2 block text-sm text-slate-400"
                    >
                      Preferred travel style
                    </label>

                    <select
                      id="travelStyle"
                      name="travel_style"
                      value={formData.travel_style}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    >
                      {travelStyles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-sm text-slate-400"
                    >
                      Budget preference
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    >
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <motion.button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveChanges}
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                    boxShadow: "0px 8px 25px rgba(59,130,246,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="mt-7 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors duration-300 hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes →"}
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              whileHover={{
                borderColor: "rgba(96,165,250,0.2)",
                transition: { duration: 0.3 },
              }}
              className="mt-6 rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-black/10 backdrop-blur-xl"
            >
              <h2 className="text-lg font-semibold text-white">
                Travel preferences
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Help TravelAI understand what you enjoy.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {preferences.map((item, index) => {
                  const isSelected = selectedPreferences.includes(item);

                  return (
                    <motion.button
                      key={item}
                      type="button"
                      aria-pressed={isSelected}
                      initial={{
                        opacity: 0,
                        scale: 0.85,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.35 + index * 0.06,
                      }}
                      whileHover={{
                        scale: 1.06,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => togglePreference(item)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                        isSelected
                          ? "border-blue-400/50 bg-blue-500/20 text-blue-200"
                          : "border-blue-400/20 bg-blue-400/10 text-blue-300 hover:border-blue-400/40 hover:bg-blue-400/20 hover:text-blue-200"
                      }`}
                    >
                      {isSelected ? "✓ " : ""}
                      {item}
                    </motion.button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Selected: {selectedPreferences.length} preferences
              </p>

              <motion.button
                type="button"
                disabled={saving}
                onClick={handleSaveChanges}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 rounded-xl border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500/20 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save preferences"}
              </motion.button>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/4 p-6"
            >
              <h2 className="font-semibold text-red-400">Danger zone</h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Permanently delete your TravelAI account and all associated
                data.
              </p>

              {!showDeleteConfirm ? (
                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "rgba(239,68,68,0.12)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="mt-5 rounded-xl border border-red-500/30 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors duration-300 hover:border-red-500/50"
                >
                  Delete account
                </motion.button>
              ) : (
                <div className="mt-5">
                  <p className="text-sm text-red-300">
                    Are you sure? This action may permanently delete your
                    account and associated data.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={handleDeleteAccount}
                      className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:opacity-50"
                    >
                      {deleting ? "Deleting..." : "Yes, delete my account"}
                    </button>

                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      )}
    </>
  );
}

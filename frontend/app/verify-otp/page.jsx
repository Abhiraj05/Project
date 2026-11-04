"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import axios from "axios";

export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef([]);

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

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");

      const newOtp = ["", "", "", "", "", ""];

      digits.forEach((digit, i) => {
        newOtp[i] = digit;
      });

      setOtp(newOtp);

      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();

      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pastedData)) {
      showToast("Please paste a valid 6-digit OTP.", "error");
      return;
    }

    const digits = pastedData.split("");

    setOtp(digits);

    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const enteredOtp = otp.join("");

    if (!email) {
      showToast("Email address is missing. Please try again.", "error");
      return;
    }

    if (!/^\d{6}$/.test(enteredOtp)) {
      showToast("Please enter the complete 6-digit OTP.", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
        {
          email: email,
          otp: enteredOtp,
        },
      );

      showToast(
        response.data?.message || "OTP verified successfully!",
        "success",
      );

      const resetToken = response.data?.reset_token;

      setTimeout(() => {
        if (resetToken) {
          router.push(`/set-password?token=${encodeURIComponent(resetToken)}`);
        } else {
          router.push("/set-password");
        }
      }, 800);
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.message;

      const message =
        typeof detail === "string"
          ? detail
          : "Invalid or expired OTP. Please try again.";

      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0 || resending) return;

    if (!email) {
      showToast("Email address is missing. Please try again.", "error");
      return;
    }

    try {
      setResending(true);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`, {
        email: email,
      });

      setOtp(["", "", "", "", "", ""]);
      setTimer(30);

      showToast("A new OTP has been sent to your email.", "success");

      inputRefs.current[0]?.focus();
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.message;

      const message =
        typeof detail === "string"
          ? detail
          : "Unable to resend OTP. Please try again.";

      showToast(message, "error");
    } finally {
      setResending(false);
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
                  Verify your OTP
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-3 text-sm leading-6 text-slate-400"
                >
                  We&apos;ve sent a verification code to your email address.
                  Enter the 6-digit code below to continue.
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

                <div className="relative z-10">
                  <div className="mb-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-2xl text-blue-400">
                      ✉
                    </div>

                    <p className="text-sm text-slate-400">
                      Verification code sent to
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-blue-400">
                      {email || "your registered email"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <label className="mb-4 block text-center text-sm font-medium text-slate-300">
                      Enter verification code
                    </label>

                    <div
                      className="flex justify-center gap-2 sm:gap-3"
                      onPaste={handlePaste}
                    >
                      {otp.map((digit, index) => (
                        <motion.input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete={index === 0 ? "one-time-code" : "off"}
                          aria-label={`OTP digit ${index + 1}`}
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          whileFocus={{ scale: 1.05 }}
                          className={`h-12 w-10 rounded-xl border bg-slate-950/70 text-center text-lg font-semibold text-white outline-none transition-all duration-300 sm:h-14 sm:w-12 ${
                            digit
                              ? "border-blue-400 ring-2 ring-blue-400/10"
                              : "border-white/10"
                          } focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20`}
                        />
                      ))}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!loading ? { scale: 0.97 } : {}}
                      className="mt-6 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-colors duration-300 hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Verifying..." : "Verify OTP →"}
                    </motion.button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                      Didn&apos;t receive the code?
                    </p>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={timer > 0 || resending}
                      onClick={handleResendOTP}
                      className="mt-2 text-sm font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300 disabled:cursor-not-allowed disabled:text-slate-600"
                    >
                      {resending
                        ? "Sending..."
                        : timer > 0
                          ? `Resend OTP in ${timer}s`
                          : "Resend OTP"}
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-7 border-t border-white/10 pt-6 text-center"
                  >
                    <button
                      type="button"
                      onClick={() => handleNavigate("/forgot-password")}
                      className="inline-block text-sm text-slate-400 transition-colors duration-300 hover:text-blue-400"
                    >
                      ← Back to Forgot Password
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      )}
    </>
  );
}

"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Toast({
  message,
  type = "success",
  show,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  const styles = {
    success: {
      icon: "✓",
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
      iconBg: "bg-emerald-500/10",
    },
    error: {
      icon: "✕",
      color: "text-red-400",
      border: "border-red-500/20",
      bg: "bg-red-500/10",
      iconBg: "bg-red-500/10",
    },
    info: {
      icon: "i",
      color: "text-blue-400",
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
      iconBg: "bg-blue-500/10",
    },
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-9999 w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
      <AnimatePresence>
        {show && (
          <motion.div
            key={`${type}-${message}`}
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 30,
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            role={type === "error" ? "alert" : "status"}
            aria-live={type === "error" ? "assertive" : "polite"}
            className={`pointer-events-auto relative overflow-hidden rounded-2xl border ${currentStyle.border} ${currentStyle.bg} p-4 shadow-2xl shadow-black/30 backdrop-blur-xl`}
          >
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 12,
                  delay: 0.1,
                }}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${currentStyle.iconBg} text-lg font-bold ${currentStyle.color}`}
              >
                {currentStyle.icon}
              </motion.div>

              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className={`text-sm font-semibold ${currentStyle.color}`}>
                  {type === "success"
                    ? "Success"
                    : type === "error"
                      ? "Something went wrong"
                      : "Information"}
                </h3>

                <p className="mt-1 wrap-break-word text-sm leading-5 text-slate-300">
                  {message}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close notification"
                className="shrink-0 rounded-lg p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            <motion.div
              className={`absolute bottom-0 left-0 h-0.5 ${
                type === "success"
                  ? "bg-emerald-400"
                  : type === "error"
                    ? "bg-red-400"
                    : "bg-blue-400"
              }`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{
                duration: duration / 1000,
                ease: "linear",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

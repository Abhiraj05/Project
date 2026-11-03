"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const groups = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Plan a Trip", href: "/dashboard", icon: "✦", badge: "AI" },
      { name: "My Trips", href: "/history", icon: "🧳" },
      { name: "Destinations", href: "/destinations", icon: "◎" },
    ],
  },
  {
    label: "PERSONAL",
    items: [{ name: "My Profile", href: "/profile", icon: "♙" }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);

  const navigationStartTime = useRef(0);
  const previousPathname = useRef(pathname);
  const navigationLock = useRef(false);

  const handleNavigation = (e, href) => {
    e.preventDefault();


    if (pathname === href) {
      return;
    }

   
    if (navigationLock.current) {
      return;
    }

    navigationLock.current = true;

    navigationStartTime.current = Date.now();

    setIsNavigating(true);

    router.push(href);
  };


  useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname;

      const elapsed = Date.now() - navigationStartTime.current;


      const remaining = Math.max(0, 100 - elapsed);

      const timer = setTimeout(() => {
        setIsNavigating(false);
        navigationLock.current = false;
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950"
          role="status"
          aria-live="polite"
          aria-label="Loading page"
        >
          <div className="flex flex-col items-center gap-5">
    
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-500/20 border-t-blue-400"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-xl"
              >
                ✈
              </motion.span>
            </motion.div>

       
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xl font-bold tracking-tight text-white"
              >
                Travel
                <span className="text-blue-400">AI</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-2 text-sm font-medium text-slate-300"
              >
                Preparing your journey...
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-xs text-slate-500"
              >
                TravelAI is loading your page
              </motion.p>
            </div>

      
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: dot * 0.2,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

     
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.07] bg-slate-950 lg:flex"
      >
        
        <div className="flex h-19 items-center border-b border-white/[0.07] px-6">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.08 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-lg shadow-lg shadow-blue-500/20"
            >
              ✈
            </motion.div>

            <div>
              <p className="text-lg font-bold">
                Travel<span className="text-blue-400">AI</span>
              </p>

              <p className="text-[10px] tracking-widest text-slate-500">
                YOUR PERSONAL TRAVEL AGENT
              </p>
            </div>
          </Link>
        </div>

      
        <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-8">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.18em] text-slate-600">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href === "/history" &&
                      pathname.startsWith("/history"));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavigation(e, item.href)}
                      aria-disabled={isNavigating}
                    >
                      <motion.div
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${
                          active
                            ? "bg-blue-500/10 font-medium text-blue-400"
                            : "text-slate-400 hover:bg-white/4 hover:text-white"
                        }`}
                      >
                    
                        {active && (
                          <motion.span
                            layoutId="sidebar-active"
                            className="absolute bottom-2 left-0 top-2 w-0.75 rounded-r-full bg-blue-400"
                          />
                        )}

                      
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-base ${
                            active
                              ? "bg-blue-500/10 text-blue-400"
                              : "text-slate-500"
                          }`}
                        >
                          {item.icon}
                        </span>

             
                        <span>{item.name}</span>

                        {item.badge && (
                          <span className="ml-auto rounded-md bg-blue-500/10 px-2 py-1 text-[9px] font-semibold text-blue-400">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>


        <a className="border-t border-white/[0.07] p-4 transition hover:bg-white/3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-sm font-semibold text-blue-400">
              JD
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">John Doe</p>
              <p className="truncate text-xs text-slate-500">
                Personal traveler
              </p>
            </div>

            <span className="text-slate-600">↗</span>
          </div>
        </a>
      </motion.aside>
    </>
  );
}
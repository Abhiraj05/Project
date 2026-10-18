"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const starterPrompts = [
  {
    icon: "🏝️",
    label: "Plan a beach escape",
    prompt: "Plan a relaxing beach vacation for 5 days.",
  },
  {
    icon: "🏔️",
    label: "Find an adventure",
    prompt: "Suggest an adventurous trip with hiking and nature.",
  },
  {
    icon: "🍜",
    label: "Explore local food",
    prompt: "Help me plan a food-focused trip with local experiences.",
  },
  {
    icon: "💰",
    label: "Travel on a budget",
    prompt: "Plan an affordable 4-day trip with a budget of $800.",
  },
];

function createReply(message) {
  const text = message.toLowerCase();

  if (text.includes("budget") || text.includes("affordable")) {
    return "Absolutely! I can help you make the most of your budget. A useful starting point is to allocate around 35% to accommodation, 25% to transport, 20% to activities, 15% to food, and keep 5% for unexpected expenses. Which destination and travel dates do you have in mind?";
  }

  if (text.includes("beach")) {
    return "A beach escape sounds wonderful! Consider Bali for a mix of beaches and culture, Goa for laid-back coastal days, or Phuket for island-hopping. Tell me your departure city, dates, and approximate budget and I’ll help shape a day-by-day itinerary.";
  }

  if (
    text.includes("adventure") ||
    text.includes("hiking") ||
    text.includes("nature")
  ) {
    return "Let’s build an adventure around the outdoors. You could explore the Himalayas for mountain trails, Costa Rica for rainforest and wildlife, or the Dolomites for scenic hikes. What fitness level and trip length should I plan for?";
  }

  if (text.includes("food") || text.includes("culinary")) {
    return "For a food-focused trip, I’d plan around local markets, a cooking class, regional specialties, and a few neighborhood restaurants. Kyoto, Bangkok, and Istanbul are great starting points. Do you have a destination or cuisine in mind?";
  }

  return "I’d love to help you plan that! To make the itinerary feel personal, tell me your destination (or the kind of place you want to visit), travel dates, number of travelers, and approximate budget. I can then suggest a route, activities, and a practical budget breakdown.";
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi there! 👋 I’m your TravelAI assistant. Tell me what kind of trip you’re dreaming of, and I’ll help you turn it into a plan. Where would you like to go?",
      time: "Just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // FIX: Use a block body so the effect does not return a value.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (value = input) => {
    const text = value.trim();

    if (!text || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
      time: "Just now",
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: createReply(text),
          time: "Just now",
        },
      ]);

      setIsTyping(false);
    }, 750);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="min-h-screen lg:pl-64">
        <DashboardHeader />

        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-8 lg:px-10 lg:py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Your AI travel companion
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Plan with TravelAI
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Ideas, itineraries, and travel tips — all in one conversation.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.07] px-3 py-2 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Assistant ready
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
            <section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/70 shadow-2xl shadow-black/10">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl shadow-lg shadow-blue-500/20">
                    ✦
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      TravelAI Assistant
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Personal trip planner
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        id: Date.now(),
                        role: "assistant",
                        text: "New conversation started! What kind of trip can I help you plan?",
                        time: "Just now",
                      },
                    ])
                  }
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:border-white/20 hover:text-white"
                >
                  ＋ New chat
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm ${
                        message.role === "assistant"
                          ? "bg-blue-500/15 text-blue-300"
                          : "bg-slate-700 text-white"
                      }`}
                    >
                      {message.role === "assistant" ? "✦" : "JD"}
                    </div>

                    <div
                      className={`max-w-[88%] sm:max-w-[78%] ${
                        message.role === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`inline-block rounded-2xl px-4 py-3 text-left text-sm leading-6 ${
                          message.role === "assistant"
                            ? "rounded-tl-md border border-white/[0.06] bg-slate-800 text-slate-200"
                            : "rounded-tr-md bg-blue-500 text-white"
                        }`}
                      >
                        {message.text}
                      </div>

                      <p className="mt-1.5 px-1 text-[10px] text-slate-600">
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                      ✦
                    </div>

                    <div className="flex gap-1 rounded-2xl rounded-tl-md border border-white/[0.06] bg-slate-800 px-4 py-4">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {messages.length <= 1 && (
                <div className="border-t border-white/[0.06] px-4 pb-4 sm:px-6">
                  <p className="mb-3 text-xs font-medium text-slate-500">
                    TRY ASKING
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {starterPrompts.map((item) => (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => sendMessage(item.prompt)}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-slate-950/40 p-3 text-left text-xs text-slate-300 transition hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                        <span className="ml-auto text-slate-600">↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
                className="border-t border-white/[0.07] bg-slate-950/40 p-4 sm:p-5"
              >
                <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-slate-900 p-2 focus-within:border-blue-400/40">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Tell me about your dream trip..."
                    className="max-h-32 min-h-11 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600"
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-lg transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ↑
                  </button>
                </div>

                <p className="mt-2 text-center text-[10px] text-slate-600">
                  Demo assistant · Responses are illustrative, not live
                  AI-generated travel advice.
                </p>
              </form>
            </section>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-slate-900/70 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                  🧭
                </div>

                <h3 className="mt-4 font-semibold">Your trip, your way</h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Share your destination, dates, interests, and budget to get
                  more relevant suggestions.
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    "Destination",
                    "Travel dates",
                    "Budget",
                    "Travel style",
                  ].map((label, index) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 text-xs text-slate-400"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-[10px] text-blue-300">
                        {index + 1}
                      </span>

                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-400/15 bg-gradient-to-br from-blue-500/10 to-indigo-500/[0.04] p-5">
                <span className="text-xl">💡</span>

                <h3 className="mt-3 font-semibold">Travel tip</h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Keep a little room in your budget for spontaneous experiences
                  and unexpected costs.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}


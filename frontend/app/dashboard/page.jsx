"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TripPlanningForm from "@/components/dashboard/TripPlanningForm";
import TripProposalCard from "@/components/dashboard/TripProposalCard";
import TripHistory from "@/components/dashboard/TripHistory";
import axios from "axios";

const starterPrompts = [
  {
    title: "Plan a trip",
    description: "Create a personalized travel itinerary.",
    prompt:
      "Help me plan a trip. Ask me for my destination, duration, budget, and interests.",
    icon: "✈️",
  },
  {
    title: "Find destinations",
    description: "Discover places based on your interests.",
    prompt: "Suggest travel destinations based on my interests and budget.",
    icon: "🌍",
  },
  {
    title: "Optimize my budget",
    description: "Plan a trip within your budget.",
    prompt: "Help me plan a memorable trip while staying within my budget.",
    icon: "💰",
  },
  {
    title: "Modify my itinerary",
    description: "Customize an existing travel plan.",
    prompt: "I want to modify my travel itinerary. Help me customize it.",
    icon: "🗺️",
  },
];
const categories = [
  { name: "Adventure", icon: "🏔️" },
  { name: "Culture", icon: "🏛️" },
  { name: "Food", icon: "🍜" },
  { name: "Relaxation", icon: "🏖️" },
  { name: "Nature", icon: "🌿" },
  { name: "Shopping", icon: "🛍️" },
];

const initialMessage = {
  id: 1,
  role: "assistant",
  type: "text",
  text: "Hi! 👋 I'm TravelAI, your personal travel planner. I'll help you design the perfect trip. To get started, tell me where you want to go, how many days you have, your approximate budget in INR, how many people are travelling, and what activities you enjoy. You can also share these details one at a time!",
  time: "Just now",
};

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDuration(startDate, endDate, fallback = 3) {
  if (!startDate || !endDate) return fallback;

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  return Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1,
  );
}

function makeItinerary(destination, duration, preferences) {
  const activities = [
    {
      title: "Arrival and local exploration",
      description: `Arrive in ${destination}, settle into your accommodation, and explore the surrounding area.`,
      icon: "✈️",
    },
    {
      title: "Discover local attractions",
      description: `Explore popular attractions, landmarks, and cultural highlights around ${destination}.`,
      icon: "🏛️",
    },
    {
      title: "Local food and experiences",
      description: `Discover regional cuisine, local markets, and authentic experiences in ${destination}.`,
      icon: "🍜",
    },
    {
      title: "Adventure and activities",
      description: `Enjoy activities based on your interests: ${preferences.join(", ")}.`,
      icon: "🏔️",
    },
    {
      title: "Explore hidden gems",
      description: `Visit scenic spots and discover less crowded places around ${destination}.`,
      icon: "📸",
    },
    {
      title: "Relax and explore",
      description: `Enjoy a flexible day for sightseeing, relaxation, and optional activities.`,
      icon: "🌿",
    },
    {
      title: "Final discoveries",
      description: `Enjoy your remaining time in ${destination}, explore local shops, and prepare for departure.`,
      icon: "🛍️",
    },
  ];

  return Array.from({ length: duration }, (_, index) => ({
    day: index + 1,
    ...activities[index % activities.length],
  }));
}

function createPlan(details) {
  const budget = Number(details.budget);
  const duration = getDuration(
    details.startDate,
    details.endDate,
    details.duration || 3,
  );

  const accommodation = Math.round(budget * 0.35);
  const transportation = Math.round(budget * 0.25);
  const activities = Math.round(budget * 0.2);
  const food = Math.round(budget * 0.15);
  const other = budget - accommodation - transportation - activities - food;

  return {
    id: Date.now(),
    destination: details.destination,
    startDate: details.startDate || "",
    endDate: details.endDate || "",
    dates:
      details.startDate && details.endDate
        ? `${formatDate(details.startDate)} – ${formatDate(details.endDate)}`
        : `${duration}-day trip`,
    duration,
    travelers: Math.max(1, Number(details.travelers) || 1),
    budget,
    estimatedTotal: budget,
    categories: [...details.categories],
    status: "Awaiting approval",
    itinerary: makeItinerary(details.destination, duration, details.categories),
    costs: [
      { label: "Accommodation", amount: accommodation, icon: "🏨" },
      { label: "Transportation", amount: transportation, icon: "✈️" },
      { label: "Activities", amount: activities, icon: "🎟️" },
      { label: "Food and dining", amount: food, icon: "🍽️" },
      { label: "Other expenses", amount: other, icon: "🧾" },
    ],
  };
}

function getCategories(text) {
  const lower = text.toLowerCase();

  const mapping = [
    ["Adventure", ["adventure", "hiking", "trekking", "outdoor"]],
    ["Culture", ["culture", "historical", "history", "heritage"]],
    ["Food", ["food", "culinary", "restaurant", "cuisine"]],
    ["Relaxation", ["relax", "relaxation", "beach", "spa"]],
    ["Nature", ["nature", "wildlife", "forest", "waterfall"]],
    ["Shopping", ["shopping", "markets", "souvenirs"]],
  ];

  return mapping
    .filter(([, keywords]) =>
      keywords.some((keyword) => lower.includes(keyword)),
    )
    .map(([category]) => category);
}

function extractBudget(text) {
  const match = text.match(
    /(?:₹|rs\.?\s*|inr\s*)\s*([\d,]+)|(?:budget|spend|cost|under|within|around|approximately|approx\.?)\s*(?:of\s*)?(?:₹|rs\.?\s*|inr\s*)?([\d,]+)/i,
  );

  const value = match?.[1] || match?.[2];

  if (!value) return null;

  const amount = Number(value.replace(/,/g, ""));

  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function extractDuration(text) {
  const match = text.match(/(\d+)\s*(?:-\s*)?(?:days?|nights?)/i);

  return match ? Math.max(1, Math.min(30, Number(match[1]))) : null;
}

function extractTravelers(text) {
  const match = text.match(
    /(\d+)\s*(?:people|persons|travelers|travellers|adults|members|guests)/i,
  );

  if (match) {
    return Math.max(1, Math.min(20, Number(match[1])));
  }

  if (/\b(?:solo|just me|alone|myself)\b/i.test(text)) return 1;
  if (/\bcouple\b/i.test(text)) return 2;

  return null;
}

function extractDestination(text) {
  const patterns = [
    /\b(?:to|in|visit|visiting|explore|exploring|destination is|destination:)\s+([a-z][a-z\s,.'-]{1,45}?)(?=\s+(?:for|with|under|within|on|from|between|and|budget|for\s+\d)|[,.;!?]|$)/i,
    /\b(?:trip|travel|vacation|holiday)\s+(?:to|in)\s+([a-z][a-z\s,.'-]{1,45}?)(?=\s+(?:for|with|under|within|on|from|between|and|budget)|[,.;!?]|$)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      const value = match[1].trim().replace(/[.,!?]+$/, "");

      if (
        value.length >= 2 &&
        !/^(a|the|my|some|an|this|next|there|here)$/i.test(value)
      ) {
        return value
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    }
  }

  return null;
}

function extractDates(text) {
  const match = text.match(
    /\b(\d{4}-\d{2}-\d{2})\s*(?:to|through|until|-)\s*(\d{4}-\d{2}-\d{2})\b/i,
  );

  if (!match) return null;

  return {
    startDate: match[1],
    endDate: match[2],
  };
}

function updateDetailsFromMessage(text, previous) {
  const lower = text.toLowerCase();
  const updated = { ...previous };

  const destination = extractDestination(text);
  const budget = extractBudget(text);
  const duration = extractDuration(text);
  const travelers = extractTravelers(text);
  const categoriesFound = getCategories(text);
  const dates = extractDates(text);

  if (destination) updated.destination = destination;
  if (budget) updated.budget = budget;
  if (duration) updated.duration = duration;
  if (travelers) updated.travelers = travelers;

  if (dates) {
    updated.startDate = dates.startDate;
    updated.endDate = dates.endDate;
    updated.duration = getDuration(dates.startDate, dates.endDate);
  }

  const isCategoryModification =
    /\b(add|include|focus on|more|prefer|interested in|change.*(?:activity|interest|style)|switch to)\b/i.test(
      text,
    );

  if (categoriesFound.length > 0) {
    if (isCategoryModification) {
      updated.categories = [
        ...new Set([...updated.categories, ...categoriesFound]),
      ];
    } else if (!updated.destination || !previous.destination) {
      updated.categories = categoriesFound;
    } else {
      updated.categories = [
        ...new Set([...updated.categories, ...categoriesFound]),
      ];
    }
  }

  const removeMatch = lower.match(
    /\b(?:remove|exclude|without|no more)\s+(adventure|culture|food|relaxation|nature|shopping)\b/i,
  );

  if (removeMatch) {
    const category = categories.find(
      (item) => item.name.toLowerCase() === removeMatch[1].toLowerCase(),
    );

    if (category) {
      updated.categories = updated.categories.filter(
        (item) => item !== category.name,
      );
    }
  }

  const durationOnly =
    duration !== null &&
    !destination &&
    !budget &&
    !travelers &&
    categoriesFound.length === 0;

  if (durationOnly && updated.startDate && updated.endDate) {
    const start = new Date(`${updated.startDate}T00:00:00`);
    const end = new Date(start);
    end.setDate(start.getDate() + duration - 1);

    updated.endDate = [
      end.getFullYear(),
      String(end.getMonth() + 1).padStart(2, "0"),
      String(end.getDate()).padStart(2, "0"),
    ].join("-");

    updated.duration = duration;
  }

  if (/\b(?:solo|just me|alone)\b/i.test(text)) {
    updated.travelers = 1;
  }

  return updated;
}

function getMissingDetails(details) {
  const missing = [];

  if (!details.destination) missing.push("destination");
  if (!details.budget || details.budget <= 0) missing.push("budget");
  if (!details.duration || details.duration <= 0) missing.push("trip duration");
  if (!details.travelers || details.travelers < 1)
    missing.push("number of travelers");
  if (!details.categories.length) missing.push("travel interests");

  return missing;
}

function formatMissingDetails(missing) {
  if (missing.length === 1) {
    return `I still need your ${missing[0]}. Could you share it with me?`;
  }

  return `I'm almost ready to create your proposal! Please tell me your ${missing.join(
    ", ",
  )}. You can share everything in one message.`;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [details, setDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    duration: null,
    budget: null,
    travelers: null,
    categories: [],
  });

  const [activePlan, setActivePlan] = useState(null);
  const [trips, setTrips] = useState([]);
  const [notice, setNotice] = useState("");
  const [planningForm, setPlanningForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "1",
    categories: ["Nature"],
  });
  const [planningFormError, setPlanningFormError] = useState("");

  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const appendAssistantMessage = (text, extra = {}) => {
    setMessages((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        role: "assistant",
        type: "text",
        text,
        time: "Just now",
        ...extra,
      },
    ]);
  };

  const processUserMessage = (text) => {
    const lower = text.toLowerCase();

    // Handle final approval requests.
    if (
      activePlan &&
      activePlan.status === "Awaiting approval" &&
      /\b(approve this plan|i approve|approve|approved|confirm|confirmed|proceed|go ahead|book it|finalize)\b/i.test(
        text,
      )
    ) {
      const approvedPlan = {
        ...activePlan,
        status: "Booking requested",
        approvedAt: new Date().toISOString(),
      };

      setActivePlan(approvedPlan);

      setTrips((current) => [
        approvedPlan,
        ...current.filter((trip) => trip.id !== approvedPlan.id),
      ]);

      setMessages((current) =>
        current.map((message) =>
          message.type === "plan" && message.plan.id === approvedPlan.id
            ? { ...message, plan: approvedPlan }
            : message,
        ),
      );

      appendAssistantMessage(
        `Your proposal for ${approvedPlan.destination} has been approved and saved to your trip history. The estimated budget is ${formatMoney(approvedPlan.estimatedTotal)}. Please note that this demo does not make real reservations.`,
      );

      setNotice("Trip proposal approved and saved to session history.");
      return;
    }

    // Handle requests to modify an existing proposal.
    const modificationIntent =
      /\b(change|modify|update|adjust|reduce|increase|add|remove|include|exclude|make it|instead|cheaper|more expensive|extend|shorten|different|switch|replace)\b/i.test(
        text,
      );

    if (
      activePlan &&
      activePlan.status === "Awaiting approval" &&
      modificationIntent
    ) {
      const updatedDetails = updateDetailsFromMessage(text, details);
      const missing = getMissingDetails(updatedDetails);

      if (missing.length > 0) {
        setDetails(updatedDetails);

        appendAssistantMessage(
          `I can update your proposal. ${formatMissingDetails(missing)}`,
        );

        return;
      }

      setDetails(updatedDetails);

      const revisedPlan = createPlan(updatedDetails);

      setActivePlan(revisedPlan);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + Math.random(),
          role: "assistant",
          type: "plan",
          plan: revisedPlan,
          text: "I've revised your proposal based on your feedback. Please review the updated itinerary and estimated expenses below.",
          time: "Just now",
        },
        {
          id: Date.now() + Math.random(),
          role: "assistant",
          type: "text",
          text: "Are you happy with this updated plan? You can request more changes, or approve it when you're ready.",
          time: "Just now",
        },
      ]);

      setNotice("Your trip proposal has been updated.");
      return;
    }

    // If the user requests changes to an already-approved trip,
    // start a new proposal rather than silently changing history.
    if (
      activePlan &&
      activePlan.status === "Booking requested" &&
      modificationIntent
    ) {
      const updatedDetails = updateDetailsFromMessage(text, details);
      const missing = getMissingDetails(updatedDetails);

      if (missing.length > 0) {
        setDetails(updatedDetails);

        appendAssistantMessage(
          `Let's create a revised proposal. ${formatMissingDetails(missing)}`,
        );

        return;
      }

      setDetails(updatedDetails);

      const revisedPlan = createPlan(updatedDetails);

      setActivePlan(revisedPlan);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + Math.random(),
          role: "assistant",
          type: "plan",
          plan: revisedPlan,
          text: "I've created a new proposal based on your requested changes. Your previously approved trip remains in your history.",
          time: "Just now",
        },
        {
          id: Date.now() + Math.random(),
          role: "assistant",
          type: "text",
          text: "Please review this new proposal. Would you like any further modifications, or are you ready to approve it?",
          time: "Just now",
        },
      ]);

      return;
    }

    // Let the user explicitly ask the assistant to prompt for final approval.
    if (
      activePlan &&
      activePlan.status === "Awaiting approval" &&
      /\b(ask me for final approval|please ask for final approval|request final approval|ready for final approval)\b/i.test(
        text,
      )
    ) {
      appendAssistantMessage(
        `Your proposal for ${activePlan.destination} is ready for final review. If you are satisfied with the itinerary and estimated cost of ${formatMoney(activePlan.estimatedTotal)}, type "Approve this plan" to confirm. You can still request changes before approving.`,
      );
      return;
    }

    // Positive feedback is not approval; ask for an explicit confirmation.
    if (
      activePlan &&
      activePlan.status === "Awaiting approval" &&
      /\b(looks good|happy with (?:this|the) plan|i like (?:this|the) plan|this plan is good)\b/i.test(
        text,
      )
    ) {
      appendAssistantMessage(
        `I'm glad you like the proposal! Before I mark it approved, please type "Approve this plan" to give your explicit final approval. If you'd like any changes, just tell me what to update.`,
      );
      return;
    }

    // Collect initial requirements or update incomplete requirements.
    const updatedDetails = updateDetailsFromMessage(text, details);
    const missing = getMissingDetails(updatedDetails);

    setDetails(updatedDetails);

    if (missing.length > 0) {
      appendAssistantMessage(formatMissingDetails(missing));
      return;
    }

    // Generate the first proposal or start a new one.
    const plan = createPlan(updatedDetails);

    setActivePlan(plan);

    setMessages((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        role: "assistant",
        type: "plan",
        plan,
        text: "I've prepared your initial trip proposal based on your requirements. Review the itinerary and estimated budget below. You can ask me to modify anything before we finalize it.",
        time: "Just now",
      },
      {
        id: Date.now() + Math.random(),
        role: "assistant",
        type: "text",
        text: "What do you think? Would you like any changes to the destination, duration, activities, or budget? I'll keep refining the proposal until you're happy, then ask for your approval.",
        time: "Just now",
      },
    ]);

    setNotice("Trip proposal generated. You can request changes in the chat.");
  };

  const sendMessage = (value = input) => {
    const text = value.trim();

    if (!text || isTyping) return;

    setInput("");
    setNotice("");

    setMessages((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        role: "user",
        type: "text",
        text,
        time: "Just now",
      },
    ]);

    setIsTyping(true);

    timerRef.current = window.setTimeout(() => {
      processUserMessage(text);
      setIsTyping(false);
      timerRef.current = null;
    }, 400);
  };

  const handlePlanningFormSubmit = (event) => {
    event.preventDefault();
    setPlanningFormError("");

    const destination = planningForm.destination.trim();
    const budget = Number(planningForm.budget);
    const startDate = planningForm.startDate;
    const endDate = planningForm.endDate;
    const travelers = Number(planningForm.travelers);

    if (
      !destination ||
      !startDate ||
      !endDate ||
      !Number.isFinite(budget) ||
      budget <= 0
    ) {
      setPlanningFormError(
        "Please complete the destination, dates, and a valid budget.",
      );
      return;
    }

    if (endDate < startDate) {
      setPlanningFormError(
        "The return date must be on or after the departure date.",
      );
      return;
    }

    if (!planningForm.categories.length) {
      setPlanningFormError("Choose at least one travel interest.");
      return;
    }

    const formattedBudget = budget.toLocaleString("en-IN");
    const prompt = `Plan a trip to ${destination} from ${startDate} to ${endDate} with a budget of ₹${formattedBudget} for ${travelers} travelers interested in ${planningForm.categories.join(", ")}. Generate a day-by-day itinerary and estimated expenses. Present it as a proposal, let me request changes in this chat, and ask for explicit final approval before treating it as approved.`;

    sendMessage(prompt);
  };

  const togglePlanningCategory = (category) => {
    setPlanningForm((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
    }));
    setPlanningFormError("");
  };

  const resetChat = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setMessages([
      {
        ...initialMessage,
        id: Date.now(),
      },
    ]);

    setInput("");
    setIsTyping(false);
    setDetails({
      destination: "",
      startDate: "",
      endDate: "",
      duration: null,
      budget: null,
      travelers: null,
      categories: [],
    });
    setActivePlan(null);
    setNotice("");
    setPlanningForm({
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
      travelers: "1",
      categories: ["Nature"],
    });
    setPlanningFormError("");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="min-h-screen lg:pl-64">
        <DashboardHeader />

        <div className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-8 lg:px-10 lg:py-8">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/[0.07] blur-[120px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative mb-7 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Your AI travel companion
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Let's plan your next adventure
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Describe your ideal trip, refine your itinerary through
                conversation, and approve your proposal when you're satisfied.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetChat}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:border-blue-400/30 hover:text-white"
            >
              + New conversation
            </motion.button>
          </motion.div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Approved trips",
                value: trips.length,
                icon: "🧳",
              },
              {
                label: "Current destination",
                value: activePlan?.destination || "Not selected",
                icon: "🌍",
              },
              {
                label: "Estimated budget",
                value: activePlan
                  ? formatMoney(activePlan.estimatedTotal)
                  : "Not generated",
                icon: "💰",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/[0.07] bg-slate-900/70 p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <span className="text-xl">{item.icon}</span>
                </div>

                <p className="mt-4 truncate text-xl font-bold">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
            className="overflow-hidden rounded-3xl border border-white/8 bg-slate-900/70 shadow-2xl shadow-black/10"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-xl shadow-lg shadow-blue-500/20">
                  ✦
                </div>

                <div>
                  <h2 className="text-sm font-semibold">TravelAI Assistant</h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Plan · Modify · Review · Approve
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.07] px-3 py-2 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online
              </span>
            </div>

            <div className="max-h-[75vh] min-h-112.5 space-y-6 overflow-y-auto px-4 py-6 sm:px-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
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
                    className={`min-w-0 max-w-[95%] sm:max-w-[85%] ${
                      message.role === "user" ? "text-right" : ""
                    }`}
                  >
                    {message.type === "text" ? (
                      <div
                        className={`inline-block rounded-2xl px-4 py-3 text-left text-sm leading-7 ${
                          message.role === "assistant"
                            ? "rounded-tl-md border border-white/6 bg-slate-800 text-slate-200"
                            : "rounded-tr-md bg-blue-500 text-white"
                        }`}
                      >
                        {message.text}
                      </div>
                    ) : (
                      <TripProposalCard
                        plan={message.plan}
                        formatMoney={formatMoney}
                        onRequestApproval={() =>
                          sendMessage("Please ask me for final approval.")
                        }
                      />
                    )}

                    <p className="mt-1.5 px-1 text-[10px] text-slate-600">
                      {message.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {!activePlan && (
                <TripPlanningForm
                  form={planningForm}
                  setForm={setPlanningForm}
                  error={planningFormError}
                  onSubmit={handlePlanningFormSubmit}
                  isTyping={isTyping}
                  categories={categories}
                  onToggleCategory={togglePlanningCategory}
                />
              )}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    ✦
                  </div>

                  <div className="flex gap-1 rounded-2xl rounded-tl-md border border-white/6 bg-slate-800 px-4 py-4">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="border-t border-white/6 px-4 pb-5 sm:px-6">
                <p className="mb-3 text-xs font-medium text-slate-500">
                  START WITH AN IDEA
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {starterPrompts.map((item, index) => (
                    <motion.button
                      key={item.title}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.06 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setInput(item.prompt);
                        document.getElementById("travel-chat-input")?.focus();
                      }}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-slate-950/40 p-3 text-left text-xs text-slate-300 transition hover:border-blue-400/30 hover:bg-blue-500/6"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.title}</span>
                      <span className="ml-auto text-slate-600">↗</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <motion.form
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.18 }}
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="border-t border-white/[0.07] bg-slate-950/50 p-4 sm:p-5"
            >
              {notice && (
                <div className="mb-3 rounded-xl border border-blue-400/15 bg-blue-500/6 px-4 py-3 text-xs text-blue-300">
                  {notice}
                </div>
              )}

              <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-slate-900 p-2 focus-within:border-blue-400/40">
                <textarea
                  id="travel-chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="Tell TravelAI what you want or request a change..."
                  className="max-h-40 min-h-12 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-lg transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ↑
                </button>
              </div>

              <p className="mt-2 text-center text-[10px] text-slate-600">
                TravelAI demo · Review and approve the proposal before any
                booking workflow.
              </p>
            </motion.form>
          </motion.section>

          <TripHistory trips={trips} formatMoney={formatMoney} />

          <footer className="mt-12 border-t border-white/[0.07] py-6 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} TravelAI · Your journey, thoughtfully
            planned.
          </footer>
        </div>
      </div>
    </main>
  );
}

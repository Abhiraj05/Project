export const categories = [
  { name: "Adventure", icon: "🏔️" },
  { name: "Culture", icon: "🏛️" },
  { name: "Food", icon: "🍜" },
  { name: "Beaches", icon: "🏝️" },
  { name: "Nature", icon: "🌿" },
  { name: "Relaxation", icon: "🧘" },
];

export const initialTrips = [
  {
    id: 1,
    destination: "Kyoto, Japan",
    dates: "Oct 18 – Oct 25",
    status: "Upcoming",
    travelers: 2,
    budget: 1500,
    categories: ["Culture", "Food"],
    hotel: "Kyoto Garden Hotel",
    transport: "Airport transfer + local transit",
    activities: ["Visit Fushimi Inari Shrine", "Explore Arashiyama Bamboo Grove", "Traditional Kyoto food tour"],
    estimatedTotal: 1380,
    icon: "⛩️",
  },
  {
    id: 2,
    destination: "Bali, Indonesia",
    dates: "Aug 04 – Aug 10",
    status: "Completed",
    travelers: 2,
    budget: 1200,
    categories: ["Beaches", "Nature"],
    hotel: "Bali Ocean Retreat",
    transport: "Airport transfer + private driver",
    activities: ["Explore Ubud", "Visit a beach at sunset", "Discover local markets"],
    estimatedTotal: 1120,
    icon: "🌴",
  },
];

export const formatMoney = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

export const makeDateLabel = (start, end) => {
  if (!start || !end) return "Dates to be confirmed";
  const format = (value) =>
    new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  return `${format(start)} – ${format(end)}`;
};

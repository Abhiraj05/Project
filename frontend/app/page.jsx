"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PopularDestinations from "@/components/PopularDestinations";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (route) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(route);
    }, 2000);
  };
  return (
    <>
      {loading && <Loader />}

      {!loading && (
        <main className="min-h-screen bg-slate-950 text-white">
          <Navbar handleNavigate={handleNavigate} />
          <Hero handleNavigate={handleNavigate} />
          <Features />
          <PopularDestinations />
          <HowItWorks handleNavigate={handleNavigate} />
          <Footer handleNavigate={handleNavigate} />
        </main>
      )}
    </>
  );
}

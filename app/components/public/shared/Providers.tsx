"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Navbar from "@/components/public/shared/Navbar";
import Footer from "@/components/public/shared/Footer";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const handleLoaded = useCallback(() => {
    setLoading(false);
  }, []);

  // 🔥 Trigger loader on every route change
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // match your loader animation

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div
          className={`flex-1 transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

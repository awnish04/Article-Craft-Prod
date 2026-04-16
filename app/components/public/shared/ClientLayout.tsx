"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/public/shared/ScrollToTop";

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors closeButton />
      <TooltipProvider>
        {children}
        <ScrollToTop />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

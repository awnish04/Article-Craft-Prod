"use client";

import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-background border rounded-lg shadow-lg p-4 min-w-[300px]"
        >
          {toast.title && <div className="font-semibold">{toast.title}</div>}
          {toast.description && <div className="text-sm text-muted-foreground">{toast.description}</div>}
        </div>
      ))}
    </div>
  );
}

import type { ReactNode } from "react";
import "../global.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminShell } from "@/components/admin/dashboard/AdminShell";
import { getCurrentUser } from "@/lib/auth/session";
import { Toaster } from "sonner";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  const sessionUser = {
    name: user ? `${user.firstName} ${user.lastName}` : "Guest",
    email: user?.email ?? "",
    avatar: "",
  };

  return (
    <TooltipProvider>
      <Toaster position="top-center" richColors />
      <AdminShell user={sessionUser}>{children}</AdminShell>
    </TooltipProvider>
  );
}

import type { ReactNode } from "react";
import "../global.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/admin/dashboard/app-sidebar";
import { SiteHeader } from "@/components/admin/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/auth/session";

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
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" collapsible="icon" user={sessionUser} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 p-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

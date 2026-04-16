"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { NavUser } from "./nav-user";

const navItems: { title: string; url: string; icon: LucideIcon }[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Jobs", url: "/dashboard/jobs", icon: Briefcase },
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: ClipboardList,
  },
];

type UserProp = { name: string; email: string; avatar: string };

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user?: UserProp }) {
  const pathname = usePathname();
  const resolvedUser: UserProp = user ?? {
    name: "Guest",
    email: "",
    avatar: "",
  };

  return (
    <Sidebar {...props}>
      {/* Logo */}
      <SidebarHeader className="px-3 py-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 overflow-hidden group-data-[collapsible=icon]:justify-center"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
            <span className="text-xs font-bold text-white">AC</span>
          </div>
          <span className="truncate text-base font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Article Craft
          </span>
        </Link>
      </SidebarHeader>

      {/* Main Nav */}
      <SidebarContent className="px-2 py-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={
                    isActive
                      ? "bg-primary! text-white! hover:bg-primary/90! hover:text-white! [&>svg]:text-white!"
                      : "hover:bg-sidebar-accent"
                  }
                >
                  <Link href={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer: Settings + User */}
      <SidebarFooter className="px-2 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/settings"}
              tooltip="Settings"
              className={
                pathname === "/dashboard/settings"
                  ? "bg-primary! text-white! hover:bg-primary/90! hover:text-white! [&>svg]:text-white!"
                  : "hover:bg-sidebar-accent"
              }
            >
              <Link href="/dashboard/settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser user={resolvedUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

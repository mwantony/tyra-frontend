"use client";

import * as React from "react";
import {
  AlignHorizontalDistributeCenter,
  LayoutDashboardIcon,
  Package,
  ScanBarcode,
  SettingsIcon,
  HeadsetIcon,
  Table,
  Table2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Badge } from "./ui/badge";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Vendas",
      url: "/vendas",
      icon: AlignHorizontalDistributeCenter,
    },
    {
      title: "Produtos",
      url: "/produtos",
      icon: Package,
    },
    {
      title: "Comandas",
      url: "/comandas",
      icon: ScanBarcode,
    },
    {
      title: "Mesas",
      url: "/mesas",
      icon: Table,
    },
  ],

  navSecondary: [
    {
      title: "Suporte",
      url: "/suporte",
      icon: HeadsetIcon,
    },
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: SettingsIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <span className="text-base font-semibold">Tyra</span>
                <Badge>Beta</Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

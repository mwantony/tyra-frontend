"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"; // Importe o hook useSidebar
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { isMobile, setOpenMobile } = useSidebar(); // Obtenha as funções do sidebar
  const pathname = usePathname();

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false); // Fecha o sidebar no mobile
    }
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <Link
                  href={item.url}
                  onClick={handleItemClick}
                  className="w-full"
                >
                  <SidebarMenuButton
                    asChild
                    className={`${
                      isActive
                        ? "bg-muted text-primary"
                        : "hover:bg-muted cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

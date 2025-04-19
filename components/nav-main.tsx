"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PlusCircleIcon, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <Link href={"/vendas/adicionar"}>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                variant="outline"
                tooltip="Quick Create"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <PlusCircleIcon />
                <span>Nova Venda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <Link
                  href={item.url}
                  className="flex items-center gap-2 w-full"
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`w-full ${
                      isActive
                        ? "bg-muted text-primary" // estilo quando ativo
                        : "hover:bg-muted cursor-pointer" // Adicionado cursor-pointer no hover
                    }`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
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

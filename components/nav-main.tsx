"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PlusCircleIcon, type LucideIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"; // Importe o hook useSidebar

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
  const { setOpenMobile, isMobile } = useSidebar(); // Adicione esta linha

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false); // Fecha o sidebar no mobile
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <Link href={"/vendas/adicionar"} onClick={handleItemClick}>
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
                  onClick={handleItemClick} // Adicione o onClick aqui
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`w-full ${
                      isActive
                        ? "bg-muted text-primary"
                        : "hover:bg-muted cursor-pointer"
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
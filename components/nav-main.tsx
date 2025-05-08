/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  PlusCircleIcon,
  type LucideIcon,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

interface NavItem {
  title: string;
  url: string | null;
  icon?: LucideIcon;
  items?: NavItem[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (url: string | null, subItems?: NavItem[]) => {
    if (url && pathname === url) return true;
    return subItems?.some((item) => pathname === item.url) ?? false;
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu className="mb-2">
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
          {items.map((item: any) => {
            const hasItems = item.items && item.items.length > 0;
            const isItemActive = isActive(item.url, item.items);
            const isExpanded = expandedItems[item.title] ?? false;

            const content = (
              <SidebarMenuItem className="flex items-center gap-2 w-full">
                {item.items && (
                  <Link href={item.url} className="w-full" onClick={handleItemClick}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`w-full justify-start ${
                        isItemActive
                          ? "bg-muted text-primary"
                          : "hover:bg-muted cursor-pointer"
                      }`}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                )}
                {!item.items && (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`w-full justify-start ${
                      isItemActive
                        ? "bg-muted text-primary"
                        : "hover:bg-muted cursor-pointer"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
                {hasItems && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(item.title);
                    }}
                    className="p-1 rounded hover:bg-muted"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                )}
              </SidebarMenuItem>
            );

            return (
              <div key={item.title} className="space-y-1">
                {item.url && !item.items ? (
                  <Link href={item.url} onClick={handleItemClick}>
                    {content}
                  </Link>
                ) : (
                  content
                )}

                {hasItems && isExpanded && (
                  <div className="ml-4 pl-2 border-l">
                    {item.items?.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        {subItem.url ? (
                          <Link
                            href={subItem.url}
                            className="flex items-center gap-2 w-full pl-2"
                            onClick={handleItemClick}
                          >
                            <SidebarMenuButton
                              className={`w-full text-sm ${
                                pathname === subItem.url
                                  ? "bg-muted text-primary"
                                  : "hover:bg-muted cursor-pointer"
                              }`}
                            >
                              {subItem.icon && <subItem.icon size={14} />}
                              <span>{subItem.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 w-full pl-2 text-sm text-muted-foreground">
                            {subItem.icon && <subItem.icon size={14} />}
                            <span>{subItem.title}</span>
                          </div>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

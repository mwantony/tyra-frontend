"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function SiteHeader() {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split("/").filter(Boolean); // remove strings vazias
    
    // Se não houver paths, retorna apenas "Dashboard"
    if (paths.length === 0) {
      return [
        { href: "/", label: "Dashboard" }
      ];
    }

    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      return { href, label };
    });
  }, [pathname]);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <>
                <BreadcrumbItem key={item.href}>
                  <BreadcrumbLink href={item.href}>
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
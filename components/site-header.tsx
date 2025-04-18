"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function SiteHeader() {
  const pathname = usePathname();

  const title = useMemo(() => {
    const path = pathname.split("/")[1]; // pega o primeiro segmento da rota
    switch (path) {
      case "":
        return "Dashboard";
      case "vendas":
        return "Vendas";
      case "produtos":
        return "Produtos";
      case "comandas":
        return "Comandas";
      default:
        return path.charAt(0).toUpperCase() + path.slice(1); // capitaliza
    }
  }, [pathname]);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}

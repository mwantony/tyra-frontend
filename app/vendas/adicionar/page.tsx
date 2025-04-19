/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { DataTableVendas } from "@/components/data-table-vendas";
import { Skeleton } from "@/components/ui/skeleton";
import { getVendas } from "@/services/vendas"; // Atualize para o caminho correto

export default function Page() {
  const [vendas, setVendas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resposta = await getVendas(); // Busca todas as vendas
      setVendas(resposta);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <DataTableVendas data={vendas} />
          )}
        </div>
      </div>
    </div>
  );
}

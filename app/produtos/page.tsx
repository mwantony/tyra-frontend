/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getProdutos } from "@/services/produtos"; // Atualize para o caminho correto
import { DataTableProdutos } from "@/components/data-table-produtos";

export default function Page() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resposta = await getProdutos(); // Busca todos os produtos
      setProdutos(resposta);
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
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <DataTableProdutos data={produtos} />
          )}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect } from "react";
import { subDays } from "date-fns";
import dayjs from "dayjs";
import { RefreshCw } from "lucide-react";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTableVendas } from "@/components/data-table-vendas";
import { SectionCards } from "@/components/section-cards";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { filtrarVendas, gerarPdf } from "@/services/vendas";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Page() {
  const [date, setDate] = React.useState({
    from: dayjs(subDays(new Date(), 7)).format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  });

  const [vendaFiltrada, setVendaFiltrada] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const refreshRef = React.useRef<any>(null);
  const handleDateChange = (newDateRange: any) => {
    setDate({
      from: dayjs(newDateRange.from).format("YYYY-MM-DD"),
      to: dayjs(newDateRange.to).format("YYYY-MM-DD"),
    });
  };

  const handleGerarPdf = async () => {
    setDownloading(true);
    await gerarPdf(date.from, date.to)
      .then((res) => {
        if (res.status === 403) {
          toast.error("Recurso não disponível no Plano Básico");
        }
      })
      .catch((error) => {
        console.log(error.status);
      });
    setDownloading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const resposta = await filtrarVendas(date.from, date.to);
    setVendaFiltrada(resposta);
    setIsRefreshing(false);
    
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resposta = await filtrarVendas(date.from, date.to);
      setVendaFiltrada(resposta);
      setLoading(false);
      if (refreshRef.current) {
        refreshRef.current.click();
      }
    };

    fetchData();
  }, [date.from, date.to]);

  return (
    <div className="flex flex-1 flex-col">
      <Toaster></Toaster>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex flex-col items-stretch gap-y-4 px-4 lg:flex-row lg:justify-end lg:items-center lg:gap-x-2 lg:px-6">
            <Button
              variant="outline"
              ref={refreshRef}
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="hidden lg:flex"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </Button>
            <DatePickerWithRange onChange={handleDateChange} />
            <Button
              className="w-full md:w-auto"
              onClick={handleGerarPdf}
              disabled={loading || isRefreshing || downloading}
            >
              {downloading === false ? "Download" : "Downloading..."}
            </Button>
          </div>

          {loading ? (
            <div className="px-4 lg:px-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Skeleton className="h-45 w-full rounded-md" />
                <Skeleton className="h-45 w-full rounded-md" />
                <Skeleton className="h-45 w-full rounded-md" />
              </div>

              <Skeleton className="h-[300px] w-full rounded-md" />
              <Skeleton className="h-[400px] w-full rounded-md" />
            </div>
          ) : (
            <>
              <SectionCards
                totalFaturado={vendaFiltrada?.total_faturado}
                totalVendas={vendaFiltrada?.total_vendas}
                mediaVendasPorDia={vendaFiltrada?.media_vendas_por_dia}
              />

              <div className="px-4 lg:px-6">
                <ChartAreaInteractive grafico={vendaFiltrada?.grafico} />
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <DataTableVendas data={vendaFiltrada?.ultimas_vendas} />
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

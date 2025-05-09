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
import { useAuth } from "@/contexts/auth-provider";

export default function Page() {
  const [date, setDate] = React.useState({
    from: dayjs(subDays(new Date(), 7)).format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  });
  const { restaurante } = useAuth();
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
  if (restaurante?.id)
    return (
      <div className="flex flex-1 flex-col">
        <Toaster></Toaster>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col items-stretch gap-y-4 px-4 lg:flex-row lg:justify-end lg:items-center lg:gap-x-2 lg:px-6">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  ref={refreshRef}
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="lg:flex"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </Button>
                <DatePickerWithRange className="w-full" onChange={handleDateChange} />
              </div>
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
                {/* Cards de métricas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="p-6 min-h-45">
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                      <Skeleton className="h-9 w-full rounded-md" />
                      <Skeleton className="h-5 w-2/3 rounded-md" />
                      <Skeleton className="h-5 w-1/2 rounded-md" />
                    </div>
                  </Card>
                  <Card className="p-6 min-h-45">
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                      <Skeleton className="h-9 w-full rounded-md" />
                      <Skeleton className="h-5 w-2/3 rounded-md" />
                      <Skeleton className="h-5 w-1/2 rounded-md" />
                    </div>
                  </Card>
                  <Card className="p-6 min-h-45">
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                      <Skeleton className="h-9 w-full rounded-md" />
                      <Skeleton className="h-5 w-2/3 rounded-md" />
                      <Skeleton className="h-5 w-1/2 rounded-md" />
                    </div>
                  </Card>
                </div>

                {/* Gráfico */}
                <Card className="p-6 min-h-35">
                  <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-6 w-1/4 rounded-md" />
                    <Skeleton className="h-9 w-32 rounded-md" />
                  </div>
                  <div className="flex items-end space-x-2 h-[300px]">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center flex-1"
                      >
                        <Skeleton
                          className="w-full rounded-t-md"
                          style={{
                            height: `${Math.random() * 80 + 20}%`,
                          }}
                        />
                        <Skeleton className="h-4 w-10 mt-2 rounded-md" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Tabela de vendas */}
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-6 w-1/4 rounded-md" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-9 w-24 rounded-md" />
                      <Skeleton className="h-9 w-32 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Cabeçalho da tabela */}
                    <div className="grid grid-cols-12 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-6 rounded-md col-span-2"
                        />
                      ))}
                    </div>
                    {/* Linhas da tabela */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-4 items-center py-3"
                      >
                        <Skeleton className="h-4 rounded-md col-span-2" />
                        <Skeleton className="h-4 rounded-md col-span-2" />
                        <Skeleton className="h-4 rounded-md col-span-2" />
                        <Skeleton className="h-4 rounded-md col-span-2" />
                        <Skeleton className="h-4 rounded-md col-span-2" />
                        <Skeleton className="h-9 rounded-md col-span-2" />
                      </div>
                    ))}
                  </div>
                  {/* Paginação */}
                  <div className="flex justify-between items-center mt-6">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-9 w-9 rounded-md" />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              // Seu conteúdo real do dashboard aqui
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
  if (!restaurante?.id) return (window.location.href = "/login");
}

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
import { filtrarVendas, gerarPdf } from "@/services/vendas";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-provider";
import { DashboardSkeleton } from "./dashboard-skeleton";

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
    try {
      const res = await gerarPdf(date.from, date.to);
      if (res.status === 403) {
        toast.error("Recurso não disponível no Plano Básico");
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar PDF. Por favor, tente novamente.");
    } finally {
      setDownloading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const resposta = await filtrarVendas(date.from, date.to);
      setVendaFiltrada(resposta);
    } catch (error) {
      console.error("Erro ao atualizar vendas:", error);
      toast.error(
        "Não foi possível atualizar as vendas. Por favor, tente novamente."
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        if (isMounted) setLoading(true);

        const resposta = await filtrarVendas(date.from, date.to);

        if (isMounted) {
          setVendaFiltrada(resposta);
          setLoading(false);
          if (refreshRef.current) {
            refreshRef.current.click();
          }
        }
      } catch (error: any) {
        if (error.name !== "AbortError" && isMounted) {
          console.error("Erro ao carregar vendas:", error);
          toast.error(
            "Não foi possível carregar as vendas. Por favor, tente novamente mais tarde."
          );
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [date.from, date.to]);

  if (!restaurante?.id) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
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
              <DatePickerWithRange
                className="w-full"
                onChange={handleDateChange}
              />
            </div>
            <Button
              className="w-full md:w-auto"
              onClick={handleGerarPdf}
              disabled={loading || isRefreshing || downloading}
            >
              {downloading ? "Downloading..." : "Download"}
            </Button>
          </div>

          {loading ? (
            <DashboardSkeleton />
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

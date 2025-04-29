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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setVendasFiltradas } from "@/store/slices/vendasFiltradasSlice";

// Cache em nível de módulo
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos de cache

export default function Page() {
  const [date, setDate] = React.useState({
    from: dayjs(subDays(new Date(), 7)).format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  });
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const vendaFiltrada = useSelector(
    (state: RootState) => state.vendasFiltradas.vendasFiltradas
  );
  const [loading, setLoading] = React.useState(false);

  const handleDateChange = (newDateRange: any) => {
    setDate({
      from: dayjs(newDateRange.from).format("YYYY-MM-DD"),
      to: dayjs(newDateRange.to).format("YYYY-MM-DD"),
    });
  };

  const handleGerarPdf = async () => {
    await gerarPdf(date.from, date.to);
  };

  const fetchData = async (forceRefresh = false) => {
    const loadingState = forceRefresh ? setIsRefreshing : setLoading;
    loadingState(true);
    
    try {
      const now = Date.now();
      const cacheKey = `${date.from}-${date.to}`;
      
      // Verifica se pode usar o cache
      if (!forceRefresh && cachedData?.key === cacheKey && (now - lastFetchTime) < CACHE_DURATION) {
        dispatch(setVendasFiltradas(cachedData.data));
        loadingState(false);
        return;
      }
      
      // Busca novos dados
      const resposta = await filtrarVendas(date.from, date.to);
      cachedData = { key: cacheKey, data: resposta };
      lastFetchTime = now;
      dispatch(setVendasFiltradas(resposta));
    } finally {
      loadingState(false);
    }
  };

  const handleRefresh = () => {
    fetchData(true); // Força atualização
  };

  useEffect(() => {
    fetchData();
  }, [date.from, date.to]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex flex-col items-stretch gap-y-4 px-4 lg:flex-row lg:justify-end lg:items-center lg:gap-x-4 lg:px-6">
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <DatePickerWithRange onChange={handleDateChange} />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <Button
              className="w-full md:w-auto"
              onClick={handleGerarPdf}
              disabled={loading || isRefreshing}
            >
              Download
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
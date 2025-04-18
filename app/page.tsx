/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { DatePickerWithRange } from "@/components/date-range-picker";
import * as React from "react";

import data from "./data.json";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { subDays } from "date-fns";
import { filtrarVendas } from "@/services/vendas";
import dayjs from "dayjs";

export default function Page() {
  const [date, setDate] = React.useState({
    from: dayjs(subDays(new Date(), 7)).format("YYYY-MM-DD"), // Formatar a data de 7 dias atrás
    to: dayjs().format("YYYY-MM-DD"), // Formatar a data atual
  });
  const [vendaFiltrada, setVendaFiltrada] = React.useState<any>(null); // Inicializa com null para evitar renderização vazia

  // Atualizar as datas de 'from' e 'to' quando o usuário escolher novas datas
  const handleDateChange = (newDateRange) => {
    setDate({
      from: dayjs(newDateRange.from).format("YYYY-MM-DD"),
      to: dayjs(newDateRange.to).format("YYYY-MM-DD"),
    });
  };

  // UseEffect para buscar dados sempre que as datas mudarem
  useEffect(() => {
    const fetchData = async () => {
      const resposta = await filtrarVendas(date.from, date.to);
      setVendaFiltrada(resposta); // Atualiza o estado com os dados filtrados
    };

    fetchData();
  }, [date.from, date.to]); // Re-executa a função toda vez que as datas forem alteradas

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-end items-center gap-x-4 px-4 lg:px-6">
            {/* Passando a função handleDateChange para o DatePickerWithRange */}
            <DatePickerWithRange onChange={handleDateChange} />
            <Button>Download</Button>
          </div>

          {/* Verifica se 'vendaFiltrada' existe antes de tentar renderizar 'SectionCards' */}
          <SectionCards
            totalFaturado={vendaFiltrada?.total_faturado}
            totalVendas={vendaFiltrada?.total_vendas}
            mediaVendasPorDia={vendaFiltrada?.media_vendas_por_dia}
            
          />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive grafico={vendaFiltrada?.grafico}/>
          </div>

          {/* Utilize a variável data como fallback caso vendaFiltrada não tenha dados */}
          <DataTable data={vendaFiltrada?.dados || data} />
        </div>
      </div>
    </div>
  );
}

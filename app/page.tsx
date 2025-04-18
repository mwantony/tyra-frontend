"use client";

import { useState, useEffect } from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { filtrarVendas } from "@/services/vendas";
import { subDays } from "date-fns";

import dataFake from "./data.json";

export default function Page() {
  const [data, setData] = useState(dataFake);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: subDays(new Date(), 7), // 7 dias atrás
    to: new Date(), // Data atual
  });
  useEffect(() => {
    // Quando dateRange for alterado, chamamos o filtro
    if (!dateRange.from || !dateRange.to) return;

    const handleFiltrar = async () => {
      try {
        const inicio = dateRange.from.toISOString().split("T")[0];
        const fim = dateRange.to.toISOString().split("T")[0];
        const resultado = await filtrarVendas(inicio, fim);
        setData(resultado);
        console.log(resultado);
      } catch (err) {
        console.error("Erro ao filtrar:", err);
      }
    };

    handleFiltrar(); // Chama o filtro sempre que dateRange mudar
  }, [dateRange]); // Dependência em dateRange para aplicar o filtro toda vez que ele mudar

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-end items-center gap-x-4 px-4 lg:px-6">
            <DatePickerWithRange
              value={dateRange}
              onChange={setDateRange} // Atualiza o dateRange
            />
            <Button>Download</Button>
          </div>

          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}

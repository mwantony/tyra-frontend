import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, ArrowUp, ArrowDown } from "lucide-react";

type Venda = {
  id: number;
  comanda_id: number;
  numero_comanda: string;
  restaurante_id: number;
  total: string;
  data_venda: string;
  created_at: string;
  updated_at: string;
};

type SortableField = "id" | "total" | "data_venda";

interface DataTableProps {
  data: Venda[];
}

export const DataTableVendas: React.FC<DataTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: SortableField;
    direction: "ascending" | "descending";
  } | null>();

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      // Lógica de comparação para cada tipo de campo
      let aValue, bValue;

      if (sortConfig.key === "total") {
        aValue = Number(a.total);
        bValue = Number(b.total);
      } else if (sortConfig.key === "data_venda") {
        aValue = new Date(a.data_venda).getTime();
        bValue = new Date(b.data_venda).getTime();
      } else {
        // Para o ID
        aValue = a.id;
        bValue = b.id;
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: SortableField) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortableField) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    );
  };

  return (
    <Table className="relative">
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
          <TableHead>
            <button
              type="button"
              onClick={() => requestSort("id")}
              className="flex items-center hover:text-primary focus:outline-none"
            >
              ID
              {getSortIcon("id")}
            </button>
          </TableHead>
          <TableHead>Comanda</TableHead>
          <TableHead>
            <button
              type="button"
              onClick={() => requestSort("total")}
              className="flex items-center hover:text-primary focus:outline-none"
            >
              Total
              {getSortIcon("total")}
            </button>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => requestSort("data_venda")}
                className="flex items-center hover:text-primary focus:outline-none"
              >
                Data da Venda
                {getSortIcon("data_venda")}
              </button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data e hora do fechamento da comanda</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData && sortedData.length > 0 ? (
          sortedData.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="min-w-[80px] justify-center"
                >
                  {item.numero_comanda}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(item.total))}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{dayjs(item.data_venda).format("DD/MM/YYYY")}</span>
                  <span className="text-xs text-muted-foreground">
                    {dayjs(item.data_venda).format("HH:mm")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center h-24 text-muted-foreground"
            >
              Nenhuma venda encontrada.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

import React from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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

interface DataTableProps {
  data: Venda[];
}

export const DataTableVendas: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="rounded-lg border shadow-sm">
      <ScrollArea className="h-[calc(80vh-220px)]">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Comanda</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="flex items-center gap-1">
                Data da Venda
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
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="min-w-[80px] justify-center">
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
      </ScrollArea>
    </div>
  );
};
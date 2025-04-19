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
import { Badge } from "@/components/ui/badge"; // Ajuste conforme o caminho correto para o Badge

type Venda = {
  id: number;
  comanda_id: number;
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Comanda</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Data da Venda</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Badge variant='outline'>{item.comanda_id}</Badge>
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(item.total))}
              </TableCell>
              <TableCell>
                {dayjs(item.data_venda).format("DD/MM/YYYY HH:mm")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

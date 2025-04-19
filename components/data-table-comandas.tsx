/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react"; // Ícones adicionados aqui
import { Badge } from "@/components/ui/badge"; // Ajuste conforme o caminho correto para o Badge

type Comanda = {
  id: number;
  restaurante_id: number;
  numero_comanda: string;
  status: string;
  fechada_em: string | null;
  created_at: string;
  updated_at: string;
  produtos: any[];
};

interface DataTableProps {
  data: Comanda[];
}

export const DataTableComandas: React.FC<DataTableProps> = ({ data }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "fechada":
        return <Badge variant="outline">Fechada</Badge>;
      case "aberta":
        return <Badge variant="outline">Aberta</Badge>;
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Número da Comanda</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fechada em</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((comanda) => (
            <TableRow key={comanda.id}>
              <TableCell>{comanda.id}</TableCell>
              <TableCell>{comanda.numero_comanda}</TableCell>
              <TableCell>{getStatusBadge(comanda.status)}</TableCell>
              <TableCell>
                {comanda.fechada_em
                  ? dayjs(comanda.fechada_em).format("DD/MM/YYYY HH:mm")
                  : "Ainda aberta"}
              </TableCell>
              <TableCell>
                {dayjs(comanda.created_at).format("DD/MM/YYYY HH:mm")}
              </TableCell>
              <TableCell>
                {dayjs(comanda.updated_at).format("DD/MM/YYYY HH:mm")}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-md hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem
                      onClick={() => console.log("Deletar", comanda.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2 text-red-600 " />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

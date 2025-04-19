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
import { MoreHorizontal, Pencil, Copy, Trash2 } from "lucide-react"; // ⬅️ Ícones adicionados aqui

type Produto = {
  id: number;
  restaurante_id: number;
  nome: string;
  preco: string;
  ean: string;
  tipo: string;
  descricao: string;
  created_at: string;
  updated_at: string;
};

interface DataTableProps {
  data: Produto[];
}

export const DataTableProdutos: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>EAN</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Criado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>{produto.id}</TableCell>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(produto.preco))}
              </TableCell>
              <TableCell>{produto.tipo}</TableCell>
              <TableCell>{produto.ean}</TableCell>
              <TableCell>{produto.descricao}</TableCell>
              <TableCell>
                {dayjs(produto.created_at).format("DD/MM/YYYY HH:mm")}
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
                      onClick={() => console.log("Editar", produto.id)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Duplicar", produto.id)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Deletar", produto.id)}
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

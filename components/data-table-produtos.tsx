"use client"

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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import CustomModal from "@/components/custom-modal"; // Assumindo que você tem um modal personalizado
import { deleteProduto } from "@/services/produtos"; // Assumindo que você tem essa função
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

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
  fetchProdutos: () => Promise<void>; // Função para recarregar os produtos
}

export const DataTableProdutos: React.FC<DataTableProps> = ({
  data,
  fetchProdutos,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar a visibilidade do modal
  const [produtoIdToDelete, setProdutoIdToDelete] = useState<number | null>(
    null
  ); // ID do produto a ser deletado
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.ean.includes(searchTerm)
  );

  const handleDeleteClick = (id: number) => {
    setProdutoIdToDelete(id);
    setIsModalOpen(true); // Abre o modal ao clicar em excluir
  };
  const handleEditClick = (id: number) => {
    router.push(`/produtos/editar/${id}`);
  };

  const handleDeleteProduto = async () => {
    if (produtoIdToDelete !== null) {
      try {
        await deleteProduto(produtoIdToDelete);
        setIsModalOpen(false); // Fecha o modal
        await fetchProdutos(); // Recarrega os produtos após a exclusão
      } catch (err) {
        console.error("Erro ao excluir produto:", err);
      }
    }
  };

  return (
    <div >
      <div className="p-4">
        <Input
          type="text"
          placeholder="Pesquisar por nome ou EAN"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded-md border w-full"
        />
      </div>
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
          {filteredData.length > 0 ? (
            filteredData.map((produto) => (
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
                        onClick={() => handleEditClick(produto.id)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(produto.id)} // Abre o modal ao clicar em excluir
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground text-sm py-10"
              >
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modal de confirmação de exclusão */}
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h4 className="text-lg font-semibold mb-4">
          Deseja deletar o produto?
        </h4>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteProduto}>Confirmar</Button>
        </div>
      </CustomModal>
    </div>
  );
};

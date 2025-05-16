"use client";

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
import { deleteProduto } from "@/services/produtos";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Produto from "@/interfaces/Produto";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DataTableProps {
  data: Produto[];
  fetchProdutos: () => Promise<void>;
}

export const DataTableProdutos: React.FC<DataTableProps> = ({
  data,
  fetchProdutos,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [produtoIdToDelete, setProdutoIdToDelete] = useState<number | null>(
    null
  );
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter(
    (produto) =>
      produto?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto?.ean?.includes(searchTerm)
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleDeleteClick = (id: number) => {
    setProdutoIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleEditClick = (id: number) => {
    router.push(`/produtos/editar/${id}`);
  };

  const handleDeleteProduto = async () => {
    setConfirmDelete(true);
    if (produtoIdToDelete !== null) {
      try {
        await deleteProduto(produtoIdToDelete);
        setIsModalOpen(false);
        await fetchProdutos();
      } catch (err) {
        console.error("Erro ao excluir produto:", err);
      }
      setConfirmDelete(false);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | "ellipsis-left" | "ellipsis-right")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftOffset = Math.floor(maxVisiblePages / 2);
      const rightOffset = Math.ceil(maxVisiblePages / 2) - 1;

      let startPage = currentPage - leftOffset;
      let endPage = currentPage + rightOffset;

      if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxVisiblePages + 1;
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("ellipsis-left");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("ellipsis-right");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === "ellipsis-left" || pageNumber === "ellipsis-right") {
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={index}>
          <PaginationLink
            isActive={pageNumber === currentPage}
            onClick={() => setCurrentPage(Number(pageNumber))}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <div>
      <div className="pb-4">
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
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((produto) => (
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
                <TableCell>{produto.ean ? produto.ean : "- - -"}</TableCell>
                <TableCell>
                  {produto.descricao ? produto.descricao : "- - -"}
                </TableCell>
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
                        onClick={() => handleDeleteClick(produto.id)}
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

      {/* Paginação */}
      {totalItems > itemsPerPage && (
        <div className="mt-4 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  isActive={currentPage > 1}
                >
                  Anterior
                </PaginationPrevious>
              </PaginationItem>

              {renderPageNumbers()}

              <PaginationItem>
                <PaginationNext className="hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  isActive={currentPage < totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Deseja deletar o produto?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button disabled={confirmDelete} onClick={handleDeleteProduto}>
              {confirmDelete ? "Confirmando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

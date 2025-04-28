/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Barcode, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteComanda, getComandaCodigo } from "@/services/comandas";
import CustomModal from "@/components/custom-modal";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
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
  onDelete?: () => void;
}

export const DataTableComandas: React.FC<DataTableProps> = ({
  data,
  onDelete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [comandaToDelete, setComandaToDelete] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    let filtered = data;
    
    // Filtro por aba
    if (currentTab !== "todas") {
      filtered = filtered.filter((c) => c.status === currentTab);
    }
    
    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.numero_comanda.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.id.toString().includes(searchTerm)
      );
    }
    
    return filtered;
  };

  const filteredData = getFilteredData();
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "fechada":
        return <Badge variant="outline">Fechada</Badge>;
      case "aberta":
        return <Badge variant="outline">Aberta</Badge>;
      case "cancelada":
        return <Badge variant="outline">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = async (numeroComanda: string) => {
    try {
      await deleteComanda(numeroComanda);
      setModalOpen(false);
      if (onDelete) onDelete();
    } catch (error) {
      alert("Erro ao excluir comanda.");
    }
  };

  const handleBaixarCodigo = async (numeroComanda: string) => {
    try {
      const blob = await getComandaCodigo(numeroComanda);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `codigo-comanda-${numeroComanda}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar código:", error);
    }
  };

  const openDeleteModal = (numeroComanda: string) => {
    setComandaToDelete(numeroComanda);
    setModalOpen(true);
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | 'ellipsis-left' | 'ellipsis-right')[] = [];
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
          pageNumbers.push('ellipsis-left');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('ellipsis-right');
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === 'ellipsis-left' || pageNumber === 'ellipsis-right') {
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={index}>
          <PaginationLink
            href="#"
            isActive={pageNumber === currentPage}
            onClick={() => setCurrentPage(Number(pageNumber))}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  const renderTable = (dataToRender: Comanda[]) => {
    if (dataToRender.length === 0) {
      return <p className="text-center p-4">Nenhuma comanda encontrada.</p>;
    }

    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Número da Comanda</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataToRender.map((comanda) => (
              <TableRow key={comanda.id}>
                <TableCell>{comanda.id}</TableCell>
                <TableCell>{comanda.numero_comanda}</TableCell>
                <TableCell>{getStatusBadge(comanda.status)}</TableCell>
                <TableCell>
                  <Link href={`/comandas/detalhes/${comanda.numero_comanda}`}>
                    <Button variant='outline'>Detalhes</Button>
                  </Link>
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
                        onClick={() => handleBaixarCodigo(comanda.numero_comanda)}
                      >
                        <Barcode className="w-4 h-4 mr-2" />
                        Baixar Código
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteModal(comanda.numero_comanda)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Paginação */}
        {totalItems > itemsPerPage && (
          <div className="mt-4 flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    isActive={currentPage > 1}
                  />
                </PaginationItem>
                
                {renderPageNumbers()}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    isActive={currentPage < totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="p-4">
        <Input
          type="text"
          placeholder="Pesquisar por número ou ID"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded-md border w-full"
        />
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="aberta">Abertas</TabsTrigger>
          <TabsTrigger value="fechada">Fechadas</TabsTrigger>
          <TabsTrigger value="cancelada">Canceladas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todas">{renderTable(currentItems)}</TabsContent>
        <TabsContent value="aberta">{renderTable(currentItems.filter(c => c.status === "aberta"))}</TabsContent>
        <TabsContent value="fechada">{renderTable(currentItems.filter(c => c.status === "fechada"))}</TabsContent>
        <TabsContent value="cancelada">{renderTable(currentItems.filter(c => c.status === "cancelada"))}</TabsContent>
      </Tabs>

      <CustomModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h3 className="text-lg font-bold">Confirmar Exclusão</h3>
          <p>
            Você tem certeza que deseja excluir a comanda {comandaToDelete}?
          </p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (comandaToDelete) handleDelete(comandaToDelete);
              }}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  Calendar,
  MoreHorizontal,
  Trash2,
  Check,
  CalendarCheck,
  Unlock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteMesa, liberarMesa, reservarMesa } from "@/services/mesas";
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
import Mesa from "@/interfaces/Mesa";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { Label } from "./ui/label";

interface DataTableProps {
  data: Mesa[];
  onDelete?: () => void;
  onStatusChange?: () => void;
  recarregarMesas: () => void;
}

export const DataTableMesas: React.FC<DataTableProps> = ({
  data,
  onDelete,
  onStatusChange,
  recarregarMesas,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isReservarModalOpen, setReservarModalOpen] = useState(false);
  const [confirmReserva, setConfirmReserve] = useState(false);
  const [confirmLiberacao, setConfirmLiberacao] = useState(false);
  const [mesaToDelete, setMesaToDelete] = useState<number | null>(null);
  const [mesaToReserve, setMesaToReserve] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [reservaData, setReservaData] = useState({
    nome_reserva: "",
    telefone_reserva: "",
    horario_reserva: "",
    observacoes: "",
  });
  const [isLiberarModalOpen, setLiberarModalOpen] = useState(false);
  const [mesaToFree, setMesaToFree] = useState<string | number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    let filtered = data;

    // Filtro por aba
    if (currentTab !== "todas") {
      filtered = filtered.filter((m) => m.status === currentTab);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.identificacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.id.toString().includes(searchTerm) ||
          (m.nome_reserva &&
            m.nome_reserva.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };
  function getLocalDateTimeNow() {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // minutos
    const localDate = new Date(now.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  const filteredData = getFilteredData();
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "livre":
        return <Badge variant="outline">Livre</Badge>;
      case "reservada":
        return <Badge variant="outline">Reservada</Badge>;
      case "ocupada":
        return <Badge variant="destructive">Ocupada</Badge>;
      case "em_limpeza":
        return <Badge variant="secondary">Em limpeza</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMesa(id);
      setModalOpen(false);
      if (onDelete) onDelete();
    } catch (error) {
      alert("Erro ao excluir mesa.");
    }
  };

  const handleReservarMesa = async (id: number, data: any) => {
    setConfirmReserve(true);
    try {
      // Validar dados antes de enviar
      if (
        !data.nome_reserva ||
        !data.telefone_reserva ||
        !data.horario_reserva
      ) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }

      // Formatar data corretamente
      const reservaData = {
        ...data,
        horario_reserva: new Date(data.horario_reserva).toISOString(),
      };

      await reservarMesa(id, reservaData);
      toast.success("Mesa reservada com sucesso!");
      setConfirmReserve(false);
      recarregarMesas();
      setReservarModalOpen(false);
      setReservaData({
        nome_reserva: "",
        telefone_reserva: "",
        horario_reserva: "",
        observacoes: "",
      });

      if (onStatusChange) onStatusChange();
    } catch (error) {
      setConfirmReserve(false);
      console.error("Erro ao reservar mesa:", error);
      toast.error("Erro ao reservar mesa. Por favor, tente novamente.");
    }
  };
  const handleLiberarMesa = async (id: string | number) => {
    setConfirmLiberacao(true);
    try {
      await liberarMesa(id); // suponha que você já tenha essa função
      toast.success("Mesa liberada com sucesso!");
      setConfirmLiberacao(false);
      recarregarMesas();
      setLiberarModalOpen(false);
      // Atualize as mesas, se necessário
    } catch {
      setConfirmLiberacao(false);

      toast.error("Erro ao liberar a mesa.");
    }
  };

  const openDeleteModal = (id: number) => {
    setMesaToDelete(id);
    setModalOpen(true);
  };
  const openReservarModal = (id: number) => {
    setMesaToReserve(id);

    setReservarModalOpen(true);
  };
  const openLiberarModal = (id: string | number) => {
    setMesaToFree(id);
    setLiberarModalOpen(true);
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

  const renderReservaInfo = (mesa: Mesa) => {
    if (mesa.status === "reservada" && mesa.horario_reserva) {
      return (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          {dayjs(mesa.horario_reserva).format("DD/MM/YYYY HH:mm")}
        </div>
      );
    }
    return null;
  };

  const renderTable = (dataToRender: Mesa[]) => {
    if (dataToRender.length === 0) {
      return <p className="text-center p-4">Nenhuma mesa encontrada.</p>;
    }

    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Identificação</TableHead>
              <TableHead>Capacidade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reserva</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataToRender.map((mesa) => (
              <TableRow key={mesa.id}>
                <TableCell>{mesa.id}</TableCell>
                <TableCell className="font-medium">
                  {mesa.identificacao}
                </TableCell>
                <TableCell>{mesa.capacidade} pessoas</TableCell>
                <TableCell>{getStatusBadge(mesa.status)}</TableCell>
                <TableCell>
                  {renderReservaInfo(mesa)}
                  {mesa.nome_reserva ? <div>{mesa.nome_reserva}</div> : "- - -"}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Link href={`/mesas/detalhes/${mesa.id}`}>
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </Link>

                  {mesa.status === "ocupada" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLiberarMesa(mesa.id)}
                    >
                      <Check className="w-4 h-4 mr-1" /> Liberar
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-muted transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      {mesa.status !== "reservada" && (
                        <DropdownMenuItem
                          onClick={() => openReservarModal(mesa.id)}
                          className="focus:text-primary"
                        >
                          <CalendarCheck className="w-4 h-4 mr-2" />
                          Reservar
                        </DropdownMenuItem>
                      )}
                      {mesa.status !== "livre" && (
                        <DropdownMenuItem
                          onClick={() => openLiberarModal(mesa.id)}
                          className="focus:text-primary"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          Liberar
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        onClick={() => openDeleteModal(mesa.id)}
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    isActive={currentPage > 1}
                  />
                </PaginationItem>

                {renderPageNumbers()}

                <PaginationItem>
                  <PaginationNext
                    href="#"
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
      </>
    );
  };

  return (
    <div>
      <Toaster></Toaster>
      <div className="pb-4">
        <Input
          type="text"
          placeholder="Pesquisar por identificação, ID ou nome"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded-md border w-full"
        />
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="livre">Livres</TabsTrigger>
          <TabsTrigger value="reservada">Reservadas</TabsTrigger>
          <TabsTrigger value="ocupada">Ocupadas</TabsTrigger>
        </TabsList>

        <TabsContent value="todas">{renderTable(currentItems)}</TabsContent>
        <TabsContent value="livre">
          {renderTable(currentItems.filter((m) => m.status === "livre"))}
        </TabsContent>
        <TabsContent value="reservada">
          {renderTable(currentItems.filter((m) => m.status === "reservada"))}
        </TabsContent>
        <TabsContent value="ocupada">
          {renderTable(currentItems.filter((m) => m.status === "ocupada"))}
        </TabsContent>
        <TabsContent value="em_limpeza">
          {renderTable(currentItems.filter((m) => m.status === "em_limpeza"))}
        </TabsContent>
      </Tabs>

      <CustomModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h3 className="text-lg font-bold">Confirmar Exclusão</h3>
          <p>Você tem certeza que deseja excluir esta mesa?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (mesaToDelete) handleDelete(mesaToDelete);
              }}
            >
              Confirmar Exclusão
            </Button>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        isOpen={isReservarModalOpen}
        onClose={() => {
          setReservarModalOpen(false);
          setReservaData({
            nome_reserva: "",
            telefone_reserva: "",
            horario_reserva: "",
            observacoes: "",
          });
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (mesaToReserve) handleReservarMesa(mesaToReserve, reservaData);
          }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold">Reservar Mesa</h3>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome_reserva">Nome*</Label>
              <Input
                id="nome_reserva"
                value={reservaData.nome_reserva}
                onChange={(e) =>
                  setReservaData({
                    ...reservaData,
                    nome_reserva: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone_reserva">Telefone*</Label>
              <Input
                id="telefone_reserva"
                type="tel"
                value={reservaData.telefone_reserva}
                onChange={(e) =>
                  setReservaData({
                    ...reservaData,
                    telefone_reserva: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario_reserva">Data e Horário*</Label>
              <Input
                id="horario_reserva"
                type="datetime-local"
                value={reservaData.horario_reserva}
                onChange={(e) =>
                  setReservaData({
                    ...reservaData,
                    horario_reserva: e.target.value,
                  })
                }
                required
                min={getLocalDateTimeNow()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={reservaData.observacoes}
                onChange={(e) =>
                  setReservaData({
                    ...reservaData,
                    observacoes: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setReservarModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button disabled={confirmReserva} type="submit">
              {confirmReserva === true ? "Confirmando..." : "Confirmar Reserva"}
            </Button>
          </div>
        </form>
      </CustomModal>
      <CustomModal
        isOpen={isLiberarModalOpen}
        onClose={() => setLiberarModalOpen(false)}
      >
        <div>
          <h3 className="text-lg font-bold">Liberar Mesa?</h3>
          <p className="text-sm text-muted-foreground">
            Tem certeza de que deseja liberar esta mesa?
          </p>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setLiberarModalOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              disabled={confirmLiberacao}
              onClick={() => {
                if (mesaToFree) handleLiberarMesa(mesaToFree);
              }}
            >
              {confirmLiberacao === true
                ? "Confirmando..."
                : "Confirmar Liberação"}
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

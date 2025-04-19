/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteComanda } from "@/services/comandas";
import CustomModal from "@/components/custom-modal";
import { Button } from "./ui/button";

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
  onDelete?: () => void; // ✅ Nova prop opcional
}

export const DataTableComandas: React.FC<DataTableProps> = ({
  data,
  onDelete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [comandaToDelete, setComandaToDelete] = useState<string | null>(null);

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

  const handleDelete = async (numeroComanda: string) => {
    try {
      await deleteComanda(numeroComanda);
      setModalOpen(false);
      if (onDelete) onDelete(); // ✅ Notifica o componente pai para recarregar os dados
    } catch (error) {
      alert("Erro ao excluir comanda.");
    }
  };

  const openDeleteModal = (numeroComanda: string) => {
    setComandaToDelete(numeroComanda);
    setModalOpen(true);
  };

  return (
    <div className="rounded-md border">
      {data.length === 0 ? (
        <p className="text-center p-4">Nenhuma comanda encontrada.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Número da Comanda</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fechada em</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((comanda) => (
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
                        onClick={() => openDeleteModal(comanda.numero_comanda)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Modal de Confirmação */}
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
                if (comandaToDelete) {
                  handleDelete(comandaToDelete);
                }
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

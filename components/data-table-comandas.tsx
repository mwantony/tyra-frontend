/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Importando os Tabs
import Link from "next/link";

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
  const [currentTab, setCurrentTab] = useState("abertas");

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
      link.download = `codigo-comanda-${numeroComanda}.png`; // ou .pdf, se for PDF
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

  const renderTable = (filteredData: Comanda[]) => {
    if (filteredData.length === 0) {
      return <p className="text-center p-4">Nenhuma comanda encontrada.</p>;
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Número da Comanda</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((comanda) => (
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
    );
  };

  return (
    <div className="rounded-md border p-4">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="abertas">Abertas</TabsTrigger>
          <TabsTrigger value="fechadas">Fechadas</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas</TabsTrigger>
        </TabsList>
        <TabsContent value="todas">{renderTable(data)}</TabsContent>

        <TabsContent value="abertas">
          {renderTable(data.filter((c) => c.status === "aberta"))}
        </TabsContent>
        <TabsContent value="fechadas">
          {renderTable(data.filter((c) => c.status === "fechada"))}
        </TabsContent>
        <TabsContent value="canceladas">
          {renderTable(data.filter((c) => c.status === "cancelada"))}
        </TabsContent>
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

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner"

import { Skeleton } from "@/components/ui/skeleton";
import { getComandas, postComanda } from "@/services/comandas";
import { DataTableComandas } from "@/components/data-table-comandas";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/custom-modal";
import dayjs from "dayjs";

export default function Page() {
  const [comandas, setComandas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // Função para carregar ou recarregar as comandas
  const recarregarComandas = async () => {
    setLoading(true);
    const resposta = await getComandas();
    setComandas(resposta);
    setLoading(false);
  };

  useEffect(() => {
    recarregarComandas();
  }, []);

  const handleNovaComanda = () => {
    setModalOpen(true);
  };

  const handleConfirmacaoCriacao = async () => {
    try {
      await postComanda()
      toast.success("Comanda criada com Sucesso!", {
        description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      });
      
      await recarregarComandas();
    } catch (error) {
      alert("Ocorreu um erro ao criar a comanda. Tente novamente.");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {/* Botão de Nova Comanda */}
          <div className="flex justify-end">
            <Button onClick={handleNovaComanda}>Nova Comanda</Button>
          </div>

          {/* Exibição da tabela ou skeleton durante o carregamento */}
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <DataTableComandas data={comandas} onDelete={recarregarComandas} />
          )}
        </div>
      </div>

      {/* Modal de Confirmação */}
      <CustomModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-2">
          <h3 className="text-lg font-bold">Confirmar Criação de Comanda</h3>
          <p>Você tem certeza que deseja criar uma nova comanda?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmacaoCriacao}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

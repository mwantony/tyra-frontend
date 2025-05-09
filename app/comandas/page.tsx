/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { getComandas, postComanda } from "@/services/comandas";
import { DataTableComandas } from "@/components/data-table-comandas";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setComandas } from "@/store/slices/comandasSlice";

export default function ComandasPage() {
  const dispatch = useDispatch<AppDispatch>();

  const comandas = useSelector((state: RootState) => state.comandas.comandas);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmComanda, setConfirmComanda] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [termoBusca, setTermoBusca] = useState<string>("");

  const recarregarComandas = async () => {
    setLoading(true);
    try {
      const resposta = await getComandas();
      dispatch(setComandas(resposta));
    } catch (error) {
      toast.error("Erro ao carregar comandas", {
        description: "Não foi possível obter a lista de comandas",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recarregarComandas();
  }, []);

  const handleNovaComanda = () => {
    setModalOpen(true);
  };

  const handleConfirmacaoCriacao = async () => {
    setConfirmComanda(true);
    try {
      await postComanda();
      toast.success("Comanda criada com sucesso!");
      setConfirmComanda(false);

      setModalOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.error);
      setConfirmComanda(false);
      setModalOpen(false);
    } finally {
      await recarregarComandas();
    }
  };

  const comandasFiltradas = comandas.filter((comanda) => {
    return JSON.stringify(comanda)
      .toLowerCase()
      .includes(termoBusca.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4 p-4 pt-2 md:pt-2 lg:pt-2 md:gap-6 md:p-6 lg:p-6">
      {" "}
      <Toaster />
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Comandas</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todas as comandas do estabelecimento
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleNovaComanda}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Comanda
          </Button>
        </div>
      </div>
      {/* Card principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Comandas</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {comandasFiltradas.length}{" "}
                {comandasFiltradas.length === 1 ? "item" : "itens"}
              </Badge>
              <Badge variant="outline">Total: {comandas.length}</Badge>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-4 w-full">
              {/* Cabeçalho da tabela - agora com 5 colunas proporcionais */}
              <div className="grid grid-cols-5 gap-4 w-full">
                {["20%", "25%", "20%", "15%", "20%"].map((_, i) => (
                  <Skeleton
                    key={`header-${i}`}
                    className="h-8 w-full rounded-md" // Adicionado w-full
                  />
                ))}
              </div>

              {/* Linhas da tabela - 6 linhas de loading */}
              {[...Array(6)].map((_, rowIndex) => (
                <div
                  key={`row-${rowIndex}`}
                  className="grid grid-cols-5 gap-4 items-center py-3 w-full"
                >
                  {/* ID */}
                  <Skeleton className="h-4 w-full rounded-md" />

                  {/* Cliente */}
                  <Skeleton
                    className="h-4 w-full rounded-md"
                    style={{ animationDelay: `${rowIndex * 0.1}s` }} // Efeito cascata
                  />

                  {/* Data */}
                  <Skeleton className="h-4 w-full rounded-md" />

                  {/* Valor */}
                  <Skeleton className="h-4 w-full rounded-md" />

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-4 flex-1 rounded-md" />
                  </div>
                </div>
              ))}

              {/* Paginação - centralizada */}
              <div className="flex justify-center items-center pt-4 w-full">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton
                      key={`page-${i}`}
                      className="h-8 w-8 rounded-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : comandasFiltradas.length > 0 ? (
            <DataTableComandas
              data={comandasFiltradas}
              onDelete={recarregarComandas}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
              <Search className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Nenhuma comanda encontrada
              </p>
              {termoBusca && (
                <Button
                  variant="ghost"
                  onClick={() => setTermoBusca("")}
                  className="mt-2"
                >
                  Limpar busca
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      {/* Modal de Confirmação */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar nova comanda</DialogTitle>
            <DialogDescription>
              Esta ação irá criar uma nova comanda vazia. Você pode adicionar
              itens depois.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              disabled={confirmComanda}
              onClick={handleConfirmacaoCriacao}
            >
              {confirmComanda === true ? "Confirmando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setComandas } from "@/store/slices/comandasSlice";
import { ComandasSkeleton } from "./comandas-skeleton";

export default function ComandasPage() {
  const dispatch = useDispatch<AppDispatch>();
  const comandas = useSelector((state: RootState) => state.comandas.comandas);

  const [loading, setLoading] = useState<boolean>(true);
  const [confirmComanda, setConfirmComanda] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [termoBusca, setTermoBusca] = useState<string>("");
  const toastShownRef = useRef(false); // Controle para toasts únicos

  const recarregarComandas = React.useCallback(async () => {
    setLoading(true);
    try {
      const resposta = await getComandas();
      dispatch(setComandas(resposta));
    } catch (error) {
      if (!toastShownRef.current) {
        toast.error("Erro ao carregar comandas", {
          description: "Não foi possível obter a lista de comandas",
        });
        toastShownRef.current = true;
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const abortController = new AbortController();

    recarregarComandas();

    return () => {
      abortController.abort();
      toastShownRef.current = false; // Reseta ao desmontar
    };
  }, [recarregarComandas]);

  const handleNovaComanda = () => {
    setModalOpen(true);
  };

  const handleConfirmacaoCriacao = async () => {
    setConfirmComanda(true);
    try {
      await postComanda();
      toast.success("Comanda criada com sucesso!");
      setModalOpen(false);
    } catch (error: any) {
      if (!toastShownRef.current) {
        toast.error(error.response?.data?.error || "Erro ao criar comanda");
        toastShownRef.current = true;
      }
    } finally {
      setConfirmComanda(false);
      await recarregarComandas();
      toastShownRef.current = false; // Reseta para permitir novos toasts
    }
  };

  const comandasFiltradas = comandas.filter((comanda) => {
    return JSON.stringify(comanda)
      .toLowerCase()
      .includes(termoBusca.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4 p-4 pt-2 md:pt-2 lg:pt-2 md:gap-6 md:p-6 lg:p-6">
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
            <ComandasSkeleton />
          ) : (
            <DataTableComandas
              data={comandasFiltradas}
              onDelete={recarregarComandas}
            />
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
              {confirmComanda ? "Confirmando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

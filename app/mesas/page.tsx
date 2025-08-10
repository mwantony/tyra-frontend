/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

import { getMesas } from "@/services/mesas";
import { DataTableMesas } from "@/components/data-table-mesas";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setMesas } from "@/store/slices/mesasSlice";
import { MesasSkeleton } from "./mesas-skeleton";

export default function MesasPage() {
  const dispatch = useDispatch<AppDispatch>();
  const mesas = useSelector((state: RootState) => state.mesas.mesas);

  const [loading, setLoading] = useState<boolean>(true);
  const [termoBusca, setTermoBusca] = useState<string>("");
  const toastShownRef = useRef(false); // Controle para toasts únicos

  const recarregarMesas = React.useCallback(async () => {
    setLoading(true);
    try {
      const resposta = await getMesas();
      dispatch(setMesas(resposta));
    } catch (error) {
      if (!toastShownRef.current) {
        toast.error("Erro ao carregar mesas", {
          description: "Não foi possível obter a lista de mesas",
        });
        toastShownRef.current = true;
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const abortController = new AbortController();

    recarregarMesas();

    return () => {
      abortController.abort();
      toastShownRef.current = false; // Reseta ao desmontar
    };
  }, [recarregarMesas]);

  const mesasFiltradas = mesas.filter((mesa) =>
    JSON.stringify(mesa).toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-4 pt-2 md:pt-2 lg:pt-2 md:gap-6 md:p-6 lg:p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Mesas</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todas as mesas disponíveis no estabelecimento
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={"/mesas/adicionar"} passHref>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Nova Mesa
            </Button>
          </Link>
        </div>
      </div>

      {/* Card principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Mesas</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {mesasFiltradas.length}{" "}
                {mesasFiltradas.length === 1 ? "item" : "itens"}
              </Badge>
              <Badge variant="outline">Total: {mesas.length}</Badge>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <MesasSkeleton />
          ) : (
            <DataTableMesas
              recarregarMesas={recarregarMesas}
              data={mesasFiltradas}
              onDelete={recarregarMesas}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

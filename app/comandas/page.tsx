/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";
import dayjs from "dayjs";

import { Skeleton } from "@/components/ui/skeleton";
import { getComandas, postComanda } from "@/services/comandas";
import { DataTableComandas } from "@/components/data-table-comandas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function ComandasPage() {
  const [comandas, setComandas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [termoBusca, setTermoBusca] = useState<string>("");

  const recarregarComandas = async () => {
    setLoading(true);
    try {
      const resposta = await getComandas();
      setComandas(resposta);
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
    try {
      await postComanda();
      toast.success("Comanda criada com sucesso!", {
        description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        action: {
          label: "Ver",
          onClick: () => recarregarComandas(),
        },
      });
      await recarregarComandas();
    } catch (error) {
      toast.error("Erro ao criar comanda", {
        description: "Tente novamente mais tarde",
      });
    } finally {
      setModalOpen(false);
    }
  };

  const comandasFiltradas = comandas.filter((comanda) => {
    return JSON.stringify(comanda)
      .toLowerCase()
      .includes(termoBusca.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Comandas</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todas as comandas do estabelecimento
          </p>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar comandas..."
              className="w-full pl-9"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
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
                {comandasFiltradas.length} {comandasFiltradas.length === 1 ? "item" : "itens"}
              </Badge>
              <Badge variant="outline">
                Total: {comandas.length}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
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
              Esta ação irá criar uma nova comanda vazia. Você pode adicionar itens depois.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmacaoCriacao}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
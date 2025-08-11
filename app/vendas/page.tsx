/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setVendas } from "@/store/slices/vendasSlice";

import { getVendas } from "@/services/vendas";
import { DataTableVendas } from "@/components/data-table-vendas";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { VendasSkeleton } from "./vendas-skeleton";
import { toast } from "sonner";

export default function VendasPage() {
  const dispatch = useDispatch<AppDispatch>();
  const vendas = useSelector((state: RootState) => state.vendas.vendas);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toastShownRef = useRef(false); // Controle específico para o toast

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        const resposta = await getVendas(); // Assumindo que getVendas aceita signal
        if (!signal.aborted) {
          dispatch(setVendas(resposta));
        }
      } catch (error: any) {
        if (error.name !== "AbortError" && !toastShownRef.current) {
          console.error("Erro ao carregar vendas:", error);
          toastShownRef.current = true;
          toast.error(
            "Não foi possível carregar as vendas. Por favor, tente novamente mais tarde."
          );
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
      toastShownRef.current = false; // Reseta ao desmontar
    };
  }, [dispatch]);

  const filteredVendas = vendas.filter((venda) =>
    Object.values(venda).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col gap-4 items-start justify-between lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendas</h1>
          <p className="text-muted-foreground">Vendas efetuadas em comandas</p>
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <Link href={"/vendas/adicionar"} className="w-full lg:w-auto">
            <Button className="w-full lg:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Nova Venda
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            Todas <Badge className="ml-2">{vendas.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="dinheiro">
            Dinheiro{" "}
            <Badge className="ml-2">
              {vendas.filter((v) => v.metodo_pagamento === "dinheiro").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pix">
            PIX{" "}
            <Badge className="ml-2">
              {vendas.filter((v) => v.metodo_pagamento === "pix").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cartao">
            Cartão{" "}
            <Badge className="ml-2">
              {vendas.filter((v) => v.metodo_pagamento === "cartao").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="outros">
            Outros{" "}
            <Badge className="ml-2">
              {vendas.filter((v) => v.metodo_pagamento === "outros").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <VendasSkeleton />
              ) : (
                <DataTableVendas data={filteredVendas} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dinheiro">
          <Card>
            <CardHeader>
              <CardTitle>Vendas no Dinheiro</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <DataTableVendas
                  data={filteredVendas.filter(
                    (v) => v.metodo_pagamento === "dinheiro"
                  )}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pix">
          <Card>
            <CardHeader>
              <CardTitle>Vendas no Pix</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <DataTableVendas
                  data={filteredVendas.filter(
                    (v) => v.metodo_pagamento === "pix"
                  )}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cartao">
          <Card>
            <CardHeader>
              <CardTitle>Vendas no Cartão</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <DataTableVendas
                  data={filteredVendas.filter(
                    (v) => v.metodo_pagamento === "cartao"
                  )}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="outros">
          <Card>
            <CardHeader>
              <CardTitle>Vendas com outras formas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <DataTableVendas
                  data={filteredVendas.filter(
                    (v) => v.metodo_pagamento === "outros"
                  )}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
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
import { Toaster } from "@/components/ui/sonner";

export default function VendasPage() {
  const dispatch = useDispatch<AppDispatch>();
  const vendas = useSelector((state: RootState) => state.vendas.vendas);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resposta = await getVendas();
        dispatch(setVendas(resposta));
      } catch (error) {
        console.error("Erro ao carregar vendas:", error);
        toast.error(
          "Não foi possível carregar as vendas. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredVendas = vendas.filter((venda) =>
    Object.values(venda).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Toaster></Toaster>
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex flex-col gap-4 items-start justify-between lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vendas</h1>
            <p className="text-muted-foreground">
              Vendas efetuadas em comandas
            </p>
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
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <VendasSkeleton></VendasSkeleton>
                ) : (
                  <DataTableVendas data={filteredVendas} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pix">
            <Card>
              <CardHeader>
                <CardTitle>Vendas no PIX</CardTitle>
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
        </Tabs>
      </div>
    </>
  );
}

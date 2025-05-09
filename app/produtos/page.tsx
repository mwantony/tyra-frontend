/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { getProdutos } from "@/services/produtos";
import { DataTableProdutos } from "@/components/data-table-produtos";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setProdutos } from "@/store/slices/produtosSlice";

export default function ProdutosPage() {
  const dispatch = useDispatch<AppDispatch>();
  const produtos = useSelector((state: RootState) => state.produtos.produtos);

  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const resposta = await getProdutos();
      dispatch(setProdutos(resposta));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtra os produtos com base no termo de busca e na aba ativa
  const filteredProdutos = produtos.filter((produto) => {
    const matchesSearch = Object.values(produto).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pratos") return matchesSearch && produto.tipo === "prato";
    if (activeTab === "bebidas") return matchesSearch && produto.tipo === "bebida";

    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seu catálogo de produtos
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              className="w-full pl-9 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}

          <Link href="/produtos/adicionar">
            <Button className="w-full sm:w-fit">
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </Link>
        </div>
      </div>

      {/* Abas de filtro */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            Todos <Badge className="ml-2">{produtos.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pratos">
            Pratos{" "}
            <Badge className="ml-2">
              {produtos.filter((p) => p.tipo === 'prato').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="bebidas">
            Bebidas{" "}
            <Badge className="ml-2">
              {produtos.filter((p) => p.tipo === 'bebida').length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Card principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Produtos</span>
            <span className="text-sm font-normal text-muted-foreground">
              {filteredProdutos.length} itens
            </span>
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
          ) : (
            <DataTableProdutos
              fetchProdutos={fetchData}
              data={filteredProdutos}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

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

// Variáveis de cache no nível do módulo
let cacheProdutos: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos de cache

export default function ProdutosPage() {
  const dispatch = useDispatch<AppDispatch>();
  const produtos = useSelector((state: RootState) => state.produtos.produtos);

  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const fetchData = async (forceRefresh = false) => {
    setLoading(true);
    try {
      const now = Date.now();
      
      if (!forceRefresh && cacheProdutos.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
        dispatch(setProdutos(cacheProdutos));
        setLoading(false);
        return;
      }
      
      const resposta = await getProdutos();
      cacheProdutos = resposta;
      lastFetchTime = now;
      dispatch(setProdutos(resposta));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
      setInitialLoad(true);
    }
  };

  useEffect(() => {
    if (!initialLoad || produtos.length === 0) {
      fetchData();
    }
  }, [initialLoad, produtos.length]);

  const filteredProdutos = produtos.filter((produto) => {
    const matchesSearch = Object.values(produto).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && produto.ativo;
    if (activeTab === "inactive") return matchesSearch && !produto.ativo;

    return matchesSearch;
  });

  const handleRefresh = () => {
    fetchData(true);
  };

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
          <TabsTrigger value="active">
            Ativos{" "}
            <Badge className="ml-2">
              {produtos.filter((p) => p.ativo).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inativos{" "}
            <Badge className="ml-2">
              {produtos.filter((p) => !p.ativo).length}
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
          {loading && !initialLoad ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <DataTableProdutos
              fetchProdutos={() => fetchData(true)}
              data={filteredProdutos}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
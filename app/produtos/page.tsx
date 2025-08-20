/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
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
import { ProdutosSkeleton } from "./produtos-skeleton";
import { toast } from "sonner";

export default function ProdutosPage() {
  const dispatch = useDispatch<AppDispatch>();
  const produtos = useSelector((state: RootState) => state.produtos.produtos);

  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const toastShownRef = useRef(false); // Controle para toast único

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const resposta = await getProdutos();
      dispatch(setProdutos(resposta));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      if (!toastShownRef.current) {
        toast.error(
          "Não foi possível carregar os produtos. Por favor, tente novamente mais tarde."
        );
        toastShownRef.current = true;
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const abortController = new AbortController();

    fetchData();

    return () => {
      abortController.abort();
      toastShownRef.current = false; // Reseta ao desmontar
    };
  }, [fetchData]);

  const filteredProdutos = produtos.filter((produto) => {
    const matchesSearch = Object.values(produto).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pratos")
      return matchesSearch && produto.tipo === "prato";
    if (activeTab === "bebidas")
      return matchesSearch && produto.tipo === "bebida";
    if (activeTab === "sobremesas")
      return matchesSearch && produto.tipo === "sobremesa";
    if (activeTab === "outros")
      return matchesSearch && produto.tipo === "outros";

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
              {produtos.filter((p) => p.tipo === "prato").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="bebidas">
            Bebidas{" "}
            <Badge className="ml-2">
              {produtos.filter((p) => p.tipo === "bebida").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="sobremesas">
            Sobremesas{" "}
            <Badge className="ml-2">
              {produtos.filter((p) => p.tipo === "sobremesa").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="outros">
            Outros{" "}
            <Badge className="ml-2">
              {produtos.filter((p) => p.tipo === "outros").length}
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
            <ProdutosSkeleton />
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
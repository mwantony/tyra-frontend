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
import { ProdutosSkeleton } from "../produtos-skeleton";

export default function PratosPage() {
  const [pratos, setPratos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const resposta = await getProdutos();
      // Filtra apenas os produtos do tipo "prato"
      const pratosFiltrados = resposta.filter(
        (produto) => produto.tipo === "prato"
      );
      setPratos(pratosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar pratos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtra os pratos com base no termo de busca e na aba ativa
  const filteredPratos = pratos.filter((prato) => {
    const matchesSearch = Object.values(prato).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && !prato.ativo;
    if (activeTab === "inactive") return matchesSearch && prato.ativo;

    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pratos</h1>
          <p className="text-muted-foreground">
            Gerencie seu cardápio de pratos
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/produtos/adicionar">
            <Button className="w-full sm:w-fit">
              <Plus className="mr-2 h-4 w-4" />
              Novo Prato
            </Button>
          </Link>
        </div>
      </div>

      {/* Abas de filtro */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            Todos <Badge className="ml-2">{pratos.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Ativos{" "}
            <Badge className="ml-2">
              {pratos.filter((p) => !p.ativo).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inativos{" "}
            <Badge className="ml-2">
              {pratos.filter((p) => p.ativo).length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Card principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Pratos</span>
            <span className="text-sm font-normal text-muted-foreground">
              {filteredPratos.length} itens
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <ProdutosSkeleton></ProdutosSkeleton>
          ) : (
            <DataTableProdutos
              fetchProdutos={fetchData}
              data={filteredPratos}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

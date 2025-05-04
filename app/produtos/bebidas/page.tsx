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

export default function BebidasPage() {
  const [bebidas, setBebidas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const resposta = await getProdutos();
      // Filtra apenas os produtos do tipo "bebida"
      const bebidasFiltradas = resposta.filter(
        (produto) => produto.tipo === "bebida"
      );
      setBebidas(bebidasFiltradas);
    } catch (error) {
      console.error("Erro ao buscar bebidas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtra as bebidas com base no termo de busca e na aba ativa
  const filteredBebidas = bebidas.filter((bebida) => {
    const matchesSearch = Object.values(bebida).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && bebida.ativo;
    if (activeTab === "inactive") return matchesSearch && !bebida.ativo;

    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bebidas</h1>
          <p className="text-muted-foreground">
            Gerencie seu cardápio de bebidas
          </p>
        </div>

      </div>

      {/* Abas de filtro */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            Todos <Badge className="ml-2">{bebidas.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Ativos{" "}
            <Badge className="ml-2">
              {bebidas.filter((b) => b.ativo).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inativos{" "}
            <Badge className="ml-2">
              {bebidas.filter((b) => !b.ativo).length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Card principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Bebidas</span>
            <span className="text-sm font-normal text-muted-foreground">
              {filteredBebidas.length} itens
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <DataTableProdutos
              fetchProdutos={fetchData}
              data={filteredBebidas}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getComandas } from "@/services/comandas";
import { getProdutos } from "@/services/produtos";
import { comandaAdicionar } from "@/services/comandas";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Search, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";

export default function NovaVendaPage() {
  const [comandas, setComandas] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [comandaSelecionada, setComandaSelecionada] = useState<string>("");
  const [itensSelecionados, setItensSelecionados] = useState<
    { produto_id: string; quantidade: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [buscaComanda, setBuscaComanda] = useState("");
  const [buscaProduto, setBuscaProduto] = useState("");
  const [etapa, setEtapa] = useState<1 | 2>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todasComandas, produtos] = await Promise.all([
          getComandas(),
          getProdutos(),
        ]);

        const comandasFiltradas = todasComandas.filter(
          (c) => c.status === "fechada" || c.status === "cancelada"
        );

        setComandas(comandasFiltradas);
        setProdutos(produtos);
      } catch (error) {
        toast.error("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const adicionarProduto = (produtoId: string) => {
    if (itensSelecionados.some((item) => item.produto_id === produtoId)) {
      toast.warning("Este produto já foi adicionado");
      return;
    }

    setItensSelecionados((prev) => [
      ...prev,
      { produto_id: produtoId, quantidade: 1 },
    ]);
    setBuscaProduto("");
    toast.success("Produto adicionado");
  };

  const atualizarQuantidade = (index: number, quantidade: number) => {
    const newQuantity = Math.max(1, quantidade);
    setItensSelecionados((prev) => {
      const atualizados = [...prev];
      atualizados[index].quantidade = newQuantity;
      return atualizados;
    });
  };

  const removerProduto = (index: number) => {
    setItensSelecionados((prev) => prev.filter((_, i) => i !== index));
    toast.info("Produto removido");
  };

  const handleSalvarVenda = async () => {
    if (!comandaSelecionada) {
      toast.error("Selecione uma comanda");
      return;
    }

    if (itensSelecionados.length === 0) {
      toast.error("Adicione pelo menos um produto");
      return;
    }

    
    try {
      await comandaAdicionar(comandaSelecionada, {
        produtos: itensSelecionados,
      });
      toast.success("Produtos adicionados com sucesso!");
      setComandaSelecionada("");
      setItensSelecionados([]);
      setEtapa(1);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao registrar venda");
    }
  };

  const comandasFiltradas = comandas.filter((c) =>
    c.numero_comanda.toString().includes(buscaComanda)
  );

  const produtosFiltrados = produtos.filter((p) => {
    const termo = buscaProduto.toLowerCase();
    return (
      p.nome.toLowerCase().includes(termo) ||
      (p.ean && p.ean.toString().includes(termo))
    );
  });

  if (loading) {
    return (
      <div className="p-8 w-full space-y-6">
        <Skeleton className="h-10 w-48 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full">
      <Toaster></Toaster>
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Nova Venda</CardTitle>
          </CardHeader>

          <CardContent>
            <motion.div
              key={etapa}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {etapa === 1 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="buscaComanda">Buscar Comanda</Label>
                      <Input
                        id="buscaComanda"
                        placeholder="Digite o número da comanda..."
                        value={buscaComanda}
                        onChange={(e) => setBuscaComanda(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Comandas disponíveis</Label>
                      <Select
                        value={comandaSelecionada}
                        onValueChange={(valor) => {
                          setComandaSelecionada(valor);
                          setEtapa(2);
                        }}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Selecione uma comanda" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <ScrollArea className="h-60 w-full">
                            {comandasFiltradas.length === 0 ? (
                              <p className="p-2 text-sm text-muted-foreground text-center">
                                Nenhuma comanda encontrada
                              </p>
                            ) : (
                              comandasFiltradas.map((comanda) => (
                                <SelectItem
                                  key={comanda.numero_comanda}
                                  value={comanda.numero_comanda.toString()}
                                  className="w-full"
                                >
                                  <div className="flex items-center gap-2 w-full">
                                    <span>#{comanda.numero_comanda}</span>
                                    <Badge
                                      variant="outline"
                                      className="capitalize"
                                    >
                                      {comanda.status}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center text-muted-foreground max-w-md">
                      <h3 className="font-medium text-lg mb-2">
                        Como funciona?
                      </h3>
                      <p className="mb-4">
                        Selecione uma comanda fechada ou cancelada para
                        registrar uma nova venda.
                      </p>
                      <p>
                        Na próxima etapa você poderá adicionar os produtos
                        vendidos.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEtapa(1)}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                          <Label className="text-muted-foreground">
                            Comanda selecionada
                          </Label>
                          <p className="font-semibold text-lg">
                            #{comandaSelecionada}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="buscaProduto">Adicionar Produtos</Label>
                      <div className="relative mt-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="buscaProduto"
                          placeholder="Busque por nome ou código EAN..."
                          value={buscaProduto}
                          onChange={(e) => setBuscaProduto(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      {buscaProduto && produtosFiltrados.length > 0 && (
                        <Card className="mt-2">
                          <ScrollArea className="h-60">
                            {produtosFiltrados.map((produto) => (
                              <div
                                key={produto.id}
                                onClick={() => adicionarProduto(produto.id)}
                                className="p-3 hover:bg-muted/50 cursor-pointer flex justify-between items-center"
                              >
                                <div>
                                  <p className="font-medium">{produto.nome}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {produto.ean && `EAN: ${produto.ean}`}
                                  </p>
                                </div>
                                <Badge variant="secondary">
                                  R$ {Number(produto.preco).toFixed(2)}
                                </Badge>
                              </div>
                            ))}
                          </ScrollArea>
                        </Card>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium">Resumo da Venda</h3>
                      <p className="text-sm text-muted-foreground">
                        Itens adicionados à comanda #{comandaSelecionada}
                      </p>
                    </div>

                    {itensSelecionados.length > 0 ? (
                      <>
                        <Card>
                          <div className="divide-y">
                            {itensSelecionados.map((item, index) => {
                              const produto = produtos.find(
                                (p) => p.id === item.produto_id
                              );
                              return (
                                <div
                                  key={index}
                                  className="p-4 flex items-center justify-between"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">
                                      {produto?.nome}
                                    </p>
                                    {produto?.ean && (
                                      <p className="text-xs text-muted-foreground">
                                        EAN: {produto.ean}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <Label
                                        htmlFor={`quantidade-${index}`}
                                        className="text-sm"
                                      >
                                        Qtd:
                                      </Label>
                                      <Input
                                        id={`quantidade-${index}`}
                                        type="number"
                                        min={1}
                                        value={item.quantidade}
                                        onChange={(e) =>
                                          atualizarQuantidade(
                                            index,
                                            parseInt(e.target.value)
                                          )
                                        }
                                        className="w-16 text-center"
                                      />
                                    </div>

                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => removerProduto(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>

                        <div className="flex justify-end">
                          <Button
                            onClick={handleSalvarVenda}
                            className="w-full md:w-auto"
                            size="lg"
                          >
                            Adicionar à Comanda
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Card className="h-40 flex items-center justify-center">
                        <div className="p-8 text-center text-muted-foreground">
                          <p>Nenhum produto adicionado</p>
                          <p className="text-sm">
                            Busque e adicione produtos ao lado
                          </p>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

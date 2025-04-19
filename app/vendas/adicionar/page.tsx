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
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

  useEffect(() => {
    const fetchData = async () => {
      const todasComandas = await getComandas();
      const produtos = await getProdutos();
      setComandas(todasComandas.filter((c) => c.status === "fechada"));
      setProdutos(produtos);
      setLoading(false);
    };

    fetchData();
  }, []);

  const adicionarProduto = (produtoId: string) => {
    setItensSelecionados((prev) => [
      ...prev,
      { produto_id: produtoId, quantidade: 1 },
    ]);
  };

  const atualizarQuantidade = (index: number, quantidade: number) => {
    setItensSelecionados((prev) => {
      const atualizados = [...prev];
      atualizados[index].quantidade = quantidade;
      return atualizados;
    });
  };

  const removerProduto = (index: number) => {
    setItensSelecionados((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSalvarVenda = async () => {
    if (!comandaSelecionada || itensSelecionados.length === 0) {
      toast.error("Selecione uma comanda e ao menos um produto.");
      return;
    }

    try {
      await comandaAdicionar(comandaSelecionada, {
        produtos: [{ produto_id: 1, quantidade: 2 }],
      });
      toast.success("Venda adicionada com sucesso!");
      setComandaSelecionada("");
      setItensSelecionados([]);
    } catch (err) {
      toast.error("Erro ao criar venda.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  // Filtros:
  const comandasFiltradas = comandas.filter((c) =>
    c.numero_comanda.toString().includes(buscaComanda)
  );

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(buscaProduto.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Adicionar Nova Venda</h1>

      <div className="space-y-2">
        <Label htmlFor="buscaComanda">Buscar Comanda</Label>
        <Input
          id="buscaComanda"
          placeholder="Digite o número da comanda..."
          value={buscaComanda}
          onChange={(e) => setBuscaComanda(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comanda">Comanda (fechada)</Label>
        <Select
          value={comandaSelecionada}
          onValueChange={setComandaSelecionada}
        >
          <SelectTrigger className="w-full">
            Selecione uma comanda
          </SelectTrigger>
          <SelectContent>
            {comandasFiltradas.map((comanda) => (
              <SelectItem key={comanda.id} value={comanda.id.toString()}>
                #{comanda.numero_comanda}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="buscaProduto">Buscar Produto</Label>
        <Input
          id="buscaProduto"
          placeholder="Digite o nome do produto..."
          value={buscaProduto}
          onChange={(e) => setBuscaProduto(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Produtos</Label>
        <div className="grid grid-cols-2 gap-2">
          {produtosFiltrados.map((produto) => (
            <Button
              key={produto.id}
              variant="outline"
              onClick={() => adicionarProduto(produto.id)}
            >
              {produto.nome}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Itens Selecionados</h2>
        {itensSelecionados.map((item, index) => {
          const produto = produtos.find((p) => p.id === item.produto_id);
          return (
            <div key={index} className="flex items-center gap-4">
              <span className="w-32">{produto?.nome}</span>
              <Input
                type="number"
                min={1}
                value={item.quantidade}
                onChange={(e) =>
                  atualizarQuantidade(index, parseInt(e.target.value))
                }
                className="w-20"
              />
              <Button
                variant="ghost"
                className="text-red-500"
                onClick={() => removerProduto(index)}
              >
                Remover
              </Button>
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleSalvarVenda}
        disabled={!comandaSelecionada || itensSelecionados.length === 0}
      >
        Salvar Venda
      </Button>
    </div>
  );
}

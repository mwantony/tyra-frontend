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
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { CustomSpinner } from "@/components/custom-spinner";

export default function Page() {
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
      const todasComandas = await getComandas();
      const produtos = await getProdutos();
      
      const comandasFiltradas = todasComandas.filter(
        (c) => c.status === "fechada" || c.status === "cancelada"
      );
  
      setComandas(comandasFiltradas);
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
    setBuscaProduto("");
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
      console.log(itensSelecionados)
      await comandaAdicionar(comandaSelecionada, {
        produtos: itensSelecionados,
      });
      toast.success("Venda adicionada com sucesso!");
      setComandaSelecionada("");
      setItensSelecionados([]);
      setEtapa(1);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar venda.");
    }
  };

  if (loading)
    return <CustomSpinner></CustomSpinner>;

  const comandasFiltradas = comandas.filter((c) =>
    c.numero_comanda.toString().includes(buscaComanda)
  );

  const produtosFiltrados = produtos.filter((p) => {
    const termo = buscaProduto.toLowerCase();
    return (
      p.nome.toLowerCase().includes(termo) ||
      (p.ean && p.ean.toLowerCase().includes(termo))
    );
  });
  

  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center ">
          Nova Venda
        </h1>

        <motion.div
          key={etapa}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {etapa === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="buscaComanda">Buscar Comanda</Label>
                <Input
                  id="buscaComanda"
                  placeholder="Digite o número da comanda..."
                  value={buscaComanda}
                  onChange={(e) => setBuscaComanda(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="comanda">Comandas disponíveis</Label>
                <Select
                  value={comandaSelecionada}
                  onValueChange={(valor) => {
                    setComandaSelecionada(valor);
                    setEtapa(2);
                  }}
                >
                  <SelectTrigger className="w-full mt-1">
                    Selecione uma comanda
                  </SelectTrigger>
                  <SelectContent>
                    {comandasFiltradas.length === 0 ? (
                      <p className="p-2 text-sm ">
                        Nenhuma encontrada
                      </p>
                    ) : (
                      comandasFiltradas.map((comanda) => (
                        <SelectItem
                          key={comanda.numero_comanda}
                          value={comanda.numero_comanda.toString()}
                        >
                          #{comanda.numero_comanda}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {etapa === 2 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Label className="text-lg">
                  Comanda Selecionada:{" "}
                  <span className="font-semibold text-blue-600">
                    #{comandaSelecionada}
                  </span>
                </Label>
                <Button variant="outline" onClick={() => setEtapa(1)}>
                  Trocar comanda
                </Button>
              </div>

              <div>
                <Label htmlFor="buscaProduto">Buscar Produto</Label>
                <Input
                  id="buscaProduto"
                  placeholder="Digite o nome ou EAN para buscar..."
                  value={buscaProduto}
                  onChange={(e) => setBuscaProduto(e.target.value)}
                  className="mb-2"
                />
                {buscaProduto && (
                  <div className="border rounded-lg shadow max-h-40 overflow-y-auto">
                    {produtosFiltrados.length === 0 ? (
                      <p className="p-2 text-sm ">
                        Nenhum produto encontrado
                      </p>
                    ) : (
                      produtosFiltrados.map((produto) => (
                        <div
                          key={produto.id}
                          onClick={() => adicionarProduto(produto.id)}
                          className="p-2 cursor-pointer text-sm"
                        >
                          {produto.nome}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {itensSelecionados.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold ">
                    Itens Selecionados
                  </h2>
                  {itensSelecionados.map((item, index) => {
                    const produto = produtos.find(
                      (p) => p.id === item.produto_id
                    );
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg"
                      >
                        <span className="w-40">{produto?.nome}</span>
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
                          className="text-red-600"
                          onClick={() => removerProduto(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleSalvarVenda}
                  disabled={itensSelecionados.length === 0}
                >
                  Adicionar à Comanda
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

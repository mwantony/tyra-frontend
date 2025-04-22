/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postProduto } from "@/services/produtos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useTranslate } from "@/hooks/use-translate";

// Função para buscar o produto na API do Open Food Facts
const fetchProdutoByEAN = async (ean: string) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${ean}.json`
  );
  const data = await response.json();
  return data.product;
};

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    tipo: "prato",
    ean: "",
    descricao: "",
  });
  const { translate } = useTranslate();

  // Função para lidar com as mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função para lidar com a mudança no tipo
  const handleTipoChange = (value: string) => {
    setForm({ ...form, tipo: value });
  };

  // Função para buscar e preencher os dados do produto
  const handleEANChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const ean = e.target.value;
    setForm({ ...form, ean });

    if (ean.length === 13) {
      // Verifica se o código EAN está completo
      try {
        const produtoData = await fetchProdutoByEAN(ean);

        if (produtoData) {
          // Atualiza os campos do formulário com os dados retornados
          setForm({
            ...form,
            nome: produtoData.product_name || "",
            ean: produtoData.code || "",
            descricao: produtoData.description || "",
            preco: produtoData.price || "",
          });
        } else {
        }
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    }
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postProduto({
        ...form,
        preco: parseFloat(form.preco),
      });

      router.push("/produtos");
    } catch (err: any) {
      toast.error("Erro ao cadastrar produto", {  
        description: await translate(err.response.data.message),
      });
      console.error("Erro ao cadastrar produto:", err);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-6">
      <Toaster></Toaster>
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Produto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          <div>
            <Label htmlFor="ean">EAN</Label>
            <Input
              name="ean"
              placeholder="Digite o código EAN"
              value={form.ean}
              onChange={handleEANChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              name="nome"
              placeholder="Digite o nome do produto"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="preco">Preço</Label>

            <Input
              name="preco"
              placeholder="Digite o preço do produto"
              value={form.preco}
              onChange={handleChange}
              required
              type="number"
              step="0.01"
            />
          </div>
          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Select value={form.tipo} onValueChange={handleTipoChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prato">Prato</SelectItem>
                <SelectItem value="bebida">Bebida</SelectItem>
                <SelectItem value="sobremesa">Sobremesa</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              placeholder="Digite a descrição do produto    "
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-4 w-full">
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
}

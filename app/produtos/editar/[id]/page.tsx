"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduto, putProduto } from "@/services/produtos";
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

// Função para buscar produto por EAN
const fetchProdutoByEAN = async (ean: string) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${ean}.json`
  );
  const data = await response.json();
  return data.product;
};

export default function Page() {
  const router = useRouter();
  const id = useParams().id;

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    tipo: "prato",
    ean: "",
    descricao: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const produto = await getProduto(id);
        if (produto) {
          setForm({
            nome: produto.nome || "",
            preco: produto.preco?.toString() || "",
            tipo: produto.tipo || "prato",
            ean: produto.ean || "",
            descricao: produto.descricao || "",
          });
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTipoChange = (value: string) => {
    setForm({ ...form, tipo: value });
  };

  const handleEANChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const ean = e.target.value;
    setForm({ ...form, ean });

    if (ean.length === 13) {
      try {
        const produtoData = await fetchProdutoByEAN(ean);
        if (produtoData) {
          setForm((prevForm) => ({
            ...prevForm,
            nome: produtoData.product_name || prevForm.nome,
            descricao: produtoData.description || prevForm.descricao,
            preco: produtoData.price || prevForm.preco,
          }));
        }
      } catch (err) {
        console.error("Erro ao buscar produto por EAN:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await putProduto(id, {
          ...form,
          preco: parseFloat(form.preco),
        });
        router.push("/produtos");
      }
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-6">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="ean">EAN</Label>
            <Input
              name="ean"
              placeholder="Digite o código EAN"
              value={form.ean}
              onChange={handleEANChange}
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
              placeholder="Digite a descrição do produto"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-4 w-full">
            Atualizar
          </Button>
        </form>
      </div>
    </div>
  );
}

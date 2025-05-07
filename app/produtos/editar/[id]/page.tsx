/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CustomSpinner } from "@/components/custom-spinner";
import { Loader2 } from "lucide-react";
import { formatCurrency, unformatCurrency } from "@/utils/currencyUtils";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingEAN, setIsFetchingEAN] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    tipo: "prato",
    ean: "",
    descricao: "",
  });

  useEffect(() => {
    const loadProduto = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const produto = await getProduto(id);
          if (produto) {
            setForm({
              nome: produto.nome || "",
              preco: formatCurrency(produto.preco?.toString()) || "",
              tipo: produto.tipo || "prato",
              ean: produto.ean || "",
              descricao: produto.descricao || "",
            });
          }
        } catch (error) {
          toast.error("Erro ao carregar produto");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProduto();
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
      setIsFetchingEAN(true);
      try {
        const produtoData = await fetchProdutoByEAN(ean);
        if (produtoData) {
          setForm((prevForm) => ({
            ...prevForm,
            nome: produtoData.product_name || prevForm.nome,
            descricao: produtoData.description || prevForm.descricao,
            preco: produtoData.price || prevForm.preco,
          }));
          toast.success("Dados do produto carregados automaticamente");
        }
      } catch (err) {
        toast.warning("Produto não encontrado na base de dados");
      } finally {
        setIsFetchingEAN(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await putProduto(id, {
          ...form,
          preco: unformatCurrency(form.preco),
        });
        toast.success("Produto atualizado com sucesso!");
        setTimeout(() => router.push("/produtos"), 1000);
      }
    } catch (err) {
      toast.error("Erro ao atualizar produto");
      console.error("Erro ao atualizar produto:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <CardTitle className="text-2xl">Editar Produto</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Código EAN */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ean">Código EAN</Label>
                <div className="relative">
                  <Input
                    name="ean"
                    placeholder="Digite o código de barras"
                    value={form.ean}
                    onChange={handleEANChange}
                    disabled={isLoading}
                  />
                  {isFetchingEAN && <CustomSpinner></CustomSpinner>}
                </div>
              </div>

              {/* Nome do Produto */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Produto</Label>
                <Input
                  name="nome"
                  placeholder="Nome do produto"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Preço */}
              <div className="space-y-2">
                <Label htmlFor="preco">Preço (R$)</Label>
                <Input
                  name="preco"
                  placeholder="0,00"
                  value={form.preco}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      preco: formatCurrency(e.target.value),
                    })
                  }
                  required
                />
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="tipo">Categoria</Label>
                <Select
                  value={form.tipo}
                  onValueChange={handleTipoChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prato">Prato</SelectItem>
                    <SelectItem value="bebida">Bebida</SelectItem>
                    <SelectItem value="sobremesa">Sobremesa</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Descrição */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  placeholder="Informações adicionais sobre o produto"
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/produtos")}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin"></Loader2>}
                Atualizar Produto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

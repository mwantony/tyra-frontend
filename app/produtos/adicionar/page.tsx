/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { MoonLoader } from "react-spinners";
import { Loader2 } from "lucide-react";
import { set } from "date-fns";
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
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    tipo: "prato",
    ean: "",
    descricao: "",
  });
  const { translate } = useTranslate();

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
      setIsLoading(true);
      try {
        const produtoData = await fetchProdutoByEAN(ean);
        if (produtoData) {
          setForm({
            ...form,
            nome: produtoData.product_name || "",
            ean: produtoData.code || "",
            descricao: produtoData.description || "",
            preco: produtoData.price || "",
          });
          toast.success("Produto encontrado na base de dados!");
        }
      } catch (error) {
        toast.warning("Produto não encontrado, preencha manualmente");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await postProduto({
        ...form,
        preco: unformatCurrency(form.preco),
      });
      toast.success("Produto cadastrado com sucesso!");
      setTimeout(() => router.push("/produtos"), 1500);
    } catch (err: any) {
      toast.error("Erro ao cadastrar produto", {
        description: await translate(err.response.data.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="flex flex-col items-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CardTitle className="text-2xl">Cadastrar Produto</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ean">Código EAN</Label>
                  <div className="relative">
                    <Input
                      name="ean"
                      placeholder="Digite o código de barras"
                      value={form.ean}
                      onChange={handleEANChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Produto</Label>
                  <Input
                    name="nome"
                    placeholder="Nome do produto"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="tipo">Categoria</Label>
                  <Select value={form.tipo} onValueChange={handleTipoChange}>
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

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    placeholder="Informações adicionais sobre o produto"
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/produtos")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin"></Loader2>}
                  Salvar Produto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

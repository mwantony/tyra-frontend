/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fechaComanda,
  getComanda,
  comandaAdicionar,
  cancelaComanda,
} from "@/services/comandas";
import { getProdutos } from "@/services/produtos";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/custom-modal";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DetalhesComandaPage() {
  const { numeroComanda } = useParams();
  const [comanda, setComanda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalProdutosOpen, setModalProdutosOpen] = useState(false);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<any[]>([]);
  const [quantidades, setQuantidades] = useState<any>({});
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const fetchComanda = async () => {
    try {
      const resultado = await getComanda(numeroComanda);
      setComanda(resultado);
    } catch (err) {
      console.error("Erro ao buscar comanda:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (numeroComanda) fetchComanda();
  }, [numeroComanda]);

  const calcularTotal = () => {
    return comanda?.produtos?.reduce(
      (acc: number, produto: any) =>
        acc + Number(produto.preco) * produto.pivot.quantidade,
      0
    );
  };

  const handleFecharComanda = () => setShowModal(true);

  const handleConfirmarFechamento = async () => {
    try {
      await fechaComanda(comanda.numero_comanda);
      toast.success("Comanda fechada com sucesso!", {
        description: `Valor total: R$ ${calcularTotal().toFixed(2)}`,
        duration: 3000,
      });
      await fetchComanda();
    } catch (err) {
      toast.error("Erro ao fechar comanda.");
    } finally {
      setShowModal(false);
    }
  };

  const abrirModalAdicionarProdutos = async () => {
    try {
      const produtos = await getProdutos();
      setProdutosDisponiveis(produtos);
      setModalProdutosOpen(true);
      setTermoPesquisa(""); // Resetar pesquisa ao abrir modal
    } catch (err) {
      toast.error("Erro ao buscar produtos.");
    }
  };

  const handleQuantidadeChange = (produtoId: number, quantidade: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [produtoId]: quantidade,
    }));
  };

  const handleAdicionarProduto = async (produtoId: number) => {
    const quantidade = quantidades[produtoId] || 1;
    try {
      await comandaAdicionar(comanda.numero_comanda, {
        produtos: [{ produto_id: produtoId, quantidade }],
      });
      toast.success("Produto adicionado com sucesso!");
      setModalProdutosOpen(false);
      await fetchComanda();
    } catch (err) {
      toast.error("Erro ao adicionar produto.");
    }
  };

  const handleCancelarComanda = async (numeroComanda: string) => {
    try {
      await cancelaComanda(numeroComanda);
      toast.success("Comanda cancelada com sucesso!");
      await fetchComanda();
    } catch (err) {
      toast.error("Erro ao cancelar comanda.");
    }
  };

  // Filtrar produtos por nome ou código EAN
  const produtosFiltrados = produtosDisponiveis.filter((produto) => {
    const termo = termoPesquisa.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(termo) ||
      (produto.ean && produto.ean.toString().includes(termo))
    );
  });

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!comanda) {
    return (
      <div className="p-6 text-muted-foreground">
        Nenhuma comanda encontrada com o número {numeroComanda}.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Comanda #{comanda.numero_comanda}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleFecharComanda}>
              Fechar Comanda
            </DropdownMenuItem>
            <DropdownMenuItem onClick={abrirModalAdicionarProdutos}>
              Adicionar Produtos
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCancelarComanda(comanda.numero_comanda)}
              className="text-red-600"
            >
              Cancelar Comanda
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-1 text-sm text-muted-foreground">
        <p>Status: <strong className="text-primary">{comanda.status}</strong></p>
        <p>Criada em: {dayjs(comanda.created_at).format("DD/MM/YYYY HH:mm")}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Produtos</h2>
        {comanda.produtos.length === 0 ? (
          <p className="text-muted-foreground">Nenhum produto nesta comanda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comanda.produtos.map((produto: any) => (
              <Card key={produto.id}>
                <CardHeader>
                  <CardTitle>{produto.nome}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p>Tipo: {produto.tipo}</p>
                  <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
                  {produto.codigo_ean && <p>EAN: {produto.codigo_ean}</p>}
                  <p>Descrição: {produto.descricao}</p>
                  <p>Quantidade: {produto.pivot.quantidade}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmação de fechamento */}
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Confirmar fechamento</h2>
          <p>Deseja realmente fechar esta comanda e registrar a venda?</p>
          <p>
            Valor total: <strong>R$ {calcularTotal().toFixed(2)}</strong>
          </p>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmarFechamento}>Confirmar</Button>
          </div>
        </div>
      </CustomModal>

      {/* Modal de adicionar produtos */}
      <CustomModal
        isOpen={modalProdutosOpen}
        onClose={() => setModalProdutosOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Selecionar Produtos</h2>
          
          {/* Campo de pesquisa */}
          <Input
            placeholder="Pesquisar por nome ou código EAN..."
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            className="mb-4"
          />
          
          {produtosFiltrados.length === 0 ? (
            <p className="text-muted-foreground">
              {termoPesquisa ? 
                "Nenhum produto encontrado com o termo pesquisado." : 
                "Nenhum produto disponível."
              }
            </p>
          ) : (
            <ul className="space-y-4 max-h-[400px] overflow-y-auto">
              {produtosFiltrados.map((produto) => (
                <li
                  key={produto.id}
                  className="border p-4 rounded-md shadow-sm space-y-2"
                >
                  <div>
                    <p className="font-medium">{produto.nome}</p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <p>R$ {Number(produto.preco).toFixed(2)}</p>
                      {produto.codigo_ean && <p>EAN: {produto.codigo_ean}</p>}
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={quantidades[produto.id] || 1}
                    min="1"
                    onChange={(e) =>
                      handleQuantidadeChange(produto.id, +e.target.value)
                    }
                  />
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleAdicionarProduto(produto.id)}
                  >
                    Adicionar
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CustomModal>
    </div>
  );
}
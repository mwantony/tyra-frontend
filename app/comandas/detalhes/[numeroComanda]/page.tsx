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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  MoreHorizontal,
  PlusCircle,
  XCircle,
  CheckCircle2,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";

export default function DetalhesComandaPage() {
  const { numeroComanda } = useParams();
  const [comanda, setComanda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModalFechamento, setShowModalFechamento] = useState(false);
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
      toast.error("Erro ao carregar comanda");
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

  const abrirModalAdicionarProdutos = async () => {
    try {
      const produtos = await getProdutos();
      setProdutosDisponiveis(produtos);
      setModalProdutosOpen(true);
      setTermoPesquisa("");
    } catch (err) {
      toast.error("Erro ao buscar produtos.");
    }
  };

  const handleQuantidadeChange = (produtoId: number, quantidade: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [produtoId]: Math.max(1, quantidade),
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

  const handleConfirmarFechamento = async () => {
    try {
      if (calcularTotal() !== 0) {
        await fechaComanda(comanda.numero_comanda);
        toast.success("Comanda fechada com sucesso!", {
          description: `Valor total: R$ ${calcularTotal().toFixed(2)}`,
        });
        await fetchComanda();
      } else {
        toast.error('Não é possível fechar uma comanda sem produtos.');
        setShowModalFechamento(false);
      }
    } catch (err) {
      toast.error("Erro ao fechar comanda.");
    } finally {
      setShowModalFechamento(false);
    }
  };

  const handleCancelarComanda = async () => {
    try {
      await cancelaComanda(comanda.numero_comanda);
      toast.success("Comanda cancelada com sucesso!");
      await fetchComanda();
    } catch (err) {
      toast.error("Erro ao cancelar comanda.");
    }
  };

  const produtosFiltrados = produtosDisponiveis.filter((produto) => {
    const termo = termoPesquisa.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(termo) ||
      (produto.ean && produto.ean.toString().includes(termo))
    );
  });

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!comanda) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          Nenhuma comanda encontrada com o número {numeroComanda}.
        </p>
      </div>
    );
  }

  const statusVariant =
    comanda.status === "aberta"
      ? "default"
      : comanda.status === "fechada"
      ? "secondary"
      : "destructive";

  return (
    <div>
      <Toaster></Toaster>
      <div className="flex p-4  md:p-6 flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Comanda #{comanda.numero_comanda}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={statusVariant} className="capitalize">
              {comanda.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Criada em{" "}
              {format(new Date(comanda.created_at), "PPPp", { locale: ptBR })}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={abrirModalAdicionarProdutos}
            className="gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Adicionar Produtos
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setShowModalFechamento(true)}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Fechar Comanda
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleCancelarComanda}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <XCircle className="h-4 w-4 text-destructive focus:text-destructive" />
                Cancelar Comanda
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />

      <div className="p-4 space-y-4 md:p-6 md:space-y-6">
        <h2 className="text-lg font-semibold">Produtos</h2>

        {comanda.produtos.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhum produto nesta comanda.
            </CardContent>
          </Card>
        ) : (
          <Card>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Preço Unitário</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comanda.produtos.map((produto: any) => (
                    <TableRow key={produto.id}>
                      <TableCell>
                        <div className="font-medium">{produto.nome}</div>
                        <div className="text-sm text-muted-foreground">
                          {produto.descricao}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {produto.pivot.quantidade}
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {Number(produto.preco).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        R${" "}
                        {(
                          Number(produto.preco) * produto.pivot.quantidade
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <CardFooter className="bg-muted/50 h-25">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">
                  {comanda.produtos.length}{" "}
                  {comanda.produtos.length === 1 ? "item" : "itens"}
                </span>
                <div className="space-y-1 text-right">
                  <div className="text-lg font-semibold">
                    Total: R$ {calcularTotal().toFixed(2)}
                  </div>
                  {comanda.status === "aberta" && (
                    <Button
                      size="sm"
                      onClick={() => setShowModalFechamento(true)}
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Fechar Comanda
                    </Button>
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Modal de confirmação de fechamento */}
      <Dialog open={showModalFechamento} onOpenChange={setShowModalFechamento}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar fechamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>Deseja realmente fechar esta comanda e registrar a venda?</p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-semibold">
                  R$ {calcularTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowModalFechamento(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirmarFechamento}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de adicionar produtos */}
      <Dialog open={modalProdutosOpen} onOpenChange={setModalProdutosOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Produtos</DialogTitle>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por nome ou código EAN..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="pl-9 mb-4"
            />
          </div>

          {produtosFiltrados.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {termoPesquisa
                ? "Nenhum produto encontrado com o termo pesquisado."
                : "Nenhum produto disponível."}
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pr-2">
                {produtosFiltrados.map((produto) => (
                  <Card key={produto.id}>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-medium">{produto.nome}</h3>
                        <p className="text-sm text-muted-foreground">
                          {produto.descricao}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          R$ {Number(produto.preco).toFixed(2)}
                        </span>
                        {produto.codigo_ean && (
                          <Badge variant="outline">{produto.codigo_ean}</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={quantidades[produto.id] || 1}
                          onChange={(e) =>
                            handleQuantidadeChange(produto.id, +e.target.value)
                          }
                          className="w-20"
                        />
                        <Button
                          className="flex-1"
                          onClick={() => handleAdicionarProduto(produto.id)}
                        >
                          Adicionar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

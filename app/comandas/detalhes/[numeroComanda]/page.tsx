"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fechaComanda, getComanda } from "@/services/comandas";
import { getProdutos } from "@/services/produtos";
import { comandaAdicionar } from "@/services/comandas";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/custom-modal";
import { toast } from "sonner";

export default function DetalhesComandaPage() {
  const { numeroComanda } = useParams();
  const [comanda, setComanda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalProdutosOpen, setModalProdutosOpen] = useState(false);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<any[]>([]);
  const [quantidades, setQuantidades] = useState<any>({});

  useEffect(() => {
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

    if (numeroComanda) fetchComanda();
  }, [numeroComanda]);

  const calcularTotal = () => {
    return comanda?.produtos?.reduce(
      (acc: number, produto: any) =>
        acc + Number(produto.preco) * produto.pivot.quantidade,
      0
    );
  };

  const handleFecharComanda = () => {
    setShowModal(true);
  };

  const handleConfirmarFechamento = async () => {
    await fechaComanda(comanda.numero_comanda).then(() => {
      toast.success("Comanda fechada com sucesso!", {
        description: `Valor total: R$ ${calcularTotal().toFixed(2)}`,
        duration: 3000,
      });
    });
    setShowModal(false);
  };

  const abrirModalAdicionarProdutos = async () => {
    try {
      const produtos = await getProdutos();
      setProdutosDisponiveis(produtos);
      setModalProdutosOpen(true);
    } catch (err) {
      toast.error("Erro ao buscar produtos.");
    }
  };

  const handleQuantidadeChange = (produtoId: number, quantidade: number) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [produtoId]: quantidade,
    }));
  };

  const handleAdicionarProduto = async () => {
    // Preparando os dados no formato correto
    const produtosParaAdicionar = produtosDisponiveis.map((produto: any) => ({
      produto_id: produto.id, // Utiliza o id do produto
      quantidade: quantidades[produto.id] || 1, // Pega a quantidade do estado ou assume 1
    }));

    try {
      // Enviando os dados para a API
      await comandaAdicionar(comanda.numero_comanda, produtosParaAdicionar);

      // Fechando o modal e mostrando uma mensagem de sucesso
      setModalProdutosOpen(false);
      toast.success("Produtos adicionados com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar produtos à comanda:", err);
      toast.error("Erro ao adicionar produtos.");
    }
  };

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
        <h1 className="text-2xl font-bold">
          Comanda #{comanda.numero_comanda}
        </h1>
        <div className="flex space-x-2">
          <Button variant={"outline"} onClick={handleFecharComanda}>
            Fechar Comanda
          </Button>
          <Button onClick={abrirModalAdicionarProdutos}>
            Adicionar Produtos
          </Button>
        </div>
      </div>

      <p>
        Status: <strong>{comanda.status}</strong>
      </p>
      <p>Criada em: {dayjs(comanda.created_at).format("DD/MM/YYYY HH:mm")}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Produtos</h2>
        {comanda.produtos.length === 0 ? (
          <p className="text-muted-foreground">Nenhum produto nesta comanda.</p>
        ) : (
          <ul className="space-y-2">
            {comanda.produtos.map((produto: any) => (
              <li
                key={produto.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <p className="font-medium">{produto.nome}</p>
                <p className="text-sm text-muted-foreground">{produto.tipo}</p>
                <p className="text-sm">
                  Preço: R$ {Number(produto.preco).toFixed(2)}
                </p>
                <p className="text-sm">Descrição: {produto.descricao}</p>
                <p className="text-sm">Quantidade: {produto.pivot.quantidade}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal de confirmação de fechamento */}
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="space-y-4">
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
      <CustomModal isOpen={modalProdutosOpen} onClose={() => setModalProdutosOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Selecionar Produtos</h2>
          {produtosDisponiveis.length === 0 ? (
            <p className="text-muted-foreground">Nenhum produto disponível.</p>
          ) : (
            <ul className="space-y-2 max-h-[400px] overflow-y-auto">
              {produtosDisponiveis.map((produto) => (
                <li key={produto.id} className="border p-4 rounded-md">
                  <p className="font-medium">{produto.nome}</p>
                  <p className="text-sm">R$ {Number(produto.preco).toFixed(2)}</p>
                  <input
                    type="number"
                    value={quantidades[produto.id] || 1}
                    min="1"
                    onChange={(e) => handleQuantidadeChange(produto.id, +e.target.value)}
                    className="mt-2 p-1 border rounded"
                  />
                  <Button
                    className="mt-2"
                    onClick={() => handleAdicionarProduto()}
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

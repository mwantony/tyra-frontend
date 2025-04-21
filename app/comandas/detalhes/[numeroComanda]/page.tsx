/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fechaComanda, getComanda } from "@/services/comandas";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/custom-modal"; // certifique-se que está no caminho certo
import { toast } from "sonner";

export default function DetalhesComandaPage() {
  const { numeroComanda } = useParams();
  const [comanda, setComanda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
        acc + Number(produto.preco) * produto.pivot.quantidade, // Multiplicando preço pela quantidade
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
          <Button>Adicionar Produtos</Button>
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

      {/* Modal de confirmação */}
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
    </div>
  );
}

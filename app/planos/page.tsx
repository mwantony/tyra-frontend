/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  associarPlano,
  buscarPagamento,
  criarPagamento,
  getPlano,
  getPlanos,
} from "@/services/planos";
import { useAuth } from "@/contexts/auth-provider";
import dayjs from "dayjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { PaymentModal } from "./payment-modal";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<any>();
  const [allPlans, setAllPlans] = useState<any[]>([]);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { restaurante } = useAuth();
  console.log(restaurante.proxima_cobranca_em);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (restaurante?.plano_id) {
        try {
          const plano = await getPlano(restaurante.plano_id);
          setCurrentPlan(plano);
        } catch (error) {
          console.error("Erro ao carregar plano atual:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (restaurante?.plano_id === null) {
        setCurrentPlan(null);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurante?.plano_id]);

  const fetchAllPlans = async () => {
    setIsLoading(true);
    try {
      const plans = await getPlanos();
      setAllPlans(plans);
    } catch (error) {
      console.error("Erro ao carregar planos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenPlansModal = async () => {
    await fetchAllPlans();
    setIsPlansModalOpen(true);
  };

  const handlePlanSelection = (plan: any) => {
    if (plan.id !== currentPlan?.id) {
      setSelectedPlan(plan);
      setIsConfirmationModalOpen(true);
    }
  };

  const handleConfirmPlanChange = async () => {
    setIsLoading(true);
    let verificationInterval: NodeJS.Timeout | null = null;

    try {
      if (selectedPlan.id !== 1) {
        const paymentResponse = await criarPagamento(selectedPlan.id, {
          email: restaurante.email,
          payment_method_id: "pix",
          first_name: restaurante.nome_fantasia.trim().split(" ")[0],
          last_name: restaurante.nome_fantasia.trim().split(" ").slice(-1)[0],
        });

        const paymentId = paymentResponse.payment_id;
        console.log("Pagamento criado:", paymentResponse);

        // Update UI state
        setIsPaymentModalOpen(true);
        setIsConfirmationModalOpen(false);
        setIsPlansModalOpen(false);
        setPaymentData(paymentResponse);

        await new Promise<void>((resolve, reject) => {
          verificationInterval = setInterval(async () => {
            try {
              const { payment } = await buscarPagamento(paymentId);
              console.log("Status do pagamento:", payment.status);

              if (payment.status === "approved") {
                if (verificationInterval) {
                  clearInterval(verificationInterval); // Limpa o intervalo aqui
                }
                resolve();
                await finalizePlanChange();
                return;
              }

              if (
                ["rejected", "cancelled", "refunded", "charged_back"].includes(
                  payment.status
                )
              ) {
                if (verificationInterval) {
                  clearInterval(verificationInterval); // Limpa o intervalo aqui também
                }
                reject(new Error(`Pagamento ${payment.status}`));
                return;
              }
            } catch (error) {
              if (verificationInterval) {
                clearInterval(verificationInterval); // E aqui também
              }
              reject(error);
            }
          }, 3000);

          setTimeout(() => {
            if (verificationInterval) {
              clearInterval(verificationInterval); // Limpa o intervalo no timeout
            }
            reject(new Error("Tempo limite para pagamento excedido"));
          }, 1800000);
        });
      } else {
        await finalizePlanChange();
      }
    } catch (error) {
      console.error("Erro no processo de pagamento:", error);
      toast.error(
        "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."
      );

      if (verificationInterval) {
        clearInterval(verificationInterval);
      }

      setIsConfirmationModalOpen(false);
      setIsPlansModalOpen(false);
      setIsPaymentModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const finalizePlanChange = async () => {
    await associarPlano(restaurante.id, {
      plano_id: selectedPlan.id,
    });
    setCurrentPlan(selectedPlan);

    setIsConfirmationModalOpen(false);
    setIsPlansModalOpen(false);
    setIsPaymentModalOpen(false);

    toast.success(
      `Plano assinado com sucesso! Você agora está no plano ${selectedPlan.nome}.`
    );
  };

  const PlanCardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-16" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2" />
          </div>

          <Separator />

          <div>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-5 w-2/3" />
          </div>

          <Separator />

          <div>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <ul className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
  return (
    <div className="flex flex-col h-full">
      <Toaster></Toaster>
      <div className="flex items-center justify-between">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Planos e Cobranças</h1>
          <p className="text-muted-foreground">
            Gerencie seu plano de assinatura e informações de pagamento
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2 space-y-6 p-6">
        {isLoading ? (
          <PlanCardSkeleton />
        ) : currentPlan ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {"Plano atual"}
              </CardTitle>
              <Badge variant="outline" className="text-sm">
                {dayjs().isAfter(
                  dayjs(restaurante.proxima_cobranca_em, "YYYY-MM-DD")
                )
                  ? "Inativo"
                  : currentPlan?.status === "ativo"
                  ? "Ativo"
                  : "Ativo"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {currentPlan?.nome || "Plano"}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentPlan?.preco
                      ? new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(currentPlan.preco)
                      : "R$ 0,00"}{" "}
                    / por mês
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Próxima cobrança</h3>
                  <p>
                    {restaurante?.proxima_cobranca_em
                      ? dayjs(restaurante.proxima_cobranca_em).format(
                          "DD/MM/YYYY"
                        )
                      : "Não disponível"}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Recursos incluídos</h3>
                  <ul className="space-y-2">
                    {currentPlan?.id === 1 && (
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <p>Até 20 comandas</p>
                      </li>
                    )}
                    {currentPlan?.id === 2 && (
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <p>Até 50 comandas</p>
                      </li>
                    )}
                    {currentPlan?.id === 3 && (
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <p>Comandas ilimitadas</p>
                      </li>
                    )}

                    <li className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <p>Gerenciamento de pedidos</p>
                    </li>

                    <li className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <p>Relatórios de desempenho</p>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <p>Suporte 24/7</p>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={handleOpenPlansModal}
                    disabled={isLoading}
                  >
                    {isLoading ? "Carregando..." : "Atualizar plano"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Plano Ativo</CardTitle>
              <Badge variant="destructive" className="text-sm">
                Inativo
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Nenhum plano ativo</h2>
                  <p className="text-muted-foreground">
                    Você não possui um plano ativo no momento
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Status</h3>
                  <p className="text-destructive">Assinatura não ativa</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Recursos disponíveis</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-muted-foreground">
                      <span className="text-red-500">✗</span>
                      <p>Comandas limitadas (apenas demonstração)</p>
                    </li>
                    <li className="flex items-center space-x-2 text-muted-foreground">
                      <span className="text-red-500">✗</span>
                      <p>Gerenciamento de pedidos desativado</p>
                    </li>
                    <li className="flex items-center space-x-2 text-muted-foreground">
                      <span className="text-red-500">✗</span>
                      <p>Relatórios de desempenho indisponíveis</p>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleOpenPlansModal}>
                    Assinar plano
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Card de informações de pagamento (pode ser implementado depois) */}
      </div>

      {/* Modal de seleção de planos */}
      <Dialog open={isPlansModalOpen} onOpenChange={setIsPlansModalOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Atualizar Plano</DialogTitle>
            <DialogDescription>
              Selecione um novo plano para sua conta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {allPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all ${
                  currentPlan?.id === plan.id
                    ? "border-primary ring-2 ring-primary"
                    : "hover:border-primary/50"
                }`}
                onClick={() => handlePlanSelection(plan)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{plan.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(plan.preco)}
                      <span className="text-sm font-normal text-muted-foreground">
                        /mês
                      </span>
                    </p>
                    <ul className="space-y-2 text-sm">
                      {plan.id === 1 && (
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Até 20 comandas</span>
                        </li>
                      )}
                      {plan.id === 2 && (
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Até 50 comandas</span>
                        </li>
                      )}
                      {plan.id === 3 && (
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Comandas ilimitadas</span>
                        </li>
                      )}
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Gerenciamento de pedidos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Relatórios de desempenho</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Suporte 24/7</span>
                      </li>
                    </ul>
                    {currentPlan?.id === plan.id ? (
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        disabled
                      >
                        Plano Atual
                      </Button>
                    ) : (
                      <Button className="w-full mt-4">Selecionar</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmação */}
      <Dialog
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Confirmar Mudança de Plano
            </DialogTitle>
            <DialogDescription>
              Você está prestes a mudar do plano {currentPlan?.nome} para o
              plano {selectedPlan?.nome}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Plano Atual</h3>
                <p className="text-muted-foreground">{currentPlan?.nome}</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(currentPlan?.preco || 0)}
                  <span className="text-sm font-normal">/mês</span>
                </p>
              </div>

              <div>
                <h3 className="font-medium">Novo Plano</h3>
                <p className="text-muted-foreground">{selectedPlan?.nome}</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(selectedPlan?.preco || 0)}
                  <span className="text-sm font-normal">/mês</span>
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium">Alterações</h3>
              <ul className="space-y-2 mt-2">
                {selectedPlan?.id > currentPlan?.id && (
                  <li className="text-green-600">
                    ✔️ Upgrade - Você ganhará mais recursos
                  </li>
                )}
                {selectedPlan?.id < currentPlan?.id && (
                  <li className="text-yellow-600">
                    ⚠️ Downgrade - Alguns recursos serão limitados
                  </li>
                )}
                <li>Mudança efetiva a partir da próxima cobrança</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmationModalOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>

            <Button onClick={handleConfirmPlanChange} disabled={isLoading}>
              {isLoading ? "Processando..." : "Confirmar Mudança"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <PaymentModal
        selectedPlan={selectedPlan}
        isPaymentModalOpen={isPaymentModalOpen}
        setIsPaymentModalOpen={setIsPaymentModalOpen}
        paymentData={paymentData?.payment_details}
      />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getPlano } from "@/services/planos";
import { useAuth } from "@/contexts/auth-provider";

export default function BillingPage() {
  // Dados mockados do plano atual
  const [currentPlan, setCurrentPlan] = useState<any>();
  const { restaurante } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      await getPlano(restaurante?.plano_id).then((res) => {
        console.log(res);
        setCurrentPlan(res);
      });
    };
    fetchData();
  }, [restaurante?.plano_id]);
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cobrança</h1>
          <p className="text-muted-foreground">
            Gerencie seu plano de assinatura e informações de pagamento
          </p>
        </div>
        <Button variant="outline">Exportar faturas</Button>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card do plano atual */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">{currentPlan?.nome}</CardTitle>
            <Badge variant="outline" className="text-sm">
              {currentPlan?.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{currentPlan?.name}</h2>
                <p className="text-muted-foreground">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(currentPlan?.preco)}{" "}
                  / por mês
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Próxima cobrança</h3>
                <p>{currentPlan?.nextBillingDate}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Recursos incluídos</h3>
                <ul className="space-y-2">
                  {currentPlan?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  Cancelar assinatura
                </Button>
                <Button className="flex-1">Atualizar plano</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de informações de pagamento */}
        <Card>
          <CardHeader>
            <CardTitle>Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">Cartão de Crédito</p>
                  <p className="text-sm text-muted-foreground">
                    **** **** **** 4242
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Alterar
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Histórico de Faturas</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Fatura #{item}</p>
                      <p className="text-sm text-muted-foreground">
                        15/0{item}/2024
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ 99,90</p>
                      <p className="text-sm text-muted-foreground">Pago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de atualização de plano (seria implementado depois) */}
      {/* <UpdatePlanModal /> */}
    </div>
  );
}

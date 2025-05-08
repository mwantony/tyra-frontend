import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChartIcon,
  CreditCardIcon,
  DollarSignIcon,
  Lock,
  RocketIcon,
} from "lucide-react";
import Link from "next/link";

export function FinanceNotAvailable() {
  return (
    <div className="flex flex-col h-full p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">
            Visão geral das finanças do restaurante
          </p>
        </div>
      </div>

      <Alert className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <RocketIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-800">Recurso Premium</AlertTitle>
        <AlertDescription className="text-blue-700">
          O módulo Financeiro completo está disponível apenas em nosso plano
          Premium. Atualize seu plano para acessar análises detalhadas,
          relatórios avançados e ferramentas de gestão financeira.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card de Upgrade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RocketIcon className="h-5 w-5" />
              <span>Atualize seu Plano</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p>
                Desbloqueie todo o potencial do módulo Financeiro com nosso
                plano Premium:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <BarChartIcon className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Análises financeiras detalhadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSignIcon className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Relatórios personalizáveis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CreditCardIcon className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Controle de fluxo de caixa</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trending-up mt-1 flex-shrink-0 "
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <span>Previsões e métricas de crescimento</span>
                </li>
              </ul>

              <Link href={"/planos"}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Ver Planos Disponíveis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Card de Recursos Básicos */}
        <Card >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <span>Recursos Limitados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                No plano básico, você tem acesso limitado às funcionalidades
                financeiras:
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Dashboard </p>
                    <p className="text-sm text-muted-foreground">
                      Visualize as vendas em tempo real
                    </p>
                  </div>
                  <Link href={"/"}>
                    <Button variant="outline" size="sm">
                      Visualizar
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Vendas </p>
                    <p className="text-sm text-muted-foreground">
                      Ver todas as vendas realizadas
                    </p>
                  </div>
                  <Link href={"/vendas"}>
                    <Button variant="outline" size="sm">
                      Visualizar
                    </Button>
                  </Link>
                </div>
              </div>

              <Link href={"/planos"}>
                <Button variant="outline" className="w-full">
                  Desbloquear
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Contato */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-headphones"
            >
              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
            </svg>
            <span>Precisa de ajuda?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Entre em contato com nosso suporte para entender como o módulo
              Financeiro pode ajudar seu negócio.
            </p>
            <a
              href="https://wa.me/5549991402777?text=Olá, gostaria de saber mais sobre os planos Tyra"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle mr-2"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                Falar com Suporte
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

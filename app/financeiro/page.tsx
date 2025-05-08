/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useTheme } from "@/contexts/theme-provider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  CreditCard,
  PieChart,
  BarChart,
  Calendar,
  Download,
  RefreshCw,
  Filter,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DatePickerWithRange } from "@/components/date-range-picker";
import dayjs from "dayjs";
import React from "react";
import { subDays } from "date-fns";
import { getDadosFinanceiros } from "@/services/financeiro";
import { FinanceSkeleton } from "./finance-skeleton";
import { AnimatedNumber } from "@/components/section-cards";
import { motion } from "framer-motion";

export default function FinancePage() {
  const barraAnimada = (porcentagem, cor = "bg-blue-500") => (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${porcentagem}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-2 ${cor} rounded-full`}
    />
  );
  const [dadosFinanceiro, setDadosFinanceiro] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = React.useState({
    from: dayjs(subDays(new Date(), 7)).format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  });
  // Dados simulados para demonstração
  const financialData = {
    receita: 12500.75,
    expenses: 8450.3,
    profit: 4050.45,
    vendas: 342,
    ticket_medio: 36.55,
    metodos_pagamento: {
      cartao: 45,
      pix: 30,
      dinheiro: 20,
      outros: 5,
    },
    vendasRecentes: [
      {
        id: 1,
        date: "2023-05-15",
        description: "Venda #1234",
        amount: 128.5,
        type: "income",
      },
      {
        id: 2,
        date: "2023-05-15",
        description: "Fornecedor - Carnes",
        amount: 850.0,
        type: "expense",
      },
      {
        id: 3,
        date: "2023-05-14",
        description: "Venda #1233",
        amount: 95.2,
        type: "income",
      },
      {
        id: 4,
        date: "2023-05-14",
        description: "Salários",
        amount: 3200.0,
        type: "expense",
      },
      {
        id: 5,
        date: "2023-05-13",
        description: "Venda #1232",
        amount: 210.0,
        type: "income",
      },
    ],
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    const response = await getDadosFinanceiros(date.from, date.to);
    console.log(response);
    setDadosFinanceiro(response);
    setIsLoading(false);
  };

  const handleDateChange = (newDateRange: any) => {
    setDate({
      from: dayjs(newDateRange.from).format("YYYY-MM-DD"),
      to: dayjs(newDateRange.to).format("YYYY-MM-DD"),
    });
    handleRefresh();
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDadosFinanceiros(date.from, date.to);
      console.log(response);
      setDadosFinanceiro(response);
    };
    fetchData();
  });
  if (dadosFinanceiro === null) {
    return <FinanceSkeleton></FinanceSkeleton>;
  } else {
    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
            <p className="text-muted-foreground">
              Visão geral das finanças do restaurante
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="w-full md:w-auto" // Ocupa toda largura no mobile, largura automática no desktop
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full md:w-auto" // Ocupa toda largura no mobile, largura automática no desktop
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex-1 p-4 lg:p-6 space-y-4  overflow-auto">
          {/* Filtros e Período */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Período:</span>
                </div>
                <div className="w-full md:w-auto">
                  <DatePickerWithRange onChange={handleDateChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Receita Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedNumber
                    isCurrency={true}
                    value={Number(dadosFinanceiro?.receita)}
                  ></AnimatedNumber>
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação à semana passada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">
                  <AnimatedNumber
                    isCurrency={true}
                    value={Number(dadosFinanceiro?.despesas)}
                  ></AnimatedNumber>
                </div>
                <p className="text-xs text-muted-foreground">
                  +8% em relação à semana passada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lucro Líquido
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">
                  <AnimatedNumber
                    isCurrency={true}
                    value={Number(dadosFinanceiro?.lucro)}
                  ></AnimatedNumber>
                </div>
                <p className="text-xs text-muted-foreground">
                  +18% em relação à semana passada
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Métodos de Pagamento e Transações Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Métodos de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Métodos de Pagamento</span>
                </CardTitle>
                <CardDescription>
                  Distribuição das formas de pagamento utilizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      nome: "Cartão de Crédito/Débito",
                      valor: dadosFinanceiro?.metodos_pagamento.cartao,
                    },
                    {
                      nome: "PIX",
                      valor: dadosFinanceiro?.metodos_pagamento.pix,
                    },
                    {
                      nome: "Dinheiro",
                      valor: dadosFinanceiro?.metodos_pagamento.dinheiro,
                    },
                    {
                      nome: "Outros",
                      valor: dadosFinanceiro?.metodos_pagamento.outros,
                      cor: "bg-gray-500",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.nome}</span>
                        <span className="text-sm font-medium">
                          {item.valor}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        {barraAnimada(item.valor, item.cor)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transações Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>Vendas Recentes</span>
                </CardTitle>
                <CardDescription>Últimas 5 vendas registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dadosFinanceiro?.vendas_recentes.map((venda) => (
                    <div
                      key={venda.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="text-sm">{venda.descricao}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(venda.data).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className={`font-bold text-sm `}>
                        +
                        {Number(venda.valor).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/vendas" passHref>
                  <Button variant="outline" className="w-full mt-4">
                    Ver todas as vendas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                <span>Estatísticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Total de Vendas</h3>
                  <p className="text-2xl font-bold">
                    <AnimatedNumber
                      value={dadosFinanceiro?.total_vendas}
                    ></AnimatedNumber>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    no período selecionado
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Ticket Médio</h3>
                  <p className="text-2xl font-bold">
                    <AnimatedNumber
                      isCurrency={true}
                      value={Number(dadosFinanceiro?.ticket_medio)}
                    ></AnimatedNumber>
                  </p>
                  <p className="text-sm text-muted-foreground">por transação</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Margem de Lucro</h3>
                  <p className="text-2xl flex font-bold ">
                    <AnimatedNumber
                      value={Number(
                        (
                          (dadosFinanceiro?.despesas /
                            dadosFinanceiro?.receita) *
                          100
                        )
                      )}
                    ></AnimatedNumber>
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    em relação à receita
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

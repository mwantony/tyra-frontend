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
import {
  getDadosFinanceiros,
  getDadosFinanceirosPdf,
} from "@/services/financeiro";
import { FinanceSkeleton } from "./finance-skeleton";
import { AnimatedNumber } from "@/components/section-cards";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-provider";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { FinanceNotAvailable } from "./finance-not-avaiable";
import { Badge } from "@/components/ui/badge";

export default function FinancePage() {
  const barraAnimada = (porcentagem, cor = "bg-blue-500") => (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${porcentagem}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-2 ${cor} rounded-full`}
    />
  );
  const { restaurante } = useAuth();
  const [dadosFinanceiro, setDadosFinanceiro] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [count, setCount] = useState(0);
  const [date, setDate] = React.useState({
    from: dayjs(subDays(new Date(), 7)).format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const response = await getDadosFinanceiros(date.from, date.to);
    setDadosFinanceiro(response);
    setIsRefreshing(false);
  };
  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);

      const response: any = await getDadosFinanceirosPdf(date.from, date.to);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio-financeiro.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDateChange = (newDateRange: any) => {
    setDate({
      from: dayjs(newDateRange.from).format("YYYY-MM-DD"),
      to: dayjs(newDateRange.to).format("YYYY-MM-DD"),
    });
    handleRefresh();
  };
  useEffect(() => {
    if (count === 0) {
      setIsLoading(true);
      setCount(1);
    }
    const fetchData = async () => {
      try {
        const response = await getDadosFinanceiros(date.from, date.to);
        console.log(response);
        setDadosFinanceiro(response);
        setIsLoading(false); // Garante que o loading seja desativado no final
      } catch (error: any) {
        if (error?.response?.data?.message) {
          setBlocked(true);
          setIsLoading(false);
          return;
        }
        toast.error("Erro ao carregar dados financeiros");

        console.error("Erro ao carregar dados financeiros:", error);
      }
    };

    fetchData();
  }, [count, date.from, date.to, restaurante.plano_id]); // Depende apenas de 'date.from', 'date.to' e 'restaurante.plano_id'

  const calcularVariacaoSemanal = (
    valorAtual: number,
    valorSemanaPassada: number
  ) => {
    if (valorSemanaPassada === 0) {
      return valorAtual === 0 ? 0 : 100; // Se não havia valor na semana passada, considera 100% de variação
    }
    return ((valorAtual - valorSemanaPassada) / valorSemanaPassada) * 100;
  };

  const formatarVariacao = (variacao: number) => {
    const sinal = variacao >= 0 ? "+" : "";
    return `${sinal}${Math.round(variacao)}%`;
  };

  const getCorVariacao = (variacao: number) => {
    if (variacao > 0) return "text-green-500";
    if (variacao < 0) return "text-red-500";
    return "text-muted-foreground";
  };

  if (isLoading) {
    return <FinanceSkeleton></FinanceSkeleton>;
  } else if (blocked) {
    return <FinanceNotAvailable></FinanceNotAvailable>;
  } else {
    return (
      <div className="flex flex-col h-full">
        <Toaster></Toaster>
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
              disabled={isRefreshing}
              className="w-full md:w-auto" // Ocupa toda largura no mobile, largura automática no desktop
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadPdf()}
              disabled={isDownloading}
              className="w-full md:w-auto" // Ocupa toda largura no mobile, largura automática no desktop
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? "Exportando..." : "Exportar"}
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
                  {formatarVariacao(dadosFinanceiro?.receita || 0)} em relação
                  ao último período
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Comanda mais utilizada
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">
                  <Badge className="text-xl font-bold " variant={'outline'}>{dadosFinanceiro?.comanda_mais_usada}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Variação recente no uso{" "}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dia com maior faturamento
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">
                  <AnimatedNumber
                    isCurrency={true}
                    value={Number(dadosFinanceiro?.faturamento_dia_top)}
                  ></AnimatedNumber>
                </div>
                <p className="text-xs text-muted-foreground">
                  Data maior faturamento:{" "}
                  {dadosFinanceiro?.dia_com_maior_faturamento}
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
                      valor: dadosFinanceiro?.metodos_pagamento?.cartao,
                    },
                    {
                      nome: "PIX",
                      valor: dadosFinanceiro?.metodos_pagamento?.pix,
                    },
                    {
                      nome: "Dinheiro",
                      valor: dadosFinanceiro?.metodos_pagamento?.dinheiro,
                    },
                    {
                      nome: "Outros",
                      valor: dadosFinanceiro?.metodos_pagamento?.outros,
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
              <CardContent className="min-h-[180px]">
                {dadosFinanceiro?.vendas_recentes.length === 0 && (
                  <div className="flex items-center justify-center min-h-full text-sm text-muted-foreground">
                    Nenhuma venda registrada no período selecionado.
                  </div>
                )}
                <div className="space-y-4">
                  {dadosFinanceiro?.vendas_recentes.map((venda) => (
                    <div
                      key={venda.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="text-sm">{venda.descricao}</p>
                        <p className="text-sm text-muted-foreground">
                          {venda.data}
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
                {dadosFinanceiro?.vendas_recentes.length > 0 && (
                  <Link href="/vendas" passHref>
                    <Button variant="outline" className="w-full mt-4">
                      Ver todas as vendas
                    </Button>
                  </Link>
                )}
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
                  <h3 className="font-medium text-sm mb-2">Total de Vendas</h3>
                  <div className="text-2xl font-bold">
                    <AnimatedNumber
                      value={dadosFinanceiro?.total_vendas}
                    ></AnimatedNumber>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    no período selecionado
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-2">Ticket Médio</h3>
                  <div className="text-2xl font-bold">
                    <AnimatedNumber
                      isCurrency={true}
                      value={Number(dadosFinanceiro?.ticket_medio)}
                    ></AnimatedNumber>
                  </div>
                  <p className="text-xs text-muted-foreground">por venda</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-2">Média Diária</h3>
                  <div className="text-2xl flex font-bold ">
                    <AnimatedNumber
                      isCurrency={true}
                      value={dadosFinanceiro?.media_diaria || 0}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    no período selecionado
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

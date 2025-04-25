/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-provider";
import Link from "next/link";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState(1);
  const [cnpj, setCnpj] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingCnpj, setFetchingCnpj] = useState(false);
  const { signup } = useAuth();

  // Função para formatar o CNPJ
  const formatCnpj = useCallback((value: string): string => {
    // Remove todos os caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica a formatação do CNPJ
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
    if (cleaned.length <= 12) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
  }, []);

  // Handler para mudanças no input de CNPJ
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCnpj(e.target.value);
    setCnpj(formatted);
  };

  // Busca dados do CNPJ quando ele é totalmente digitado (14 caracteres)
  useEffect(() => {
    const cleanedCnpj = cnpj.replace(/\D/g, '');
    if (cleanedCnpj.length === 14) {
      fetchCompanyData(cleanedCnpj);
    }
  }, [cnpj]);

  // Função para buscar dados da empresa
  const fetchCompanyData = async (cnpj: string) => {
    setFetchingCnpj(true);
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      
      if (!response.ok) {
        throw new Error("CNPJ não encontrado ou erro na API");
      }
      
      const data = await response.json();
      
      setNomeFantasia(data.fantasia || data.razao_social || "");
      setRazaoSocial(data.razao_social || "");
      setEmail(data.email || "");
      
      toast.success("Dados da empresa carregados automaticamente");
    } catch (error: any) {
      toast.error("Não foi possível buscar os dados do CNPJ. Preencha manualmente.");
      console.error("Erro ao buscar CNPJ:", error);
    } finally {
      setFetchingCnpj(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({
        cnpj: cnpj.replace(/\D/g, ''), 
        nome_fantasia: nomeFantasia,
        razao_social: razaoSocial,
        email,
        password,
      });
    } catch (error: any) {
      toast.error("Erro ao cadastrar. Por favor, tente novamente.");
      console.error("Erro ao cadastrar:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <div className="grid gap-1">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
                required
                value={cnpj}
                onChange={handleCnpjChange}
                disabled={fetchingCnpj}
                maxLength={18} 
              />
              {fetchingCnpj && (
                <p className="text-sm text-muted-foreground">Buscando dados do CNPJ...</p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
              <Input
                id="nomeFantasia"
                placeholder="Digite o nome fantasia"
                required
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="razaoSocial">Razão Social</Label>
              <Input
                id="razaoSocial"
                placeholder="Digite a razão social"
                required
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="Digite sua senha (mínimo 6 caracteres)"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster />
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                <p className="text-balance text-muted-foreground">
                  {step === 1 && "Informações da empresa"}
                  {step === 2 && "Dados de acesso"}
                </p>
              </div>

              {renderStep()}

              <div className="flex justify-between">
                {step > 1 && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                  >
                    Voltar
                  </Button>
                )}
                {step === 1 ? (
                  <Button
                    type="button"
                    onClick={() => setStep((prev) => prev + 1)}
                    className="ml-auto"
                    disabled={!cnpj || !nomeFantasia || !razaoSocial || fetchingCnpj}
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading}>
                    {loading ? "Cadastrando..." : "Finalizar Cadastro"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Faça login
        </Link>
      </div>
    </div>
  );
}
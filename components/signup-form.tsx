/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-provider";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import logo from "@/assets/img/logo.png";

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
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({
        cnpj,
        nome_fantasia: nomeFantasia,
        razao_social: razaoSocial,
        email,
        password,
      });
      toast.error("Erro ao cadastrar", {
        description: "Verifique os dados e tente novamente",
      });
    } catch (error: any) {
      toast.error("Erro ao cadastrar", {
        description: "Verifique os dados e tente novamente",
      });
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
                placeholder="Digite o CNPJ da empresa"
                required
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
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
                placeholder="Digite sua senha"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="text-lg font-medium text-center">
              Confirme seus dados
            </h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">CNPJ:</span> {cnpj}
              </p>
              <p>
                <span className="font-medium">Nome Fantasia:</span>{" "}
                {nomeFantasia}
              </p>
              <p>
                <span className="font-medium">Razão Social:</span> {razaoSocial}
              </p>
              <p>
                <span className="font-medium">Email:</span> {email}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster></Toaster>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                <p className="text-balance text-muted-foreground">
                  {step === 1 && "Informações da empresa"}
                  {step === 2 && "Dados de acesso"}
                  {step === 3 && "Confirmação de dados"}
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
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep((prev) => prev + 1)}
                    className={step === 1 ? "ml-auto" : ""}
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

          <div className="flex flex-col justify-center items-center bg-transparent">
            <Image
              src={logo}
              alt="Imagem"
              className="max-w-[150px] h-auto mb-2"
            />
            <h2 className="font-bold text-lg">Tyra</h2>
          </div>
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

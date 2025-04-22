"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
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
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
              <Input value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="razaoSocial">Razão Social</Label>
              <Input value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} required />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </>
        );
      case 3:
        return (
          <div className="text-sm space-y-2">
            <p><strong>CNPJ:</strong> {cnpj}</p>
            <p><strong>Nome Fantasia:</strong> {nomeFantasia}</p>
            <p><strong>Razão Social:</strong> {razaoSocial}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Senha:</strong> ******</p>
          </div>
        );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-xl font-semibold text-center">Cadastro - Etapa {step} de 3</h1>
            {renderStep()}
            <div className="flex justify-between">
              {step > 1 && (
                <Button variant="outline" type="button" onClick={() => setStep((prev) => prev - 1)}>
                  Voltar
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={() => setStep((prev) => prev + 1)}>
                  Avançar
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? "Cadastrando..." : "Confirmar"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-sm">
        Já tem uma conta? <Link href="/login" className="underline">Fazer login</Link>
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-provider";
import Link from "next/link";
import lofg from "@/assets/svg/undraw_projections_fhch.svg";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password)
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Seja bem-vindo!</h1>
                <p className="text-balance text-muted-foreground">
                  Faça login na sua conta
                </p>
              </div>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="https://wa.me/5549991042777?text=Olá!%20Preciso%20de%20ajuda%20com%20a%20minha%20senha."
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                    target="_blank"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  placeholder="Digite sua senha"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center text-sm">
                Ainda não tem conta?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Cadastrar
                </Link>
              </div>
            </div>
          </form>

          <div className="flex flex-col justify-center items-center bg-transparent">
            <Image
              src={lofg}
              alt="Imagem"
              className="max-w-[250px] h-auto mb-2"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Ao clicar em continuar, você concorda com nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </div>

    </div>
  );
}

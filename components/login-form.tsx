/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { motion } from "framer-motion";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import emailjs from '@emailjs/browser';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPasswordDialogOpen, setIsForgotPasswordDialogOpen] = useState(false);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setIsForgotPasswordLoading(true);
    try {
      const response = await axios.post('/api/reset-password', { 
        email: forgotPasswordEmail 
      });
  
      const newPassword = response.data.new_password; // Ajuste conforme sua API
      
      // 3. Configurações do EmailJS
      const templateParams = {
        senha: newPassword,
      };
  
      // 4. Envia o email com a nova senha
      await emailjs.send(
        'service_0dov8bj', // Substitua pelo seu Service ID
        'template_9xa4pml', // Substitua pelo seu Template ID
        templateParams,
        'h7MCcuvNqiAnSz7tO' // Substitua pelo seu User ID
      );
  
      toast.success("Um email com a nova senha foi enviado para seu endereço cadastrado.");
      setIsForgotPasswordDialogOpen(false);
    } catch (error) {
      console.error("Erro no reset de senha:", error);
      toast.error("Erro ao processar sua solicitação. Tente novamente.");
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Seja bem-vindo!</h1>
                    <p className="text-balance text-muted-foreground">
                      Faça login na sua conta
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="grid gap-1">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                      <Dialog open={isForgotPasswordDialogOpen} onOpenChange={setIsForgotPasswordDialogOpen}>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Esqueceu a senha?
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Recuperar senha</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="forgot-password-email">
                                Email
                              </Label>
                              <Input
                                id="forgot-password-email"
                                type="email"
                                placeholder="Digite seu email cadastrado"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                              />
                            </div>
                            <Button
                              type="button"
                              onClick={handleForgotPassword}
                              disabled={isForgotPasswordLoading}
                            >
                              {isForgotPasswordLoading ? "Enviando..." : "Enviar link de recuperação"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center text-sm">
                    Ainda não tem conta?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Cadastrar
                    </Link>
                  </div>
                </motion.div>
              </div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col justify-center items-center bg-transparent"
            >
              <Image
                src={lofg}
                alt="Imagem"
                className="hidden md:block max-w-[250px] h-auto mb-2"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          Tyra - Soluções para Restaurantes | Versão 1.00 <br></br>
          CNPJ: 00.000.000/0000-00 | Todos os direitos reservados
        </div>
      </motion.div>
    </div>
  );
}
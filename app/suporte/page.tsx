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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import React from "react";

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const formRef = React.useRef<any>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    feedback: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Isso deve desativar o botão imediatamente
  
    try {
      await emailjs.sendForm(
        "service_0dov8bj", 
        "template_lyeyt59", 
        formRef.current!, // Usando a referência do formulário
        {
          publicKey: "h7MCcuvNqiAnSz7tO",
        }
      );
      
      toast.success("Feedback enviado com sucesso!");
      setFormData({
        nome: "",
        email: "",
        assunto: "",
        feedback: "",
      });
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      console.error("Erro ao enviar email:", error);
    } finally {
      setIsSubmitting(false); // Isso deve reativar o botão
    }
  };

  return (
    <div className="flex flex-col h-full">
      
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suporte</h1>
          <p className="text-muted-foreground">
            Entre em contato com nossa equipe de suporte
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
        {/* Formulário de Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Formulário de Feedback</span>
            </CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e nossa equipe entrará em contato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium mb-1"
                  >
                    Nome
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="assunto"
                  className="block text-sm font-medium mb-1"
                >
                  Assunto
                </label>
                <Input
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder="Qual é o assunto?"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium mb-1"
                >
                  Feedback
                </label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Descreva sugestões de melhorias..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  className="w-full md:w-auto"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Feedback"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Canais de Suporte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>Canais de Suporte</span>
            </CardTitle>
            <CardDescription>
              Outras formas de entrar em contato conosco
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="font-medium">E-mail</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Envie um e-mail diretamente para nossa equipe de suporte
              </p>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="w-full md:w-auto"
                  variant="outline"
                  size="sm"
                >
                  {process.env.NEXT_PUBLIC_EMAIL}
                </Button>
              </a>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Telefone</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Fale diretamente com um de nossos atendentes
              </p>
              <a
                href={`https://wa.me/55${process.env.NEXT_PUBLIC_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="w-full md:w-auto"
                  variant="outline"
                  size="sm"
                >
                  (49) 99104-2777
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas Frequentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Perguntas Frequentes</span>
            </CardTitle>
            <CardDescription>
              Encontre respostas para as dúvidas mais comuns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Como redefinir minha senha?</h3>
              <p className="text-sm text-muted-foreground">
                Vá para a página de login e clique em "Esqueci minha senha".
                Você receberá um e-mail com instruções para redefinir sua senha.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">
                Quais são os horários de atendimento?
              </h3>
              <p className="text-sm text-muted-foreground">
                Nosso atendimento funciona 24/7, ou seja, todos os dias 24
                horas.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">
                Como cancelar minha assinatura?
              </h3>
              <p className="text-sm text-muted-foreground">
                Entre em contato com o suporte para prosseguir com o cancelamento. O cancelamento será efetivado
                no final do período atual.
              </p>
            </div>

            <a
              href={`https://wa.me/55${process.env.NEXT_PUBLIC_WHATSAPP}?text=Olá, gostaria de fazer uma pergunta sobre o sistema.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="pl-0 w-full md:w-auto">
                Fazer uma nova pergunta
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

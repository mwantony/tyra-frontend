/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ThemeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-provider";
import { useTheme } from "@/contexts/theme-provider";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import logoDark from "@/assets/img/logo-dark.png";
import logoWhite from "@/assets/img/logo-white.png";
import { TrustedBySection } from "@/components/trusted-by-section";
import { AnimatedFeaturesSection } from "@/components/animated-feature-section";
import { AnimatedLeadSection } from "@/components/animated-lead-section";
import AnimatedPricingSection from "@/components/animated-pricing-section";
import { AnimatedTestimonialsSection } from "@/components/animated-testimonials.section";

// Configurações de animação

export default function LandingPage() {
  const { restaurante } = useAuth();
  const { theme }: any = useTheme();
  useEffect(() => {
    if (restaurante?.id) {
      window.location.href = "/dashboard";
    }
  }, [restaurante]);

  if (!restaurante?.id)
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="container mx-auto py-6 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {theme === "light" ? (
              <Image
                alt="Logo Dark"
                src={logoDark}
                height={100}
                width={100}
              ></Image>
            ) : (
              <Image
                alt="Logo White"
                src={logoWhite}
                height={100}
                width={100}
              ></Image>
            )}
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary transition"
              >
                Recursos
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium hover:text-primary transition"
              >
                Planos
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium hover:text-primary transition"
              >
                Depoimentos
              </a>
              <a
                href="#faq"
                className="text-sm font-medium hover:text-primary transition"
              >
                FAQ
              </a>
            </nav>

            <ThemeToggle />

            <Link href={"/login"}>
              <Button variant="outline">Entrar</Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <AnimatedLeadSection></AnimatedLeadSection>
        {/* Logo Cloud */}
        <TrustedBySection></TrustedBySection>

        {/* Features Section */}
        <AnimatedFeaturesSection></AnimatedFeaturesSection>

        {/* Pricing Section */}
        <AnimatedPricingSection></AnimatedPricingSection>

        {/* Testimonials Section */}
        <AnimatedTestimonialsSection></AnimatedTestimonialsSection>

        {/* FAQ Section */}
        <section id="faq" className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Perguntas frequentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Tudo o que você precisa saber antes de começar
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Posso mudar de plano depois?",
                answer:
                  "Sim, você pode mudar de plano a qualquer momento sem custos adicionais.",
              },
              {
                question: "Há limite de usuários?",
                answer:
                  "Nosso plano Básico permite até 3 usuários, o Profissional até 10 e o Premium é ilimitado.",
              },
              {
                question: "Quanto tempo leva para implementar?",
                answer:
                  "A maioria dos nossos clientes começa a usar o sistema no mesmo dia. Implementações mais complexas podem levar até uma semana.",
              },
              {
                question: "Oferecem treinamento?",
                answer:
                  "Sim, todos os planos incluem treinamento inicial. O plano Premium inclui treinamentos personalizados regulares.",
              },
              {
                question: "E se eu precisar cancelar?",
                answer:
                  "Você pode cancelar a qualquer momento sem taxas de cancelamento.",
              },
            ].map((item, index) => (
              <Card key={index} className="hover:border-primary transition">
                <CardHeader>
                  <CardTitle>{item.question}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {item.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar seu restaurante?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Experimente gratuitamente por 30 dias. Sem necessidade de cartão
              de crédito.
            </p>
            <Link href={"/signup"}>
              <Button size="lg">
                Começar agora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-16 border-t border-border">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {theme === "light" ? (
                  <Image
                    alt="Logo Dark"
                    src={logoDark}
                    height={100}
                    width={100}
                  ></Image>
                ) : (
                  <Image
                    alt="Logo White"
                    src={logoWhite}
                    height={100}
                    width={100}
                  ></Image>
                )}
              </div>
              <p className="text-muted-foreground">
                Soluções para Restaurantes{" "}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-foreground transition"
                  >
                    Planos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Integrações
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Atualizações
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Segurança
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Tyra. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    );

  return null;
}

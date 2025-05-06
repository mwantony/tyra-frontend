"use client";
import { ThemeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-provider";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  const { restaurante } = useAuth();
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
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="#FF5A5F"
              />
              <path
                d="M12 22L20 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 18L20 22"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xl font-bold">Tyra</span>
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
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
            Revolucione a gestão do seu{" "}
            <span className="text-primary">restaurante</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            Tyra oferece todas as ferramentas que você precisa para gerenciar
            seu restaurante de forma eficiente e aumentar seus lucros.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size={"lg"}>
              Começar agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size={"lg"} variant="outline">
              Ver demonstração
            </Button>
          </div>
        </section>

        {/* Logo Cloud */}
        <div className="container mx-auto px-4 py-12 border-y border-border">
          <p className="text-center text-muted-foreground mb-8">
            Confiado pelos melhores restaurantes
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
            <span className="text-xl font-bold">Restaurante A</span>
            <span className="text-xl font-bold">Restaurante B</span>
            <span className="text-xl font-bold">Restaurante C</span>
            <span className="text-xl font-bold">Restaurante D</span>
            <span className="text-xl font-bold">Restaurante E</span>
          </div>
        </div>

        {/* Features Section */}
        <section
          id="features"
          className="container mx-auto px-4 py-20 md:py-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Tudo o que seu restaurante precisa
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Uma plataforma completa com módulos integrados para cada aspecto
              do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:border-primary transition">
              <CardHeader>
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <CardTitle>Recebimento de Pagamentos</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Tenha controle total do fluxo de caixa, custos e lucratividade
                  em tempo real — com o dinheiro caindo direto na sua conta.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:border-primary transition">
              <CardHeader>
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <CardTitle>Cardápio Digital</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Cardápio digital inteligente, gerado automaticamente a partir
                  dos pratos cadastrados.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:border-primary transition">
              <CardHeader>
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle>Relatório de Vendas</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Receba relatórios automáticos das vendas realizadas com
                  geração em PDF, prontos para análise e gestão eficiente.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Planos que se adaptam ao seu negócio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Escolha o plano ideal para o tamanho do seu restaurante. Sem
              surpresas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card className="hover:border-primary transition">
              <CardHeader>
                <CardTitle>Básico</CardTitle>
                <div className="flex items-end mt-2">
                  <span className="text-4xl font-bold">GRÁTIS</span>
                </div>
                <CardDescription className="mt-4">
                  Ideal para pequenos estabelecimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Até 5 comandas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Suporte 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Até 5 mesas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Suporte por e-mail</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link className="w-full" href={"/login"}>
                  <Button className="w-full">Assinar agora</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plano Profissional (Destaque) */}
            <Card className="border-2 border-primary relative">
              <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg">
                MAIS POPULAR
              </div>
              <CardHeader>
                <CardTitle>Intermediário</CardTitle>
                <div className="flex items-end mt-2">
                  <span className="text-4xl font-bold">R$49,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <CardDescription className="mt-4">
                  Perfeito para restaurantes médios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Até 15 comandas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Suporte 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Até 15 mesas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Relatório de Desempenho</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Cardápio Digital</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link className="w-full" href={"/login"}>
                  <Button className="w-full">Assinar agora</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plano Premium */}
            <Card className="hover:border-primary transition">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <div className="flex items-end mt-2">
                  <span className="text-4xl font-bold">R$120,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <CardDescription className="mt-4">
                  Solução completa para grandes restaurantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Comandas ilimitadas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Todos os recursos avançados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Relatórios personalizados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Recebimento de pagamentos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Suporte 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    <span>Cardápio Digital</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link className="w-full" href={"/login"}>
                  <Button className="w-full">Assinar agora</Button>
                </Link>{" "}
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-12 text-muted-foreground">
            <p>
              Precisa de um plano personalizado?{" "}
              <a
                href="https://wa.me/5549991042777"
                target="_blank"
                className="text-primary hover:underline"
              >
                Fale com nosso time
              </a>
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="container mx-auto px-4 py-20 md:py-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              O que nossos clientes dizem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Restaurantes que transformaram seus negócios com a Tyra
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="hover:border-primary transition">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <CardTitle>Transformou nosso negócio</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    "A Tyra nos ajudou a reduzir custos em 30% e aumentar nossa
                    eficiência operacional significativamente."
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                  <div>
                    <p className="font-medium">João Silva</p>
                    <p className="text-sm text-muted-foreground">
                      Restaurante da Praça
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                    fill="#FF5A5F"
                  />
                  <path
                    d="M12 22L20 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 18L20 22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-lg font-bold">Tyra</span>
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

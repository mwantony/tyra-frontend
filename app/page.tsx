"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-provider";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  const { restaurante } = useAuth();
  useEffect(() => {
    if (restaurante?.id) {
      window.location.href = "/dashboard";
    }
  });
  if (!restaurante?.id)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#111111] text-white">
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
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Recursos
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Preços
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              className="text-sm font-medium hover:text-gray-300 transition"
            >
              FAQ
            </a>
          </nav>
          <Link href={"/login"}>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black"
            >
              Entrar
            </Button>
          </Link>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
            Revolucione a gestão do seu{" "}
            <span className="text-[#FF5A5F]">restaurante</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mt-6">
            Tyra oferece todas as ferramentas que você precisa para gerenciar
            seu restaurante de forma eficiente e aumentar seus lucros.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#FF5A5F] hover:bg-[#e04a50] px-8 py-6 text-lg">
              Começar agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
            >
              Ver demonstração
            </Button>
          </div>
        </section>

        {/* Logo Cloud */}
        <div className="container mx-auto px-4 py-12 border-y border-gray-800">
          <p className="text-center text-gray-400 mb-8">
            Confiado pelos melhores restaurantes
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
            {/* Substitua por logos reais de clientes */}
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
            <p className="text-gray-400 max-w-2xl mx-auto mt-4">
              Uma plataforma completa com módulos integrados para cada aspecto
              do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FF5A5F] transition">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FF5A5F] rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
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
                <CardTitle>Gestão Financeira</CardTitle>
                <CardDescription className="text-gray-400">
                  Controle completo de fluxo de caixa, custos e lucratividade em
                  tempo real.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FF5A5F] transition">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FF5A5F] rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
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
                <CardTitle>Pedidos Digitais</CardTitle>
                <CardDescription className="text-gray-400">
                  Sistema de comandas digitais com integração a delivery e mesa
                  diretamente da cozinha.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FF5A5F] transition">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FF5A5F] rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
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
                <CardTitle>Controle de Estoque</CardTitle>
                <CardDescription className="text-gray-400">
                  Automatize seu estoque com alertas de reposição e controle de
                  validade de produtos.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#FF5A5F] py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar seu restaurante?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Experimente gratuitamente por 14 dias. Sem necessidade de cartão
              de crédito.
            </p>
            <Button className="bg-black text-white hover:bg-gray-900 px-8 py-6 text-lg">
              Começar agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-16 border-t border-gray-800">
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
              <p className="text-gray-400">
                Soluções inteligentes para restaurantes prosperarem.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Integrações
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Atualizações
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Segurança
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Tyra. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    );
  if (!restaurante?.id) {
    return (window.location.href = "/dashboard");
  }
}

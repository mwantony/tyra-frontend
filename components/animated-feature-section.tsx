"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const features = [
  {
    title: "Resumo Financeiro",
    description:
      "Tenha controle total do fluxo de caixa, custos e lucratividade em tempo real — com o dinheiro caindo direto na sua conta.",
    icon: (
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
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    title: "Cardápio Digital",
    description:
      "Cardápio digital inteligente, gerado automaticamente a partir dos pratos cadastrados.",
    icon: (
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
    ),
  },
  {
    title: "Relatório de Vendas",
    description:
      "Receba relatórios automáticos das vendas realizadas com geração em PDF, prontos para análise e gestão eficiente.",
    icon: (
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export function AnimatedFeaturesSection() {
  return (
    <section
      id="features"
      className="container mx-auto px-4 py-20 md:py-32"
    >
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          variants={itemVariants}
        >
          Tudo o que seu restaurante precisa
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto mt-4"
          variants={itemVariants}
        >
          Uma plataforma completa com módulos integrados para cada aspecto do
          seu negócio.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="hover:border-primary transition h-full">
              <CardHeader>
                <motion.div
                  className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {feature.icon}
                </motion.div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, Check, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CareersPage() {
  // Variantes de animação
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const benefits = [
    "Salário competitivo + bônus",
    "Plano de saúde completo",
    "Vale-refeição/alimentação",
    "Home office flexível",
    "Ambiente descontraído e inovador",
    "Programa de desenvolvimento contínuo",
    "Participação nos lucros",
    "Horário flexível",
  ];

  const openPositions = [
    {
      title: "Desenvolvedor Full-stack",
      type: "Tempo integral",
      location: "Presencial (SC)",
      description:
        "Desenvolva as próximas funcionalidades da nossa plataforma usando React, Node.js e tecnologias modernas.",
    },
    {
      title: "Designer de Produto",
      type: "Tempo integral",
      location: "Presencial (SC)",
      description:
        "Crie experiências incríveis para nossos usuários com foco em usabilidade e design thinking.",
    },
    {
      title: "Especialista em Vendas",
      type: "Tempo integral",
      location: "Presencial (SC)",
      description:
        "Ajude nossos clientes a extrair o máximo da plataforma e transforme feedback em melhorias.",
    },
  ];

  return (
    <>
      <Header></Header>
      <div className="bg-background text-foreground">
        {/* Hero Section */}
        <motion.section
          className="relative mb-10 min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                <Zap className="w-4 h-4 mr-2" /> Estamos contratando
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight mb-6"
              variants={item}
            >
              Transforme a <span className="text-primary">gastronomia</span>{" "}
              conosco
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              variants={item}
            >
              Junte-se ao time que está revolucionando a gestão de restaurantes
              no Brasil
            </motion.p>

            <motion.div variants={item}>
              <a href="#vagas">
                <Button size={"lg"}>
                  Ver oportunidades <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Cultura */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.div variants={item}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nossa Cultura
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Na Tyra, acreditamos que pessoas felizes criam produtos
                incríveis. Cultivamos um ambiente onde:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>A autonomia e a responsabilidade andam juntas</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>A aprendizagem contínua é incentivada</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>As melhores ideias podem vir de qualquer pessoa</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="relative h-80 rounded-xl overflow-hidden shadow-lg"
              variants={item}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background" />
              <img
                src="/careers/team-culture.jpg"
                alt="Equipe da Tyra trabalhando"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Benefícios */}
        <section className="bg-gradient-to-b from-background to-primary/10 py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Nossos Benefícios
            </motion.h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:border-primary transition h-full">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit}</CardTitle>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vagas */}
        <section id="vagas" className="container min-w-full py-20 bg-gradient-to-t from-background to-primary/10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Vagas Abertas
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:border-primary transition hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>{position.title}</CardTitle>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm text-muted-foreground">
                        {position.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {position.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{position.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`https://wa.me/5549991042777/?text=Olá, gostaria de mais informações sobre a vaga ${position.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="w-full"
                      target="_blank"
                    >
                      <Button variant="outline" className="w-full">
                        Detalhes da vaga
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Não encontrou a vaga ideal? Envie seu currículo mesmo assim!
            </p>
            <Link
              href="https://wa.me/5549991042777/?text=Oi%2C%20gostaria%20de%20enviar%20meu%20curriculo!"
              target="_blank"
            >
              <Button variant="outline">Enviar currículo</Button>
            </Link>
          </motion.div>
        </section>

        {/* CTA Final */}
        <section className=" py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Pronto para fazer parte do time?
            </motion.h2>
            <motion.p
              className="text-md  max-w-2md mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Estamos ansiosos para conhecer você e seu potencial.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a href="#vagas">
                <Button size={"lg"}>Candidatar-se agora</Button>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
}

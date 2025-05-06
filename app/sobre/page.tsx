/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function AboutPage() {
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

  const teamMembers = [
    {
      name: "Rafael Costa",
      role: "CEO & Fundador",
      bio: "Especialista em tecnologia para food service com 10+ anos de experiência.",
      img: "/team/rafael.jpg",
    },
    {
      name: "Juliana Santos",
      role: "CTO",
      bio: "Engenheira de software com expertise em sistemas de gestão empresarial.",
      img: "/team/juliana.jpg",
    },
    {
      name: "Carlos Mendes",
      role: "Head de Produto",
      bio: "Ex-gestor de restaurantes, traz a visão do usuário para nosso produto.",
      img: "/team/carlos.jpg",
    },
  ];

  const milestones = [
    { year: "2019", event: "Fundação da Tyra" },
    { year: "2020", event: "Primeiro cliente" },
    { year: "2021", event: "Lançamento da plataforma completa" },
    { year: "2022", event: "Expansão para 5 estados" },
    { year: "2023", event: "+100 restaurantes atendidos" },
  ];

  return (
    <>
      <Header></Header>
      <div className="bg-background text-foreground">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {/* Background com imagem semi-opaca */}
          <div className="absolute inset-0 z-0">
            <img
              src="/about/hero-background.jpg"
              alt="Restaurante moderno"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Conteúdo centralizado */}
          <div className="container relative z-10 px-4 text-center">
            <motion.div className="inline-block mb-8" variants={item}>
              <div className="w-20 h-1 bg-primary mx-auto mb-4" />
              <span className="text-sm font-semibold tracking-widest text-primary">
                SOBRE NÓS
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto leading-tight mb-6 text-white"
              variants={item}
            >
              Revolucionando a <span className="text-primary">gestão</span>{" "}
              gastronômica
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
              variants={item}
            >
              Combinamos tecnologia de ponta com experiência real em
              restaurantes para criar soluções que realmente funcionam
            </motion.p>

            <motion.div variants={item}>
              <Link href="#nossa-historia">
                <Button>
                  Conheça nossa jornada
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Elemento decorativo */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </motion.div>
        </motion.section>

        {/* Nossa História */}
        <motion.section
          className="container mx-auto px-4 py-16"
          initial="hidden"
          id="nossa-historia"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={item}
          >
            <div>
              <h2 className="text-xl md:text-4xl font-bold mb-6">
                Nossa História
              </h2>
              <p className=" text-muted-foreground mb-6">
                Fundada em 2019 por um ex-gestor de restaurantes frustrado com
                as soluções disponíveis no mercado, a Tyra nasceu da necessidade
                de unir simplicidade e poder em uma única plataforma.
              </p>
              <p className=" text-muted-foreground mb-8">
                Hoje, atendemos mais de 100 estabelecimentos em todo o Brasil,
                ajudando empresários a focarem no que realmente importa: a
                experiência gastronômica.
              </p>
              <Link href="/contato">
                <Button>
                  Fale conosco <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background" />
              <img
                src="/about/restaurant-team.jpg"
                alt="Equipe da Tyra em um restaurante"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Linha do Tempo */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Nossa Jornada
            </motion.h2>

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-1/2 w-1 h-full bg-primary/20 -translate-x-1/2" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`w-5/12 p-6 rounded-lg ${
                        index % 2 === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border"
                      }`}
                    >
                      <h3 className="font-bold text-lg">{milestone.year}</h3>
                      <p>{milestone.event}</p>
                    </div>
                    <div
                      className={`absolute top-1/2 w-4 h-4 rounded-full ${
                        index % 2 === 0 ? "right-[41.6667%]" : "left-[41.6667%]"
                      } bg-primary -translate-y-1/2`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="container mx-auto px-4 py-20">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Conheça o Time
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:border-primary transition h-full">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-center">{member.name}</CardTitle>
                    <CardDescription className="text-center text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Valores */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Nossos Valores
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:border-primary transition h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-center">Simplicidade</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Acreditamos que tecnologia deve resolver problemas, não
                      criá-los.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="hover:border-primary transition h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-center">Segurança</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>Protegemos seus dados como se fossem nossos.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="hover:border-primary transition h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-center">Parceria</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Seu sucesso é nosso sucesso. Estamos juntos nessa jornada.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar seu restaurante?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Converse com nosso time e descubra como a Tyra pode ajudar seu
              negócio.
            </p>
            <Link href="/contato">
              <Button>
                Agendar demonstração <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
}

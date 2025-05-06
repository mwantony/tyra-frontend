import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const AnimatedLeadSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="relative mb-10 px-4 min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight"
        variants={itemVariants}
      >
        Revolucione a gestão do seu{" "}
        <span className="relative inline-block text-white z-10">
          <span
            className="absolute inset-0 -z-10 bg-red-500 mt-1 opacity-70 rounded-sm"
            style={{
              animation: "drawBackground 1s ease-out forwards",
              animationDelay: "0.3s",
              transformOrigin: "left center",
            }}
          ></span>
          restaurante
        </span>
      </motion.h1>

      <motion.p
        className="text-md md:text-md text-muted-foreground max-w-2xl mx-auto mt-6"
        variants={itemVariants}
      >
        Tyra oferece todas as ferramentas que você precisa para gerenciar seu
        restaurante de forma eficiente e aumentar seus lucros.
      </motion.p>

      <motion.div
        className="mt-10 min-w-full md:min-w-auto flex flex-col sm:flex-row justify-center gap-4"
        variants={itemVariants}
      >
        <Link href={"/signup"}>
          <Button className="w-full" size={"lg"}>
            Começar agora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button size={"lg"} variant="outline">
          Ver demonstração
        </Button>
      </motion.div>
    </motion.section>
  );
};

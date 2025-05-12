/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    title: "Transformou nosso negócio!",
    name: "João Silva",
    company: "Restaurante da Praça",
    message:
      "A Tyra nos ajudou a reduzir custos em 30% e aumentar nossa eficiência operacional significativamente.",
    img_url:
      "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg",
  },
  {
    title: "A melhor decisão que tomamos",
    name: "Maria Oliveira",
    company: "Cantina da Maria",
    message:
      "Com a Tyra, digitalizamos todo o atendimento e o feedback dos clientes melhorou muito!",
    img_url:
      "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg",
  },
  {
    title: "Aumentou nossa eficiência",
    name: "Carlos Souza",
    company: "Bistrô do Centro",
    message:
      "Muito mais controle e organização. Estamos economizando tempo todos os dias.",
    img_url:
      "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function AnimatedTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="container mx-auto px-4 py-20 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          O que nossos clientes dizem
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          Restaurantes que transformaram seus negócios com a Tyra
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <Card className="hover:border-primary transition">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  &quot;{item.message}&quot;
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center">
                <img
                  src={item.img_url}
                  alt="Foto de Perfil"
                  className="w-10 h-10 rounded-full bg-muted mr-3"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.company}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

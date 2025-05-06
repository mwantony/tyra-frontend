// PricingSection.tsx
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 1,
      ease: "easeOut"
    }
  })
};

export default function AnimatedPricingSection() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-20 md:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">Planos que se adaptam ao seu negócio</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          Escolha o plano ideal para o tamanho do seu restaurante. Sem surpresas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Básico",
            price: "GRÁTIS",
            description: "Ideal para pequenos estabelecimentos",
            features: [
              "Até 5 comandas",
              "Suporte 24/7",
              "Até 5 mesas",
              "Suporte por e-mail"
            ],
            href: "/signup"
          },
          {
            title: "Intermediário",
            price: "R$49,90",
            popular: true,
            description: "Perfeito para restaurantes médios",
            features: [
              "Até 15 comandas",
              "Suporte 24/7",
              "Até 15 mesas",
              "Relatório de Desempenho",
              "Cardápio Digital"
            ],
            href: "/signup"
          },
          {
            title: "Premium",
            price: "R$120,90",
            description: "Solução completa para grandes restaurantes",
            features: [
              "Comandas ilimitadas",
              "Todos os recursos avançados",
              "Relatórios personalizados",
              "Recebimento de pagamentos",
              "Suporte 24/7",
              "Cardápio Digital"
            ],
            href: "/signup"
          }
        ].map((plan, i) => (
          <motion.div
            key={plan.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className={`relative transition hover:border-primary ${plan.popular ? "border-2 border-primary" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg">
                  MAIS POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <div className="flex items-end mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "GRÁTIS" && (
                    <span className="text-muted-foreground ml-1">/mês</span>
                  )}
                </div>
                <CardDescription className="mt-4">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link className="w-full" href={plan.href}>
                  <Button className="w-full">Assinar agora</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
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
  );
}

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const Faq = () => {
  return (
    <section id="faq" className="container min-w-full px-4 py-20 md:py-32 bg-gradient-to-t from-primary/10 to-background">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">Perguntas frequentes</h2>
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
            question: "Há limite de comandas?",
            answer:
              "Nosso plano Básico permite até 5 comandas, o Intermediário até 30 e o Premium é ilimitado.",
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
  );
};

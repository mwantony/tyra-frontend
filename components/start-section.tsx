import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const StartSection = () => {
  return (
    <section className=" py-20 bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para transformar seu restaurante?
        </h2>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto mb-8">
          Experimente gratuitamente por 30 dias. Sem necessidade de cartão de
          crédito.
        </p>
        <Link href={"/signup"}>
          <Button size="lg">
            Começar agora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

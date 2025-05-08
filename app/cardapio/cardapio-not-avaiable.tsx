import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Headphones, Lock, MessageCircle, Rocket } from "lucide-react";
import Link from "next/link";

export const CardapioNotAvailable = () => {
  return (
    <div className="min-h-150 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <Lock className="h-6 w-6" />
            Cardápio Digital (Premium)
          </CardTitle>
          <CardDescription className="text-center">
            Este recurso completo está disponível apenas no plano Premium
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 ">
              <h3 className="font-bold text-lg flex items-center gap-2  mb-4">
                <Rocket className="h-5 w-5" />
                Benefícios do Premium
              </h3>
              <ul className="space-y-3 ">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-circle mt-0.5 "
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span className="text-sm">
                    QR Code personalizado com seu logo
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-circle mt-0.5 "
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span className="text-sm">Cardápio digital responsivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-circle mt-0.5 "
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span className="text-sm">Atualizações em tempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-circle mt-0.5 "
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span className="text-sm">Estatísticas de acesso</span>
                </li>
              </ul>
              <Link href={"/planos"}>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                    <Rocket className="h-4 w-4 mr-2" />
                    Atualizar Plano
                  </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 p-4  rounded-lg">
            <div className="flex items-center gap-3">
              <Headphones className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium">Precisa de ajuda?</h4>
                <p className="text-sm text-muted-foreground">
                  Fale com nosso time de suporte
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/5549991402777?text=Olá, gostaria de saber mais sobre os planos Tyra"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contatar Suporte
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

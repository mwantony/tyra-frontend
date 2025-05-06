import { useAuth } from "@/contexts/auth-provider";
import Image from "next/image";
import logoDark from "@/assets/img/logo-dark.png";
import logoWhite from "@/assets/img/logo-white.png";
import Link from "next/link";
import { ThemeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
export const Header = () => {
  const { theme } = useAuth();
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {theme === "light" ? (
          <Image
            alt="Logo Dark"
            src={logoDark}
            height={100}
            width={100}
          ></Image>
        ) : (
          <Image
            alt="Logo White"
            src={logoWhite}
            height={100}
            width={100}
          ></Image>
        )}
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary transition"
          >
            Recursos
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition"
          >
            Planos
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium hover:text-primary transition"
          >
            Depoimentos
          </a>
          <a
            href="#faq"
            className="text-sm font-medium hover:text-primary transition"
          >
            FAQ
          </a>
        </nav>

        <ThemeToggle />

        <Link href={"/login"}>
          <Button variant="outline">Entrar</Button>
        </Link>
      </div>
    </header>
  );
};

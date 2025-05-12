/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import logoDark from "@/assets/img/logo-dark.png";
import logoWhite from "@/assets/img/logo-white.png";
import Link from "next/link";
import { ThemeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { useTheme } from "@/contexts/theme-provider";
export const Header = () => {
  const { theme } = useTheme();
  return (
    <header
      style={{
        position: "absolute",
        zIndex: 10,
        width: "100%", // ocupa toda a largura
        left: 0, // garante que começa no canto esquerdo
        right: 0, // garante que termina no canto direito
      }}
      className="bg-danger py-6 px-4 flex justify-between items-center"
    >
      <div className="flex items-center space-x-2">
        {theme === "light" ? (
          <a href={"/"}>
            <Image
              alt="Logo Dark"
              src={logoDark}
              className="w-[100px]"
              quality={100}
              priority
              unoptimized={false}
            ></Image>
          </a>
        ) : (
          <a href={"/"}>
            <Image
              alt="Logo White"
              src={logoWhite}
              className="w-[100px]"
              quality={100}
              priority
              unoptimized={false}
            ></Image>
          </a>
        )}
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex space-x-8">
          <a
            href="/#pricing"
            className="text-sm font-medium hover:text-primary transition"
          >
            Planos
          </a>
          <a
            href="/#testimonials"
            className="text-sm font-medium hover:text-primary transition"
          >
            Depoimentos
          </a>
          <a
            href="/#faq"
            className="text-sm font-medium hover:text-primary transition"
          >
            FAQ
          </a>
          <a
            href="/sobre"
            className="text-sm font-medium hover:text-primary transition"
          >
            Sobre
          </a>
        </nav>

        <ThemeToggle />

        <Link href={"/login"}>
          <Button variant="outline" className="bg-transparent border-gray-300">
            Entrar
          </Button>
        </Link>
      </div>
    </header>
  );
};

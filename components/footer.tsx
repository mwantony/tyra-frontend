/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import logoDark from "@/assets/img/logo-dark.png";
import logoWhite from "@/assets/img/logo-white.png";
import { useTheme } from "@/contexts/theme-provider";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="container mx-auto px-4 py-16 border-t border-border text-sm">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
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
          <p className="text-muted-foreground">Soluções para Restaurantes </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Produto</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/#features" className="hover:text-foreground transition">
                Recursos
              </a>
            </li>
            <li>
              <a href="/#pricing" className="hover:text-foreground transition">
                Planos
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Empresa</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/sobre" className="hover:text-foreground transition">
                Sobre nós
              </a>
            </li>
            <li>
              <a href="/carreiras" className="hover:text-foreground transition">
                Carreiras
              </a>
            </li>
            <li>
              <a
                href="https://blog.tyra.com.br"
                target="_blank"
                className="hover:text-foreground transition"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/55${process.env.NEXT_PUBLIC_WHATSAPP}`}
                target="_blank"
                className="hover:text-foreground transition"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/privacidade"
                className="hover:text-foreground transition"
              >
                Privacidade
              </a>
            </li>
            <li>
              <a href="/termos" className="hover:text-foreground transition">
                Termos
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        © {new Date().getFullYear()} Tyra - Soluções para Restaurantes<br></br>
        CNPJ: 00.000.000/0000-00 | Todos os direitos reservados{" "}
      </div>
    </footer>
  );
};

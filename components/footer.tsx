/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import logoDark from "@/assets/img/logo-dark.png";
import logoWhite from "@/assets/img/logo-white.png";
import { useTheme } from "@/contexts/theme-provider";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="container mx-auto px-4 py-16 border-t border-border">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            {theme === "light" ? (
              <a href={"/"}>
                <Image
                  alt="Logo Dark"
                  src={logoDark}
                  height={100}
                  width={100}
                ></Image>
              </a>
            ) : (
              <a href={"/"}>
                <Image
                  alt="Logo White"
                  src={logoWhite}
                  height={100}
                  width={100}
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
            <li>
              <a href="#" className="hover:text-foreground transition">
                Integrações
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition">
                Atualizações
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
              <a href="#" className="hover:text-foreground transition">
                Carreiras
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition">
                Contato
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
      <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Tyra. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

"use client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Link from "next/link";

export default function Termos() {
  return (
    <>
      <Header></Header>
      <div className="container mx-auto px-4 py-16 text-sm max-w-5xl">
        <header className="mb-12 text-center mt-10">
          <h1 className="text-lg font-bold mb-4">
            Termos de Serviço
          </h1>
          <p className=" text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </header>

        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert mx-auto">
          <section className="mb-12">
            <h2 className="font-bold mb-4">1. Introdução</h2>
            <p>
              A Tyra (&quot;nós&quot;, &quot;nosso&quot; ou &quot;a
              empresa&quot;) valoriza sua privacidade. Esta Política de
              Privacidade explica como coletamos, usamos, compartilhamos e
              protegemos suas informações quando você utiliza nosso aplicativo
              de gestão para restaurantes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">
              2. Informações que Coletamos
            </h2>
            <h3 className="font-semibold mb-2">
              2.1 Dados fornecidos por você
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Informações de cadastro (nome, e-mail, telefone)</li>
              <li>Dados do estabelecimento (CNPJ, endereço, razão social)</li>
              <li>
                Informações de pagamento (processadas por gateways seguros)
              </li>
              <li>
                Conteúdo que você insere no sistema (cardápios, produtos, etc.)
              </li>
            </ul>

            <h3 className="font-semibold mb-2">
              2.2 Dados coletados automaticamente
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dados de uso (logs de acesso, interações com o sistema)</li>
              <li>
                Informações técnicas (tipo de dispositivo, versão do sistema
                operacional)
              </li>
              <li>
                Cookies e tecnologias similares (para melhorar a experiência)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">
              3. Como Usamos Suas Informações
            </h2>
            <p className="mb-4">Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer e manter nosso serviço</li>
              <li>Melhorar e personalizar sua experiência</li>
              <li>Processar transações e emitir notas fiscais</li>
              <li>Comunicar atualizações e novidades</li>
              <li>Garantir a segurança do sistema</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">
              4. Compartilhamento de Dados
            </h2>
            <p className="mb-4">Podemos compartilhar informações com:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Processadores de pagamento (ex: Stripe, Pagar.me)</li>
              <li>
                Prestadores de serviços técnicos (hospedagem, infraestrutura)
              </li>
              <li>Autoridades governamentais (quando exigido por lei)</li>
            </ul>
            <p>
              Não vendemos seus dados pessoais a terceiros. Compartilhamos
              apenas o necessário para operação do serviço, com contratos de
              proteção de dados.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas técnicas e organizacionais robustas,
              incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Criptografia de dados em trânsito (SSL/TLS) e em repouso</li>
              <li>Controle de acesso baseado em funções</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">6. Seus Direitos</h2>
            <p className="mb-4">Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir informações incompletas ou desatualizadas</li>
              <li>Solicitar a exclusão de dados desnecessários</li>
              <li>Revogar consentimentos</li>
              <li>Obter informações sobre compartilhamento</li>
            </ul>
            <p>
              Para exercer esses direitos, entre em contato através do e-mail:{" "}
              <Link
                href="mailto:privacidade@tyra.com.br"
                className="text-primary hover:underline"
              >
                privacidade@tyra.com.br
              </Link>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">7. Retenção de Dados</h2>
            <p>
              Mantemos seus dados apenas enquanto necessário para os fins
              descritos ou conforme exigido por leis aplicáveis. Dados
              financeiros são mantidos por 5 anos conforme obrigação fiscal.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">
              8. Alterações nesta Política
            </h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos
              sobre mudanças significativas através do e-mail cadastrado ou por
              notificação no aplicativo. O uso continuado após alterações
              constitui aceitação da nova versão.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-bold mb-4">9. Contato</h2>
            <p className="mb-2">
              Dúvidas sobre esta política podem ser direcionadas a:
            </p>
            <p>
              <strong>Tyra Soluções para Restaurantes LTDA</strong>
              <br />
              CNPJ: XX.XXX.XXX/0001-XX
              <br />
              E-mail:{" "}
              <Link
                href="mailto:privacidade@tyra.com.br"
                className="text-primary hover:underline"
              >
                privacidade@tyra.com.br
              </Link>
            </p>
          </section>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-provider";
import Link from "next/link";

import { toast } from "sonner";
import { formatCNPJ, unformatCNPJ } from "@/utils/cnpjUtils";
import { formatPhoneNumber } from "@/utils/phoneUtils";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "./ui/checkbox";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState(1);
  const [cnpj, setCnpj] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [whatsapp, setWhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingCnpj, setFetchingCnpj] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const { signup } = useAuth();

  // Password validation states
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // Handler para mudanças no input de CNPJ
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setCnpj(formatted);
  };

  // Validate password and confirmation
  useEffect(() => {
    if (password && passwordConfirmation) {
      setPasswordsMatch(password === passwordConfirmation);
    }
    setPasswordValid(password.length >= 6 || password.length === 0);
  }, [password, passwordConfirmation]);

  // Busca dados do CNPJ quando ele é totalmente digitado (14 caracteres)
  useEffect(() => {
    const cleanedCnpj = cnpj.replace(/\D/g, "");
    if (cleanedCnpj.length === 14) {
      fetchCompanyData(cleanedCnpj);
    }
  }, [cnpj]);

  // Função para buscar dados da empresa
  const fetchCompanyData = async (cnpj: string) => {
    setFetchingCnpj(true);
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
      );

      if (!response.ok) {
        throw new Error("CNPJ não encontrado ou erro na API");
      }

      const data = await response.json();
      setNomeFantasia(data.fantasia || data.razao_social || "");
      setRazaoSocial(data.razao_social || "");
      setEmail(data.email || "");
    } catch (error: any) {
      toast.error(
        "Não foi possível buscar os dados do CNPJ. Preencha manualmente."
      );
      console.error("Erro ao buscar CNPJ:", error);
    } finally {
      setFetchingCnpj(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submit
    if (!acceptTerms || !acceptPrivacy) {
      toast.error("Você deve aceitar os termos e políticas para continuar");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      await signup({
        cnpj: cnpj.replace(/\D/g, ""),
        nome_fantasia: nomeFantasia,
        razao_social: razaoSocial,
        email,
        whatsapp,
        password,
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [direction, setDirection] = useState<'up' | 'down'>('up');

  const handleNext = () => {
    setDirection('up');
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection('down');
    setStep((prev) => prev - 1);
  };

  const renderStep = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          custom={direction}
          initial={{
            opacity: 0,
            y: direction === "up" ? 20 : -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: direction === "up" ? -20 : 20,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col gap-6 w-full"
        >
          {(() => {
            switch (step) {
              case 1:
                return (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="grid gap-1"
                    >
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        required
                        value={cnpj}
                        onChange={handleCnpjChange}
                        disabled={fetchingCnpj}
                        maxLength={18}
                      />
                      {fetchingCnpj && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-muted-foreground"
                        >
                          Buscando dados do CNPJ...
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="grid gap-1"
                    >
                      <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                      <Input
                        id="nomeFantasia"
                        placeholder="Digite o nome fantasia"
                        required
                        value={nomeFantasia}
                        onChange={(e) => setNomeFantasia(e.target.value)}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="grid gap-1"
                    >
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        placeholder="Digite a razão social"
                        required
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                      />
                    </motion.div>
                  </>
                );

              case 2:
                return (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="grid gap-1"
                    >
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        type="text"
                        placeholder="(00) 00000-0000"
                        required
                        maxLength={15}
                        value={whatsapp}
                        onChange={(e) =>
                          setWhatsApp(formatPhoneNumber(e.target.value))
                        }
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="grid gap-1"
                    >
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </motion.div>
                  </>
                );

              case 3:
                return (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="grid gap-1"
                    >
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        placeholder="Digite sua senha (mínimo 6 caracteres)"
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={!passwordValid ? "border-destructive" : ""}
                      />
                      {!passwordValid && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-destructive"
                        >
                          A senha deve ter pelo menos 6 caracteres
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="grid gap-1"
                    >
                      <Label htmlFor="passwordConfirmation">
                        Confirme a Senha
                      </Label>
                      <Input
                        id="passwordConfirmation"
                        placeholder="Confirme sua senha"
                        type="password"
                        required
                        minLength={6}
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        className={!passwordsMatch ? "border-destructive" : ""}
                      />
                      {!passwordsMatch && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-destructive"
                        >
                          As senhas não coincidem
                        </motion.p>
                      )}
                    </motion.div>
                  </>
                );

              case 4:
                return (
                  <div className="space-y-4 min-h-30 flex flex-col justify-end">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Eu li e aceito os{" "}
                        <Link href="/termos" className="underline underline-offset-4 hover:text-primary">
                          Termos de Uso
                        </Link>
                      </label>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id="privacy"
                        checked={acceptPrivacy}
                        onCheckedChange={(checked) => setAcceptPrivacy(!!checked)}
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Eu li e aceito a{" "}
                        <Link href="/privacidade" className="underline underline-offset-4 hover:text-primary">
                          Política de Privacidade
                        </Link>
                      </label>
                    </motion.div>
                  </div>
                );

              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Crie sua conta</h1>
                  <p className="text-balance text-muted-foreground">
                    {step === 1 && "Informações da empresa"}
                    {step === 2 && "Dados de contato"}
                    {step === 3 && "Dados de acesso"}
                    {step === 4 && "Termos e Políticas"}
                  </p>
                </div>

                {renderStep()}

                <div className="flex flex-col gap-4 justify-between">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleBack}
                      className="w-full"
                    >
                      Voltar
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className={`w-full ${step === 1 ? "md:ml-auto" : ""}`}
                      disabled={
                        (step === 1 &&
                          (!cnpj ||
                            !nomeFantasia ||
                            !razaoSocial ||
                            fetchingCnpj ||
                            unformatCNPJ(cnpj).length < 14)) ||
                        (step === 2 && (!whatsapp || !email)) ||
                        (step === 3 && 
                          (!password || 
                           !passwordConfirmation || 
                           !passwordsMatch || 
                           !passwordValid))
                      }
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={
                        loading ||
                        !acceptTerms ||
                        !acceptPrivacy
                      }
                    >
                      {loading ? "Cadastrando..." : "Finalizar Cadastro"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-balance text-center text-sm"
      >
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Faça login
        </Link>
      </motion.div>
    </div>
  );
}
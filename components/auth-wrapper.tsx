"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/auth-provider";
import CustomLayout from "@/components/custom-layout";
import LoginPage from "@/app/login/page";
import SignUpPage from "@/app/signup/page";
import { Spinner } from "./ui/spinner";
import { usePathname, useRouter } from "next/navigation";

function ProtectedApp({ children }: { children: ReactNode }) {
  const { restaurante, refreshRestaurante } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Verificação inicial e quando o restaurante muda
    if (restaurante === null) {
      // Se não há restaurante, redireciona para login (exceto para /signup)
      if (pathname !== "/signup") {
        router.push("/login");
      }
    } else if (restaurante && !restaurante.nome_fantasia && pathname !== "/signup") {
      // Se tem restaurante mas não tem nome_fantasia, redireciona para signup
      router.push("/signup");
    }
    
    setIsAuthChecked(true);
  }, [restaurante, pathname, router]);

  useEffect(() => {
    // Atualiza o restaurante sempre que a rota mudar
    refreshRestaurante();
  }, [pathname, refreshRestaurante]);

  if (!isAuthChecked) {
    return <Spinner />;
  }

  if (pathname === "/signup") {
    return <SignUpPage />;
  } else if (pathname === "/login") {
    return <LoginPage />;
  } else if (restaurante?.nome_fantasia) {
    return <CustomLayout>{children}</CustomLayout>;
  } else {
    return <Spinner />;
  }
}

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedApp>{children}</ProtectedApp>
    </AuthProvider>
  );
}
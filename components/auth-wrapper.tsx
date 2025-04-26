"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/auth-provider";
import CustomLayout from "@/components/custom-layout";
import LoginPage from "@/app/login/page";
import SignUpPage from "@/app/signup/page";
import { Spinner } from "./ui/spinner";
import { usePathname, useRouter } from "next/navigation";

function ProtectedApp({ children }: { children: ReactNode }) {
  const { restaurante, loading, refreshRestaurante } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (restaurante?.id) {
      refreshRestaurante();
    }
    if (loading) return;

    setIsAuthChecked(true);
    if (restaurante === null) return;

    if (!restaurante?.nome_fantasia && pathname !== "/signup") {
      router.push("/login");
    }

  }, [loading, restaurante, pathname, router]);

  
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

  // Enquanto o redirecionamento acontece, pode exibir um Spinner
}

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedApp>{children}</ProtectedApp>
    </AuthProvider>
  );
}

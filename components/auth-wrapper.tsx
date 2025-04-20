// components/auth-wrapper.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/auth-provider";
import CustomLayout from "@/components/custom-layout";
import LoginPage from "@/app/login/page";
import { Spinner } from "./ui/spinner";

function ProtectedApp({ children }: { children: ReactNode }) {
  const { restaurante, loading } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthChecked(true);
    }
  }, [loading]);

  if (!isAuthChecked) {
    return <Spinner></Spinner>;
  }

  if (restaurante?.nome_fantasia) {
    return <CustomLayout>{children}</CustomLayout>;
  } else {
    return <LoginPage />;
  }
}

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedApp>{children}</ProtectedApp>
    </AuthProvider>
  );
}

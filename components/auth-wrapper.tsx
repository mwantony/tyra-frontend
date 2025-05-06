"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/auth-provider";
import CustomLayout from "@/components/custom-layout";
import LoginPage from "@/app/login/page";
import SignUpPage from "@/app/signup/page";
import { Spinner } from "./ui/spinner";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/store";
import LandingPage from "@/app/page";
import PrivacyPolicy from "@/app/privacidade/page";
import Termos from "@/app/termos/page";
import AboutPage from "@/app/sobre/page";
function ProtectedApp({ children }: { children: ReactNode }) {
  const { restaurante, loading, refreshRestaurante } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (restaurante?.id && count === 0) {
      setCount(1);
      refreshRestaurante();
    }
    if (loading) return;

    setIsAuthChecked(true);
    if (restaurante === null) return;

    if (
      !restaurante?.nome_fantasia &&
      pathname !== "/signup" &&
      pathname !== "/" &&
      pathname !== "/privacidade" &&
      pathname !== "/termos" &&
      pathname !== "/sobre"
    ) {
      router.push("/login");
    }
  }, [loading, restaurante, pathname, router, refreshRestaurante, count]);

  if (!isAuthChecked) {
    return <Spinner />;
  }

  if (pathname === "/signup") {
    return <SignUpPage />;
  } else if (pathname === "/login") {
    return <LoginPage />;
  } else if (pathname === "/") {
    return <LandingPage />;
  } else if (pathname === "/privacidade") {
    return <PrivacyPolicy />;
  } else if (pathname === "/termos") {
    return <Termos />;
  } else if (pathname === "/sobre") {
    return <AboutPage />;
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
      <Provider store={store}>
        <ProtectedApp>{children}</ProtectedApp>
      </Provider>
    </AuthProvider>
  );
}

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
import CareersPage from "@/app/carreiras/page";

const PUBLIC_ROUTES = [
  { path: "/", component: LandingPage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignUpPage },
  { path: "/privacidade", component: PrivacyPolicy },
  { path: "/termos", component: Termos },
  { path: "/sobre", component: AboutPage },
  { path: "/carreiras", component: CareersPage },
];

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

    const isPublicRoute = PUBLIC_ROUTES.some(route => route.path === pathname);
    if (
      !restaurante?.nome_fantasia && 
      !isPublicRoute
    ) {
      router.push("/login");
    }
  }, [loading, restaurante, pathname, router, refreshRestaurante, count]);

  if (!isAuthChecked) {
    return <Spinner />;
  }

  const publicRoute = PUBLIC_ROUTES.find(route => route.path === pathname);
  if (publicRoute) {
    const PublicComponent = publicRoute.component;
    return <PublicComponent />;
  }

  if (restaurante?.nome_fantasia) {
    return <CustomLayout>{children}</CustomLayout>;
  }

  return <Spinner />;
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
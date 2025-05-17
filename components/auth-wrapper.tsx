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

// Define public routes configuration
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

    // Check if current route is not public and user hasn't completed profile
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

  // Check for public routes first
  const publicRoute = PUBLIC_ROUTES.find(route => route.path === pathname);
  if (publicRoute) {
    const PublicComponent = publicRoute.component;
    return <PublicComponent />;
  }

  // Protected routes
  if (restaurante?.nome_fantasia) {
    return <CustomLayout>{children}</CustomLayout>;
  }

  // Fallback spinner while redirecting
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
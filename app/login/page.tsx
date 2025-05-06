"use client";
import { LoginForm } from "@/components/login-form";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/auth-provider";

export default function LoginPage() {
  const { restaurante } = useAuth();
  if (restaurante?.id) {
    window.location.href = "/dashboard";
    return <Spinner></Spinner>
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}

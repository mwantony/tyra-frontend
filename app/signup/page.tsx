"use client";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="min-w-full w-full md:min-w-auto max-w-sm md:max-w-3xl">
        <SignUpForm />
      </div>
    </div>
  );
}

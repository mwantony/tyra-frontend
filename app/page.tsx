/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/auth-provider";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { TrustedBySection } from "@/components/trusted-by-section";
import { AnimatedFeaturesSection } from "@/components/animated-feature-section";
import { AnimatedLeadSection } from "@/components/animated-lead-section";
import AnimatedPricingSection from "@/components/animated-pricing-section";
import { AnimatedTestimonialsSection } from "@/components/animated-testimonials.section";
import { Header } from "@/components/header";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

// Configurações de animação

export default function LandingPage() {
  const { restaurante } = useAuth();
  useEffect(() => {
    if (restaurante?.id) {
      window.location.href = "/dashboard";
    }
  }, [restaurante]);

  if (!restaurante?.id)
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <Header></Header>

        {/* Hero Section */}
        <AnimatedLeadSection></AnimatedLeadSection>
        {/* Logo Cloud */}
        <TrustedBySection></TrustedBySection>

        {/* Features Section */}
        <AnimatedFeaturesSection></AnimatedFeaturesSection>

        {/* Pricing Section */}
        <AnimatedPricingSection></AnimatedPricingSection>

        {/* Testimonials Section */}
        <AnimatedTestimonialsSection></AnimatedTestimonialsSection>

        {/* FAQ Section */}
        <Faq></Faq>

        {/* CTA Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar seu restaurante?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Experimente gratuitamente por 30 dias. Sem necessidade de cartão
              de crédito.
            </p>
            <Link href={"/signup"}>
              <Button size="lg">
                Começar agora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <Footer></Footer>
      </div>
    );

  return null;
}

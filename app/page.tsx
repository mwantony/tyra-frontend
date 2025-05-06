/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/contexts/auth-provider";

import { useEffect } from "react";

import { TrustedBySection } from "@/components/trusted-by-section";
import { AnimatedFeaturesSection } from "@/components/animated-feature-section";
import { AnimatedLeadSection } from "@/components/animated-lead-section";
import AnimatedPricingSection from "@/components/animated-pricing-section";
import { AnimatedTestimonialsSection } from "@/components/animated-testimonials.section";
import { Header } from "@/components/header";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { StartSection } from "@/components/start-section";

// Configurações de animação

export default function LandingPage() {
  const { restaurante } = useAuth();
  useEffect(() => {
    window.document.title = "Tyra - Soluções para Restaurantes";

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
        <StartSection></StartSection>

        {/* Footer */}
        <Footer></Footer>
      </div>
    );

  return null;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Manrope } from "next/font/google";

import "./globals.css";
import AuthWrapper from "@/components/auth-wrapper"; // <- certifique-se do caminho correto
import { ThemeProvider } from "@/contexts/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
// Exportação de metadata deve estar em um Server Component
/* export const metadata: Metadata = {
  title: "Tyra",
  description: "Soluções para Restaurantes",
};
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

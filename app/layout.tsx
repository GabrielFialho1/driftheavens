import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { NotificationContainer } from "./components/NotificationContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "HeavensDrift - Sistema de Gerenciamento de Drift",
  description: "Plataforma web para gerenciamento de comunidades de drift online. Sistema construído com Next.js para administrar torneios, marketplace de veículos, perfis de usuários e agendamento de eventos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <AuthProvider>
            {children}
            <NotificationContainer />
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
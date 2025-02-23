import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Purrfect-Server",
  description: "The Purr-fect Server Management Solution, provided by bytelabs.rocks",
  icons: [
    { rel: "icon", url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
    { rel: "icon", url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

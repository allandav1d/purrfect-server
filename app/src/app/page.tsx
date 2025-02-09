import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Login | Purrfect Server",
  description: "Faça login para acessar o Purrfect Server",
}

export default function HomePage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="relative hidden h-full items-center bg-black/20 justify-center flex-col p-10 text-white lg:flex dark:border-r dark:border-border/10">
        <div className="absolute inset-0 bg-sidebar-bg/110" />
        <div className="relative z-20 flex items-center justify-center text-lg font-medium mt-auto">
          <Image
            src="/logo/logo-light.svg"
            alt="Purrfect Server"
            width={180}
            height={40}
            className="dark:hidden"
          />
          <Image
            src="/logo/logo-dark.svg"
            alt="Purrfect Server"
            width={180}
            height={40}
            className="hidden dark:block"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "O Purrfect Server é a solução perfeita para gerenciar seus servidores com elegância e simplicidade."
            </p>
            <footer className="text-sm text-white/80">ByteLabs</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email e senha para acessar sua conta
            </p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

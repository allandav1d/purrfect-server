"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email ou senha inválidos")
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Ocorreu um erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Entre com seu email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nome@exemplo.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Sua senha"
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="text-center text-sm text-destructive">{error}</div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

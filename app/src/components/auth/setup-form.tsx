"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/trpc/react"

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
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SetupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const setup = api.setup.initialize.useMutation({
    onSuccess: () => {
      router.refresh()
    },
  })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const image = formData.get("image") as File

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      let imageUrl = null
      if (image.size > 0) {
        // Aqui você implementaria o upload da imagem
        // imageUrl = await uploadImage(image)
      }

      await setup.mutateAsync({
        name,
        email,
        password,
        image: imageUrl,
      })

      router.refresh()
    } catch (error) {
      setError("Ocorreu um erro ao configurar o sistema")
    } finally {
      setIsLoading(false)
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="border-none shadow-none">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Configuração Inicial</CardTitle>
          <CardDescription>
            Configure seu primeiro usuário administrador para começar a usar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <label htmlFor="image" className="cursor-pointer">
              <Avatar className="w-24 h-24">
                <AvatarImage src={imagePreview ?? ""} />
                <AvatarFallback className="bg-primary/10">
                  {imagePreview ? "IMG" : "ADD"}
                </AvatarFallback>
              </Avatar>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome completo"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Crie uma senha forte"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirme a Senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Digite a senha novamente"
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="text-sm text-destructive text-center">{error}</div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Configurando..." : "Configurar Sistema"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
} 
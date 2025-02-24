"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/trpc/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"
import { useEffect } from "react"
import { defaultSettings } from "@/lib/default-settings"
const serverConfigSchema = z.object({
  main_domain: z.string().min(1, {
    message: "O domínio é obrigatório.",
  }),
  server_name: z.string().min(1, {
    message: "O nome do servidor é obrigatório.",
  }),
  timezone: z.string().min(1, {
    message: "O fuso horário é obrigatório.",
  }),
  server_ipv4: z
    .string()
    .min(7, {
      message: "IPv4 inválido.",
    })
    .max(15),
  server_ipv6: z.string().optional(),
})

type ServerConfigForm = z.infer<typeof serverConfigSchema>

export function ConfigurationTab() {
  const utils = api.useUtils()
  const { data: settings } = api.settings.getAll.useQuery()

  const updateSetting = api.settings.bulkUpsert.useMutation({
    onSuccess: () => {
      void utils.settings.getAll.invalidate()
    },
  })

  const form = useForm<ServerConfigForm>({
    resolver: zodResolver(serverConfigSchema),
    defaultValues: {
      main_domain: "",
      server_name: "",
      timezone: "",
      server_ipv4: "",
      server_ipv6: "",
    },
  })

  // Atualiza o formulário quando os settings são carregados
  useEffect(() => {
    if (settings) {
      const values = settings.reduce((acc: any, curr) => {
        acc[curr.key] = curr.value ?? "" // Garante que nunca será undefined
        return acc
      }, {})

      form.reset(values)
    }
  }, [settings, form])

  // 2. Define a função de submit
  async function onSubmit(data: ServerConfigForm) {
    try {
      // Garante que todos os valores são strings e remove espaços em branco
      const settingsToUpdate = Object.entries(data).map(([key, value]) => {
        const stringValue = String(value ?? "").trim()
        console.log(`Preparando setting - Key: ${key}, Value: ${stringValue}`)

        // Busca as informações padrão da configuração
        const defaultSetting = defaultSettings.find((ds) => ds.key === key)

        return {
          key,
          value: stringValue,
          type: "string" as const,
          description: defaultSetting?.description,
          isSystem: defaultSetting?.isSystem,
        }
      })

      console.log("Dados a serem atualizados:", settingsToUpdate)

      const result = await updateSetting.mutateAsync(settingsToUpdate)
      console.log("Resultado da atualização:", result)

      if (result) {
        toast.success("Configurações salvas com sucesso")
        // Força uma atualização dos dados
        await utils.settings.getAll.invalidate()
      } else {
        toast.error("Nenhum dado foi atualizado")
      }
    } catch (error) {
      console.error("Erro detalhado:", error)
      toast.error(
        "Erro ao salvar as configurações: " +
          (error instanceof Error ? error.message : "Erro desconhecido"),
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Servidor</CardTitle>
            <CardDescription>Configurações básicas do servidor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="main_domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domínio Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Domínio principal do servidor
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="server_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Servidor</FormLabel>
                    <FormControl>
                      <Input placeholder="Meu Servidor" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome de identificação do servidor
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuso Horário</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o fuso horário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">
                          América/São Paulo
                        </SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Fuso horário do servidor</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Configurações de Rede</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="server_ipv4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IPv4</FormLabel>
                      <FormControl>
                        <Input placeholder="000.000.000.000" {...field} />
                      </FormControl>
                      <FormDescription>
                        Endereço IPv4 do servidor
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="server_ipv6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IPv6</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0000:0000:0000:0000:0000:0000:0000:0000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Endereço IPv6 do servidor (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {form.formState.isSubmitting
                ? "Salvando..."
                : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações Avançadas</CardTitle>
            <CardDescription>
              Configurações adicionais do servidor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 text-center text-muted-foreground">
              <p>
                Novas configurações estarão disponíveis em atualizações futuras
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}

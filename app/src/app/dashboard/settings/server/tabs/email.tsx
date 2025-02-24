"use client"

import { useState } from "react"
import { api } from "@/trpc/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export function EmailTab() {
  const utils = api.useUtils()
  const { data: settings } = api.settings.getAll.useQuery()

  const updateSetting = api.settings.upsert.useMutation({
    onSuccess: () => {
      void utils.settings.getAll.invalidate()
      toast.success("Configuração atualizada com sucesso")
    },
  })

  const [testEmail, setTestEmail] = useState("")

  const smtpSettings = settings?.filter((s) => s.key.startsWith("smtp_")) ?? []

  const handleTestEmail = async () => {
    toast.info("Enviando email de teste...")
    // Implementar envio de email de teste
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Email</CardTitle>
          <CardDescription>
            Configure o servidor SMTP para envio de emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp_host">Servidor SMTP</Label>
              <Input
                id="smtp_host"
                placeholder="smtp.exemplo.com"
                value={
                  smtpSettings.find((s) => s.key === "smtp_host")?.value ?? ""
                }
                onChange={(e) =>
                  updateSetting.mutate({
                    key: "smtp_host",
                    value: e.target.value,
                    type: "string",
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp_port">Porta</Label>
              <Input
                id="smtp_port"
                type="number"
                placeholder="587"
                value={
                  smtpSettings.find((s) => s.key === "smtp_port")?.value ?? ""
                }
                onChange={(e) =>
                  updateSetting.mutate({
                    key: "smtp_port",
                    value: e.target.value,
                    type: "number",
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp_user">Usuário</Label>
              <Input
                id="smtp_user"
                placeholder="user@exemplo.com"
                value={
                  smtpSettings.find((s) => s.key === "smtp_user")?.value ?? ""
                }
                onChange={(e) =>
                  updateSetting.mutate({
                    key: "smtp_user",
                    value: e.target.value,
                    type: "string",
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp_password">Senha</Label>
              <Input
                id="smtp_password"
                type="password"
                placeholder="••••••••"
                value={
                  smtpSettings.find((s) => s.key === "smtp_password")?.value ?? 
                  ""
                }
                onChange={(e) =>
                  updateSetting.mutate({
                    key: "smtp_password",
                    value: e.target.value,
                    type: "string",
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Input
              placeholder="Email para teste"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <Button onClick={handleTestEmail}>
              <Send className="mr-2 h-4 w-4" />
              Testar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Configure as notificações do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch
              id="notify_domain_status"
              checked={
                settings?.find((s) => s.key === "notify_domain_status")
                  ?.value === "true"
              }
              onCheckedChange={(checked) =>
                updateSetting.mutate({
                  key: "notify_domain_status",
                  value: String(checked),
                  type: "boolean",
                })
              }
            />
            <Label htmlFor="notify_domain_status">
              Notificar mudanças no status dos domínios
            </Label>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="notify_backup_status"
              checked={
                settings?.find((s) => s.key === "notify_backup_status")
                  ?.value === "true"
              }
              onCheckedChange={(checked) =>
                updateSetting.mutate({
                  key: "notify_backup_status",
                  value: String(checked),
                  type: "boolean",
                })
              }
            />
            <Label htmlFor="notify_backup_status">
              Notificar status dos backups
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

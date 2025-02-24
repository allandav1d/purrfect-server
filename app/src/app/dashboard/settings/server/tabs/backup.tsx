"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, Upload } from "lucide-react"

export function BackupTab() {
  const utils = api.useUtils()
  const { data: settings } = api.settings.getAll.useQuery()

  const updateSetting = api.settings.upsert.useMutation({
    onSuccess: () => {
      void utils.settings.getAll.invalidate()
      toast.success("Configuração atualizada com sucesso")
    },
  })

  const handleBackupNow = async () => {
    toast.info("Iniciando backup...")
    // Implementar backup manual
  }

  const handleRestore = async () => {
    toast.info("Iniciando restauração...")
    // Implementar restauração
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Backup</CardTitle>
          <CardDescription>
            Configure os backups automáticos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch
              id="backup_enabled"
              checked={
                settings?.find((s) => s.key === "backup_enabled")?.value ===
                "true"
              }
              onCheckedChange={(checked) =>
                updateSetting.mutate({
                  key: "backup_enabled",
                  value: String(checked),
                  type: "boolean",
                })
              }
            />
            <Label htmlFor="backup_enabled">Ativar backup automático</Label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select
                value={
                  settings?.find((s) => s.key === "backup_frequency")?.value
                }
                onValueChange={(value) =>
                  updateSetting.mutate({
                    key: "backup_frequency",
                    value,
                    type: "string",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Retenção (dias)</Label>
              <Input
                type="number"
                value={
                  settings?.find((s) => s.key === "backup_retention")?.value
                }
                onChange={(e) =>
                  updateSetting.mutate({
                    key: "backup_retention",
                    value: e.target.value,
                    type: "number",
                  })
                }
                min="1"
                max="365"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleBackupNow}>
              <Download className="mr-2 h-4 w-4" />
              Fazer Backup Agora
            </Button>
            <Button variant="outline" onClick={handleRestore}>
              <Upload className="mr-2 h-4 w-4" />
              Restaurar Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

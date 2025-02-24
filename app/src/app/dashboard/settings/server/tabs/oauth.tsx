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
import { Eye, EyeOff } from "lucide-react"

export function OAuthTab() {
  const utils = api.useUtils()
  const { data: settings } = api.settings.getAll.useQuery()
  const [showSecrets, setShowSecrets] = useState(false)

  const updateSetting = api.settings.upsert.useMutation({
    onSuccess: () => {
      void utils.settings.getAll.invalidate()
      toast.success("Configuração atualizada com sucesso")
    },
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>GitHub OAuth</CardTitle>
          <CardDescription>Configure a autenticação via GitHub</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch
              id="oauth_github_enabled"
              checked={
                settings?.find((s) => s.key === "oauth_github_enabled")
                  ?.value === "true"
              }
              onCheckedChange={(checked) =>
                updateSetting.mutate({
                  key: "oauth_github_enabled",
                  value: String(checked),
                  type: "boolean",
                })
              }
            />
            <Label htmlFor="oauth_github_enabled">
              Ativar autenticação via GitHub
            </Label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="github_client_id">Client ID</Label>
              <Input
                id="github_client_id"
                value={
                  settings?.find((s) => s.key === "github_client_id")?.value ??
                  ""
                }
                onChange={(e) =>
                  updateSetting.mutate({
                    key: "github_client_id",
                    value: e.target.value,
                    type: "string",
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github_client_secret">Client Secret</Label>
              <div className="flex gap-2">
                <Input
                  id="github_client_secret"
                  type={showSecrets ? "text" : "password"}
                  value={
                    settings?.find((s) => s.key === "github_client_secret")
                      ?.value ?? ""
                  }
                  onChange={(e) =>
                    updateSetting.mutate({
                      key: "github_client_secret",
                      value: e.target.value,
                      type: "string",
                    })
                  }
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Google OAuth</CardTitle>
          <CardDescription>Configure a autenticação via Google</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch
              id="oauth_google_enabled"
              checked={
                settings?.find((s) => s.key === "oauth_google_enabled")
                  ?.value === "true"
              }
              onCheckedChange={(checked) =>
                updateSetting.mutate({
                  key: "oauth_google_enabled",
                  value: String(checked),
                  type: "boolean",
                })
              }
            />
            <Label htmlFor="oauth_google_enabled">
              Ativar autenticação via Google
            </Label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="google_client_id">Client ID</Label>
              <Input
                id="google_client_id"
                value={
                  settings?.find((s) => s.key === "google_client_id")?.value ??
                  ""
                }
                onChange={(e) =>
                  updateSetting.mutate({
                    key: "google_client_id",
                    value: e.target.value,
                    type: "string",
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google_client_secret">Client Secret</Label>
              <div className="flex gap-2">
                <Input
                  id="google_client_secret"
                  type={showSecrets ? "text" : "password"}
                  value={
                    settings?.find((s) => s.key === "google_client_secret")
                      ?.value ?? ""
                  }
                  onChange={(e) =>
                    updateSetting.mutate({
                      key: "google_client_secret",
                      value: e.target.value,
                      type: "string",
                    })
                  }
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/trpc/react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { mapperPackageColor } from "@/lib/utils"
function formatUptime(uptime: number) {
  const days = Math.floor(uptime / (24 * 3600))
  const hours = Math.floor((uptime % (24 * 3600)) / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)

  return parts.join(" ") ?? "< 1m"
}

export function SystemOverview() {
  const { data, status } =
    api.system.getSystemInfo.subscription.useSubscription({
      interval: 10000, // every 10 seconds
      data: {
        osInfo: "platform, distro, release, uptime",
        chassis: "manufacturer, model, serial, type",
        time: "uptime",
        versions: "*",
      },
    })

  if (status === "connecting") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sistema</CardTitle>
          <CardDescription>
            Informações do sistema e dispositivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4">
            <Skeleton className="h-[120px] w-full" />
            <Separator orientation="vertical" className="mx-2 h-auto" />
            <Skeleton className="h-[120px] w-full" />
            <Separator orientation="vertical" className="mx-2 h-auto" />
            <Skeleton className="h-[120px] w-full" />
          </div>
          <Separator orientation="horizontal" className="my-4 w-full" />
          <div className="flex flex-col">
            <Skeleton className="h-[40px] w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema</CardTitle>
        <CardDescription>Informações do sistema e dispositivo</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <h3 className="mb-2 text-sm font-medium">Sistema Operacional</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sistema</span>
                <span>{data?.osInfo?.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distribuição</span>
                <span>{data?.osInfo?.distro}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Versão</span>
                <span>{data?.osInfo?.release}</span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="mx-4 h-auto" />

          <div className="flex-1">
            <h3 className="mb-2 text-sm font-medium">Dispositivo</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fabricante</span>
                <span>{data?.chassis?.manufacturer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modelo</span>
                <span>{data?.chassis?.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span>{data?.chassis?.type}</span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="mx-4 h-auto" />

          <div className="flex-1">
            <h3 className="mb-2 text-sm font-medium">Status</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tempo Ativo</span>
                <span>{formatUptime(data?.time?.uptime)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <Separator orientation="horizontal" className="my-6 w-auto" />

          <div className="flex-3">
            <h3 className="mb-2 text-sm font-medium">Build-in Versions</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex flex-wrap justify-start gap-2">
                {Object.entries(data?.versions ?? {})
                  ?.filter(([key, value]) => value !== "")
                  ?.map(([key, value]) => (
                    <Badge
                      key={key}
                      style={{
                        backgroundColor:
                          mapperPackageColor[
                            key as keyof typeof mapperPackageColor
                          ].bg,
                        color:
                          mapperPackageColor[
                            key as keyof typeof mapperPackageColor
                          ].font,
                      }}
                      variant="outline"
                    >{`${key}: ${value}`}</Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

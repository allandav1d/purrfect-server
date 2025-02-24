import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatBytes } from "@/lib/utils"
import { api } from "@/trpc/react"
import { Separator } from "@/components/ui/separator"

interface DiskDevice {
  device: string
  name: string
  type: string
  size: number
  vendor: string
  serialNum: string
  interfaceType: string
  smartStatus: string
  partitions: Array<{
    device: string
    fs?: string
    type: string
    size: number
    used?: number
    available?: number
    use?: number
    mount?: string
  }>
}

export function DiskInfo() {
  const { data, status } =
    api.system.getSystemInfo.subscription.useSubscription({
      interval: 10000,
      data: {
        fsSize: "*",
        diskLayout: "*",
        blockDevices: "*",
      },
    })

  const fs = data?.fsSize ?? []
  const disks = data?.diskLayout ?? []
  const blockDevices = data?.blockDevices ?? []

  if (!disks.length) return null

  // Agrupa as partições por dispositivo
  const groupedDisks: DiskDevice[] = disks.map((disk) => {
    // Encontra todas as partições do blockDevices
    const diskPartitions = blockDevices
      .filter((block) =>
        block.name.startsWith(disk.device.replace("/dev/", "")),
      )
      .map((block) => {
        // Procura informações de uso no fsSize
        const fsInfo = fs.find((f) => f.fs === `/dev/${block.name}`)

        return {
          device: `/dev/${block.name}`,
          fs: fsInfo?.fs,
          type: fsInfo?.fs ? fsInfo.type : `${block.type} unmounted`,
          size: block.size,
          used: fsInfo?.used,
          available: fsInfo?.available,
          use: fsInfo?.use,
          mount: fsInfo?.mount ?? block.mount,
        }
      })

    return {
      ...disk,
      partitions: diskPartitions,
    }
  })

  // Ordena as partições dentro de cada disco
  const sortedGroupedDisks = groupedDisks.map((disk) => ({
    ...disk,
    partitions: [...disk.partitions].sort((a, b) => {
      // Coloca partições root (/) primeiro
      if (a.fs === "/") return -1
      if (b.fs === "/") return 1

      // Se não tiver fs, usa o device para comparação
      const aCompare = a.fs ?? a.device
      const bCompare = b.fs ?? b.device

      return aCompare.localeCompare(bCompare)
    }),
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Discos</CardTitle>
      </CardHeader>
      <CardContent className="divide-x-1 flex flex-row gap-2 space-x-4">
        {sortedGroupedDisks.map((disk, diskIndex) => (
          <div key={disk.device} className="flex w-full flex-col gap-2">
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="inline-flex items-center gap-2 text-sm font-medium">
                    {disk.name}
                    <span className="text-xs font-normal text-muted-foreground">
                      ({disk.type} - {disk.interfaceType})
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {disk.vendor} • {formatBytes(disk.size)} • S/N:{" "}
                    {disk.serialNum}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {disk.partitions.map((partition, partIndex) => (
                <div key={`${partition.device}-${partIndex}`}>
                  <div className="flex flex-col items-center gap-2 text-sm">
                    <div className="flex w-full flex-row justify-between gap-2">
                      <span className="flex flex-row gap-2 text-xs font-medium">
                        {partition.device}
                        {partition.type !== "disk unmounted" && (
                          <>
                            {" "}
                            •{" "}
                            <span className="text-xs text-muted-foreground">
                              {partition.type ?? "N/A"}
                            </span>
                          </>
                        )}
                      </span>
                      {partition.used && (
                        <div className="col-span-4 text-right text-xs text-muted-foreground">
                          {formatBytes(partition.used)} /{" "}
                          {formatBytes(partition.size)}
                        </div>
                      )}
                    </div>
                    <div className="mb-2 w-full">
                      {partition.use !== undefined && (
                        <Progress
                          value={partition.use}
                          className="h-2"
                          barClassName={
                            partition.use > 80
                              ? "bg-red-500"
                              : partition.use > 50
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="mb-2 flex grid-cols-12 flex-row justify-between gap-2 text-xs text-muted-foreground">
                    <div className="col-span-4">
                      {partition.mount && `Mount: ${partition.mount}`}
                    </div>
                    {partition.use !== undefined && (
                      <>
                        <div className="col-span-3">
                          Usado: {partition.use.toFixed(1)}%
                        </div>
                        <div className="col-span-5">
                          Livre: {formatBytes(partition.available ?? 0)}
                        </div>
                      </>
                    )}
                  </div>
                  {partIndex < disk.partitions.length - 1 && (
                    <div className="my-2 border-t" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

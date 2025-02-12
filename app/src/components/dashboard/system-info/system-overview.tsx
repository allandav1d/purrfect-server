'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { mapperPackageColor } from '@/lib/utils';
function formatUptime(uptime: number) {
    const days = Math.floor(uptime / (24 * 3600));
    const hours = Math.floor((uptime % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);

    return parts.join(' ') || '< 1m';
}

export function SystemOverview() {
    const { data, status } = api.system.getSystemInfo.subscription.useSubscription({
        interval: 10000, // every 10 seconds
        data: {
            osInfo: 'platform, distro, release, uptime',
            chassis: 'manufacturer, model, serial, type',
            time: 'uptime',
            versions: '*'
        }
    });

    if (status === 'connecting') {
        return <Card>
            <CardHeader>
                <CardTitle>Sistema</CardTitle>
                <CardDescription>Informações do sistema e dispositivo</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-4">
                    <Skeleton className="w-full h-[120px]" />
                    <Separator orientation="vertical" className="h-auto mx-2" />
                    <Skeleton className="w-full h-[120px]" />
                    <Separator orientation="vertical" className="h-auto mx-2" />
                    <Skeleton className="w-full h-[120px]" />
                </div>
                <Separator orientation="horizontal" className="w-full my-4" />
                <div className="flex flex-col">
                    <Skeleton className="w-full h-[40px]" />
                </div>
            </CardContent>
        </Card>
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
                        <h3 className="text-sm font-medium mb-2">Sistema Operacional</h3>
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

                    <Separator orientation="vertical" className="h-auto mx-4" />

                    <div className="flex-1">
                        <h3 className="text-sm font-medium mb-2">Dispositivo</h3>
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

                    <Separator orientation="vertical" className="h-auto mx-4" />

                    <div className="flex-1">
                        <h3 className="text-sm font-medium mb-2">Status</h3>
                        <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tempo Ativo</span>
                                <span>{formatUptime(data?.time?.uptime)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row">

                    <Separator orientation="horizontal" className="w-auto my-6" />

                    <div className="flex-3">
                        <h3 className="text-sm font-medium mb-2">Build-in Versions</h3>
                        <div className="grid gap-2 text-sm">
                            <div className="flex justify-start flex-wrap gap-2">
                                {
                                    Object.entries(data?.versions || {})?.filter(([key, value]) => value !== '')?.map(([key, value]) => (
                                        <Badge key={key}
                                            style={{ backgroundColor: mapperPackageColor[key as keyof typeof mapperPackageColor].bg, 
                                                color: mapperPackageColor[key as keyof typeof mapperPackageColor].font }}
                                            variant="outline">{`${key}: ${value}`}</Badge>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 
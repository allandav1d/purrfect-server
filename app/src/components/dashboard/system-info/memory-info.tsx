import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/trpc/react';
import { cn, formatBytes } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function MemoryInfo() {
    const { data, status } = api.system.getSystemInfo.subscription.useSubscription({
        interval: 1000, // every 1 second
        data: {
            mem: 'free, total, used, available, swapused, swaptotal, active'
        }
    });

    const { mem } = data || {};

    if (!mem) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Memória</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>RAM</span>
                            <span className="flex flex-row gap-2">
                                <Skeleton className="h-4 w-4" /> /
                                <Skeleton className="h-4 w-4" />
                            </span>
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <div className="flex flex-row gap-2">
                                Livre: <Skeleton className="h-4 w-4" /> / Disponível: <Skeleton className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span>Swap</span>
                            <span className="flex flex-row gap-2">
                                <Skeleton className="h-4 w-4" /> /
                                <Skeleton className="h-4 w-4" />
                            </span>
                        </div>
                        <Skeleton className="h-4 w-full" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    const memoryUsage = ((mem?.active || 0) / (mem?.total || 0)) * 100;
    const swapUsage = mem?.swaptotal ? ((mem?.swapused || 0) / (mem?.swaptotal || 0)) * 100 : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Memória</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span>RAM</span>
                        <span>
                            {formatBytes(mem?.active)} / {formatBytes(mem?.total)}
                        </span>
                    </div>
                    <Progress value={memoryUsage}
                        barClassName={cn(
                            memoryUsage > 80 ? 'bg-red-500' : memoryUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        )}
                    />
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>
                            <span>Livre: {formatBytes(mem?.free)} / Disponível: {formatBytes(mem?.available)}</span>
                        </div>
                    </div>
                </div>

                {mem.swaptotal > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Swap</span>
                            <span>
                                {formatBytes(mem?.swapused)} / {formatBytes(mem?.swaptotal)}
                            </span>
                        </div>
                        <Progress
                            barClassName={cn(
                                swapUsage > 80 ? 'bg-red-500' : swapUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            )}
                            value={swapUsage}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 
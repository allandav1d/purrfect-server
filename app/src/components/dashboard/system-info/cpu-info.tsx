import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/trpc/react';


export function CpuInfo() {
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
                <CardTitle>CPU</CardTitle>
            </CardHeader>
        </Card>
    }

    return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">{data.brand}</p>
          <p className="text-xs text-muted-foreground">
            {data.cores} cores ({data.physicalCores} físicos)
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Utilização</span>
            <span>{data.usage.toFixed(1)}%</span>
          </div>
          <Progress value={data.usage} />
        </div>
        {data.temperature.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Temperatura</span>
              <span>{data.temperature[0]?.toFixed(1) || 'N/A'}°C</span>
            </div>
            <Progress
              value={(data.temperature[0] ?? 0 / 100) * 100}
              className="bg-red-100 dark:bg-red-900"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SystemInfo } from '@/server/services/system-info.service';

interface DockerInfoProps {
  data: SystemInfo['docker'];
}

export function DockerInfo({ data }: DockerInfoProps) {
  const { data: systemInfo } = api.system.getSystemInfo.subscription.useSubscription(
    { interval: 2000 },
    {
      onError: (err) => {
        console.error('Error subscribing to system info:', err);
      },
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Docker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Containers</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p>{data.containers}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rodando</p>
                <p className="text-emerald-500">{data.containersRunning}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pausados</p>
                <p className="text-yellow-500">{data.containersPaused}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Parados</p>
                <p className="text-red-500">{data.containersStopped}</p>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Imagens</p>
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p>{data.images}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}  */
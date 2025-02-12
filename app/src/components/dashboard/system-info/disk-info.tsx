/* import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { SystemInfo } from '@/server/services/system-info.service';
import { api } from '@/trpc/react';
interface DiskInfoProps {
  data: SystemInfo['disks'];
}

function formatBytes(bytes: number) {
    const { data: systemInfo } = api.system.getSystemInfo.subscription.useSubscription(
        { interval: 2000 },
        {
          onError: (err) => {
            console.error('Error subscribing to system info:', err);
          },
        }
      );

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function DiskInfo({ data }: DiskInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((disk, index) => (
          <div key={disk.device} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{disk.device}</span>
              <span>
                {formatBytes(disk.used)} / {formatBytes(disk.size)}
              </span>
            </div>
            <Progress value={disk.use} />
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span>Usado: </span>
                <span>{disk.use.toFixed(1)}%</span>
              </div>
              <div>
                <span>Livre: </span>
                <span>{formatBytes(disk.available)}</span>
              </div>
            </div>
            {index < data.length - 1 && <div className="my-2 border-t" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}  */
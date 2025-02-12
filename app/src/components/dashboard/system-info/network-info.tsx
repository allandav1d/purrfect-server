import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatSpeed } from '@/lib/utils';
import { api } from '@/trpc/react';


export function NetworkInfo() {
    const { data, status } = api.system.getSystemInfo.subscription.useSubscription({
        interval: 1000, // every 1 second
        data: {
            networkInterfaces: '*',
            networkGatewayDefault: '',
            networkInterfaceDefault: '*',
            inetChecksite: 'google.com',
            networkStats: '*'
        }
    });

    const { networkInterfaces, networkGatewayDefault, networkInterfaceDefault, inetChecksite, networkStats } = data || {};

    console.log(networkInterfaces);
    console.log(networkGatewayDefault);
    console.log(networkInterfaceDefault);
    console.log(inetChecksite);
    console.log(networkStats);

    if (!networkStats) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Rede</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Nenhuma interface de rede ativa
                    </p>
                </CardContent>
            </Card>
        )
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Rede</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {networkStats.map((iface, index) => (
          <div key={iface.iface} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{iface.iface}</span>
              <span className="text-xs text-emerald-500">Ativo</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Download</p>
                <p className="font-medium">{formatSpeed(iface.rx_sec)}</p>
                <p className="text-xs text-muted-foreground">
                  Total: {formatSpeed(iface.rx_bytes)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Upload</p>
                <p className="font-medium">{formatSpeed(iface.tx_sec)}</p>
                <p className="text-xs text-muted-foreground">
                  Total: {formatSpeed(iface.tx_bytes)}
                </p>
              </div>
            </div>
            {index < networkStats.length - 1 && (
              <div className="my-2 border-t" />
            )}
          </div>
        ))}
        {networkStats.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma interface de rede ativa
          </p>
        )}
      </CardContent>
    </Card>
  );
} 
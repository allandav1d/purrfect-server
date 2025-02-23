import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatSpeed } from '@/lib/utils';
import { api } from '@/trpc/react';
import { Copyable } from '@/components/ui/copyable';

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

  const defaultInterface = networkInterfaces?.find((iface: any) => iface.iface === networkInterfaceDefault);

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
        {networkStats.map((iface: any, index: number) => (
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
            <br />
            {/* ipv4 and ipv6 with copy */}
            <div className="flex items-center gap-8">
              {defaultInterface?.ip4 && (
                <p className="text-xs text-muted-foreground">
                  <Copyable
                    text={defaultInterface.ip4}
                    label="IPV4"
                    toastMessage="Endereço IPv4 copiado!"
                  />
                </p>
              )}
              {defaultInterface?.ip6 && (
                <p className="text-xs text-muted-foreground">
                  <Copyable
                    text={defaultInterface.ip6}
                    label="IPV6"
                    toastMessage="Endereço IPv6 copiado!"
                  />
                </p>
              )}
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
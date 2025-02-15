import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatSpeed } from '@/lib/utils';
import { Copy, Clipboard } from 'lucide-react';
import { api } from '@/trpc/react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useState } from 'react';

export function NetworkInfo() {
  const [showIpv4Tooltip, setShowIpv4Tooltip] = useState(false);
  const [showIpv6Tooltip, setShowIpv6Tooltip] = useState(false);

  const copyToClipboard = async (text: string, isIpv4: boolean) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback para browsers mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } finally {
          textArea.remove();
        }
      }
      // Mostra o tooltip apropriado
      if (isIpv4) {
        setShowIpv4Tooltip(true);
        setTimeout(() => setShowIpv4Tooltip(false), 2000);
      } else {
        setShowIpv6Tooltip(true);
        setTimeout(() => setShowIpv6Tooltip(false), 2000);
      }
    } catch (error) {
      console.error('Erro ao copiar texto:', error);
    }
  };

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

  console.log(defaultInterface);

  console.log(networkInterfaces);
  console.log(networkInterfaceDefault);
  /*   console.log(networkGatewayDefault);
    console.log(inetChecksite);
    console.log(networkStats); */

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
            {/* ipv4 and ipv6 whit copy */}
            <div className="flex items-center gap-8">
              {defaultInterface?.ip4 && (
                <TooltipProvider>
                  <Tooltip open={showIpv4Tooltip}>
                    <TooltipTrigger asChild>
                      <p className="text-xs text-muted-foreground">
                        <span className="cursor-pointer hover:text-primary flex items-center gap-1"
                          onClick={() => defaultInterface?.ip4 && copyToClipboard(defaultInterface.ip4, true)}>
                          IPV4: {defaultInterface?.ip4} <Clipboard className="w-4 h-4 cursor-pointer hover:text-primary" />
                        </span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copiado!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {defaultInterface?.ip6 && (
                <TooltipProvider>
                  <Tooltip open={showIpv6Tooltip}>
                    <TooltipTrigger asChild>
                      <p className="text-xs text-muted-foreground">
                        <span className="cursor-pointer hover:text-primary flex items-center gap-1"
                          onClick={() => defaultInterface?.ip6 && copyToClipboard(defaultInterface.ip6, false)}>
                          IPV6: {defaultInterface?.ip6} <Clipboard className="w-4 h-4 cursor-pointer hover:text-primary" />
                        </span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copiado!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
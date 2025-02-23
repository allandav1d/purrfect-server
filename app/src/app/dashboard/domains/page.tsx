"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

const domainProviders = [
  { id: "cloudflare", name: "Cloudflare", tutorialUrl: "https://cloudflare.com/pt-br/dns" },
  { id: "godaddy", name: "GoDaddy", tutorialUrl: "https://br.godaddy.com/help/adicionar-um-registro-tipo-a-19238" },
  { id: "hostgator", name: "HostGator", tutorialUrl: "https://suporte.hostgator.com.br/hc/pt-br/articles/115004251133" },
  { id: "namecheap", name: "Namecheap", tutorialUrl: "https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain" },
  { id: "registro.br", name: "Registro.br", tutorialUrl: "https://registro.br/tecnologia/ferramentas/dns" },
];

export default function DomainsPage() {
  const [newDomain, setNewDomain] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const utils = api.useUtils();

  const { data: domains, isLoading } = api.domains.getAll.useQuery();
  
  const createDomain = api.domains.create.useMutation({
    onSuccess: () => {
      setNewDomain("");
      void utils.domains.getAll.invalidate();
      toast.success("Domínio adicionado com sucesso");
    },
  });

  const deleteDomain = api.domains.delete.useMutation({
    onSuccess: () => {
      void utils.domains.getAll.invalidate();
      toast.success("Domínio removido com sucesso");
    },
  });

  const verifyDomain = api.domains.verify.useMutation({
    onSuccess: (data) => {
      void utils.domains.getAll.invalidate();
      if (data.status === "active") {
        toast.success("Domínio verificado com sucesso!");
      } else if (data.status === "failed") {
        toast.error("O domínio não está apontando para este servidor.");
      } else {
        toast.warning("Status do domínio pendente.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDomain.mutate({ domain: newDomain });
  };

  return (
    <div className="container space-y-4 py-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Gerenciamento de Domínios</h1>
        <p className="text-muted-foreground">
          Configure e gerencie os domínios que apontam para este servidor
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tutorial de Configuração</CardTitle>
          <CardDescription>
            Aprenda como configurar seu domínio para apontar para este servidor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              <div className="flex flex-col gap-2">
                <p>Informações do Servidor:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>IPv4: <code className="bg-muted px-1 py-0.5 rounded">148.251.177.45</code></li>
                  {process.env.SERVER_IPV6 && (
                    <li>IPv6: <code className="bg-muted px-1 py-0.5 rounded">{process.env.SERVER_IPV6}</code></li>
                  )}
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <label className="text-sm font-medium">Selecione seu provedor de domínio:</label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um provedor" />
              </SelectTrigger>
              <SelectContent>
                {domainProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="instructions">
              <AccordionTrigger>Como configurar seu domínio</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Acesse o painel de controle do seu provedor de domínio</li>
                    <li>Localize a seção de gerenciamento de DNS</li>
                    <li>Adicione um registro do tipo A apontando para o IPv4: <code className="bg-muted px-1 py-0.5 rounded">148.251.177.45</code></li>
                    {process.env.SERVER_IPV6 && (
                      <li>Adicione um registro do tipo AAAA apontando para o IPv6: <code className="bg-muted px-1 py-0.5 rounded">{process.env.SERVER_IPV6}</code></li>
                    )}
                    <li>Aguarde a propagação do DNS (pode levar até 24 horas)</li>
                  </ol>
                  {selectedProvider && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        onClick={() => window.open(domainProviders.find(p => p.id === selectedProvider)?.tutorialUrl, '_blank')}
                      >
                        Ver tutorial específico do {domainProviders.find(p => p.id === selectedProvider)?.name}
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Domínio</CardTitle>
          <CardDescription>
            Cadastre um novo domínio para monitoramento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="exemplo.com"
              className="max-w-sm"
            />
            <Button type="submit" disabled={createDomain.isLoading}>
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domínio</TableHead>
                <TableHead>Status Geral</TableHead>
                <TableHead>IPv4</TableHead>
                <TableHead>IPv6</TableHead>
                <TableHead>DNS Reverso</TableHead>
                <TableHead>Última Verificação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains?.map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell>{domain.domain}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        domain.status === "active"
                          ? "bg-green-100 text-green-700"
                          : domain.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {domain.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        domain.ipv4Status === "active"
                          ? "bg-green-100 text-green-700"
                          : domain.ipv4Status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {domain.ipv4Status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        domain.ipv6Status === "active"
                          ? "bg-green-100 text-green-700"
                          : domain.ipv6Status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {domain.ipv6Status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        domain.dnsStatus === "active"
                          ? "bg-green-100 text-green-700"
                          : domain.dnsStatus === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {domain.dnsStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    {domain.lastCheck
                      ? new Date(domain.lastCheck).toLocaleString()
                      : "Nunca"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => verifyDomain.mutate({ id: domain.id })}
                        disabled={verifyDomain.isLoading}
                      >
                        Verificar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteDomain.mutate({ id: domain.id })}
                        disabled={deleteDomain.isLoading}
                      >
                        Remover
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 
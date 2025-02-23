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
import { ChevronDown, Info } from "lucide-react";
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
import { Copyable } from "@/components/ui/copyable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
  const [domainToDelete, setDomainToDelete] = useState<{ id: string; domain: string } | null>(null);
  const [domainError, setDomainError] = useState<string>("");
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const utils = api.useUtils();

  const { data: domains, isLoading } = api.domains.getAll.useQuery();

  // get server ipv4 and ipv6
  const { data: serverSettings } = api.settings.get.useQuery({ key: "server_ipv4" });
  const serverIpv4 = serverSettings?.value;
  const { data: serverSettingsIpv6 } = api.settings.get.useQuery({ key: "server_ipv6" });
  const serverIpv6 = serverSettingsIpv6?.value;

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

  // Regex para validar domínios
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

  const validateDomain = (domain: string): boolean => {
    if (!domain) {
      setDomainError("O domínio não pode estar vazio");
      return false;
    }
    
    if (!domainRegex.test(domain)) {
      setDomainError("Formato de domínio inválido");
      return false;
    }

    setDomainError("");
    return true;
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewDomain(value);
    if (value) validateDomain(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDomain(newDomain)) {
      return;
    }

    createDomain.mutate({ domain: newDomain });
  };

  const handleDeleteDomain = (id: string, domain: string) => {
    setDomainToDelete({ id, domain });
  };

  const handleConfirmDelete = () => {
    if (domainToDelete) {
      deleteDomain.mutate({ id: domainToDelete.id });
      setDomainToDelete(null);
    }
  };

  return (
    <>
          <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/domains">Domínios</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciamento de Domínios</h1>
          <Dialog open={tutorialOpen} onOpenChange={setTutorialOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Info className="h-5 w-5" />
                <span className="sr-only">Tutorial de Configuração</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader className="sticky top-0 bg-background pt-6 pb-4 z-10 border-b">
                <DialogTitle className="text-xl">Tutorial de Configuração</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Aprenda como configurar seu domínio para apontar para este servidor
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 p-6">
                <Alert>
                  <AlertDescription>
                    <div className="flex flex-col gap-2">
                      <p>Informações do Servidor:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {serverIpv4 && (
                          <li>
                            <Copyable
                              text={serverIpv4}
                              label="IPv4"
                              toastMessage="Endereço IPv4 copiado!"
                            />
                          </li>
                        )}
                        {serverIpv6 && (
                          <li>
                            <Copyable
                              text={serverIpv6}
                              label="IPv6"
                              toastMessage="Endereço IPv6 copiado!"
                            />
                          </li>
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
                          <li>Adicione um registro do tipo A apontando para o IPv4: <code className="bg-muted px-1 py-0.5 rounded">{serverIpv4}</code></li>
                          {serverIpv6 && (
                            <li>Adicione um registro do tipo AAAA apontando para o IPv6: <code className="bg-muted px-1 py-0.5 rounded">{serverIpv6}</code></li>
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
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">
          Configure e gerencie os domínios que apontam para este servidor
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Domínio</CardTitle>
          <CardDescription>
            Cadastre um novo domínio para monitoramento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex-1 max-w-sm">
                <Input
                  value={newDomain}
                  onChange={handleDomainChange}
                  placeholder="exemplo.com"
                  className={domainError ? "border-red-500" : ""}
                />
                {domainError && (
                  <p className="text-sm text-red-500 mt-1">{domainError}</p>
                )}
              </div>
              <Button type="submit" disabled={!!domainError || createDomain.isLoading}>
                Adicionar
              </Button>
            </div>
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
                        onClick={() => handleDeleteDomain(domain.id, domain.domain)}
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

      <AlertDialog open={!!domainToDelete} onOpenChange={(open) => !open && setDomainToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o domínio {domainToDelete?.domain}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
              </div>
        </>
  );
} 
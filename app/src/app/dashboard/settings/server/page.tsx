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
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Save, X, Mail, Database, Key } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ConfigurationTab } from "./tabs/configuration";
import { EmailTab } from "./tabs/email";
import { BackupTab } from "./tabs/backup";
import { OAuthTab } from "./tabs/oauth";

export default function ServerSettingsPage() {
  return (
    <div className="container space-y-4 py-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Configurações do Servidor</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações globais do servidor
        </p>
      </div>

      <Tabs defaultValue="configuration" className="space-y-4">
        <TabsList>
          <TabsTrigger value="configuration" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Configuração
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2" disabled={true}>
            <Mail className="h-4 w-4" />
            Email & Notificações
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2" disabled={true}>
            <Database className="h-4 w-4" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="oauth" className="flex items-center gap-2" disabled={true}>
            <Key className="h-4 w-4" />
            OAuth
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration">
          <ConfigurationTab />
        </TabsContent>

        <TabsContent value="email">
          <EmailTab />
        </TabsContent>

        <TabsContent value="backup">
          <BackupTab />
        </TabsContent>

        <TabsContent value="oauth">
          <OAuthTab />
        </TabsContent>
      </Tabs>
    </div>
  );
} 
"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Globe,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { api } from "@/trpc/react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      //url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard",
        },
        /*         {
          title: "Memória",
          url: "#",
        },
        {
          title: "Processos",
          url: "#",
        }, */
      ],
    },
    {
      title: "Domínios",
      url: "/dashboard/domains",
      icon: Globe,
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Servidor",
          url: "/dashboard/settings/server",
        },
        /*         {
          title: "Usuários",
          url: "#",
        },
        {
          title: "Grupos",
          url: "#",
        },
        {
          title: "Permissões",
          url: "#",
        }, */
      ],
    },
    /*     {
      title: "Logs",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Erros",
          url: "#",
        },
        {
          title: "Avisos",
          url: "#",
        },
        {
          title: "Logs",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    }, */
    /*     {
      title: "Servidores",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Servidores",
          url: "#",
        },
        {
          title: "Grupos",
          url: "#",
        },
        {
          title: "Custos",
          url: "#",
        },
        {
          title: "Limites",
          url: "#",
        },
      ],
    }, */
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Projeto 1",
      url: "#",
      icon: Frame,
    },
    {
      name: "Projeto 2",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Projeto 3",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background">
                  <Image
                    src="/logo/logo-dark.svg"
                    alt="Purrfect Server"
                    width={32}
                    height={32}
                    className="hidden dark:block"
                  />
                  <Image
                    src="/logo/logo-light.svg"
                    alt="Purrfect Server"
                    width={32}
                    height={32}
                    className="block dark:hidden"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Purrfect Server
                  </span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

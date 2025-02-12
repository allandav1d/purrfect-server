"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Moon,
    Sun,
    Sparkles,
} from "lucide-react"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { api } from "@/trpc/react"

export function NavUser() {
    const { isMobile } = useSidebar()
    const { theme, setTheme } = useTheme()
    const router = useRouter()

    const { data: user, isLoading } = api.auth.getMe.useQuery()

    if (isLoading) {
        return <Skeleton className="h-10 w-full" />
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" })
        router.push("/")
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user?.image || ""} alt={user?.name || "Avatar"} />
                                <AvatarFallback className="rounded-lg">
                                    {user?.name?.slice(0, 2).toUpperCase() || "UN"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user?.name || "Usuário"}</span>
                                <span className="truncate text-xs">{user?.email || ""}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user?.image || ""} alt={user?.name || "Avatar"} />
                                    <AvatarFallback className="rounded-lg">
                                        {user?.name?.slice(0, 2).toUpperCase() || "UN"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.name || "Usuário"}</span>
                                    <span className="truncate text-xs">{user?.email || ""}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Conta
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notificações
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                                {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
                                {theme === "light" ? "Modo Escuro" : "Modo Claro"}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            <LogOut />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
} 
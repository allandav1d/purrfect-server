import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { auth } from "@/server/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth();
  
  if (!session) {
    redirect("/")
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
} 
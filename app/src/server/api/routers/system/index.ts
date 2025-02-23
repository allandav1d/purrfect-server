import { createTRPCRouter } from "@/server/api/trpc"
import isConfiguredRouter from "./is-configured"
import initializeRouter from "./initialize"
import { systemInfoRouter } from "./info"

export const systemRouter = createTRPCRouter({
  // System protected procedures
  getSystemInfo: systemInfoRouter,

  // System public procedures
  isConfigured: isConfiguredRouter,
  initialize: initializeRouter,
})

import { z } from "zod"
import { hash } from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { getSystemInfo } from "@/server/services/system-info.service"
import isConfiguredRouter from "./is-configured"
import initializeRouter from "./initialize" 
import infoRouter from "./info"
export const systemRouter = createTRPCRouter({
  // System protected procedures
  getSystemInfo: infoRouter,

  // System public procedures
  isConfigured: isConfiguredRouter,
  initialize: initializeRouter,
}) 
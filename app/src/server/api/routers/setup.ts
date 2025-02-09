import { z } from "zod"
import { hash } from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"

const setupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  image: z.string().nullable(),
})

export const setupRouter = createTRPCRouter({
  isConfigured: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst()
    return !!user
  }),

  initialize: publicProcedure
    .input(setupSchema)
    .mutation(async ({ ctx, input }) => {
      const alreadyConfigured = await ctx.db.query.users.findFirst()

      if (alreadyConfigured) {
        throw new Error("Sistema já configurado, não é possível configurar novamente.")
      }

      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      })

      if (existingUser) {
        throw new Error("Este email já está em uso")
      }

      const hashedPassword = await hash(input.password, 10)

      await ctx.db.insert(users).values({
        id: uuidv4(),
        name: input.name,
        email: input.email,
        password: hashedPassword,
        image: input.image,
        role: "ADMIN",
      })

      return { success: true }
    }),
}) 
import { eq } from "drizzle-orm"
import { hash } from "bcrypt"
import { users } from "@/server/db/schema"
import { z } from "zod"
import { publicProcedure } from "../../trpc"
import { v4 as uuidv4 } from "uuid"

const setupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    image: z.string().nullable(),
  })
  
const initializeRouter = publicProcedure
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
})

export default initializeRouter
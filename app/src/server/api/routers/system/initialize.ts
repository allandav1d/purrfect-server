import { eq } from "drizzle-orm"
import { hash } from "bcrypt"
import { serverSettings, users } from "@/server/db/schema"
import { z } from "zod"
import { publicProcedure } from "../../trpc"
import { v4 as uuidv4 } from "uuid"
import si, { networkInterfaceDefault } from "systeminformation"

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
      throw new Error(
        "Sistema já configurado, não é possível configurar novamente.",
      )
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

    //initialize default server settings
    const networkInterfaces = await si.networkInterfaces("*")
    console.log("networkInterfaces " + networkInterfaces)

    const defaultInterface = Array.isArray(networkInterfaces)
      ? networkInterfaces.filter((iface: any) => iface.default)?.[0]
      : undefined

    console.log("defaultInterface " + defaultInterface)

    if (!defaultInterface) {
      throw new Error("Não foi possível determinar a interface de rede padrão")
    }

    await ctx.db.insert(serverSettings).values({
      key: "server_ipv4",
      value: defaultInterface?.ip4,
      type: "string",
      description: "Endereço IPv4 do servidor",
      isSystem: true,
    })

    await ctx.db.insert(serverSettings).values({
      key: "server_ipv6",
      value: defaultInterface?.ip6,
      type: "string",
      description: "Endereço IPv6 do servidor",
      isSystem: true,
    })

    await ctx.db.insert(serverSettings).values({
      key: "main_domain",
      value:
        "http://" +
        (defaultInterface?.ip4 ?? defaultInterface?.ip6) +
        ":" +
        (process.env.SERVER_PORT ?? 3000),
      type: "string",
      description: "Domínio principal do servidor",
      isSystem: true,
    })

    await ctx.db.insert(serverSettings).values({
      key: "server_name",
      value: "Purrfect Server",
      type: "string",
      description: "Nome do servidor",
      isSystem: true,
    })

    return { success: true }
  })

export default initializeRouter

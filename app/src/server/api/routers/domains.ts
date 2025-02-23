import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { domains } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import dns from "dns"
import { promisify } from "util"

const lookup = promisify(dns.lookup)
const resolve4 = promisify(dns.resolve4)
const resolve6 = promisify(dns.resolve6)
const reverse = promisify(dns.reverse)

export const domainsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.domains.findMany({
      where: eq(domains.userId, ctx.session.user.id),
      orderBy: (domains, { desc }) => [desc(domains.createdAt)],
    })
  }),

  create: protectedProcedure
    .input(z.object({ domain: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(domains).values({
        domain: input.domain,
        userId: ctx.session.user.id,
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(domains).where(eq(domains.id, input.id))
    }),

  verify: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const domain = await ctx.db.query.domains.findFirst({
        where: eq(domains.id, input.id),
      })

      if (!domain) throw new Error("Domínio não encontrado")

      try {
        const serverSettings = await ctx.db.query.serverSettings.findMany({
          where: (settings, { or }) =>
            or(
              eq(settings.key, "server_ipv4"),
              eq(settings.key, "server_ipv6"),
            ),
        })

        const serverIpv4 =
          serverSettings.find((s) => s.key === "server_ipv4")?.value ||
          "localhost"
        const serverIpv6 =
          serverSettings.find((s) => s.key === "server_ipv6")?.value ||
          "localhost"

        // Verificar IPv4
        let ipv4Status = "failed"
        try {
          const ipv4Addresses = await resolve4(domain.domain)
          ipv4Status = ipv4Addresses.includes(serverIpv4 || "")
            ? "active"
            : "failed"
        } catch (error) {
          console.error("Erro na verificação IPv4:", error)
        }

        // Verificar IPv6
        let ipv6Status = "failed"
        if (serverIpv6) {
          try {
            const ipv6Addresses = await resolve6(domain.domain)
            ipv6Status = ipv6Addresses.includes(serverIpv6)
              ? "active"
              : "failed"
          } catch (error) {
            console.error("Erro na verificação IPv6:", error)
          }
        }

        // Verificar DNS reverso
        let dnsStatus = "failed"
        try {
          const reverseDns = await reverse(serverIpv4)
          dnsStatus = reverseDns.includes(domain.domain) ? "active" : "failed"
        } catch (error) {
          console.error("Erro na verificação DNS reverso:", error)
        }

        // Determinar status geral
        const status =
          ipv4Status === "active" || ipv6Status === "active"
            ? "active"
            : "failed"

        // Atualizar banco de dados
        await ctx.db
          .update(domains)
          .set({
            status,
            ipv4Status,
            ipv6Status,
            dnsStatus,
            lastCheck: new Date(),
          })
          .where(eq(domains.id, input.id))

        return {
          status,
          ipv4Status,
          ipv6Status,
          dnsStatus,
        }
      } catch (error) {
        console.error("Erro geral na verificação:", error)
        // Em caso de erro geral, marca tudo como failed
        const updateData = {
          status: "failed",
          ipv4Status: "failed",
          ipv6Status: "failed",
          dnsStatus: "failed",
          lastCheck: new Date(),
        }

        await ctx.db
          .update(domains)
          .set(updateData)
          .where(eq(domains.id, input.id))

        return updateData
      }
    }),
})

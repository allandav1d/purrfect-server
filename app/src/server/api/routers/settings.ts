import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { serverSettings } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { defaultSettings } from "@/lib/default-settings"

const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  description: z.string().optional(),
  type: z.enum(["string", "number", "boolean", "json"]),
  isSystem: z.boolean().optional(),
})

export const settingsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.serverSettings.findMany({
      orderBy: (settings, { asc }) => [asc(settings.key)],
    })
  }),

  get: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.serverSettings.findFirst({
        where: eq(serverSettings.key, input.key),
      })
    }),

  upsert: protectedProcedure
    .input(settingSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.serverSettings.findFirst({
        where: eq(serverSettings.key, input.key),
      })

      if (existing) {
        return ctx.db
          .update(serverSettings)
          .set({
            value: input.value,
            description: input.description,
            type: input.type,
            updatedAt: new Date(),
          })
          .where(eq(serverSettings.key, input.key))
      }

      return ctx.db.insert(serverSettings).values({
        key: input.key,
        value: input.value,
        description: input.description,
        type: input.type,
        isSystem: input.isSystem,
      })
    }),

  bulkUpsert: protectedProcedure
    .input(z.array(settingSchema))
    .mutation(async ({ ctx, input }) => {
      const existingKeys = new Set(input.map((s) => s.key))
      const existingSettings = await ctx.db.query.serverSettings.findMany({
        where: (settings, { inArray }) =>
          inArray(settings.key, Array.from(existingKeys)),
      })

      // Separa as configurações entre criar e atualizar
      const settingsToCreate = input.filter(
        (s) => !existingSettings.some((es) => es.key === s.key),
      )
      const settingsToUpdate = input.filter((s) =>
        existingSettings.some((es) => es.key === s.key),
      )

      // Força description e isSystem para corresponder aos defaultSettings
      settingsToCreate.forEach((s) => {
        const defaultSetting = defaultSettings.find((ds) => ds.key === s.key)
        if (defaultSetting) {
          s.description = defaultSetting.description
          s.isSystem = defaultSetting.isSystem
        }
      })

      // Valida se todas as chaves existem em defaultSettings
      for (const setting of [...settingsToCreate, ...settingsToUpdate]) {
        if (!defaultSettings.some((ds) => ds.key === setting.key)) {
          throw new Error(`Configuração ${setting.key} não encontrada`)
        }
      }

      // Cria novas configurações
      if (settingsToCreate.length > 0) {
        await ctx.db.insert(serverSettings).values(settingsToCreate)
      }

      // Atualiza configurações existentes
      for (const setting of settingsToUpdate) {
        await ctx.db
          .update(serverSettings)
          .set({
            value: setting.value,
            description: setting.description,
            type: setting.type,
            updatedAt: new Date(),
          })
          .where(eq(serverSettings.key, setting.key))
      }

      return {
        success: true,
        created: settingsToCreate.length,
        updated: settingsToUpdate.length,
      }
    }),

  delete: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const setting = await ctx.db.query.serverSettings.findFirst({
        where: eq(serverSettings.key, input.key),
      })

      if (setting?.isSystem) {
        throw new Error("Não é possível excluir uma configuração do sistema")
      }

      return ctx.db
        .delete(serverSettings)
        .where(eq(serverSettings.key, input.key))
    }),
})

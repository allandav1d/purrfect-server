import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../../trpc"
import si from "systeminformation"

export type SystemType = {
  [key: string]: string | number | boolean | undefined
}

export const systemInfoRouter = createTRPCRouter({
  subscription: protectedProcedure
    .input(
      z.object({
        interval: z.number().min(1000).max(10000).default(2000),
        data: z.record(z.string(), z.any()),
      }),
    )
    .subscription(async function* ({ input }) {
      while (true) {
        try {
          const data = await getSystemInfo(input.data)
          yield data
        } catch (error) {
          console.error("Error fetching system info:", error)
        }
        await new Promise((resolve) => setTimeout(resolve, input.interval))
      }
    }),
})

export const getSystemInfo = async (data: SystemType): Promise<any> => {
  return await si
    .get(data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err)
      return null
    })
}

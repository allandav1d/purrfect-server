import { createTRPCRouter, protectedProcedure } from "../trpc"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"

type Me = {
  id: string
  name: string
  email: string
  image: string | null
}

export const authRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

    console.log("ctx.session.user ", user?.id, ctx.session.user, user)
    return user as Me | null
  }),
})

import { publicProcedure } from "../../trpc"

const isConfiguredRouter = publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.users.findFirst()
})

export default isConfiguredRouter
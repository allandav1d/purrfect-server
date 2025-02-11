import { protectedProcedure } from "../../trpc"
import { getSystemInfo } from "@/server/services/system-info.service"

const infoRouter = protectedProcedure.query(async ({ ctx }) => {
    return getSystemInfo()
})

export default infoRouter
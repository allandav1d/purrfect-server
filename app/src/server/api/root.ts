import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { systemRouter } from "./routers/system";
import { authRouter } from "./routers/auth";
import { domainsRouter } from "./routers/domains";
import { settingsRouter } from "./routers/settings";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  system: systemRouter,
  domains: domainsRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

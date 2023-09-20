import { profileSchema } from "~/forms/profile";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
export const userRouter = createTRPCRouter({


  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
    });
  }),

  update: protectedProcedure.input(profileSchema).mutation(({ input, ctx }) => {
    return ctx.db.update(users).set(input).where(eq(users.id, ctx.session.user.id))
  })
})


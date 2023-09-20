import { projectSchema } from "~/forms/projects";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { projects } from "~/server/db/schema";
import * as z from "zod";


const byId = z.number();
// const projectUpdate = projectSchema.extend({
//     id: z.number()
// });

export const projectsRouter = createTRPCRouter({

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(projects)
    }),

    getById: protectedProcedure.input(byId).query(({ ctx, input }) => {
        return ctx.db.query.projects.findFirst({
            where: (projects, { eq }) => eq(projects.id, input),
            with: {
                propertyAddresses: true,
            }
        })
    }),

    create: protectedProcedure.input(projectSchema).mutation(({ input, ctx }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { propertyAddresses, ...rest } = input
        return ctx.db.transaction(async (db) => {
            const result = await db.insert(projects).values(rest).returning({ id: projects.id })

            return result;
        });
    }),


})


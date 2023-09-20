import { clientSchema } from "~/forms/client";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { clients, clientContact } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";


const byId = z.number();
const clientUpdate = clientSchema.extend({
    id: z.number()
});

export const clientRouter = createTRPCRouter({

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(clients)
    }),

    getById: protectedProcedure.input(byId).query(({ ctx, input }) => {
        return ctx.db.query.clients.findFirst({
            where: (clients, { eq }) => eq(clients.id, input),
            with: {
                contacts: true
            }
        })
    }),

    create: protectedProcedure.input(clientSchema).mutation(({ input, ctx }) => {
        const { name, notificationFrequency, contacts } = input
        return ctx.db.transaction(async (db) => {
            const client = await db.insert(clients).values({
                name,
                notificationFrequency,
                isActive: true,
            }).returning({ id: clients.id })

            if (client[0]?.id !== undefined && contacts?.length > 0) {
                const clientId = client[0].id
                await db.insert(clientContact).values(contacts.map(c => ({
                    clientId,
                    firstName: c.firstName,
                    lastName: c.lastName,
                    email: c.email,
                    includeInEmails: c.includeInEmails
                })));
            }
        });
    }),

    update: protectedProcedure.input(clientUpdate).mutation(async ({ input, ctx }) => {
        const { name, notificationFrequency, contacts } = input
        await ctx.db.transaction(async (db) => {
            const client = await db.update(clients)
                .set({
                    name,
                    notificationFrequency,
                    isActive: true,
                    logo: input.logo ?? null
                })
                .where(eq(clients.id, input.id))
                .returning({ id: clients.id })
            await db.delete(clientContact).where(eq(clientContact.clientId, input.id))
            if (client[0]?.id !== undefined && contacts?.length > 0) {
                const clientId = client[0].id
                await db.insert(clientContact).values(contacts.map(c => ({
                    clientId,
                    firstName: c.firstName,
                    lastName: c.lastName,
                    email: c.email,
                    includeInEmails: c.includeInEmails,
                })));
            }
        });
        return ctx.db.query.clients.findFirst({
            where: (clients, { eq }) => eq(clients.id, input.id),
            with: {
                contacts: true
            }
        })
    })
})


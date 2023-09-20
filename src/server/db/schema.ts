import { relations, sql, } from "drizzle-orm";

import { pgTableCreator, index, integer, primaryKey, pgEnum, text, timestamp, serial, varchar, boolean, numeric } from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `sally_${name}`);


export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 256 }),
  firstName: varchar("firstName", { length: 256 }),
  lastName: varchar("lastName", { length: 256 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
export const notificationFrequencyEnum = pgEnum('notificationFrequency', ['weekly', 'monthly']);

export const clients = pgTable(
  "clients",
  {
    id: serial('id').primaryKey(),
    logo: varchar("logo", { length: 256 }),
    name: varchar("name", { length: 256 }).notNull(),
    notificationFrequency: notificationFrequencyEnum('notificationFrequency').notNull(),
    isActive: boolean("isActive").notNull(),
  }
)

export const clientContact = pgTable(
  "clients_contact",
  {
    id: serial('id').primaryKey(),
    clientId: integer('clientId').notNull().references(() => clients.id, { onDelete: 'cascade' }).notNull(),
    firstName: varchar("firstName", { length: 256 }).notNull(),
    lastName: varchar("lastName", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    includeInEmails: boolean("includeInEmails").notNull(),
  }
)

export const clientContactRelations = relations(clientContact, ({ one }) => ({
  contacts: one(clients, {
    fields: [clientContact.clientId],
    references: [clients.id]
  })
}));

export const clientRelations = relations(clients, ({ many }) => ({
  contacts: many(clientContact)
}));


export const projectTypeEnum = pgEnum('projectType', ['change']);

export const propertyAddress = pgTable(
  'propertyAddress',
  {
    id: serial('id').primaryKey(),
    streetNumber: varchar("streetNumber", { length: 256 }).notNull(),
    street: varchar("street", { length: 256 }).notNull(),
    suburb: varchar("suburb", { length: 256 }),
    city: varchar("city", { length: 256 }),
    postcode: varchar("postcode", { length: 256 }),
    lotNumbers: varchar("lotNumbers", { length: 256 }),
    unitNumbers: varchar("unitNumbers", { length: 256 }),
    lat: numeric("lat"),
    lng: numeric("lng"),
    projectId: integer('projectId').notNull().references(() => projects.id, { onDelete: 'cascade' }).notNull(),


  }
)

export const projects = pgTable(
  "projects",
  {
    id: serial('id').primaryKey(),
    projectNumber: varchar("projectNumber", { length: 256 }).notNull(),
    type: projectTypeEnum("type").notNull(),
    projectTitle: varchar("projectTitle", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }),
    councilReference: varchar("councilReference", { length: 256 }),
    councilApplicationUrl: varchar("councilApplicationUrl", { length: 256 }),
    //properlyMadeDate: time('properlyMadeDate', { withTimezone: true }),
  }
)

export const projectRelations = relations(projects, ({ many }) => ({
  propertyAddresses: many(propertyAddress)
}));

export const propertyAddressRelations = relations(propertyAddress, ({ one }) => ({
  contacts: one(projects, {
    fields: [propertyAddress.projectId],
    references: [projects.id]
  })
}));
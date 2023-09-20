// import { Client } from "@planetscale/database";
// import { drizzle } from "drizzle-orm/planetscale-serverless";

// import { env } from "~/env.mjs";
// import * as schema from "./schema";

// export const db = drizzle(
//   new Client({
//     url: env.DATABASE_URL,
//   }).connection(),
//   { schema }
// );


// import { neon, neonConfig } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from "./schema";
// neonConfig.fetchConnectionCache = true;

// const sql = neon(env.DATABASE_URL);
// export const db = drizzle(sql, { schema });

import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from "~/env.mjs";
import * as schema from "./schema";

// for query purposes
// const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
// await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });

const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });

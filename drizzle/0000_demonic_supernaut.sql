CREATE TABLE IF NOT EXISTS "sally_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT sally_account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sally_clients_contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"firstName" varchar(256),
	"lastName" varchar(256),
	"email" varchar(256),
	"includeInEmails" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sally_clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"notificationFrequency" varchar(256) NOT NULL,
	"isActive" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sally_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sally_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"firstName" varchar(256),
	"lastName" varchar(256),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp DEFAULT CURRENT_TIMESTAMP(3),
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sally_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT sally_verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "sally_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "sally_session" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sally_clients_contact" ADD CONSTRAINT "sally_clients_contact_clientId_sally_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "sally_clients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "purrfect-server_domain" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"domain" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'pending',
	"last_check" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purrfect-server_domain" ADD CONSTRAINT "purrfect-server_domain_user_id_purrfect-server_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."purrfect-server_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

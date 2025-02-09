ALTER TABLE "purrfect-server_user" ADD COLUMN "password" varchar(255);--> statement-breakpoint
ALTER TABLE "purrfect-server_user" ADD COLUMN "role" varchar(20) DEFAULT 'USER';
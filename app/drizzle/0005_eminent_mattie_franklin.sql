CREATE TABLE IF NOT EXISTS "purrfect-server_server_settings" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"description" text,
	"type" varchar(50) NOT NULL,
	"is_system" boolean DEFAULT false,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "purrfect-server_server_settings_key_unique" UNIQUE("key")
);

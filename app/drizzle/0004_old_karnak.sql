ALTER TABLE "purrfect-server_domain" ADD COLUMN "ipv4_status" varchar(20) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "purrfect-server_domain" ADD COLUMN "ipv6_status" varchar(20) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "purrfect-server_domain" ADD COLUMN "dns_status" varchar(20) DEFAULT 'pending';
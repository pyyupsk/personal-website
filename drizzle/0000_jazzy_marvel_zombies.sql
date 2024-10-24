-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."PostStatus" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."ProjectStatus" AS ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" "ProjectStatus" DEFAULT 'NOT_STARTED' NOT NULL,
	"link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"publishDate" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"status" "PostStatus" DEFAULT 'DRAFT' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post_content" (
	"id" text PRIMARY KEY NOT NULL,
	"postId" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_content" ADD CONSTRAINT "post_content_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_status_idx" ON "project" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_id_idx" ON "post" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_publishDate_idx" ON "post" USING btree ("publishDate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_status_idx" ON "post" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_content_postId_idx" ON "post_content" USING btree ("postId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "post_content_postId_key" ON "post_content" USING btree ("postId");
*/
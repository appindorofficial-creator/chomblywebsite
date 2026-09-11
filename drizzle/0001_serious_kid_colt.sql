CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`idempotency_key` text NOT NULL,
	`audience` text NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`city` text NOT NULL,
	`market` text NOT NULL,
	`role` text,
	`organization` text,
	`payload` text NOT NULL,
	`source` text NOT NULL,
	`route` text NOT NULL,
	`experiment_id` text,
	`thesis_id` text,
	`variant_id` text,
	`consent_research` integer NOT NULL,
	`consent_updates` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`crm_status` text DEFAULT 'local_only' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_idempotency_key_unique` ON `leads` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `leads_audience_created` ON `leads` (`audience`,`created_at`);--> statement-breakpoint
CREATE INDEX `leads_email_created` ON `leads` (`email`,`created_at`);
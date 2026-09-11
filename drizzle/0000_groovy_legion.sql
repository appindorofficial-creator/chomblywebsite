CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`service` text NOT NULL,
	`data` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`provider_id` text,
	`amount` integer,
	`terms` text,
	`offer_expires` integer,
	`payment_ref` text,
	`payment_id` text,
	`paid_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_payment_ref_unique` ON `bookings` (`payment_ref`);--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_user_key` ON `bookings` (`user_id`,`idempotency_key`);--> statement-breakpoint
CREATE INDEX `bookings_user` ON `bookings` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `bookings_service_status` ON `bookings` (`service`,`status`);--> statement-breakpoint
CREATE INDEX `bookings_provider` ON `bookings` (`provider_id`);--> statement-breakpoint
CREATE TABLE `holds` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`starts` integer NOT NULL,
	`ends` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `holds_provider_interval` ON `holds` (`provider_id`,`starts`,`ends`);--> statement-breakpoint
CREATE INDEX `holds_booking` ON `holds` (`booking_id`);--> statement-breakpoint
CREATE TABLE `professionals` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`service` text NOT NULL,
	`district` text NOT NULL,
	`credentials` text NOT NULL,
	`bio` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `professionals_user_id_unique` ON `professionals` (`user_id`);--> statement-breakpoint
CREATE TRIGGER holds_no_overlap BEFORE INSERT ON holds
WHEN EXISTS (SELECT 1 FROM holds WHERE provider_id=NEW.provider_id AND starts<NEW.ends AND ends>NEW.starts AND expires>unixepoch())
BEGIN
 SELECT RAISE(ABORT, 'SCHEDULE_CONFLICT');
END;

CREATE TABLE `monitor` (
	`id` integer PRIMARY KEY NOT NULL,
	`job_type` text(3) DEFAULT 'other' NOT NULL,
	`periodicity` text(6) DEFAULT 'other' NOT NULL,
	`status` text(2) DEFAULT 'inactive' NOT NULL,
	`active` integer DEFAULT false,
	`regions` text DEFAULT '' NOT NULL,
	`url` text(512) NOT NULL,
	`name` text(256) DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`headers` text DEFAULT '',
	`body` text DEFAULT '',
	`method` text(2) DEFAULT 'GET',
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `monitors_to_pages` (
	`monitor_id` integer NOT NULL,
	`page_id` integer NOT NULL,
	PRIMARY KEY(`monitor_id`, `page_id`),
	FOREIGN KEY (`monitor_id`) REFERENCES `monitor`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`page_id`) REFERENCES `page`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `page` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text(256) DEFAULT '',
	`slug` text(256) NOT NULL,
	`custom_domain` text(256) NOT NULL,
	`published` integer DEFAULT false,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `page_slug_unique` ON `page` (`slug`);
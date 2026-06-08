CREATE TABLE `repos` (
	`id` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`name` text NOT NULL UNIQUE,
	`description` text,
	`deletion_started_at` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_repos_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `repos_deletion_started_at_index` ON `repos` (`deletion_started_at`);
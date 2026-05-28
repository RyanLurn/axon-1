DROP INDEX IF EXISTS `identifier_index`;--> statement-breakpoint
CREATE INDEX `verifications_identifier_index` ON `verifications` (`identifier`);
-- DropForeignKey
ALTER TABLE `Inbox` DROP FOREIGN KEY `Inbox_userId_fkey`;

-- AlterTable
ALTER TABLE `Inbox` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Inbox` ADD CONSTRAINT `Inbox_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

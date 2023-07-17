/*
  Warnings:

  - You are about to drop the column `userId` on the `InboxAdmin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `InboxAdmin` DROP COLUMN `userId`,
    ADD COLUMN `checkInId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `InboxAdmin` ADD CONSTRAINT `InboxAdmin_checkInId_fkey` FOREIGN KEY (`checkInId`) REFERENCES `Checkin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

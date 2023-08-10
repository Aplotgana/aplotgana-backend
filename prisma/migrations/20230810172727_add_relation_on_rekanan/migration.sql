/*
  Warnings:

  - You are about to drop the column `locationRecordId` on the `Collaborator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Collaborator` DROP FOREIGN KEY `Collaborator_locationRecordId_fkey`;

-- AlterTable
ALTER TABLE `Collaborator` DROP COLUMN `locationRecordId`;

-- AlterTable
ALTER TABLE `Rekanan` ADD COLUMN `locationRecordId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Rekanan` ADD CONSTRAINT `Rekanan_locationRecordId_fkey` FOREIGN KEY (`locationRecordId`) REFERENCES `LocationRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

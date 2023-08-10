-- AlterTable
ALTER TABLE `Collaborator` ADD COLUMN `locationRecordId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Collaborator` ADD CONSTRAINT `Collaborator_locationRecordId_fkey` FOREIGN KEY (`locationRecordId`) REFERENCES `LocationRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

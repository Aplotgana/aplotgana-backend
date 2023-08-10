-- AlterTable
ALTER TABLE `Collaborator` ADD COLUMN `locationRecordId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Equipment` ADD COLUMN `locationRecordId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `EquipmentItem` ADD COLUMN `locationRecordId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `catatanAktifitas` ADD COLUMN `locationRecordId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Collaborator` ADD CONSTRAINT `Collaborator_locationRecordId_fkey` FOREIGN KEY (`locationRecordId`) REFERENCES `LocationRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_locationRecordId_fkey` FOREIGN KEY (`locationRecordId`) REFERENCES `LocationRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentItem` ADD CONSTRAINT `EquipmentItem_locationRecordId_fkey` FOREIGN KEY (`locationRecordId`) REFERENCES `LocationRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `catatanAktifitas` ADD CONSTRAINT `catatanAktifitas_locationRecordId_fkey` FOREIGN KEY (`locationRecordId`) REFERENCES `LocationRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `InboxType` MODIFY `type` ENUM('NOTIFIKASI', 'PEMBERITAHUAN') NOT NULL DEFAULT 'PEMBERITAHUAN';

-- CreateTable
CREATE TABLE `LocationRecord` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `checkinId` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LocationRecord_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LocationRecord` ADD CONSTRAINT `LocationRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LocationRecord` ADD CONSTRAINT `LocationRecord_checkinId_fkey` FOREIGN KEY (`checkinId`) REFERENCES `Checkin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

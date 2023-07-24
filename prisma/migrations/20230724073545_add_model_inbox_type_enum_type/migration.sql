-- CreateTable
CREATE TABLE `InboxType` (
    `id` VARCHAR(191) NOT NULL,
    `inboxId` VARCHAR(191) NULL,
    `type` ENUM('NOTIFIKASI', 'PEMBERITAHUAN') NOT NULL DEFAULT 'NOTIFIKASI',
    `sandi_operasi` VARCHAR(191) NULL,
    `penanggung_jawab` VARCHAR(191) NULL,
    `deskripsi` VARCHAR(191) NULL,
    `status` BOOLEAN NULL DEFAULT false,
    `longitude` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `InboxType_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InboxType` ADD CONSTRAINT `InboxType_inboxId_fkey` FOREIGN KEY (`inboxId`) REFERENCES `Inbox`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `picture_keluar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Checkin` ADD COLUMN `picture_keluar` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `picture_keluar`;

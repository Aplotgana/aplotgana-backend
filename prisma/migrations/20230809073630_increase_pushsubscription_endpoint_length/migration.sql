/*
  Warnings:

  - Made the column `endpoint` on table `PushSubscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PushSubscription` MODIFY `endpoint` VARCHAR(512) NOT NULL;

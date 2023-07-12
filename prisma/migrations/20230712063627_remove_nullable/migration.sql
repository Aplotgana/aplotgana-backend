/*
  Warnings:

  - Made the column `nama_pelapor` on table `catatanAktifitas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "catatanAktifitas" ALTER COLUMN "nama_pelapor" SET NOT NULL;

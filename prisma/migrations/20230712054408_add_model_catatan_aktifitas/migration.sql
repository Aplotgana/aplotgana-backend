-- CreateTable
CREATE TABLE "catatanAktifitas" (
    "id" TEXT NOT NULL,
    "checkinId" TEXT,
    "deskripsi" TEXT,
    "nama_pelapor" DOUBLE PRECISION,
    "nomor_pelapor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catatanAktifitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catatanAktifitas_id_key" ON "catatanAktifitas"("id");

-- AddForeignKey
ALTER TABLE "catatanAktifitas" ADD CONSTRAINT "catatanAktifitas_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "Checkin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

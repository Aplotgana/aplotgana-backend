const prisma = require('../services/prisma.service')

const postCatatan = async (req, res) => {
    const { checkinId, deskripsi, nama_pelapor, nomor_pelapor, locationRecordId } = req.body

    try {
        const response = await prisma.catatanAktifitas.create({
            data: {
                checkin: {
                    connect: {
                        id: checkinId
                    }
                },
                LocationRecord: {
                    connect: {
                        id: locationRecordId
                    }
                },
                deskripsi,
                nama_pelapor,
                nomor_pelapor
            }
        })

        res.json({
            message: "Catatan berhasil ditambahkan",
            data: response
        })
    } catch (error) {
      console.log(error)
    }
}

module.exports = { postCatatan }
const prisma = require('../services/prisma.service')

const postCatatan = async (req, res) => {
    const { checkinId, deskripsi, nama_pelapor, nomor_pelapor } = req.body

    console.log(req.body)
    try {
        const response = await prisma.catatanAktifitas.create({
            data: {
                checkin: {
                    connect: {
                        id: checkinId
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
        // res.status(500).json({
        // message: "Catatan gagal ditambahkan",
        console.log(error)
        // })
    }
}

module.exports = { postCatatan }
const prisma = require('../services/prisma.service')


const postRekanan = async (req, res) => {
    const { collaboratorId, deskripsi, nama_rekan, nomor_rekan } = req.body

    // try {
    const response = await prisma.rekanan.create({
        data: {
            collaboratorId: collaboratorId,
            deskripsi,
            nama_rekan,
            nomor_rekan
        }
    })

    res.json({
        message: "Catatan berhasil ditambahkan",
        data: response
    })
    // } catch (error) {
    //     res.json(error)
    // }
}

module.exports = { postRekanan }
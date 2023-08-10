const prisma = require('../services/prisma.service')


const postRekanan = async (req, res) => {
    const { collaboratorId, deskripsi, nama_rekan, nomor_rekan, locationRecordId } = req.body

    // try {
    const response = await prisma.rekanan.create({
        data: {
            collaborator: {
                connect: {
                    id: collaboratorId
                }
            },
            LocationRecord: {
                connect: {
                    id: locationRecordId
                }
            },
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
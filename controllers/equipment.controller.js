const prisma = require('../services/prisma.service')

const postEquipment = async (req, res) => {
    const { userId, checkinId, equipmentId, nama } = req.body

    console.log(userId, checkinId, equipmentId, nama)

    try {
        const response = await prisma.equipmentItem.create({
            data: {
                userId,
                checkinId,
                equipmentId,
                nama
            }
        })

        res.status(200).json({
            status: 'success',
            data: response
        })
    } catch (error) {
        res.json(error)
    }

}

module.exports = { postEquipment }

const prisma = require('../services/prisma.service')

const postEquipment = async (req, res) => {
    const { userId, checkinId, equipmentId, nama, locationRecordId } = req.body

    try {
        const response = await prisma.equipmentItem.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
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
                equipment: {
                    connect: {
                        id: equipmentId
                    }
                },
                nama
            }
        })

        res.status(200).json({
            status: 'success',
            data: response
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = { postEquipment }

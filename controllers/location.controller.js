const prisma = require('../services/prisma.service')

const postLocationRecord = async (req, res) => {

    const {
        userId,
        checkinId,
        longitude,
        latitude,
        address
    } = req.body

    try {
        const response = await prisma.locationRecord.create({
            data: {
                userId,
                checkinId,
                longitude,
                latitude,
                address
            }
        })

        res.status(200).json({
            status: 'success',
            response
        })
    } catch (error) {
        res.json(error)
    }
}

const getLocationRecord = async (req, res) => {
    const { checkinId } = req.params

    try {
        const response = await prisma.locationRecord.findMany({
            where: {
                checkinId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.status(200).json({
            status: 'success',
            response
        })
    } catch (error) {
        res.json(error)
    }
}


module.exports = {
    postLocationRecord,
    getLocationRecord
}
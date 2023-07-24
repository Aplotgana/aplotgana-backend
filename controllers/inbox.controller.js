const prisma = require('../services/prisma.service')

const getInboxUser = async (req, res) => {
    const userId = req.params.id

    try {

        const response = await prisma.inbox.findMany({
            where: {
                userId: userId
            },
        })

        res.status(200).json({
            status: 'success',
            data: response
        })
    } catch (error) {
        res.json(error)
    }
}

const getInboxAdmin = async (req, res) => {
    try {
        const response = await prisma.inboxAdmin.findMany({
            include: {
                checkIn: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            status: 'success',
            data: response
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: error.message
        })
    }
}

const getPengumuman = async (req, res) => {
    try {
        const response = await prisma.inbox.findMany({
            where: {
                userId: null,
                flag: true
            },
            include: {
                InboxType: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.json({
            status: 'success',
            data: response
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getInboxUser, getInboxAdmin, getPengumuman }
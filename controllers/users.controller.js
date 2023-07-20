const prisma = require('../services/prisma.service')

const user = async (req, res) => {
    const { name, email, credential, picture } = req.body

    try {
        // check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            try {
                const responseUpdate = await prisma.user.update({
                    where: {
                        email
                    },
                    data: {
                        credential,
                        updatedAt: new Date()
                    }
                })

                res.status(200).json({
                    status: 'success',
                    data: responseUpdate
                })

                return
            } catch (error) {
                res.json(error)
            }
        }

        const response = await prisma.user.create({
            data: {
                name,
                email,
                credential,
                picture
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

const getUser = async (req, res) => {
    const userId = req.params.id

    try {
        const response = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        res.status(200).json({
            response
        })
    } catch (error) {
        res.json(error)
    }
}

const updateUser = async (req, res) => {
    const { userId, name, kontak, nip } = req.body

    try {
        const response = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                kontak,
                nip
            }
        })

        res.json({
            status: 'success',
            response
        })

        console.log(response)
    } catch (error) {
        res.json(error)
    }

}

const getAbsen = async (req, res) => {

    try {
        const response = await prisma.checkin.findMany({
            where: {
                userId: req.params.id
            },
            include: {
                catatans: true
            },
            orderBy: {
                createdAt: 'desc'
            },

        })

        res.status(200).json({
            response
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = { user, getUser, getAbsen, updateUser }
const prisma = require('../services/prisma.service')

const postOtorisasiToInboxAdmin = async (req, res) => {
    const checkinId = req.params.checkinid
    const userId = req.params.inboxAdminId
    const inboxId = req.params.inboxUserId

    const { status } = req.body


    if (status === 'tolak') {

        const update = await prisma.checkin.update({
            where: {
                id: checkinId
            },
            data: {
                otorisasi: false,
            }
        })

        await prisma.inboxAdmin.update({
            where: {
                id: userId
            },
            data: {
                updatedAt: new Date(),
                isReaded: false,
                title: 'Anda telah menolak Otorisasi',
                message: 'Anda telah menolak Otorisasi, silahkan cek kembali Activity yang telah ditambahkan oleh user.',
            }
        })

        await prisma.inbox.update({
            where: {
                id: inboxId
            },
            data: {
                updatedAt: new Date(),
                flag: false,
                title: 'Mohon Maaf! Otorisasi Akun Anda ditolak.',
                message: 'Anda tidak dapat menambahkan Activity karena otorisasi Anda telah ditolak.',
            }
        })

        res.status(200).json({
            message: "Otorisasi ditolak",
            data: update
        })
    } else if (status === 'setuju') {


        try {

            const update = await prisma.checkin.update({
                where: {
                    id: checkinId
                },
                data: {
                    otorisasi: true,
                }
            })

            await prisma.inboxAdmin.update({
                where: {
                    id: userId
                },
                data: {
                    updatedAt: new Date(),
                    isReaded: false,
                    title: 'Anda telah menyutujui Otorisasi',
                    message: 'Anda telah menyutujui Otorisasi, silahkan cek kembali Activity yang telah ditambahkan oleh user.',
                }
            })

            res.status(200).json({
                message: "Otorisasi diterima",
                data: update
            })

            await prisma.inbox.update({
                where: {
                    id: userId
                },
                data: {
                    updatedAt: new Date(),
                    isReaded: false,
                    flag: true,
                    title: 'Selamat! Akun anda berhasil terotorisasi.',
                    message: 'Klik disini untuk tambah Activity sekarang.',
                }
            })

        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const inboxUser = await prisma.inbox.create({
                data: {
                    userId: userId,
                    title: 'Permintaan Otorisasi Approval',
                    message: 'Klik disini untuk melihat permintaan sekarang',
                }
            })

            const response = await prisma.inboxAdmin.create({
                data: {
                    inboxUserId: inboxUser.id,
                    checkInId: checkinId,
                    title: 'Permintaan Otorisasi Approval',
                    message: 'Klik disini untuk melihat permintaan sekarang',
                }
            })


            res.status(200).json({
                message: "Permintaan success",
                data: response,
                inboxUser
            })

        } catch (error) {
            console.log(error)
            res.json({
                message: "Checkin failed",
                error: error.message
            })
        }
    }
}


const postOtorisasi = async (req, res) => {
    const checkinId = req.params.checkinid
    const inboxId = req.params.inboxUserId
    const inboxAdminId = req.params.inboxAdminId
    const { user_id } = req.body

    try {

        const checkin = await prisma.checkin.update({
            where: {
                id: checkinId
            },
            data: {
                otorisasi: true
            }
        })


        await prisma.user.update({
            where: {
                id: user_id,
            },
            data: {
                isOtorisasi: true
            }
        })

        const adminBox = await prisma.inboxAdmin.update({
            where: {
                id: inboxAdminId
            },
            data: {
                isReaded: false,
                title: "Anda telah menyutujui Otorisasi",
                message: "Anda telah menyutujui Otorisasi, silahkan cek kembali Activity yang telah ditambahkan oleh user.",
                updatedAt: new Date()
            }
        })

        const userBox = await prisma.inbox.update({
            where: {
                id: inboxId
            },
            data: {
                flag: true,
                title: "Selamat! Akun anda berhasil terotorisasi.",
                message: "Klik disini untuk tambah Activity sekarang.",
                updatedAt: new Date()
            }
        })


        res.status(200).json({
            message: "Otorisasi diterima",
            data: {
                checkin,
                adminBox,
                userBox
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Otorisasi failed",
            error: error.message
        })
    }
}

const postNewOtorisasi = async (req, res) => {
    const checkinId = req.params.checkinid
    const userId = req.params.userId

    try {
        const inboxUser = await prisma.inbox.create({
            data: {
                userId: userId,
                title: 'Permintaan Otorisasi Approval',
                message: 'Silakan tunggu hingga akun anda terotorisasi.',
            }
        })

        const response = await prisma.inboxAdmin.create({
            data: {
                inboxUserId: inboxUser.id,
                checkInId: checkinId,
                title: 'Permintaan Otorisasi Approval',
                message: 'Klik disini untuk melihat permintaan sekarang',
            }
        })


        res.status(200).json({
            message: "Permintaan success",
            data: response,
            inboxUser
        })

    } catch (error) {
        console.log(error)
        res.json({
            message: "Checkin failed",
            error: error.message
        })
    }
}


module.exports = { postOtorisasiToInboxAdmin, postOtorisasi, postNewOtorisasi }
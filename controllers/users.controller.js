const prisma = require('../services/prisma.service')
const webpush = require('web-push')

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
                catatans: true,
                Equipment: {
                    include: {
                        EquipmentItem: true
                    }
                },
                Collaborator: {
                    include: {
                        rekanans: true
                    },
                },
                LocationRecord: true
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

const postPilihTim = async (req, res) => {
    const { userId, tim, name, kontak, kontakDarurat, kemampuan } = req.body

    try {
        const response = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                tim,
                name,
                kontak,
                kontakDarurat,
                kemampuan
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

const postInformasi = async (req, res) => {
    const { address, deskripsi, latitude, longitude, penanggung_jawab, sandi_operasi, status, userId } = req.body

    console.log(req.body)
    // return
    // post to inbox user
    const inboxUser = await prisma.inbox.create({
        data: {
            title: "Pengumuman Penting!",
            message: "Klik disini untuk melihat detail pengumuman.",
            flag: true
        }
    })

    try {
        const response = await prisma.inboxType.create({
            data: {
                inboxId: inboxUser.id,
                address,
                deskripsi,
                latitude,
                longitude,
                penanggung_jawab,
                sandi_operasi,
                status
            }
        })

        // Fetch the list of push subscription objects from your database
        const subscriptions = await prisma.pushSubscription.findMany({
            where: {
                role: 'USER'
            },
            select: {
                endpoint: true,
                p256dh: true,
                auth: true,
            },
        });

        const payload = JSON.stringify({
            title: 'Aplotgana',
            body: 'Pengumuman Penting! Cek inbox anda untuk melihat detail pengumuman.',
            data: {
                url: 'https://aplotgana.id/inbox'
            }
        });

        for (const subscription of subscriptions) {
            const pushSubscription = {
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth,
                },
            };

            try {
                await webpush.sendNotification(pushSubscription, payload);
                console.log('Push notification sent successfully:', subscription.endpoint);
            } catch (error) {
                console.error('Error sending push notification:', error);
            }
        }

        res.status(200).json({
            status: 'success',
            response
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { user, getUser, getAbsen, updateUser, postPilihTim, postInformasi }
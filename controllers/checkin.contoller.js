const prisma = require("../services/prisma.service")
const cloudinary = require("../services/cloudinary.service")

/**
 * The function `uploadImage` uploads an image to Cloudinary and returns the secure URL of the uploaded
 * image.
 * @param imagePath - The `imagePath` parameter is the path or URL of the image file that you want to
 * upload to Cloudinary.
 * @returns the secure URL of the image uploaded to Cloudinary.
 */
async function uploadImage(imagePath) {
    const options = {
        unique_filename: true,
        overwrite: false
    }

    try {
        // upload the image
        const result = await cloudinary.uploader.upload(imagePath, options)
        /* Returning the secure url of the image uploaded to cloudinary. */
        return result.secure_url
    } catch (error) {
        console.log(`Error while uploading image` + error.message)
    }
}


const postCheckin = async (req, res) => {
    const { userId, longitude, latitude, address, picture } = req.body
    let imageUrl = ''

    const checkIfAlereadyCheckin = await prisma.checkin.findFirst({
        where: {
            userId
        }
    })

    if (checkIfAlereadyCheckin) {
        res.json({
            message: "You already checkin today",
            isCheckin: true
        })
        return
    }

    try {
        imageUrl = await uploadImage(picture)
    } catch (error) {
        console.log(error.message)
    }

    try {
        const response = await prisma.checkin.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                longitude,
                latitude,
                address,
                picture: imageUrl
            }
        })

        res.status(200).json({
            message: "Checkin success",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message: "Checkin failed",
            error: error.message
        })
    }

}


const getCheckinToday = async (req, res) => {
    const userId = req.params.id
    const currentDate = new Date();
    const beginningOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);

    try {
        const response = await prisma.user.findFirstOrThrow({
            where: {
                id: userId
            },
            include: {
                checkins: {
                    where: {
                        createdAt: {
                            gte: beginningOfDay
                        }
                    }
                }
            }
        })

        res.status(200).json({
            message: "Get checkin today success",
            data: {
                checkins: response.checkins
            }
        })
    } catch (error) {
        // res.status(500).json({
        //     message: "Get checkin today failed",
        //     error: error.message
        // })

        console.log(error.message)
    }
}


module.exports = { postCheckin, getCheckinToday }
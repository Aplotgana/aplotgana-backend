const prisma = require('../services/prisma.service')

async function main() {
    const admin = await prisma.user.upsert({
        where: {
            email: 'administrator@gmail.com',
        },
        update: {
            password: 'administrator'
        },
        create: {
            name: 'administrator',
            email: 'administrator@gmail.com',
            role: 'admin'
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
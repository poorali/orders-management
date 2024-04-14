const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {faker} = require("@faker-js/faker")

/**
 * @description Populates the database with 10 sample products.
 */
async function main() {
    let products = [];
    for (let i = 0; i < 10; i++) {
        products.push({
            title: faker.lorem.word(),
            name: faker.lorem.word(),
            stock: faker.number.int({min: 1, max: 10}),
            price: faker.number.int({min: 10000, max: 999999}),
            image: `https://api.multiavatar.com/${faker.lorem.word()}.svg`
        })
    }
    await prisma.products.createMany({data: products})
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
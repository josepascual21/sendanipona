// Cargar variables de entorno ANTES de cualquier otra cosa
require('dotenv').config()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Start seeding...')

    // ProductType
    const productTypes = [
        'Amuleto', 'Cerámica', 'Palillos', 'Figura',
        'Cojín', 'Decoración', 'Bolsa', 'Aromático'
    ]
    for (const name of productTypes) {
        await prisma.productType.upsert({
            where: { name },
            update: {},
            create: { name },
        })
    }

    // ProductMaterial
    const materials = [
        'Madera', 'Acero', 'Arcilla', 'Piedra', 'Tela', 'Poliéster', 'Papel'
    ]
    for (const name of materials) {
        await prisma.productMaterial.upsert({
            where: { name },
            update: {},
            create: { name },
        })
    }

    // ProductColor
    const colors = [
        { name: 'Marrón', hex: '#8B4513' },
        { name: 'Azul', hex: '#0000FF' },
        { name: 'Rojo', hex: '#FF0000' },
        { name: 'Blanco', hex: '#FFFFFF' },
        { name: 'Amarillo', hex: '#FFFF00' },
        { name: 'Negro', hex: '#000000' },
        { name: 'Verde', hex: '#008000' },
        { name: 'Gris', hex: '#808080' },
        { name: 'Rosa', hex: '#FFC0CB' },
    ]
    for (const color of colors) {
        await prisma.productColor.upsert({
            where: { name: color.name },
            update: { hexCode: color.hex },
            create: { name: color.name, hexCode: color.hex },
        })
    }
    console.log('Created Maestros (Types, Materials, Colors)')

    // ArticleTopic
    const topicName = 'Historia'
    const topic = await prisma.articleTopic.upsert({
        where: { name: topicName },
        update: {},
        create: { name: topicName },
    })

    // --- 3. Productos (Selección) ---
    // Helper para buscar IDs de maestros
    const getType = async (n: string) => (await prisma.productType.findUniqueOrThrow({ where: { name: n } })).id
    const getMat = async (n: string) => (await prisma.productMaterial.findUniqueOrThrow({ where: { name: n } })).id
    const getCol = async (n: string) => (await prisma.productColor.findUniqueOrThrow({ where: { name: n } })).id

    const products = [
        {
            name: 'Kifuda: kacho fugetsu',
            description: "('Ka' (花) significa \"flor\", 'chō' significa \"pájaro\", 'fū' (風) significa \"viento\" y 'getsu' (月) significa \"luna\").\nLas kifuda son tablillas de madera que se cuelgan en las casas japonesas a modo de amuleto o protección.",
            price: 34.99,
            stock: 5,
            type: 'Amuleto', material: 'Madera', color: 'Marrón'
        },
        {
            name: 'Daruma',
            description: 'Elegimos un propósito y le pintamos un ojo a Daruma. Cuando lo consigamos, le pintaremos el otro ojo en señal de gratitud.',
            price: 29.95,
            stock: 5,
            type: 'Amuleto', material: 'Arcilla', color: 'Rojo'
        },
        {
            name: 'Manekineko Blanco',
            description: 'Maneki-neko blanco. Conocido como el gato de la suerte o el gato de la fortuna.',
            price: 4.99,
            stock: 5,
            type: 'Decoración', material: 'Arcilla', color: 'Blanco'
        },
        {
            name: 'Cojín Gatito Verde',
            description: 'Cojín Kitty Verde. MUY SUAVE. Su textura es muy suave y agradable al tacto.',
            price: 21.95,
            stock: 5,
            type: 'Cojín', material: 'Poliéster', color: 'Verde'
        }
    ]

    for (const p of products) {
        await prisma.product.create({
            data: {
                name: p.name,
                description: p.description,
                price: p.price,
                stock: p.stock,
                typeId: await getType(p.type),
                materialId: await getMat(p.material),
                colorId: await getCol(p.color),
            }
        })
    }
    console.log('Created Products')

    // --- 4. Artículos ---
    const articles = [
        { name: 'Pasado', info: 'Historia antigua', htmlRoute: '' },
        { name: 'Presente', info: 'Actualidad', htmlRoute: '' },
        { name: 'Futuro', info: 'Proyecciones', htmlRoute: '' },
    ]

    for (const art of articles) {
        await prisma.article.create({
            data: {
                name: art.name,
                info: art.info,
                htmlRoute: art.htmlRoute,
                topicId: topic.id
            }
        })
    }
    console.log('Created Articles')

    console.log('✅ Seeding finished.')
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

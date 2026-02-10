// Cargar variables de entorno ANTES de cualquier otra cosa
require('dotenv').config()

import { PrismaClient } from '@prisma/client'
import { BcryptPasswordService } from '../src/infrastructure/services/BcryptPasswordService'

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
    const historyTopicName = 'Historia'
    const historyTopic = await prisma.articleTopic.upsert({
        where: { name: historyTopicName },
        update: {},
        create: { name: historyTopicName },
    })
    const culturePopTopicName = 'Cultura Pop'
    const culturePopTopic = await prisma.articleTopic.upsert({
        where: { name: culturePopTopicName },
        update: {},
        create: { name: culturePopTopicName },
    })
    const tourismTopicName = 'Turismo'
    const tourismTopic = await prisma.articleTopic.upsert({
        where: { name: tourismTopicName },
        update: {},
        create: { name: tourismTopicName },
    })
    const artsTopicName = 'Arte'
    const artsTopic = await prisma.articleTopic.upsert({
        where: { name: artsTopicName },
        update: {},
        create: { name: artsTopicName },
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
    const historyArticles = [
        { name: 'Pasado', info: 'Historia antigua', slug: 'pasado' },
        { name: 'Presente', info: 'Actualidad', slug: 'presente' },
        { name: 'Futuro', info: 'Proyecciones', slug: 'futuro' },
    ]

    for (const art of historyArticles) {
        await prisma.article.create({
            data: {
                name: art.name,
                info: art.info,
                slug: art.slug,
                topicId: historyTopic.id
            }
        })
    }
    console.log('Created Articles')

    // JDM Article
    const culturePopArticles = [
        { name: 'Cultura JDM', info: 'Drift, carreras, modelos icónicos y la cultura clandestina.', slug: 'jdm' },
        { name: 'Anime y Manga', info: 'El arte de la animación y el cómic japonés.', slug: 'anime-manga' },
        { name: 'Videojuegos', info: 'Juegos electrónicos icónicos y la cultura digital.', slug: 'videojuegos' },
    ]

    for (const art of culturePopArticles) {
        await prisma.article.create({
            data: {
                name: art.name,
                info: art.info,
                slug: art.slug,
                topicId: culturePopTopic.id
            }
        })
    }
    console.log('Created Culture Pop Article')

    // Tourism Article
    const tourismArticles = [
        { name: 'Tokio', info: 'La capital de Japón', slug: 'tokyo' },
        { name: 'Kioto', info: 'La antigua capital de Japón', slug: 'kioto' },
        { name: 'Osaka', info: 'La tercera ciudad más grande de Japón', slug: 'osaka' },
    ]

    for (const art of tourismArticles) {
        await prisma.article.create({
            data: {
                name: art.name,
                info: art.info,
                slug: art.slug,
                topicId: tourismTopic.id
            }
        })
    }
    console.log('Created Tourism Article')

    // Arts Article
    const artsArticles = [
        { name: 'Shodo', info: 'El arte de la calligrafía japonesa', slug: 'shodo' },
    ]

    for (const art of artsArticles) {
        await prisma.article.create({
            data: {
                name: art.name,
                info: art.info,
                slug: art.slug,
                topicId: artsTopic.id
            }
        })
    }
    console.log('Created Arts Article')

    // --- 5. Usuario de Prueba (Admin) ---
    const passwordService = new BcryptPasswordService();
    const hashedPassword = await passwordService.hash('password123');

    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: { password: hashedPassword },
        create: {
            email: 'user@example.com',
            username: 'Test User',
            password: hashedPassword,
            isActive: true,
        },
    });
    console.log({ user });
    console.log('Created Test User')

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

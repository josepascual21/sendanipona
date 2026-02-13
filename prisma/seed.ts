// Cargar variables de entorno ANTES de cualquier otra cosa
require('dotenv').config()

import { PrismaClient } from '@prisma/client'
import { BcryptPasswordService } from '../src/infrastructure/services/BcryptPasswordService'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Start seeding...')

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

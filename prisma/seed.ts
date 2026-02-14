// Cargar variables de entorno ANTES de cualquier otra cosa
require('dotenv').config()

import { PrismaClient } from '@prisma/client'
import { BcryptPasswordService } from '../src/infrastructure/services/BcryptPasswordService'

const prisma = new PrismaClient()

function getRandomDateWithinLastMonth() {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
    console.log('🌱 Start seeding...')

    // --- 1. Topics ---
    const topicsData = ['Historia', 'Cultura Pop', 'Turismo', 'Arte'];
    const topicsMap = new Map();

    for (const name of topicsData) {
        const topic = await prisma.articleTopic.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        topicsMap.set(name, topic.id);
    }
    console.log('✅ Topics ready');

    // --- 2. Articles ---
    const articles = [
        // Historia
        { name: 'Pasado', info: 'Historia antigua', slug: 'pasado', topic: 'Historia' },
        { name: 'Presente', info: 'Actualidad', slug: 'presente', topic: 'Historia' },
        { name: 'Futuro', info: 'Proyecciones', slug: 'futuro', topic: 'Historia' },
        // Cultura Pop
        { name: 'Cultura JDM', info: 'Drift, carreras, modelos icónicos y la cultura clandestina.', slug: 'jdm', topic: 'Cultura Pop' },
        { name: 'Anime y Manga', info: 'El arte de la animación y el cómic japonés.', slug: 'anime-manga', topic: 'Cultura Pop' },
        { name: 'Videojuegos', info: 'Juegos electrónicos icónicos y la cultura digital.', slug: 'videojuegos', topic: 'Cultura Pop' },
        // Turismo
        { name: 'Tokio', info: 'La capital de Japón', slug: 'tokyo', topic: 'Turismo' },
        { name: 'Kioto', info: 'La antigua capital de Japón', slug: 'kioto', topic: 'Turismo' },
        { name: 'Osaka', info: 'La tercera ciudad más grande de Japón', slug: 'osaka', topic: 'Turismo' },
        // Arte
        { name: 'Shodo', info: 'El arte de la calligrafía japonesa', slug: 'shodo', topic: 'Arte' },
    ];

    for (const art of articles) {
        await prisma.article.upsert({
            where: { slug: art.slug },
            update: {
                name: art.name,
                info: art.info,
                topicId: topicsMap.get(art.topic)
            },
            create: {
                name: art.name,
                info: art.info,
                slug: art.slug,
                topicId: topicsMap.get(art.topic)
            }
        });
    }
    console.log('✅ Articles ready');

    // --- 3. Users ---
    const passwordService = new BcryptPasswordService();
    const commonPassword = await passwordService.hash('password123');

    const users = [
        // Admin original
        { email: 'user@example.com', username: 'Test User', role: 'admin' },
        // Nuevos usuarios "reales"
        { email: 'sophia.art@example.com', username: 'SophiaDesign', role: 'user' },
        { email: 'marcos.jdm@example.com', username: 'MarcosGT_R', role: 'user' },
        { email: 'lucia.history@example.com', username: 'Lucia_Kyoto', role: 'user' },
        { email: 'david.game@example.com', username: 'RetroDavid84', role: 'user' },
        { email: 'elena.travel@example.com', username: 'ElenaViajera', role: 'user' },
    ];

    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: { password: commonPassword },
            create: {
                email: u.email,
                username: u.username,
                password: commonPassword,
                isSuperuser: u.role === 'admin',
                isActive: true,
            },
        });
    }
    console.log('✅ Users ready');

    // --- 4. Comments ---
    // Definimos qué usuario comenta qué en cada artículo
    const commentsData = [
        // PASADO
        { slug: 'pasado', email: 'lucia.history@example.com', text: "Increíble cómo la mitología sintoísta sigue influyendo en la mentalidad actual. La historia de Amaterasu es fascinante y explica mucho sobre la familia imperial." },
        { slug: 'pasado', email: 'sophia.art@example.com', text: "El periodo Edo es mi favorito por el auge del arte. Hokusai fue un genio adelantado a su tiempo, sus grabados tienen una composición perfecta." },
        { slug: 'pasado', email: 'marcos.jdm@example.com', text: "Los samuráis eran brutales, pero su código de honor es algo que se echa de menos hoy en día en nuestra sociedad tan individualista." },
        { slug: 'pasado', email: 'david.game@example.com', text: "Siempre me ha flipado la figura de Oda Nobunaga, un visionario total. Si no fuera por él, Japón sería muy diferente." },
        { slug: 'pasado', email: 'elena.travel@example.com', text: "Visité el castillo de Himeji el año pasado y es impresionante pensar en cómo se construyó algo así sin tecnología moderna." },

        // PRESENTE
        { slug: 'presente', email: 'elena.travel@example.com', text: "Lo de los cafés de animales es cierto, estuve en uno de búhos en Harajuku y fue una experiencia surrealista, aunque me dio un poco de pena por los animales." },
        { slug: 'presente', email: 'lucia.history@example.com', text: "Es triste ver cómo la presión social afecta tanto a la salud mental. Esa búsqueda de la perfección constante tiene un precio muy alto." },
        { slug: 'presente', email: 'david.game@example.com', text: "La mezcla de tradición y modernidad es lo que hace a Japón único. No hay otro país donde veas un templo milenario al lado de un rascacielos cyberpunk." },
        { slug: 'presente', email: 'marcos.jdm@example.com', text: "La puntualidad de los trenes es de otro planeta. En mi país si el tren llega el mismo día ya nos damos por satisfechos jaja." },
        { slug: 'presente', email: 'sophia.art@example.com', text: "La moda en Shibuya es arte puro. La gente se expresa a través de la ropa con una libertad que no se ve en otros sitios." },

        // FUTURO
        { slug: 'futuro', email: 'lucia.history@example.com', text: "La crisis demográfica es un problema serio. Si no cambian las políticas de inmigración o el equilibrio vida-trabajo, no sé cómo sostendrán el sistema de pensiones." },
        { slug: 'futuro', email: 'david.game@example.com', text: "La robótica asistencial suena a ciencia ficción para nosotros, pero allí ya es una necesidad real para cuidar a los ancianos. Es el laboratorio del futuro." },
        { slug: 'futuro', email: 'marcos.jdm@example.com', text: "Espero que la tecnología no les haga perder esa esencia humana que tienen. Japón siempre encuentra el equilibrio, confío en ellos." },
        { slug: 'futuro', email: 'sophia.art@example.com', text: "Me pregunto cómo afectará la IA al arte tradicional japonés. ¿Veremos robots haciendo Shodo?" },
        { slug: 'futuro', email: 'elena.travel@example.com', text: "El turismo espacial desde Japón suena increíble. ¡Ojalá vivir para verlo!" },

        // JDM
        { slug: 'jdm', email: 'marcos.jdm@example.com', text: "El R34 es el rey indiscutible, pero el sonido de un rotativo 13B no tiene comparación. ¡Vivan los 90s japoneses! La época dorada del motor." },
        { slug: 'jdm', email: 'david.game@example.com', text: "Initial D me hizo amar el AE86. Es increíble cómo un anime pudo influir tanto en la cultura automovilística mundial." },
        { slug: 'jdm', email: 'elena.travel@example.com', text: "No entiendo mucho de coches, pero la estética de esa época tiene un encanto especial, muy nostálgico. Las luces de neón y esos diseños son arte." },
        { slug: 'jdm', email: 'sophia.art@example.com', text: "El diseño del RX-7 es atemporal, esas curvas son pura escultura en movimiento." },
        { slug: 'jdm', email: 'lucia.history@example.com', text: "Es curioso cómo una subcultura 'ilegal' se convirtió en un símbolo nacional tan fuerte." },

        // ANIME-MANGA
        { slug: 'anime-manga', email: 'david.game@example.com', text: "Akira cambió mi vida. La animación tradicional tenía un alma que el CGI a veces no logra capturar. Neo Tokyo sigue siendo el referente estético." },
        { slug: 'anime-manga', email: 'sophia.art@example.com', text: "El viaje de Chihiro es una obra maestra del color y la composición. Miyazaki es un pintor en movimiento, cada frame es un cuadro." },
        { slug: 'anime-manga', email: 'lucia.history@example.com', text: "Es interesante cómo el manga shojo y josei abordan temas emocionales complejos que el cómic occidental a veces ignora. Nana es un gran ejemplo." },
        { slug: 'anime-manga', email: 'marcos.jdm@example.com', text: "Evangelion me dejó traumado de pequeño pero ahora entiendo la profundidad filosófica que tiene. Hideaki Anno es un genio." },
        { slug: 'anime-manga', email: 'elena.travel@example.com', text: "Quiero ir al museo Ghibli, dicen que es mágico." },

        // VIDEOJUEGOS
        { slug: 'videojuegos', email: 'david.game@example.com', text: "La época de SNES vs Mega Drive fue la mejor guerra de consolas. Ahora todo son teraflops, antes era pura jugabilidad y creatividad con limitaciones." },
        { slug: 'videojuegos', email: 'marcos.jdm@example.com', text: "Sega siempre tuvo ese toque rebelde que me encantaba. Sonic era actitud pura comparado con Mario." },
        { slug: 'videojuegos', email: 'elena.travel@example.com', text: "A mí me encantaba jugar al Mario Kart con mis hermanos. Nintendo sabe cómo unir a la gente en el salón de casa como nadie." },
        { slug: 'videojuegos', email: 'lucia.history@example.com', text: "Es impresionante cómo Nintendo empezó haciendo cartas Hanafuda hace más de un siglo. Menuda evolución." },
        { slug: 'videojuegos', email: 'sophia.art@example.com', text: "El pixel art de los 16 bits sigue siendo insuperable a nivel estético para mí. Tiene un encanto que el 4K no puede replicar." },

        // TOKYO
        { slug: 'tokyo', email: 'elena.travel@example.com', text: "Shibuya es una locura, pero perderse por las callejuelas de Golden Gai es donde encuentras la verdadera esencia de la noche tokiota." },
        { slug: 'tokyo', email: 'marcos.jdm@example.com', text: "Akihabara ha cambiado mucho, pero sigue siendo el paraíso para encontrar piezas raras de electrónica. Podría pasarme días en Radio Kaikan." },
        { slug: 'tokyo', email: 'sophia.art@example.com', text: "Me encanta el contraste del templo Senso-ji en Asakusa con el SkyTree de fondo. Pasado y futuro en una sola foto." },
        { slug: 'tokyo', email: 'lucia.history@example.com', text: "El Palacio Imperial es un oasis de paz en medio del caos de cemento. Increíble que se mantenga así." },
        { slug: 'tokyo', email: 'david.game@example.com', text: "Ir a los recreativos de Taito Station en Shinjuku es peregrinación obligatoria para cualquier gamer." },

        // KIOTO
        { slug: 'kioto', email: 'sophia.art@example.com', text: "Kinkaku-ji es impresionante, pero el templo de plata (Ginkaku-ji) tiene una belleza wabi-sabi que me transmite mucha más paz interior." },
        { slug: 'kioto', email: 'elena.travel@example.com', text: "Caminar por Gion al atardecer esperando ver una Geisha es mágico. La atmósfera es de otro siglo, como si el tiempo se hubiera detenido." },
        { slug: 'kioto', email: 'lucia.history@example.com', text: "La preservación histórica de Kioto debería ser ejemplo para muchas otras ciudades del mundo. Es un museo vivo al aire libre." },
        { slug: 'kioto', email: 'sophia.art@example.com', text: "El bosque de bambú de Arashiyama es sobrecogedor, sobre todo cuando sopla el viento y escuchas el sonido de los tallos chocando." },
        { slug: 'kioto', email: 'david.game@example.com', text: "Me recuerda a escenarios de Sekiro o Ghost of Tsushima. Es increíble estar allí de verdad." },

        // OSAKA
        { slug: 'osaka', email: 'elena.travel@example.com', text: "¡El Takoyaki de Dotonbori es otro nivel! Y la gente es muchísimo más abierta y divertida que en Tokio, se nota el ambiente diferente." },
        { slug: 'osaka', email: 'marcos.jdm@example.com', text: "Shinsekai tiene ese aire retro-futurista decadente que me fascina. Parece un escenario de película de los años 80." },
        { slug: 'osaka', email: 'david.game@example.com', text: "El castillo de Osaka es imponente, aunque por dentro sea un museo moderno con ascensor, por fuera impone el mismo respeto que hace siglos." },
        { slug: 'osaka', email: 'lucia.history@example.com', text: "La historia de Toyotomi Hideyoshi y el castillo es fundamental para entender la unificación de Japón." },
        { slug: 'osaka', email: 'sophia.art@example.com', text: "Los neones de Dotonbori reflejados en el canal por la noche son una de las imágenes más icónicas de Japón." },

        // SHODO
        { slug: 'shodo', email: 'sophia.art@example.com', text: "Llevo practicando Shodo un año y es increíblemente difícil controlar la presión del pincel. Es meditación pura, te obliga a estar en el presente." },
        { slug: 'shodo', email: 'lucia.history@example.com', text: "Es hermoso cómo cada caracter (Kanji) tiene tanto significado y su propia historia etimológica que se remonta a China." },
        { slug: 'shodo', email: 'elena.travel@example.com', text: "Me traje un juego de caligrafía de mi viaje, aunque solo lo uso para decorar, es una obra de arte en sí mismo. La estética japonesa es inigualable." },
        { slug: 'shodo', email: 'sophia.art@example.com', text: "El concepto de 'Mushin' o mente vacía al escribir es fascinante. Dejar que el pincel fluya sin pensar." },
        { slug: 'shodo', email: 'marcos.jdm@example.com', text: "Incluso en los logotipos de marcas japonesas modernas se ve la influencia del trazo del pincel. Es la base de su diseño gráfico." },
    ];

    for (const c of commentsData) {
        // Encontramos los IDs necesarios
        const user = await prisma.user.findUnique({ where: { email: c.email } });
        const article = await prisma.article.findUnique({ where: { slug: c.slug } });

        if (user && article) {
            // Upsert para evitar duplicados si se corre el seed varias veces
            // Usamos @@unique([userId, articleId])
            const randomDate = getRandomDateWithinLastMonth();
            await prisma.comment.upsert({
                where: {
                    userId_articleId: {
                        userId: user.id,
                        articleId: article.id
                    }
                },
                update: {
                    textComment: c.text,
                    createdAt: randomDate
                },
                create: {
                    textComment: c.text,
                    userId: user.id,
                    articleId: article.id,
                    createdAt: randomDate
                }
            });
        }
    }
    console.log('✅ Comments ready');

    console.log('✅ Seeding finished successfully.')
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


export interface Quote {
    text: string;
    author: string;
}

export interface Principle {
    title: string;
    description: string;
}

export const HOME_QUOTES: Quote[] = [
    {
        text: "Permanecer indiferente ante las palabras que oíste, y eliminar la presunción de tu corazón, es el camino de la sabiduría.",
        author: "Miyamoto Musashi"
    },
    {
        text: "La mente de un principiante es como un vaso vacío; siempre listo para recibir, nunca rechazando nada.",
        author: "Shunryu Suzuki"
    },
    {
        text: "No busques seguridades en el cambio, sino que encuentra el cambio en la seguridad.",
        author: "Katsuki Sekida"
    },
    {
        text: "Si un hombre no persigue lo que desea, ¿qué otra cosa puede buscar en la vida?",
        author: "Yukio Mishima"
    },
    {
        text: "Si no seguís un auténtico camino hasta el final, una pequeña maldad al principio se convierte en una gran perversión.",
        author: "Miyamoto Musashi"
    },
    {
        text: "No necesitas una razón para hacer lo que es correcto.",
        author: "Osamu Dazai"
    },
    {
        text: "La mente es como el agua. Cuando está tranquila y en calma, puede reflejar la belleza del mundo.",
        author: "Proverbio japonés"
    },
    {
        text: "La vida es como una caminata, en la que debemos saber cuándo detenernos y disfrutar del paisaje.",
        author: "Kenzaburō Ōe"
    }
];

export const HOME_PRINCIPLES: Principle[] = [
    {
        title: "Gobierno",
        description: "Japón es una monarquía constitucional y parlamentaria. El Emperador es el jefe de Estado, pero sus poderes son principalmente ceremoniales. El primer ministro es el jefe de gobierno. El sistema legislativo está compuesto por la Dieta Nacional, que consta de la Cámara de Representantes y la Cámara de Consejeros."
    },
    {
        title: "Economía",
        description: "Japón tiene una de las economías más grandes del mundo, conocida por su tecnología avanzada y su industria manufacturera. Es líder en sectores como la electrónica, la automoción y la robótica. También es reconocido por marcas globales como Toyota, Sony y Panasonic. Japón es un importante exportador y su economía se basa en la innovación y la calidad."
    },
    {
        title: "Idioma",
        description: "El japonés es el idioma oficial de Japón y se habla en todo el país. Utiliza tres sistemas de escritura: hiragana, katakana y kanji. Además del japonés, el inglés se enseña ampliamente y se utiliza en el ámbito comercial y turístico, especialmente en las áreas urbanas."
    },
    {
        title: "Alimentación",
        description: "La comida japonesa es conocida por su frescura, sabor y presentación. Se basa en ingredientes como el arroz, el pescado, el marisco, el tofu, las algas y las verduras. Algunos platos típicos incluyen sushi, sashimi, ramen, tempura, yakitori y okonomiyaki. La cocina japonesa se caracteriza por su atención al detalle y su estética."
    },
    {
        title: "Festivales",
        description: "Japón tiene una rica tradición de festivales y celebraciones a lo largo del año. Algunos de los más importantes incluyen el Hanami (observación de flores de cerezo en primavera), el Tanabata Matsuri (Festival de las Estrellas en verano), el Obon (festival budista de honrar a los espíritus ancestrales en verano), y el Shichi-Go-San (festival de los siete-cinco-tres en otoño). Estos festivales son ocasiones para celebrar, disfrutar de la comida y honrar las tradiciones."
    }
];

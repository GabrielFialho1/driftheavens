export interface Track {
  id: number
  name: string
  description: string
  image: string
  location?: string
  difficulty?: 'Street' | 'Comp'
}

export const tracks: Track[] = [
  {
    id: 1,
    name: "VDC YZ West",
    description: "Pista técnica com curvas fechadas e retas longas, ideal para ultrapassagens. Superfície de alta aderência.",
    image: "/img/tracks/kalinago.png",
    location: "West Circuit",
    difficulty: "Comp"
  },
  {
    id: 2,
    name: "EDN Velocitta",
    description: "Circuito rápido com retas extensas e poucas curvas. Desafia a potência e aerodinâmica dos veículos.",
    image: "/img/tracks/midohio.png",
    location: "Speed Complex",
    difficulty: "Street"
  },
  {
    id: 3,
    name: "VDC Rockingham",
    description: "Pista oval com curvas inclinadas, testando a consistência e coragem dos pilotos em altas velocidades.",
    image: "/img/tracks/brno.png",
    location: "Oval Arena",
    difficulty: "Comp"
  },
  {
    id: 4,
    name: "Spost LS",
    description: "Circuito urbano com ruas estreitas e curvas cegas. Exige precisão e controle total do veículo.",
    image: "/img/tracks/spotls.png",
    location: "Street Circuit",
    difficulty: "Comp"
  },
  {
    id: 5,
    name: "VDC Autopolis",
    description: "Pista montanhosa com grandes desníveis e combinação de curvas rápidas e lentas. Desafia todas as habilidades.",
    image: "/img/tracks/otarumi.png",
    location: "Mountain Circuit",
    difficulty: "Comp"
  },
  {
    id: 6,
    name: "VDC Misano",
    description: "Circuito italiano com curvas técnicas e seções rápidas. Histórica e desafiadora para todos os pilotos.",
    image: "/img/tracks/brno.png",
    location: "Italian Circuit",
    difficulty: "Comp"
  },
  {
    id: 7,
    name: "VDC Atlanta",
    description: "Pista americana com longas retas e curvas em chicane. Equilíbrio entre velocidade e técnica.",
    image: "/img/tracks/kalinago.png",
    location: "American Speedway",
    difficulty: "Street",
  },
  {
    id: 8,
    name: "VDC Sturup",
    description: "Circuito sueco com curvas rápidas e técnicas. Superfície variada que muda com as condições climáticas.",
    image: "/img/tracks/otarumi.png",
    location: "Swedish Circuit",
    difficulty: "Comp",
  },
  {
    id: 9,
    name: "Spot LV14",
    description: "Pista desértica com areia fofa e curvas perigosas. Testa a adaptação e controle em condições extremas.",
    image: "/img/tracks/spotlv.png",
    location: "Desert Circuit",
    difficulty: "Comp",
  },
  {
    id: 10,
    name: "VDC Bikernieki",
    description: "Circuito báltico com curvas técnicas e retas curtas. Exige frenagem potente e aceleração rápida.",
    image: "/img/tracks/brno.png",
    location: "Baltic Circuit",
    difficulty: "Comp",
  }
]

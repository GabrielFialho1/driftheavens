export interface Tournament {
  id: number
  title: string
  date: string
  time?: string 
  background: string
  resultImage?: string
  description: string
  isActive?: boolean
  youtubeLive?: string
  challongeLink?: string
  top3Winners?: string[]
}

export const tournaments: Tournament[] = [
  {
    id: 1,
    title: "Mini-Camp - VDC YZ West",
    date: "19/11/2023",
    time:"12:00",
    background: "/img/bg4.png",
    resultImage: "/img/podium/podium1.png",
    description: "Mini camp, campeonato não oficial com intuito de entretenimento.",
    isActive: true,
    youtubeLive: "https://www.youtube.com/watch?v=example1",
    challongeLink: "https://challonge.com/pt/soioo0a0",
    top3Winners: ["FC|RaZaO", "FC|Aurora", "avance*godz"]
  },
  {
    id: 2,
    title: "Oficial - EDN Velocitta #3",
    date: "10/09/2023",
    time:"14:00",
    background: "/img/bg5.png",
    resultImage: "/img/podium/podium2.png",
    description: "Campeonato Oficial, terceira etapa de 2023 na pista de Velocitta.",
    isActive: false,
    youtubeLive: "https://youtu.be/lKLDSZlxu0c",
    challongeLink: "https://challonge.com/pt/2cshu5ui",
    top3Winners: ["FC|RaZaO", "RJ", "extreme'pocoyo"]
  },
  {
    id: 3,
    title: "Mini-Camp - VDC Rockingham",
    date: "02/07/2023",
    background: "/img/bg3.png",
    resultImage: "/img/podium/podium3.png",
    description: "Mini camp, campeonato não oficial com intuito de entretenimento.",
    isActive: false,
    youtubeLive: "https://www.youtube.com/watch?v=example3",
    challongeLink: "https://challonge.com/pt/vdc_rockingham",
    top3Winners: ["liberty//detroit", "avance.godz", "butterfly"]
  },
  {
    id: 4,
    title: "Mini-Camp - Spost LS (Fisrt Person)",
    date: "27/08/2023",
    background: "/img/bg6.png",
    resultImage: "/img/podium/podium4.png",
    description: "Mini camp, campeonato em primeira pessoa não oficial com intuito de entretenimento.",
    isActive: false,
    youtubeLive: "https://www.youtube.com/watch?v=example4",
    challongeLink: "https://challonge.com/pt/it3sa4aj",
    top3Winners: ["FC|RaZaO", "liberty.FlokinN", "extreme'pocoyo"]
  },
  {
    id: 5,
    title: "Oficial - VDC Autopolis #2",
    date: "06/08/2023",
    background: "/img/bg7.png",
    resultImage: "/img/podium/podium5.png",
    description: "Campeonato Oficial, segunda etapa de 2023 na pista de Autopolis.",
    isActive: false,
    youtubeLive: "https://youtu.be/7ZF9e8neat0",
    challongeLink: "https://challonge.com/pt/csqs0xjw",
    top3Winners: ["liberty//detroit", "liberty.SkOL", "extreme'pocoyo"]
  },
  {
    id: 6,
    title: "Oficial - VDC Misano #1",
    date: "18/06/2023",
    background: "/img/bg8.png",
    resultImage: "/img/podium/podium6.png",
    description: "Campeonato Oficial, primeira etapa de 2023 na pista de Misano.",
    isActive: false,
    youtubeLive: "https://youtu.be/1-udIAP607I",
    challongeLink: "https://challonge.com/pt/2o28q7qh",
    top3Winners: ["liberty//detroit", "avance.fatal", "avance.fokz"]
  },
  {
    id: 7,
    title: "Mini-Camp - VDC Atlanta ",
    date: "10/06/2023",
    background: "/img/bg9.png",
    resultImage: "/img/podium/podium7.png",
    description: "Mini camp, campeonato não oficial com intuito de entretenimento.",
    isActive: false,
    youtubeLive: "https://www.youtube.com/watch?v=example7",
    challongeLink: "https://challonge.com/pt/4qg2e5yy",
    top3Winners: ["FC|RaZaO", "FC|tkr", "extreme'pocoyo"]
  },
  {
    id: 8,
    title: "Mini-Camp - YZ West ",
    date: "04/06/2023",
    background: "/img/bg4.png",
    resultImage: "/img/podium/podium8.png",
    description: "Mini camp, campeonato não oficial com intuito de entretenimento.",
    isActive: false,
    youtubeLive: "https://www.youtube.com/watch?v=example8",
    challongeLink: "https://challonge.com/pt/8f8oy1dz",
    top3Winners: ["FC|RaZaO", "avance.fokz", "extreme'pocoyo"]
  },
  {
    id: 9,
    title: "Mini-Camp - VDC Sturup ",
    date: "07/05/2023",
    background: "/img/bg5.png",
    resultImage: "/img/podium/podium9.png",
    description: "Mini camp, campeonato não oficial com intuito de entretenimento.",
    isActive: false,
    youtubeLive: "https://www.youtube.com/watch?v=example9",
    challongeLink: "https://challonge.com/pt/twbgy0s4",
    top3Winners: ["FC|tkr", "FC|RaZaO", "avance.fokz"]
  },
  {
    id: 10,
    title: "Mini-Camp - Spot LV14 ",
    date: "11/03/2023",
    background: "/img/bg6.png",
    resultImage: "/img/podium/podium10.png",
    description: "Mini camp, campeonato não oficial com intuito de entretenimento.",
    isActive: false,
    youtubeLive: "https://www.youtube.com/watch?v=example10",
    challongeLink: "https://challonge.com/pt/lgnq3113",
    top3Winners: ["avance.fokz", "avance.fatal", "liberty.SkOL"]
  },
  {
    id: 11,
    title: "Mini-Camp - VDC Vikernieki ",
    date: "09/03/2023",
    background: "/img/bg7.png",
    resultImage: "/img/podium/podium11.png",
    description: "Mini camp, campeonato não oficial com intuito de entretenimento.",
    isActive: false,
    youtubeLive: "https://www.youtube.com/watch?v=example11",
    challongeLink: "https://challonge.com/pt/xn1qyh9g",
    top3Winners: ["liberty//detroit", "RJ", "Digdin"]
  }
]

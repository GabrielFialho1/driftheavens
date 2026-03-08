export interface Car {
  id: number
  modelId: number  // ID do modelo no banco de dados
  name: string
  description: string
  image: string
  price?: string
}

export const cars: Car[] = [
  {
    id: 1,
    modelId: 565,  // BMW E92
    name: "BMW E92",
    description: "Veículo esportivo de alta performance com design aerodinâmico e motor potente para experiências emocionantes na pista.",
    image: "/img/cars/1.png"
  },
  {
    id: 2,
    modelId: 411,  // BMW F22
    name: "BMW F22",
    description: "Sedan luxuoso com tecnologia de ponta, conforto excepcional e acabamento premium para os mais exigentes.",
    image: "/img/cars/2.png"
  },
  {
    id: 3,
    modelId: 541,  // Corvette C7
    name: "Corvette C7",
    description: "Compacto ágil e eficiente, perfeito para ambientes urbanos com baixo consumo e manutenção econômica.",
    image: "/img/cars/3.png"
  },
  {
    id: 4,
    modelId: 533,  // Ferrari 458
    name: "Ferrari 458",
    description: "SUV robusto com tração 4x4, espaço amplo e versatilidade para qualquer tipo de terreno ou aventura.",
    image: "/img/cars/4.png"
  },
  {
    id: 5,
    modelId: 558,  // Mustang GT
    name: "Mustang GT",
    description: "SUV robusto com tração 4x4, espaço amplo e versatilidade para qualquer tipo de terreno ou aventura.",
    image: "/img/cars/5.png"
  },
  {
    id: 6,
    modelId: 478,  // Mazda RX7
    name: "Mazda RX7",
    description: "SUV robusto com tração 4x4, espaço amplo e versatilidade para qualquer tipo de terreno ou aventura.",
    image: "/img/cars/6.png"
  },
  {
    id: 7,
    modelId: 557,  // Mazda RX8
    name: "Mazda RX8",
    description: "SUV robusto com tração 4x4, espaço amplo e versatilidade para qualquer tipo de terreno ou aventura.",
    image: "/img/cars/7.png"
  },
  {
    id: 8,
    modelId: 410,  // Mitsubishi Lancer Evo
    name: "Lancer Evo",
    description: "SUV robusto com tração 4x4, espaço amplo e versatilidade para qualquer tipo de terreno ou aventura.",
    image: "/img/cars/8.png"
  },
  {
    id: 9,
    modelId: 543,  // Nissan 400Z
    name: "Nissan 400Z",
    description: "SUV robusto com tração 4x4, espaço amplo e versatilidade para qualquer tipo de terreno ou aventura.",
    image: "/img/cars/9.png"
  },
  {
    id: 10,
    modelId: 560,  // Nissan GTR R35
    name: "GTR R35",
    description: "SUV robusto com tração 4x4, espaço amplo e versatilidade para qualquer tipo de terreno ou aventura.",
    image: "/img/cars/10.png"
  }
]

// Função para buscar imagem pelo modelId
export function getCarImageByModelId(modelId: number): string {
  const car = cars.find(car => car.modelId === modelId)
  return car ? car.image : "/img/cars/default.png"
}

// Função para buscar nome pelo modelId
export function getCarNameByModelId(modelId: number): string {
  const car = cars.find(car => car.modelId === modelId)
  return car ? car.name : `Model ${modelId}`
}

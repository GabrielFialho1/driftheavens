import Image from 'next/image'
import { Car } from '@/lib/cars'

interface CarCardProps {
  car: Car
  reversed?: boolean
}

export function CarCard({ car, reversed = false }: CarCardProps) {
  return (
    <div className={`flex items-center justify-between gap-12 ${reversed ? 'flex-row-reverse' : ''}`}>
      <div className="flex-1 space-y-6">
        <h2 className="text-5xl font-bold text-white">{car.name}</h2>
        <p className="text-lg text-gray-200 leading-relaxed max-w-md">
          {car.description}
        </p>
      </div>
      
      <div className="flex-1 flex justify-center">
        <div className="bg-zinc-500 rounded-lg w-full max-w-md h-80 flex items-center justify-center">
          <Image
            src={car.image}
            alt={car.name}
            width={400}
            height={320}
            className="rounded-lg object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/img/placeholder-car.jpg';
            }}
          />
        </div>
      </div>
    </div>
  )
}

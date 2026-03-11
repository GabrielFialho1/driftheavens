'use client'

import Image from 'next/image'
import { Button } from './Button'
import { Vehicle } from '@/types/database'
import { getCarImageByModelId, getCarNameByModelId } from '@/lib/cars'

interface VehicleWithSeller extends Vehicle {
  seller_name?: string
  price?: number
}

interface VehicleCardProps {
  vehicle: VehicleWithSeller
  isMarketplace?: boolean
  isListed?: boolean
  onViewDetails?: (vehicle: VehicleWithSeller) => void
  onListVehicle?: (vehicle: Vehicle) => void
  onRemoveFromMarketplace?: (vehicleId: number) => void
}

export function VehicleCard({
  vehicle,
  isMarketplace = false,
  isListed = false,
  onViewDetails,
  onListVehicle,
  onRemoveFromMarketplace
}: VehicleCardProps) {
  const getStickerCount = () => {
    try {
      const stickers = typeof vehicle.stickers === 'string' ? JSON.parse(vehicle.stickers) : vehicle.stickers
      return Array.isArray(stickers) ? stickers.length : 0
    } catch {
      return 0
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = "/img/cars/default.png"
  }

  return (
    <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-lg p-6 hover:border-red-500/50 transition-colors">
      <div className="relative h-40 mb-4">
        <Image
          src={getCarImageByModelId(Number(vehicle.model))}
          alt={getCarNameByModelId(Number(vehicle.model))}
          fill
          className="object-cover rounded-lg"
          onError={handleImageError}
        />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">
        {getCarNameByModelId(Number(vehicle.model))}
      </h3>
      
      <div className="space-y-2 text-sm text-gray-300 mb-4">
        {isMarketplace && vehicle.seller_name && (
          <p><span className="text-gray-400">Vendedor:</span> {vehicle.seller_name}</p>
        )}
        <p><span className="text-gray-400">Quilometragem:</span> {vehicle.mileage} km</p>
        {isMarketplace && vehicle.price && (
          <p><span className="text-gray-400">Preço:</span> <span className="text-red-400 font-bold">${vehicle.price}</span></p>
        )}
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-300">
          <span className="text-gray-400">Stickers:</span> {getStickerCount()}
        </p>
      </div>

      {isMarketplace ? (
        <Button
          onClick={() => onViewDetails?.(vehicle)}
          className="w-full"
        >
          Ver Completo
        </Button>
      ) : isListed ? (
        <Button
          onClick={() => onRemoveFromMarketplace?.(vehicle._id)}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          Remover do Marketplace
        </Button>
      ) : (
        <Button
          onClick={() => onListVehicle?.(vehicle)}
          className="w-full"
          variant="outline-transparent"
        >
          Listar no Marketplace
        </Button>
      )}
    </div>
  )
}

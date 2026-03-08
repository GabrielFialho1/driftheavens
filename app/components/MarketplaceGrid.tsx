'use client'

import { VehicleCard } from './VehicleCard'
import { Vehicle } from '@/types/database'

interface VehicleWithSeller extends Vehicle {
  seller_name?: string
  price?: number
}

interface MarketplaceGridProps {
  vehicles: VehicleWithSeller[]
  isMarketplace?: boolean
  listedVehicles?: Set<number>
  onViewDetails?: (vehicle: VehicleWithSeller) => void
  onListVehicle?: (vehicle: Vehicle) => void
  onRemoveFromMarketplace?: (vehicleId: number) => void
  emptyMessage?: {
    title: string
    subtitle: string
  }
}

export function MarketplaceGrid({
  vehicles,
  isMarketplace = false,
  listedVehicles = new Set(),
  onViewDetails,
  onListVehicle,
  onRemoveFromMarketplace,
  emptyMessage
}: MarketplaceGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-400 py-12">
        <p className="text-lg mb-2">
          {emptyMessage?.title || (isMarketplace ? 'Nenhum veículo à venda no momento' : 'Você não possui veículos')}
        </p>
        <p className="text-sm">
          {emptyMessage?.subtitle || 
            (isMarketplace 
              ? 'Quando alguém colocar um veículo à venda, ele aparecerá aqui!' 
              : 'Seus veículos aparecerão aqui quando você os adquirir no jogo!'
            )
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle, index) => {
        const isListed = !isMarketplace && listedVehicles.has(vehicle._id)
        
        return (
          <VehicleCard
            key={`${isMarketplace ? 'marketplace' : 'my'}-vehicle-${vehicle._id || index}`}
            vehicle={vehicle}
            isMarketplace={isMarketplace}
            isListed={isListed}
            onViewDetails={onViewDetails}
            onListVehicle={onListVehicle}
            onRemoveFromMarketplace={onRemoveFromMarketplace}
          />
        )
      })}
    </div>
  )
}

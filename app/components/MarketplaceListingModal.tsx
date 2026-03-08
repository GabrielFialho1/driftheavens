'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from './Button'
import { getCarImageByModelId, getCarNameByModelId } from '@/lib/cars'

interface MarketplaceListingModalProps {
  isOpen: boolean
  onClose: () => void
  listing: {
    id: number
    vehicle_id: number
    seller_id: number
    name: string
    price: number
    description: string
    images: string[]
    listed_at: string
    status: string
    model: number
    mileage: number
    stickers: string | object
    seller_name: string
  }
  onPurchaseVehicle: (vehicleId: number, price: number) => void
}

export function MarketplaceListingModal({ 
  isOpen, 
  onClose, 
  listing, 
  onPurchaseVehicle 
}: MarketplaceListingModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!isOpen) return null

  const handlePurchase = () => {
    onPurchaseVehicle(listing.vehicle_id, listing.price)
    onClose()
  }

  const getAllImages = () => {
    // Se houver imagens do anunciante, usa elas
    if (listing.images && listing.images.length > 0) {
      return listing.images
    }
    
    // Caso contrário, usa apenas a imagem genérica do modelo
    return [getCarImageByModelId(listing.model)]
  }

  const allImages = getAllImages()

  const getCarName = () => {
    return getCarNameByModelId(listing.model)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 border border-red-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-500">{listing.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de Imagens - Estilo Anúncios de Celulares */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div className="relative h-80 rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={allImages[selectedImageIndex]}
                alt={`${listing.name} - Imagem ${selectedImageIndex + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/img/cars/default.png"
                }}
              />
            </div>
            
            {/* Miniaturas - Grid Abaixo (Sempre Visível) */}
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === index 
                      ? 'border-red-500 ring-2 ring-red-500/50' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Anúncio */}
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Informações do Veículo</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <span className="text-gray-400">Modelo:</span> {getCarName()}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Quilometragem:</span> {listing.mileage.toLocaleString('pt-BR')} km
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Vendedor:</span> {listing.seller_name}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Anunciado em:</span> {formatDate(listing.listed_at)}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Stickers:</span> {(() => {
                    try {
                      const stickers = typeof listing.stickers === 'string' ? JSON.parse(listing.stickers) : listing.stickers
                      return Array.isArray(stickers) ? stickers.length : 0
                    } catch {
                      return 0
                    }
                  })()}
                </p>
              </div>
            </div>

            {/* Preço */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-gray-400 text-sm">Valor de Venda</span>
                <span className="text-3xl font-bold text-white">{formatPrice(listing.price)}</span>
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Descrição</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{listing.description}</p>
            </div>

            {/* Botão de Compra */}
            <Button
              onClick={handlePurchase}
              className="w-full text-lg py-4"
            >
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

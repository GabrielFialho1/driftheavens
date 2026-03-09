'use client'

import { useState } from 'react'
import { Button } from './Button'
import Image from 'next/image'

interface ListVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: {
    _id: number
    model: string | number
    mileage: number
    stickers: string | object
  }
  onListVehicle: (data: {
    vehicleId: number
    name: string
    price: number
    description: string
    images: string[]
  }) => Promise<void>
}

export function ListVehicleModal({ isOpen, onClose, vehicle, onListVehicle }: ListVehicleModalProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          setImages(prev => [...prev, result])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('=== ListVehicleModal handleSubmit ===')
    console.log('Vehicle:', vehicle)
    console.log('Vehicle ID:', vehicle._id)
    
    if (!name || !price || !description) {
      setError('Por favor, preencha todos os campos')
      return
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Por favor, insira um preço válido')
      return
    }

    setLoading(true)
    setError('')

    try {
      await onListVehicle({
        vehicleId: vehicle._id,
        name,
        price: priceNum,
        description,
        images
      })
      
      // Reset form
      setName('')
      setPrice('')
      setDescription('')
      setImages([])
      onClose()
    } catch (err) {
      console.error('Error listing vehicle:', err)
      setError('Erro ao colocar veículo à venda')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 border border-red-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-500">Colocar à Venda</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Anúncio *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Ex: Lancer Evo Tuning Completo"
              required
            />
          </div>

          {/* Imagens */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Imagens do Veículo
            </label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-24">
                    <Image
                      src={image}
                      alt={`Imagem ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="border-2 border-dashed border-gray-600 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-red-500 transition-colors">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs text-gray-400">Adicionar Imagem</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-400">Máximo 6 imagens. A primeira será a capa.</p>
          </div>

          {/* Preço */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Valor de Venda ($) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="1000"
              min="1"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Descreva seu veículo, modificações, estado de conservação..."
              rows={4}
              required
            />
          </div>

          {/* Informações do Veículo */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Informações do Veículo</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Model: {vehicle.model}</p>
              <p>Quilometragem: {vehicle.mileage} km</p>
              <p>Stickers: {(() => {
                try {
                  const stickers = typeof vehicle.stickers === 'string' ? JSON.parse(vehicle.stickers) : vehicle.stickers
                  return Array.isArray(stickers) ? stickers.length : 0
                } catch {
                  return 0
                }
              })()}</p>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Colocar à Venda'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

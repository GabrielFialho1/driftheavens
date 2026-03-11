'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { TabNavigation } from '@/app/components/TabNavigation'
import { MarketplaceGrid } from '@/app/components/MarketplaceGrid'
import { ListVehicleModal } from '@/app/components/ListVehicleModal'
import { MarketplaceListingModal } from '@/app/components/MarketplaceListingModal'
import { useMarketplace } from '@/hooks/useMarketplace'
import { Vehicle } from '@/types/database'
import { Wallet } from 'lucide-react'

interface VehicleWithSeller extends Vehicle {
  seller_name?: string
  price?: number
}

// Tipo auxiliar para dados estendidos do marketplace
type ExtendedVehicleData = VehicleWithSeller & {
  id?: number
  vehicle_id?: number
  seller_id?: number
  name?: string
  description?: string
  images?: string[]
  listed_at?: string
  status?: string
}

interface MarketplaceListing extends Omit<VehicleWithSeller, 'model' | 'price' | 'seller_name'> {
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
  seller_name: string
}

export default function MarketplacePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'my-vehicles' | 'marketplace'>('marketplace')
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isMarketplaceModalOpen, setIsMarketplaceModalOpen] = useState(false)
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null)

  const {
    myVehicles,
    marketplaceVehicles,
    loading,
    error,
    listedVehicles,
    handleListVehicle,
    handleRemoveFromMarketplace,
    purchaseVehicle
  } = useMarketplace()

  const openListModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setIsListModalOpen(true)
  }

  const openMarketplaceModal = (listing: VehicleWithSeller) => {
    // Converter VehicleWithSeller para MarketplaceListing
    const extendedListing = listing as ExtendedVehicleData
    const marketplaceListing: MarketplaceListing = {
      ...listing,
      id: extendedListing.id || 0,
      vehicle_id: listing._id,
      seller_id: extendedListing.seller_id || 0,
      name: extendedListing.name || '',
      price: listing.price || 0,
      description: extendedListing.description || '',
      images: extendedListing.images || [],
      listed_at: extendedListing.listed_at || '',
      status: extendedListing.status || 'active',
      model: Number(listing.model),
      seller_name: listing.seller_name || ''
    }
    setSelectedListing(marketplaceListing)
    setIsMarketplaceModalOpen(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-[calc(100vh-200px)]">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="text-red-500 text-2xl">⚠️</div>
              <div>
                <h3 className="text-red-400 font-bold text-lg">Acesso Restrito</h3>
                <p className="text-red-300">Você precisa estar logado para acessar o marketplace de veículos.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-20 left-0 right-0 h-80 bg-linear-to-b from-red-900/20 to-black -z-10" />
      <Header />
      <div className="max-w-7xl z-10 mx-auto px-6 py-12 pt-32 min-h-[calc(100vh-200px)]">
        <div className="flex justify-between items-center mb-8">
          <div></div>
          {user && (
            <div className="bg-black/60 border border-red-500/30 rounded-lg px-4 py-2">
              <span className="text-red-400 font-bold text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0 0l-6-6 6-6 6 12 12M5 13l6 6 6-6 6 12" />
                </svg>
                Saldo: ${user.money.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-15 text-center">
          Marketplace de Veículos
        </h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {loading ? (
          <div className="text-center text-white py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <p className="mt-4">Carregando...</p>
          </div>
        ) : (
          <>
            {activeTab === 'marketplace' && (
              <MarketplaceGrid
                vehicles={marketplaceVehicles}
                isMarketplace={true}
                onViewDetails={openMarketplaceModal}
              />
            )}

            {activeTab === 'my-vehicles' && (
              <MarketplaceGrid
                vehicles={myVehicles}
                isMarketplace={false}
                listedVehicles={listedVehicles}
                onListVehicle={openListModal}
                onRemoveFromMarketplace={handleRemoveFromMarketplace}
              />
            )}
          </>
        )}
      </div>
      
      <Footer />
      
      {selectedVehicle && (
        <ListVehicleModal
          isOpen={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
          vehicle={selectedVehicle}
          onListVehicle={handleListVehicle}
        />
      )}
      
      {selectedListing && (
        <MarketplaceListingModal
          isOpen={isMarketplaceModalOpen}
          onClose={() => setIsMarketplaceModalOpen(false)}
          listing={selectedListing}
          onPurchaseVehicle={purchaseVehicle}
        />
      )}
    </div>
  )
}

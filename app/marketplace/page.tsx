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

export default function MarketplacePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'my-vehicles' | 'marketplace'>('marketplace')
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isMarketplaceModalOpen, setIsMarketplaceModalOpen] = useState(false)
  const [selectedListing, setSelectedListing] = useState<any>(null)

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

  const openMarketplaceModal = (listing: any) => {
    setSelectedListing(listing)
    setIsMarketplaceModalOpen(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-12 min-h-[calc(100vh-200px)]">
          <div className="text-center text-white">
            <p className="text-gray-300">Faça login para acessar o marketplace</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-20 left-0 right-0 h-80 bg-gradient-to-b from-red-900/20  to-black -z-10" />
      <Header />
      <div className="max-w-7xl z-10 mx-auto px-6 py-12 pt-32 min-h-[calc(100vh-200px)]">
        
        <h1 className="text-4xl lg:text-5xl pt-10 font-bold text-white mb-15 text-center">
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

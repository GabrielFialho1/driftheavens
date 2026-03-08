'use client'

import { UserInfoHeader } from './UserInfoHeader'

interface MarketplaceHeaderProps {
  error?: string
}

export function MarketplaceHeader({ error }: MarketplaceHeaderProps) {
  return (
    <>
      <div className="mb-8">
        <UserInfoHeader />
      </div>
      
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Marketplace de Veículos
      </h1>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
    </>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Vehicle } from '@/types/database'

interface VehicleWithSeller extends Vehicle {
  seller_name?: string
  price?: number
}

export function useMarketplace() {
  const { user } = useAuth()
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>([])
  const [marketplaceVehicles, setMarketplaceVehicles] = useState<VehicleWithSeller[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [listedVehicles, setListedVehicles] = useState<Set<number>>(new Set())

  const fetchMyVehicles = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch('/api/vehicles/my-vehicles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setMyVehicles(data.vehicles)
        
        await checkListedVehicles(data.vehicles)
      }
    } catch (err) {
      console.error('Error fetching my vehicles:', err)
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchMyVehicles()
    }
    fetchMarketplaceVehicles()
  }, [user, fetchMyVehicles])

  const checkListedVehicles = async (vehicles: Vehicle[]) => {
    try {
      const token = localStorage.getItem('token')
      const listedSet = new Set<number>()
      
      for (const vehicle of vehicles) {
        const response = await fetch(`/api/marketplace/vehicle/${vehicle._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.isListed) {
            listedSet.add(vehicle._id)
          }
        }
      }
      
      setListedVehicles(listedSet)
    } catch (err) {
      console.error('Error checking listed vehicles:', err)
    }
  }

  const fetchMarketplaceVehicles = async () => {
    try {
      const response = await fetch('/api/marketplace')
      
      if (response.ok) {
        const data = await response.json()
        setMarketplaceVehicles(data.listings)
      }
    } catch (err) {
      console.error('Error fetching marketplace vehicles:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleListVehicle = async (data: {
    vehicleId: number
    name: string
    price: number
    description: string
    images: string[]
  }) => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/marketplace/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Erro ao listar veículo')
    }

    setListedVehicles(prev => new Set([...prev, data.vehicleId]))
    fetchMyVehicles()
    fetchMarketplaceVehicles()
  }

  const handleRemoveFromMarketplace = async (vehicleId: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/marketplace/vehicle/${vehicleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()

      if (response.ok) {
        setListedVehicles(prev => {
          const newSet = new Set(prev)
          newSet.delete(vehicleId)
          return newSet
        })

        fetchMyVehicles()
        fetchMarketplaceVehicles()
      } else {
        setError(result.error || 'Erro ao remover veículo do marketplace')
      }
    } catch (err) {
      console.error('Error removing vehicle from marketplace:', err)
      setError('Erro ao remover veículo do marketplace')
    }
  }

  const purchaseVehicle = async (vehicleId: number, price: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/vehicles/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ vehicleId, price })
      })

      const data = await response.json()

      if (response.ok) {
        setError('')
        fetchMyVehicles()
        fetchMarketplaceVehicles()
      } else {
        setError(data.error || 'Erro ao comprar veículo')
      }
    } catch (err) {
      console.error('Error purchasing vehicle:', err)
      setError('Erro ao comprar veículo')
    }
  }

  const refreshData = () => {
    fetchMyVehicles()
    fetchMarketplaceVehicles()
  }

  return {
    myVehicles,
    marketplaceVehicles,
    loading,
    error,
    listedVehicles,
    handleListVehicle,
    handleRemoveFromMarketplace,
    purchaseVehicle,
    refreshData,
    setError
  }
}

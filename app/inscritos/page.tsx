'use client'

import { useState, useEffect } from 'react'
import { InscritosHeader } from '@/app/components/InscritosHeader'
import { InscritosTable } from '@/app/components/InscritosTable'
import { InscritosFooter } from '@/app/components/InscritosFooter'

interface Registration {
  id: string
  tournamentId: string
  tournamentTitle: string
  userId: string
  username: string
  nickInGame: string
  carModel: string
  experienceImage?: string
  team?: string
  registrationDate: string
}

export default function InscritosPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/tournaments/register')
      if (response.ok) {
        const data = await response.json()
        setRegistrations(data.registrations || [])
      }
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-red-500 text-2xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <InscritosHeader registrationsCount={registrations.length} />
        <InscritosTable registrations={registrations} />
        <InscritosFooter registrationsCount={registrations.length} />
      </div>
    </div>
  )
}

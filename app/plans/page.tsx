'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { plans } from '@/lib/plans'
import PlanCard from '@/app/components/PlanCard'
import PlansHeader from '@/app/components/PlansHeader'
import BenefitsSection from '@/app/components/BenefitsSection'

export default function PlansPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
          <p>Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black main-page-scrollbar pt-10">
      <div className="container mx-auto px-4 py-2">
        {/* Botão Home */}
        <button 
          className="text-gray-400 hover:text-red-500 bg-transparent border-0 p-0 font-normal hover:bg-transparent text-md cursor-pointer mb-8"
          onClick={() => router.push('/')}
        >
          Home
        </button>

        {/* Header */}
        <PlansHeader />

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>

        {/* Benefits Section */}
        <BenefitsSection />
      </div>
    </div>
  )
}

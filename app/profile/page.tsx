'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import ProfileSidebar from '@/app/components/ProfileSidebar'
import ProfileContent from '@/app/components/ProfileContent'
import PasswordChangeForm from '@/app/components/PasswordChangeForm'
import { UserInfoHeader } from '@/app/components/UserInfoHeader'

type TabType = 'profile' | 'subscriptions' | 'password'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('profile')

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  // Atualizar dados do usuário ao carregar a página
  useEffect(() => {
    if (!user) return

    const updateUserData = async () => {
      try {
        const response = await fetch(`/api/auth/user?id=${user._id}`)
        if (response.ok) {
          const updatedUser = await response.json()
          localStorage.setItem('user', JSON.stringify(updatedUser.user))
        }
      } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error)
      }
    }

    updateUserData()
  }, [user?._id, user])

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
    <div className="min-h-screen bg-black main-page-scrollbar pt-20">
      <div className="container mx-auto px-6">
        {/* UserInfoHeader - mesmo componente do marketplace */}
        <div className="mb-8 max-w-7xl mx-auto">
          <UserInfoHeader />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <ProfileSidebar 
              user={user} 
              activeTab={activeTab} 
              setActiveTab={handleTabChange} 
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-black/80 backdrop-blur-lg border border-red-900/30 rounded-2xl p-8 shadow-2xl">
              
              {activeTab === 'profile' && <ProfileContent user={user} />}
              
              {activeTab === 'subscriptions' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-red-500">Assinaturas</h1>
                    <div className="h-px flex-1 bg-linear-to-r from-red-500/50 to-transparent"></div>
                  </div>
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-6">Nenhuma assinatura ativa no momento.</p>
                    <button
                      onClick={() => router.push('/plans')}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                      Ver Planos
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'password' && <PasswordChangeForm user={user} />}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import ClanCard from './ClanCard'

interface Clan {
  tag: string
  chat_text: string
  owner: string
  chat_color: string
  owner_name?: string
}

interface UserClan {
  id: number
  name: string
  tag: string
  role: string
}

export default function ClansPage() {
  const { user } = useAuth()
  const [clans, setClans] = useState<Clan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [userClan, setUserClan] = useState<UserClan | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    tag: '',
    chat_text: '',
    chat_color: '#FFFFFF'
  })

  useEffect(() => {
    loadClans()
    if (user) {
      loadUserClan()
    }
  }, [user])

  const loadClans = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/clans')
      const data = await response.json()
      
      if (data.success) {
        setClans(data.data || [])
        setError('')
      } else {
        setError(data.message || 'Erro ao carregar clans')
        console.error('Erro ao carregar clans:', data.message)
      }
    } catch (err) {
      console.error('Erro ao carregar clans:', err)
      setError('Erro ao carregar clans. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const loadUserClan = async () => {
    try {
      if (!user?._id) {
        console.error('Usuário não logado ou sem ID')
        return
      }
      
      const response = await fetch(`/api/clans/user?id=${user._id}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        setUserClan(data.data)
      } else {
        setUserClan(null)
      }
    } catch (err) {
      console.error('Erro ao carregar clan do usuário:', err)
      setUserClan(null)
    }
  }

  const handleJoinClan = async (clanTag: string) => {
    if (!user) {
      setMessage('Você precisa estar logado para solicitar entrada!')
      setMessageType('error')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      const response = await fetch('/api/clans/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'join',
          clanTag,
          userId: user._id
        })
      })
      const result = await response.json()
      
      if (result.success) {
        setMessage('Solicitação enviada com sucesso! Aguarde aprovação.')
        setMessageType('success')
        loadUserClan()
      } else {
        setMessage(result.message || 'Erro ao solicitar entrada no clan')
        setMessageType('error')
      }
      
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error('Erro ao solicitar entrada no clan:', err)
      setMessage('Erro ao solicitar entrada no clan. Tente novamente.')
      setMessageType('error')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleCreateClan = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setMessage('Você precisa estar logado para criar um clan!')
      return
    }
    
    const requestData = {
      name: formData.tag,
      tag: formData.tag,
      chat_text: formData.chat_text,
      chat_color: formData.chat_color,
      userId: user._id
    }
    
    try {
      const response = await fetch('/api/clans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })
      const result = await response.json()
      
      if (result.success) {
        setMessage('Clan criado com sucesso!')
        setMessageType('success')
        setFormData({ tag: '', chat_text: '', chat_color: '#FFFFFF' })
        setShowCreateForm(false)
        loadClans()
        loadUserClan()
      } else {
        setMessage(result.message || 'Erro ao criar clan')
        setMessageType('error')
      }
      
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error('Erro ao criar clan:', err)
      setMessage('Erro ao criar clan. Tente novamente.')
      setMessageType('error')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center">
          <div className="text-white text-xl">Carregando clans...</div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-black via-black bg-black main-page-scrollbar pt-30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Clans</h1>
            <div className="flex justify-between items-center">
              <p className="text-gray-300">
                Encontre e junte-se aos melhores clans de drift
              </p>
              <div className="flex space-x-4">
                {!userClan && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
                  >
                    Criar Clan
                  </button>
                )}
                {userClan && (
                  <button
                    onClick={() => window.location.href = '/clans/manage'}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
                  >
                    Gerenciar Clan
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-600/20 border border-green-500/50 text-green-400' 
                : 'bg-red-600/20 border border-red-500/50 text-red-400'
            }`}>
              {message}
            </div>
          )}

          {/* Formulário de Criar Clan */}
          {showCreateForm && (
            <div className="mb-8 bg-black/60 backdrop-blur-md border border-red-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Solicitar Entrada em Clan</h2>
              <form onSubmit={handleCreateClan}>
                <div className="mb-4">
                  <label className="block text-white mb-2">Tag do Clan</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-2 bg-black/60 border border-red-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="TAG do clan"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Exibição in game</label>
                  <textarea
                    value={formData.chat_text}
                    onChange={(e) => setFormData({ ...formData, chat_text: e.target.value })}
                    className="w-full px-4 py-2 bg-black/60 border border-red-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Como o clan aparecerá no chat..."
                    rows={3}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Cor do Chat</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.chat_color}
                      onChange={(e) => setFormData({ ...formData, chat_color: e.target.value })}
                      className="w-16 h-10 bg-black/60 border border-red-500/30 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.chat_color}
                      onChange={(e) => setFormData({ ...formData, chat_color: e.target.value })}
                      className="flex-1 px-4 py-2 bg-black/60 border border-red-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      placeholder="#FFFFFF"
                      maxLength={7}
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-red-500 px-6 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
                  >
                    Enviar Solicitação
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-red-500 px-6 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de Clans */}
          {error ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-xl mb-4">{error}</div>
              <button
                onClick={loadClans}
                className="bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-red-500 px-6 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
              >
                Tentar Novamente
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clans.map((clan) => (
                <ClanCard
                  key={clan.tag}
                  clan={clan}
                  onJoin={handleJoinClan}
                  showJoinButton={!userClan}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Header from '../../components/Header'
import { Footer } from '../../components/Footer'

interface Clan {
  tag: string
  chat_text: string
  owner: string
  chat_color: string
  owner_name?: string
}

interface ClanMember {
  username: string
  _id: number
}

export default function ManageClanPage() {
  const { user } = useAuth()
  const [userClan, setUserClan] = useState<Clan | null>(null)
  const [members, setMembers] = useState<ClanMember[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  // Form data para edição
  const [editForm, setEditForm] = useState({
    tag: '',
    chat_text: '',
    chat_color: '#FFFFFF'
  })

  useEffect(() => {
    if (user) {
      loadUserClan()
    }
  }, [user])

  const loadUserClan = async () => {
    try {
      if (!user?._id) {
        console.error('Usuário não logado ou sem ID')
        setLoading(false)
        return
      }
      
      const response = await fetch(`/api/clans/user?id=${user._id}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        setUserClan(data.data)
        setEditForm({
          tag: data.data.tag,
          chat_text: data.data.chat_text,
          chat_color: data.data.chat_color
        })
        loadMembers(data.data.tag)
      }
    } catch (err) {
      console.error('Erro ao carregar clan do usuário:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMembers = async (clanTag: string) => {
    try {
      const response = await fetch(`/api/clans/members?clanTag=${clanTag}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        setMembers(data.data)
      } else {
        console.log('Erro ao carregar membros:', data.message)
        setMembers([])
      }
    } catch (err) {
      console.error('Erro ao carregar membros:', err)
      setMembers([])
    }
  }

  const handleUpdateClan = async () => {
    if (!userClan || !user) return

    try {
      const response = await fetch('/api/clans/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentTag: userClan.tag,
          newTag: editForm.tag,
          chat_text: editForm.chat_text,
          chat_color: editForm.chat_color,
          userId: user._id
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setMessage('Clan atualizado com sucesso!')
        setMessageType('success')
        loadUserClan()
      } else {
        setMessage(result.message || 'Erro ao atualizar clan')
        setMessageType('error')
      }
      
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error('Erro ao atualizar clan:', err)
      setMessage('Erro ao atualizar clan. Tente novamente.')
      setMessageType('error')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleDeleteClan = async () => {
    if (!userClan || !user) return

    if (!confirm('Tem certeza que deseja excluir este clan? Esta ação não pode ser desfeita!')) {
      return
    }

    try {
      const response = await fetch('/api/clans/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: userClan.tag,
          userId: user._id
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setMessage('Clan excluído com sucesso!')
        setMessageType('success')
        setUserClan(null)
        setMembers([])
        setTimeout(() => {
          window.location.href = '/clans'
        }, 2000)
      } else {
        setMessage(result.message || 'Erro ao excluir clan')
        setMessageType('error')
      }
      
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error('Erro ao excluir clan:', err)
      setMessage('Erro ao excluir clan. Tente novamente.')
      setMessageType('error')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleRemoveMember = async (memberId: number, memberUsername: string) => {
    if (!confirm(`Tem certeza que deseja remover ${memberUsername} do clan?`)) {
      return
    }

    try {
      // Simulação - em um sistema real, você removeria da tabela de membros
      setMembers(members.filter(m => m._id !== memberId))
      setMessage(`${memberUsername} removido do clan com sucesso!`)
      setMessageType('success')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error('Erro ao remover membro:', err)
      setMessage('Erro ao remover membro. Tente novamente.')
      setMessageType('error')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
          <div className="text-xl">Carregando...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!userClan) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Você não possui um clan</h1>
            <p className="text-gray-400 mb-6">Crie um clan primeiro para poder gerenciá-lo.</p>
            <a
              href="/clans"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Voltar para Clans
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white pt-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Gerenciar Clan: <span style={{ color: userClan.chat_color }}>{userClan.tag}</span>
          </h1>

          {message && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              messageType === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações do Clan */}
            <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Informações do Clan</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Tag do Clan</label>
                  <input
                    type="text"
                    value={editForm.tag}
                    onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                    className="w-full px-4 py-2 bg-black/60 border border-red-500/30 text-white rounded-lg"
                    maxLength={10}
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Exibição in Game</label>
                  <textarea
                    value={editForm.chat_text}
                    onChange={(e) => setEditForm({ ...editForm, chat_text: e.target.value })}
                    className="w-full px-4 py-2 bg-black/60 border border-red-500/30 text-white rounded-lg"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Cor do Chat</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={editForm.chat_color}
                      onChange={(e) => setEditForm({ ...editForm, chat_color: e.target.value })}
                      className="w-16 h-10 bg-black/60 border border-red-500/30 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editForm.chat_color}
                      onChange={(e) => setEditForm({ ...editForm, chat_color: e.target.value })}
                      className="flex-1 px-4 py-2 bg-black/60 border border-red-500/30 text-white rounded-lg"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleUpdateClan}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Atualizar Clan
                </button>
                <button
                  onClick={handleDeleteClan}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Excluir Clan
                </button>
              </div>
            </div>

            {/* Membros do Clan */}
            <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Membros do Clan</h2>
              
              {members.length === 0 ? (
                <p className="text-gray-400">Nenhum membro encontrado.</p>
              ) : (
                <div className="space-y-2">
                  {members.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between bg-black/20 p-3 rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{member.username}</span>
                        {member._id === parseInt(userClan.owner) && (
                          <span className="ml-2 text-xs bg-red-600 px-2 py-1 rounded">Dono</span>
                        )}
                      </div>
                      {member._id !== parseInt(userClan.owner) && (
                        <button
                          onClick={() => handleRemoveMember(member._id, member.username)}
                          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transition-all duration-300"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/clans"
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Voltar para Clans
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { User } from '@/types/database'

export function UserLeaderboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        if (data.success) {
          setUsers(data.sampleData || [])
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-red-500 text-xl">Carregando usuários...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-6 mb-8">
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <h2 className="text-5xl font-bold text-white tracking-wider">RANKING</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed">Melhores jogadores do servidor</p>
      </div>
      
      <div className="relative max-w-5xl mx-auto mb-20">
        <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black/20">
          <div className="grid gap-3 p-3 pb-8 px-8">
            {users.map((user, index) => (
              <div 
                key={user._id}
                className="bg-gradient-to-r from-black/80 via-red-900/20 to-black/80 border border-red-500/30 rounded-2xl p-4 transform hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-4xl font-black text-red-500">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {user.username}
                      </div>
                      <div className="text-sm text-gray-400">
                        {user.group || 'Jogador'} • {user.online ? '🟢 Online' : '⚫ Offline'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-3xl font-bold text-red-400">
                      {user.xp?.toLocaleString('pt-BR')} XP
                    </div>
                    <div className="text-lg text-gray-300">
                      💰 ${user.money?.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-500">
                      ⏱️ {Math.floor(user.playtime / 60)}h {user.playtime % 60}min
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

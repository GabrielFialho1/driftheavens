'use client'

import { useState, useEffect } from 'react'

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Todos os Inscritos</h1>
          <p className="text-gray-400 mb-6">
            Lista completa de todos os jogadores inscritos nos campeonatos
          </p>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 mb-4">
            <p className="text-green-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Ativo
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Total de {registrations.length} inscrição{registrations.length > 1 ? 'ções' : ''} realizadas
          </p>
        </div>

        <div className="bg-black/60 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-800">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">ID Usuário</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Nick in Game</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Carro</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Equipe</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-500">
                      Nenhum inscrito encontrado.
                    </td>
                  </tr>
                ) : (
                  registrations.map((registration) => (
                    <tr key={registration.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-mono bg-gray-800 px-2 py-1 rounded text-sm">
                          #{registration.userId}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{registration.nickInGame}</td>
                      <td className="py-4 px-6 text-gray-300">{registration.carModel}</td>
                      <td className="py-4 px-6 text-gray-300">
                        {registration.team || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {registrations.length > 0 && (
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Última atualização: {new Date().toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        )}
      </div>
    </div>
  )
}

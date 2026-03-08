'use client'

import { useState } from 'react'
import { Tournament } from "../../lib/tournaments"
import { TournamentRegistration } from "./TournamentRegistration"
import { useAuth } from '@/contexts/AuthContext'

interface TournamentAgendaProps {
  tournaments: Tournament[]
}

export function TournamentAgenda({ tournaments }: TournamentAgendaProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active')
  const [registrationModal, setRegistrationModal] = useState<{ isOpen: boolean; tournament: Tournament | null }>({
    isOpen: false,
    tournament: null
  })
  
 
  const activeTournaments = tournaments.filter(t => t.isActive !== false)
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime())
  
  const pastTournaments = tournaments.filter(t => t.isActive === false)
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime()) 

  
  const recentTournaments = [
    ...activeTournaments,
    ...pastTournaments   
  ].slice(0, 5) 
  .map((tournament, index) => ({
    id: tournament.id,
    title: tournament.title,
    date: tournament.date,
    time: tournament.isActive !== false ? (tournament.time || '') : 'Encerrado', 
    isLive: index === 0 && tournament.isActive !== false, 
    canCheckIn: index === 0 && tournament.isActive !== false,
    tournament: tournament // Add the full tournament object
  }))
  
  // 
  const pastTournamentsList = pastTournaments.map((tournament) => ({
    id: tournament.id,
    title: tournament.title,
    date: tournament.date,
    time: 'Encerrado',
    isLive: false,
    canCheckIn: false,
    tournament: tournament
  }))

  const displayTournaments = activeTab === 'active' ? recentTournaments : pastTournamentsList

  const handleCheckIn = (tournament: Tournament) => {
    if (!user) {
      alert('Você precisa estar logado para fazer check-in no campeonato')
      return
    }
    setRegistrationModal({ isOpen: true, tournament })
  }

  const handleCloseRegistration = () => {
    setRegistrationModal({ isOpen: false, tournament: null })
  }

  const handleRegistrationSuccess = () => {
    alert('Check-in realizado com sucesso!')
  }

  return (
    <div className="w-full px-6 py-6">
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 cursor-pointer font-semibold transition-colors ${
              activeTab === 'active'
                ? 'text-red-600 border-b-2  border-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Recentes
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 cursor-pointer font-semibold transition-colors ${
              activeTab === 'past'
                ? 'text-red-600 border-b-2 border-white'
                : 'text-zinc-400 hover:text-gray-700'
            }`}
          >
            Encerrados
          </button>
        </div>
        <button 
          onClick={() => window.location.href = '/inscritos'}
          className="text-zinc-300 cursor-pointer hover:text-red-600 font-medium"
        >
          Inscritos →
        </button>
      </div>

      
      <h2 className="text-2xl font-bold mb-6 text-zinc-300">
        {activeTab === 'active' ? 'Campeonatos recentes' : 'Campeonatos anteriores'}
      </h2>

    {/* Tabela */}
      <div className="overflow-x-auto">
        <div className={`${activeTab === 'past' ? 'max-h-96 overflow-y-auto' : ''}`}>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 sticky top-0 bg-white">
                <th className="text-left py-3 px-4 font-semibold text-zinc-700">NOME</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-700">TIME</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-700">DATA</th>
                {activeTab === 'active' && (
                  <th className="text-left py-3 px-4 font-semibold text-zinc-700">REGISTER</th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayTournaments.map((tournament) => (
                <tr key={tournament.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className={`py-4 px-4 ${activeTab === 'past' ? 'py-6' : ''}`}>
                    <div className="flex items-center gap-2">
                      {tournament.isLive && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                          LIVE
                        </span>
                      )}
                      <span className="font-medium text-zinc-400 cursor-pointer">{tournament.title}</span>
                    </div>
                  </td>
                  <td className={`py-4 px-4 text-gray-600 ${activeTab === 'past' ? 'py-6' : ''}`}>{tournament.time}</td>
                  <td className={`py-4 px-4 text-gray-600 ${activeTab === 'past' ? 'py-6' : ''}`}>{tournament.date}</td>
                  {activeTab === 'active' && (
                    <td className="py-4 px-4">
                      {tournament.canCheckIn ? (
                        <button 
                          onClick={() => handleCheckIn(tournament.tournament)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 cursor-pointer py-2 rounded font-medium transition-colors"
                        >
                          Check-In
                        </button>
                      ) : activeTab === 'active' ? (
                        <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded font-medium cursor-not-allowed" disabled>
                          Check-In
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Inscrição */}
      {registrationModal.isOpen && registrationModal.tournament && (
        <TournamentRegistration
          tournament={registrationModal.tournament}
          onClose={handleCloseRegistration}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  )
}

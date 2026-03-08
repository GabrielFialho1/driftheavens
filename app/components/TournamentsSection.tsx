'use client'

import { useState } from 'react'
import { tournaments, Tournament } from "../../lib/tournaments";
import { TournamentCard } from "./TournamentCard";

interface TournamentsSectionProps {
  selectedTournament: Tournament;
  onTournamentClick: (tournament: Tournament) => void;
}

export function TournamentsSection({ selectedTournament, onTournamentClick }: TournamentsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  
  const cardsPerPage = 3
  const totalPages = Math.ceil(tournaments.length / cardsPerPage)
  
  const startIndex = currentPage * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const currentTournaments = tournaments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <section className="py-32 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <h2 className="text-5xl font-bold text-white tracking-wider">CAMPEONATOS</h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed">Os torneios mais intensos da temporada</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {currentTournaments.map((tournament, index) => (
            <div 
              key={`${tournament.id}-${index}`}
              onClick={() => onTournamentClick(tournament)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-700"
            >
              <TournamentCard 
                number={`0${tournament.id}`}
                title={tournament.title}
                description={tournament.description}
                isSelected={selectedTournament.id === tournament.id}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer duration-700 ${
                currentPage === index 
                  ? 'bg-red-500 w-12 shadow-lg shadow-red-500/50' 
                  : 'bg-gray-300 hover:bg-red-500 hover:scale-125'
              }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

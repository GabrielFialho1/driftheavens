'use client'

import { Tournament } from "../../lib/tournaments";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  selectedTournament: Tournament;
  onTournamentClick: (tournament: Tournament) => void;
}

export function HeroSection({ selectedTournament, onTournamentClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${selectedTournament.background})`,
          filter: 'blur(0px) contrast(1.2) saturate(1.1)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/30 to-black" />
      
      <div className="relative z-10 h-full flex flex-col">          
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-6 mb-8">
                    <div className="w-1 h-20 bg-gradient-to-b from-red-600 to-red-500 rounded-full shadow-lg shadow-red-500/50" />
                    <h1 className="text-6xl lg:text-7xl font-black text-white font-bold tracking-tight">
                      {selectedTournament.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xl font-light tracking-wide">{selectedTournament.date}</span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <Link 
                    href={`/championships#tournament-${selectedTournament.id}`}
                    className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 rounded-md px-8 py-3 font-bold text-lg w-fit cursor-pointer inline-block text-center"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
      </section>
  )
}

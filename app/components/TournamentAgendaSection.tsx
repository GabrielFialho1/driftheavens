'use client'

import { Tournament } from "../../lib/tournaments";
import { TournamentAgenda } from "./TournamentAgenda";

interface TournamentAgendaSectionProps {
  tournaments: Tournament[];
}

export function TournamentAgendaSection({ tournaments }: TournamentAgendaSectionProps) {
  return (
    <section className="py-32 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <h2 className="text-4xl font-bold text-white tracking-widest">AGENDA</h2>
              </div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-red-500 via-gray-600 to-transparent" />
              <p className="text-gray-500 font-light text-lg">Calendário de competições oficiais</p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <TournamentAgenda tournaments={tournaments} />
          </div>
        </div>
      </div>
    </section>
  )
}

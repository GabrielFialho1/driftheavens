'use client'

import { useState, useEffect } from 'react'
import { tournaments, Tournament } from "../lib/tournaments";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { UserLeaderboard } from "./components/UserLeaderboard";
import { TournamentsSection } from "./components/TournamentsSection";
import { TournamentAgendaSection } from "./components/TournamentAgendaSection";
import { CarsSection } from "./components/CarsSection";
import { TracksSection } from "./components/TracksSection";
import { PageSkeleton } from "./components/Skeleton";
import { Footer } from "./components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isLoading } = useAuth()
  const [selectedTournament, setSelectedTournament] = useState<Tournament>(tournaments[0])
  const [currentCarIndex, setCurrentCarIndex] = useState(0)

  // Auto-rotate tournaments every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTournament((currentTournament) => {
        const currentIndex = tournaments.findIndex(t => t.id === currentTournament.id)
        const nextIndex = currentIndex === tournaments.length - 1 ? 0 : currentIndex + 1
        return tournaments[nextIndex]
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleTournamentClick = (tournament: Tournament) => {
    setSelectedTournament(tournament)
  }

  // Se estiver carregando, mostrar skeleton loading
  if (isLoading) {
    return <PageSkeleton />
  }


  return (
    <>
      <Header />
      <div className="min-h-screen bg-black main-page-scrollbar pt-20">
        <HeroSection 
          selectedTournament={selectedTournament}
          onTournamentClick={handleTournamentClick}
        />

        <TournamentsSection 
          selectedTournament={selectedTournament}
          onTournamentClick={handleTournamentClick}
        />

        <UserLeaderboard />

        <TournamentAgendaSection tournaments={tournaments} />

        <CarsSection 
          currentCarIndex={currentCarIndex}
          onCarIndexChange={setCurrentCarIndex}
        />

        <TracksSection />

        <Footer />
      </div>
    </>
  )
}

'use client'

import { tournaments, Tournament } from "../../lib/tournaments";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function ChampionshipsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              <h1 className="text-5xl lg:text-6xl font-black text-white font-bold tracking-tight">
                Campeonatos
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Explore todos os nossos campeonatos, assista às lives do YouTube, 
                veja as chaves do Challonge e conheça os vencedores de cada etapa.
              </p>
            </div>
          </div>
        </section>

        {/* Championships Grid */}
        <section className="px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8">
              {tournaments.map((tournament) => (
                <div 
                  key={tournament.id} 
                  id={`tournament-${tournament.id}`}
                  className="bg-zinc-950/90 backdrop-blur-sm rounded-xl overflow-hidden border border-red-500/30 hover:border-red-500/60 transition-all duration-300"
                >
                  {/* Tournament Header */}
                  <div className="relative h-64 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-md scale-110"
                      style={{ 
                        backgroundImage: `url(${tournament.background})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold text-white">
                            {tournament.title}
                          </h2>
                          <div className="flex items-center gap-4 text-white/80">
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              {tournament.date}
                            </span>
                            {tournament.time && (
                              <span>{tournament.time}</span>
                            )}
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                            {tournament.description}
                          </p>
                        </div>
                        {tournament.isActive && (
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ATIVO
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tournament Content */}
                  <div className="p-8 space-y-6">
                    {/* Links and Winners Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Top 3 Winners */}
                      {tournament.top3Winners && tournament.top3Winners.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-yellow-500 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            Top 3
                          </h3>
                          <div className="space-y-2">
                            {tournament.top3Winners.map((winner, index) => (
                              <div key={index} className="flex items-center gap-2 text-white/90">
                                <span className={`font-bold ${
                                  index === 0 ? 'text-yellow-500' : 
                                  index === 1 ? 'text-gray-400' : 
                                  'text-orange-600'
                                }`}>
                                  {index + 1}º
                                </span>
                                <span>{winner}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* YouTube Live ou Discord */}
                      {tournament.title.toLowerCase().includes('oficial') ? (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Live do YouTube
                          </h3>
                          {tournament.youtubeLive && (
                            <a 
                              href={tournament.youtubeLive}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-center transition-colors duration-200"
                            >
                              Assistir Live
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3 flex flex-col items-center">
                          <div className="flex flex-col items-center gap-2 text-center">
                            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-2.223a.077.077 0 0 1 .008-.099c.194-.144.387-.295.571-.453a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.184.158.367.309.561.453a.077.077 0 0 1 .006.099a13.08 13.08 0 0 1-1.872 2.223a.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                            <span className="text-purple-500 font-semibold text-sm">Transmitido no Discord</span>
                          </div>
                        </div>
                      )}

                      {/* Challonge Bracket */}
                      {tournament.challongeLink && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-blue-500 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Chave do Torneio
                          </h3>
                          <a 
                            href={tournament.challongeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-center transition-colors duration-200"
                          >
                            Ver Chave
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Result Image */}
                    {tournament.resultImage && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Resultado Final</h3>
                        <div className="relative h-64 rounded-xl overflow-hidden">
                          <Image
                            src={tournament.resultImage}
                            alt={`Resultado - ${tournament.title}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

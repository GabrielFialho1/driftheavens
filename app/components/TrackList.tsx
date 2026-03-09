import Image from "next/image";

import { useState, useEffect } from 'react'
import { Track } from "../../lib/tracks"

interface TrackListProps {
  tracks: Track[]
}

export function TrackList({ tracks }: TrackListProps) {
  const [selectedTrack, setSelectedTrack] = useState<Track>(tracks[0])

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Street':
        return 'bg-red-600/20 border border-red-600/50 text-red-400'
      case 'Comp':
        return 'bg-red-600/30 border border-red-500 text-red-300'
      default:
        return 'bg-gray-600/20 border border-gray-500/50 text-gray-400'
    }
  }

  // Adicionar estilos de scrollbar inline
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px !important;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3) !important;
        border-radius: 4px !important;
        border: 1px solid rgba(220, 38, 38, 0.2) !important;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #dc2626, #991b1b) !important;
        border-radius: 4px !important;
        border: 1px solid rgba(220, 38, 38, 0.3) !important;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #ef4444, #dc2626) !important;
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.6) !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-2xl font-bold mb-6 text-zinc-300">Pistas Gerais</h2>
      
      <div className="flex gap-8">
        {/* Lista de pistas - Lado esquerdo */}
        <div className="flex-1 max-w-md">
          <div className="h-105 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedTrack.id === track.id
                    ? 'border-red-600 bg-red-600/10'
                    : 'border-gray-700 bg-zinc-900/50 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-zinc-300">{track.name}</h3>
                  {track.difficulty && (
                    <span className={`text-xs text-white px-2 py-1 rounded ${getDifficultyColor(track.difficulty)}`}>
                      {track.difficulty}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {track.description}
                </p>
                
                <div className="flex gap-4 text-xs text-gray-500">
                  {track.location && (
                    <span className="flex items-center gap-1">
                      📍 {track.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Imagem da pista - Lado direito */}
        <div className="flex-1">
          <div className="bg-zinc-900/50 rounded-lg border border-white/50 overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={selectedTrack.image}
                alt={selectedTrack.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/img/bg1.jpg' // Imagem fallback
                }}
              />
              
              {/* Overlay com informações */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-2">{selectedTrack.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{selectedTrack.description}</p>
                
                <div className="flex gap-4 text-sm">
                  {selectedTrack.location && (
                    <span className="text-gray-400">
                      📍 {selectedTrack.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { tracks } from "../../lib/tracks";
import { TrackList } from "./TrackList";

export function TracksSection() {
  return (
    <section className="py-32 px-8 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-8 mb-12">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <h2 className="text-5xl font-bold text-white tracking-widest">PISTAS OFICIAIS</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>
          <p className="text-zinc-400 font-light text-lg max-w-3xl mx-auto">Circuitos Competitivos e circuitos para entretenimento.</p>
        </div>
        
        <TrackList tracks={tracks} />
      </div>
    </section>
  )
}

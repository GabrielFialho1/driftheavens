'use client'

import { cars } from "../../lib/cars"
import Image from "next/image"

interface CarsSectionProps {
  currentCarIndex: number
  onCarIndexChange: (index: number) => void
}

export function CarsSection({ currentCarIndex, onCarIndexChange }: CarsSectionProps) {
  const handlePreviousCar = () => {
    const newIndex = currentCarIndex === 0 ? cars.length - 1 : currentCarIndex - 1
    onCarIndexChange(newIndex)
  }

  const handleNextCar = () => {
    const newIndex = currentCarIndex === cars.length - 1 ? 0 : currentCarIndex + 1
    onCarIndexChange(newIndex)
  }

  return (
    <section className="py-32 px-8 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-8 mb-12">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <h2 className="text-5xl font-bold text-white tracking-widest">VEICULOS EXCLUSIVOS</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>
          <p className="text-zinc-400 font-light text-lg max-w-3xl mx-auto">Maquinas de alta performance para pilotos elite</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
            <div className="w-full max-w-7xl mx-auto flex justify-between">
              <button
                onClick={handlePreviousCar}
                className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-30 bg-red-600/20 backdrop-blur-md border border-red-500/30 text-white p-8 rounded-full transition-all duration-700 hover:bg-red-600/40 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-red-600/50"
                aria-label="Carro anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNextCar}
                className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-30 bg-red-600/20 backdrop-blur-md border border-red-500/30 text-white p-8 rounded-full transition-all duration-700 hover:bg-red-600/40 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-red-600/50"
                aria-label="Proximo carro"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="relative z-20 px-24">
            <div className="bg-gradient-to-br from-black/60 via-red-900/40 to-black/90 backdrop-blur-2xl rounded-3xl p-20 border border-red-500/20">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-4">
                      <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/50" />
                      <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
                        {cars[currentCarIndex].name}
                      </h3>
                    </div>
                    <div className="w-32 h-0.5 bg-gradient-to-r from-red-500 via-zinc-600 to-transparent" />
                  </div>
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    {cars[currentCarIndex].description}
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <div className="relative group overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 border-2 border-red-500/30 rounded-3xl" />
                    <Image
                      src={cars[currentCarIndex].image}
                      alt={cars[currentCarIndex].name}
                      width={600}
                      height={400}
                      className="rounded-3xl object-cover w-full h-full transform group-hover:scale-110 transition-all duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/img/placeholder-car.jpg'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-900/10 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-6 mt-20">
            {cars.map((_, index) => (
              <button
                key={index}
                onClick={() => onCarIndexChange(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer duration-700 ${
                  index === currentCarIndex 
                    ? 'bg-red-500 w-16 shadow-xl shadow-red-500/50' 
                    : 'bg-gray-200 hover:bg-red-500 hover:scale-125'
                }`}
                aria-label={`Ir para carro ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

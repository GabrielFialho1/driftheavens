'use client'

import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

export default function ClansLoading() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 main-page-scrollbar pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-black/60 border border-red-500/30 rounded w-48 mb-4 animate-pulse"></div>
            <div className="flex justify-between items-center">
              <div className="h-5 bg-black/60 border border-red-500/30 rounded w-96 animate-pulse"></div>
              <div className="h-10 bg-red-600 rounded w-40 animate-pulse"></div>
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-black/60 border border-red-500/30 rounded-full animate-pulse"></div>
                    <div>
                      <div className="h-6 bg-black/60 border border-red-500/30 rounded w-32 mb-2 animate-pulse"></div>
                      <div className="h-4 bg-black/60 border border-red-500/30 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-black/60 border border-red-500/30 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-black/60 border border-red-500/30 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
                
                <div className="h-4 bg-black/60 border border-red-500/30 rounded w-full mb-4 animate-pulse"></div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="h-8 bg-black/60 border border-red-500/30 rounded w-12 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 bg-black/60 border border-red-500/30 rounded w-12 mx-auto animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-8 bg-black/60 border border-red-500/30 rounded w-12 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 bg-black/60 border border-red-500/30 rounded w-12 mx-auto animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-8 bg-black/60 border border-red-500/30 rounded w-12 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 bg-black/60 border border-red-500/30 rounded w-12 mx-auto animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <div className="h-10 bg-black/60 border border-red-500/30 rounded flex-1 animate-pulse"></div>
                  <div className="h-10 bg-black/60 border border-red-500/30 rounded flex-1 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

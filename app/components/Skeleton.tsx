'use client'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  lines = 1
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  }

  const baseClasses = 'bg-gradient-to-r from-red-900/20 via-red-800/30 to-red-900/20 animate-pulse'
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  const style = {
    width: width || (variant === 'text' ? '100%' : '40px'),
    height: height || (variant === 'text' ? '1rem' : '40px')
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${baseClasses} rounded`}
            style={{
              width: i === lines - 1 ? '70%' : '100%',
              height: height || '1rem'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div 
      className={combinedClasses}
      style={style}
      aria-hidden="true"
    />
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-8 space-y-12">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton variant="rectangular" width={130} height={40} />
          <div className="flex gap-4">
            <Skeleton variant="rectangular" width={80} height={36} />
            <Skeleton variant="rectangular" width={100} height={36} />
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-24 items-center w-full">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <Skeleton variant="rectangular" width={4} height={80} className="rounded-full" />
                <Skeleton variant="text" width={400} height={60} />
              </div>
              <Skeleton variant="text" width={200} height={24} />
              <Skeleton variant="rectangular" width={150} height={48} className="rounded" />
            </div>
            <Skeleton variant="rectangular" width={500} height={300} className="rounded-xl" />
          </div>
        </div>

        {/* Content Sections Skeleton */}
        <div className="space-y-16">
          {/* Tournaments Section */}
          <div className="space-y-6">
            <Skeleton variant="text" width={300} height={36} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} variant="rounded" height={200} />
              ))}
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="space-y-6">
            <Skeleton variant="text" width={250} height={36} />
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width={200} height={20} />
                    <Skeleton variant="text" width={150} height={16} />
                  </div>
                  <Skeleton variant="text" width={80} height={24} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-black/40 border border-red-500/30 rounded-xl p-6 space-y-4">
      <Skeleton variant="rectangular" height={200} className="rounded-lg" />
      <Skeleton variant="text" lines={2} />
      <div className="flex justify-between items-center">
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="rectangular" width={120} height={36} className="rounded" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-red-500/30">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} variant="text" width={120} height={20} />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <Skeleton variant="circular" width={32} height={32} />
          {Array.from({ length: 3 }, (_, j) => (
            <Skeleton key={j} variant="text" width={100} height={20} />
          ))}
        </div>
      ))}
    </div>
  )
}

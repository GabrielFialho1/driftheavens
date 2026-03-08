'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('animate-spin', sizes[size], className)}>
      <svg 
        className="w-full h-full text-red-500" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

interface ProgressIndicatorProps {
  current: number
  total: number
  className?: string
  showLabel?: boolean
}

export function ProgressIndicator({ current, total, className = '', showLabel = false }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progresso</span>
          <span>{current}/{total}</span>
        </div>
      )}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'loading'
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    success: {
      bg: 'bg-green-500/20 border-green-500/50 text-green-400',
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    },
    error: {
      bg: 'bg-red-500/20 border-red-500/50 text-red-400',
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    loading: {
      bg: 'bg-gray-500/20 border-gray-500/50 text-gray-400',
      icon: <LoadingSpinner size="sm" />
    }
  }

  const config = statusConfig[status]

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium',
      config.bg,
      className
    )}>
      {config.icon}
      {children}
    </div>
  )
}

interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  return (
    <div className="relative group">
      {children}
      <div className={cn(
        'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap',
        positionClasses[position]
      )}>
        {content}
        <div className={cn(
          'absolute w-2 h-2 bg-gray-900 transform rotate-45',
          position === 'top' && 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1',
          position === 'bottom' && 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1',
          position === 'left' && 'right-0 top-1/2 transform -translate-y-1/2 translate-x-1',
          position === 'right' && 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-1'
        )} />
      </div>
    </div>
  )
}

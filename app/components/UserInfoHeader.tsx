'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from './Button'
import UserAvatar from './UserAvatar'

interface UserInfoHeaderProps {
  showHomeButton?: boolean
  homeButtonDestination?: string
}

export function UserInfoHeader({ 
  showHomeButton = true, 
  homeButtonDestination = '/' 
}: UserInfoHeaderProps) {
  const { user, logout } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    setIsUserMenuOpen(false)
  }

  const goToProfile = () => {
    window.location.href = '/profile'
  }

  if (!user) {
    return (
      <div className="flex justify-between items-center w-full">
        {showHomeButton && (
          <Button
            onClick={() => window.location.href = homeButtonDestination}
            className="text-gray-400 hover:text-red-500 border-0 p-0 font-normal hover:bg-transparent"
          >
            Home
          </Button>
        )}
        <div></div>
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center w-full">
      {showHomeButton && (
        <Button
          onClick={() => window.location.href = homeButtonDestination}
          className="text-gray-400 hover:text-red-500 border-0 p-0 font-normal hover:bg-transparent"
        >
          Home
        </Button>
      )}
      
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-2 text-white hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
          aria-label={`Menu do usuário ${user.username}`}
          aria-expanded={isUserMenuOpen}
          aria-haspopup="true"
        >
          <UserAvatar user={user} className="w-8 h-8" />
          <span className="text-red-400 font-medium">{user.username}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isUserMenuOpen && (
          <div 
            className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-red-500/30 rounded-lg shadow-lg shadow-red-500/20 z-50"
            role="menu"
            aria-label="Menu do usuário"
          >
            <div className="py-2">
              <button
                onClick={goToProfile}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                role="menuitem"
              >
                Meu Perfil
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                role="menuitem"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

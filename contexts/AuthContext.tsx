'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types/database'
import { useNotifications } from '@/contexts/NotificationContext'

interface AuthContextType {
  user: User | null
  login: (user: User, token?: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { addNotification } = useNotifications()

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setTimeout(() => setUser(userData), 0)
      } catch {
        localStorage.removeItem('user')
      }
    }
    setTimeout(() => setIsLoading(false), 0)
  }, [])

  const login = (userData: User, token?: string) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    if (token) {
      localStorage.setItem('token', token)
    }
    addNotification({ title: 'Login realizado com sucesso!', type: 'success' })
  }

  const logout = async () => {
    if (user) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user._id }),
        })
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
    
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    addNotification({ title: 'Logout realizado com sucesso!', type: 'error' })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

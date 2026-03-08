'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { checkPasswordStrength, validateUsername } from '@/lib/validation'
import { LoadingSpinner, StatusBadge, Tooltip } from './Feedback'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({})
  const [passwordStrength, setPasswordStrength] = useState(checkPasswordStrength(''))
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Resetar campos quando mudar modo
  useEffect(() => {
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setError('')
    setFieldErrors({})
    setPasswordStrength(checkPasswordStrength(''))
    setShowPassword(false)
    setShowConfirmPassword(false)
  }, [mode])

  // Validação em tempo real do username
  useEffect(() => {
    if (username) {
      const validation = validateUsername(username)
      setFieldErrors(prev => ({
        ...prev,
        username: validation.isValid ? '' : (validation.message || '')
      }))
    } else {
      setFieldErrors(prev => ({ ...prev, username: '' }))
    }
  }, [username])

  // Validação em tempo real da senha
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password))
    
    // Validar confirmação de senha se já foi preenchida
    if (confirmPassword && mode === 'register') {
      setFieldErrors(prev => ({
        ...prev,
        confirmPassword: password === confirmPassword ? '' : 'As senhas não coincidem'
      }))
    }
  }, [password, confirmPassword, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setFieldErrors({})

    // Validação do username
    const usernameValidation = validateUsername(username)
    if (!usernameValidation.isValid) {
      setFieldErrors({ username: usernameValidation.message || '' })
      setLoading(false)
      return
    }

    // Validação para registro
    if (mode === 'register') {
      if (password !== confirmPassword) {
        setFieldErrors({ confirmPassword: 'As senhas não coincidem' })
        setLoading(false)
        return
      }
      
      if (passwordStrength.score < 3) {
        setFieldErrors({ password: 'Senha muito fraca. Escolha uma senha mais forte.' })
        setLoading(false)
        return
      }
    }

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        login(data.user, data.token)
        onClose()
        setUsername('')
        setPassword('')
        setConfirmPassword('')
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/90 border border-red-500/30 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-500">
            {mode === 'login' ? 'Login' : 'Registrar'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Usuário {mode === 'register' && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  fieldErrors.username 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-red-500/30'
                }`}
                placeholder={mode === 'login' ? 'Seu usuário' : 'Escolha um usuário'}
                aria-invalid={!!fieldErrors.username}
                aria-describedby={fieldErrors.username ? 'username-error' : undefined}
              />
              {fieldErrors.username && (
                <div className="absolute right-3 top-3.5">
                  <StatusBadge status="error">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </StatusBadge>
                </div>
              )}
              {mode === 'register' && !fieldErrors.username && username.length >= 3 && (
                <div className="absolute right-3 top-3.5">
                  <StatusBadge status="success">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </StatusBadge>
                </div>
              )}
            </div>
            {fieldErrors.username && (
              <p id="username-error" className="mt-1 text-sm text-red-400">{fieldErrors.username}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Senha {mode === 'register' && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10 ${
                  fieldErrors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-red-500/30'
                }`}
                placeholder={mode === 'login' ? 'Sua senha' : 'Escolha uma senha'}
                aria-invalid={!!fieldErrors.password}
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
              />
              <Tooltip content={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </Tooltip>
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>
            )}
            {mode === 'register' && password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Força da senha</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength.score < 3 ? 'text-red-400' : 
                    passwordStrength.score < 4 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                  />
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <ul className="mt-2 text-xs text-gray-400 space-y-1">
                    {passwordStrength.feedback.map((feedback, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {feedback}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Senha <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10 ${
                    fieldErrors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-red-500/30'
                  }`}
                  placeholder="Digite a senha novamente"
                  aria-invalid={!!fieldErrors.confirmPassword}
                  aria-describedby={fieldErrors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-sm text-red-400">{fieldErrors.confirmPassword}</p>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3" role="alert">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                {mode === 'login' ? 'Entrando...' : 'Criando conta...'}
              </>
            ) : (
              <>
                {mode === 'login' ? 'Entrar' : 'Criar Conta'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-red-400 hover:text-red-300 transition-colors underline cursor-pointer"
          >
            {mode === 'login' ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  )
}

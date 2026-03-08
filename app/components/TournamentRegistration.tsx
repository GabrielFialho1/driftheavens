'use client'

import { useState } from 'react'
import { Tournament } from '@/lib/tournaments'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from './Button'

interface TournamentRegistrationProps {
  tournament: Tournament
  onClose: () => void
  onSuccess: () => void
}

export function TournamentRegistration({ tournament, onClose, onSuccess }: TournamentRegistrationProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<{
    nickInGame: string
    carModel: string
    experienceImage: File | null
    team: string
    comments: string
  }>({
    nickInGame: '',
    carModel: '',
    experienceImage: null,
    team: '',
    comments: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nickInGame.trim()) {
      newErrors.nickInGame = 'Nick in game é obrigatório'
    }

    if (!formData.carModel.trim()) {
      newErrors.carModel = 'Modelo do carro é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    if (!user) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/tournaments/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tournamentId: tournament.id,
          userId: user._id,
          nickInGame: formData.nickInGame,
          carModel: formData.carModel,
          experienceImage: formData.experienceImage,
          team: formData.team,
          comments: formData.comments
        })
      })

      if (response.ok) {
        alert('Inscrição realizada com sucesso!')
        onSuccess()
        onClose()
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.message || 'Erro ao se inscrever' })
        alert('Erro na inscrição: ' + (errorData.message || 'Tente novamente'))
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ submit: 'Erro de conexão. Tente novamente.' })
      alert('Erro de conexão. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'experienceImage' && 'files' in e.target) {
      const file = (e.target as HTMLInputElement).files?.[0]
      setFormData(prev => ({ ...prev, experienceImage: file || null }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/95 border border-red-500/30 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Inscrever-se no Campeonato</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-red-400 mb-2">{tournament.title}</h3>
          <p className="text-gray-300 text-sm">{tournament.description}</p>
          <p className="text-gray-400 text-sm mt-2">📅 {tournament.date} {tournament.time && `• ${tournament.time}`}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Nick in Game *</label>
            <input
              type="text"
              name="nickInGame"
              value={formData.nickInGame}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/60 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
              placeholder="Seu nick no jogo"
            />
            {errors.nickInGame && <p className="text-red-400 text-sm mt-1">{errors.nickInGame}</p>}
          </div>

          <div>
            <label className="block text-white mb-2">Modelo do Carro *</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/60 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
              placeholder="Ex: Nissan Silvia S15"
            />
            {errors.carModel && <p className="text-red-400 text-sm mt-1">{errors.carModel}</p>}
          </div>

          <div>
            <label className="block text-white mb-2">Upload de Imagem (Opcional)</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setFormData(prev => ({ ...prev, experienceImage: file }))
                  }
                }}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
              />
              {formData.experienceImage && (
                <div className="mt-2 text-sm text-green-400">
                  ✅ {formData.experienceImage.name}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Equipe</label>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/60 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
              placeholder="Nome da sua equipe (opcional)"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Comentários Adicionais</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-black/60 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none resize-none"
              placeholder="Informações adicionais..."
            />
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscrevendo...' : 'Confirmar Inscrição'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

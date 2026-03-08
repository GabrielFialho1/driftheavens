import { useState } from 'react'
import { useNotifications } from '@/contexts/NotificationContext'
import { User } from '@/types/database'

interface PasswordChangeFormProps {
  user: User
}

export default function PasswordChangeForm({ user }: PasswordChangeFormProps) {
  const { addNotification } = useNotifications()
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification({ title: 'As senhas não coincidem!', type: 'error' })
      return
    }

    if (passwordData.newPassword.length < 6) {
      addNotification({ title: 'A nova senha deve ter pelo menos 6 caracteres!', type: 'error' })
      return
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      })

      if (response.ok) {
        addNotification({ title: 'Senha alterada com sucesso!', type: 'success' })
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        const errorData = await response.json()
        addNotification({ title: errorData.message || 'Erro ao alterar senha', type: 'error' })
      }
    } catch {
      addNotification({ title: 'Erro ao alterar senha', type: 'error' })
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-red-500">Alterar Senha</h1>
          <div className="h-px flex-1 bg-linear-to-r from-red-500/50 to-transparent"></div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6">
        <div>
          <label className="block text-white mb-2 font-medium">Senha Atual</label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors cursor-pointer"
            placeholder="Digite sua senha atual"
            required
          />
        </div>
        
        <div>
          <label className="block text-white mb-2 font-medium">Nova Senha</label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors cursor-pointer"
            placeholder="Digite sua nova senha"
            required
            minLength={6}
          />
        </div>
        
        <div>
          <label className="block text-white mb-2 font-medium">Confirmar Nova Senha</label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors cursor-pointer"
            placeholder="Confirme sua nova senha"
            required
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-linear-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-500/30 cursor-pointer"
        >
          Alterar Senha
        </button>
      </form>
      
      <div className="mt-8 p-4 bg-red-500/10 rounded-lg border border-red-900/30">
        <h3 className="text-white font-medium mb-2 flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center text-white text-xs font-medium">!</div>
          <span>Dicas de Segurança</span>
        </h3>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Use pelo menos 6 caracteres</li>
          <li>• Combine letras e números</li>
          <li>• Não use informações pessoais</li>
          <li>• Altere sua senha regularmente</li>
        </ul>
      </div>
      </div>
    </div>
  )
}

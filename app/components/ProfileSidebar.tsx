import { User } from '@/types/database'
import UserInfoSummary from './UserInfoSummary'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/contexts/NotificationContext'

interface ProfileSidebarProps {
  user: User
  activeTab: 'profile' | 'subscriptions' | 'password'
  setActiveTab: (tab: 'profile' | 'subscriptions' | 'password') => void
}

export default function ProfileSidebar({ user, activeTab, setActiveTab }: ProfileSidebarProps) {
  const { logout } = useAuth()
  const { addNotification } = useNotifications()
  
  const handleLogout = () => {
    logout()
    addNotification({ title: 'Logout realizado com sucesso!', type: 'success' })
  }
  
  const tabs = [
    { id: 'profile', label: 'Perfil' },
    { id: 'subscriptions', label: 'Assinaturas' },
    { id: 'password', label: 'Alterar Senha' }
  ]

  return (
    <div className="bg-black/80 backdrop-blur-lg border border-red-900/30 rounded-2xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Menu Perfil</h2>
      
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'profile' | 'subscriptions' | 'password')}
            className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left cursor-pointer ${
              activeTab === tab.id
                ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-lg shadow-red-500/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-4 pt-4 border-t border-red-900/30">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left text-red-400 hover:bg-red-500/20 border border-red-500/30 cursor-pointer"
        >
          <span>Sair da Conta</span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-red-900/30">
        <UserInfoSummary user={user} />
      </div>
    </div>
  )
}

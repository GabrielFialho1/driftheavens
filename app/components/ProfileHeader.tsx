import { User } from '@/types/database'
import UserAvatar from './UserAvatar'

interface ProfileHeaderProps {
  user: User
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-center space-x-6 mb-8">
      <div className="relative">
        <UserAvatar user={user} size="large" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-3xl font-bold text-white mb-2">{user.username}</h3>
        <p className="text-gray-400">Membro desde {new Date(user.register_time).toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  )
}

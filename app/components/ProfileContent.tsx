import { User } from '@/types/database'
import ProfileHeader from './ProfileHeader'
import UserStats from './UserStats'
import XPBar from './XPBar'

interface ProfileContentProps {
  user: User
}

export default function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-red-500">Perfil</h1>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent"></div>
      </div>
      
      <ProfileHeader user={user} />
      <XPBar user={user} />
      <UserStats user={user} />
    </div>
  )
}

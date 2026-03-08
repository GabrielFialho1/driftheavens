import { User } from '@/types/database'
import UserAvatar from './UserAvatar'
import { getCurrentLevel } from '@/lib/xp'

interface UserInfoSummaryProps {
  user: User
}

export default function UserInfoSummary({ user }: UserInfoSummaryProps) {
  const userLevel = getCurrentLevel(user.xp)
  
  return (
    <div className="flex items-center gap-3">
      <UserAvatar user={user} size="small" />
      <div>
        <p className="text-white font-medium">{user.username}</p>
        <p className="text-gray-400 text-sm">Nível {userLevel}</p>
      </div>
    </div>
  )
}

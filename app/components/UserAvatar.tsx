import { User } from '@/types/database'

interface UserAvatarProps {
  user: User
  size?: 'small' | 'large'
  className?: string
}

export default function UserAvatar({ user, size = 'small', className = '' }: UserAvatarProps) {
  const sizeClasses = {
    small: 'w-12 h-12 text-lg',
    large: 'w-32 h-32 text-4xl'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-red-500/20 flex items-center justify-center text-white font-bold overflow-hidden ${className}`}>
      {user.avatar && user.avatar >= 0 ? (
        <img 
          src={`/img/avatars/${user.avatar}.png`} 
          alt="Avatar" 
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{user.username.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}

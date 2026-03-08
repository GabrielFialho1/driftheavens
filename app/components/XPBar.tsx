'use client'

import { getXPProgress } from '@/lib/xp'
import { User } from '@/types/database'

interface XPBarProps {
  user: User
}

export default function XPBar({ user }: XPBarProps) {
  const xpData = getXPProgress(user.xp)
  
  return (
    <div className="bg-black/50 border border-red-900/30 rounded-lg p-6 hover:border-red-500/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <h4 className="text-white font-medium">Nível {xpData.currentLevel}</h4>
        </div>
        <div className="text-red-400 text-sm">
          XP: {user.xp.toLocaleString()} / {xpData.nextLevelXP.toLocaleString()}
        </div>
      </div>
      
      {/* XP Progress Bar */}
      <div className="relative">
        <div className="w-full bg-black/30 border border-red-900/50 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-red-600 to-red-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(xpData.xpProgress, 100)}%` }}
          ></div>
        </div>
        
        {/* Progress percentage */}
        <div className="mt-2 text-center">
          <span className="text-gray-400 text-xs">
            {xpData.xpNeededForNextLevel > 0 
              ? `${xpData.xpProgress.toFixed(1)}% (${Math.ceil(xpData.nextLevelXP - user.xp).toLocaleString()} XP restante)`
              : 'Nível Máximo!'
            }
          </span>
        </div>
      </div>
      
      {/* XP Info */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div className="text-gray-400">
          <div>XP do Nível:</div>
          <div className="text-red-400 font-medium">{xpData.xpNeededForNextLevel.toLocaleString()}</div>
        </div>
        <div className="text-gray-400">
          <div>XP Total:</div>
          <div className="text-red-400 font-medium">{xpData.currentLevelXP.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

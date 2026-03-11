interface ClanLeader {
  username: string
}

interface Clan {
  tag: string
  chat_text: string
  owner: string
  chat_color: string
  owner_name?: string
  members_count?: number
}

interface ClanCardProps {
  clan: Clan
  onJoin?: (clanTag: string) => void
  showJoinButton?: boolean
}

function extractColorCode(text: string): { color: string; cleanText: string; hasColor: boolean } {
  const hexMatch = text.match(/#([0-9A-Fa-f]{6})/gi)
  if (hexMatch && hexMatch.length > 0) {
    return { 
      color: hexMatch[0], 
      cleanText: text.replace(/#[0-9A-Fa-f]{6}/gi, '').trim(),
      hasColor: true
    }
  }
  return { color: '#dc2626', cleanText: text, hasColor: false }
}

export default function ClanCard({ 
  clan, 
  onJoin, 
  showJoinButton = true 
}: ClanCardProps) {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-lg p-6 hover:bg-black/60 transition-all duration-300 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/20 flex flex-col h-full min-h-[280px]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ 
              color: clan.chat_color || '#ffffff',
              textShadow: clan.chat_color ? `0 0 10px ${clan.chat_color}40` : 'none'
            }}
          >
            {clan.tag}
          </h3>
          <p className="text-gray-400 text-sm">
            Dono: {clan.owner_name || 'Carregando...'}
          </p>
          {clan.members_count !== undefined && (
            <p className="text-gray-400 text-sm">
              Membros: {clan.members_count}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 mb-4">
        {clan.chat_text && (
          <p className="text-gray-300 line-clamp-2">
            {clan.chat_text}
          </p>
        )}
      </div>

      <div className="flex space-x-2 mt-auto">
        {showJoinButton && onJoin && (
          <button
            onClick={() => onJoin(clan.tag)}
            className="flex-1 bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-red-500 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
          >
            Solicitar Entrada
          </button>
        )}
      </div>
    </div>
  )
}

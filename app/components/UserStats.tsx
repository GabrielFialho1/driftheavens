import { User } from '@/types/database'

interface UserStatsProps {
  user: User
}

export default function UserStats({ user }: UserStatsProps) {
  const stats = [
    {
      label: 'ID do Usuário',
      value: `#${user._id}`,
      color: 'bg-red-500'
    },
    {
      label: 'Grupo',
      value: user.group || 'Default',
      color: 'bg-yellow-500'
    },
    {
      label: 'Dinheiro',
      value: `$${user.money.toLocaleString()}`,
      color: 'bg-green-500'
    },
    {
      label: 'Tempo de Jogo',
      value: `${Math.floor(user.playtime / 3600)}h ${Math.floor((user.playtime % 3600) / 60)}m`,
      color: 'bg-blue-500'
    },
    {
      label: 'Registrado em',
      value: new Date(user.register_time).toLocaleDateString('pt-BR'),
      color: 'bg-purple-500'
    },
    {
      label: 'Última Vez',
      value: new Date(user.lastseen).toLocaleDateString('pt-BR'),
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-black/50 border border-red-900/30 rounded-lg p-6 hover:border-red-500/50 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-2 h-2 ${stat.color} rounded-full`}></div>
            <h4 className="text-white font-medium">{stat.label}</h4>
          </div>
          <p className="text-red-400 text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

interface TournamentCardProps {
  number: string
  title: string
  description: string
  isSelected?: boolean
}

export function TournamentCard({ number, title, description, isSelected = false }: TournamentCardProps) {
  return (
    <div className={`bg-black/60 backdrop-blur-sm border rounded-lg p-6 hover:shadow-lg shadow-white/20 transition-all cursor-pointer ${
      isSelected ? 'border-white border-3' : 'border-gray-400'
    }`}>
      <div className="text-3xl font-bold text-zinc-400 mb-2">{number}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  )
}

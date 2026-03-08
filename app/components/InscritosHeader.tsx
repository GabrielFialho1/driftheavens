interface InscritosHeaderProps {
  registrationsCount: number
}

export function InscritosHeader({ registrationsCount }: InscritosHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-4">Todos os Inscritos</h1>
      <p className="text-gray-400 mb-6">
        Lista completa de todos os jogadores inscritos nos campeonatos
      </p>
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 mb-4">
        <p className="text-green-400 text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Ativo
        </p>
      </div>
      <p className="text-gray-500 text-sm">
        Total de {registrationsCount} inscrição{registrationsCount > 1 ? 'ções' : ''} realizadas
      </p>
    </div>
  )
}

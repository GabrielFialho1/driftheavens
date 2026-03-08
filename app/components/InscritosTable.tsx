interface Registration {
  id: string
  tournamentId: string
  tournamentTitle: string
  userId: string
  username: string
  nickInGame: string
  carModel: string
  experienceImage?: string
  team?: string
  registrationDate: string
}

interface InscritosTableProps {
  registrations: Registration[]
}

export function InscritosTable({ registrations }: InscritosTableProps) {
  return (
    <div className="bg-black/60 border border-gray-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900 border-b border-gray-800">
            <tr>
              <th className="text-left py-4 px-6 text-gray-300 font-semibold">ID Usuário</th>
              <th className="text-left py-4 px-6 text-gray-300 font-semibold">Nick in Game</th>
              <th className="text-left py-4 px-6 text-gray-300 font-semibold">Carro</th>
              <th className="text-left py-4 px-6 text-gray-300 font-semibold">Equipe</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-500">
                  Nenhum inscrito encontrado.
                </td>
              </tr>
            ) : (
              registrations.map((registration) => (
                <tr key={registration.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-white font-mono bg-gray-800 px-2 py-1 rounded text-sm">
                      #{registration.userId}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{registration.nickInGame}</td>
                  <td className="py-4 px-6 text-gray-300">{registration.carModel}</td>
                  <td className="py-4 px-6 text-gray-300">
                    {registration.team || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

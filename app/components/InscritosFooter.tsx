interface InscritosFooterProps {
  registrationsCount: number
}

export function InscritosFooter({ registrationsCount }: InscritosFooterProps) {
  if (registrationsCount === 0) {
    return null
  }

  return (
    <div className="mt-6 text-center text-gray-500 text-sm">
      <p>Última atualização: {new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>
  )
}
